-- Create Business Mode Inventory tables with 'inv' in names

-- Categories table
CREATE TABLE public.bm_inv_categories (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Suppliers table
CREATE TABLE public.bm_inv_suppliers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  contact_person text,
  email text,
  phone text,
  address text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Warehouses table
CREATE TABLE public.bm_inv_warehouses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  location text,
  manager text,
  capacity integer,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Products table
CREATE TABLE public.bm_inv_products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  sku text UNIQUE NOT NULL,
  description text,
  category_id uuid REFERENCES bm_inv_categories(id),
  supplier_id uuid REFERENCES bm_inv_suppliers(id),
  unit_price decimal(10,2),
  cost_price decimal(10,2),
  barcode text,
  weight decimal(10,3),
  dimensions text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Stock levels table
CREATE TABLE public.bm_inv_stock (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id uuid REFERENCES bm_inv_products(id) NOT NULL,
  warehouse_id uuid REFERENCES bm_inv_warehouses(id) NOT NULL,
  quantity integer DEFAULT 0 NOT NULL,
  min_stock integer DEFAULT 0,
  max_stock integer,
  reorder_point integer DEFAULT 0,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(product_id, warehouse_id)
);

-- Transactions table
CREATE TABLE public.bm_inv_transactions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id uuid REFERENCES bm_inv_products(id) NOT NULL,
  warehouse_id uuid REFERENCES bm_inv_warehouses(id) NOT NULL,
  transaction_type text NOT NULL CHECK (transaction_type IN ('in', 'out', 'adjustment')),
  quantity integer NOT NULL,
  unit_cost decimal(10,2),
  reference_number text,
  notes text,
  created_at timestamptz DEFAULT now() NOT NULL,
  user_id uuid REFERENCES auth.users(id)
);

-- Purchase Orders table
CREATE TABLE public.bm_inv_purchase_orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number text UNIQUE NOT NULL,
  supplier_id uuid REFERENCES bm_inv_suppliers(id) NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'ordered', 'received', 'cancelled')),
  order_date date DEFAULT CURRENT_DATE,
  expected_date date,
  total_amount decimal(12,2),
  notes text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  user_id uuid REFERENCES auth.users(id)
);

-- Purchase Order Items table
CREATE TABLE public.bm_inv_purchase_order_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id uuid REFERENCES bm_inv_purchase_orders(id) ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES bm_inv_products(id) NOT NULL,
  quantity integer NOT NULL,
  unit_cost decimal(10,2) NOT NULL,
  total_cost decimal(12,2) GENERATED ALWAYS AS (quantity * unit_cost) STORED,
  received_quantity integer DEFAULT 0,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE bm_inv_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE bm_inv_suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE bm_inv_warehouses ENABLE ROW LEVEL SECURITY;
ALTER TABLE bm_inv_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE bm_inv_stock ENABLE ROW LEVEL SECURITY;
ALTER TABLE bm_inv_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bm_inv_purchase_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE bm_inv_purchase_order_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (authenticated users can access all)
CREATE POLICY "Authenticated users can view categories" ON bm_inv_categories FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert categories" ON bm_inv_categories FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update categories" ON bm_inv_categories FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete categories" ON bm_inv_categories FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view suppliers" ON bm_inv_suppliers FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert suppliers" ON bm_inv_suppliers FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update suppliers" ON bm_inv_suppliers FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete suppliers" ON bm_inv_suppliers FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view warehouses" ON bm_inv_warehouses FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert warehouses" ON bm_inv_warehouses FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update warehouses" ON bm_inv_warehouses FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete warehouses" ON bm_inv_warehouses FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view products" ON bm_inv_products FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert products" ON bm_inv_products FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update products" ON bm_inv_products FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete products" ON bm_inv_products FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view stock" ON bm_inv_stock FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert stock" ON bm_inv_stock FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update stock" ON bm_inv_stock FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete stock" ON bm_inv_stock FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view transactions" ON bm_inv_transactions FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert transactions" ON bm_inv_transactions FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update transactions" ON bm_inv_transactions FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete transactions" ON bm_inv_transactions FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view purchase orders" ON bm_inv_purchase_orders FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert purchase orders" ON bm_inv_purchase_orders FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update purchase orders" ON bm_inv_purchase_orders FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete purchase orders" ON bm_inv_purchase_orders FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view purchase order items" ON bm_inv_purchase_order_items FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert purchase order items" ON bm_inv_purchase_order_items FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update purchase order items" ON bm_inv_purchase_order_items FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete purchase order items" ON bm_inv_purchase_order_items FOR DELETE USING (auth.role() = 'authenticated');

-- Create triggers for updated_at
CREATE TRIGGER update_bm_inv_categories_updated_at BEFORE UPDATE ON bm_inv_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bm_inv_suppliers_updated_at BEFORE UPDATE ON bm_inv_suppliers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bm_inv_warehouses_updated_at BEFORE UPDATE ON bm_inv_warehouses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bm_inv_products_updated_at BEFORE UPDATE ON bm_inv_products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bm_inv_stock_updated_at BEFORE UPDATE ON bm_inv_stock FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bm_inv_purchase_orders_updated_at BEFORE UPDATE ON bm_inv_purchase_orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_bm_inv_products_sku ON bm_inv_products(sku);
CREATE INDEX idx_bm_inv_products_category ON bm_inv_products(category_id);
CREATE INDEX idx_bm_inv_products_supplier ON bm_inv_products(supplier_id);
CREATE INDEX idx_bm_inv_stock_product_warehouse ON bm_inv_stock(product_id, warehouse_id);
CREATE INDEX idx_bm_inv_transactions_product ON bm_inv_transactions(product_id);
CREATE INDEX idx_bm_inv_transactions_warehouse ON bm_inv_transactions(warehouse_id);
CREATE INDEX idx_bm_inv_transactions_date ON bm_inv_transactions(created_at);
CREATE INDEX idx_bm_inv_purchase_orders_supplier ON bm_inv_purchase_orders(supplier_id);
CREATE INDEX idx_bm_inv_purchase_orders_status ON bm_inv_purchase_orders(status);
CREATE INDEX idx_bm_inv_purchase_order_items_order ON bm_inv_purchase_order_items(order_id);
CREATE INDEX idx_bm_inv_purchase_order_items_product ON bm_inv_purchase_order_items(product_id);