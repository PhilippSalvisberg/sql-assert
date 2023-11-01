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
 * @throws {Error} If the passed string is not a valid SQL name.
 */
export const simpleSqlName = (str: string | null): string => {
    if (str == null) {
        throw new Error("SQL name must not be null.");
    }
    const trimmed = str.trim();
    const len = trimmed.length;
    if (len == 0) {
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
