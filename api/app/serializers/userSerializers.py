def userEntity(user) -> dict :
    return {
        'id' : str(user['_id']),
        'username' : user['username'],
        'email' : user['email'],
        'role' : user['role'],
        'pp' : user['pp'],
        'verified' : user['verified'],
        'password' : user['password'],
        'created_at' : user['created_at'],
        'updated_at' : user['updated_at']
    }

def userResponseEntity(user) -> dict : 
    return {
        'id' : str(user['_id']),
        'username' : user['username'],
        'email' : user['email'],
        'role' : user['role'],
        'pp' : user['pp'],
        'created_at' : user['created_at'],
        'updated_at' : user['updated_at']
    }

def embeddedUserResponse(user) -> dict :
    return {
        'id' : str(user['_id']),
        'username' : user['username'],
        'pp' : user['pp']
    }

def userListEntity(users) -> dict :
    return [userEntity(user) for user in users]