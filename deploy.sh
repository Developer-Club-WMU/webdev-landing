#!/bin/sh

# Change CWD to repo home
cd /home/webdev/webdev-landing

# Check if docker is available
if ! command -v docker >/dev/null 2>&1; then
  echo "Docker is not installed"
  exit 1
fi

# Check if docker compose is available (v2 or v1)
if ! docker compose version >/dev/null 2>&1 && ! command -v docker-compose >/dev/null 2>&1; then
  echo "Docker Compose is not installed"
  exit 1
fi

# Pull Latest Code from the appropriate branch of repo PROD or DEV (PROD set to default)
ENV="${DEPLOY_ENV:-production}"
echo "Using environment: $ENV"

git fetch origin
git checkout $ENV
git pull origin $ENV

# Stop running services
docker compose down

# Pull latest image
docker pull devclubwmu/devclub-prod:webdev-landing

# Prune Old Images that arent tagged and keep only the tagged images
docker image prune -a

# Start with latest image in background
docker compose up -d
