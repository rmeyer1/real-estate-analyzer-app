import pytest
from cashflow import CashFlowCalculator
from types import SimpleNamespace

class MockUnitType:
    def __init__(self, unit_type, description, unit_count, sqft_per_unit, market_rent):
        self.unit_type = unit_type
        self.description = description
        self.unit_count = unit_count
        self.sqft_per_unit = sqft_per_unit
        self.market_rent = market_rent

class MockPropertyParams:
    def __init__(self, purchase_price=100000, hold_period=3):
        self.property_name = "Test Property"
        self.units = 10
        self.total_sqft = 10000
        self.purchase_price = purchase_price
        self.transaction_date = "2020-01-01"
        self.hold_period = hold_period

class MockFinancingParams:
    def __init__(self, loan_amount=0, interest_rate=0.05, loan_term=5, amortization_period=5, interest_only_period=1):
        self.loan_amount = loan_amount
        self.interest_rate = interest_rate
        self.loan_term = loan_term
        self.amortization_period = amortization_period
        self.interest_only_period = interest_only_period
        self.loan_origination_fee_rate = 0.01

class MockRealEstateModel:
    def __init__(self, purchase_price=100000, loan_amount=0, market_rent=10000, hold_period=3):
        self.property = MockPropertyParams(purchase_price=purchase_price, hold_period=hold_period)
        self.financing = MockFinancingParams(loan_amount=loan_amount)
        self.unit_types = [
            MockUnitType("1BR", "One Bedroom", 10, 500, market_rent),
            MockUnitType("2BR", "Two Bedroom", 10, 700, market_rent)
        ]
    def calculate_equity_required(self):
        return self.property.purchase_price - self.financing.loan_amount + (self.financing.loan_amount * self.financing.loan_origination_fee_rate)

def test_calculate_annual_cash_flow():
    model = MockRealEstateModel()
    calc = CashFlowCalculator(model)
    # Lower expenses to ensure positive unleveraged cash flows
    calc.expense_projector.base_year_expenses['variable_expenses'] = 10000
    calc.expense_projector.base_year_expenses['real_estate_taxes'] = 1000
    calc.expense_projector.base_year_expenses['insurance'] = 1000
    result = calc.calculate_annual_cash_flow(0)
    # Check keys
    expected_keys = [
        'gross_income', 'total_expenses', 'noi', 'capex', 'cash_flow_operations',
        'debt_service', 'leveraged_cash_flow', 'market_rent', 'vacancy_loss',
        'concessions', 'bad_debt', 'effective_rental_income',
        'variable_expenses', 'management_fee', 'fixed_expenses'
    ]
    for key in expected_keys:
        assert key in result
    # Check types
    assert isinstance(result['gross_income'], float)
    assert isinstance(result['total_expenses'], float)
    # Check values are not all zero
    assert result['gross_income'] > 0
    assert result['total_expenses'] > 0
    assert result['noi'] != 0

def test_unleveraged_irr():
    # No loan, positive cash flows
    model = MockRealEstateModel(purchase_price=100000, loan_amount=0, market_rent=10000)
    calc = CashFlowCalculator(model)
    calc.expense_projector.base_year_expenses['variable_expenses'] = 10000
    calc.expense_projector.base_year_expenses['real_estate_taxes'] = 1000
    calc.expense_projector.base_year_expenses['insurance'] = 1000
    irr_result = calc.calculate_irr()
    print("Unleveraged cash flows:", irr_result.get('unleveraged_flows'))
    print("Unleveraged IRR:", irr_result.get('unleveraged_irr'))
    assert 'unleveraged_irr' in irr_result
    assert isinstance(irr_result['unleveraged_irr'], float)
    assert irr_result['unleveraged_irr'] == irr_result['unleveraged_irr']  # not nan
    assert irr_result['unleveraged_irr'] > 0

def test_leveraged_irr():
    # Realistic loan, positive cash flows
    model = MockRealEstateModel(purchase_price=100000, loan_amount=60000, market_rent=10000)
    calc = CashFlowCalculator(model)
    calc.expense_projector.base_year_expenses['variable_expenses'] = 10000
    calc.expense_projector.base_year_expenses['real_estate_taxes'] = 1000
    calc.expense_projector.base_year_expenses['insurance'] = 1000
    irr_result = calc.calculate_irr()
    print("Leveraged cash flows:", irr_result.get('leveraged_flows'))
    print("Leveraged IRR:", irr_result.get('leveraged_irr'))
    assert 'leveraged_irr' in irr_result
    assert isinstance(irr_result['leveraged_irr'], float)
    assert irr_result['leveraged_irr'] == irr_result['leveraged_irr']  # not nan
    assert irr_result['leveraged_irr'] > 0 