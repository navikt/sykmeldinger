#!/bin/bash

optionols=$(grep -lnr '?\.' .next/static/**/*.js | wc -l)
 if [[ $optionols -gt 3 ]] ; then
   echo "Oh no found $(($optionols-3)) ?."
   echo $(grep -lnr '?\.' .next/static/**/*.js)
   exit 1
 else
   echo "All good!"
   exit 0
 fi
