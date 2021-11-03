#!/bin/sh

echo "Sync with S3"
aws s3 sync --delete ./dist/apps/frontend/conf s3://$S3_BUCKET

echo "CloudFront Invalidation"
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"
