import boto3
from redis import Redis

from config.settings import REDIS_URL, AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_REGION, DYNAMODB_URL, S3_URL

redis = Redis.from_url(REDIS_URL)

aws = boto3.Session(
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY,
    region_name=AWS_REGION
)

dynamodb_client = aws.client('dynamodb', endpoint_url=DYNAMODB_URL)
dynamodb_resource = aws.resource('dynamodb', endpoint_url=DYNAMODB_URL)
dynamodb = dynamodb_resource

s3_client = aws.client('s3', endpoint_url=S3_URL)
s3_resource = aws.resource('s3', endpoint_url=S3_URL)
s3 = s3_resource

pool = []