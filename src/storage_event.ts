import { $globalThis } from "./_internal.ts";
import type { Storage } from "./storage.ts";

/**
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/StorageEvent)
 */
export class StorageEvent extends Event {
  #key: string | null;
  #oldValue: string | null;
  #newValue: string | null;
  #url: string;
  #storageArea: Storage | null;

  constructor(type: string, eventInitDict?: StorageEventInit) {
    super(type, eventInitDict);
    this.#key = eventInitDict?.key ?? null;
    this.#oldValue = eventInitDict?.oldValue ?? null;
    this.#newValue = eventInitDict?.newValue ?? null;
    this.#url = eventInitDict?.url ?? "";
    this.#storageArea = eventInitDict?.storageArea ?? null;
  }

  get key(): string | null {
    return this.#key;
  }

  get oldValue(): string | null {
    return this.#oldValue;
  }

  get newValue(): string | null {
    return this.#newValue;
  }

  get url(): string {
    return this.#url;
  }

  get storageArea(): Storage | null {
    return this.#storageArea;
  }

  initStorageEvent(
    type: string,
    bubbles?: boolean,
    cancelable?: boolean,
    key?: string | null,
    oldValue?: string | null,
    newValue?: string | null,
    url?: string,
    storageArea?: Storage | null,
  ): void {
    // According to the spec, this method should only be callable before the
    // event is dispatched.
    if (this.defaultPrevented) {
      throw new Error("Cannot initialize a dispatched event");
    }

    super.initEvent(type, bubbles, cancelable);

    if (key != null) this.#key = key;
    if (oldValue != null) this.#oldValue = oldValue;
    if (newValue != null) this.#newValue = newValue;
    if (url != null) this.#url = url;
    if (storageArea != null) this.#storageArea = storageArea;
  }
}

export interface StorageEventInit extends EventInit {
  key?: string | null;
  oldValue?: string | null;
  newValue?: string | null;
  url?: string;
  storageArea?: Storage | null;
}

/**
 * Helper to dispatch a {@linkcode StorageEvent} when the storage changes.
 * @param storageArea The storage area that changed.
 * @param [key=null] The key that changed.
 * @param [oldValue=null] The old value of the key.
 * @param [newValue=null] The new value of the key.
 * @internal
 */
export function dispatchStorageEvent(
  storageArea: Storage,
  key: string | null = null,
  oldValue: string | null = null,
  newValue: string | null = null,
): void {
  try {
    const url = typeof $globalThis.location?.href === "string"
      ? $globalThis.location.href
      : "";
    // Best effort: ignore if no dispatchEvent
    if (typeof $globalThis.dispatchEvent === "function") {
      const ev = new StorageEvent("storage", {
        key,
        oldValue,
        newValue,
        url,
        storageArea,
      });
      $globalThis.dispatchEvent(ev);
    }
  } catch {
    // swallow
  }
}
