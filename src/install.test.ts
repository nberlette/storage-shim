import { afterEach, describe, it } from "@std/testing/bdd";
import { expect, fn } from "@std/expect";
import {
  install,
  installLocalStorage,
  installSessionStorage,
  installStorageEvent,
} from "./install.ts";
import { assert } from "@std/assert";
import * as internal from "./_internal.ts";

const setObjectDefineProperty =
  internal[" DO NOT USE THIS! ¡PELIGRO! ACHTUNG! DANGER! "];

const globalLocalStorage = globalThis.localStorage;
const globalSessionStorage = globalThis.sessionStorage;
const globalStorageEvent = (globalThis as any).StorageEvent;
// deno-lint-ignore no-explicit-any
const _globalThis = globalThis as any;

afterEach(() => {
  _globalThis.localStorage = globalLocalStorage;
  _globalThis.sessionStorage = globalSessionStorage;
  _globalThis.StorageEvent = globalStorageEvent;
});

describe("installLocalStorage", () => {
  it("should install localStorage if not already available", () => {
    delete _globalThis.localStorage;
    const result = installLocalStorage();
    assert(
      result.type === "success" && _globalThis.localStorage,
      "Install should be successful",
    );
    assert(
      _globalThis.localStorage === result.data.localStorage,
      "Should install localStorage on globalThis",
    );
    assert(
      result.data.localStorage !== globalLocalStorage,
      "Should return a reference to the ponyfill localStorage instance",
    );
  });

  it("should skip installation if localStorage is already available", () => {
    const result = installLocalStorage();
    assert(result.type === "skipped", "Install should be skipped");
    assert(
      _globalThis.localStorage === globalLocalStorage,
      "Should not modify the existing localStorage on globalThis",
    );
  });

  it("should handle errors during installation", () => {
    delete _globalThis.localStorage;
    const originalDefineProperty = internal.$Object.defineProperty;

    try {
      const error = new TypeError("Cannot redefine property: localStorage");
      const defineProperty = fn((...args: unknown[]) => {
        if (args[1] === "localStorage") throw error;
      });
      setObjectDefineProperty(defineProperty);

      const result = installLocalStorage();
      assert(
        result.type === "failure",
        "Installation should fail on non-configurable property",
      );
      expect(result.error, "Should contain the thrown error").toBe(error);
      // one attempt for 'localStorage'
      expect(defineProperty).toBeCalledTimes(1);
    } finally {
      setObjectDefineProperty(originalDefineProperty);
    }
  });
});

describe("installSessionStorage", () => {
  it("should install sessionStorage if not already available", () => {
    delete _globalThis.sessionStorage;
    const result = installSessionStorage();
    assert(
      result.type === "success" && _globalThis.sessionStorage,
      "Install should be successful",
    );
    assert(
      _globalThis.sessionStorage === result.data.sessionStorage,
      "Should install sessionStorage on globalThis",
    );
    assert(
      result.data.sessionStorage !== globalSessionStorage,
      "Should return a reference to the ponyfill sessionStorage instance",
    );
  });

  it("should skip installation if sessionStorage is already available", () => {
    const result = installSessionStorage();
    assert(result.type === "skipped", "Install should be skipped");
    assert(
      _globalThis.sessionStorage === globalSessionStorage,
      "Should not modify the existing sessionStorage on globalThis",
    );
  });

  it("should handle errors during installation", () => {
    delete _globalThis.sessionStorage;
    const originalDefineProperty = internal.$Object.defineProperty;

    try {
      const error = new TypeError("Cannot redefine property: sessionStorage");
      const defineProperty = fn((...args: unknown[]) => {
        if (args[1] === "sessionStorage") throw error;
      });
      setObjectDefineProperty(defineProperty);

      const result = installSessionStorage();
      assert(
        result.type === "failure",
        "Installation should fail on non-configurable property",
      );
      expect(result.error, "Should contain the thrown error").toBe(error);
      expect(defineProperty).toBeCalledTimes(1);
    } finally {
      setObjectDefineProperty(originalDefineProperty);
    }
  });
});

describe("installStorageEvent", () => {
  it("should install StorageEvent if not already available", () => {
    delete _globalThis.StorageEvent;
    const result = installStorageEvent();
    assert(
      result.type === "success" && _globalThis.StorageEvent,
      "Install should be successful",
    );
    assert(
      _globalThis.StorageEvent === result.data.StorageEvent,
      "Should install StorageEvent on globalThis",
    );
    assert(
      result.data.StorageEvent !== globalStorageEvent ||
        globalStorageEvent === undefined,
      "Should return a reference to the polyfill StorageEvent constructor",
    );
  });

  it("should skip installation if StorageEvent is already available", () => {
    // Ensure StorageEvent exists for this test
    if (!globalStorageEvent) {
      _globalThis.StorageEvent = function MockStorageEvent() {};
    }

    const result = installStorageEvent();
    assert(result.type === "skipped", "Install should be skipped");
    assert(
      _globalThis.StorageEvent ===
        (globalStorageEvent || _globalThis.StorageEvent),
      "Should not modify the existing StorageEvent on globalThis",
    );
  });

  it("should handle errors during installation", () => {
    delete _globalThis.StorageEvent;
    const originalDefineProperty = internal.$Object.defineProperty;

    try {
      const error = new TypeError("Cannot redefine property: StorageEvent");
      const defineProperty = fn((...args: unknown[]) => {
        if (args[1] === "StorageEvent") throw error;
      });
      setObjectDefineProperty(defineProperty);

      const result = installStorageEvent();
      assert(
        result.type === "failure",
        "Installation should fail on non-configurable property",
      );
      expect(result.error, "Should contain the thrown error").toBe(error);
      expect(defineProperty).toBeCalledTimes(2); // Once for name, once for global
    } finally {
      setObjectDefineProperty(originalDefineProperty);
    }
  });
});

describe("install", () => {
  it("should install both localStorage and sessionStorage", () => {
    delete _globalThis.localStorage;
    delete _globalThis.sessionStorage;

    const result = install();
    assert(result.type === "success", "Install should be successful");
    assert(_globalThis.localStorage, "localStorage should be installed");
    assert(_globalThis.sessionStorage, "sessionStorage should be installed");
  });

  it("should skip installation if both are already available", () => {
    const result = install();
    assert(result.type === "skipped", "Install should be skipped");
  });

  it("should install StorageEvent along with other APIs", () => {
    delete _globalThis.localStorage;
    delete _globalThis.sessionStorage;
    delete _globalThis.StorageEvent;

    const result = install();
    assert(result.type === "success", "Install should be successful");
    assert(_globalThis.localStorage, "localStorage should be installed");
    assert(_globalThis.sessionStorage, "sessionStorage should be installed");
    assert(_globalThis.StorageEvent, "StorageEvent should be installed");
  });

  it("should handle errors during installation", () => {
    delete _globalThis.localStorage;
    delete _globalThis.sessionStorage;
    const originalDefineProperty = internal.$Object.defineProperty;

    try {
      const error = new TypeError("Cannot redefine property: localStorage");
      const defineProperty = fn(function (...args: unknown[]) {
        if (args[1] === "localStorage") throw error;
      });
      setObjectDefineProperty(defineProperty);

      const result = install();

      assert(
        result.type === "failure",
        "Installation should fail on non-configurable property",
      );
      expect(result.error, "Should contain the thrown error").toBe(error);
      // one attempt for failing 'localStorage' property
      expect(defineProperty).toBeCalledTimes(1);
    } finally {
      setObjectDefineProperty(originalDefineProperty);
    }
  });
});
