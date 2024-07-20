#!/usr/bin/env bash
# Use this script to stop a docker container for the local development database

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
validate_env DB_CONTAINER_NAME

DB_CONTAINER_NAME=$DB_CONTAINER_NAME

if ! [ -x "$(command -v docker)" ]; then
  echo -e "Docker is not installed. Please install docker and try again.\nDocker install guide: https://docs.docker.com/engine/install/"
  exit 1
fi

if [ "$(docker ps -q -f name=$DB_CONTAINER_NAME)" ]; then
  docker stop "$DB_CONTAINER_NAME"
  echo "Database container '$DB_CONTAINER_NAME' stopped"
  exit 0
fi

if [ "$(docker ps -q -a -f name=$DB_CONTAINER_NAME)" ]; then
  echo "Database container '$DB_CONTAINER_NAME' is not running"
  exit 0
else
  echo "Database container '$DB_CONTAINER_NAME' does not exist"
  exit 1
fi
