import os

SECRET_KEY = os.getenv("SECRET_KEY", None)

SERVER_NAME = os.getenv(
    "SERVER_NAME", "localhost:{0}".format(os.getenv("PORT", "8000"))
)

# AWS
AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY", 'dummy')
AWS_SECRET_KEY = os.getenv("AWS_SECRET_KEY", 'dummy')
AWS_REGION = os.getenv("AWS_REGION", 'us-west-2')


# Dynamodb
DYNAMODB_URL = os.getenv("DYNAMODB_URL", 'http://localhost:4566')

# S3
S3_URL = os.getenv("S3_URL", 'http://localhost:4566')

# Redis.
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")

# Celery.
CELERY_CONFIG = {
    "broker_url": REDIS_URL,
    "result_backend": REDIS_URL,
    "include": [],
}

DEBUG_TB_INTERCEPT_REDIRECTS = False