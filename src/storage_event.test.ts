import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { StorageEvent } from "./storage_event.ts";
import { Storage } from "./storage.ts";

describe("StorageEvent", () => {
  it("should be constructable with minimal params", () => {
    const event = new StorageEvent("storage");
    expect(event.type).toBe("storage");
    expect(event.key).toBeNull();
    expect(event.oldValue).toBeNull();
    expect(event.newValue).toBeNull();
    expect(event.url).toBe("");
    expect(event.storageArea).toBeNull();
    expect(event.bubbles).toBe(false);
    expect(event.cancelable).toBe(false);
  });

  it("should be constructable with full params", () => {
    const storage = new Storage();
    const event = new StorageEvent("storage", {
      key: "testKey",
      oldValue: "oldValue",
      newValue: "newValue",
      url: "https://example.com",
      storageArea: storage,
      bubbles: true,
      cancelable: true,
    });

    expect(event.type).toBe("storage");
    expect(event.key).toBe("testKey");
    expect(event.oldValue).toBe("oldValue");
    expect(event.newValue).toBe("newValue");
    expect(event.url).toBe("https://example.com");
    expect(event.storageArea).toBe(storage);
    expect(event.bubbles).toBe(true);
    expect(event.cancelable).toBe(true);
  });

  it("should initialize with initStorageEvent", () => {
    const storage = new Storage();
    const event = new StorageEvent("initial");

    event.initStorageEvent(
      "storage",
      true,
      true,
      "initKey",
      "initOld",
      "initNew",
      "https://init.example",
      storage,
    );

    expect(event.type).toBe("storage");
    expect(event.key).toBe("initKey");
    expect(event.oldValue).toBe("initOld");
    expect(event.newValue).toBe("initNew");
    expect(event.url).toBe("https://init.example");
    expect(event.storageArea).toBe(storage);
    expect(event.bubbles).toBe(true);
    expect(event.cancelable).toBe(true);
  });

  it("should reject initStorageEvent after dispatch", () => {
    const event = new StorageEvent("storage");

    // Simulate a dispatched event
    Object.defineProperty(event, "defaultPrevented", { value: true });

    expect(() => {
      event.initStorageEvent("modified", true, true);
    }).toThrow(/Cannot initialize a dispatched event/);
  });
});
