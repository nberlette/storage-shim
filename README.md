<div align="center">

# @nick/storage

Comprehensive ponyfills/polyfills for the standard Web Storage APIs.

[![][badge-jsr-score]][JSR] [![][badge-jsr-pkg]][JSR]

</div>

---

## Overview

This package provides in-memory [ponyfill]s for the Web Storage APIs `Storage`,
`localStorage`, `sessionStorage`, and `StorageEvent`. It also provides optional
polyfill support through the `./install` and `./shim` entry points.

## Features

- **Complete Storage API**: Full `Storage` interface with all standard methods
  defined by the Web Storage API specification.
- **localStorage + sessionStorage**: In-memory ponyfills ensure both APIs are
  always available regardless of the runtime environment you're in.
- **Cross-platform compatibility**: Works seamlessly in Deno, Bun, Node,
  Cloudflare Workers, browsers, and any other ES2015+ capable environment.
- **TypeScript support**: Written in 100% TypeScript. Includes declarations for
  all public APIs, ensuring accurate type checking, intellisense, and
  autocompletion regardless of your IDE preference.
- **Zero dependencies**: Entirely self-contained and dependency-free!
- **Standards compliant**: Follows the Web Storage API specification to a T.
- **🦄 Ponyfills!** While this package _does_ include [polyfills] on an opt-in
  basis, it primarily provides (and strongly recommends) 100% non-invasive
  [ponyfill]s that don't modify the global scope unless explicitly requested.
  > This ensures maximum compatibility, and guarantees the global scope will
  > only be modified when you specifically ask for it. No surprises here!

---

## Install

```sh
deno add jsr:@nick/storage
```

```sh
yarn add jsr:@nick/storage
```

```sh
pnpm add jsr:@nick/storage
```

```sh
bunx jsr add @nick/storage
```

```sh
npx jsr add @nick/storage
```

## Usage

The recommended usage for this package is to import the [ponyfill] directly in
your code and use it as needed. All APIs are exposed as named exports from the
root entry point of the package.

### [Ponyfill]

```ts
// import the ponyfill implementations as needed
import {
  localStorage,
  sessionStorage,
  Storage,
  type StorageEvent,
} from "@nick/storage";

// Use localStorage for persistent storage
localStorage.setItem("user", "john");
const user = localStorage.getItem("user"); // 'john'

// Use sessionStorage for session-based storage
sessionStorage.setItem("temp", "data");
const temp = sessionStorage.getItem("temp"); // 'data'

// Use the Storage constructor for custom storage instances
const customStorage = new Storage();

// Listen for storage events (in environments that support it)
if (typeof globalThis !== "undefined" && globalThis.addEventListener) {
  globalThis.addEventListener("storage", (event: StorageEvent) => {
    console.log(`Storage key changed: ${event.key}`);
    console.log(`Old value: ${event.oldValue}`);
    console.log(`New value: ${event.newValue}`);
    console.log(`URL of page that made the change: ${event.url}`);
    console.log(
      `Storage area: ${
        event.storageArea === localStorage ? "localStorage" : "sessionStorage"
      }`,
    );
  });
}
```

<details><summary><b><u>What is a Ponyfill?</u></b></summary><br>

A **ponyfill** is a polyfill that doesn't modify global objects. Instead, it
provides the functionality as _importable_ modules, giving you full control over
how and when to use them.

Unlike _polyfills_ that automatically modify global objects, _ponyfills_:

- Don't pollute the global scope with opinionated implementations
- Enable selective usage of features without affecting other code
- Provide better testability, isolation, and modularity
- Integrate well with future native implementations: you decide when to switch.
- Avoid conflicts with external libraries

> [!TIP]
>
> **[↪︎ Click here for a breakdown of ponyfills by Sindre Sorhus][ponyfill]**

</details>

### Polyfill (graceful global installation)

If you need the Storage APIs to be available globally (like in a browser), you
can install them using the `install` functions exported from the `./install`
entry point. These functions will **only** install the APIs if they are not
already available in the global scope.

```ts
import { install } from "@nick/storage/install";

const result = install();

if (result.type === "success") {
  console.log("Storage APIs installed successfully");
  // Now you can use localStorage and sessionStorage globally
  localStorage.setItem("key", "value");
  sessionStorage.setItem("temp", "data");
} else if (result.type === "skipped") {
  console.log("Storage APIs already available");
} else {
  console.error("Failed to install Storage APIs:", result.error);
}
```

### Shim (auto-install)

For convenience, you can auto-install the global APIs by importing the `shim`
entry point of this package via a side-effect import. This is a convenience
module that provides no exports — importing it is equivalent to calling the
`install` function from the `./install` entry point.

```ts
import "@nick/storage/shim";

// Storage APIs are now available globally
localStorage.setItem("key", "value");
sessionStorage.setItem("temp", "data");
```

> [!CAUTION]
>
> The `shim` entry point automatically installs the Storage APIs globally if
> they are not already present. Use with care — modifying the global scope
> _could_ lead to conflicts with other libraries/future native implementations.

### CDN Usage (via [esm.sh])

#### JavaScript/TypeScript Modules (HTTPS imports)

```ts
import {
  localStorage,
  sessionStorage,
  Storage,
  type StorageEvent,
} from "https://esm.sh/jsr/@nick/storage";

// Use the Storage APIs as needed
```

```ts
import "https://esm.sh/jsr/@nick/storage/shim";

// Storage APIs are now available globally
```

#### HTML

```html
<script type="module">
  import {
    localStorage,
    sessionStorage,
    Storage,
    type StorageEvent,
  } from "https://esm.sh/jsr/@nick/storage";

  // Use the Storage APIs as needed
</script>
```

```html
<script src="https://esm.sh/jsr/@nick/storage/shim"></script>

<!-- Storage APIs are now available globally -->
```

---

## API

### `Storage` API

The `Storage` class implements the complete Web Storage API interface.

```ts ignore
class Storage {
  readonly length: number;

  clear(): void;
  getItem(key: string): string | null;
  key(index: number): string | null;
  removeItem(key: string): void;
  setItem(key: string, value: string): void;

  [index: number]: string;
}
```

All storage instances support these methods:

#### `clear(): void`

Removes all key-value pairs from storage.

```ts
import { Storage } from "@nick/storage";

const storage = new Storage();

storage.setItem("foo", "bar");

storage.clear(); // all items removed
```

#### `getItem(key: string): string | null`

Returns the value associated with the key, or `null` if the key doesn't exist.

```ts
import { localStorage } from "@nick/storage";

const value = localStorage.getItem("username");

console.log(`Username: ${value}`);
```

#### `key(index: number): string | null`

Returns the key at the specified index, or `null` if the index is out of range.

```ts
import { sessionStorage } from "@nick/storage";

const value = sessionStorage.getItem("token");

console.log(`Token: ${value}`);
```

#### `removeItem(key: string): void`

Removes the key-value pair from storage.

```ts
import { localStorage } from "@nick/storage";

localStorage.removeItem("theme");
```

#### `setItem(key: string, value: string): void`

Sets the value for the given key. The value is always stored as a string.

```ts
import { localStorage } from "@nick/storage";

localStorage.setItem("theme", "dark");
```

---

### `localStorage`

Persistent storage that maintains data across sessions. In browser environments,
this data persists even after the browser is closed and reopened.

> [!IMPORTANT]
>
> This ponyfill has no built-in persistence mechanism, and therefore both its
> `localStorage` and `sessionStorage` implementations are **in-memory only**.
> They do not persist data across application restarts.

```ts
import { localStorage } from "@nick/storage";
import assert from "node:assert";

// store data
localStorage.setItem("username", "alice");
localStorage.setItem("preferences", JSON.stringify({ theme: "dark" }));

// retrieve data
const username = localStorage.getItem("username"); // 'alice'
const prefs = JSON.parse(localStorage.getItem("preferences") || "{}");

assert.strictEqual(username, "alice");
assert.deepStrictEqual(prefs, { theme: "dark" });

// remove specific item
localStorage.removeItem("username");

// clear all data
localStorage.clear();

assert.strictEqual(localStorage.length, 0);
```

```ts
import { localStorage } from "@nick/storage";
import assert from "node:assert";

localStorage.setItem("session_id", "xyz789");
localStorage.setItem("auth_token", "token_123");

// check storage length
console.log(
  `${localStorage.length} items in local storage`, // 2
);

// get key by index
const firstKey = localStorage.key(0); // 'session_id'
assert.strictEqual(firstKey, "session_id");

// indexed property access per specification
const sessionId = localStorage["session_id"] ||= "xyz789"; // 'xyz789'

assert.strictEqual(sessionId, localStorage["session_id"]); // 'xyz789'
```

> [!TIP]
>
> If you absolutely need persistence, consider using the native `localStorage`
> API which is supported by the latest versions of Node.js, Bun, and Deno.

---

### `sessionStorage`

Session-based storage that clears when the session ends. In browser
environments, this data is cleared when the tab is closed.

```ts
import { sessionStorage } from "@nick/storage";
import assert from "node:assert";

// store temporary data
sessionStorage.setItem("csrf_token", "abc123");
sessionStorage.setItem("form_data", JSON.stringify({ step: 2 }));

// retrieve data
const token = sessionStorage.getItem("csrf_token"); // 'abc123'
const formData = JSON.parse(sessionStorage.getItem("form_data") || "{}");

assert.strictEqual(token, "abc123");
assert.deepStrictEqual(formData, { step: 2 });

// check storage length
console.log(`${sessionStorage.length} items in session storage`);

// get key by index
const firstKey = sessionStorage.key(0);
assert.strictEqual(firstKey, "csrf_token");

// clear session data
sessionStorage.clear();
assert.strictEqual(sessionStorage.length, 0);
```

---

### `StorageEvent`

This package also includes a `StorageEvent` implementation to match the Web
Storage specification. StorageEvents are fired when changes are made to Storage
instances like `localStorage` or `sessionStorage` in another context (e.g. a
different browser tab/window/frame that shares the same origin).

#### Basic Usage

In browser environments that support it, `StorageEvent` is fired automatically
when storage changes in a different window or tab, or from other contexts like
iframes or service workers.

##### Creating StorageEvent Manually

```ts
import { StorageEvent } from "@nick/storage";

const event = new StorageEvent("storage", {
  key: "theme",
  oldValue: "light",
  newValue: "dark",
  url: "https://example.com",
  storageArea: localStorage,
});

// If in a browser environment, you could dispatch it
if (
  typeof globalThis.navigator !== "undefined" &&
  !globalThis.navigator.userAgent?.includes("Deno") &&
  typeof globalThis.dispatchEvent === "function"
) globalThis.dispatchEvent(event);
```

##### Listening for Storage Events

```ts
import "@nick/storage/shim";

// Add a listener for storage events
addEventListener("storage", (event) => {
  console.log(`Storage key changed: ${event.key}`);
  console.log(`Old value: ${event.oldValue}`);
  console.log(`New value: ${event.newValue}`);
  console.log(`URL of page that made the change: ${event.url}`);
  console.log(
    `Storage area: ${
      event.storageArea === localStorage ? "localStorage" : "sessionStorage"
    }`,
  );
});
```

In Deno or other non-browser environments, storage events are simulated when
modifications are made to the storage objects. These events are only dispatched
in the same context where the change was made.

#### Creating StorageEvent Manually

```ts
import { StorageEvent } from "@nick/storage";

const event = new StorageEvent("storage", {
  key: "user-preferences",
  oldValue: '{"theme":"light"}',
  newValue: '{"theme":"dark"}',
  url: "https://example.com",
  storageArea: localStorage,
});

// If in a browser environment, you could dispatch it
if (
  typeof globalThis.navigator !== "undefined" &&
  !globalThis.navigator.userAgent?.includes("Deno") &&
  typeof globalThis.dispatchEvent === "function"
) {
  globalThis.dispatchEvent(event);
}
```

#### StorageEvent Properties

- `key`: The key being changed (string)
- `oldValue`: The previous value, or null for new items
- `newValue`: The new value, or null if the key was removed
- `url`: The URL of the page where the change occurred
- `storageArea`: The storage object that was modified (localStorage or
  sessionStorage)

#### StorageEvent Methods

- `initStorageEvent()`: Legacy method to initialize the event (similar to
  [`Event.initEvent`](https://developer.mozilla.org/en-US/docs/Web/API/Event/initEvent))

---

## Environment Compatibility

This package is fully supported in the following environments:

- [Deno](https://deno.land/)
- [Node.js](https://nodejs.org/)
- [Bun](https://bun.sh/)
- [Cloudflare Workers](https://workers.cloudflare.com/)
- [Deno Deploy](https://deno.com/deploy)
- [Netlify Functions](https://www.netlify.com/products/functions/)
- Browsers (though native implementations are preferred when available)
- any other ES2015+ capable environment

## Contributing

Contributions are always welcome! Please open an issue to discuss any proposed
changes before submitting a Pull Request.

---

<div align="center">

**[MIT] © [Nicholas Berlette]**. All rights reserved.

<small>

[github] · [issues] · [docs] · [jsr] · [esm.sh] · [@nick]

</small>

</div>

[MIT]: https://nick.mit-license.org "MIT © Nicholas Berlette. All rights reserved."
[@nick]: https://jsr.io/@nick "Explore more packages by @nick on JSR"
[polyfills]: https://developer.mozilla.org/en-US/docs/Glossary/Polyfill "What is a Polyfill? on MDN Web Docs"
[JSR]: https://jsr.io/@nick/storage "View @nick/storage on JSR"
[badge-jsr-pkg]: https://img.shields.io/jsr/v/%40nick/storage?logo=jsr&label=JSR
[badge-jsr-score]: https://jsr.io/badges/@nick/storage/score
[ponyfill]: https://ponyfill.com "What is a Ponyfill? by Sindre Sorhus"
[esm.sh]: https://esm.sh/jsr/@nick/storage "Import @nick/storage via esm.sh CDN"
[Nicholas Berlette]: https://github.com/nberlette "Follow the author, Nicholas Berlette, on GitHub"
[GitHub]: https://github.com/nberlette/storage-ponyfill#readme "Give the project a star on GitHub! ⭐️"
[Issues]: https://github.com/nberlette/storage-ponyfill/issues "Report issues or suggest features on GitHub"
[Docs]: https://jsr.io/@nick/storage/doc "Read the full documentation on JSR"
