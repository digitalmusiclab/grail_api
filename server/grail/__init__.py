# Import OS Module
import os

# Import Flask Modules
from flask import abort, Flask, g, render_template, request, make_response, jsonify

# Import GRAIL Modules
from grail.models import db
from grail.utilities.middleware import cache
from grail.utilities.config import configure_app

# Import GRAIL Route Modules
from grail.routes.api import api
from grail.routes.admin import admin



"""""""""""""""""""""""""""""""""""""""""""""
    
    Configure Application 

"""""""""""""""""""""""""""""""""""""""""""""

# Initialize Flask Application
app = Flask(__name__)

# Configure Flask Application
configure_app(app)

# Initialize Cache
cache.init_app(app)

# Initialize Database
db.init_app(app)

# Ensure Database Exists
with app.app_context():
	db_path = app.config['SQLALCHEMY_DATABASE_URI']
	if not os.path.exists(db_path):
		db.create_all()



"""""""""""""""""""""""""""""""""""""""""""""
    
    Configure Error Handlers

"""""""""""""""""""""""""""""""""""""""""""""

@app.errorhandler(404)
def page_not_found(error):
    app.logger.error('No Matching Route: %s', (request.path, error))
    return make_response(jsonify(message='No Matching Route'), 404)


@app.errorhandler(500)
def internal_server_error(error):
    app.logger.error('Server Error: %s', (error))
    return make_response(jsonify(message='Server Error'), 500)

@app.errorhandler(Exception)
def unhandled_exception(error):
    app.logger.error('Unhandled Exception: %s', (error))
    return make_response(jsonify(message='Unhandled Error'), 500)



"""""""""""""""""""""""""""""""""""""""""""""
    
    Configure Server Endpoints

"""""""""""""""""""""""""""""""""""""""""""""

# Root API Route
@app.route('/')
@cache.cached(300)
def home():
    return render_template('index.html')

# Register Blueprint API Endpoints
app.register_blueprint(api, url_prefix='/api')
app.register_blueprint(admin, url_prefix='/admin')