// dynamic imports for connection/initDb are used inside the handler

/**
 * @summary Get list of users
 * @tags Users
 * @response 200 - application/json - array - example: [{"id":1,"name":"Alice","email":"alice@example.com"}]
 */
import initDb from '../../utils/initDb'
import { requireAuth } from '../../utils/auth'
import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try { requireAuth(event) } catch (e) { return { error: 'Unauthorized' } }
  await initDb()
  const rows = await prisma.user.findMany({ orderBy: { id: 'desc' } })
  return { data: rows }
})
