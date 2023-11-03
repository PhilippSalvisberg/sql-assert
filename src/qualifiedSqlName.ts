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

import { simpleSqlName } from "./simpleSqlName.js";

/**
 * Check if a given string is a valid qualified SQL name.
 *
 * The syntax of a qualified sql name is:
 * simple_sql_name [. simple_sql_name]...] [@ simple_sql_name [. simple_sql_name]...]
 *
 * @param str The string to be checked.
 * @returns The trimmed and valid qualified sqlName.
 * @throws {Error} if the passed string is not a valid qualified SQL name.
 */
export const qualifiedSqlName = (str: string | null | undefined): string => {
    if (str == null || str == undefined) {
        throw new Error("Qualified SQL name must not be null.");
    }
    const trimmed = str.trim();
    if (trimmed == "") {
        throw new Error("Qualified SQL name must not be empty.");
    }
    let result = "";
    let prevDelimiter = "";
    let commatCount = 0;
    for (const match of trimmed.matchAll(/(?<sqlname>"[^"]+"|[^.@\s]+)(?<delimiter>\s*[.@]\s*)?/g)) {
        if (prevDelimiter != undefined) {
            if (prevDelimiter == "@") {
                commatCount++;
                if (commatCount > 1) {
                    throw new Error("Qualified SQL name must not contain multiple '@' characters.");
                }
            }
            result += prevDelimiter;
        }
        result += simpleSqlName(match.groups?.sqlname);
        prevDelimiter = match.groups?.delimiter == undefined ? "" : match.groups.delimiter.trim();
    }
    if (prevDelimiter != "") {
        throw new Error(`Qualified SQL name cannot end on delimiter '${prevDelimiter}'.`);
    }
    return result;
};
