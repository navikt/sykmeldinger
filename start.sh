#!/bin/bash

./env.sh
mv ./env-config.js ./build/env-config.js

./process-index-html.sh

node ./server.js
