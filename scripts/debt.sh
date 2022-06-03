#!/usr/bin/env bash

oldds=$(grep -roh "nav-frontend-" src | wc -w)
fc=$(grep -roh ".FC" src | wc -w)
any=$(grep -roh "any" src | wc -w)
todo=$(grep -roh "TODO" src | wc -w)
dayjs=$(grep -roh "dayjs" src | wc -w)

echo -e "### Gjenstående opprydding:"
echo -e " * $oldds imports fra gammelt designsystem"
echo -e " * $fc React.FC bruk"
echo -e " * $any anys"
echo -e " * $dayjs dayjs imports"
