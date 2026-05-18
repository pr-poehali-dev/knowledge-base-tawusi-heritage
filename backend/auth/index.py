"""
Аутентификация пользователей: регистрация, вход, проверка сессии, выход.
Поддерживает действия: register, login, session, logout.
"""
import json
import os
import secrets
import hashlib
from datetime import datetime, timedelta, timezone
import psycopg2


DB_URL = os.environ["DATABASE_URL"]
SCHEMA = os.environ.get("MAIN_DB_SCHEMA", "public")
SESSION_DAYS = 30


def get_conn():
    return psycopg2.connect(DB_URL, options=f"-c search_path={SCHEMA}")


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


def make_token() -> str:
    return secrets.token_hex(64)


CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Authorization, X-Session-Token",
}


def resp(status: int, body: dict) -> dict:
    return {"statusCode": status, "headers": {**CORS, "Content-Type": "application/json"}, "body": json.dumps(body)}


def handler(event: dict, context) -> dict:
    """Обработчик аутентификации: register / login / session / logout"""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    body = {}
    if event.get("body"):
        body = json.loads(event["body"])

    action = body.get("action") or (event.get("queryStringParameters") or {}).get("action", "")

    if action == "register":
        return _register(body)
    if action == "login":
        return _login(body)
    if action == "session":
        return _session(event)
    if action == "logout":
        return _logout(event)

    return resp(400, {"error": "Unknown action"})


def _register(body: dict) -> dict:
    email = (body.get("email") or "").strip().lower()
    name = (body.get("name") or "").strip()
    password = body.get("password") or ""

    if not email or not name or len(password) < 8:
        return resp(422, {"error": "Invalid input"})

    pw_hash = hash_password(password)
    conn = get_conn()
    cur = conn.cursor()

    cur.execute("SELECT id FROM users WHERE email = %s", (email,))
    if cur.fetchone():
        conn.close()
        return resp(409, {"error": "email_taken"})

    cur.execute(
        "INSERT INTO users (email, name, password_hash) VALUES (%s, %s, %s) RETURNING id",
        (email, name, pw_hash),
    )
    user_id = cur.fetchone()[0]
    token = make_token()
    expires = datetime.now(timezone.utc) + timedelta(days=SESSION_DAYS)
    cur.execute(
        "INSERT INTO sessions (user_id, token, expires_at) VALUES (%s, %s, %s)",
        (str(user_id), token, expires),
    )
    conn.commit()
    conn.close()

    return resp(201, {"token": token, "user": {"id": str(user_id), "email": email, "name": name}})


def _login(body: dict) -> dict:
    email = (body.get("email") or "").strip().lower()
    password = body.get("password") or ""

    if not email or not password:
        return resp(422, {"error": "Invalid input"})

    pw_hash = hash_password(password)
    conn = get_conn()
    cur = conn.cursor()

    cur.execute(
        "SELECT id, name FROM users WHERE email = %s AND password_hash = %s",
        (email, pw_hash),
    )
    row = cur.fetchone()
    if not row:
        conn.close()
        return resp(401, {"error": "invalid_credentials"})

    user_id, name = row
    token = make_token()
    expires = datetime.now(timezone.utc) + timedelta(days=SESSION_DAYS)
    cur.execute(
        "INSERT INTO sessions (user_id, token, expires_at) VALUES (%s, %s, %s)",
        (str(user_id), token, expires),
    )
    conn.commit()
    conn.close()

    return resp(200, {"token": token, "user": {"id": str(user_id), "email": email, "name": name}})


def _session(event: dict) -> dict:
    token = (event.get("headers") or {}).get("x-session-token") or \
            (event.get("queryStringParameters") or {}).get("token", "")
    if not token:
        return resp(401, {"error": "no_token"})

    conn = get_conn()
    cur = conn.cursor()
    cur.execute(
        """SELECT u.id, u.email, u.name FROM sessions s
           JOIN users u ON u.id = s.user_id
           WHERE s.token = %s AND s.expires_at > NOW()""",
        (token,),
    )
    row = cur.fetchone()
    conn.close()

    if not row:
        return resp(401, {"error": "invalid_token"})

    user_id, email, name = row
    return resp(200, {"user": {"id": str(user_id), "email": email, "name": name}})


def _logout(event: dict) -> dict:
    token = (event.get("headers") or {}).get("x-session-token") or \
            (event.get("queryStringParameters") or {}).get("token", "")
    if not token:
        return resp(400, {"error": "no_token"})

    conn = get_conn()
    cur = conn.cursor()
    cur.execute("UPDATE sessions SET expires_at = NOW() WHERE token = %s", (token,))
    conn.commit()
    conn.close()
    return resp(200, {"ok": True})
