#!/bin/bash

# Update the package index
echo "Updating package index..."
if sudo apt update; then
  echo "Package index updated successfully."
else
  echo "Failed to update package index." >&2
  exit 1
fi

# Install Kazam
echo "Installing Kazam..."
if sudo apt install -y kazam; then
  echo "Kazam installed successfully."
else
  echo "Failed to install Kazam." >&2
  exit 1
fi
