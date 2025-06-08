import pytest
from .metrics import (
    calculate_irr,
    calculate_cash_on_cash,
    calculate_cap_rate,
    calculate_noi,
    calculate_equity_multiple,
)

def test_calculate_irr():
    # IRR for -1000, 400, 400, 400, 400 should be about 13.45%
    cash_flows = [-1000, 400, 400, 400, 400]
    irr = calculate_irr(cash_flows)
    assert abs(irr - 0.1345) < 0.01

def test_calculate_cash_on_cash():
    assert calculate_cash_on_cash(12000, 100000) == 0.12
    assert calculate_cash_on_cash(0, 100000) == 0.0
    assert calculate_cash_on_cash(10000, 0) == 0.0

def test_calculate_cap_rate():
    assert calculate_cap_rate(50000, 1000000) == 0.05
    assert calculate_cap_rate(0, 1000000) == 0.0
    assert calculate_cap_rate(50000, 0) == 0.0

def test_calculate_noi():
    assert calculate_noi(100000, 40000) == 60000.0
    assert calculate_noi(50000, 50000) == 0.0

def test_calculate_equity_multiple():
    assert calculate_equity_multiple(200000, 100000) == 2.0
    assert calculate_equity_multiple(0, 100000) == 0.0
    assert calculate_equity_multiple(100000, 0) == 0.0 