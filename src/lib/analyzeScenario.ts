import axios from 'axios';

// TypeScript interfaces matching the backend's expected payload
export interface UnitTypeRequest {
  unit_type: string;
  description: string;
  unit_count: number;
  sqft_per_unit: number;
  market_rent: number;
}

export interface PropertyRequest {
  property_name: string;
  units: number;
  total_sqft: number;
  purchase_price: number;
  transaction_date: string; // ISO format
  hold_period: number;
}

export interface FinancingRequest {
  loan_amount: number;
  interest_rate: number;
  loan_term: number;
  amortization_period: number;
  interest_only_period: number;
  loan_origination_fee_rate?: number;
}

export interface ScenarioAnalysisRequest {
  property: PropertyRequest;
  financing: FinancingRequest;
  unit_types: UnitTypeRequest[];
}

// Add this type for annual cash flows
export interface AnnualCashFlow {
  debt_service?: number;
  [key: string]: any;
}

// Update the response interface
export interface AnalyzeScenarioResponse {
  status: string;
  irr_results: any;
  annual_cash_flows: AnnualCashFlow[];
  exit_analysis: any;
  equity_required: number;
}

export async function analyzeScenario(
  scenario: ScenarioAnalysisRequest
): Promise<AnalyzeScenarioResponse> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await axios.post<AnalyzeScenarioResponse>(
      `${apiUrl}/analyze`,
      scenario,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error: any) {
    // Optionally, you can improve error handling here
    throw error;
  }
} 