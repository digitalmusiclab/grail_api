# Flask Imports
from flask import Blueprint, render_template, jsonify, abort
from flask import current_app, redirect, request, url_for, make_response

# GRAIL Imports
from grail.utilities.middleware import cache
from grail.models import User, db



"""""""""""""""""""""""""""""""""""""""""""""
    
    Configure Blueprint

"""""""""""""""""""""""""""""""""""""""""""""

api = Blueprint('api', __name__, template_folder='templates')



"""""""""""""""""""""""""""""""""""""""""""""
    
    Configure Endpoints

"""""""""""""""""""""""""""""""""""""""""""""

# SHOW ALL USERS
@api.route('/users')
def display_users():
    current_app.logger.info('Displaying all users.')
    users = [user.serialize() for user in User.query.all()]
    return jsonify(users)


# SHOW SPECIFIC USER
@api.route('/users/<int:id>')
def get_user(id):
    
    user = User.query.get(id)
    
    if not user:
    	current_app.logger.info('Invalid User ID.')
        abort(make_response(jsonify(message="Invalid User ID"), 400))
    
    current_app.logger.info('Displaying specific user.')
    
    return jsonify({'email': user.email})


# CREATE USER ENDPOINT
@api.route('/users', methods=['POST'])
def new_user():

    email = request.json.get('email')
    password = request.json.get('password')

    # Check for required parameters
    if email is None or password is None:
        abort(make_response(jsonify(message="Missing Parameters"), 400))
    
    # Check for duplicate user
    if User.query.filter_by(email=email).first() is not None:
        abort(make_response(jsonify(message="Email Already Registered"), 401))
    
    user = User(email, password)
    db.session.add(user)
    db.session.commit()

    current_app.logger.info('New User Created')

    response_body = jsonify(user.serialize())
    response_headers = {'Location': url_for('api.get_user', id=user.id, _external=True)}

    return (response_body, 201, response_headers)