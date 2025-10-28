declare module '*utils/connection' {
  export function getConnection(): Promise<any>
  const _default: { getConnection: typeof getConnection }
  export default _default
}

declare module '*utils/initDb' {
  const initDb: () => Promise<void> | void
  export default initDb
}
