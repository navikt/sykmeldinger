#!/usr/bin/env bash

oldds=$(grep -roh "nav-frontend-" src | wc -w)
less=$(grep -roh ".less" src | wc -w)
any=$(grep -roh "any" src | wc -w)

echo -e "  Gjenstående opprydding:"
echo -e "    $oldds imports fra gammelt designsystem"
echo -e "    $less less imports"
echo -e "    $any any"
