import { H3Event } from 'h3'

export function requireAuth(event: H3Event) {
  const header = getRequestHeader(event, 'authorization') || ''
  const token = header.replace(/^Bearer\s+/i, '')
  const secret = process.env.APP_SECRET || ''
  // Allow also a header 'x-api-key' as alternative
  const apiKey = getRequestHeader(event, 'x-api-key') || ''
  if ((token && secret && token === secret) || (apiKey && apiKey === secret)) {
    return true
  }
  setResponseStatus(event, 401)
  throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
}

export default { requireAuth }
