import uuid
from functools import wraps
from flask import make_response, request

from model_monkey.initializers import dynamodb

def tag_user(endpoint):
    @wraps(endpoint)
    def func(*args, **kwargs):
        user_id = request.cookies.get('user_id', None)
        if user_id is None:
            tmp = request.cookies.to_dict()
            tmp['user_id'] = uuid.uuid4().hex
            request.cookies = tmp

        dynamodb.Table('users').put_item(
            Item={
                'user_id': request.cookies['user_id'],
                'username': 'hello',
            }
        )

        response = make_response(endpoint(*args, **kwargs))
        response.set_cookie('user_id', request.cookies['user_id'])

        return response
    return func