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
import { qualifiedSqlName } from "../src/qualifiedSqlName.js";

describe("invalid qualifiedeSqlName", () => {
    it("throws error on empty", () => {
        expect(() => qualifiedSqlName("")).toThrowError(/not be empty/);
    });
    it("throws error on empty quoted simpleSqlName", () => {
        expect(() => qualifiedSqlName('""')).toThrowError(/not be empty/);
    });
    it("throws error on empty quoted qualifiedSqlName", () => {
        expect(() => qualifiedSqlName('"".""')).toThrowError(/not be empty/);
    });
    it("throws error on final delimiter", () => {
        expect(() => qualifiedSqlName("a.b . ")).toThrowError(/cannot end on delimiter '.'/);
    });
    it("throws error on multiple @ characters", () => {
        expect(() => qualifiedSqlName("a.b@dblink1@dblink2")).toThrowError(/multiple '@' characters/);
    });
    it("throws error on invalid SQL name", () => {
        expect(() => qualifiedSqlName("1.2")).toThrowError(/invalid/i);
    });
});

describe("valid qualifiedSqlName", () => {
    it.each([
        ["id", "id"],
        [`"id"`, `"id"`],
        ["a.b", "a.b"],
        ["a . b . c", "a.b.c"],
        ["a.b.c.d", "a.b.c.d"],
        [`"a".b.c."d"`, `"a".b.c."d"`],
        ["a@dblink", "a@dblink"],
        ["a.b@dblink.world", "a.b@dblink.world"]
    ])("should accept '%s' and return '%s'", (id, expected) => {
        const actual = qualifiedSqlName(id);
        expect(actual).toEqual(expected);
    });
});
