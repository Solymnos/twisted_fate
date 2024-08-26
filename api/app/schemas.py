from datetime import datetime
from pydantic import BaseModel, EmailStr, constr
from typing import Union

class UserBaseSchema(BaseModel) :
    username : str
    email : str
    pp : Union[str, None] = None
    role : Union[str, None] = None
    created_at : Union[datetime, None] = None
    updated_at : Union[datetime, None] = None

    class Config :
        orm_mode = True

class CreateUserSchema(UserBaseSchema) :
    password : constr(min_length=8)
    passwordConfirm : str
    verified : bool = False

class LoginUserSchema(BaseModel) :
    email : Union[EmailStr, None] = None
    username : Union[str, None] = None
    password : constr(min_length=8)

class UserResponseSchema(UserBaseSchema) :
    id : str
    pass

class UserResponse(BaseModel) :
    status : str
    user : UserResponseSchema