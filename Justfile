
# Default recipe - show available commands
default:
    @just --list

# Start Typesense with Docker Compose
start:
    docker-compose up -d

# Stop Typesense services
stop:
    docker-compose down

# Show Typesense logs
logs:
    docker-compose logs -f typesense

# Initialize empty Typesense collection
init:
    deno --allow-env scripts/init-typesense.ts

# Recreate collection (delete existing)
recreate:
    deno --allow-env scripts/init-typesense.ts --recreate

migrate-to-firestore:
    deno --allow-env scripts/migrate-firestore-to-typesense.ts

# Quick setup - start services and initialize with samples
setup: start init-samples

# Health check - verify Typesense is running
health:
    curl -f http://localhost:8108/health || echo "Typesense not responding"

# Search test - basic search query
test-search query="*":
    curl "http://localhost:8108/collections/users/documents/search?q={{query}}&query_by=username" \
        -H "X-TYPESENSE-API-KEY: devapikey123"

# Clean up - stop services and remove volumes
clean: stop
    docker-compose down -v
    docker system prune -f
