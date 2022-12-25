import re
import requests
from flask_restx import Namespace, Resource, reqparse
from flask import request, redirect

from model_monkey.initializers import dynamodb
from model_monkey.utils import status_msg
from model_monkey.authentication.routes import tag_user
from model_monkey.model.enqueue import enqueue
from boto3.dynamodb.conditions import Key, Attr

from config.settings import SECRET_KEY

model = Namespace('Model', description='Model operations')

# model_info = model.model('model_info', {
#     'required': ['code', 'message'],
#     'properties': {
#         'input_type': { 'type': 'string' },
#         'task': { 'type': 'string' },
#         'languages': { 'type': 'array' },
#         'code': { 'type': 'integer' },
#         'message': { 'type': 'string' },
#     },
#     'type': 'object'
# })


enqueue_req = reqparse.RequestParser()
enqueue_req.add_argument('input', location=['values', 'form', 'files'])

quicksearch_req = reqparse.RequestParser()
quicksearch_req.add_argument('q', location=['args'])

TASK_TO_INPUT_TYPE = {
    'image-classification': 'file',
    'image-segmentation': 'file',
    'zero-shot-image-classification': 'file',
    'image-to-image': 'file',
    'unconditional-image-generation': 'file',
    'object-detection': 'file',
    'video-classification': 'file',
    'depth-estimation': 'file',
    'translation': 'text',
    'fill-mask': 'text',
    'token-classification': 'text',
    'sentence-similarity': 'pair-text',
    'question-answering': 'pair-text',
    'summarization': 'text',
    # 'zero-shot-classification': '', TODO: implement
    'text-classification': 'text',
    'text2text-generation': 'text',
    'text-generation': 'text',
    # 'conversational': '',  TODO: implement
    # 'table-question-answering': '', TODO: implement
    'automatic-speech-recognition': 'file',
    'audio-classification': 'file',
    'text-to-speech': 'file',
    'audio-to-audio': 'file',
    'voice-activity-detection': 'file',
    'feature-extraction': 'text',
    'text-to-image': 'text',
    # 'visual-question-answering': '', TODO: implement
    'image-to-text': 'file',
    # 'document-question-answering': '', TODO: implement
    # 'tabular-classification': '', TODO: implement
    # 'tabular-regression': '', TODO: implement
    # 'reinforcement-learning': '', TODO: implement
    # 'robotics': '', TODO: implement
}

def _model_fullname(org_name, model_name):
    if org_name:
            org_name += '/'

    return f'{org_name}{model_name}'

@model.route('/<model_name>', defaults={'org_name': ''})
@model.route('/<org_name>/<model_name>')
class Model(Resource):
    @model.param('org_name', 'Name of Organization')
    @model.param('model_name', 'Name of Model')
    @tag_user
    def get(self, org_name, model_name):
        model_fullname = _model_fullname(org_name, model_name)
        html = requests.get(f'https://huggingface.co/{model_fullname}').text

        # 404
        if re.compile('\<h1.*404.*\<\/h1>').findall(html):
            return {'code': 404, 'message': 'model not found'}, 404

        task = re.compile('\/models\?pipeline_tag=(.+?)"><').findall(html)
        if not task:
            return {'code': 40401, 'message': 'unknown task'}, 404

        task = task[0]

        if TASK_TO_INPUT_TYPE.get(task, None) is None:
            return {'code': 40402, 'message': 'task not implemented yet'}, 404

        languages = re.compile('\/models\?language=(.+?)"><').findall(html)

        return  {
            'task': task,
            'input_type': TASK_TO_INPUT_TYPE[task],
            'languages': languages,
            'code': 200,
            'message': 'success'
        }

    @model.expect(enqueue_req)
    @model.param('org_name', 'Name of Organization')
    @model.param('model_name', 'Name of Model')
    @tag_user
    def post(self, org_name, model_name):
        model_fullname = _model_fullname(org_name, model_name)
        user_id = request.cookies.get('user_id', None)
        args = enqueue_req.parse_args()

        try:
            existed_user = dynamodb.Table('users').query(
                KeyConditionExpression=Key('user_id').eq(user_id)
            )
        except:
            pass

        if 'Count' not in existed_user or existed_user['Count'] < 1:
            return { 'message': 'user not fond', 'code': 400 }, 400

        if 'status' in existed_user and existed_user['status'] != 0:
            return { 'message': 'you can\'t run more than 1 number of model', 'code': 405 }, 405

        user = existed_user['Items'][0]
        inp = args['input']
        if type(inp) is not str:
            inp = inp

        res, success = enqueue(model_fullname, inp, user)
        if not success:
            return { 'message': res, 'code': 400 }, 400

        return { 'task_id': res, 'code': 200 }, 200


@model.route('/quicksearch')
class QuickSearch(Resource):
    @model.param('quicksearch', 'QuickSearch')
    def get(self):
        args = quicksearch_req.parse_args()
        return redirect('https://huggingface.co/api/quicksearch?q='+args['q'], code=302)