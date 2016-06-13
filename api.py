#!/usr/bin/env python
"""SolR and Flask rule."""

import os
from flask import Flask, abort, request, jsonify, g, url_for
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.httpauth import HTTPBasicAuth
from passlib.apps import custom_app_context as pwd_context
from itsdangerous import (TimedJSONWebSignatureSerializer
                          as Serializer, BadSignature, SignatureExpired)
from flask import render_template
# from functools import wraps
# from flask import Response
import pysolr

# initialization
app = Flask(__name__)
app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy dog'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True

# extensions
db = SQLAlchemy(app)
auth = HTTPBasicAuth()


class User(db.Model):
    """Table of users and passwords."""

    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), index=True)
    password_hash = db.Column(db.String(64))

    def hash_password(self, password):
        """Hash password."""
        self.password_hash = pwd_context.encrypt(password)

    def verify_password(self, password):
        """Verify password."""
        return pwd_context.verify(password, self.password_hash)

    def generate_auth_token(self, expiration=600):
        """Generate authorization token."""
        s = Serializer(app.config['SECRET_KEY'], expires_in=expiration)
        return s.dumps({'id': self.id})

    @staticmethod
    def verify_auth_token(token):
        """Verify authorization token."""
        s = Serializer(app.config['SECRET_KEY'])
        try:
            data = s.loads(token)
        except SignatureExpired:
            return None    # valid token, but expired
        except BadSignature:
            return None    # invalid token
        user = User.query.get(data['id'])
        return user


@auth.verify_password
def verify_password(username_or_token, password):
    """Verify password."""
    # first try to authenticate by token
    user = User.verify_auth_token(username_or_token)
    if not user:
        # try to authenticate with username/password
        user = User.query.filter_by(username=username_or_token).first()
        if not user or not user.verify_password(password):
            return False
    g.user = user
    return True


@app.route('/api/users', methods=['POST'])
def new_user():
    """
    Add new user using POST request.

    Body of the request has to be a JSON object with username and password
    fields. E.g.,

    curl -i -X POST -H "Content-Type: application/json" -d
    '{"username":"user","password":"pass"}' http://127.0.0.1:5000/api/users

    """
    username = request.json.get('username')
    password = request.json.get('password')
    if username is None or password is None:
        abort(400)    # missing arguments
    if User.query.filter_by(username=username).first() is not None:
        abort(400)    # existing user
    user = User(username=username)
    user.hash_password(password)
    db.session.add(user)
    db.session.commit()
    return (jsonify({'username': user.username}), 201,
            {'Location': url_for('get_user', id=user.id, _external=True)})


@app.route('/api/users/<int:id>')
def get_user(id):
    """Get user name."""
    user = User.query.get(id)
    if not user:
        abort(400)
    return jsonify({'username': user.username})


@app.route('/api/token')
@auth.login_required
def get_auth_token():
    """Get authorization token."""
    token = g.user.generate_auth_token(600)
    return jsonify({'token': token.decode('ascii'), 'duration': 600})


# @app.route('/api/resource')
# @auth.login_required
# def get_resource():
#     return jsonify({'data': 'Hello, %s!' % g.user.username})


solr = pysolr.Solr('http://132.206.14.236:8983/solr/grail', timeout=10)


@app.route('/')
def api_root():
    """API root."""
    return render_template('hello.html')


@app.route('/api')
@auth.login_required
def grail_api():
    """http://127.0.0.1:5000/grail?artist_name=Mansun."""
    if 'artist_name' in request.args:
        search = solr.search(q='artist_name:' + request.args['artist_name'])
        q = search.raw_response
        # http://flask.pocoo.org/docs/0.10/api/#flask.json.jsonify
        return jsonify(**q)
        # Using HTML template
        # return render_template('hello.html', name=q)
    elif 'musicbrainz_artist' in request.args:
        search = solr.search(q='musicbrainz_artist:' + request.args['musicbrainz_artist'])
        q = search.raw_response
        return jsonify(**q)
    elif 'musixmatch_artist' in request.args:
        search = solr.search(q='musixmatch_artist:' + request.args['musixmatch_artist'])
        q = search.raw_response
        return jsonify(**q)
    elif 'spotify_artist' in request.args:
        search = solr.search(q='spotify_artist:' + request.args['spotify_artist'])
        q = search.raw_response
        return jsonify(**q)
    elif 'isrc' in request.args:
        search = solr.search(q='isrc:' + request.args['isrc'])
        q = search.raw_response
        return jsonify(**q)
    else:
        return 'Enter your query'


if __name__ == '__main__':
    if not os.path.exists('db.sqlite'):
        db.create_all()
    app.run(host='0.0.0.0', debug=True)
