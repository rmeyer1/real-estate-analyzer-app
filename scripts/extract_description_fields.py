import pandas as pd
import json
import sys
from pathlib import Path

# Default path and sheet name
EXCEL_PATH = Path(__file__).parent.parent.parent / 'docs' / 'Building_I_Want v5.xlsx'
SHEET_NAME = 'Description'


def extract_description_fields(excel_path=EXCEL_PATH, sheet_name=SHEET_NAME):
    # Read the sheet into a DataFrame
    df = pd.read_excel(excel_path, sheet_name=sheet_name)
    # Prepare output: list of fields with sample values
    fields = []
    for col in df.columns:
        sample_value = df[col].dropna().iloc[0] if not df[col].dropna().empty else None
        fields.append({
            'field_name': col,
            'sample_value': sample_value
        })
    return fields


def main():
    fields = extract_description_fields()
    print(json.dumps(fields, indent=2, default=str))

if __name__ == '__main__':
    main() 