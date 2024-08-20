from passlib.context    import CryptContext
from fastapi.security   import OAuth2PasswordBearer
from datetime           import datetime, timedelta
from jose               import jwt, JWTError
from database           import get_users
# Declaration of my environements variables:
# TODO : Move it into a .env file

SECRET_KEY = "d50544a79e53979a882969858a05c20343e4f17531d7b4e48bbc42e14ca28bf6"
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth_2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_password_hash(password) :
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta or None = None): 
    to_encode = data.copy()
    if (expires_delta):
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_password(password, hashed_password) :
    return pwd_context.verify(password, hashed_password)

def verify_token(token):
    try :
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username : str = payload.get("sub")
        if username is None:
            return False
    except JWTError:
        return False
    return
    