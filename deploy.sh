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

# Pull Latest Code from repo just in case of updated deploy script/docker-compose script
git pull origin production

# Stop running services
docker compose down

# Pull latest image
docker pull devclubwmu/devclub-prod:webdev-landing

# Start with latest image in background
docker compose up -d
