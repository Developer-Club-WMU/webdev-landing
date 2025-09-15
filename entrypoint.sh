#!/bin/sh
# Setup script for environment variables from Docker Secrets inside the container
#set -e

export DEPLOYMENT_ID=$(cat /run/secrets/deploy_id)
export WEBAP_URL=$(cat /run/secrets/webapp_url)
export NEXTAUTH_SECRET=$(cat /run/secrets/nextauth_secret)
export AUTH_DISCORD_ID=$(cat /run/secrets/discord_auth_id)
export AUTH_DISCORD_SECRET=$(cat /run/secrets/discord_auth_secret)
export DATABASE_URL=$(cat /run/secrets/db_url)

exec "$@"
