#!/bin/sh
set -e # Exit immediately if a command exits with a non-zero status.

echo "--- Running seed script ---"
node seed.js
echo "--- Seed script finished ---"