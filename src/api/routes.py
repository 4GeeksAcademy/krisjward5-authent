"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS

api = Blueprint('api', __name__)
bcrypt = Bcrypt()

# Allow CORS requests to this API
CORS(api)


@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user:
        return jsonify({"msg":"email already exists"}), 400
    
    try:

        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        new_user = User(email=data['email'], password = hashed_password, is_active=True)

        db.session.add(new_user)
        db.session.commit()
        return jsonify({"msg": "user created successfully"}), 201
    
    except Exception as e: 
        db.session.rollback()
        print(f"error: {e}")
        return jsonify({"msg": "server error"}, 500)

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if not user or not bcrypt.check_password_hash(user.password, data['password']):
        return jsonify({"msg":"invalid email or password"}), 401
    
    access_token = create_access_token(identity=user.email)
    return jsonify(access_token = access_token), 200 

@api.route('/private', methods=['GET'])
@jwt_required()
def private_route():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as = current_user), 200