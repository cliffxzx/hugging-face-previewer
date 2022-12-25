from flask_restx import Api
from model_monkey.static.routes import static
from model_monkey.model.routes import model
from model_monkey.task.routes import task

api = Api(
    version='1.0',
    title='MonkeyModel API',
    description='A simple MonkeyModel API',
)

api.add_namespace(model, path='/model')
api.add_namespace(task, path='/task')
api.add_namespace(static, path='/')
