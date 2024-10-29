bucketNameExportName = AdminWebsiteStack:BucketName
distributionIdExportName = AdminWebsiteStack:DistributionId


deploy:
	bucketName=$$(aws cloudformation list-exports --query "Exports[?ends_with(Name, '$(bucketNameExportName)')].Value" --output text); \
	echo "Bucket name: $$bucketName"; \
	aws s3 cp ./build s3://$$bucketName/ --recursive; \
	\
	distributionId=$$(aws cloudformation list-exports --query "Exports[?ends_with(Name, '$(distributionIdExportName)')].Value" --output text); \
	echo "CloudFront Distribution ID: $$distributionId"; \
	aws cloudfront create-invalidation --distribution-id $$distributionId --paths "/*"
