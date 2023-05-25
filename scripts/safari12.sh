#!/bin/bash

optionols=$(grep -lnr '?\.' .next/static/**/*.js | wc -l)
 if [[ $optionols -gt 1 ]] ; then
   echo "Oh no found $(($optionols-1)) ?."
   echo $(grep -lnr '?\.' .next/static/**/*.js)
   exit 1
 else
   echo "All good!"
   exit 0
 fi
