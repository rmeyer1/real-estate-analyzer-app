from dataclasses import dataclass
from typing import Optional

@dataclass
class CashFlow:
    period: str  # e.g., 'Year 1', 'Month 1', etc.
    income: float
    expenses: float
    noi: float
    debt_service: float
    cash_flow: float
    cash_on_cash: Optional[float] = None
    irr: Optional[float] = None
