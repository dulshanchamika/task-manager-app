#!/bin/bash

# --- Task Manager Deployment Script ---
# This script automates the deployment process on your Linux server.

echo "🚀 Starting deployment..."

# 1. Pull the latest changes from Git
# echo "📥 Pulling latest code..."
# git pull origin main

# 2. Rebuild and restart containers
echo "🛠️ Rebuilding and restarting containers..."
docker-compose -f docker-compose.prod.yml up -d --build

# 3. Clean up unused images to save disk space
echo "🧹 Cleaning up old images..."
docker image prune -f

echo "✅ Deployment complete! App is running at http://localhost"
