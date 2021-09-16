from fastapi import HTTPException, status
from sqlalchemy.orm import Session
import typing as t
from pprint import pprint
from . import models, schemas
from app.core.security import get_password_hash
import time,datetime

def get_user(db: Session, user_id: int):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


def get_user_by_email(db: Session, email: str) -> schemas.UserBase:
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(
    db: Session, skip: int = 0, limit: int = 100
) -> t.List[schemas.UserOut]:
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = models.User(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        is_active=user.is_active,
        is_superuser=user.is_superuser,
        hashed_password=hashed_password,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def delete_user(db: Session, user_id: int):
    user = get_user(db, user_id)
    if not user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="User not found")
    db.delete(user)
    db.commit()
    return user


def edit_user(
    db: Session, user_id: int, user: schemas.UserEdit
) -> schemas.User:
    db_user = get_user(db, user_id)
    if not db_user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="User not found")
    update_data = user.dict(exclude_unset=True)

    if "password" in update_data:
        update_data["hashed_password"] = get_password_hash(user.password)
        del update_data["password"]

    for key, value in update_data.items():
        setattr(db_user, key, value)

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_policies(
    db: Session, skip: int = 0, limit: int = 100
) -> t.List[schemas.PolicyOut]:
    return db.query(models.Policy).offset(skip).limit(limit).all()

def get_policy(db: Session, policy_id: int)-> schemas.PolicyBase:
    policy = db.query(models.Policy).filter(models.Policy.policy_id == policy_id).first()
    if not policy:
        raise HTTPException(status_code=404, detail="Policy not found")
    return policy

def edit_policy(db:Session,policy_id:int,policy:schemas.PolicyEdit)->schemas.PolicyBase:
    db_policy = get_policy(db, policy_id)
    if not policy:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Policy not found")
    update_data = policy.dict(exclude_unset=True)
    print (update_data)
    if  update_data["premium"]  < 1000000:
        setattr(db_policy, "premium", update_data["premium"])
    else:
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Premium should be less than 1000")
    
    for key, value in update_data.items():
        setattr(db_policy, key, update_data[key])

    db.add(db_policy)
    db.commit()
    db.refresh(db_policy)
    return db_policy

def get_customers(
    db: Session, skip: int = 0, limit: int = 100
) -> t.List[schemas.CustomerOut]:
    return db.query(models.Customers).offset(skip).limit(limit).all()

def get_customer_policies(db: Session, customer_id: int)-> t.List[schemas.CustomerBase]:
    policy = db.query(models.Policy).filter(models.Policy.customer_id == customer_id).all()
    if not policy:
        raise HTTPException(status_code=404, detail="Policy not found")
    return policy

def get_policies_sold_per_month(db: Session):
    query = "SELECT count(*), date_trunc('month', to_timestamp(date_of_purchase)) FROM policies GROUP BY date_trunc('month', to_timestamp(date_of_purchase));"
    result = db.execute(query)

    d, a = {}, []
    for rowproxy in result:
        for column, value in rowproxy.items():
            if (isinstance(value, datetime.date)):
                d = {**d, **{'month': int(time.mktime(value.timetuple()))}}
            else:
                d = {**d, **{column: value}}
        a.append(d)
    return a

def get_total_customer_per_region(db: Session):
    query = "select customer_region,count(*) from customers group by customers.customer_region;"
    result = db.execute(query)

    d, a = {}, []
    for rowproxy in result:
        for column, value in rowproxy.items():
            d = {**d, **{column: value}}
        a.append(d)
    return a

def get_policies_sold_per_region(db: Session,region:str):
    query = '''select customers.customer_id,customers.customer_region,policies.policy_id, date_trunc('month', to_timestamp(policies.date_of_purchase)) 
                    from customers 
                    inner join policies
                    on customers.customer_id = policies.customer_id
                    where customers.customer_region = '{region}' '''.format(region=region)
    result = db.execute(query)

    d, a = {}, []
    for rowproxy in result:
        for column, value in rowproxy.items():
            if (isinstance(value, datetime.date)):
                d = {**d, **{'month': int(time.mktime(value.timetuple()))}}
            else:
                d = {**d, **{column: value}}
        a.append(d)
    counterMap = {}
    for values in a:
        if 'month' in values and values['month'] in counterMap:
            counterMap[values['month']] = counterMap[values['month']] + 1
        else:
            if 'month' in values:
                counterMap[values['month']] = 1

    return counterMap