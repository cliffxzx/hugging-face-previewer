import multiprocessing
from transformers import pipeline
import hashlib
import uuid
import json
from functools import wraps
from flask import make_response, request
from flask_restx import Namespace, Resource, reqparse
from boto3.dynamodb.conditions import Key, Attr

from model_monkey.initializers import dynamodb, s3, pool
from model_monkey.utils import status_msg

from config.settings import SECRET_KEY

def _enqueue(model_name, user, inp, task):
    try:
        user['status'] = 2
        dynamodb.Table('users').put_item(Item=user)
        pipe = pipeline(model=model_name)
        output = pipe(inp)
        try:
            res = json.dumps(output)
        except Exception as e:
            res = 'unsupported output format'
            raise Exception

        s3.Bucket('user-dataset').put_object(Body=res, Key=task['output_id'])
        user['status'] = 0
        dynamodb.Table('users').put_item(Item=user)
        task['status'] = 3
        dynamodb.Table('tasks').put_item(Item=task)
    except Exception as e:
        task['status'] = 4
        s3.Bucket('user-dataset').put_object(Body=str(e), Key=task['output_id'])
        dynamodb.Table('tasks').put_item(Item=task)

def enqueue(model_name, inp, user):
    task_id = uuid.uuid4().hex
    try:
        user['task_id'] = task_id
        user['status'] = 1
        dynamodb.Table('users').put_item(Item=user)

        inp_id = uuid.uuid4().hex
        output_id = uuid.uuid4().hex
        s3.Bucket('user-dataset').put_object(Body=inp, Key=inp_id)
        task = {
            'task_id': task_id,
            'model_name': model_name,
            'inp_id': inp_id,
            'output_id': output_id,
            'status': 1,
        }
        dynamodb.Table('tasks').put_item(Item=task)
        # _enqueue(model_name, user, inp, task)
        p = multiprocessing.Process(target=_enqueue, args=(model_name, user, inp, task))
        pool.append(p)
        p.start()
        return task_id, True
    except Exception as e:
        user['task_id'] = ''
        user['status'] = 0
        dynamodb.Table('users').put_item(Item=user)
        dynamodb.Table('tasks').put_item(
            Item={
                'task_id': task_id,
                'model_name': model_name,
                'output_id': 'error when push to process pool',
                'status': 4,
            }
        )
        return str(e), False