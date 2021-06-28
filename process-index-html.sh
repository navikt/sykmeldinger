#!/bin/bash

export TIMESTAMP=$(date +%s)
echo "Benytter $TIMESTAMP som query param timestamp for static ressurser to prevent caching"

sed -ie 's~##DECORATOR_URL##~'"$DECORATOR_URL"'~g' ./build/index.html
sed -ie 's~##PUBLIC_URL##~'"$PUBLIC_URL"'~g' ./build/index.html
sed -ie 's~.chunk.css"~'".chunk.css?ts=$TIMESTAMP\""'~g' ./build/index.html
sed -ie 's~.chunk.js"~'".chunk.js?ts=$TIMESTAMP\""'~g' ./build/index.html
