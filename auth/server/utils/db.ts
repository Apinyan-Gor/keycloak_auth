// Legacy DB helper (removed).
// This project now uses Prisma as the single ORM and database entrypoint.
// The previous drizzle / better-sqlite3 helper was kept here as a no-op shim
// for compatibility during migration.

export function deprecatedDb() {
  throw new Error('server/utils/db.ts has been removed. Use server/utils/prisma.ts and initDb instead.')
}

export default { deprecatedDb }
