from flask import send_from_directory
from flask_restx import Namespace, Resource

from model_monkey.authentication.routes import tag_user

static = Namespace('Static', description='213')
@static.route('/<path>')
class Static(Resource):
    @static.param('path', 'path')
    @tag_user
    def get(self, path):
        return send_from_directory('../public', path)