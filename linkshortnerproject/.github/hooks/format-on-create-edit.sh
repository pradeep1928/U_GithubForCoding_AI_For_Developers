#!/bin/bash

echo "✅ Script started"
# Read the tool name from Copilot environment
# TOOL_NAME="$COPILOT_TOOL_NAME"

# Read the tool name from the JSON input
json_input=$(cat)

# Extract the tool name
tool_name=$(echo "$json_input" | jq -r '.tool.name')

echo "Copilot tool used: $tool_name"

# ✅ Run prettier only for edit or create
if [[ "$tool_name" == "edit" || "$tool_name" == "create" ]]; then
  echo "Running Prettier..."
  npx prettier --write .
else
  echo "Skipping Prettier"
fi
