import { z } from 'zod'

// defineRouteMeta({
//   openAPI: {
//     description: 'Test route description',
//     parameters: [{ in: "query", name: "test", required: true }],
//   },
// });

const bodySchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional()
})

/**
 * @summary Update user by id
 * @tags Users
 * @param {number} id.path.required - User ID
 * @param {object} request.body.required - user info
 * @response 200 - application/json - example: {"id":1,"name":"Alice","email":"alice@example.com"}
 */
import initDb from '../../../utils/initDb'
import { requireAuth } from '../../../utils/auth'
import prisma from '../../../utils/prisma'

export default defineEventHandler(async (event) => {
  try { requireAuth(event) } catch (e) { return { error: 'Unauthorized' } }
  const { id } = event.context.params || {}
  await initDb()
  const body = await readBody(event)
  const parsed = bodySchema.safeParse(body)
  if (!parsed.success) {
    setResponseStatus(event, 422)
    return { error: parsed.error.format ? parsed.error.format() : parsed.error.issues }
  }
  const data: any = {}
  if (parsed.data.name !== undefined) data.name = parsed.data.name
  if (parsed.data.email !== undefined) data.email = parsed.data.email
  const user = await prisma.user.update({ where: { id: Number(id) }, data })
  return { data: user }
})
