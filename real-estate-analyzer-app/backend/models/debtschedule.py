from dataclasses import dataclass, field
from typing import List

@dataclass
class Payment:
    year: int
    interest: float
    principal: float
    balance: float

@dataclass
class DebtSchedule:
    loan_amount: float
    interest_rate: float
    amortization_period: int
    interest_only_period: int
    payment_schedule: List[Payment] = field(default_factory=list)
