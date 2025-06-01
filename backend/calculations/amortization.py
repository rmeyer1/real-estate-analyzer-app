from typing import List, Dict
import numpy_financial as npf

def generate_amortization_schedule(loan_amount: float, interest_rate: float, amortization_period: int, interest_only_period: int = 0) -> List[Dict]:
    """
    Generate an amortization schedule as a list of dicts, each representing a payment period (yearly).
    Each dict includes year, interest, principal, and balance.
    """
    schedule = []
    annual_rate = interest_rate
    monthly_rate = annual_rate / 12
    balance = loan_amount
    total_years = amortization_period
    months_io = interest_only_period * 12
    months_amort = (amortization_period - interest_only_period) * 12
    
    # Interest-only period
    for month in range(1, months_io + 1):
        year = (month - 1) // 12 + 1
        interest_payment = balance * monthly_rate
        principal_payment = 0
        payment = interest_payment
        if len(schedule) < year:
            schedule.append({'year': year, 'interest': 0, 'principal': 0, 'balance': balance})
        schedule[year-1]['interest'] += interest_payment
        schedule[year-1]['principal'] += principal_payment
    
    # Amortizing period
    if months_amort > 0:
        monthly_payment = npf.pmt(monthly_rate, months_amort, -balance)
        for i, month in enumerate(range(months_io + 1, months_io + months_amort + 1)):
            year = (month - 1) // 12 + 1
            interest_payment = balance * monthly_rate
            principal_payment = monthly_payment - interest_payment
            balance -= principal_payment
            if len(schedule) < year:
                schedule.append({'year': year, 'interest': 0, 'principal': 0, 'balance': balance})
            schedule[year-1]['interest'] += interest_payment
            schedule[year-1]['principal'] += principal_payment
            if i == months_amort - 1:
                # Set final balance to 0 (fully paid off)
                schedule[year-1]['balance'] = 0
            else:
                schedule[year-1]['balance'] = balance
    # Round values for clarity
    for entry in schedule:
        entry['interest'] = round(entry['interest'], 2)
        entry['principal'] = round(entry['principal'], 2)
        entry['balance'] = round(entry['balance'], 2)
    return schedule
