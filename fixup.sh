#!/bin/bash

# Create a module specific package.json with a type field 
# to make it work with require (CommonJS) and import (ESM).
# based on https://www.sensedeep.com/blog/posts/2021/how-to-create-single-source-npm-module.html

cat >lib/cjs/package.json <<EOF
{
    "type": "commonjs"
}
EOF

cat >lib/esm/package.json <<EOF
{
    "type": "module"
}
EOF
