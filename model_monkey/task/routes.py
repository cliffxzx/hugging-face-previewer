import re
import requests
from flask_restx import Namespace, Resource, reqparse
from flask import request

from model_monkey.initializers import dynamodb, s3_resource
from model_monkey.utils import status_msg
from model_monkey.authentication.routes import tag_user
from model_monkey.model.enqueue import enqueue
from boto3.dynamodb.conditions import Key, Attr

from config.settings import SECRET_KEY

task = Namespace('Task', description='Task operations')

enqueue_req = reqparse.RequestParser()
enqueue_req.add_argument('input', location=['values', 'form', 'files'])

@task.route('/<task_id>/status')
class TaskStatus(Resource):
    @task.param('task_id', 'ID of Task')
    @tag_user
    def get(self, task_id):
        existed_task = dynamodb.Table('tasks').query(
            KeyConditionExpression=Key('task_id').eq(task_id)
        )

        if 'Count' not in existed_task or existed_task['Count'] < 1:
            return { 'message': 'there\'s no this running task', 'code': 400 }, 400

        task = existed_task['Items'][0]

        return { 'message': ['Runnable', 'Queueing', 'Running', 'Success', 'Error'][int(task['status'])],
        'code': 290+int(task['status'])}, 200

@task.route('/<task_id>/output')
class TaskOutput(Resource):
    @task.param('task_id', 'ID of Task')
    @tag_user
    def get(self, task_id):
        existed_task = dynamodb.Table('tasks').query(
            KeyConditionExpression=Key('task_id').eq(task_id)
        )

        if 'Count' not in existed_task or existed_task['Count'] < 1:
            return { 'message': 'there\'s no this running task', 'code': 400 }, 400

        task = existed_task['Items'][0]

        return { 'text': s3_resource.Object('user-dataset', task['output_id']).get()['Body'].read().decode('utf-8'),'code': 280}, 200