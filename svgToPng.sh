#!/bin/bash

if [ "$#" -ne 1 ]; then
	echo "Expecting exactly 1 argument, the file to be converted"
	exit 1
fi

qlmanage -t -s 1000 -o . $1
