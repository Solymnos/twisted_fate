export const username_validation = (username) =>
{
    const regex = /^[A-Za-z0-9_]+$/;

    if (username.length < 3 || username.length > 20)
    {
        return false;
    }
    if (!regex.test(username))
    {
        return false;
    }
    return true;
}

export const email_validation = (email) =>
{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email))
    {
        return false;
    }
    return true;
}

export const password_validation = (password) =>
{
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&#^~_\-+=|<>€£¥₩฿])[A-Za-z\d@$%*?&#^~_\-+=|<>€£¥₩฿]{8,}$/;
    if (!regex.test(password))
    {
        return false;
    }
    return true;
}