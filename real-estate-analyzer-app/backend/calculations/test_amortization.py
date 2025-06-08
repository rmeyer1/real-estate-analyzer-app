import pytest
from .amortization import generate_amortization_schedule

def test_amortization_schedule_interest_only():
    loan_amount = 1200000
    interest_rate = 0.06  # 6% annual
    amortization_period = 5  # 5 years
    interest_only_period = 2  # 2 years IO
    schedule = generate_amortization_schedule(loan_amount, interest_rate, amortization_period, interest_only_period)
    # First 2 years: only interest paid
    assert schedule[0]['principal'] == 0
    assert schedule[1]['principal'] == 0
    # Check that interest is correct for IO years
    expected_io_interest = loan_amount * (interest_rate / 12) * 12
    assert abs(schedule[0]['interest'] - expected_io_interest) < 1
    # Last year: balance should be 0 (fully paid off)
    assert schedule[-1]['balance'] == 0

def test_amortization_schedule_fully_amortizing():
    loan_amount = 100000
    interest_rate = 0.05  # 5% annual
    amortization_period = 3  # 3 years
    interest_only_period = 0
    schedule = generate_amortization_schedule(loan_amount, interest_rate, amortization_period, interest_only_period)
    # Should have 3 years
    assert len(schedule) == 3
    # Last year: balance should be 0
    assert schedule[-1]['balance'] == 0
    # Principal paid should increase each year
    assert schedule[1]['principal'] > schedule[0]['principal'] 