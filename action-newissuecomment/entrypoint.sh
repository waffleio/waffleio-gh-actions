#!/bin/bash

echo "starting bash..."

echo "current working directory is " $PWD
cd ../../
cd /action

npm install

node index.js