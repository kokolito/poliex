#!/bin/bash

cd $(dirname $0)
rm bundle.js
npx browserify main.js -o bundle.js
