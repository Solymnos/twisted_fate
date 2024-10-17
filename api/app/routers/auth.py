from datetime import datetime, timedelta
from bson.objectid import ObjectId
from fastapi import APIRouter, Response, status, Depends, HTTPException
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadSignature

from app import schemas, utils, oauth2
from app.database import User
from app.serializers.userSerializers import userEntity, userResponseEntity
from app.oauth2 import AuthJWT
from ..config import settings

router = APIRouter()
ACCESS_TOKEN_EXPIRES_IN = settings.ACCESS_TOKEN_EXPIRES_IN
REFRESH_TOKEN_EXPIRES_IN = settings.REFRESH_TOKEN_EXPIRES_IN

@router.post('/register', status_code=status.HTTP_201_CREATED, response_model=schemas.UserResponse)
async def create_user(payload : schemas.CreateUserSchema) :
    user = User.find_one({'email' : payload.email.lower()})
    if user : 
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='Email alread used')
    user = User.find_one({'username' : payload.username.lower()})
    if user :
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='Username already used')
    if payload.password != payload.passwordConfirm : 
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Passwords are not matching')
    payload.password = utils.hash_password(payload.password)
    del payload.passwordConfirm
    payload.role = 'user'
    payload.verified = False
    payload.email = payload.email.lower()
    payload.username = payload.username.lower()
    payload.created_at = datetime.utcnow()
    payload.updated_at = payload.created_at
    payload.pp = 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'
    payload.bsuccess = 0
    payload.bfail = 0

    token = utils.generate_token_email_validation(payload.email)
    utils.send_validation_email(payload.email, token)

    result = User.insert_one(payload.dict())
    new_user = userResponseEntity(User.find_one({'_id' : result.inserted_id }))
    return { 'status' : 'success' , 'user' : new_user }

@router.post('/login')
def login(payload : schemas.LoginUserSchema, response : Response, Authorize : AuthJWT = Depends()) :
    if payload.email == None :
        db_user = User.find_one({'username' : payload.username.lower()})
    else :
        db_user = User.find_one({'email' : payload.email.lower()})
    if not db_user :
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Incorrect Email, Username or Password')
    user = userEntity(db_user)

    if not utils.verify_password(payload.password, user['password']) :
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Incorrect Email, Username or Password')
    access_token = Authorize.create_access_token(subject=str(user['id']), expires_time=timedelta(minutes=ACCESS_TOKEN_EXPIRES_IN))
    refresh_token = Authorize.create_refresh_token(subject=str(user['id']), expires_time=timedelta(minutes=REFRESH_TOKEN_EXPIRES_IN))
    response.set_cookie('access_token', access_token, ACCESS_TOKEN_EXPIRES_IN * 60, ACCESS_TOKEN_EXPIRES_IN * 60, '/', None, False, True, 'lax')
    response.set_cookie('refresh_token', refresh_token, ACCESS_TOKEN_EXPIRES_IN * 60, REFRESH_TOKEN_EXPIRES_IN * 60, '/', None, False, False, 'lax')
    response.set_cookie('logged_in', 'True', ACCESS_TOKEN_EXPIRES_IN * 60, ACCESS_TOKEN_EXPIRES_IN * 60, '/', None, False, False, 'lax')
    return { 'status' : 'success' , 'access_token' : access_token }

@router.get('/refresh')
def refresh_token(response : Response, Authorize : AuthJWT = Depends()): 
    try :
        Authorize.jwt_refresh_token_required()
        user_id = Authorize.get_jwt_subject()
        if not user_id : 
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Could not refresh access token')
        user = userEntity(User.find_one({'_id' : ObjectId(str(user_id))}))
        if not user : 
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Could not find the user')
        access_token = Authorize.create_access_token(subject=str(user['id']), expires_time=timedelta(minutes=ACCESS_TOKEN_EXPIRES_IN))
    except Exception as e :
        error = e.__class__.__name__
        if error == 'MissingTokenError' : 
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Please provide refresh token')
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)
    response.set_cookie('access_token', access_token, ACCESS_TOKEN_EXPIRES_IN * 60, ACCESS_TOKEN_EXPIRES_IN * 60, '/', None, False, True, 'lax')
    response.set_cookie('logged_in', 'True', ACCESS_TOKEN_EXPIRES_IN * 60, ACCESS_TOKEN_EXPIRES_IN * 60, '/', None, False, False, 'lax')
    return { 'access_token' : access_token }

@router.get('/logout', status_code=status.HTTP_200_OK)
def logout(response : Response, Authorize : AuthJWT = Depends()) :
    Authorize.unset_jwt_cookies()
    response.set_cookie('logged_in' , '' , -1)
    return { 'status' : 'success' }

@router.get('/verify/{token}')
async def verify_email(token : str) :
    validation_key = settings.VALIDATION_KEY
    serializer = URLSafeTimedSerializer(validation_key)
    try :
        email = serializer.loads(token, salt='email-validation', max_age=3600)
    except SignatureExpired : 
        raise HTTPException(status_code=400, detail='Token expired')
    except BadSignature :
        raise HTTPException(status_code=400, detail='Invalid token')
    user = User.find_one({'email' : email})
    if not user :
        raise HTTPException(status_code=404, details='User Not Found')
    User.update_one({ 'email' : email } , { '$set' : { 'verified' : True }})
    return { 'status' : 'success' , 'message' : 'Email verified successfully' }