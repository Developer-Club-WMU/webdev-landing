#!/bin/sh
# Setup script for environment variables from Docker Secrets inside the container
#set -e

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

export DEPLOYMENT_ID=$(cat /run/secrets/deploy_id)
export WEBAP_URL=$(cat /run/secrets/webapp_url)
export NEXTAUTH_SECRET=$(cat /run/secrets/nextauth_secret)
export AUTH_DISCORD_ID=$(cat /run/secrets/discord_auth_id)
export AUTH_DISCORD_SECRET=$(cat /run/secrets/discord_auth_secret)
export DATABASE_URL=$(cat /run/secrets/db_url)

exec "$@"
