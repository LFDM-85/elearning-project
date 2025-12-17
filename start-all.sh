#!/bin/bash
# Make scripts executable
chmod +x start-db.sh
chmod +x seed-db.sh
chmod +x start-backend.sh
chmod +x start-frontend.sh

# Start DB
./start-db.sh

# Start Backend in background
echo "Starting Backend in background..."
nohup ./start-backend.sh > backend_prod.log 2> backend_prod.err &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"

echo "Waiting for Backend to be ready (15s)..."
sleep 15

# Seed DB
./seed-db.sh

# Start Frontend
./start-frontend.sh
