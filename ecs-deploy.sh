#!/bin/sh

# PRE-BUILD
echo "authenticating the Docker CLI to use the ECR registry..."
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 310441857978.dkr.ecr.us-east-1.amazonaws.com

# BUILD-STEPS
echo "building backend image..."
docker build -f server/Dockerfile -t 310441857978.dkr.ecr.us-east-1.amazonaws.com/server:latest --no-cache ./server/

echo "building frontend image..."
docker build -f client/Dockerfile.prod -t 310441857978.dkr.ecr.us-east-1.amazonaws.com/client:latest --build-arg NODE_ENV=production --no-cache ./client/

# POST-BUILD
echo "pushing backend image to AWS ECR..."
docker push 310441857978.dkr.ecr.us-east-1.amazonaws.com/server:latest

echo "pushing frontend image to AWS ECR..."
docker push 310441857978.dkr.ecr.us-east-1.amazonaws.com/client:latest

# echo "updating AWS ECS backend service..."
# aws ecs update-service --cluster prod-cluster --service server-svc --force-new-deployment

# echo "updating AWS ECS frontend service..."
# aws ecs update-service --cluster prod-cluster --service client-svc --force-new-deployment

# echo "Done!"