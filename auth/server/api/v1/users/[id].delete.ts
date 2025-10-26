/** dynamic imports used inside handler */

 

/**
 * @summary Delete user by id
 * @tags Users
 * @param {number} id.path.required - User ID
 * @response 204 - No Content
 */
import initDb from '../../../utils/initDb'
import { requireAuth } from '../../../utils/auth'
import prisma from '../../../utils/prisma'

export default defineEventHandler(async (event) => {
  try { requireAuth(event) } catch (e) { return { error: 'Unauthorized' } }
  const { id } = event.context.params || {}
  await initDb()
  try {
    await prisma.user.delete({ where: { id: Number(id) } })
    setResponseStatus(event, 204)
    return ''
  } catch (e: any) {
    // if not found
    setResponseStatus(event, 404)
    return { error: 'Not found' }
  }
})
