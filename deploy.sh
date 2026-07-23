#!/bin/bash
set -e

echo "========================================"
echo "  Pulling latest changes from GitHub... "
echo "========================================"
git pull origin main

echo "========================================"
echo "  Building & restarting backend...      "
echo "========================================"
docker compose -f infra/docker-compose.prod.yml up -d --build backend postgres redis

echo "========================================"
echo "  Running Container Status:             "
echo "========================================"
docker compose -f infra/docker-compose.prod.yml ps

echo "Done! Server updated successfully."
