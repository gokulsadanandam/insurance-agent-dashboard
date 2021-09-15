from sqlalchemy import Boolean, Column, Integer, String

from .session import Base


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    first_name = Column(String)
    last_name = Column(String)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)

class Policy(Base):
    __tablename__ = "policies"

    policy_id= Column(Integer, primary_key=True)
    date_of_purchase= Column(Integer,)
    customer_id= Column(Integer)
    fuel= Column(String)
    vehicle_segment= Column(String)
    premium= Column(Integer)
    bodily_injury_liability= Column(Boolean,default=False)
    personal_injury_protection= Column(Boolean,default=False)
    property_damage_liability= Column(Boolean,default=False)
    collision= Column(Boolean,default=False)
    comprehensive= Column(Boolean,default=False)

class Customers(Base):
    __tablename__ = "customers"

    customer_id= Column(Integer, primary_key=True)
    customer_gender= Column(String)
    customer_income_group= Column(String)
    customer_region= Column(String)
    customer_marital_status= Column(String)