#!/usr/bin/env bash
set -e

echo "Testing Nginx configuration locally..."

# Create test directory
mkdir -p /tmp/typesense-test
cd /tmp/typesense-test

# Generate test API key
TEST_API_KEY="testtypesenseapikey"

# Create Nginx config file (extracted from Terraform)
cat > nginx.conf << 'EOF'
events {
    worker_connections 1024;
}

http {
    server {
        listen 80;
        server_name localhost;

        location / {
            # Handle preflight requests
            if ($request_method = 'OPTIONS') {
                add_header 'Access-Control-Allow-Origin' '*' always;
                add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
                add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization, X-TYPESENSE-API-KEY' always;
                add_header 'Content-Length' 0;
                add_header 'Content-Type' 'text/plain charset=UTF-8';
                return 204;
            }

            # CORS headers for all other requests
            add_header 'Access-Control-Allow-Origin' '*' always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization, X-TYPESENSE-API-KEY' always;

            proxy_pass http://typesense:8108;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
EOF

# Create docker-compose.yml
cat > docker-compose.yml << COMPOSE_EOF
services:
  typesense:
    image: typesense/typesense:0.25.2
    command: "--data-dir /data --api-key=${TEST_API_KEY} --enable-cors"
    volumes:
      - ./typesense-data:/data
    expose:
      - "8108"

  nginx:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - typesense
COMPOSE_EOF

# Create a simple test config without upstream dependency
cat > nginx-test.conf << 'EOF'
events {
    worker_connections 1024;
}

http {
    server {
        listen 80;
        server_name localhost;

        location / {
            # Handle preflight requests
            if ($request_method = 'OPTIONS') {
                add_header 'Access-Control-Allow-Origin' '*' always;
                add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
                add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization, X-TYPESENSE-API-KEY' always;
                add_header 'Content-Length' 0;
                add_header 'Content-Type' 'text/plain charset=UTF-8';
                return 204;
            }

            # CORS headers for all other requests
            add_header 'Access-Control-Allow-Origin' '*' always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization, X-TYPESENSE-API-KEY' always;

            proxy_pass http://127.0.0.1:8108;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
EOF

# Test Nginx config syntax
echo "Testing Nginx configuration syntax..."
docker run --rm -v "$(pwd)/nginx-test.conf:/etc/nginx/nginx.conf:ro" nginx:alpine nginx -t

echo "✅ Nginx configuration syntax is valid!"

# Start services
echo "Starting services..."
docker-compose up -d

# Wait for services
echo "Waiting for services to start..."
sleep 5

# Test the setup
echo "Testing API endpoint..."
curl -H "X-TYPESENSE-API-KEY: $TEST_API_KEY" http://localhost:8080/health || echo "❌ Health check failed"

echo "Testing CORS preflight..."
curl -X OPTIONS -H "Origin: https://example.com" -v http://localhost:8080/ || echo "❌ CORS test failed"

echo "✅ Local test completed!"
echo "API Key used: $TEST_API_KEY"
echo "Access Typesense at: http://localhost:8080"

# Cleanup
read -p "Press Enter to stop and cleanup..."
docker-compose down
rm -rf /tmp/typesense-test
