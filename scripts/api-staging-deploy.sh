#!/bin/sh

echo "Build container image"
docker build -t registry.digitalocean.com/speakout-group/speakout-api-staging:$(echo $GITHUB_SHA | head -c7) -f $GITHUB_WORKSPACE/k8s/api/Dockerfile .

echo "Log in to DigitalOcean Container Registry with short-lived credentials"
doctl registry login --expiry-seconds 1200

echo "Push image to DigitalOcean Container Registry"
docker push registry.digitalocean.com/speakout-group/speakout-api-staging:$(echo $GITHUB_SHA | head -c7)

echo "Update deployment file"
TAG=$(echo $GITHUB_SHA | head -c7) && sed -i 's|<IMAGE>|registry.digitalocean.com/speakout-group/speakout-api-staging:'${TAG}'|' $GITHUB_WORKSPACE/k8s/api/deployment-staging.yml

echo "Save DigitalOcean kubeconfig with short-lived credentials"
doctl kubernetes cluster kubeconfig save --expiry-seconds 600 speakout-k8s-ny1

echo "Deploy to DigitalOcean Kubernetes"
kubectl apply -f $GITHUB_WORKSPACE/k8s/api/deployment-staging.yml --namespace staging

echo "Verify deployment"
kubectl rollout status deployment/speakout-api-deployment --namespace staging
