// deno-lint-ignore-file no-explicit-any
/**
 * This module provides a single {@linkcode install} function to gracefully
 * polyfill the global `Storage`, `localStorage`, and `sessionStorage` functions if they are not
 * already present in the environment's global scope.
 *
 * It checks for the existence of these functions and installs them if needed.
 * If all functions are already available, a "skipped" result is returned. On
 * success, a "success" result containing references to the installed functions
 * is returned. If an error occurs during the installation process, a "failure"
 * result is returned.
 *
 * @example
 * ```ts
 * import install from "@nick/storage/install";
 *
 * const result = install();
 *
 * if (result.type === "success") {
 *   console.log("Global Storage and localStorage polyfilled successfully.");
 * } else if (result.type === "skipped") {
 *   console.log("Global Storage and localStorage are already installed.");
 * } else {
 *   console.error("Failed to install:", result.error);
 * }
 * ```
 * @module install
 */
import { $ObjectDefineProperty } from "./_internal.ts";
import { localStorage } from "./local_storage.ts";
import { sessionStorage } from "./session_storage.ts";
import { Storage } from "./storage.ts";
import { StorageEvent } from "./storage_event.ts";

/**
 * Represents a successful polyfill installation.
 *
 * @template T - The target object where the installation occurred.
 * @template D - The resulting data payload of the installation.
 * @category Types
 * @tags Result, Success
 */
export interface Success<T, D> {
  readonly type: "success";
  readonly target: T;
  readonly data: D;
}

/**
 * Represents a skipped installation if the global functions are already
 * present.
 *
 * @template T - The target object where the installation was attempted.
 * @category Types
 * @tags Result, Skipped
 */
export interface Skipped<T> {
  readonly type: "skipped";
  readonly target: T;
  readonly info?: string;
}

/**
 * Represents a failed installation attempt, with an associated error.
 *
 * @template T - The target object where the installation was attempted.
 * @category Types
 * @tags Result, Failure
 */
export interface Failure<T> {
  readonly type: "failure";
  readonly target: T;
  readonly error: unknown;
}

/**
 * The data returned upon successful installation contains references to the
 * installed functions.
 *
 * @category Types
 * @tags Result, Data
 */
export type Data = {
  readonly localStorage?: Storage;
  readonly sessionStorage?: Storage;
  readonly Storage?: typeof Storage;
  readonly StorageEvent?: typeof StorageEvent;
};

/**
 * Represents the result of the installation process.
 *
 * @category Types
 * @tags Result
 */
export type Result<
  T extends object = typeof globalThis,
  D extends Data = Data,
> = Success<T, D> | Skipped<T> | Failure<T>;

/**
 * Installs the global `Storage`, `localStorage`, and `sessionStorage` functions if they are not
 * already available in the current environment's global scope.
 *
 * On success, returns {@linkcode Success} with the installed functions. If
 * all functions are already available, returns a {@linkcode Skipped} result.
 * If an error occurs, returns a {@linkcode Failure} result.
 *
 * @returns The {@linkcode Result} of the polyfill install operation.
 * @example
 * ```ts
 * import install from "@nick/storage/install";
 *
 * if (typeof Storage !== "function") {
 *   const result = install();
 *   if (result.type === "success") {
 *     console.log("Storage APIs polyfilled successfully.");
 *   } else if (result.type === "failure") {
 *     console.error("Failed to install Storage APIs:", result.error);
 *   } else {
 *     console.log("Storage APIs already installed.");
 *   }
 * }
 * ```
 */
export function installStorage<T extends object = typeof globalThis>(
  target: T = globalThis as T,
): Result<T, { Storage: typeof Storage | undefined }> {
  const data = {
    __proto__: null,
    Storage: undefined as typeof Storage | undefined,
  };

  // Install global Storage if not already available
  if (
    "Storage" in target &&
    typeof target.Storage === "function"
  ) {
    return {
      type: "skipped",
      target,
      info: "Storage is already installed.",
    };
  }

  try {
    $ObjectDefineProperty(Storage, "name", {
      __proto__: null,
      value: "Storage",
      configurable: true,
    } as PropertyDescriptor);

    $ObjectDefineProperty(target, "Storage", {
      __proto__: null,
      value: Storage,
      configurable: true,
      writable: true,
      enumerable: false,
    } as PropertyDescriptor);

    data.Storage = Storage;
  } catch (error) {
    return { type: "failure", target, error };
  }

  return { type: "success", target, data };
}

export function installLocalStorage<T extends object = typeof globalThis>(
  target: T = globalThis as T,
): Result<T, {
  localStorage: typeof localStorage | undefined;
}> {
  const data = {
    __proto__: null,
    localStorage: undefined as typeof localStorage | undefined,
  };

  // Install global localStorage if not already available
  if (
    "localStorage" in target &&
    typeof target.localStorage === "object" &&
    target.localStorage !== null
  ) {
    return {
      type: "skipped",
      target,
      info: "localStorage is already installed.",
    };
  }

  try {
    if (
      !(target as T & Data).Storage || (target as T & Data).Storage !== Storage
    ) {
      installStorage(target);
    }

    $ObjectDefineProperty(target, "localStorage", {
      __proto__: null,
      value: localStorage,
      configurable: true,
      enumerable: false,
      writable: true,
    } as PropertyDescriptor);

    data.localStorage = localStorage;
  } catch (error) {
    return { type: "failure", target, error };
  }

  return { type: "success", target, data };
}

export function installSessionStorage<T extends object = typeof globalThis>(
  target: T = globalThis as T,
): Result<T, {
  sessionStorage: typeof sessionStorage | undefined;
}> {
  const data = {
    __proto__: null,
    sessionStorage: undefined as typeof sessionStorage | undefined,
  };

  // Install global sessionStorage if not already available
  if (
    "sessionStorage" in target &&
    typeof target.sessionStorage === "object" &&
    target.sessionStorage !== null
  ) {
    return {
      type: "skipped",
      target,
      info: "sessionStorage is already installed.",
    };
  }

  try {
    if (
      !(target as T & Data).Storage || (target as T & Data).Storage !== Storage
    ) {
      installStorage(target);
    }
    $ObjectDefineProperty(target, "sessionStorage", {
      __proto__: null,
      value: sessionStorage,
      configurable: true,
      enumerable: false,
      writable: true,
    } as PropertyDescriptor);

    data.sessionStorage = sessionStorage;
  } catch (error) {
    return { type: "failure", target, error };
  }

  return { type: "success", target, data };
}

export function installStorageEvent<T extends object = typeof globalThis>(
  target: T = globalThis as T,
): Result<T, { StorageEvent: typeof StorageEvent | undefined }> {
  const data = {
    __proto__: null,
    StorageEvent: undefined as typeof StorageEvent | undefined,
  };

  // Install global StorageEvent if not already available
  if (typeof (target as T & Data).StorageEvent === "function") {
    return {
      type: "skipped",
      target,
      info: "StorageEvent is already installed.",
    };
  }

  try {
    if (
      !(target as T & Data).Storage || (target as T & Data).Storage !== Storage
    ) {
      installStorage(target);
    }
    $ObjectDefineProperty(StorageEvent, "name", {
      __proto__: null,
      value: "StorageEvent",
      configurable: true,
    } as PropertyDescriptor);

    $ObjectDefineProperty(target, "StorageEvent", {
      __proto__: null,
      value: StorageEvent,
      configurable: true,
      enumerable: false,
      writable: true,
    } as PropertyDescriptor);

    data.StorageEvent = StorageEvent;
  } catch (error) {
    return { type: "failure", target, error };
  }

  return { type: "success", target, data };
}

export function install<T extends object = typeof globalThis>(
  target: T = globalThis as T,
): Result<T, Data> {
  const a = installStorage(target);
  if (a.type === "failure") return a;

  const b = installLocalStorage(target);
  if (b.type === "failure") return b;

  const c = installSessionStorage(target);
  if (c.type === "failure") return c;

  const d = installStorageEvent(target);
  if (d.type === "failure") return d;

  // Check if all installations were skipped
  if (b.type === "skipped" && c.type === "skipped" && d.type === "skipped") {
    return {
      type: "skipped",
      target,
      info: "The Web Storage API is already installed.",
    };
  }

  return {
    type: "success",
    target,
    data: {
      ...(a.type === "success" && a.data),
      ...(b.type === "success" && b.data),
      ...(c.type === "success" && c.data),
      ...(d.type === "success" && d.data),
    },
  };
}

export default install;
