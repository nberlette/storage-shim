// Copyright 2018-2025 the Deno authors. MIT license.

// deno-lint-ignore-file no-explicit-any no-var

/**
 * The `Storage` interface represents a key-value storage mechanism with a
 * simple API for storing, retrieving, and managing data. This interface is used by
 * both the {@linkcode localStorage} and {@linkcode sessionStorage} objects.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Storage
 * @see https://html.spec.whatwg.org/multipage/webstorage.html#the-storage-interface
 */
interface Storage extends NoInfer<import("./storage.ts").Storage> {}

// @ts-ignore allow redeclaration (deno uses bad types for this)
declare var Storage: typeof import("./storage.ts").Storage;

interface StorageEventInit extends EventInit {
  key?: string | null;
  oldValue?: string | null;
  newValue?: string | null;
  url?: string;
  storageArea?: Storage | null;
}

interface StorageEvent extends InstanceType<typeof StorageEvent> {}

// @ts-ignore allow redeclaration (deno uses bad types for this)
declare var StorageEvent: typeof import("./storage_event.ts").StorageEvent;

/**
 * The `localStorage` API provides a mechanism for storing key-value pairs
 * in a persistent storage area that is scoped to the origin of the application.
 *
 * Data stored in localStorage persists even after the application is closed.
 *
 * - Key-Value Storage: Stores data as key-value pairs.
 * - Persistent: Data is retained even after the application is closed.
 * - Synchronous API: Operations are performed synchronously.
 *
 * `localStorage` is similar to {@linkcode sessionStorage}, and shares the same
 * API methods, visible in the {@linkcode Storage} type.
 *
 * @example
 * ```ts
 * // Set a value in localStorage
 * localStorage.setItem("key", "value");
 *
 * // Get a value from localStorage
 * const value = localStorage.getItem("key");
 * console.log(value); // Output: "value"
 *
 * // Remove a value from localStorage
 * localStorage.removeItem("key");
 *
 * // Clear all values from localStorage
 * localStorage.clear();
 * ```
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
 * @category Storage
 */
declare var localStorage: Storage;

/**
 * The `sessionStorage` API operates similarly to the {@linkcode localStorage} API,
 * but it is intended for storing data temporarily for the duration of a session.
 * Data stored in sessionStorage is cleared when the application session or
 * process ends. This makes it suitable for temporary data that you do not need
 * to persist across user sessions.
 *
 * - Key-Value Storage: Stores data as key-value pairs.
 * - Session-Based: Data is only available for the duration of the page session.
 * - Synchronous API: Operations are performed synchronously.
 *
 * `sessionStorage` is similar to {@linkcode localStorage}, and shares the same API
 * methods, visible in the {@linkcode Storage} type.
 *
 * @example
 * ```ts
 * // Set a value in sessionStorage
 * sessionStorage.setItem("key", "value");
 *
 * // Get a value from sessionStorage
 * const value = sessionStorage.getItem("key");
 * console.log(value); // Output: "value"
 *
 * // Remove a value from sessionStorage
 * sessionStorage.removeItem("key");
 *
 * // Clear all the values from sessionStorage
 * sessionStorage.clear();
 * ```
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
 * @category Storage
 */
declare var sessionStorage: Storage;
