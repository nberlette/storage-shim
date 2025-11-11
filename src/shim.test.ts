import { afterEach, describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";

// deno-lint-ignore no-explicit-any
const _globalThis = globalThis as any;
const originalLocalStorage = globalThis.localStorage;
const originalSessionStorage = globalThis.sessionStorage;
const originalStorageEvent = _globalThis.StorageEvent;

function clearGlobals() {
  delete _globalThis.localStorage;
  delete _globalThis.sessionStorage;
  delete _globalThis.StorageEvent;
}

describe("shim side-effect import", () => {
  afterEach(() => {
    _globalThis.localStorage = originalLocalStorage;
    _globalThis.sessionStorage = originalSessionStorage;
    _globalThis.StorageEvent = originalStorageEvent;
  });

  it("polyfills localStorage, sessionStorage, and StorageEvent if missing", async () => {
    clearGlobals();
    await import("./shim.ts?test=shim-1");
    expect(typeof _globalThis.localStorage).toBe("object");
    expect(typeof _globalThis.sessionStorage).toBe("object");
    expect(typeof _globalThis.StorageEvent).toBe("function");

    // Basic StorageEvent check
    const event = new _globalThis.StorageEvent("storage", {
      key: "testKey",
      oldValue: "old",
      newValue: "new",
    });
    expect(event.key).toBe("testKey");
    expect(event.oldValue).toBe("old");
    expect(event.newValue).toBe("new");
  });

  it("does not overwrite existing localStorage, sessionStorage, and StorageEvent", async () => {
    const customLocal = {
      marker: "customLocal",
      getItem() {
        return null;
      },
      setItem() {},
      removeItem() {},
      clear() {},
      key() {
        return null;
      },
      length: 0,
    };
    const customSession = {
      marker: "customSession",
      getItem() {
        return null;
      },
      setItem() {},
      removeItem() {},
      clear() {},
      key() {
        return null;
      },
      length: 0,
    };

    // Create a custom StorageEvent
    const MockStorageEvent = class StorageEvent extends Event {
      constructor(type: string, init?: EventInit) {
        super(type, init);
      }
    };

    clearGlobals();
    _globalThis.localStorage = customLocal;
    _globalThis.sessionStorage = customSession;
    _globalThis.StorageEvent = MockStorageEvent;

    await import("./shim.ts?test=shim-2");

    expect(_globalThis.localStorage).toBe(customLocal);
    expect(_globalThis.sessionStorage).toBe(customSession);
    expect(_globalThis.StorageEvent).toBe(MockStorageEvent);
  });

  it("is safe to import multiple times", async () => {
    clearGlobals();
    await import("./shim.ts?test=3");
    await import("./shim.ts?test=4");
    expect(typeof _globalThis.localStorage).toBe("object");
    expect(typeof _globalThis.sessionStorage).toBe("object");
  });
});
