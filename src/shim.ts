/**
 * This module automatically installs the Web Storage API polyfills
 * (`Storage`, `localStorage`, and `sessionStorage`) globally when imported.
 *
 * Simply import this module to make the Storage APIs available globally:
 *
 * @example
 * ```ts
 * import "@nick/storage/shim";
 *
 * // Now you can use Storage APIs normally
 * localStorage.setItem('key', 'value');
 * sessionStorage.setItem('temp', 'data');
 * ```
 *
 * @module shim
 */

// equivalent to a type-only side-effect import of shim.d.ts, as we can't
// actually side-effect import a .d.ts file in node without causing errors.
import type {} from "./shim.d.ts";

import { install } from "./install.ts";

{
  install();
}
