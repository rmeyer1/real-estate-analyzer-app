import pandas as pd
import numpy as np
import numpy_financial as npf
from typing import Dict, Any

# --- Real Implementations ---

class IncomeProjector:
    """Handles rental income calculations and projections"""
    def __init__(self, model):
        self.model = model
        self.assumptions = {
            'rent_growth_rates': [0.06, 0.04, 0.04] + [0.03] * 8,  # Years 1-11
            'vacancy_rate': 0.05,
            'concessions_rate': 0.0005,
            'bad_debt_rate': 0.002
        }

    def calculate_market_rents(self, year: int) -> float:
        base_rent = sum(unit.market_rent * unit.unit_count for unit in self.model.unit_types)
        current_rent = base_rent
        for i in range(year):
            growth_rate = self.assumptions['rent_growth_rates'][i] if i < len(self.assumptions['rent_growth_rates']) else 0.03
            current_rent *= (1 + growth_rate)
        return current_rent * 12  # Annual rent

    def calculate_effective_rental_income(self, year: int) -> Dict[str, float]:
        market_rent = self.calculate_market_rents(year)
        vacancy_loss = market_rent * self.assumptions['vacancy_rate']
        concessions = market_rent * self.assumptions['concessions_rate']
        bad_debt = market_rent * self.assumptions['bad_debt_rate']
        effective_rental_income = market_rent - vacancy_loss - concessions - bad_debt
        return {
            'market_rent': market_rent,
            'vacancy_loss': vacancy_loss,
            'concessions': concessions,
            'bad_debt': bad_debt,
            'effective_rental_income': effective_rental_income
        }

    def calculate_other_income(self, year: int) -> float:
        base_other_income = 565600  # From model
        inflation_rate = 0.03
        return base_other_income * ((1 + inflation_rate) ** year)

class ExpenseProjector:
    """Handles operating expense calculations"""
    def __init__(self, model):
        self.model = model
        self.base_year_expenses = {
            'variable_expenses': 3836800,
            'management_fee_rate': 0.05,
            'real_estate_taxes': 319177.41,
            'insurance': 144000
        }
        self.inflation_rate = 0.03

    def calculate_variable_expenses(self, year: int, gross_income: float) -> float:
        base_variable = self.base_year_expenses['variable_expenses']
        return base_variable * ((1 + self.inflation_rate) ** year)

    def calculate_management_fee(self, gross_income: float) -> float:
        return gross_income * self.base_year_expenses['management_fee_rate']

    def calculate_fixed_expenses(self, year: int) -> Dict[str, float]:
        real_estate_taxes = self.base_year_expenses['real_estate_taxes'] * ((1 + self.inflation_rate) ** year)
        insurance = self.base_year_expenses['insurance'] * ((1 + self.inflation_rate) ** year)
        return {
            'real_estate_taxes': real_estate_taxes,
            'insurance': insurance,
            'total_fixed': real_estate_taxes + insurance
        }

    def calculate_total_expenses(self, year: int, gross_income: float) -> Dict[str, float]:
        variable = self.calculate_variable_expenses(year, gross_income)
        management = self.calculate_management_fee(gross_income)
        fixed = self.calculate_fixed_expenses(year)
        total_expenses = variable + management + fixed['total_fixed']
        return {
            'variable_expenses': variable,
            'management_fee': management,
            'fixed_expenses': fixed['total_fixed'],
            'total_expenses': total_expenses
        }

class DebtServiceCalculator:
    """Handles loan amortization and debt service calculations"""
    def __init__(self, financing):
        self.financing = financing
        self.monthly_rate = financing.interest_rate / 12
        self.amortization_schedule = self._generate_amortization_schedule()

    def _generate_amortization_schedule(self):
        import pandas as pd
        schedule_data = []
        remaining_balance = self.financing.loan_amount
        monthly_io_payment = self.financing.loan_amount * self.monthly_rate
        for month in range(1, self.financing.interest_only_period * 12 + 1):
            schedule_data.append({
                'month': month,
                'year': (month - 1) // 12 + 1,
                'beginning_balance': remaining_balance,
                'payment': monthly_io_payment,
                'principal': 0,
                'interest': monthly_io_payment,
                'ending_balance': remaining_balance
            })
        amortizing_months = (self.financing.loan_term - self.financing.interest_only_period) * 12
        if amortizing_months > 0:
            monthly_payment = npf.pmt(self.monthly_rate, self.financing.amortization_period * 12, -remaining_balance)
            for month in range(self.financing.interest_only_period * 12 + 1, self.financing.loan_term * 12 + 1):
                interest_payment = remaining_balance * self.monthly_rate
                principal_payment = monthly_payment - interest_payment
                remaining_balance -= principal_payment
                schedule_data.append({
                    'month': month,
                    'year': (month - 1) // 12 + 1,
                    'beginning_balance': remaining_balance + principal_payment,
                    'payment': monthly_payment,
                    'principal': principal_payment,
                    'interest': interest_payment,
                    'ending_balance': remaining_balance
                })
        return pd.DataFrame(schedule_data)

    def get_annual_debt_service(self, year: int) -> float:
        year_data = self.amortization_schedule[self.amortization_schedule['year'] == year]
        return year_data['payment'].sum()

    def get_outstanding_balance(self, year: int) -> float:
        year_data = self.amortization_schedule[self.amortization_schedule['year'] == year]
        if len(year_data) > 0:
            return year_data['ending_balance'].iloc[-1]
        return 0

class CashFlowCalculator:
    """Main cash flow and returns calculation engine"""
    def __init__(self, model):
        self.model = model
        self.income_projector = IncomeProjector(model)
        self.expense_projector = ExpenseProjector(model)
        self.debt_calculator = DebtServiceCalculator(model.financing)

    def calculate_annual_cash_flow(self, year: int) -> Dict[str, Any]:
        """Calculate complete annual cash flow for given year"""
        # Income calculations
        income_data = self.income_projector.calculate_effective_rental_income(year)
        other_income = self.income_projector.calculate_other_income(year)
        gross_income = income_data.get('effective_rental_income', 0.0) + other_income

        # Expense calculations
        expense_data = self.expense_projector.calculate_total_expenses(year, gross_income)

        # NOI calculation
        noi = gross_income - expense_data.get('total_expenses', 0.0)

        # Capital expenditures (reserves)
        capex = 40000 * ((1.03) ** year)  # Example assumption

        # Cash flow from operations
        cash_flow_operations = noi - capex

        # Debt service
        debt_service = self.debt_calculator.get_annual_debt_service(year + 1)  # Year 1 = index 0

        # Leveraged cash flow
        leveraged_cash_flow = cash_flow_operations - debt_service

        return {
            'gross_income': gross_income,
            'total_expenses': expense_data.get('total_expenses', 0.0),
            'noi': noi,
            'capex': capex,
            'cash_flow_operations': cash_flow_operations,
            'debt_service': debt_service,
            'leveraged_cash_flow': leveraged_cash_flow,
            **income_data,
            **expense_data
        }

    def calculate_exit_value(self, exit_year: int) -> Dict[str, float]:
        """Calculate property exit value and proceeds"""
        exit_cap_rate = 0.08  # Example assumption
        exit_year_noi = self.calculate_annual_cash_flow(exit_year - 1)['noi']
        gross_sale_price = exit_year_noi / exit_cap_rate if exit_cap_rate else 0.0
        cost_of_sale = gross_sale_price * 0.015  # 1.5% transaction costs
        net_sale_price = gross_sale_price - cost_of_sale
        outstanding_balance = self.debt_calculator.get_outstanding_balance(exit_year)
        net_proceeds = net_sale_price - outstanding_balance
        return {
            'exit_noi': exit_year_noi,
            'gross_sale_price': gross_sale_price,
            'cost_of_sale': cost_of_sale,
            'net_sale_price': net_sale_price,
            'outstanding_balance': outstanding_balance,
            'net_proceeds': net_proceeds
        }

    def calculate_irr(self) -> Dict[str, Any]:
        """Calculate leveraged and unleveraged IRR"""
        # Generate cash flows for hold period
        unleveraged_flows = [-getattr(self.model.property, 'purchase_price', 0.0)]
        leveraged_flows = [-getattr(self.model, 'calculate_equity_required', lambda: 0.0)()]
        for year in range(getattr(self.model.property, 'hold_period', 0)):
            annual_cf = self.calculate_annual_cash_flow(year)
            unleveraged_flows.append(annual_cf['cash_flow_operations'])
            leveraged_flows.append(annual_cf['leveraged_cash_flow'])
        # Add exit proceeds
        exit_data = self.calculate_exit_value(getattr(self.model.property, 'hold_period', 0))
        if unleveraged_flows:
            unleveraged_flows[-1] += exit_data['net_sale_price']
        if leveraged_flows:
            leveraged_flows[-1] += exit_data['net_proceeds']
        unleveraged_irr = npf.irr(unleveraged_flows)
        leveraged_irr = npf.irr(leveraged_flows)
        return {
            'unleveraged_irr': unleveraged_irr,
            'leveraged_irr': leveraged_irr,
            'unleveraged_flows': unleveraged_flows,
            'leveraged_flows': leveraged_flows
        } 