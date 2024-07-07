provider "aws" {
  region = "eu-central-1"
}

# Data source for Amazon Linux 2 AMI
data "aws_ami" "amazon_linux" {
  most_recent = true

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }

  filter {
    name   = "owner-alias"
    values = ["amazon"]
  }
}

# Launch Template
resource "aws_launch_template" "example" {
  name_prefix   = "example-"
  image_id      = data.aws_ami.amazon_linux.id
  instance_type = "t3.medium"

  network_interfaces {
    associate_public_ip_address = true
  }

  lifecycle {
    create_before_destroy = true
  }
}

# EKS Node Group
resource "aws_eks_node_group" "example" {
  cluster_name    = "Helm-Cluster"
  node_group_name = "my-node-group"
  node_role_arn   = "arn:aws:iam::514011952473:role/eks-cluster-role"
  subnet_ids      = ["subnet-0bb9c6005949e15f8", "subnet-0a3d6393f9508d390"]

  scaling_config {
    min_size     = 1
    desired_size = 2
    max_size     = 3
  }

  launch_template {
    id      = aws_launch_template.example.id
    version = "$Latest"
  }

  capacity_type = "ON_DEMAND" 
}
