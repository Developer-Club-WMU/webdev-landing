#!/bin/sh

# Pull Latest Code from repo just in case of updated deploy script/docker-compose script
git pull origin production

# Stop running services
docker compose down

# Pull latest image
docker pull devclubwmu/devclub-prod:webdev-landing

# Start with latest image in background
docker compose up -d
