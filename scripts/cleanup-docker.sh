#!/usr/bin/env bash
# Use this script to clean up Docker volumes and build cache, and display system disk usage

# Import env variables from .env
set -a
source .env

# Function to validate required environment variables
validate_env() {
  local missing_vars=()
  for var in "$@"; do
    if [ -z "${!var}" ]; then
      missing_vars+=("$var")
    fi
  done

  if [ ${#missing_vars[@]} -ne 0 ]; then
    echo "Error: The following environment variables are not set: ${missing_vars[*]}"
    exit 1
  fi
}

# Validate required environment variables
validate_env DB_CONTAINER_NAME DB_VOLUME_NAME

DB_CONTAINER_NAME=$DB_CONTAINER_NAME
DB_VOLUME_NAME=$DB_VOLUME_NAME

if ! [ -x "$(command -v docker)" ]; then
  echo -e "Docker is not installed. Please install docker and try again.\nDocker install guide: https://docs.docker.com/engine/install/"
  exit 1
fi

if [ "$(docker ps -q -a -f name=$DB_CONTAINER_NAME)" ]; then
  docker rm "$DB_CONTAINER_NAME"
  echo "Database container '$DB_CONTAINER_NAME' removed"
else
  echo "Database container '$DB_CONTAINER_NAME' does not exist"
fi

if [ "$(docker volume ls -q -f name=$DB_VOLUME_NAME)" ]; then
  docker volume rm "$DB_VOLUME_NAME"
  echo "Database volume '$DB_VOLUME_NAME' removed"
else
  echo "Database volume '$DB_VOLUME_NAME' does not exist"
fi

echo "Pruning unused Docker volumes..."
docker volume prune -f

echo "Pruning unused Docker build cache..."
docker builder prune -f

echo "Displaying Docker system disk usage..."
docker system df

echo "Docker cleanup completed."
