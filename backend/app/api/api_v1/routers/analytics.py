from fastapi import APIRouter, Request, Depends, Response, encoders
import typing as t

from app.db.session import get_db
from app.db.schemas import Analytics
from app.db.crud import (
    get_policies_sold_per_month
)
from app.core.auth import get_current_active_user, get_current_active_superuser

analytics_router = r = APIRouter()


@r.get(
    "/analytics/policies_sold_per_month",
    response_model=Analytics,
    response_model_exclude_none=False,
)
async def policy_sold_per_month(
    response: Response,
    db=Depends(get_db),
    # current_user=Depends(get_current_active_superuser),
):
    """
    Get Policies Sold Per Month
    """
    count = get_policies_sold_per_month(db)
    # This is necessary for react-admin to work
    # response.headers["Content-Range"] = f"0-9/{len(policies)}"
    return count
