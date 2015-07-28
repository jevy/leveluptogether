## How to sync

````
aws s3 sync . s3://www.leveluptogether.com --region us-east-1 --delete --exclude ".git/*"
````