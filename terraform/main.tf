provider "aws" {
  region = var.region
}

provider "helm" {
  kubernetes {
    config_path = "~/.kube/config"
  }
}

data "aws_availability_zones" "availibility_zones" {
  filter {
    name   = "opt-in-status"
    values = ["opt-in-not-required"]
  }
}

locals {
  cluster_name = var.clustername
}

resource "random_string" "suffix" {
  length  = 8
  special = false
  lower   = true
}

module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "${var.clustername}-vpc"

  cidr = "10.0.0.0/16"

  azs = slice(data.aws_availability_zones.availibility_zones.names, 0, 3)

  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.4.0/24", "10.0.5.0/24", "10.0.6.0/24"]

  enable_nat_gateway   = true
  single_nat_gateway   = true
  enable_dns_hostnames = true

  public_subnet_tags = {
    "kubernetes.io/cluster/${var.clustername}" = "shared"
    "kubernetes.io/role/elb"                   = 1
  }

  private_subnet_tags = {
    "kubernetes.io/cluster/${var.clustername}" = "shared"
    "kubernetes.io/role/internal-elb"          = 1
  }
}

module "eks" {
  source = "terraform-aws-modules/eks/aws"

  cluster_name    = var.clustername
  cluster_version = "1.29"

  vpc_id                         = module.vpc.vpc_id
  subnet_ids                     = module.vpc.private_subnets
  cluster_endpoint_public_access = true

  enable_cluster_creator_admin_permissions = true

  eks_managed_node_group_defaults = {
    ami_type = "AL2_x86_64"
  }

  eks_managed_node_groups = {
    one = {
      name           = "nodegroup-1"
      instance_types = ["t3.small"]
      min_size       = 2
      max_size       = 3
      desired_size   = 2
    }
  }
}

resource "aws_instance" "example" {
  ami           = "ami-0c0289212530be3e5" 
  instance_type = "t2.micro"
  count         = 2

  tags = {
    Name = "example-instance-${count.index}"
  }
}
resource "aws_instance" "example2" {
  ami           = "ami-0ab82412fddf26d2c" 
  instance_type = "t3.micro"  
  tags = {
    Name = "example-instance"
  }
}





