from fastapi import APIRouter, Request, Depends, Response, encoders
import typing as t

from app.db.session import get_db
from app.db.schemas import Analytics,CustomerRegionAnalytics
# ,CustomerPoliciesByRegionAnalytics
from app.db.crud import (
    get_policies_sold_per_month,
    get_total_customer_per_region,
    get_policies_sold_per_region
)
from app.core.auth import get_current_active_user, get_current_active_superuser

analytics_router = r = APIRouter()


@r.get(
    "/analytics/policies_sold_per_month",
    response_model=t.List[Analytics],
    response_model_exclude_none=False,
)
async def policy_sold_per_month(
    response: Response,
    db=Depends(get_db),
    # current_user=Depends(get_current_active_user),
):
    """
    Get Policies Sold Per Month
    """
    count = get_policies_sold_per_month(db)
    # This is necessary for react-admin to work
    # response.headers["Content-Range"] = f"0-9/{len(policies)}"
    return count

@r.get(
    "/analytics/total_customers_per_region",
    response_model=t.List[CustomerRegionAnalytics],
    response_model_exclude_none=False,
)
async def total_customers_per_region(
    response: Response,
    db=Depends(get_db),
    # current_user=Depends(get_current_active_user),
):
    """
    Get Customer Per Region
    """
    count = get_total_customer_per_region(db)
    # This is necessary for react-admin to work
    # response.headers["Content-Range"] = f"0-9/{len(policies)}"
    return count

@r.get(
    "/analytics/get_policies_sold_per_region",
    # response_model=t.List[CustomerPoliciesByRegionAnalytics],
    response_model=dict,
    response_model_exclude_none=False,
)
async def total_policies_sold_per_region_per_month(
    response: Response,
    region:str,
    db=Depends(get_db),
    # current_user=Depends(get_current_active_user),
):
    """
    Get Policies Sold Per Region Per Month
    """
    count = get_policies_sold_per_region(db,region)
    # This is necessary for react-admin to work
    # response.headers["Content-Range"] = f"0-9/{len(policies)}"
    return count
