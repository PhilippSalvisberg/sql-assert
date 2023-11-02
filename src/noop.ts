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
 * No operation.
 *
 * Returns the given string without asserting it.
 * Calling this function shows that no SQL injection check is applied.
 *
 * @param str The string not to be asserted.
 * @returns The orginal string, converts null/undefined to an empty string.
 */
export const noop = (str: string | null | undefined): string => {
    if (str == null || str == undefined) {
        return "";
    }
    return str;
};
