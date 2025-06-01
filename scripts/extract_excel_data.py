import pandas as pd
import numpy as np

EXCEL_PATH = '../../docs/Building_I_Want v5.xlsx'

# Load the Excel file
xls = pd.ExcelFile(EXCEL_PATH)

print('Sheets found:', xls.sheet_names)

# Helper to print a section header
def print_section(title):
    print('\n' + '='*40)
    print(f'== {title}')
    print('='*40)

def print_first_non_nan_row(df, col=0):
    # Find the first row where the specified column is not NaN
    for idx, row in df.iterrows():
        if not pd.isna(row[col]):
            print(f'First non-NaN row in column {col} (row {idx}):')
            print(row)
            break

for sheet in xls.sheet_names:
    print_section(sheet)
    df = pd.read_excel(xls, sheet_name=sheet, header=None)
    print(f'Shape: {df.shape}')
    print('\nFirst 25 rows:')
    print(df.head(25))
    print('\nColumn headers (by index):')
    print(list(df.columns))
    print('\n')
    print_first_non_nan_row(df, col=0)
    print('-'*40)

print('\nExtraction complete. Review the above outputs to map data for the calculation engine.') 