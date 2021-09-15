from pydantic import BaseModel
import typing as t


class UserBase(BaseModel):
    email: str
    is_active: bool = True
    is_superuser: bool = False
    first_name: str = None
    last_name: str = None


class UserOut(UserBase):
    pass


class UserCreate(UserBase):
    password: str

    class Config:
        orm_mode = True


class UserEdit(UserBase):
    password: t.Optional[str] = None

    class Config:
        orm_mode = True


class User(UserBase):
    id: int

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: str = None
    permissions: str = "user"

class PolicyBase(BaseModel):
    policy_id: int
    date_of_purchase:int
    customer_id:int
    fuel:str
    vehicle_segment:str
    premium:int
    bodily_injury_liability:bool= False
    personal_injury_protection:bool=False
    property_damage_liability:bool=False
    collision:bool=False
    comprehensive:bool=False

class Policy(PolicyBase):
    policy_id: int

    class Config:
        orm_mode = True

class PolicyOut(PolicyBase):
    pass

class PolicyEdit(BaseModel):
    premium: int

    class Config:
        orm_mode = True

class CustomerBase(BaseModel):
    customer_id:int
    customer_gender:str
    customer_income_group:str
    customer_region:str
    customer_marital_status:str

class Customer(CustomerBase):
    customer_id: int

    class Config:
        orm_mode = True

class CustomerOut(CustomerBase):
    pass

class Analytics(BaseModel):
    count: int
    date_trun: str

