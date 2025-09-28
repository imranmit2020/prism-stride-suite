import { z } from "zod";

// Common validation patterns
const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
const emailSchema = z.string().trim().email({ message: "Please enter a valid email address" }).max(255, { message: "Email must be less than 255 characters" });
const nameSchema = z.string().trim().min(1, { message: "This field is required" }).max(100, { message: "Name must be less than 100 characters" });
const requiredStringSchema = z.string().trim().min(1, { message: "This field is required" });
const optionalStringSchema = z.string().trim().optional();
const positiveNumberSchema = z.coerce.number().positive({ message: "Must be a positive number" });
const nonNegativeNumberSchema = z.coerce.number().min(0, { message: "Must be 0 or greater" });

// Input sanitization helper
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
};

// Inventory Product Schema
export const inventoryProductSchema = z.object({
  name: nameSchema.transform(sanitizeInput),
  sku: requiredStringSchema.max(50, { message: "SKU must be less than 50 characters" }).transform(sanitizeInput),
  category: requiredStringSchema.transform(sanitizeInput),
  currentStock: nonNegativeNumberSchema,
  minStock: nonNegativeNumberSchema,
  maxStock: positiveNumberSchema,
  reorderPoint: nonNegativeNumberSchema,
  unitCost: nonNegativeNumberSchema,
  sellingPrice: nonNegativeNumberSchema,
  supplier: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
  warehouse: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
  zone: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
  aisle: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
  shelf: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
  bin: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
});

// Customer Schema
export const customerSchema = z.object({
  name: nameSchema.transform(sanitizeInput),
  email: emailSchema.transform(sanitizeInput),
  phone: z.string().trim().regex(phoneRegex, { message: "Please enter a valid phone number" }).optional().or(z.literal('')),
  address: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
  city: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
  state: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
  zipCode: z.string().trim().regex(/^\d{5}(-\d{4})?$/, { message: "Please enter a valid ZIP code" }).optional().or(z.literal('')),
  dateOfBirth: z.string().trim().optional().or(z.literal('')),
  preferences: z.array(z.string()).default([]),
  loyaltyTier: z.string().default('Bronze'),
  totalSpent: nonNegativeNumberSchema.default(0),
  visitCount: nonNegativeNumberSchema.default(0),
  notes: z.string().trim().max(1000, { message: "Notes must be less than 1000 characters" }).optional().or(z.literal('')).transform(val => val ? sanitizeInput(val) : ''),
});

// Employee Schema
export const employeeSchema = z.object({
  personalInfo: z.object({
    firstName: nameSchema.transform(sanitizeInput),
    lastName: nameSchema.transform(sanitizeInput),
    email: emailSchema.transform(sanitizeInput),
    phone: z.string().trim().regex(phoneRegex, { message: "Please enter a valid phone number" }).optional().or(z.literal('')),
    address: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
    city: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
    state: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
    zipCode: z.string().trim().regex(/^\d{5}(-\d{4})?$/, { message: "Please enter a valid ZIP code" }).optional().or(z.literal('')),
    dateOfBirth: z.string().trim().optional(),
    emergencyContact: z.object({
      name: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
      relationship: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
      phone: z.string().trim().regex(phoneRegex, { message: "Please enter a valid phone number" }).optional().or(z.literal('')),
    }),
  }),
  employment: z.object({
    employeeId: requiredStringSchema.max(20, { message: "Employee ID must be less than 20 characters" }).transform(sanitizeInput),
    department: requiredStringSchema.transform(sanitizeInput),
    position: requiredStringSchema.transform(sanitizeInput),
    manager: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
    startDate: z.string().min(1, { message: "Start date is required" }),
    employmentType: z.enum(['full-time', 'part-time', 'contract', 'intern']),
    workLocation: z.enum(['office', 'remote', 'hybrid']),
    scheduleType: z.enum(['standard', 'flexible', 'shift']),
  }),
  compensation: z.object({
    baseSalary: positiveNumberSchema,
    payFrequency: z.enum(['weekly', 'bi-weekly', 'monthly']),
    payType: z.enum(['salary', 'hourly']),
    currency: z.string().default('USD'),
    benefits: z.array(z.string()).default([]),
    bonusEligible: z.boolean().default(false),
  }),
  documents: z.object({
    hasI9: z.boolean().default(false),
    hasW4: z.boolean().default(false),
    hasDirectDeposit: z.boolean().default(false),
    backgroundCheckComplete: z.boolean().default(false),
  }),
});

// Expense Schema
export const expenseSchema = z.object({
  receipt: z.object({
    receiptNumber: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
    merchant: requiredStringSchema.max(200, { message: "Merchant name must be less than 200 characters" }).transform(sanitizeInput),
    address: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
    date: z.string().min(1, { message: "Date is required" }),
    time: optionalStringSchema,
    total: positiveNumberSchema,
    tax: nonNegativeNumberSchema.default(0),
    currency: z.string().default('USD'),
  }),
  categorization: z.object({
    primaryCategory: requiredStringSchema.transform(sanitizeInput),
    subCategory: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
    confidence: z.number().min(0).max(100).default(0),
    suggestedGLCode: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
    businessPurpose: requiredStringSchema.max(500, { message: "Business purpose must be less than 500 characters" }).transform(sanitizeInput),
    isBusinessExpense: z.boolean().default(true),
  }),
  employee: z.object({
    name: requiredStringSchema.transform(sanitizeInput),
    department: requiredStringSchema.transform(sanitizeInput),
    project: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
    approver: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
  }),
});

// Personal Inventory Item Schema
export const personalInventoryItemSchema = z.object({
  name: nameSchema.transform(sanitizeInput),
  description: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
  category_id: z.string().uuid({ message: "Please select a valid category" }).optional(),
  brand: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
  model: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
  serial_number: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
  purchase_date: z.string().optional(),
  purchase_price: nonNegativeNumberSchema.optional(),
  current_value: nonNegativeNumberSchema.optional(),
  condition: z.enum(['Excellent', 'Good', 'Fair', 'Poor']).default('Good'),
  location: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
  room: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
  warranty_expiry: z.string().optional(),
  is_insured: z.boolean().default(false),
  replacement_cost: nonNegativeNumberSchema.optional(),
  notes: z.string().trim().max(1000, { message: "Notes must be less than 1000 characters" }).optional().transform(val => val ? sanitizeInput(val) : val),
  tags: z.array(z.string()).default([]),
});

// Personal Finance Schemas
export const personalExpenseSchema = z.object({
  description: requiredStringSchema.max(200, { message: "Description must be less than 200 characters" }).transform(sanitizeInput),
  amount: positiveNumberSchema,
  date: z.string().min(1, { message: "Date is required" }),
  category_id: z.string().uuid({ message: "Please select a valid category" }).optional(),
  merchant: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
  payment_method: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
  location: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
  is_recurring: z.boolean().default(false),
  is_tax_deductible: z.boolean().default(false),
  recurrence_pattern: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
  notes: z.string().trim().max(500, { message: "Notes must be less than 500 characters" }).optional().transform(val => val ? sanitizeInput(val) : val),
  tags: z.array(z.string()).default([]),
});

export const personalIncomeSchema = z.object({
  source: requiredStringSchema.max(200, { message: "Source must be less than 200 characters" }).transform(sanitizeInput),
  description: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
  amount: positiveNumberSchema,
  target_amount: nonNegativeNumberSchema.optional(),
  date: z.string().min(1, { message: "Date is required" }),
  category_id: z.string().uuid({ message: "Please select a valid category" }).optional(),
  income_type: requiredStringSchema.transform(sanitizeInput),
  payment_method: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
  employer_payer: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
  is_recurring: z.boolean().default(false),
  recurrence_pattern: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
  tax_withheld: nonNegativeNumberSchema.default(0),
  net_amount: nonNegativeNumberSchema.optional(),
  notes: z.string().trim().max(500, { message: "Notes must be less than 500 characters" }).optional().transform(val => val ? sanitizeInput(val) : val),
});

export const personalBudgetSchema = z.object({
  name: requiredStringSchema.max(100, { message: "Budget name must be less than 100 characters" }).transform(sanitizeInput),
  budgeted_amount: positiveNumberSchema,
  spent_amount: nonNegativeNumberSchema.default(0),
  start_date: z.string().min(1, { message: "Start date is required" }),
  end_date: z.string().min(1, { message: "End date is required" }),
  category_id: z.string().uuid({ message: "Please select a valid category" }).optional(),
  period: z.enum(['weekly', 'monthly', 'quarterly', 'yearly']).default('monthly'),
  alert_threshold: z.number().min(0).max(100).default(80),
  is_active: z.boolean().default(true),
  notes: z.string().trim().max(500, { message: "Notes must be less than 500 characters" }).optional().transform(val => val ? sanitizeInput(val) : val),
});

export const personalGoalSchema = z.object({
  name: requiredStringSchema.max(100, { message: "Goal name must be less than 100 characters" }).transform(sanitizeInput),
  description: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
  goal_type: requiredStringSchema.transform(sanitizeInput),
  target_amount: positiveNumberSchema,
  current_amount: nonNegativeNumberSchema.default(0),
  target_date: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  is_active: z.boolean().default(true),
  notes: z.string().trim().max(500, { message: "Notes must be less than 500 characters" }).optional().transform(val => val ? sanitizeInput(val) : val),
});

// Investment Schema
export const investmentSchema = z.object({
  name: requiredStringSchema.max(100, { message: "Investment name must be less than 100 characters" }).transform(sanitizeInput),
  type: requiredStringSchema.transform(sanitizeInput),
  symbol: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
  shares: positiveNumberSchema,
  purchase_price: positiveNumberSchema,
  current_price: positiveNumberSchema,
  purchase_date: z.string().min(1, { message: "Purchase date is required" }),
  broker: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
  goal_id: z.string().uuid().optional(),
  notes: z.string().trim().max(500, { message: "Notes must be less than 500 characters" }).optional().transform(val => val ? sanitizeInput(val) : val),
});

// Savings Account Schema
export const savingsAccountSchema = z.object({
  account_name: requiredStringSchema.max(100, { message: "Account name must be less than 100 characters" }).transform(sanitizeInput),
  account_type: requiredStringSchema.transform(sanitizeInput),
  bank_name: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
  account_number_last4: z.string().trim().regex(/^\d{4}$/, { message: "Please enter the last 4 digits" }).optional().or(z.literal('')),
  current_balance: nonNegativeNumberSchema.default(0),
  interest_rate: z.number().min(0).max(100).default(0),
  minimum_balance: nonNegativeNumberSchema.default(0),
  monthly_fee: nonNegativeNumberSchema.default(0),
  goal_id: z.string().uuid().optional(),
  is_primary: z.boolean().default(false),
  is_active: z.boolean().default(true),
  notes: z.string().trim().max(500, { message: "Notes must be less than 500 characters" }).optional().transform(val => val ? sanitizeInput(val) : val),
});

// User Management Schemas
export const userSchema = z.object({
  full_name: nameSchema.transform(sanitizeInput),
  email: emailSchema.transform(sanitizeInput),
  phone: z.string().trim().regex(phoneRegex, { message: "Please enter a valid phone number" }).optional().or(z.literal('')),
  role: z.enum(['admin', 'manager', 'user', 'viewer']).default('user'),
  company_name: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
  department: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
});

// Multi-country expense validation schema with enhanced features
export const enhancedExpenseSchema = z.object({
  receipt: z.object({
    receiptNumber: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
    merchant: requiredStringSchema.max(200, { message: "Merchant name must be less than 200 characters" }).transform(sanitizeInput),
    address: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
    date: z.string().min(1, { message: "Date is required" }),
    time: optionalStringSchema,
    total: positiveNumberSchema,
    tax: nonNegativeNumberSchema.default(0),
    currency: z.enum(['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'INR', 'MXN', 'BRL', 'CNY', 'KRW', 'SGD', 'HKD', 'CHF', 'SEK', 'NOK', 'DKK', 'PLN', 'CZK', 'HUF', 'RON', 'BGN', 'HRK', 'RSD', 'TRY', 'ILS', 'AED', 'SAR', 'QAR', 'KWD', 'BHD', 'OMR', 'JOD', 'LBP', 'EGP', 'MAD', 'TND', 'DZD', 'ZAR', 'NGN', 'KES', 'GHS', 'XOF', 'XAF', 'ETB', 'UGX', 'TZS', 'RWF', 'MWK', 'ZMW', 'BWP', 'SZL', 'LSL', 'NAD']).default('USD'),
  }),
  categorization: z.object({
    primaryCategory: requiredStringSchema.transform(sanitizeInput),
    subCategory: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
    confidence: z.number().min(0).max(100).default(0),
    suggestedGLCode: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
    businessPurpose: requiredStringSchema.max(500, { message: "Business purpose must be less than 500 characters" }).transform(sanitizeInput),
    isBusinessExpense: z.boolean().default(true),
    taxDeductible: z.boolean().default(false),
    projectCode: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
  }),
  employee: z.object({
    name: requiredStringSchema.transform(sanitizeInput),
    employeeId: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
    department: requiredStringSchema.transform(sanitizeInput),
    project: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
    approver: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
    costCenter: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
  }),
  compliance: z.object({
    region: z.enum(['US', 'EU', 'UK', 'CA', 'AU', 'APAC', 'LATAM', 'MEA']).default('US'),
    taxRate: nonNegativeNumberSchema.default(0),
    requiresReceipt: z.boolean().default(true),
    needsApproval: z.boolean().default(false),
    policyViolations: z.array(z.string()).default([]),
    complianceNotes: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
  })
});

// Export all schemas as a single object for easy access
export const validationSchemas = {
  inventoryProduct: inventoryProductSchema,
  customer: customerSchema,
  employee: employeeSchema,
  expense: expenseSchema,
  personalInventoryItem: personalInventoryItemSchema,
  personalExpense: personalExpenseSchema,
  personalIncome: personalIncomeSchema,
  personalBudget: personalBudgetSchema,
  personalGoal: personalGoalSchema,
  investment: investmentSchema,
  savingsAccount: savingsAccountSchema,
  user: userSchema,
};
// Multi-country invoice validation schema
export const enhancedInvoiceSchema = z.object({
  invoiceNumber: requiredStringSchema.max(50, { message: "Invoice number must be less than 50 characters" }).transform(sanitizeInput),
  vendor: z.object({
    name: requiredStringSchema.max(200, { message: "Vendor name must be less than 200 characters" }).transform(sanitizeInput),
    email: emailSchema.transform(sanitizeInput),
    phone: z.string().trim().regex(phoneRegex, { message: "Please enter a valid phone number" }).optional().or(z.literal('')),
    address: requiredStringSchema.transform(sanitizeInput),
    taxId: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
    country: z.string().min(2, { message: "Country code required" }).max(3),
    registrationNumber: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
  }),
  customer: z.object({
    name: requiredStringSchema.max(200, { message: "Customer name must be less than 200 characters" }).transform(sanitizeInput),
    email: emailSchema.transform(sanitizeInput),
    address: requiredStringSchema.transform(sanitizeInput),
    taxId: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
    country: z.string().min(2, { message: "Country code required" }).max(3),
  }),
  details: z.object({
    issueDate: z.string().min(1, { message: "Issue date is required" }),
    dueDate: z.string().min(1, { message: "Due date is required" }),
    currency: z.enum(['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'INR', 'MXN', 'BRL', 'CNY', 'KRW', 'SGD', 'HKD', 'CHF', 'SEK', 'NOK', 'DKK', 'PLN', 'CZK', 'HUF', 'RON', 'BGN', 'HRK', 'RSD', 'TRY', 'ILS', 'AED', 'SAR', 'QAR', 'KWD', 'BHD', 'OMR', 'JOD', 'LBP', 'EGP', 'MAD', 'TND', 'DZD', 'ZAR', 'NGN', 'KES', 'GHS', 'XOF', 'XAF', 'ETB', 'UGX', 'TZS', 'RWF', 'MWK', 'ZMW', 'BWP', 'SZL', 'LSL', 'NAD']).default('USD'),
    subtotal: nonNegativeNumberSchema,
    taxRate: nonNegativeNumberSchema.default(0),
    taxAmount: nonNegativeNumberSchema.default(0),
    totalAmount: positiveNumberSchema,
    notes: z.string().trim().max(1000, { message: "Notes must be less than 1000 characters" }).optional().transform(val => val ? sanitizeInput(val) : val),
    paymentTerms: z.enum(['Net 15', 'Net 30', 'Net 45', 'Net 60', 'Due on Receipt', '2/10 Net 30', '1/10 Net 30']).default('Net 30'),
    region: z.enum(['US', 'EU', 'UK', 'CA', 'AU', 'APAC', 'LATAM', 'MEA']).default('US'),
  }),
  lineItems: z.array(z.object({
    description: requiredStringSchema.max(300, { message: "Description must be less than 300 characters" }).transform(sanitizeInput),
    quantity: positiveNumberSchema,
    unitPrice: nonNegativeNumberSchema,
    amount: nonNegativeNumberSchema,
    category: requiredStringSchema.transform(sanitizeInput),
    taxRate: nonNegativeNumberSchema.default(0),
    glCode: optionalStringSchema?.transform(val => val ? sanitizeInput(val) : val),
  })).min(1, { message: "At least one line item is required" }),
  status: z.enum(['draft', 'sent', 'paid', 'overdue', 'cancelled']).default('draft'),
});