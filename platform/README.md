# Typesense Infrastructure - GCP Compute Engine

This Terraform configuration deploys a Google Cloud Compute Engine instance to host Typesense search engine.

## Architecture

- **Instance Type**: e2-medium (1 vCPU, 4 GB RAM)
- **Boot Disk**: 50 GB Balanced Persistent Disk
- **OS**: Ubuntu 22.04 LTS
- **Region**: us-central1 (Iowa)
- **Services**: Typesense running in Docker

## Prerequisites

1. **Google Cloud SDK** installed and configured
   ```bash
   # Install gcloud CLI
   curl https://sdk.cloud.google.com | bash
   exec -l $SHELL
   gcloud init
   ```

2. **Terraform** installed (version >= 1.0)
   ```bash
   # On macOS with Homebrew
   brew install terraform
   ```

3. **GCP Project** with billing enabled and the following APIs enabled:
   - Compute Engine API
   - Cloud Resource Manager API

4. **Authentication** setup
   ```bash
   gcloud auth application-default login
   ```

## Setup

1. **Clone and navigate to the platform directory**
   ```bash
   cd platform
   ```

2. **Create your terraform.tfvars file**
   ```bash
   cp terraform.tfvars.example terraform.tfvars
   ```

3. **Edit terraform.tfvars with your actual values**
   ```bash
   # Update with your GCP project ID
   project_id = "your-actual-project-id"
   region = "us-central1"
   zone = "us-central1-a"
   instance_name = "typesense-instance"
   ```

## Deployment

1. **Initialize Terraform**
   ```bash
   terraform init
   ```

2. **Review the planned changes**
   ```bash
   terraform plan
   ```

3. **Deploy the infrastructure**
   ```bash
   terraform apply
   ```
   Type `yes` when prompted to confirm.

4. **Note the outputs**
   After deployment, Terraform will output:
   - Instance external IP address
   - SSH connection command
   - Typesense URL

## Post-Deployment Configuration

### 1. Connect to the Instance

```bash
# Use the SSH command from Terraform output
gcloud compute ssh typesense-instance --zone=us-central1-a
```

### 2. Configure Typesense

1. **Generate a strong API key**
   ```bash
   # Generate a random API key
   openssl rand -hex 32
   ```

2. **Update the Typesense service configuration**
   ```bash
   sudo nano /etc/systemd/system/typesense.service
   ```
   Replace `REPLACE_WITH_YOUR_API_KEY` with your actual API key.

3. **Start Typesense service**
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable typesense
   sudo systemctl start typesense
   ```

4. **Check service status**
   ```bash
   sudo systemctl status typesense
   ```

### 3. Test Typesense

```bash
# Test from the instance
curl http://localhost:8108/health

# Test from external (replace with your instance IP)
curl http://YOUR_INSTANCE_IP:8108/health
```

## Security Considerations

⚠️ **Important**: The current firewall configuration allows access from anywhere (0.0.0.0/0). For production:

1. **Restrict firewall rules** to your application's IP ranges
2. **Use HTTPS** with SSL certificates
3. **Use Google Cloud Secret Manager** for API keys
4. **Enable VPC firewall logging**
5. **Consider using a load balancer** for SSL termination

## Managing the Infrastructure

### View Current State
```bash
terraform show
```

### Update Configuration
1. Modify the `.tf` files
2. Run `terraform plan` to review changes
3. Run `terraform apply` to apply changes

### Destroy Infrastructure
```bash
terraform destroy
```
⚠️ This will delete all resources and data!

## Monitoring and Logs

### View Typesense logs
```bash
# SSH into the instance first
gcloud compute ssh typesense-instance --zone=us-central1-a

# View Typesense logs
sudo journalctl -u typesense -f
```

### View instance metrics
- Go to Google Cloud Console > Compute Engine > VM instances
- Click on your instance name to view metrics

## Backup Strategy

### Data Backup
Typesense data is stored in `/opt/typesense/data`. Consider:
1. Regular disk snapshots
2. Exporting Typesense collections periodically
3. Using Google Cloud Storage for backups

### Create a disk snapshot
```bash
gcloud compute disks snapshot DISK_NAME \
    --snapshot-names=typesense-backup-$(date +%Y%m%d) \
    --zone=us-central1-a
```

## Troubleshooting

### Instance won't start
```bash
# Check startup script logs
gcloud compute instances get-serial-port-output typesense-instance --zone=us-central1-a
```

### Can't connect to Typesense
1. Check if the service is running: `sudo systemctl status typesense`
2. Check firewall rules in GCP Console
3. Verify the API key is set correctly
4. Check Docker logs: `docker logs typesense`

### Performance issues
- Monitor CPU/memory usage in GCP Console
- Consider upgrading to a larger machine type
- Check Typesense performance metrics

## Cost Optimization

Current estimated cost: **$29.46/month**

To optimize:
1. Use preemptible instances (50-91% discount, but can be terminated)
2. Schedule instance stop/start for non-production environments
3. Use sustained use discounts (automatic for continuous usage)

## Next Steps

1. **Set up monitoring** with Google Cloud Monitoring
2. **Configure SSL/HTTPS** with Let's Encrypt or Cloud Load Balancer
3. **Set up automated backups**
4. **Create staging environment** with similar configuration
5. **Implement CI/CD** for Terraform changes