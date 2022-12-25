from model_monkey.initializers import dynamodb_client, dynamodb_resource, s3_client, s3_resource
from config.settings import AWS_REGION

def seeder(app):
    if app.debug:
        try:
            dynamodb_resource.Table('users').delete()
            dynamodb_resource.Table('tasks').delete()
            s3_client.Bucket('user-dataset').delete()
        except:
            pass

    try:
        s3_resource.create_bucket(Bucket='user-dataset', CreateBucketConfiguration={'LocationConstraint': AWS_REGION})

    except Exception as e:
        pass

    try:
        dynamodb_client.create_table(
            TableName='users',
            KeySchema=[
                { 'AttributeName': 'user_id', 'KeyType': 'HASH' }, # Partition Key
                { 'AttributeName': 'username', 'KeyType': 'RANGE' }, # Sort Key
                # { 'AttributeName': 'username', 'KeyType': 'RANGE' }, # Sort Key
                # { 'AttributeName': 'status', 'KeyType': 'RANGE' }, # Sort Key
                # { 'AttributeName': 'task_id', 'KeyType': 'HASH' }, # Sort Key
            ],
            AttributeDefinitions=[
                { 'AttributeName': 'user_id', 'AttributeType': 'S' }, # string data type
                { 'AttributeName': 'username', 'AttributeType': 'S' }, # string data type
                # { 'AttributeName': 'username', 'AttributeType': 'S' }, # string data type
                # { 'AttributeName': 'status', 'AttributeType': 'N' }, # number data type
                # { 'AttributeName': 'task_id', 'AttributeType': 'S' }, # string data type
            ],
            ProvisionedThroughput={ 'ReadCapacityUnits': 10, 'WriteCapacityUnits': 10 }
        )
        dynamodb_client.create_table(
            TableName='tasks',
            KeySchema=[
                { 'AttributeName': 'task_id', 'KeyType': 'HASH' }, # Partition Key
                { 'AttributeName': 'model_name', 'KeyType': 'RANGE' }, # Sort Key
            ],
            AttributeDefinitions=[
                { 'AttributeName': 'task_id', 'AttributeType': 'S' }, # string data type
                { 'AttributeName': 'model_name', 'AttributeType': 'S' }, # string data type
            ],
            ProvisionedThroughput={ 'ReadCapacityUnits': 10, 'WriteCapacityUnits': 10 }
        )
    except dynamodb_client.exceptions.ResourceInUseException:
        pass

# status:
# 0: runnable
# 1: queueing
# 2: running