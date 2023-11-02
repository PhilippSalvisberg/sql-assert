# SQL Assert

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][build-image]][build-url]
[![Build coverage][coverage-image]][coverage-url]

Assert identifiers (e.g. table/view names) before using them SQL statements.

## Installation

```
npm install sql-assert--save
```

## Usage

### Standalone

```js
import { simpleSqlName, qualifiedSqlName, noop } from "sql-assert";

// returns a valid SQL name or throws an error
const stmt1 = `select count(*) from ${simpleSqlName(tableName)}`;
const stmt2 = `select count(*) from ${qualifiedSqlName(tableName)}`;

// no operation, returns original value, allows SQL injection
const stmt3 = `select count(*) from ${noop(tableName)}`;
```

### With sql-template-tag

```js
import sql, { raw } from "sql-template-tag";
import { simpleSqlName, qualifiedSqlName } from "sql-assert";

// throws an error if tableName or columnName is not syntactically valid
// columnValue is a bind variable, hence no SQL injection is possible
const query = sql`select count(*) 
                    from ${raw(qualifiedSqlName(tableName))} 
                   where ${raw(simpleSqlName(columnName))} = ${columnValue}`;
```

## License

sql-assert is licensed under the Apache License, Version 2.0. You may obtain a copy of the License at <http://www.apache.org/licenses/LICENSE-2.0>.

[npm-image]: https://img.shields.io/npm/v/sql-assert
[npm-url]: https://npmjs.org/package/sql-assert
[downloads-image]: https://img.shields.io/npm/dm/sql-assert
[downloads-url]: https://npmjs.org/package/sql-assert
[build-image]: https://img.shields.io/github/actions/workflow/status/PhilippSalvisberg/sql-assert/ci.yml?branch=main
[build-url]: https://github.com/PhilippSalvisberg/sql-assert/actions/workflows/ci.yml?query=branch%3Amain
[coverage-image]: https://img.shields.io/codecov/c/gh/PhilippSalvisberg/sql-assert
[coverage-url]: https://codecov.io/gh/PhilippSalvisberg/sql-assert