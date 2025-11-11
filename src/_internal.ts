// deno-lint-ignore-file no-explicit-any ban-types no-var
// deno-coverage-ignore-file
// import type { URLSearchParams } from "./url_search_params.ts"

export var $globalThis: typeof globalThis = globalThis;

export var $Error: ErrorConstructor = $globalThis.Error;
export var $TypeError: TypeErrorConstructor = $globalThis.TypeError;
export var $RangeError: RangeErrorConstructor = $globalThis.RangeError;
export var $URIError: URIErrorConstructor = $globalThis.URIError;
export var $EvalError: EvalErrorConstructor = $globalThis.EvalError;
export var $ReferenceError: ReferenceErrorConstructor =
  $globalThis.ReferenceError;
export var $SyntaxError: SyntaxErrorConstructor = $globalThis.SyntaxError;
export var $AggregateError: AggregateErrorConstructor =
  $globalThis.AggregateError;

export var $String: StringConstructor = $globalThis.String;

export var $Symbol: SymbolConstructor = $globalThis.Symbol;
export var $SymbolFor: typeof Symbol.for = $Symbol.for;
export var $SymbolIterator: typeof Symbol.iterator = $Symbol.iterator;
export var $SymbolToStringTag: typeof Symbol.toStringTag = $Symbol.toStringTag;
export var $SymbolHasInstance: typeof Symbol.hasInstance = $Symbol.hasInstance;

export var $Reflect: typeof Reflect = $globalThis.Reflect;
export var $ReflectApply: typeof Reflect.apply = $Reflect.apply;
export var $ReflectConstruct: typeof Reflect.construct = $Reflect.construct;
export var $ReflectGet: typeof Reflect.get = $Reflect.get;
export var $ReflectSet: typeof Reflect.set = $Reflect.set;
export var $ReflectHas: typeof Reflect.has = $Reflect.has;
export var $ReflectOwnKeys: typeof Reflect.ownKeys = $Reflect.ownKeys;
export var $ReflectGetOwnPropertyDescriptor:
  typeof Reflect.getOwnPropertyDescriptor = $Reflect.getOwnPropertyDescriptor;
export var $ReflectDefineProperty: typeof Reflect.defineProperty =
  $Reflect.defineProperty;
export var $ReflectDeleteProperty: typeof Reflect.deleteProperty =
  $Reflect.deleteProperty;
export var $ReflectGetPrototypeOf: typeof Reflect.getPrototypeOf =
  $Reflect.getPrototypeOf;
export var $ReflectSetPrototypeOf: typeof Reflect.setPrototypeOf =
  $Reflect.setPrototypeOf;
export var $ReflectIsExtensible: typeof Reflect.isExtensible =
  $Reflect.isExtensible;
export var $ReflectPreventExtensions: typeof Reflect.preventExtensions =
  $Reflect.preventExtensions;

export var $Proxy: ProxyConstructor = $globalThis.Proxy;

export var $Function: FunctionConstructor = $globalThis.Function;
export var $FunctionPrototype: Function = $Function.prototype;
const { bind, call, apply } = $FunctionPrototype;

export const uncurryThis: <T, A extends readonly any[], R = any>(
  fn: (this: T, ...args: A) => R,
  _self?: T,
) => (self: T, ...args: A) => R = bind.bind(call);

export var $FunctionHasInstance = uncurryThis($Function[$SymbolHasInstance]);
export var $FunctionPrototypeHasInstance = uncurryThis(
  $FunctionPrototype[$SymbolHasInstance],
);
export var $FunctionPrototypeBind: <T, A extends any[], B extends any[], R>(
  self: (this: T, ...args: [...A, ...B]) => R,
  thisArg: T,
  ...args: A
) => (...args: B) => R = uncurryThis(bind);
export var $FunctionPrototypeCall: <T, A extends any[], R>(
  self: (this: T, ...args: A) => R,
  thisArg: T,
  ...args: A
) => R = uncurryThis(call as CallableFunction["call"]);
export var $FunctionPrototypeApply: <T, A extends any[], R>(
  self: (this: T, ...args: A) => R,
  thisArg: T,
  args: A,
) => R = uncurryThis(apply);

export var $StringPrototype: String = $String.prototype;
export var $StringPrototypeSlice: (
  string: string,
  start?: number,
  end?: number,
) => string = uncurryThis(
  $StringPrototype.slice,
);
export var $StringPrototypeStartsWith: (
  string: string,
  search: string,
  position?: number,
) => boolean = uncurryThis(
  $StringPrototype.startsWith,
);
export var $StringPrototypeEndsWith: (
  string: string,
  search: string,
  position?: number,
) => boolean = uncurryThis(
  $StringPrototype.endsWith,
);
export var $StringPrototypeSplit: (
  string: string,
  separator: string | RegExp,
  limit?: number,
) => string[] = uncurryThis(
  $StringPrototype.split,
) as never;
export var $StringPrototypeIndexOf: (
  string: string,
  search: string,
  position?: number,
) => number = uncurryThis(
  $StringPrototype.indexOf,
);
export var $StringPrototypeLastIndexOf: (
  string: string,
  search: string,
  position?: number,
) => number = uncurryThis(
  $StringPrototype.lastIndexOf,
);

export var $Array: ArrayConstructor = $globalThis.Array;
export var $ArrayFrom: typeof $Array.from = $FunctionPrototypeBind(
  $Array.from,
  $Array,
) as typeof $Array.from;
export var $ArrayPrototype: Array<any> = $Array.prototype;
export var $ArrayPrototypePush: <T>(array: T[], ...items: T[]) => number =
  uncurryThis(
    $ArrayPrototype.push,
  );
export var $ArrayPrototypePop: <T>(array: T[]) => T | undefined = uncurryThis(
  $ArrayPrototype.pop,
);
export var $ArrayPrototypeShift: <T>(array: T[]) => T | undefined = uncurryThis(
  $ArrayPrototype.shift,
);
export var $ArrayPrototypeUnshift: <T>(array: T[], ...items: T[]) => number =
  uncurryThis(
    $ArrayPrototype.unshift,
  );
export var $ArrayPrototypeIndexOf: <T>(
  array: T[],
  searchElement: T,
  fromIndex?: number,
) => number = uncurryThis(
  $ArrayPrototype.indexOf,
);
export var $ArrayPrototypeLastIndexOf: <T>(
  array: T[],
  searchElement: T,
  fromIndex?: number,
) => number = uncurryThis(
  $ArrayPrototype.lastIndexOf,
);
export var $ArrayPrototypeJoin: (array: any[], separator?: string) => string =
  uncurryThis(
    $ArrayPrototype.join,
  );

export var $RegExp: RegExpConstructor = $globalThis.RegExp;
export var $RegExpPrototype: RegExp = $RegExp.prototype;
export var $RegExpPrototypeExec: (
  regexp: RegExp,
  string: string,
) => RegExpExecArray | null = uncurryThis(
  $RegExpPrototype.exec,
);
export var $RegExpPrototypeTest: (regexp: RegExp, string: string) => boolean =
  uncurryThis(
    $RegExpPrototype.test,
  );

export var $Object: ObjectConstructor = $globalThis.Object;
export var $ObjectGetOwnPropertyDescriptor:
  typeof $Object.getOwnPropertyDescriptor = $Object.getOwnPropertyDescriptor;
export var $ObjectGetOwnPropertyDescriptors:
  typeof $Object.getOwnPropertyDescriptors =
    $Object.getOwnPropertyDescriptors || function <T extends object>(o: T) {
      const result: PropertyDescriptorMap = {};
      const keys: (string | symbol)[] = $ObjectGetOwnPropertyNames(o);
      if (typeof $ObjectGetOwnPropertySymbols === "function") {
        keys.push(...$ObjectGetOwnPropertySymbols(o));
      }
      for (const key of keys) {
        const desc = $ObjectGetOwnPropertyDescriptor(o, key);
        if (desc) result[key] = desc;
      }
      return result;
    };
export var $ObjectGetOwnPropertyNames: typeof $Object.getOwnPropertyNames =
  $Object.getOwnPropertyNames;
export var $ObjectGetOwnPropertySymbols: typeof $Object.getOwnPropertySymbols =
  $Object.getOwnPropertySymbols;
export var $ObjectGetPrototypeOf: typeof $Object.getPrototypeOf =
  $Object.getPrototypeOf;
export var $ObjectSetPrototypeOf: typeof $Object.setPrototypeOf =
  $Object.setPrototypeOf || function setPrototypeOf(o, p) {
    if (o === null) {
      throw new $TypeError("Cannot set prototype of null");
    }
    try {
      o.__proto__ = p;
    } catch {
      throw new $TypeError("Cannot set prototype of non-object");
    }
    return o;
  };

let $$ObjectDefineProperty = $Object.defineProperty;

export var $ObjectDefineProperty: typeof $Object.defineProperty = function (
  o,
  p,
  d,
) {
  return $FunctionPrototypeApply($$ObjectDefineProperty, void 0, [o, p, d]);
} as typeof $Object.defineProperty;

function setODP(fn: Function | ((...args: any) => any)) {
  return $$ObjectDefineProperty = fn as typeof $Object.defineProperty;
}

export {
  /**
   * For testing purposes only, allowing us to mock the Object.defineProperty
   * variable to test the shim. Do not ever use this in production code. This
   * function has mild potential to become an attack vector if exposed prior to
   * the shim being installed.
   *
   * To further deter usage, we only export this function under a string
   * literal alias that both illustrates the danger of using it and obscures it
   * from any autocomplete or intellisense, since it is not a valid JavaScript
   * identifier.
   * @internal
   * @private
   */
  setODP as " DO NOT USE THIS! ¡PELIGRO! ACHTUNG! DANGER! ",
};

export var $ObjectDefineProperties = $Object.defineProperties ||
  function defineProperties(o, p) {
    for (const k in p) {
      if (!$ObjectHasOwn(p, k)) continue;
      const desc = $ObjectGetOwnPropertyDescriptor(p, k);
      if (desc) $ObjectDefineProperty(o, k, desc);
    }
    return o;
  };
export var $ObjectKeys: <T extends object>(o: T) => Array<keyof T> =
  $Object.keys;
export var $ObjectValues: <T extends object>(o: T) => Array<T[keyof T]> =
  $Object.values;
export var $ObjectEntries: <T extends object>(o: T) => Array<
  {
    [K in keyof T]: [K, T[K]];
  }[keyof T]
> = $Object.entries;
export var $ObjectFromEntries: <
  const T extends ReadonlyArray<[PropertyKey, unknown]>,
>(
  entries: T,
) => { [K in T[number] as K[0]]: K[1] } = $Object.fromEntries;

export var $ObjectPrototype: Object = $Object.prototype;
export var $ObjectPrototypeToString: (self: unknown) => string = uncurryThis(
  $ObjectPrototype.toString,
);
export var $ObjectHasOwn: <T extends object, K extends PropertyKey>(
  o: T,
  p: K,
) => o is T & Record<K, K extends keyof T ? T[K] : unknown> = (() => {
  if (typeof $Object.hasOwn === "function") return $Object.hasOwn as never;
  return uncurryThis($ObjectPrototype.hasOwnProperty) as never;
})();

export var $Map: MapConstructor = $globalThis.Map;
export var $MapPrototype: Map<any, any> = $Map.prototype;
export var $MapPrototypeGet = uncurryThis($MapPrototype.get);
export var $MapPrototypeSet = uncurryThis($MapPrototype.set);
export var $MapPrototypeGetSize = uncurryThis(
  $ObjectGetOwnPropertyDescriptor($MapPrototype, "size")?.get!,
);
export var $MapPrototypeHas = uncurryThis($MapPrototype.has);
export var $MapPrototypeKeys = uncurryThis($MapPrototype.keys);
export var $MapPrototypeClear = uncurryThis($MapPrototype.clear);
export var $MapPrototypeDelete = uncurryThis($MapPrototype.delete);

export var $Set: SetConstructor = $globalThis.Set;
export var $SetPrototype: Set<any> = $Set.prototype;
export var $SetPrototypeAdd = uncurryThis($SetPrototype.add);
export var $SetPrototypeKeys = uncurryThis($SetPrototype.keys);

export var $WeakMap: WeakMapConstructor = $globalThis.WeakMap;
export var $WeakMapPrototype: WeakMap<any, any> = $WeakMap.prototype;
export var $WeakMapPrototypeGet = uncurryThis($WeakMapPrototype.get);
export var $WeakMapPrototypeSet = uncurryThis($WeakMapPrototype.set);
export var $WeakMapPrototypeHas = uncurryThis($WeakMapPrototype.has);
export var $WeakMapPrototypeDelete = uncurryThis($WeakMapPrototype.delete);

export var $WeakSet: WeakSetConstructor = $globalThis.WeakSet;
export var $FinalizationRegistry: FinalizationRegistryConstructor =
  $globalThis.FinalizationRegistry;
export var $WeakRef: WeakRefConstructor = $globalThis.WeakRef;

const STORAGE = new $WeakMap();

export function getStore(storage: Storage, create?: boolean) {
  let store = $WeakMapPrototypeGet(STORAGE, storage);
  if (!store && create) {
    $WeakMapPrototypeSet(STORAGE, storage, store = new $Map());
  }
  return store;
}

export const kDenoInspect: unique symbol = $SymbolFor(
  "Deno.customInspect",
) as never;
export const kNodeInspect: unique symbol = $SymbolFor(
  "nodejs.util.inspect.custom",
) as never;

export interface InspectOptions {
  breakLength?: number;
  colors?: boolean;
  compact?: boolean | number;
  customInspect?: boolean;
  depth?: number | null;
  getters?: boolean | "get" | "set";
  maxArrayLength?: number | null;
  maxStringLength?: number | null;
  showHidden?: boolean;
  showProxy?: boolean;
  sorted?: boolean;
}

export interface InspectOptionsStylized extends InspectOptions {
  stylize(text: string, style: string): string;
}

export type InspectCallback<T> = (
  this: T,
  depth: number | null,
  options: InspectOptionsStylized,
) => string;

export type UpdateCallback = (this: URLSearchParams, search: string) => void;

export function isIterableObject<T>(it: unknown): it is Iterable<T> & object {
  return (typeof it === "object" && it !== null && $SymbolIterator in it &&
    typeof it[$SymbolIterator] === "function");
}
/**
 * @internal represents the parsed components of a URL
 */
export interface ParsedURL {
  protocol: string; // e.g. "https:"
  username: string;
  password: string;
  hostname: string;
  port: string;
  pathname: string;
  /** includes leading "?" if non-empty */
  search: string;
  /** includes leading "#" if non-empty */
  hash: string;
}
/**
 * Removes dot-segments from a URL path per RFC 3986 Section 5.2.4.
 * @param path The URL path.
 * @returns The normalized path.
 * @internal
 */
export function normalize(path: string): string {
  const input = $StringPrototypeSplit(path, /[\\/]+/);
  const output: string[] = [];
  for (let i = 0; i < input.length; i++) {
    const segment = input[i];
    if (segment === "..") {
      if (output.length > 1 || (output.length === 1 && output[0] !== "")) {
        $ArrayPrototypePop(output);
      }
    } else if (segment !== "." && segment !== "") {
      $ArrayPrototypePush(output, segment);
    } else if (segment === "" && output.length === 0) {
      // preserve the leading empty segment for an absolute path
      $ArrayPrototypePush(output, "");
    }
  }
  // If the last segment was "." or "..", ensure trailing slash.
  if (path[path.length - 1] === "/" || path[path.length - 1] === "\\") {
    $ArrayPrototypePush(output, "");
  }
  // Ensure that if the input started with "/" the output does too.
  if (path[0] === "/" && output[0] !== "") {
    $ArrayPrototypeUnshift(output, "");
  }
  if (!output.length) $ArrayPrototypePush(output, "");
  return $ArrayPrototypeJoin(output, "/");
}

const absoluteRegex =
  /^(?<protocol>[a-zA-Z][a-zA-Z\d+-.]*:)(?:\/\/(?:(?<username>[^:@\/?#]+)(?::(?<password>[^:@\/?#]*))?@)?(?<hostname>[^:\/?#]+)(?::(?<port>\d+))?)?(?<pathname>\/[^?#]*)?(?<search>\?[^#]*)?(?<hash>#.*)?$/;

// Protocol-relative URL (starts with "//")
const protocolRelativeRegex =
  /^\/\/(?:(?<username>[^:@\/?#]+)(?::(?<password>[^:@\/?#]*))?@)?(?<hostname>[^:\/?#]+)(?::(?<port>\d+))?(?<pathname>\/[^?#]*)?(?<search>\?[^#]*)?(?<hash>#.*)?$/;

const relativeRegex = /^(?<pathname>[^?#]*)(?<search>\?[^#]*)?(?<hash>#.*)?$/;

/**
 * Parses a URL string into its components.
 * Supports absolute, protocol-relative, and relative URLs.
 * @param input The URL string.
 * @returns An object with the parsed parts.
 * @throws {TypeError} if the URL cannot be parsed.
 * @internal
 */
export function parseURL(input: string): Partial<ParsedURL> {
  // Absolute URL (with scheme)
  let match = $RegExpPrototypeExec(absoluteRegex, input);
  if (match && match.groups) {
    return {
      protocol: match.groups.protocol,
      username: match.groups.username || "",
      password: match.groups.password || "",
      hostname: match.groups.hostname || "",
      port: match.groups.port || "",
      pathname: match.groups.pathname || "/",
      search: match.groups.search || "",
      hash: match.groups.hash || "",
    };
  }
  // Protocol-relative URL (starts with "//")
  match = $RegExpPrototypeExec(protocolRelativeRegex, input);
  if (match && match.groups) {
    return {
      protocol: "", // will be filled from the base
      username: match.groups.username || "",
      password: match.groups.password || "",
      hostname: match.groups.hostname || "",
      port: match.groups.port || "",
      pathname: match.groups.pathname || "/",
      search: match.groups.search || "",
      hash: match.groups.hash || "",
    };
  }
  // Relative URL (no scheme or authority)
  match = $RegExpPrototypeExec(relativeRegex, input);
  if (match && match.groups) {
    return {
      protocol: "",
      username: "",
      password: "",
      hostname: "",
      port: "",
      pathname: match.groups.pathname || "/",
      search: match.groups.search || "",
      hash: match.groups.hash || "",
    };
  }
  // Invalid URL
  throw new $TypeError("Invalid URL");
}
/**
 * Resolves a relative URL against a base URL per RFC 3986 Section 5.2.
 * @param base The base URL components.
 * @param relative The relative URL components.
 * @returns The resolved absolute URL components.
 * @internal
 */
export function resolveURL(
  base: ParsedURL,
  relative: Partial<ParsedURL>,
): ParsedURL {
  // If the relative URL has a scheme, it is absolute.
  if (relative.protocol) {
    return {
      protocol: relative.protocol,
      username: relative.username || "",
      password: relative.password || "",
      hostname: relative.hostname || "",
      port: relative.port || "",
      pathname: normalize(relative.pathname || "/"),
      search: relative.search || "",
      hash: relative.hash || "",
    };
  }
  const result: ParsedURL = {
    protocol: base.protocol,
    username: base.username,
    password: base.password,
    hostname: base.hostname,
    port: base.port,
    pathname: "/",
    search: relative.search || "",
    hash: relative.hash || "",
  };

  // If the relative URL specifies an authority, use it.
  if (relative.hostname) {
    result.username = relative.username || "";
    result.password = relative.password || "";
    result.hostname = relative.hostname;
    result.port = relative.port || "";
    result.pathname = normalize(relative.pathname || "/");
  } else {
    // No authority in relative URL
    if (!relative.pathname) {
      result.pathname = base.pathname || "/";
      if (!relative.search) result.search = base.search;
    } else {
      if ($StringPrototypeStartsWith(relative.pathname, "/")) {
        result.pathname = normalize(relative.pathname);
      } else {
        // Merge with base path
        const basePath = base.pathname;
        const idx = $StringPrototypeLastIndexOf(basePath, "/");
        const merged =
          (idx !== -1 ? $StringPrototypeSlice(basePath, 0, idx + 1) : "/") +
          relative.pathname;
        result.pathname = normalize(merged);
      }
    }
  }
  return result;
}
