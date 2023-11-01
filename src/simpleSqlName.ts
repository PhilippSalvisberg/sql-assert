export const simpleSqlName = (s: string | null): string => {
    if (s == null) {
        throw (new Error("SQL name must not be null."));
    }
    const trimmed = s.trim();
    const len = trimmed.length;
    if (len == 0) {
        throw (new Error("SQL name must not be empty."));
    }
    if (trimmed.at(0) == '"') {
        if (trimmed.indexOf("\x00", 1) != -1) {
            throw (new Error("SQL name must not contain a NUL character."));
        }
        if (trimmed.indexOf('"', 1) != len - 1) {
            throw (new Error("Double quotes are only allowed/required at the start and end of a SQL name."))
        }
    } else {
        const matched = trimmed.match(/^[\p{Letter}]([\p{Letter}0-9#$_])*$/u);
        if (matched == null) {
            throw (new Error("Invalid SQL name."));
        }
    }
    return trimmed;
}
