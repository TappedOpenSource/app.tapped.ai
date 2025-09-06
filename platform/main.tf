terraform {
  required_version = ">= 1.0"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.1"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
  zone    = var.zone
}

# Variables
variable "project_id" {
  description = "The GCP project ID"
  type        = string
}

variable "region" {
  description = "The GCP region"
  type        = string
  default     = "us-central1"
}

variable "zone" {
  description = "The GCP zone"
  type        = string
  default     = "us-central1-a"
}

variable "instance_name" {
  description = "Name of the compute instance"
  type        = string
  default     = "typesense-instance"
}

variable "domain_name" {
  description = "Domain name for SSL certificate"
  type        = string
  default     = "typesense.tapped.ai"
}

variable "email" {
  description = "Email address for Let's Encrypt certificate"
  type        = string
  default     = "support@tapped.ai"
}

# Generate a random API key for Typesense (URL-safe)
resource "random_password" "typesense_api_key" {
  length  = 32
  special = false
  upper   = true
  lower   = true
  numeric = true
}

# Store the API key in Secret Manager
resource "google_secret_manager_secret" "typesense_api_key" {
  secret_id = "typesense-api-key"

  replication {
    auto {}
  }
}

resource "google_secret_manager_secret_version" "typesense_api_key" {
  secret      = google_secret_manager_secret.typesense_api_key.id
  secret_data = random_password.typesense_api_key.result
}

# Static IP for the instance
resource "google_compute_address" "typesense_ip" {
  name   = "typesense-static-ip"
  region = var.region
}

# Firewall rule to allow HTTP and HTTPS traffic only
resource "google_compute_firewall" "web_firewall" {
  name    = "allow-web-traffic"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["8108"] # Typesense direct access
  }

  allow {
    protocol = "tcp"
    ports    = ["22"] # SSH access
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["web-server"]
}

# Create a custom service account for the instance
resource "google_service_account" "typesense_sa" {
  account_id   = "typesense-service-account"
  display_name = "Typesense Service Account"
  description  = "Service account for Typesense instance with minimal permissions"
}

# Grant the service account access to Secret Manager
resource "google_secret_manager_secret_iam_member" "typesense_secret_access" {
  secret_id = google_secret_manager_secret.typesense_api_key.secret_id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.typesense_sa.email}"
}

# Compute Engine instance
resource "google_compute_instance" "typesense_instance" {
  name         = var.instance_name
  machine_type = "e2-medium"
  zone         = var.zone

  tags = ["web-server"]

  boot_disk {
    initialize_params {
      image = "ubuntu-os-cloud/ubuntu-2204-lts" # Ubuntu 22.04 LTS
      size  = 50
      type  = "pd-balanced" # Balanced persistent disk
    }
  }

  network_interface {
    network = "default"
    access_config {
      nat_ip = google_compute_address.typesense_ip.address
    }
  }

  # Startup script to install Nginx, Certbot, Docker, and configure SSL
  metadata_startup_script = <<-EOF
    #!/bin/bash
    set -e

    # Make script idempotent
    if [ -f /var/log/startup-script.log ]; then
        echo "Startup script already ran" >> /var/log/startup-script.log
        exit 0
    fi

    exec > >(tee -a /var/log/startup-script.log)
    exec 2>&1
    echo "Starting setup at $(date)"

    # Update system
    apt-get update
    apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release software-properties-common

    # Install Nginx
    apt-get install -y nginx
    systemctl enable nginx
    systemctl start nginx

    # Skip Certbot installation for HTTP-only setup

    # Install Docker and Google Cloud SDK
    if ! command -v docker &> /dev/null; then
        curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
        echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
        apt-get update
        apt-get install -y docker-ce docker-ce-cli containerd.io
        systemctl start docker
        systemctl enable docker
        usermod -aG docker ubuntu
    fi

    # Install Google Cloud SDK
    if ! command -v gcloud &> /dev/null; then
        curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | gpg --dearmor -o /usr/share/keyrings/cloud.google.gpg
        echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
        apt-get update
        apt-get install -y google-cloud-cli
    fi

    # Create directory for Typesense data
    mkdir -p /opt/typesense/data
    chown -R ubuntu:ubuntu /opt/typesense

    # Remove default Nginx site
    rm -f /etc/nginx/sites-enabled/default

    # Test Nginx configuration
    nginx -t

    # Create script to fetch API key and start Typesense
    cat > /opt/typesense/start-typesense.sh << 'EOL'
#!/bin/bash
# Get API key from Secret Manager
API_KEY=$(gcloud secrets versions access latest --secret="typesense-api-key")
if [ -z "$API_KEY" ]; then
    echo "Failed to retrieve API key from Secret Manager"
    exit 1
fi

# Start Typesense with the retrieved API key
exec /usr/bin/docker run --rm --name typesense -p 8108:8108 -v /opt/typesense/data:/data typesense/typesense:0.25.2 --data-dir /data --api-key="$API_KEY" --enable-cors
EOL
    chmod +x /opt/typesense/start-typesense.sh
    chown ubuntu:ubuntu /opt/typesense/start-typesense.sh

    # Create systemd service for Typesense
    cat > /etc/systemd/system/typesense.service << 'EOL'
[Unit]
Description=Typesense Search Engine
After=docker.service network.target
Requires=docker.service

[Service]
Type=simple
User=ubuntu
Group=ubuntu
WorkingDirectory=/opt/typesense
ExecStart=/opt/typesense/start-typesense.sh
ExecStop=/usr/bin/docker stop typesense
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOL

    # Reload systemd and start services
    systemctl daemon-reload
    systemctl reload nginx

    # Start Typesense service immediately
    systemctl enable --now typesense

    echo "Setup completed at $(date). Typesense is running on HTTP."
    touch /var/log/startup-script.log

  EOF

  # Allow stopping and starting the instance
  allow_stopping_for_update = true

  # Service account with minimal permissions
  service_account {
    email  = google_service_account.typesense_sa.email
    scopes = ["https://www.googleapis.com/auth/cloud-platform"]
  }
}

# Outputs
output "instance_ip" {
  description = "The external IP address of the Typesense instance"
  value       = google_compute_address.typesense_ip.address
}

output "instance_name" {
  description = "The name of the Typesense instance"
  value       = google_compute_instance.typesense_instance.name
}

output "ssh_connection" {
  description = "SSH connection command"
  value       = "gcloud compute ssh ${google_compute_instance.typesense_instance.name} --zone=${var.zone}"
}

output "typesense_url_http" {
  description = "Typesense server URL (HTTP)"
  value       = "http://${google_compute_address.typesense_ip.address}:8108"
}

output "typesense_url" {
  description = "Typesense server URL"
  value       = "http://${var.domain_name}"
}

output "typesense_api_key" {
  description = "The generated Typesense API key (sensitive)"
  value       = random_password.typesense_api_key.result
  sensitive   = true
}
