#!/bin/bash

export TIMESTAMP=$(date +%s)
echo "Benytter $TIMESTAMP som query param timestamp for static ressurser to prevent caching"

sed -i 's~##DECORATOR_URL##~'"$DECORATOR_URL"'~g' ./build/index.html
sed -i 's~##PUBLIC_URL##~'"$PUBLIC_URL"'~g' ./build/index.html
sed -i 's~.chunk.css"~'".chunk.css?ts=$TIMESTAMP\""'~g' ./build/index.html
sed -i 's~.chunk.js"~'".chunk.js?ts=$TIMESTAMP\""'~g' ./build/index.html
