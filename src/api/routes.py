"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import get_jwt, create_access_token, get_jwt_identity, jwt_required, JWTManager
from flask_bcrypt import Bcrypt
from api.models import db, User 
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

app = Flask(__name__)
bcrypt = Bcrypt(app)
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def handle_signup():
    data = request.get_json()

    if not data or 'email' not in data or 'password' not in data:
        return jsonify({"message": "Invalid request"}), 400

    encrypted_password = bcrypt.generate_password_hash(data["password"])
    new_user = User(email=data['email'], password=encrypted_password, is_active=True)
    db.session.add(new_user)
    db.session.commit()

    response_body = {
        "message": "User created successfully"
    }
    return jsonify(response_body), 201


@api.route('/login', methods=['POST'])
def handle_login():
    data = request.get_json()

    if not data or 'email' not in data or 'password' not in data:
        return jsonify({"message": "Invalid request"}), 400

    user = User.query.filter_by(email=data['email']).first()

    if user and user.password == data['password']:
        token = create_access_token(
        identity=user.id, additional_claims={"role": "user"}
    )
        response_body = {
            "message": "Login successful",
            "token": token
        }
        return jsonify(response_body), 200
    
    else:
        return jsonify({"message": "Invalid credentials"}), 401

@api.route('/userinfo', methods=['GET'])
@jwt_required()
def user_private():
    user = get_jwt_identity()
    payload = get_jwt()
    return jsonify({"user":user, "role":payload["role"]})

# @api.route('/logout', methods=['POST'])
# @jwt_required()
# def user_logout():
#     jti = get_jwt()["jti"]
#     token_blocked=TokenBlockedList(jti=jti)

#     db.session.add(token_blocked)
#     db.session.commit()

#     return jsonify({"msg": "Logout Succes"})