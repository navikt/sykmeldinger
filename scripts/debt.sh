#!/usr/bin/env bash

todo=$(grep -roh "TODO" src | wc -w)
icons=$(grep -roh "@navikt/ds-icons" src | wc -w)
jsxelements=$(grep -roh "JSX.Element" src | wc -w)

echo -e "### Gjenstående opprydding:"
echo -e " * $todo TODOs i koden"
echo -e " * $icons @navikt/ds-icons i koden (skal migreres til @navikt/aksel-icons)"
echo -e " * $jsxelements JSX.Element -> ReactElement endringer igjen"
