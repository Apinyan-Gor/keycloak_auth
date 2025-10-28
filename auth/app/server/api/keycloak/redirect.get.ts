import { setCookie, sendRedirect } from 'h3'

export default defineEventHandler(async (event) => {
  // Set a short-lived cookie that nginx will check before proxying to Keycloak
  // httpOnly is fine because nginx inspects cookie headers; maxAge is short for safety
  setCookie(event, 'allow_keycloak', '1', {
    path: '/',
    maxAge: 10, // 10 seconds
    httpOnly: true,
    sameSite: 'Lax',
  })

  // Redirect the client to the proxied Keycloak path
  return sendRedirect(event, '/keycloak/')
})
