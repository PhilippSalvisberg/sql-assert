/*
 * Copyright 2023 Philipp Salvisberg <philipp.salvisberg@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { describe, it, expect } from "vitest";
import { simpleSqlName } from "../src/simpleSqlName.js";

describe("simpleSqlName", () => {
    describe("invalid", () => {
        it("should throw error on empty", () => {
            expect(() => simpleSqlName("")).toThrowError(/not be empty/);
        });
        it("should throw error on empty quoted", () => {
            expect(() => simpleSqlName('""')).toThrowError(/not be empty/);
        });
        it("should throw error on NUL character", () => {
            expect(() => simpleSqlName(`"Before ${"\x00"} After"`)).toThrowError(/not contain a NUL/);
        });
        it("should throw error on missing second double quote", () => {
            expect(() => simpleSqlName('"Some value')).toThrowError(/quotes/);
        });
        it("should throw error on three double quotes", () => {
            expect(() => simpleSqlName('"Some " value"')).toThrowError(/quotes/);
        });
        it("should throw error on number", () => {
            expect(() => simpleSqlName("1")).toThrowError(/invalid/i);
        });
        it("should throw error on space", () => {
            expect(() => simpleSqlName("ab cd")).toThrowError(/invalid/i);
        });
    });

    describe("valid", () => {
        it.each([
            ['"An id"', '"An id"'],
            [" a0123456789 ", "a0123456789"],
            ["\tb\t", "b"],
            ["c_", "c_"],
            ["d#", "d#"],
            ["e$", "e$"],
            ["äöüéàß", "äöüéàß"]
        ])("should accept '%s' and return '%s'", (id, expected) => {
            const actual = simpleSqlName(id);
            expect(actual).toEqual(expected);
        });
    });
});
