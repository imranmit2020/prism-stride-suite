-- Create personal finance categories table
CREATE TABLE public.pm_fnc_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  color CHARACTER VARYING DEFAULT '#3B82F6',
  category_type CHARACTER VARYING NOT NULL, -- 'income', 'expense', 'budget'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on categories
ALTER TABLE public.pm_fnc_categories ENABLE ROW LEVEL SECURITY;

-- Create policies for categories
CREATE POLICY "Users can manage their own finance categories" 
ON public.pm_fnc_categories 
FOR ALL 
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Create personal expenses table
CREATE TABLE public.pm_fnc_expenses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  category_id UUID REFERENCES public.pm_fnc_categories(id),
  amount NUMERIC NOT NULL DEFAULT 0.00,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  payment_method CHARACTER VARYING,
  merchant TEXT,
  receipt_url TEXT,
  is_recurring BOOLEAN DEFAULT false,
  recurrence_pattern CHARACTER VARYING,
  tags TEXT[],
  notes TEXT,
  is_tax_deductible BOOLEAN DEFAULT false,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on expenses
ALTER TABLE public.pm_fnc_expenses ENABLE ROW LEVEL SECURITY;

-- Create policies for expenses
CREATE POLICY "Users can manage their own expenses" 
ON public.pm_fnc_expenses 
FOR ALL 
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Create personal income table
CREATE TABLE public.pm_fnc_income (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  category_id UUID REFERENCES public.pm_fnc_categories(id),
  source TEXT NOT NULL,
  amount NUMERIC NOT NULL DEFAULT 0.00,
  target_amount NUMERIC DEFAULT 0.00,
  description TEXT,
  date DATE NOT NULL,
  income_type CHARACTER VARYING NOT NULL, -- 'salary', 'freelance', 'investment', 'business', 'passive', 'other'
  is_recurring BOOLEAN DEFAULT false,
  recurrence_pattern CHARACTER VARYING,
  tax_withheld NUMERIC DEFAULT 0.00,
  net_amount NUMERIC DEFAULT 0.00,
  payment_method CHARACTER VARYING,
  employer_payer TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on income
ALTER TABLE public.pm_fnc_income ENABLE ROW LEVEL SECURITY;

-- Create policies for income
CREATE POLICY "Users can manage their own income" 
ON public.pm_fnc_income 
FOR ALL 
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Create personal budgets table
CREATE TABLE public.pm_fnc_budgets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  category_id UUID REFERENCES public.pm_fnc_categories(id),
  name TEXT NOT NULL,
  budgeted_amount NUMERIC NOT NULL DEFAULT 0.00,
  spent_amount NUMERIC DEFAULT 0.00,
  period CHARACTER VARYING NOT NULL DEFAULT 'monthly', -- 'weekly', 'monthly', 'quarterly', 'yearly'
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  alert_threshold NUMERIC DEFAULT 80.00, -- percentage to trigger alert
  is_active BOOLEAN DEFAULT true,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on budgets
ALTER TABLE public.pm_fnc_budgets ENABLE ROW LEVEL SECURITY;

-- Create policies for budgets
CREATE POLICY "Users can manage their own budgets" 
ON public.pm_fnc_budgets 
FOR ALL 
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Create personal goals table
CREATE TABLE public.pm_fnc_goals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  target_amount NUMERIC NOT NULL DEFAULT 0.00,
  current_amount NUMERIC DEFAULT 0.00,
  target_date DATE,
  goal_type CHARACTER VARYING NOT NULL, -- 'savings', 'debt_payoff', 'purchase', 'investment', 'emergency_fund', 'other'
  priority CHARACTER VARYING DEFAULT 'medium', -- 'low', 'medium', 'high'
  is_active BOOLEAN DEFAULT true,
  is_completed BOOLEAN DEFAULT false,
  completed_date DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on goals
ALTER TABLE public.pm_fnc_goals ENABLE ROW LEVEL SECURITY;

-- Create policies for goals
CREATE POLICY "Users can manage their own goals" 
ON public.pm_fnc_goals 
FOR ALL 
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Create personal transactions table (unified view)
CREATE TABLE public.pm_fnc_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  category_id UUID REFERENCES public.pm_fnc_categories(id),
  amount NUMERIC NOT NULL DEFAULT 0.00,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  transaction_type CHARACTER VARYING NOT NULL, -- 'income', 'expense', 'transfer', 'investment'
  account_from TEXT,
  account_to TEXT,
  payment_method CHARACTER VARYING,
  reference_number TEXT,
  merchant TEXT,
  location TEXT,
  tags TEXT[],
  notes TEXT,
  is_recurring BOOLEAN DEFAULT false,
  recurrence_pattern CHARACTER VARYING,
  parent_transaction_id UUID, -- for linked transactions
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on transactions
ALTER TABLE public.pm_fnc_transactions ENABLE ROW LEVEL SECURITY;

-- Create policies for transactions
CREATE POLICY "Users can manage their own transactions" 
ON public.pm_fnc_transactions 
FOR ALL 
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Create triggers for updated_at columns
CREATE TRIGGER update_pm_fnc_categories_updated_at
  BEFORE UPDATE ON public.pm_fnc_categories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pm_fnc_expenses_updated_at
  BEFORE UPDATE ON public.pm_fnc_expenses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pm_fnc_income_updated_at
  BEFORE UPDATE ON public.pm_fnc_income
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pm_fnc_budgets_updated_at
  BEFORE UPDATE ON public.pm_fnc_budgets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pm_fnc_goals_updated_at
  BEFORE UPDATE ON public.pm_fnc_goals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pm_fnc_transactions_updated_at
  BEFORE UPDATE ON public.pm_fnc_transactions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();