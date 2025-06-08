from dataclasses import dataclass, field
from typing import List, Optional

@dataclass
class RentRollUnit:
    unit_id: str
    unit_type: str
    status: str  # occupied, vacant, etc.
    market_rent: float
    actual_rent: float
    loss_to_lease: float
    sqft: Optional[float] = None

@dataclass
class RentRoll:
    units: List[RentRollUnit] = field(default_factory=list)
