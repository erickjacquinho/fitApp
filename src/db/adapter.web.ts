// Dummy adapter for Web to prevent better-sqlite3 bundling errors
export const adapter = {
  batch: () => {},
  count: () => 0,
  destroyDeletedRecords: () => {},
  find: () => null,
  getLocal: () => null,
  query: () => [],
  removeLocal: () => {},
  setLocal: () => {},
  unsafeClearCachedRecords: () => {},
  unsafeResetDatabase: () => {},
} as any;
