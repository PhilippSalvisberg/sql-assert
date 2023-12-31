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
import sql, { raw } from "sql-template-tag";
import { simpleSqlName, qualifiedSqlName, noop } from "../src/index.js";

describe("usage in template literal", () => {
    describe("standalone", () => {
        it("should accept simpleSqlName", () => {
            const tableName = "t1";
            const stmt = `select count(*) from ${simpleSqlName(tableName)}`;
            expect(stmt).toEqual("select count(*) from t1");
        });
        it("should accpet qualifiedSqlName", () => {
            const tableName = "s1.t1";
            const stmt = `select count(*) from ${qualifiedSqlName(tableName)}`;
            expect(stmt).toEqual("select count(*) from s1.t1");
        });
        it("should accept any string with noop", () => {
            const tableName = "t1 where sal > 5000";
            const stmt = `select count(*) from ${noop(tableName)}`;
            expect(stmt).toEqual("select count(*) from t1 where sal > 5000");
        });
    });

    describe("with sql-template-tag", () => {
        it("should produce one bind parameter", () => {
            const tableName = "s1.t1";
            const columnName = "c1";
            const columnValue = "v1";
            const query = sql`select count(*)
                from ${raw(qualifiedSqlName(tableName))}
                where ${raw(simpleSqlName(columnName))} = ${columnValue}`;
            expect(query.statement).toEqual(
                `select count(*)
                from s1.t1
                where c1 = :1`
            );
            expect(query.values).toEqual([columnValue]);
        });
        it("should procude two bind parameters", () => {
            const tableName = "s1.t1";
            const columnName = "c1";
            const columnValue1 = "v1";
            const columnValue2 = "v2";
            const query = sql`select count(*)
                from ${raw(qualifiedSqlName(tableName))}
                where ${raw(simpleSqlName(columnName))} in (${columnValue1}, ${columnValue2})`;
            expect(query.statement).toEqual(
                `select count(*)
                from s1.t1
                where c1 in (:1, :2)`
            );
            expect(query.values).toEqual([columnValue1, columnValue2]);
        });
    });
});
