// Copyright 2018-2025 the Deno authors. MIT license.

// deno-lint-ignore-file no-explicit-any no-var
// @ts-nocheck -- shim file, skip type checking in case of collisions

/**
 * This Web Storage API interface provides access to a particular domain's
 * session or local storage. It allows, for example, the addition,
 * modification, or deletion of stored data items.
 *
 * This interface is used by both the {@linkcode localStorage} and
 * {@linkcode sessionStorage} objects.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Storage
 * @see https://html.spec.whatwg.org/multipage/webstorage.html#the-storage-interface
 * @category Storage
 */
interface Storage {
  /**
   * Returns the number of key/value pairs currently present in the list
   * associated with the object.
   */
  readonly length: number;
  /**
   * Empties the list associated with the object of all key/value pairs, if
   * there are any.
   */
  clear(): void;
  /**
   * Returns the current value associated with the given key, or null if the
   * given key does not exist in the list associated with the object.
   */
  getItem(key: string): string | null;
  /**
   * Returns the name of the nth key in the list, or null if n is greater than
   * or equal to the number of key/value pairs in the object.
   */
  key(index: number): string | null;
  /**
   * Removes the key/value pair with the given key from the list associated
   * with the object, if a key/value pair with the given key exists.
   */
  removeItem(key: string): void;
  /**
   * Sets the value of the pair identified by key to value, creating a new
   * key/value pair if none existed for key previously.
   *
   * @throws {DOMException} "QuotaExceededError" exception if the new value
   * couldn't be set. (Setting could fail if, e.g., the user has disabled
   * storage for the site, or if the quota has been exceeded.)
   */
  setItem(key: string, value: string): void;
  [name: string]: any;
}

/** @category Storage */
declare var Storage: {
  readonly prototype: Storage;
  new (): Storage;
};

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
