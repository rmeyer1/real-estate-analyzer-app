from dataclasses import dataclass
from typing import List
from datetime import datetime

@dataclass
class PropertyParameters:
    property_name: str
    units: int
    total_sqft: int
    purchase_price: float
    transaction_date: str  # Keep as str for now
    hold_period: int

@dataclass
class FinancingParameters:
    loan_amount: float
    interest_rate: float
    loan_term: int
    amortization_period: int
    interest_only_period: int
    loan_origination_fee_rate: float = 0.01

@dataclass
class UnitType:
    unit_type: str
    description: str
    unit_count: int
    sqft_per_unit: int
    market_rent: float

class RealEstateModel:
    def __init__(self, property_params: PropertyParameters, financing_params: FinancingParameters, unit_types: List[UnitType]):
        self.property = property_params
        self.financing = financing_params
        self.unit_types = unit_types
        self.projections = {}

    def calculate_equity_required(self) -> float:
        loan_origination_fee = self.financing.loan_amount * self.financing.loan_origination_fee_rate
        return self.property.purchase_price - self.financing.loan_amount + loan_origination_fee 