from dataclasses import dataclass, field
from typing import List
from .scenario import Scenario

@dataclass
class Property:
    property_name: str
    units: int
    total_sqft: int
    transaction_date: str  # Could be datetime, but keep as str for now
    scenarios: List[Scenario] = field(default_factory=list)
