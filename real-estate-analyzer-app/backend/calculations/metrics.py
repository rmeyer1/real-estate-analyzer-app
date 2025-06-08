from typing import List
import numpy_financial as npf

def calculate_irr(cash_flows: List[float]) -> float:
    """Calculate the Internal Rate of Return (IRR) for a series of cash flows."""
    if not cash_flows or len(cash_flows) < 2:
        return 0.0
    irr = npf.irr(cash_flows)
    return round(irr, 6) if irr is not None else 0.0

def calculate_cash_on_cash(annual_cash_flow: float, equity_invested: float) -> float:
    """Calculate the cash-on-cash return."""
    if equity_invested == 0:
        return 0.0
    return round(annual_cash_flow / equity_invested, 6)

def calculate_cap_rate(noi: float, purchase_price: float) -> float:
    """Calculate the capitalization rate (cap rate)."""
    if purchase_price == 0:
        return 0.0
    return round(noi / purchase_price, 6)

def calculate_noi(income: float, expenses: float) -> float:
    """Calculate Net Operating Income (NOI)."""
    return round(income - expenses, 2)

def calculate_equity_multiple(total_cash_returned: float, equity_invested: float) -> float:
    """Calculate the equity multiple."""
    if equity_invested == 0:
        return 0.0
    return round(total_cash_returned / equity_invested, 6)
