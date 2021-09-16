#!/usr/bin/env python3

from app.db.session import get_db
from app.db.crud import create_user,create_customers_table,create_policy_table
from app.db.schemas import UserCreate
from app.db.session import SessionLocal


def init() -> None:
    db = SessionLocal()

    create_user(
        db,
        UserCreate(
            email="gokulsadanandam@gmail.com",
            password="gokulsadanandam",
            is_active=True,
            is_superuser=True,
        ),
    )
    print("Creating Policy Table")
    create_policy_table(db)
    print("Creating Customers Table")
    create_customers_table(db)

if __name__ == "__main__":
    print("Creating superuser gokulsadanandam@gmail.com")
    init()
    print("Superuser created")
