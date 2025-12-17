#!/bin/bash
echo "Starting Frontend..."
cd Frontend-main
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    yarn install
fi
yarn start
