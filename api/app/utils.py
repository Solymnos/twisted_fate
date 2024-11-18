from passlib.context import CryptContext
from itsdangerous import URLSafeTimedSerializer
from app.config import settings
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

def hash_password(password : str) :
    return pwd_context.hash(password)

def verify_password(password : str, hashed_password : str) :
    return pwd_context.verify(password, hashed_password)

def generate_token_email_validation(email : str) :
    validation_key = settings.VALIDATION_KEY
    serializer = URLSafeTimedSerializer(validation_key)
    return serializer.dumps(email, salt='email-validation')

def send_validation_email(email, token) :
    sender_email = 'solymnos@gmail.com'
    receiver_email = email
    password = settings.MAIL_APP_KEY

    subject = 'Email verification'
    body = f'Please click on the link to verifiy your email : http://45.133.178.248:8001/api/auth/verify/{token}'

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(sender_email, password)
    server.sendmail(sender_email, receiver_email, msg.as_string())
    server.quit()