#!/bin/bash
echo "Seeding the database..."
cd Backend-main
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
fi
# Ensure axios is installed for the seed script
if [ ! -d "node_modules/axios" ]; then
    npm install axios
fi

echo "Running seed script..."
node seed.js
echo "Database seeded."
