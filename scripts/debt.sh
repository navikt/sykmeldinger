#!/usr/bin/env bash

any=$(grep -roh ": any" src | wc -w)
todo=$(grep -roh "TODO" src | wc -w)

echo -e "### Gjenstående opprydding:"
echo -e " * $any anys"
echo -e " * $todo TODOs"
