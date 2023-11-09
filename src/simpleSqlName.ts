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

/**
 * Check if a given string is a valid SQL name.
 *
 * Valid are unquoted and quoted identifiers.
 * Unquoted identifiers must begin with a letter optionally followed by
 * other letters, digits, dollar signs ($), hash signs (#) or underscores (_).
 * Quoted identifiers must start and end with a double quote (") and must not
 * contain double quotes nor NUL characters.
 *
 * @param str The string to be checked.
 * @returns The trimmed and valid sqlName.
 * @throws {Error} if the passed string is not a valid SQL name.
 */
export const simpleSqlName = (str: string): string => {
    const trimmed = str.trim();
    const len = trimmed.length;
    if (len == 0 || trimmed == '""') {
        throw new Error("SQL name must not be empty.");
    }
    if (trimmed.at(0) == '"') {
        if (trimmed.indexOf("\x00", 1) != -1) {
            throw new Error("SQL name must not contain a NUL character.");
        }
        if (trimmed.indexOf('"', 1) != len - 1) {
            throw new Error("Double quotes are only allowed/required at the start and end of a SQL name.");
        }
    } else {
        const matched = trimmed.match(/^[\p{Letter}]([\p{Letter}0-9#$_])*$/u);
        if (matched == null) {
            throw new Error("Invalid SQL name.");
        }
    }
    return trimmed;
};
