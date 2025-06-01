from dataclasses import dataclass, field
from typing import Optional
from .cashflow import CashFlow
from .rentroll import RentRoll
from .debtschedule import DebtSchedule

@dataclass
class Scenario:
    scenario_id: int
    purchase_price: float
    loan_amount: float
    ltv: float
    equity: float
    interest_rate: float
    amortization: int
    hold_period: int
    cashflow: Optional[CashFlow] = None
    rentroll: Optional[RentRoll] = None
    debtschedule: Optional[DebtSchedule] = None
