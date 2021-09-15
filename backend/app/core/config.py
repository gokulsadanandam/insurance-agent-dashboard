import os

PROJECT_NAME = "insurance-agent-dashboard"

SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL") or 'postgresql+psycopg2://admin:admin@localhost/bcg'

API_V1_STR = "/api/v1"
