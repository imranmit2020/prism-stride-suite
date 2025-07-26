-- Personal Reports Tables
CREATE TABLE public.pm_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  report_type VARCHAR(50) NOT NULL, -- 'financial', 'inventory', 'goals', 'custom'
  template_data JSONB,
  filters JSONB,
  settings JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.pm_report_schedules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  report_id UUID NOT NULL,
  schedule_type VARCHAR(20) NOT NULL, -- 'daily', 'weekly', 'monthly', 'quarterly', 'yearly'
  schedule_config JSONB, -- day of week, day of month, etc.
  email_recipients TEXT[],
  is_active BOOLEAN DEFAULT true,
  last_run TIMESTAMP WITH TIME ZONE,
  next_run TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.pm_report_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  report_id UUID,
  schedule_id UUID,
  report_data JSONB,
  file_url TEXT,
  generation_time INTEGER, -- milliseconds
  status VARCHAR(20) DEFAULT 'completed', -- 'pending', 'generating', 'completed', 'failed'
  error_message TEXT,
  generated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Personal Goals & Savings Tables  
CREATE TABLE public.pm_goals_general (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL, -- 'health', 'career', 'education', 'personal', 'travel', 'other'
  target_value NUMERIC,
  current_value NUMERIC DEFAULT 0,
  unit VARCHAR(20), -- 'dollars', 'pounds', 'hours', 'days', 'items', 'percent'
  target_date DATE,
  priority VARCHAR(10) DEFAULT 'medium', -- 'low', 'medium', 'high'
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'paused', 'completed', 'cancelled'
  completion_date TIMESTAMP WITH TIME ZONE,
  milestones JSONB, -- array of milestone objects
  notes TEXT,
  tags TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.pm_savings_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  account_name VARCHAR(255) NOT NULL,
  account_type VARCHAR(50) NOT NULL, -- 'savings', 'checking', 'money_market', 'cd', 'other'
  bank_name VARCHAR(255),
  account_number_last4 VARCHAR(4),
  current_balance NUMERIC DEFAULT 0,
  interest_rate NUMERIC DEFAULT 0,
  minimum_balance NUMERIC DEFAULT 0,
  monthly_fee NUMERIC DEFAULT 0,
  goal_id UUID, -- link to financial goal if applicable
  is_primary BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.pm_investments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  investment_name VARCHAR(255) NOT NULL,
  investment_type VARCHAR(50) NOT NULL, -- 'stocks', 'bonds', 'mutual_funds', 'etf', 'crypto', 'real_estate', 'other'
  symbol VARCHAR(20), -- ticker symbol if applicable
  quantity NUMERIC,
  purchase_price NUMERIC,
  current_price NUMERIC,
  purchase_date DATE,
  broker_name VARCHAR(255),
  account_type VARCHAR(50), -- 'brokerage', '401k', 'ira', 'roth_ira', 'other'
  goal_id UUID, -- link to financial goal if applicable
  notes TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Personal Documents Tables
CREATE TABLE public.pm_document_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  color VARCHAR(7) DEFAULT '#3B82F6', -- hex color
  icon VARCHAR(50), -- lucide icon name
  parent_category_id UUID,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.pm_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category_id UUID,
  document_type VARCHAR(50), -- 'receipt', 'invoice', 'contract', 'tax_document', 'insurance', 'medical', 'other'
  file_url TEXT,
  file_name VARCHAR(255),
  file_size INTEGER, -- bytes
  file_type VARCHAR(50), -- 'pdf', 'jpg', 'png', 'doc', etc.
  document_date DATE,
  expiry_date DATE,
  related_expense_id UUID, -- link to pm_fnc_expenses if applicable
  related_income_id UUID, -- link to pm_fnc_income if applicable
  related_item_id UUID, -- link to pm_inv_items if applicable
  tags TEXT[],
  is_important BOOLEAN DEFAULT false,
  is_archived BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.pm_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pm_report_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pm_report_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pm_goals_general ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pm_savings_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pm_investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pm_document_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pm_documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Personal Reports
CREATE POLICY "Users can manage their own reports" ON public.pm_reports FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can manage their own report schedules" ON public.pm_report_schedules FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can view their own report history" ON public.pm_report_history FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- RLS Policies for Goals & Savings
CREATE POLICY "Users can manage their own general goals" ON public.pm_goals_general FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can manage their own savings accounts" ON public.pm_savings_accounts FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can manage their own investments" ON public.pm_investments FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- RLS Policies for Documents
CREATE POLICY "Users can manage their own document categories" ON public.pm_document_categories FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can manage their own documents" ON public.pm_documents FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- Create indexes for performance
CREATE INDEX idx_pm_reports_user_id ON public.pm_reports(user_id);
CREATE INDEX idx_pm_reports_type ON public.pm_reports(report_type);
CREATE INDEX idx_pm_report_schedules_user_id ON public.pm_report_schedules(user_id);
CREATE INDEX idx_pm_report_schedules_next_run ON public.pm_report_schedules(next_run) WHERE is_active = true;
CREATE INDEX idx_pm_report_history_user_id ON public.pm_report_history(user_id);
CREATE INDEX idx_pm_report_history_generated_at ON public.pm_report_history(generated_at DESC);

CREATE INDEX idx_pm_goals_general_user_id ON public.pm_goals_general(user_id);
CREATE INDEX idx_pm_goals_general_status ON public.pm_goals_general(status) WHERE is_active = true;
CREATE INDEX idx_pm_savings_accounts_user_id ON public.pm_savings_accounts(user_id);
CREATE INDEX idx_pm_investments_user_id ON public.pm_investments(user_id);

CREATE INDEX idx_pm_document_categories_user_id ON public.pm_document_categories(user_id);
CREATE INDEX idx_pm_documents_user_id ON public.pm_documents(user_id);
CREATE INDEX idx_pm_documents_category_id ON public.pm_documents(category_id);
CREATE INDEX idx_pm_documents_type ON public.pm_documents(document_type);
CREATE INDEX idx_pm_documents_expiry_date ON public.pm_documents(expiry_date) WHERE expiry_date IS NOT NULL;

-- Foreign key constraints
ALTER TABLE public.pm_report_schedules ADD CONSTRAINT fk_pm_report_schedules_report FOREIGN KEY (report_id) REFERENCES public.pm_reports(id) ON DELETE CASCADE;
ALTER TABLE public.pm_report_history ADD CONSTRAINT fk_pm_report_history_report FOREIGN KEY (report_id) REFERENCES public.pm_reports(id) ON DELETE SET NULL;
ALTER TABLE public.pm_report_history ADD CONSTRAINT fk_pm_report_history_schedule FOREIGN KEY (schedule_id) REFERENCES public.pm_report_schedules(id) ON DELETE SET NULL;

ALTER TABLE public.pm_savings_accounts ADD CONSTRAINT fk_pm_savings_accounts_goal FOREIGN KEY (goal_id) REFERENCES public.pm_fnc_goals(id) ON DELETE SET NULL;
ALTER TABLE public.pm_investments ADD CONSTRAINT fk_pm_investments_goal FOREIGN KEY (goal_id) REFERENCES public.pm_fnc_goals(id) ON DELETE SET NULL;

ALTER TABLE public.pm_document_categories ADD CONSTRAINT fk_pm_document_categories_parent FOREIGN KEY (parent_category_id) REFERENCES public.pm_document_categories(id) ON DELETE SET NULL;
ALTER TABLE public.pm_documents ADD CONSTRAINT fk_pm_documents_category FOREIGN KEY (category_id) REFERENCES public.pm_document_categories(id) ON DELETE SET NULL;
ALTER TABLE public.pm_documents ADD CONSTRAINT fk_pm_documents_expense FOREIGN KEY (related_expense_id) REFERENCES public.pm_fnc_expenses(id) ON DELETE SET NULL;
ALTER TABLE public.pm_documents ADD CONSTRAINT fk_pm_documents_income FOREIGN KEY (related_income_id) REFERENCES public.pm_fnc_income(id) ON DELETE SET NULL;
ALTER TABLE public.pm_documents ADD CONSTRAINT fk_pm_documents_item FOREIGN KEY (related_item_id) REFERENCES public.pm_inv_items(id) ON DELETE SET NULL;

-- Add update triggers
CREATE TRIGGER update_pm_reports_updated_at BEFORE UPDATE ON public.pm_reports FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_pm_report_schedules_updated_at BEFORE UPDATE ON public.pm_report_schedules FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_pm_goals_general_updated_at BEFORE UPDATE ON public.pm_goals_general FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_pm_savings_accounts_updated_at BEFORE UPDATE ON public.pm_savings_accounts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_pm_investments_updated_at BEFORE UPDATE ON public.pm_investments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_pm_document_categories_updated_at BEFORE UPDATE ON public.pm_document_categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_pm_documents_updated_at BEFORE UPDATE ON public.pm_documents FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();