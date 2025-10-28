
// defineRouteMeta({
//   openAPI: {
//     description: 'Test route description',
//     parameters: [{ in: "query", name: "test", required: true }],
//   },
// });
/**
 * Health check endpoint
 * @summary Health check
 * @tags Health
 */
export default defineEventHandler(() => {
  return { ok: true, env: process.env.NODE_ENV || 'development' }
})