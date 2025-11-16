import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { pick, debounce, isNumber, parseJSON } from "@/utils/common";

describe("common utils unit tests", () => {
  describe("pick", () => {
    it("returns object containing only requested keys", () => {
      const source = { a: "A", b: "B", c: "C" };

      expect(pick(source, "a", "c")).toEqual({ a: "A", c: "C" });
    });

    it("returns empty object when source is falsy", () => {
      expect(pick(undefined, "a")).toEqual({});
    });
  });

  describe("debounce", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("delays execution until wait duration passes", () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 100);

      debounced("first");
      expect(fn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith("first");
    });

    it("executes only the latest invocation when called repeatedly", () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 100);

      debounced("first");
      vi.advanceTimersByTime(50);
      debounced("second");

      vi.advanceTimersByTime(99);
      expect(fn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(1);
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith("second");
    });
  });

  describe("isNumber", () => {
    it("returns true only for values with number type", () => {
      expect(isNumber(0)).toBe(true);
      expect(isNumber(NaN)).toBe(true);
      expect(isNumber("1")).toBe(false);
      expect(isNumber(undefined)).toBe(false);
    });
  });

  describe("parseJSON", () => {
    it("returns original value when input is falsy", () => {
      expect(parseJSON(undefined)).toBeUndefined();
      expect(parseJSON(null)).toBeNull();
      expect(parseJSON("")).toBe("");
    });

    it("parses valid JSON string into object", () => {
      const json = '{"a":1,"b":[2,3]}';

      expect(parseJSON(json)).toEqual({ a: 1, b: [2, 3] });
    });

    it("parses stringified JSON string twice when needed", () => {
      const doubleEncoded = JSON.stringify(JSON.stringify({ nested: true }));

      expect(parseJSON(doubleEncoded)).toEqual({ nested: true });
    });
  });
});
