# Flask Imports
from flask import Blueprint, render_template, flash
from flask import current_app, redirect, request, url_for



"""""""""""""""""""""""""""""""""""""""""""""
    
    Configure Blueprint

"""""""""""""""""""""""""""""""""""""""""""""

admin = Blueprint('admin', __name__, template_folder='templates')



"""""""""""""""""""""""""""""""""""""""""""""
    
    Configure Endpoints

"""""""""""""""""""""""""""""""""""""""""""""

# Admin Root Route
@admin.route('')
def index():
    return "ADMIN ROUTES"