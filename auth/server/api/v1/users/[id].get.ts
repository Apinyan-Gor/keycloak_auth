/**
 * Uses dynamic imports to avoid static resolution issues in tooling
 */


/**
 * @summary Get user by id
 * @tags Users
 * @param {number} id.path.required - User ID
 * @response 200 - application/json - example: {"id":1,"name":"Alice","email":"alice@example.com"}
 */
import initDb from '../../../utils/initDb'
import { requireAuth } from '../../../utils/auth'
import prisma from '../../../utils/prisma'

export default defineEventHandler(async (event) => {
  try { requireAuth(event) } catch (e) { return { error: 'Unauthorized' } }
  const { id } = event.context.params || {}
  await initDb()
  const user = await prisma.user.findUnique({ where: { id: Number(id) } })
  if (!user) { setResponseStatus(event, 404); return { error: 'Not found' } }
  return { data: user }
})
