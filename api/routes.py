from fastapi                            import APIRouter, HTTPException, status, Depends
from fastapi.responses                  import JSONResponse
from fastapi.security                   import OAuth2PasswordBearer
from database                           import get_users
from authentication                     import get_password_hash, create_access_token, verify_password, verify_token
from datetime                           import timedelta
from bson                               import json_util
from pydantic                           import BaseModel
from bson                               import ObjectId
from apscheduler.schedulers.background  import BackgroundScheduler
import asyncio
import json
import os
import random

#from bson               import ObjectId
#import pydantic
#
#pydantic.json.ENCODERS_BY_TYPE[ObjectId]=str

# Declaration of my environements variables:
# TODO : Move it into a .env file

ACCESS_TOKEN_EXPIRE_MINUTES = 20160

oauth_2_scheme = OAuth2PasswordBearer(tokenUrl="token")

router = APIRouter()

class UserRegisterRequest(BaseModel):
    username : str
    email : str
    password : str

@router.post("/user/register")
async def user_register(request : UserRegisterRequest):
    users = get_users()
    existing_user = await users.find_one({"username" : request.username})
    if existing_user :
        raise HTTPException(status_code=400, detail="Nom d'utilisateur déjà utilisé")
    existing_user = await users.find_one({"email" : request.email})
    if existing_user :
        raise HTTPException(status_code=400, detail="Email déjà utilisé")
    
    hashed_password = get_password_hash(request.password)
    
    new_user = {
        "username" : request.username,
        "email" : request.email,
        "hashed_password" : hashed_password,
        "score" : 0,
        "did_it_today" : False,
        "streak" : 0
    }
    saved_user = await users.insert_one(new_user)
    new_user = await users.find_one({"_id" : saved_user.inserted_id}, {"hashed_password": 0})
    new_user = json.loads(json_util.dumps(new_user));
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": request.username}, expires_delta=access_token_expires)
    rank = await get_user_rank(saved_user.inserted_id)
    return {"user": new_user, "access_token": access_token, "rank" : rank}
    
class UserLoginRequest(BaseModel):
    username : str
    email : str
    password : str

@router.post("/user/login")
async def user_login(request : UserLoginRequest):
    users = get_users()
    user = await users.find_one({"username" : request.username})
    if not user :
        user = await users.find_one({ "email" : request.email })
    if not user : 
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Nom d'utilisateur, email, ou mot de passe incorrect")
    hashed_password = user.get("hashed_password")
    if not verify_password(request.password, hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Nom d'utilisateur, email, ou mot de passe incorrect")
    user_to_return = await users.find_one({"_id" : user.get("_id")}, {"hashed_password" : 0})
    user_to_return = json.loads(json_util.dumps(user_to_return))
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": request.username}, expires_delta=access_token_expires)
    _id = user.get("_id")
    rank = await get_user_rank(_id)
    return { "user": user_to_return, "access_token" : access_token, "rank" : rank }
    

