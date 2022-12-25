from flask_restx import Namespace, reqparse

misc = Namespace('Misc', description='Misc')
status_msg = misc.model('status_msg', {
    'required': [],
    'properties': {
        'message': { 'type': 'string' },
        'code': { 'type': 'string' },
    },
    'type': 'object'
})
