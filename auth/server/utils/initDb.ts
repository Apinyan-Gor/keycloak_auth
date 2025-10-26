import { execSync } from 'child_process'
import path from 'path'

let initialized = false

export default async function initDb() {
  if (initialized) return
  initialized = true

  try {
    // Ensure prisma client is generated and DB schema is pushed
    const cwd = path.resolve(process.cwd())
    console.log('[initDb] Running `npx prisma generate` and `npx prisma db push` to ensure schema')
    // run generate and db push (accept data loss for idempotency in dev)
    execSync('npx prisma generate', { stdio: 'inherit', cwd })
    execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit', cwd })
  } catch (e: any) {
    console.warn('[initDb] prisma CLI failed or not available:', e?.message || e)
  }

  try {
    const { prisma } = await import('./prisma')
    if (prisma && typeof prisma.$connect === 'function') {
      await prisma.$connect()
    }
  } catch (e) {
    console.error('[initDb] prisma client connection failed:', e)
  }
}

