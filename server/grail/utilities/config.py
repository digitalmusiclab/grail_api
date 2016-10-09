from flask_compress import Compress
import os, logging



"""""""""""""""""""""""""""""""""""""""""""""
    
    Environment Configurations

"""""""""""""""""""""""""""""""""""""""""""""

class BaseConfig(object):
    DEBUG = False
    TESTING = False
    SECRET_KEY = '1d94e52c-1c89-4515-b87a-f48cf3cb7f0b'
    LOGGING_LEVEL = logging.DEBUG
    LOGGING_LOCATION = 'logs/grail-api.log'
    LOGGING_FORMAT = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    CACHE_TYPE = 'simple'
    COMPRESS_MIMETYPES = ['text/html', 'text/css', 'application/json', 'application/javascript']
    COMPRESS_LEVEL = 6
    COMPRESS_MIN_SIZE = 500
    # sqlite :memory: identifier is the default if no filepath is present
    SQLALCHEMY_DATABASE_URI = 'sqlite:///'
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    TEMPLATE_FOLDER = 'templates'


class DevelopmentConfig(BaseConfig):
    DEBUG = True
    TESTING = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///grail-api-dev-db.sqlite'
    SECRET_KEY = 'a9eec0e0-23b7-4788-9a92-318347b9a39f'


class TestingConfig(BaseConfig):
    DEBUG = False
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///grail-api-test-db.sqlite'
    SECRET_KEY = '792842bc-c4df-4de1-9177-d5207bd9faa6'

class ProductionConfig(BaseConfig):
    DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///grail-api-prod-db.sqlite'
    # Set SecretKey through ENV vars in Production
    SECRET_KEY = '792842bc-c4df-4de1-9177-d5207bd9faa6'


config = {
    "development": "grail.utilities.config.DevelopmentConfig",
    "testing": "grail.utilities.config.TestingConfig",
    "production": "grail.utilities.config.ProductionConfig"
}



"""""""""""""""""""""""""""""""""""""""""""""
    
    Configure Flask Application

"""""""""""""""""""""""""""""""""""""""""""""

def configure_app(app):
    
    # Load Enviornment Specific Configuration
    env_name = os.getenv('FLASK_CONFIGURATION', 'development')
    env_config_obj = config[env_name]
    app.config.from_object(env_config_obj)
    
    # Configure Logging
    handler = logging.FileHandler(app.config['LOGGING_LOCATION'])
    handler.setLevel(app.config['LOGGING_LEVEL'])
    formatter = logging.Formatter(app.config['LOGGING_FORMAT'])
    handler.setFormatter(formatter)
    app.logger.addHandler(handler)
    
    # Configure Compression
    Compress(app)