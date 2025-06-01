from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from datetime import datetime
from calculations.cashflow import CashFlowCalculator
from models.realestatemodel import RealEstateModel, PropertyParameters, FinancingParameters, UnitType
import math

app = FastAPI()

# Allow CORS for local frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import your calculation engine and models
# from calculations.cashflow import CashFlowCalculator
# from models.property import PropertyParameters
# from models.scenario import Scenario
# ... (adjust imports as needed)

# Pydantic models for request validation
class UnitTypeRequest(BaseModel):
    unit_type: str
    description: str
    unit_count: int
    sqft_per_unit: int
    market_rent: float

class PropertyRequest(BaseModel):
    property_name: str
    units: int
    total_sqft: int
    purchase_price: float
    transaction_date: str  # ISO format
    hold_period: int

class FinancingRequest(BaseModel):
    loan_amount: float
    interest_rate: float
    loan_term: int
    amortization_period: int
    interest_only_period: int
    loan_origination_fee_rate: float = 0.01

class ScenarioAnalysisRequest(BaseModel):
    property: PropertyRequest
    financing: FinancingRequest
    unit_types: List[UnitTypeRequest]

@app.get("/")
def read_root():
    return {"message": "Real Estate Analyzer API is running."}

def sanitize_for_json(obj):
    if isinstance(obj, dict):
        return {k: sanitize_for_json(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [sanitize_for_json(v) for v in obj]
    elif isinstance(obj, float):
        if math.isnan(obj) or math.isinf(obj):
            return None
        return obj
    else:
        return obj

@app.post("/analyze")
def analyze_scenario(request: ScenarioAnalysisRequest):
    property_params = PropertyParameters(**request.property.dict())
    financing_params = FinancingParameters(**request.financing.dict())
    unit_types = [UnitType(**ut.dict()) for ut in request.unit_types]
    model = RealEstateModel(property_params, financing_params, unit_types)
    calculator = CashFlowCalculator(model)
    irr_results = calculator.calculate_irr()
    annual_cash_flows = [calculator.calculate_annual_cash_flow(year) for year in range(property_params.hold_period)]
    exit_analysis = calculator.calculate_exit_value(property_params.hold_period)
    response = {
        "status": "success",
        "irr_results": irr_results,
        "annual_cash_flows": annual_cash_flows,
        "exit_analysis": exit_analysis,
        "equity_required": model.calculate_equity_required(),
    }
    return sanitize_for_json(response)

if __name__ == "__main__":
    print("Backend structure is ready. Data models and calculation stubs are in place.")
