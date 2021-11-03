#!/bin/sh

echo "Sync with S3"
aws s3 sync --delete ./dist/apps/app s3://$S3_BUCKET_STAGING

echo "CloudFront Invalidation"
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID_STAGING --paths "/*"
