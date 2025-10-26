/**
 * Health check endpoint
 * @summary Health check
 * @tags Health
 */
export default defineEventHandler(() => {
  return { ok: true, env: process.env.NODE_ENV || 'development' }
})