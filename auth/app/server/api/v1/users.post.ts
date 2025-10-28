import { z } from 'zod'


const bodySchema = z.object({
  name: z.string().min(1),
  email: z.string().email()
})


/**
 * @summary Create a user
 * @tags Users
 * @param {object} request.body.required - user info
 * @response 201 - application/json - example: {"id":1,"name":"...","email":"..."}
 */
import initDb from '../../utils/initDb'
import { requireAuth } from '../../utils/auth'
import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try { requireAuth(event) } catch (e) { return { error: 'Unauthorized' } }
  await initDb()
  const body = await readBody(event)
  const parsed = bodySchema.safeParse(body)
  if (!parsed.success) {
    setResponseStatus(event, 422)
    return { error: parsed.error.format ? parsed.error.format() : parsed.error.issues }
  }
  const user = await prisma.user.create({ data: { name: parsed.data.name, email: parsed.data.email } })
  setResponseStatus(event, 201)
  return { data: user }
})
