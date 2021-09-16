from fastapi import APIRouter, Request, Depends, Response, encoders
import typing as t

from app.db.session import get_db
from app.db.schemas import Customer,Policy
from app.db.crud import (
    get_customers,
    get_customer_policies
)
from app.core.auth import get_current_active_user, get_current_active_superuser

customers_router = r = APIRouter()


@r.get(
    "/customers",
    response_model=t.List[Customer],
    response_model_exclude_none=True,
)
async def customers_list(
    response: Response,
    skip: int = 0, 
    limit: int = 10,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    """
    Get all Customers List
    """
    customers = get_customers(db,skip,limit)
    # This is necessary for react-admin to work
    response.headers["Content-Range"] = f"0-9/{len(customers)}"
    return customers

@r.get(
    "/customer/policy/{customer_id}",
    response_model=t.List[Policy],
    response_model_exclude_none=True,
)
async def find_customerpolicy_by_id(
    response: Response,
    customer_id:int,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    """
    Find Customer's Policy
    """
    policies = get_customer_policies(db,customer_id)
    # This is necessary for react-admin to work
    # response.headers["Content-Range"] = f"0-9/{len(policies)}"
    return policies