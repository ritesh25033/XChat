#!/bin/sh
# Exit script on error
set -e

# --- Start Frontend ---
cd client
echo "Installing dependencies in client directory..."
npm install

# Kill process on port 3000
PORT=3000
PID=$(netstat -tulpn 2>/dev/null | grep ":$PORT" | awk '{print $7}' | cut -d'/' -f1)
if [ -n "$PID" ]; then
  echo "Killing process on port $PORT (PID: $PID)..."
  kill -9 $PID
fi

echo "Starting client on port 3000..."
BROWSER=none PORT=3000 npm start &

# Wait for client to be ready
cd ..
node waitForPort.js 3000

echo "Waiting a few seconds for frontend to fully initialize..."
sleep 5


# --- Start Backend ---
cd server
echo "Installing dependencies in server directory..."
npm install

# Kill process on port 5000
PORT=5000
PID=$(netstat -tulpn 2>/dev/null | grep ":$PORT" | awk '{print $7}' | cut -d'/' -f1)
if [ -n "$PID" ]; then
  echo "Killing process on port $PORT (PID: $PID)..."
  kill -9 $PID
fi

echo "Starting server on port 5000..."
BROWSER=none PORT=5000 npm start &

cd ..
node waitForPort.js 5000

echo "Waiting a few seconds for backend to fully initialize..."
sleep 5

# --- Run Assessment ---
cd assessment
echo "Installing assessment dependencies..."
npm install

echo "Running Cypress tests..."
node runCypress.js

echo "Running Python post-processing..."
python3 process_filtered_logs.py cypressResults.json

if [ -f "assesment_result.json" ]; then
    cp assesment_result.json ..
    echo "✅ Assessment results generated."
else
    echo "❌ Python script failed to generate results."
fi
