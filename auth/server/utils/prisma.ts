// Try to load Prisma client if generated; otherwise provide a lightweight fallback
let prisma: any = null

async function createFallback() {
	// lazy-load connection wrapper
	const connMod = await import('./connection.js').catch(() => null)
	const conn = connMod?.getConnection ? await connMod.getConnection() : null
	const fallback = {
		user: {
			findMany: async (opts: any) => {
				if (conn && conn.query) {
					const res = await conn.query('SELECT id, name, email FROM users ORDER BY id DESC')
					return res.rows || []
				}
				return []
			},
			findUnique: async ({ where }: any) => {
				const id = where?.id
				if (conn && conn.query) {
					const res = await conn.query('SELECT id, name, email FROM users WHERE id = ?', [Number(id)])
					return (res.rows && res.rows[0]) || null
				}
				return null
			},
			create: async ({ data }: any) => {
				if (conn && conn.db && conn.db.prepare) {
					const info = conn.db.prepare('INSERT INTO users (name, email) VALUES (?, ?)').run(data.name, data.email)
					return conn.db.prepare('SELECT id, name, email FROM users WHERE id = ?').get(info.lastInsertRowid)
				}
				// in-memory fallback
				return null
			},
			update: async ({ where, data }: any) => {
				if (conn && conn.db && conn.db.prepare) {
					const sets: string[] = []
					const vals: any[] = []
					if (data.name !== undefined) { sets.push('name = ?'); vals.push(data.name) }
					if (data.email !== undefined) { sets.push('email = ?'); vals.push(data.email) }
					if (sets.length) {
						conn.db.prepare(`UPDATE users SET ${sets.join(', ')} WHERE id = ?`).run(...vals, Number(where.id))
					}
					return conn.db.prepare('SELECT id, name, email FROM users WHERE id = ?').get(Number(where.id))
				}
				return null
			},
			delete: async ({ where }: any) => {
				if (conn && conn.db && conn.db.prepare) {
					conn.db.prepare('DELETE FROM users WHERE id = ?').run(Number(where.id))
					return { id: where.id }
				}
				return null
			}
		}
	}
	return fallback
}

(async () => {
	try {
		const mod = await import('@prisma/client')
		const PrismaClient = mod.PrismaClient
		const globalForPrisma = globalThis as unknown as { prisma?: any }
		globalForPrisma.prisma = globalForPrisma.prisma ?? new PrismaClient()
		prisma = globalForPrisma.prisma
	} catch (e) {
		// fallback to lightweight API compatible with prisma.user
		prisma = await createFallback()
	}
})()

export { prisma }
export default prisma
