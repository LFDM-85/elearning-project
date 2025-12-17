#!/bin/bash
echo "Starting Backend..."
cd Backend-main
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
fi
npm run start:dev
