#!/bin/bash

# Remove Kazam
echo "Removing Kazam..."
if sudo apt remove --purge -y kazam; then
  echo "Kazam removed successfully."
else
  echo "Failed to remove Kazam." >&2
  exit 1
fi

# Optionally clean up residual files
echo "Cleaning up residual files..."
if sudo apt autoremove -y; then
  echo "Residual files cleaned up successfully."
else
  echo "Failed to clean up residual files." >&2
  exit 1
fi
