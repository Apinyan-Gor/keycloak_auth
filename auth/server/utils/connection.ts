// Legacy connection helper removed.
// Use Prisma client exported from `server/utils/prisma.ts` and initialize via `server/utils/initDb.ts`.

export function getConnection() {
  throw new Error('server/utils/connection.ts deprecated — use server/utils/prisma.ts and initDb instead')
}

export default { getConnection }
