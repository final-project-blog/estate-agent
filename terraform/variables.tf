variable "region" {
  description = "The AWS region to deploy to"
  default     = "eu-central-1"
}

variable "cluster_name" {
  description = "The name of the EKS cluster"
  default     = "my-cluster"
}

variable "vpc_cidr" {
  description = "The CIDR block for the VPC"
  default     = "10.0.0.0/16"
}

variable "subnet_count" {
  description = "The number of subnets to create"
  default     = 2
}

variable "instance_type" {
  description = "EC2 instance type for the worker nodes"
  default     = "t3.medium"
}

variable "desired_capacity" {
  description = "Desired number of worker nodes"
  default     = 2
}

variable "max_size" {
  description = "Maximum number of worker nodes"
  default     = 3
}

variable "min_size" {
  description = "Minimum number of worker nodes"
  default     = 1
}

variable "eks_node_ami_id" {
  description = "AMI ID for the EKS worker nodes"
  default     = "ami-0c55b159cbfafe1f1"  
}
