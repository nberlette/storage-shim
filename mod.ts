/**
 * @nick/storage
 *
 * A comprehensive polyfill for the Web Storage API that provides complete
 * implementations of `Storage`, `localStorage`, and `sessionStorage` for
 * environments where these APIs are not available.
 *
 * @example
 * ```ts
 * import { Storage, localStorage, sessionStorage } from "@nick/storage";
 *
 * // Use the Storage constructor
 * const customStorage = new Storage();
 *
 * // Use localStorage and sessionStorage
 * localStorage.setItem('key', 'value');
 * sessionStorage.setItem('temp', 'data');
 * ```
 *
 * @example Auto-install globally
 * ```ts
 * import "@nick/storage/install";
 *
 * // Now Storage APIs are available globally
 * localStorage.setItem('key', 'value');
 * sessionStorage.setItem('temp', 'data');
 * ```
 * @module
 */
import { Storage } from "./src/storage.ts";
import { localStorage } from "./src/local_storage.ts";
import { sessionStorage } from "./src/session_storage.ts";

export * from "./src/storage.ts";
export * from "./src/local_storage.ts";
export * from "./src/session_storage.ts";

export default { Storage, localStorage, sessionStorage } as const;

export { default as "module.exports" } from "./mod.ts";
