provider "aws" {
  region = var.region
}

resource "aws_vpc" "main" {
  cidr_block = var.vpc_cidr
}

resource "aws_subnet" "subnet" {
  count                   = var.subnet_count
  vpc_id                  = aws_vpc.main.id
  cidr_block              = cidrsubnet(aws_vpc.main.cidr_block, 8, count.index)
  availability_zone       = element(data.aws_availability_zones.available.names, count.index)
  map_public_ip_on_launch = true
}

resource "aws_eks_cluster" "eks" {
  name     = var.cluster_name
  role_arn = aws_iam_role.eks.arn

  vpc_config {
    subnet_ids = aws_subnet.subnet[*].id
  }

  depends_on = [aws_iam_role_policy_attachment.eks]
}

resource "aws_iam_role" "eks" {
  name = "eks-cluster-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Principal = {
        Service = "eks.amazonaws.com"
      },
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "eks" {
  role       = aws_iam_role.eks.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
}

resource "aws_iam_role" "eks_nodes" {
  name = "eks-nodes-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Principal = {
        Service = "ec2.amazonaws.com"
      },
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "eks_nodes" {
  role       = aws_iam_role.eks_nodes.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
}

resource "aws_iam_instance_profile" "eks_nodes" {
  name = "eks-node"
  role = aws_iam_role.eks_nodes.name
}

resource "aws_launch_configuration" "eks_nodes" {
  name          = "eks-nodes"
  image_id      = var.eks_node_ami_id
  instance_type = var.instance_type
  iam_instance_profile = aws_iam_instance_profile.eks_nodes.name
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_autoscaling_group" "eks_nodes" {
  desired_capacity     = var.desired_capacity
  max_size             = var.max_size
  min_size             = var.min_size
  vpc_zone_identifier  = aws_subnet.subnet[*].id
  launch_configuration = aws_launch_configuration.eks_nodes.id

  tag {
    key                 = "kubernetes.io/cluster/${aws_eks_cluster.eks.name}"
    value               = "owned"
    propagate_at_launch = true
  }
}

output "cluster_endpoint" {
  value = aws_eks_cluster.eks.endpoint
}

output "cluster_certificate_authority_data" {
  value = aws_eks_cluster.eks.certificate_authority.0.data
}
