import { describe, it, expect } from "vitest";
import { simpleSqlName } from "../src/simpleSqlName.js";

describe("simpleSqlName", () => {
    it("throws error on null", () => {
        expect(() => simpleSqlName(null)).toThrowError(/not be null/);
    });
    it("throws error on empty", () => {
        expect(() => simpleSqlName("")).toThrowError(/not be empty/);
    });
    it("throws error on NUL character", () => {
        expect(() => simpleSqlName(`"Before ${"\x00"} After"`)).toThrowError(/not contain a NUL/);
    });
    it("throws error on missing second double quote", () => {
        expect(() => simpleSqlName('"Some value')).toThrowError(/quotes/);
    });
    it("throws error on three double quotes", () => {
        expect(() => simpleSqlName('"Some " value"')).toThrowError(/quotes/);
    });
    it("throws error on number", () => {
        expect(() => simpleSqlName('1')).toThrowError(/Invalid/);
    });
    it("throws error on space", () => {
        expect(() => simpleSqlName('ab cd')).toThrowError(/Invalid/);
    });
    it.each([
        ['"An id"', '"An id"'],
        [" a0123456789 ", "a0123456789"],
        ["\tb\t", "b"],
        ["c_", "c_"],
        ["d#", "d#"],
        ["e$", "e$"],
        ["Lückenbüßer", "Lückenbüßer"]
    ])("should accept '%s' and return '%s'", (id, expected) => {
        const actual = simpleSqlName(id);
        expect(actual).toEqual(expected);
    });
});
