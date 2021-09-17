import os

PROJECT_NAME = "insurance-agent-dashboard"

# print (os.getenv("DATABASE_URL"))

SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL") or 'postgresql+psycopg2://admin:admin@localhost/bcg'
# SQLALCHEMY_DATABASE_URI = 'postgresql://admin:admin@postgres:5432/bcg'


API_V1_STR = "/api/v1"
