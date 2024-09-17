bucketNameExportName = AdminWebsiteStack:BucketName
distributionIdExportName = AdminWebsiteStack:DistributionId
# deploys the build
deploy:
	bucketName=$$(aws cloudformation list-exports --query "Exports[?Name=='$(bucketNameExportName)'].Value" --output text); \
	distributionId=$$(aws cloudformation list-exports --query "Exports[?Name=='$(bucketNameExportName)'].Value" --output text); \
	echo "Bucket name: $$bucketName"; \
	echo "Distribution ID: $$distributionId" \
	aws s3 cp ./build s3://$$bucketName/ --recursive \
	aws cloudfront create-invalidation --distribution-id $(distributionId) --paths "/*"