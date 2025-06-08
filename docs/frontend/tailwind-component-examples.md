# Real Estate App Tailwind CSS Component Examples

This file provides implementation examples of key components for the real estate financial modeling application using Tailwind CSS, Next.js, and TypeScript.

## Table of Contents
1. [Navigation Components](#navigation-components)
2. [Dashboard Cards](#dashboard-cards)
3. [Financial Metrics Components](#financial-metrics-components)
4. [Data Tables](#data-tables)
5. [Charts and Visualizations](#charts-and-visualizations)
6. [Form Components](#form-components)

## Navigation Components

### Main Sidebar Navigation

```tsx
// components/layout/Sidebar.tsx
import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  HomeIcon,
  DocumentChartBarIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

type NavItem = {
  name: string;
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
};

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Scenarios', href: '/scenarios', icon: DocumentChartBarIcon },
  { name: 'Cash Flow', href: '/cash-flow', icon: ChartBarIcon },
  { name: 'Rent Roll', href: '/rent-roll', icon: BuildingOfficeIcon },
  { name: 'Pro Forma', href: '/pro-forma', icon: CurrencyDollarIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export default function Sidebar() {
  const router = useRouter();
  
  return (
    <div className="fixed inset-y-0 left-0 z-10 w-64 bg-slate-800 border-r border-slate-700 overflow-y-auto">
      {/* App Logo */}
      <div className="flex items-center justify-center h-16 px-4 border-b border-slate-700">
        <span className="text-xl font-bold tracking-tight text-slate-50">PropertyFinance</span>
      </div>
      
      {/* Navigation */}
      <nav className="px-2 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = router.pathname === item.href || router.pathname.startsWith(`${item.href}/`);
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                'flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              )}
            >
              <item.icon
                className={clsx(
                  'mr-3 h-5 w-5',
                  isActive ? 'text-white' : 'text-slate-400'
                )}
                aria-hidden="true"
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
```

### Top Navigation Bar

```tsx
// components/layout/Header.tsx
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { clsx } from 'clsx';

export default function Header() {
  return (
    <header className="sticky top-0 z-10 h-16 bg-slate-800 border-b border-slate-700">
      <div className="flex items-center justify-between h-full px-6">
        {/* Page Title */}
        <h1 className="text-xl font-semibold text-slate-50">Dashboard</h1>
        
        {/* Right Side Controls */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button 
            type="button"
            className="relative p-1 text-slate-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-blue-500 ring-2 ring-slate-800"></span>
          </button>
          
          {/* Profile Dropdown */}
          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-white">
                <span className="sr-only">Open user menu</span>
                <UserCircleIcon className="h-8 w-8 text-slate-300" />
                <span className="hidden md:flex md:items-center">
                  <span className="ml-2 text-sm font-medium text-slate-300">
                    John Smith
                  </span>
                  <ChevronDownIcon className="ml-1 h-4 w-4 text-slate-400" aria-hidden="true" />
                </span>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-slate-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={clsx(
                        active ? 'bg-slate-700' : '',
                        'block px-4 py-2 text-sm text-slate-300'
                      )}
                    >
                      Your Profile
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={clsx(
                        active ? 'bg-slate-700' : '',
                        'block px-4 py-2 text-sm text-slate-300'
                      )}
                    >
                      Settings
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={clsx(
                        active ? 'bg-slate-700' : '',
                        'block px-4 py-2 text-sm text-slate-300'
                      )}
                    >
                      Sign out
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </header>
  );
}
```

## Dashboard Cards

### Metric Card Component

```tsx
// components/ui/MetricCard.tsx
import { ReactNode } from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/20/solid';
import { clsx } from 'clsx';

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon?: ReactNode;
  currency?: boolean;
  percentage?: boolean;
  className?: string;
}

export default function MetricCard({
  title,
  value,
  trend,
  icon,
  currency = false,
  percentage = false,
  className,
}: MetricCardProps) {
  const formattedValue = () => {
    if (currency) {
      return typeof value === 'number'
        ? `$${value.toLocaleString()}`
        : `$${value}`;
    }
    if (percentage) {
      return typeof value === 'number'
        ? `${value.toLocaleString()}%`
        : `${value}%`;
    }
    return value;
  };

  return (
    <div className={clsx(
      'bg-slate-800 rounded-lg border border-slate-700 p-5',
      className
    )}>
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-slate-50">{formattedValue()}</p>
        </div>
        {icon && (
          <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 bg-opacity-10 text-blue-500">
            {icon}
          </div>
        )}
      </div>
      
      {typeof trend !== 'undefined' && (
        <div className="mt-4 flex items-center">
          {trend > 0 ? (
            <ArrowUpIcon className="h-4 w-4 text-emerald-500" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 text-red-500" />
          )}
          <span className={clsx(
            'ml-1 text-sm font-medium',
            trend > 0 ? 'text-emerald-500' : 'text-red-500'
          )}>
            {Math.abs(trend)}%
          </span>
          <span className="ml-2 text-sm font-medium text-slate-400">
            from previous period
          </span>
        </div>
      )}
    </div>
  );
}
```

### Scenario Card Component

```tsx
// components/ui/ScenarioCard.tsx
import { useState } from 'react';
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';
import { clsx } from 'clsx';

interface ScenarioCardProps {
  title: string;
  description?: string;
  metrics: {
    label: string;
    value: string | number;
    isPercentage?: boolean;
  }[];
  onEdit?: () => void;
  onDelete?: () => void;
  onSelect?: () => void;
  isActive?: boolean;
}

export default function ScenarioCard({
  title,
  description,
  metrics,
  onEdit,
  onDelete,
  onSelect,
  isActive = false,
}: ScenarioCardProps) {
  return (
    <div 
      className={clsx(
        'bg-slate-800 rounded-lg border p-4 transition-colors',
        isActive ? 'border-blue-500' : 'border-slate-700 hover:border-slate-600'
      )}
      onClick={onSelect}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-medium text-slate-50">{title}</h3>
        
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center justify-center h-8 w-8 rounded-full text-slate-400 hover:text-white focus:outline-none">
            <span className="sr-only">Open options</span>
            <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
          </Menu.Button>
          
          <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-slate-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit?.();
                    }}
                    className={clsx(
                      active ? 'bg-slate-700' : '',
                      'flex w-full items-center px-4 py-2 text-sm text-slate-300'
                    )}
                  >
                    <PencilIcon className="mr-3 h-5 w-5 text-slate-400" />
                    Edit
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete?.();
                    }}
                    className={clsx(
                      active ? 'bg-slate-700' : '',
                      'flex w-full items-center px-4 py-2 text-sm text-slate-300'
                    )}
                  >
                    <TrashIcon className="mr-3 h-5 w-5 text-slate-400" />
                    Delete
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      
      {description && (
        <p className="text-sm text-slate-400 mb-4">{description}</p>
      )}
      
      <div className="space-y-3 mt-4">
        {metrics.map((metric, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-400">{metric.label}</span>
            <span className="text-sm font-medium text-slate-50">
              {typeof metric.value === 'number' && metric.isPercentage
                ? `${metric.value}%`
                : metric.value}
            </span>
          </div>
        ))}
      </div>
      
      {isActive && (
        <div className="mt-4 pt-4 border-t border-slate-700">
          <button 
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
          >
            View Details
          </button>
        </div>
      )}
    </div>
  );
}
```

## Financial Metrics Components

### Key Performance Indicators Row

```tsx
// components/ui/KPIRow.tsx
import { BuildingOfficeIcon, CurrencyDollarIcon, ArrowTrendingUpIcon, CalculatorIcon } from '@heroicons/react/24/outline';
import MetricCard from './MetricCard';

interface KPIRowProps {
  capRate: number;
  irr: number;
  cashOnCash: number;
  equityMultiple: number;
}

export default function KPIRow({
  capRate,
  irr,
  cashOnCash,
  equityMultiple,
}: KPIRowProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Cap Rate"
        value={capRate}
        percentage
        icon={<BuildingOfficeIcon className="h-6 w-6" />}
        trend={0.5}
      />
      <MetricCard
        title="IRR"
        value={irr}
        percentage
        icon={<ArrowTrendingUpIcon className="h-6 w-6" />}
        trend={1.2}
      />
      <MetricCard
        title="Cash on Cash"
        value={cashOnCash}
        percentage
        icon={<CurrencyDollarIcon className="h-6 w-6" />}
        trend={-0.3}
      />
      <MetricCard
        title="Equity Multiple"
        value={equityMultiple}
        icon={<CalculatorIcon className="h-6 w-6" />}
        trend={0.1}
      />
    </div>
  );
}
```

### Assumptions Panel Component

```tsx
// components/ui/AssumptionsPanel.tsx
import { useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

interface Assumption {
  label: string;
  value: string | number;
  editable?: boolean;
  inputType?: 'text' | 'number' | 'percentage';
}

interface AssumptionCategory {
  title: string;
  assumptions: Assumption[];
}

interface AssumptionsPanelProps {
  categories: AssumptionCategory[];
  onAssumptionChange?: (category: string, label: string, value: string | number) => void;
}

export default function AssumptionsPanel({
  categories,
  onAssumptionChange,
}: AssumptionsPanelProps) {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(
    categories.reduce((acc, category) => {
      acc[category.title] = true;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const toggleCategory = (category: string) => {
    setExpandedCategories({
      ...expandedCategories,
      [category]: !expandedCategories[category],
    });
  };

  const handleInputChange = (category: string, label: string, value: string) => {
    if (onAssumptionChange) {
      onAssumptionChange(category, label, value);
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
      <div className="px-4 py-3 bg-slate-900 border-b border-slate-700">
        <h3 className="text-lg font-medium text-slate-50">Assumptions</h3>
      </div>
      
      <div className="divide-y divide-slate-700">
        {categories.map((category) => (
          <div key={category.title} className="px-4 py-3">
            <button
              type="button"
              className="flex w-full items-center justify-between text-left"
              onClick={() => toggleCategory(category.title)}
            >
              <span className="text-sm font-medium text-slate-200">{category.title}</span>
              {expandedCategories[category.title] ? (
                <ChevronUpIcon className="h-5 w-5 text-slate-400" />
              ) : (
                <ChevronDownIcon className="h-5 w-5 text-slate-400" />
              )}
            </button>
            
            {expandedCategories[category.title] && (
              <div className="mt-2 space-y-2">
                {category.assumptions.map((assumption) => (
                  <div key={assumption.label} className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">{assumption.label}</span>
                    
                    {assumption.editable ? (
                      <input
                        type={assumption.inputType === 'number' || assumption.inputType === 'percentage' ? 'number' : 'text'}
                        value={assumption.value}
                        onChange={(e) => handleInputChange(category.title, assumption.label, e.target.value)}
                        className="w-24 px-2 py-1 text-sm text-slate-50 bg-slate-700 border border-slate-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        step={assumption.inputType === 'percentage' ? '0.1' : undefined}
                      />
                    ) : (
                      <span className="text-sm font-medium text-slate-200">
                        {assumption.inputType === 'percentage' ? `${assumption.value}%` : assumption.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Data Tables

### Cash Flow Table Component

```tsx
// components/tables/CashFlowTable.tsx
import { useMemo } from 'react';
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

interface CashFlowData {
  year: number;
  income: number;
  expenses: number;
  noi: number;
  debtService: number;
  cashFlow: number;
  cashOnCash: number;
}

interface CashFlowTableProps {
  data: CashFlowData[];
  expandable?: boolean;
  periodType: 'annual' | 'monthly';
  onPeriodChange?: (period: 'annual' | 'monthly') => void;
}

export default function CashFlowTable({
  data,
  expandable = false,
  periodType,
  onPeriodChange,
}: CashFlowTableProps) {
  // Format currency for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Format percentage for display
  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };
  
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});
  
  const toggleRow = (year: number) => {
    if (expandable) {
      setExpandedRows({
        ...expandedRows,
        [year]: !expandedRows[year],
      });
    }
  };
  
  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-700 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-50">Cash Flow Projection</h3>
        
        {onPeriodChange && (
          <div className="flex rounded-md shadow-sm">
            <button
              type="button"
              className={`relative inline-flex items-center px-3 py-2 text-sm font-medium rounded-l-md ${
                periodType === 'annual'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
              onClick={() => onPeriodChange('annual')}
            >
              Annual
            </button>
            <button
              type="button"
              className={`relative inline-flex items-center px-3 py-2 text-sm font-medium rounded-r-md ${
                periodType === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
              onClick={() => onPeriodChange('monthly')}
            >
              Monthly
            </button>
          </div>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-700">
          <thead className="bg-slate-900">
            <tr>
              {expandable && <th scope="col" className="w-10 px-3 py-3"></th>}
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                {periodType === 'annual' ? 'Year' : 'Month'}
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                Income
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                Expenses
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                NOI
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                Debt Service
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                Cash Flow
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                Cash on Cash
              </th>
            </tr>
          </thead>
          <tbody className="bg-slate-800 divide-y divide-slate-700">
            {data.map((row) => (
              <tr 
                key={row.year}
                className="hover:bg-slate-700 transition-colors"
                onClick={() => toggleRow(row.year)}
              >
                {expandable && (
                  <td className="px-3 py-4 whitespace-nowrap text-slate-400">
                    {expandedRows[row.year] ? (
                      <ChevronDownIcon className="h-5 w-5" />
                    ) : (
                      <ChevronRightIcon className="h-5 w-5" />
                    )}
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-slate-200">
                    {periodType === 'annual' ? `Year ${row.year}` : `Month ${row.year}`}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="text-sm text-slate-200">{formatCurrency(row.income)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="text-sm text-slate-200">{formatCurrency(row.expenses)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="text-sm text-slate-200">{formatCurrency(row.noi)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="text-sm text-slate-200">{formatCurrency(row.debtService)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="text-sm font-medium text-emerald-500">
                    {formatCurrency(row.cashFlow)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="text-sm font-medium text-slate-200">
                    {formatPercentage(row.cashOnCash)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

### Rent Roll Table Component

```tsx
// components/tables/RentRollTable.tsx
import { useMemo, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface Unit {
  id: string;
  unitNumber: string;
  type: string;
  status: 'occupied' | 'vacant' | 'reserved';
  tenant?: string;
  leaseStart?: string;
  leaseEnd?: string;
  marketRent: number;
  actualRent: number;
  lossToLease: number;
}

interface RentRollTableProps {
  units: Unit[];
  onSearch?: (query: string) => void;
  onFilter?: (filters: Record<string, any>) => void;
}

export default function RentRollTable({
  units,
  onSearch,
  onFilter,
}: RentRollTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  
  // Format currency for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Get unique unit types for filter
  const unitTypes = useMemo(() => {
    const types = new Set<string>();
    units.forEach((unit) => types.add(unit.type));
    return Array.from(types);
  }, [units]);
  
  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };
  
  // Handle filter change
  const handleFilterChange = () => {
    if (onFilter) {
      onFilter({
        type: filterType,
        status: filterStatus,
      });
    }
  };
  
  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-700">
        <h3 className="text-lg font-semibold text-slate-50">Rent Roll</h3>
      </div>
      
      {/* Filters */}
      <div className="px-6 py-3 bg-slate-900 border-b border-slate-700 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="search" className="block text-xs font-medium text-slate-400 mb-1">
            Search Units
          </label>
          <input
            type="text"
            id="search"
            className="block w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-slate-50 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Unit number, tenant..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        
        <div>
          <label htmlFor="filterType" className="block text-xs font-medium text-slate-400 mb-1">
            Unit Type
          </label>
          <select
            id="filterType"
            className="block w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-slate-50 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            value={filterType || ''}
            onChange={(e) => {
              setFilterType(e.target.value || null);
              handleFilterChange();
            }}
          >
            <option value="">All Types</option>
            {unitTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="filterStatus" className="block text-xs font-medium text-slate-400 mb-1">
            Status
          </label>
          <select
            id="filterStatus"
            className="block w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-slate-50 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            value={filterStatus || ''}
            onChange={(e) => {
              setFilterStatus(e.target.value || null);
              handleFilterChange();
            }}
          >
            <option value="">All Status</option>
            <option value="occupied">Occupied</option>
            <option value="vacant">Vacant</option>
            <option value="reserved">Reserved</option>
          </select>
        </div>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-700">
          <thead className="bg-slate-900">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Unit
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Tenant
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                Market Rent
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                Actual Rent
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                Loss to Lease
              </th>
            </tr>
          </thead>
          <tbody className="bg-slate-800 divide-y divide-slate-700">
            {units.map((unit) => (
              <tr key={unit.id} className="hover:bg-slate-700 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-slate-200">{unit.unitNumber}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-200">{unit.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                    unit.status === 'occupied'
                      ? 'bg-emerald-100 text-emerald-800'
                      : unit.status === 'vacant'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {unit.status.charAt(0).toUpperCase() + unit.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-200">{unit.tenant || '—'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="text-sm text-slate-200">{formatCurrency(unit.marketRent)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="text-sm text-slate-200">{formatCurrency(unit.actualRent)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className={`text-sm font-medium ${
                    unit.lossToLease > 0 ? 'text-red-500' : 'text-emerald-500'
                  }`}>
                    {formatCurrency(unit.lossToLease)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

## Charts and Visualizations

### Cash Flow Chart Component

```tsx
// Install required packages:
// npm install react-chartjs-2 chart.js

// components/charts/CashFlowChart.tsx
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface CashFlowChartProps {
  years: number[];
  noi: number[];
  debtService: number[];
  cashFlow: number[];
  title?: string;
}

export default function CashFlowChart({
  years,
  noi,
  debtService,
  cashFlow,
  title = 'Cash Flow Projection',
}: CashFlowChartProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#cbd5e1', // text-slate-300
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: !!title,
        text: title,
        color: '#f8fafc', // text-slate-50
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      tooltip: {
        backgroundColor: '#334155', // bg-slate-700
        titleColor: '#f8fafc', // text-slate-50
        bodyColor: '#cbd5e1', // text-slate-300
        borderColor: '#475569', // border-slate-600
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
      },
    },
    scales: {
      x: {
        grid: {
          color: '#1e293b', // border-slate-800
        },
        ticks: {
          color: '#94a3b8', // text-slate-400
        },
      },
      y: {
        grid: {
          color: '#1e293b', // border-slate-800
        },
        ticks: {
          color: '#94a3b8', // text-slate-400
          callback: (value: number) => {
            return new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(value);
          },
        },
      },
    },
  };

  const data = {
    labels: years.map(year => `Year ${year}`),
    datasets: [
      {
        type: 'bar' as const,
        label: 'NOI',
        data: noi,
        backgroundColor: 'rgba(59, 130, 246, 0.7)', // blue-500 with opacity
        borderColor: 'rgb(59, 130, 246)', // blue-500
        borderWidth: 1,
      },
      {
        type: 'bar' as const,
        label: 'Debt Service',
        data: debtService,
        backgroundColor: 'rgba(239, 68, 68, 0.7)', // red-500 with opacity
        borderColor: 'rgb(239, 68, 68)', // red-500
        borderWidth: 1,
      },
      {
        type: 'line' as const,
        label: 'Cash Flow',
        data: cashFlow,
        borderColor: 'rgb(16, 185, 129)', // emerald-500
        backgroundColor: 'rgba(16, 185, 129, 0.1)', // emerald-500 with low opacity
        borderWidth: 2,
        tension: 0.1,
        pointBackgroundColor: 'rgb(16, 185, 129)',
        fill: false,
        yAxisID: 'y',
      },
    ],
  };

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
      <div className="h-80">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}
```

### Comparison Chart Component

```tsx
// components/charts/ComparisonChart.tsx
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface Scenario {
  name: string;
  capRate: number;
  irr: number;
  cashOnCash: number;
  equityMultiple: number;
  returnOnCost: number;
}

interface ComparisonChartProps {
  scenarios: Scenario[];
  title?: string;
}

export default function ComparisonChart({
  scenarios,
  title = 'Scenario Comparison',
}: ComparisonChartProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#cbd5e1', // text-slate-300
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: !!title,
        text: title,
        color: '#f8fafc', // text-slate-50
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      tooltip: {
        backgroundColor: '#334155', // bg-slate-700
        titleColor: '#f8fafc', // text-slate-50
        bodyColor: '#cbd5e1', // text-slate-300
        borderColor: '#475569', // border-slate-600
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.formattedValue}%`;
          }
        }
      },
    },
    scales: {
      r: {
        angleLines: {
          color: '#1e293b', // border-slate-800
        },
        grid: {
          color: '#1e293b', // border-slate-800
        },
        pointLabels: {
          color: '#94a3b8', // text-slate-400
          font: {
            size: 12,
          },
        },
        ticks: {
          color: '#94a3b8', // text-slate-400
          backdropColor: 'transparent',
          callback: (value: number) => {
            return `${value}%`;
          },
        },
      },
    },
  };

  const colors = [
    { border: 'rgb(59, 130, 246)', background: 'rgba(59, 130, 246, 0.2)' }, // blue
    { border: 'rgb(16, 185, 129)', background: 'rgba(16, 185, 129, 0.2)' }, // emerald
    { border: 'rgb(245, 158, 11)', background: 'rgba(245, 158, 11, 0.2)' }, // amber
    { border: 'rgb(99, 102, 241)', background: 'rgba(99, 102, 241, 0.2)' }, // indigo
  ];

  const data = {
    labels: ['Cap Rate', 'IRR', 'Cash on Cash', 'Equity Multiple', 'Return on Cost'],
    datasets: scenarios.map((scenario, index) => ({
      label: scenario.name,
      data: [
        scenario.capRate,
        scenario.irr,
        scenario.cashOnCash,
        scenario.equityMultiple * 10, // Scale up for visualization
        scenario.returnOnCost,
      ],
      borderColor: colors[index % colors.length].border,
      backgroundColor: colors[index % colors.length].background,
      borderWidth: 2,
      pointBackgroundColor: colors[index % colors.length].border,
    })),
  };

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
      <div className="h-80">
        <Radar options={options} data={data} />
      </div>
    </div>
  );
}
```

## Form Components

### Scenario Form Component

```tsx
// components/forms/ScenarioForm.tsx
import { useState } from 'react';

interface ScenarioFormProps {
  initialData?: {
    name: string;
    description: string;
    purchasePrice: number;
    closingCosts: number;
    renovationBudget: number;
    loanAmount: number;
    interestRate: number;
    amortizationYears: number;
    holdPeriod: number;
  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function ScenarioForm({
  initialData,
  onSubmit,
  onCancel,
}: ScenarioFormProps) {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    description: '',
    purchasePrice: 0,
    closingCosts: 0,
    renovationBudget: 0,
    loanAmount: 0,
    interestRate: 4.5,
    amortizationYears: 30,
    holdPeriod: 7,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <div className="px-6 py-4 bg-slate-900 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-slate-50">
            {initialData ? 'Edit Scenario' : 'Create New Scenario'}
          </h3>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-slate-300">Basic Information</h4>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-1">
                Scenario Name*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="block w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-slate-50 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter scenario name"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-400 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="block w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-slate-50 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Optional description"
              />
            </div>
          </div>
          
          {/* Acquisition Details */}
          <div className="space-y-4 pt-4 border-t border-slate-700">
            <h4 className="text-sm font-medium text-slate-300">Acquisition Details</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="purchasePrice" className="block text-sm font-medium text-slate-400 mb-1">
                  Purchase Price*
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-slate-400 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="purchasePrice"
                    name="purchasePrice"
                    required
                    min="0"
                    step="1000"
                    value={formData.purchasePrice}
                    onChange={handleChange}
                    className="block w-full rounded-md border border-slate-600 bg-slate-700 pl-7 pr-3 py-2 text-slate-50 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="closingCosts" className="block text-sm font-medium text-slate-400 mb-1">
                  Closing Costs
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-slate-400 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="closingCosts"
                    name="closingCosts"
                    min="0"
                    step="100"
                    value={formData.closingCosts}
                    onChange={handleChange}
                    className="block w-full rounded-md border border-slate-600 bg-slate-700 pl-7 pr-3 py-2 text-slate-50 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="renovationBudget" className="block text-sm font-medium text-slate-400 mb-1">
                  Renovation Budget
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-slate-400 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="renovationBudget"
                    name="renovationBudget"
                    min="0"
                    step="1000"
                    value={formData.renovationBudget}
                    onChange={handleChange}
                    className="block w-full rounded-md border border-slate-600 bg-slate-700 pl-7 pr-3 py-2 text-slate-50 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Financing Details */}
          <div className="space-y-4 pt-4 border-t border-slate-700">
            <h4 className="text-sm font-medium text-slate-300">Financing Details</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="loanAmount" className="block text-sm font-medium text-slate-400 mb-1">
                  Loan Amount*
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-slate-400 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="loanAmount"
                    name="loanAmount"
                    required
                    min="0"
                    step="1000"
                    value={formData.loanAmount}
                    onChange={handleChange}
                    className="block w-full rounded-md border border-slate-600 bg-slate-700 pl-7 pr-3 py-2 text-slate-50 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="interestRate" className="block text-sm font-medium text-slate-400 mb-1">
                  Interest Rate (%)*
                </label>
                <input
                  type="number"
                  id="interestRate"
                  name="interestRate"
                  required
                  min="0"
                  step="0.125"
                  value={formData.interestRate}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-slate-50 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="4.5"
                />
              </div>
              
              <div>
                <label htmlFor="amortizationYears" className="block text-sm font-medium text-slate-400 mb-1">
                  Amortization (Years)*
                </label>
                <input
                  type="number"
                  id="amortizationYears"
                  name="amortizationYears"
                  required
                  min="1"
                  max="40"
                  step="1"
                  value={formData.amortizationYears}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-slate-50 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="30"
                />
              </div>
              
              <div>
                <label htmlFor="holdPeriod" className="block text-sm font-medium text-slate-400 mb-1">
                  Hold Period (Years)*
                </label>
                <input
                  type="number"
                  id="holdPeriod"
                  name="holdPeriod"
                  required
                  min="1"
                  max="30"
                  step="1"
                  value={formData.holdPeriod}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-slate-50 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="7"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 bg-slate-900 border-t border-slate-700 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-slate-600 text-sm font-medium rounded-md text-slate-300 bg-slate-700 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            {initialData ? 'Update Scenario' : 'Create Scenario'}
          </button>
        </div>
      </div>
    </form>
  );
}
```

These components provide a comprehensive foundation for building your real estate financial modeling application using Next.js, TypeScript, and Tailwind CSS. They cover the key interface elements identified in the PRD while implementing best practices for financial dashboard design.