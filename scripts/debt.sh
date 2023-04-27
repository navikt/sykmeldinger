#!/usr/bin/env bash

todo=$(grep -roh "TODO" src | wc -w)

echo -e "### Gjenstående opprydding:"
echo -e " * $todo TODOs i koden"
