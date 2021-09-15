from fastapi import APIRouter, Request, Depends, Response, encoders
import typing as t

from app.db.session import get_db
from app.db.schemas import Policy,PolicyEdit
from app.db.crud import (
    get_policies,
    get_policy,
    edit_policy
)
from app.core.auth import get_current_active_user, get_current_active_superuser

policies_router = r = APIRouter()


@r.get(
    "/policies",
    response_model=t.List[Policy],
    response_model_exclude_none=True,
)
async def policy_list(
    response: Response,
    skip: int = 0, 
    limit: int = 10,
    db=Depends(get_db),
    # current_user=Depends(get_current_active_superuser),
):
    """
    Get all Policies
    """
    policies = get_policies(db,skip,limit)
    # This is necessary for react-admin to work
    response.headers["Content-Range"] = f"0-9/{len(policies)}"
    return policies

@r.get(
    "/policy/{policy_id}",
    response_model=Policy,
    response_model_exclude_none=True,
)
async def find_policy_by_id(
    response: Response,
    policy_id:int,
    db=Depends(get_db),
    # current_user=Depends(get_current_active_superuser),
):
    """
    Find Policy By Id
    """
    policies = get_policy(db,policy_id)
    # This is necessary for react-admin to work
    # response.headers["Content-Range"] = f"0-9/{len(policies)}"
    return policies

@r.put(
    "/policy/{policy_id}",
    response_model=Policy,
    response_model_exclude_none=True,
)
async def edit_policy_by_id(
    response: Response,
    policy_id:int,
    policy:PolicyEdit,
    db=Depends(get_db),
    # current_user=Depends(get_current_active_superuser),
):
    """
    Edit Policy By Id
    """
    policy = edit_policy(db,policy_id,policy)
    # This is necessary for react-admin to work
    # response.headers["Content-Range"] = f"0-9/{len(policies)}"
    return policy