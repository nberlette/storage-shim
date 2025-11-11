import {
  $ArrayFrom,
  $FunctionHasInstance,
  $FunctionPrototypeBind,
  $Map,
  $MapPrototypeClear,
  $MapPrototypeDelete,
  $MapPrototypeGet,
  $MapPrototypeGetSize,
  $MapPrototypeHas,
  $MapPrototypeKeys,
  $MapPrototypeSet,
  $ObjectDefineProperty,
  $Proxy,
  $ReflectDefineProperty,
  $ReflectDeleteProperty,
  $ReflectGet,
  $ReflectGetOwnPropertyDescriptor,
  $ReflectHas,
  $ReflectOwnKeys,
  $ReflectSet,
  $Set,
  $SetPrototypeAdd,
  $String,
  $SymbolFor,
  $SymbolHasInstance,
  $SymbolToStringTag,
  getStore,
} from "./_internal.ts";
import { dispatchStorageEvent } from "./storage_event.ts";

const _: unique symbol = $SymbolFor("@nick/storage/internal") as never;

/**
 * Web Storage API polyfill that provides a localStorage and sessionStorage
 * implementation, backed by an in-memory storage object.
 */
export class Storage {
  static [$SymbolHasInstance](it: unknown): it is Storage {
    if ($FunctionHasInstance(Storage, it)) return true;
    return typeof it === "object" && it !== null && _ in it;
  }

  constructor() {
    const isInternal = (k: unknown) =>
      k === "length" || k === "getItem" || k === "setItem" ||
      k === "removeItem" || k === "clear" || k === "key" ||
      k === $SymbolToStringTag;

    // deno-lint-ignore no-this-alias
    const self = this;
    const proxy = new $Proxy(self, {
      get: (t, k) => {
        if (k === _) return self;
        if (isInternal(k)) {
          if (k === "length") return self.length;
          if (k === $SymbolToStringTag) return self[$SymbolToStringTag];
          const v = t[k] as (this: this, ...args: unknown[]) => unknown;
          if (typeof v === "function") {
            const bound = $FunctionPrototypeBind(v, t);
            return $ObjectDefineProperty(bound, "name", { value: k });
          }
          return v;
        }
        if (typeof k === "string") return self.getItem(k) ?? $ReflectGet(t, k);
        return $ReflectGet(t, k);
      },
      has: (t, k) => {
        if (k === _) return true;
        return isInternal(k) || $ReflectHas(t, k) ||
          typeof k === "string" && t.getItem(k) !== null;
      },
      set: (t, k, value) => {
        if (isInternal(k)) return false;
        if (typeof k === "string") {
          return t.setItem(k, $String(value ?? "")), true;
        }
        return $ReflectSet(t, k, value);
      },
      ownKeys: (t) => {
        const keys = new $Set($ReflectOwnKeys(t));
        const store = getStore(self, false) ?? new $Map();
        for (const key of $MapPrototypeKeys(store)) {
          $SetPrototypeAdd(keys, key);
        }
        $SetPrototypeAdd(keys, "length");
        return $ArrayFrom(keys);
      },
      getOwnPropertyDescriptor: (t, k) => {
        let d = $ReflectGetOwnPropertyDescriptor(t, k) as PropertyDescriptor;
        if (!d && typeof k === "string") {
          let value = null;
          if (k === "length") value = self.length;
          value ??= self.getItem(k);
          if (value === null) return d;
          d = {
            value,
            writable: k !== "length",
            configurable: true,
            enumerable: true,
          };
        } else if (d?.configurable) {
          d = {
            ...d,
            configurable: true,
          };
        }
        return d;
      },
      defineProperty: (t, k, d) => {
        if (isInternal(k)) return false;
        if (typeof k === "string") {
          if (d && "value" in d) {
            return t.setItem(k, $String(d.value ?? "")), true;
          }
        }
        return $ReflectDefineProperty(t, k, d);
      },
      deleteProperty: (t, k) => {
        if (isInternal(k)) return false;
        if (typeof k === "string") {
          return t.removeItem(k), true;
        }
        return $ReflectDeleteProperty(t, k);
      },
    });
    return proxy;
  }

  get length(): number {
    return $MapPrototypeGetSize(getStore(this, true));
  }

  getItem(key: string): string | null {
    return $MapPrototypeGet(getStore(this, true), key) ?? null;
  }

  setItem(key: string, value: string): void {
    const store = getStore(this, true);
    const stringValue = $String(value ?? "");
    const oldValue = $MapPrototypeGet(store, key) ?? null;
    $MapPrototypeSet(store, key, stringValue);
    if (oldValue !== stringValue) {
      dispatchStorageEvent(this, key, oldValue, stringValue);
    }
  }

  removeItem(key: string): void {
    const store = getStore(this, true);
    if ($MapPrototypeHas(store, key)) {
      const oldValue = $MapPrototypeGet(store, key) ?? null;
      $MapPrototypeDelete(store, key);
      dispatchStorageEvent(this, key, oldValue);
    }
  }

  clear(): void {
    const store = getStore(this, true);
    if (this.length > 0) {
      $MapPrototypeClear(store);
      dispatchStorageEvent(this);
    }
  }

  key(n: number): string | null {
    if ((n = +n) >= 0 && n < this.length) {
      for (const key of $MapPrototypeKeys(getStore(this, true))) {
        if (n-- === 0) return key;
      }
    }
    return null;
  }

  declare readonly [$SymbolToStringTag]: "Storage";

  static {
    $ObjectDefineProperty(this.prototype, $SymbolToStringTag, {
      value: "Storage",
      configurable: true,
      enumerable: false,
      writable: false,
    });
  }
}
