from flask_sqlalchemy import SQLAlchemy
from passlib.apps import custom_app_context as pwd_context
from itsdangerous import (TimedJSONWebSignatureSerializer as Serializer, BadSignature, SignatureExpired)



"""""""""""""""""""""""""""""""""""""""""""""
    
    Configure Database Connector

"""""""""""""""""""""""""""""""""""""""""""""

db = SQLAlchemy()



"""""""""""""""""""""""""""""""""""""""""""""
    
    Configure DB Models

"""""""""""""""""""""""""""""""""""""""""""""

class User(db.Model):

    # Table Schema
    __tablename__ = 'users'
    id = db.Column('id', db.Integer, primary_key=True)
    email = db.Column('email', db.String(50), unique=True, index=True)
    password_hash = db.Column('password_hash', db.String(64))
    registered_on = db.Column('registered_on' , db.DateTime)


    # Instance Methods
    def __init__(self, email, password):
        self.email = email
        self.hash_password(password)

    def serialize(self):
        return { 'email': self.email }

    def hash_password(self, password):
        self.password_hash = pwd_context.encrypt(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.password_hash)

    def generate_auth_token(self, expiration=600):
        s = Serializer(app.config['SECRET_KEY'], expires_in=expiration)
        auth_token = s.dumps({'id': self.id})
        return auth_token


    # Class Methods
    @staticmethod
    def verify_auth_token(token):
        s = Serializer(app.config['SECRET_KEY'])
        try:
            data = s.loads(token)
        except SignatureExpired:
            return None    # valid token, but expired
        except BadSignature:
            return None    # invalid token

        user = User.query.get(data['id'])
        return user
