#!/bin/bash
echo "Starting MongoDB via Docker..."
docker compose up -d elearning-mongo
echo "Waiting for MongoDB to initialize..."
sleep 5
echo "MongoDB started."
