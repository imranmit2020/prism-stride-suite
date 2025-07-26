-- Create POS tables with bm_pos prefix

-- Products table
CREATE TABLE public.bm_pos_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  product_code VARCHAR NOT NULL UNIQUE,
  name VARCHAR NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL DEFAULT 0.00,
  cost_price NUMERIC DEFAULT 0.00,
  category VARCHAR NOT NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  barcode VARCHAR UNIQUE,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  tax_rate NUMERIC DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bm_pos_products ENABLE ROW LEVEL SECURITY;

-- RLS policies for products
CREATE POLICY "Users can manage their own products"
ON public.bm_pos_products
FOR ALL
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Categories table
CREATE TABLE public.bm_pos_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name VARCHAR NOT NULL,
  description TEXT,
  color VARCHAR DEFAULT '#3B82F6',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bm_pos_categories ENABLE ROW LEVEL SECURITY;

-- RLS policies for categories
CREATE POLICY "Users can manage their own categories"
ON public.bm_pos_categories
FOR ALL
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Customers table
CREATE TABLE public.bm_pos_customers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  customer_code VARCHAR NOT NULL UNIQUE,
  name VARCHAR NOT NULL,
  email VARCHAR,
  phone VARCHAR,
  address TEXT,
  city VARCHAR,
  state VARCHAR,
  postal_code VARCHAR,
  country VARCHAR DEFAULT 'US',
  date_of_birth DATE,
  loyalty_points INTEGER DEFAULT 0,
  total_spent NUMERIC DEFAULT 0.00,
  visit_count INTEGER DEFAULT 0,
  last_visit DATE,
  is_active BOOLEAN DEFAULT true,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bm_pos_customers ENABLE ROW LEVEL SECURITY;

-- RLS policies for customers
CREATE POLICY "Users can manage their own customers"
ON public.bm_pos_customers
FOR ALL
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Sales transactions table
CREATE TABLE public.bm_pos_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  transaction_number VARCHAR NOT NULL UNIQUE,
  customer_id UUID,
  cashier_id UUID,
  subtotal NUMERIC NOT NULL DEFAULT 0.00,
  tax_amount NUMERIC NOT NULL DEFAULT 0.00,
  discount_amount NUMERIC DEFAULT 0.00,
  total_amount NUMERIC NOT NULL DEFAULT 0.00,
  payment_method VARCHAR NOT NULL CHECK (payment_method IN ('cash', 'card', 'digital', 'loyalty_points', 'mixed')),
  payment_status VARCHAR DEFAULT 'completed' CHECK (payment_status IN ('pending', 'completed', 'refunded', 'cancelled')),
  cash_received NUMERIC,
  change_given NUMERIC,
  receipt_number VARCHAR,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bm_pos_transactions ENABLE ROW LEVEL SECURITY;

-- RLS policies for transactions
CREATE POLICY "Users can manage their own transactions"
ON public.bm_pos_transactions
FOR ALL
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Transaction items table
CREATE TABLE public.bm_pos_transaction_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id UUID NOT NULL,
  product_id UUID NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price NUMERIC NOT NULL DEFAULT 0.00,
  discount_amount NUMERIC DEFAULT 0.00,
  tax_amount NUMERIC DEFAULT 0.00,
  line_total NUMERIC NOT NULL DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bm_pos_transaction_items ENABLE ROW LEVEL SECURITY;

-- RLS policies for transaction items
CREATE POLICY "Users can manage transaction items for their transactions"
ON public.bm_pos_transaction_items
FOR ALL
USING (EXISTS (
  SELECT 1 FROM bm_pos_transactions 
  WHERE bm_pos_transactions.id = bm_pos_transaction_items.transaction_id 
  AND bm_pos_transactions.user_id = auth.uid()
));

-- Loyalty programs table
CREATE TABLE public.bm_pos_loyalty_programs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name VARCHAR NOT NULL,
  description TEXT,
  points_per_dollar NUMERIC DEFAULT 1.00,
  dollar_per_point NUMERIC DEFAULT 0.01,
  minimum_points_to_redeem INTEGER DEFAULT 100,
  expiry_months INTEGER DEFAULT 12,
  is_active BOOLEAN DEFAULT true,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bm_pos_loyalty_programs ENABLE ROW LEVEL SECURITY;

-- RLS policies for loyalty programs
CREATE POLICY "Users can manage their own loyalty programs"
ON public.bm_pos_loyalty_programs
FOR ALL
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Discounts table
CREATE TABLE public.bm_pos_discounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name VARCHAR NOT NULL,
  description TEXT,
  discount_type VARCHAR NOT NULL CHECK (discount_type IN ('percentage', 'fixed_amount')),
  discount_value NUMERIC NOT NULL DEFAULT 0.00,
  minimum_purchase NUMERIC DEFAULT 0.00,
  maximum_discount NUMERIC,
  applicable_products JSONB, -- Array of product IDs
  applicable_categories JSONB, -- Array of category names
  start_date DATE,
  end_date DATE,
  max_uses INTEGER,
  current_uses INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bm_pos_discounts ENABLE ROW LEVEL SECURITY;

-- RLS policies for discounts
CREATE POLICY "Users can manage their own discounts"
ON public.bm_pos_discounts
FOR ALL
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Shifts table (for cash register management)
CREATE TABLE public.bm_pos_shifts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  cashier_id UUID NOT NULL,
  shift_number VARCHAR NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  end_time TIMESTAMP WITH TIME ZONE,
  opening_cash NUMERIC DEFAULT 0.00,
  closing_cash NUMERIC,
  expected_cash NUMERIC,
  cash_difference NUMERIC,
  total_sales NUMERIC DEFAULT 0.00,
  transaction_count INTEGER DEFAULT 0,
  status VARCHAR DEFAULT 'open' CHECK (status IN ('open', 'closed')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bm_pos_shifts ENABLE ROW LEVEL SECURITY;

-- RLS policies for shifts
CREATE POLICY "Users can manage their own shifts"
ON public.bm_pos_shifts
FOR ALL
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Create triggers for updated_at columns
CREATE TRIGGER update_bm_pos_products_updated_at
BEFORE UPDATE ON public.bm_pos_products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bm_pos_categories_updated_at
BEFORE UPDATE ON public.bm_pos_categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bm_pos_customers_updated_at
BEFORE UPDATE ON public.bm_pos_customers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bm_pos_transactions_updated_at
BEFORE UPDATE ON public.bm_pos_transactions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bm_pos_loyalty_programs_updated_at
BEFORE UPDATE ON public.bm_pos_loyalty_programs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bm_pos_discounts_updated_at
BEFORE UPDATE ON public.bm_pos_discounts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bm_pos_shifts_updated_at
BEFORE UPDATE ON public.bm_pos_shifts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();