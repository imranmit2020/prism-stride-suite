-- Create payroll tables with bm_payroll prefix

-- Employees table
CREATE TABLE public.bm_payroll_employees (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  employee_id VARCHAR NOT NULL UNIQUE,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  email VARCHAR UNIQUE,
  phone VARCHAR,
  position VARCHAR NOT NULL,
  department VARCHAR NOT NULL,
  hire_date DATE NOT NULL,
  employment_type VARCHAR NOT NULL DEFAULT 'full-time' CHECK (employment_type IN ('full-time', 'part-time', 'contract')),
  salary_type VARCHAR NOT NULL DEFAULT 'hourly' CHECK (salary_type IN ('hourly', 'monthly', 'yearly')),
  base_salary NUMERIC NOT NULL DEFAULT 0.00,
  status VARCHAR NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'terminated')),
  
  -- Address information
  street_address TEXT,
  city VARCHAR,
  state VARCHAR,
  zip_code VARCHAR,
  
  -- Tax information
  ssn VARCHAR,
  filing_status VARCHAR,
  allowances INTEGER DEFAULT 0,
  
  -- Bank information
  account_number VARCHAR,
  routing_number VARCHAR,
  bank_name VARCHAR,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bm_payroll_employees ENABLE ROW LEVEL SECURITY;

-- RLS policies for employees
CREATE POLICY "Users can manage their own employees"
ON public.bm_payroll_employees
FOR ALL
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Payroll records table
CREATE TABLE public.bm_payroll_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  record_id VARCHAR NOT NULL UNIQUE,
  employee_id UUID NOT NULL,
  pay_period_start DATE NOT NULL,
  pay_period_end DATE NOT NULL,
  pay_date DATE NOT NULL,
  gross_pay NUMERIC NOT NULL DEFAULT 0.00,
  deductions NUMERIC NOT NULL DEFAULT 0.00,
  net_pay NUMERIC NOT NULL DEFAULT 0.00,
  hours_worked NUMERIC,
  overtime_hours NUMERIC DEFAULT 0.00,
  status VARCHAR NOT NULL DEFAULT 'pending' CHECK (status IN ('paid', 'pending', 'cancelled')),
  payroll_type VARCHAR NOT NULL DEFAULT 'regular' CHECK (payroll_type IN ('regular', 'bonus', 'overtime')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bm_payroll_records ENABLE ROW LEVEL SECURITY;

-- RLS policies for payroll records
CREATE POLICY "Users can manage their own payroll records"
ON public.bm_payroll_records
FOR ALL
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Departments table
CREATE TABLE public.bm_payroll_departments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name VARCHAR NOT NULL,
  description TEXT,
  manager VARCHAR,
  budget_allocated NUMERIC DEFAULT 0.00,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bm_payroll_departments ENABLE ROW LEVEL SECURITY;

-- RLS policies for departments
CREATE POLICY "Users can manage their own departments"
ON public.bm_payroll_departments
FOR ALL
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Time tracking table
CREATE TABLE public.bm_payroll_time_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  employee_id UUID NOT NULL,
  date DATE NOT NULL,
  clock_in TIME,
  clock_out TIME,
  break_duration NUMERIC DEFAULT 0.00,
  total_hours NUMERIC DEFAULT 0.00,
  overtime_hours NUMERIC DEFAULT 0.00,
  status VARCHAR DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bm_payroll_time_entries ENABLE ROW LEVEL SECURITY;

-- RLS policies for time entries
CREATE POLICY "Users can manage time entries for their employees"
ON public.bm_payroll_time_entries
FOR ALL
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Benefits table
CREATE TABLE public.bm_payroll_benefits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  employee_id UUID NOT NULL,
  benefit_type VARCHAR NOT NULL,
  benefit_name VARCHAR NOT NULL,
  provider VARCHAR,
  employee_contribution NUMERIC DEFAULT 0.00,
  employer_contribution NUMERIC DEFAULT 0.00,
  coverage_start_date DATE,
  coverage_end_date DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bm_payroll_benefits ENABLE ROW LEVEL SECURITY;

-- RLS policies for benefits
CREATE POLICY "Users can manage benefits for their employees"
ON public.bm_payroll_benefits
FOR ALL
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Deductions table
CREATE TABLE public.bm_payroll_deductions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  employee_id UUID NOT NULL,
  deduction_type VARCHAR NOT NULL,
  deduction_name VARCHAR NOT NULL,
  amount NUMERIC NOT NULL DEFAULT 0.00,
  is_percentage BOOLEAN DEFAULT false,
  is_pre_tax BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  effective_date DATE,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bm_payroll_deductions ENABLE ROW LEVEL SECURITY;

-- RLS policies for deductions
CREATE POLICY "Users can manage deductions for their employees"
ON public.bm_payroll_deductions
FOR ALL
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Payroll runs table (for processing multiple employees at once)
CREATE TABLE public.bm_payroll_runs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  run_number VARCHAR NOT NULL UNIQUE,
  pay_period_start DATE NOT NULL,
  pay_period_end DATE NOT NULL,
  pay_date DATE NOT NULL,
  total_gross_pay NUMERIC DEFAULT 0.00,
  total_deductions NUMERIC DEFAULT 0.00,
  total_net_pay NUMERIC DEFAULT 0.00,
  employee_count INTEGER DEFAULT 0,
  status VARCHAR DEFAULT 'draft' CHECK (status IN ('draft', 'processed', 'paid', 'cancelled')),
  processed_at TIMESTAMP WITH TIME ZONE,
  processed_by VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bm_payroll_runs ENABLE ROW LEVEL SECURITY;

-- RLS policies for payroll runs
CREATE POLICY "Users can manage their own payroll runs"
ON public.bm_payroll_runs
FOR ALL
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Create triggers for updated_at columns
CREATE TRIGGER update_bm_payroll_employees_updated_at
BEFORE UPDATE ON public.bm_payroll_employees
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bm_payroll_records_updated_at
BEFORE UPDATE ON public.bm_payroll_records
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bm_payroll_departments_updated_at
BEFORE UPDATE ON public.bm_payroll_departments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bm_payroll_time_entries_updated_at
BEFORE UPDATE ON public.bm_payroll_time_entries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bm_payroll_benefits_updated_at
BEFORE UPDATE ON public.bm_payroll_benefits
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bm_payroll_deductions_updated_at
BEFORE UPDATE ON public.bm_payroll_deductions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bm_payroll_runs_updated_at
BEFORE UPDATE ON public.bm_payroll_runs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();