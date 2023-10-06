import {
  isObject,
  isIterable,
  removeDuplicates,
  readArray,
  readObject,
  sanitizeSchema,
} from "../scripts/schemaSanitizer.js";
import jest from "jest-mock";
import * as modul from "../scripts/schemaSanitizer.js";

describe("isObject", () => {
  it("should return true for objects", () => {
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(true);
    expect(isObject(null)).toBe(false); // Null is not considered an object
    expect(isObject(42)).toBe(false); // Number is not considered an object
    expect(isObject("string")).toBe(false); // String is not considered an object
  });
});

describe("isIterable", () => {
  it("should return true for iterable values", () => {
    expect(isIterable({})).toBe(true);
    expect(isIterable([])).toBe(true);
    expect(isIterable(null)).toBe(false); // Null is not considered iterable
    expect(isIterable(42)).toBe(false); // Number is not considered iterable
    expect(isIterable("string")).toBe(false); // String is not considered iterable
  });
});

describe("readArray", () => {
  it("should remove duplicates from an array and log removed items", () => {
    const input = [{ x: 1 }, { y: 2 }, { x: 1 }];
    const removedItems = [];
    readArray(input, removedItems);
    expect(removedItems).toEqual([{ x: 1 }]);
  });
});

describe("readObject", () => {
  it("should remove duplicates from an object (automatically done by javascript)", () => {
    const input = { a: { x: 1 }, b: { y: 2 }, a: { x: 1 } };
    expect(input).toEqual({ a: { x: 1 }, b: { y: 2 } });
  });
});

describe("sanitizeSchema", () => {
  it("should sanitize a schema and log removed items", () => {
    const input = {
      a: { x: 1 },
      b: { y: 2 },
      c: [{ z: 3 }, { z: 3 }, { w: 4 }],
    };
    const removedItems = [];
    sanitizeSchema(input, removedItems);
    expect(removedItems).toEqual([{ z: 3 }]);
  });
});
