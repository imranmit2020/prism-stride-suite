-- Ensure profiles table has proper structure and trigger
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS company_name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS department TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone TEXT;

-- Update the handle_new_user function to include more profile data
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'user'
  );
  RETURN NEW;
END;
$$;

-- Ensure the trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add user_id columns to inventory tables if they don't exist
ALTER TABLE public.bm_inv_products ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);
ALTER TABLE public.bm_inv_warehouses ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);
ALTER TABLE public.bm_inv_categories ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);
ALTER TABLE public.bm_inv_suppliers ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- Update RLS policies for inventory tables to be user-specific
DROP POLICY IF EXISTS "Authenticated users can view products" ON public.bm_inv_products;
DROP POLICY IF EXISTS "Authenticated users can insert products" ON public.bm_inv_products;
DROP POLICY IF EXISTS "Authenticated users can update products" ON public.bm_inv_products;
DROP POLICY IF EXISTS "Authenticated users can delete products" ON public.bm_inv_products;

CREATE POLICY "Users can view their own products" ON public.bm_inv_products
  FOR SELECT USING (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Users can insert their own products" ON public.bm_inv_products
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own products" ON public.bm_inv_products
  FOR UPDATE USING (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Users can delete their own products" ON public.bm_inv_products
  FOR DELETE USING (user_id = auth.uid() OR user_id IS NULL);

-- Similar policies for warehouses
DROP POLICY IF EXISTS "Authenticated users can view warehouses" ON public.bm_inv_warehouses;
DROP POLICY IF EXISTS "Authenticated users can insert warehouses" ON public.bm_inv_warehouses;
DROP POLICY IF EXISTS "Authenticated users can update warehouses" ON public.bm_inv_warehouses;
DROP POLICY IF EXISTS "Authenticated users can delete warehouses" ON public.bm_inv_warehouses;

CREATE POLICY "Users can view their own warehouses" ON public.bm_inv_warehouses
  FOR SELECT USING (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Users can insert their own warehouses" ON public.bm_inv_warehouses
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own warehouses" ON public.bm_inv_warehouses
  FOR UPDATE USING (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Users can delete their own warehouses" ON public.bm_inv_warehouses
  FOR DELETE USING (user_id = auth.uid() OR user_id IS NULL);

-- Similar policies for categories
DROP POLICY IF EXISTS "Authenticated users can view categories" ON public.bm_inv_categories;
DROP POLICY IF EXISTS "Authenticated users can insert categories" ON public.bm_inv_categories;
DROP POLICY IF EXISTS "Authenticated users can update categories" ON public.bm_inv_categories;
DROP POLICY IF EXISTS "Authenticated users can delete categories" ON public.bm_inv_categories;

CREATE POLICY "Users can view their own categories" ON public.bm_inv_categories
  FOR SELECT USING (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Users can insert their own categories" ON public.bm_inv_categories
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own categories" ON public.bm_inv_categories
  FOR UPDATE USING (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Users can delete their own categories" ON public.bm_inv_categories
  FOR DELETE USING (user_id = auth.uid() OR user_id IS NULL);

-- Similar policies for suppliers
DROP POLICY IF EXISTS "Authenticated users can view suppliers" ON public.bm_inv_suppliers;
DROP POLICY IF EXISTS "Authenticated users can insert suppliers" ON public.bm_inv_suppliers;
DROP POLICY IF EXISTS "Authenticated users can update suppliers" ON public.bm_inv_suppliers;
DROP POLICY IF EXISTS "Authenticated users can delete suppliers" ON public.bm_inv_suppliers;

CREATE POLICY "Users can view their own suppliers" ON public.bm_inv_suppliers
  FOR SELECT USING (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Users can insert their own suppliers" ON public.bm_inv_suppliers
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own suppliers" ON public.bm_inv_suppliers
  FOR UPDATE USING (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Users can delete their own suppliers" ON public.bm_inv_suppliers
  FOR DELETE USING (user_id = auth.uid() OR user_id IS NULL);

-- Update stock policies to use product's user_id through JOIN
DROP POLICY IF EXISTS "Authenticated users can view stock" ON public.bm_inv_stock;
DROP POLICY IF EXISTS "Authenticated users can insert stock" ON public.bm_inv_stock;
DROP POLICY IF EXISTS "Authenticated users can update stock" ON public.bm_inv_stock;
DROP POLICY IF EXISTS "Authenticated users can delete stock" ON public.bm_inv_stock;

CREATE POLICY "Users can view stock for their products" ON public.bm_inv_stock
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.bm_inv_products 
      WHERE id = bm_inv_stock.product_id 
      AND (user_id = auth.uid() OR user_id IS NULL)
    )
  );

CREATE POLICY "Users can insert stock for their products" ON public.bm_inv_stock
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.bm_inv_products 
      WHERE id = bm_inv_stock.product_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update stock for their products" ON public.bm_inv_stock
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.bm_inv_products 
      WHERE id = bm_inv_stock.product_id 
      AND (user_id = auth.uid() OR user_id IS NULL)
    )
  );

CREATE POLICY "Users can delete stock for their products" ON public.bm_inv_stock
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.bm_inv_products 
      WHERE id = bm_inv_stock.product_id 
      AND (user_id = auth.uid() OR user_id IS NULL)
    )
  );

-- Update transaction policies similarly
DROP POLICY IF EXISTS "Authenticated users can view transactions" ON public.bm_inv_transactions;
DROP POLICY IF EXISTS "Authenticated users can insert transactions" ON public.bm_inv_transactions;
DROP POLICY IF EXISTS "Authenticated users can update transactions" ON public.bm_inv_transactions;
DROP POLICY IF EXISTS "Authenticated users can delete transactions" ON public.bm_inv_transactions;

CREATE POLICY "Users can view transactions for their products" ON public.bm_inv_transactions
  FOR SELECT USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.bm_inv_products 
      WHERE id = bm_inv_transactions.product_id 
      AND (user_id = auth.uid() OR user_id IS NULL)
    )
  );

CREATE POLICY "Users can insert transactions for their products" ON public.bm_inv_transactions
  FOR INSERT WITH CHECK (
    user_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM public.bm_inv_products 
      WHERE id = bm_inv_transactions.product_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update transactions for their products" ON public.bm_inv_transactions
  FOR UPDATE USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.bm_inv_products 
      WHERE id = bm_inv_transactions.product_id 
      AND (user_id = auth.uid() OR user_id IS NULL)
    )
  );

CREATE POLICY "Users can delete transactions for their products" ON public.bm_inv_transactions
  FOR DELETE USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.bm_inv_products 
      WHERE id = bm_inv_transactions.product_id 
      AND (user_id = auth.uid() OR user_id IS NULL)
    )
  );

-- Similarly for purchase orders
DROP POLICY IF EXISTS "Authenticated users can view purchase orders" ON public.bm_inv_purchase_orders;
DROP POLICY IF EXISTS "Authenticated users can insert purchase orders" ON public.bm_inv_purchase_orders;
DROP POLICY IF EXISTS "Authenticated users can update purchase orders" ON public.bm_inv_purchase_orders;
DROP POLICY IF EXISTS "Authenticated users can delete purchase orders" ON public.bm_inv_purchase_orders;

CREATE POLICY "Users can view their own purchase orders" ON public.bm_inv_purchase_orders
  FOR SELECT USING (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Users can insert their own purchase orders" ON public.bm_inv_purchase_orders
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own purchase orders" ON public.bm_inv_purchase_orders
  FOR UPDATE USING (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Users can delete their own purchase orders" ON public.bm_inv_purchase_orders
  FOR DELETE USING (user_id = auth.uid() OR user_id IS NULL);

-- Purchase order items policies
DROP POLICY IF EXISTS "Authenticated users can view purchase order items" ON public.bm_inv_purchase_order_items;
DROP POLICY IF EXISTS "Authenticated users can insert purchase order items" ON public.bm_inv_purchase_order_items;
DROP POLICY IF EXISTS "Authenticated users can update purchase order items" ON public.bm_inv_purchase_order_items;
DROP POLICY IF EXISTS "Authenticated users can delete purchase order items" ON public.bm_inv_purchase_order_items;

CREATE POLICY "Users can view purchase order items for their orders" ON public.bm_inv_purchase_order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.bm_inv_purchase_orders 
      WHERE id = bm_inv_purchase_order_items.order_id 
      AND (user_id = auth.uid() OR user_id IS NULL)
    )
  );

CREATE POLICY "Users can insert purchase order items for their orders" ON public.bm_inv_purchase_order_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.bm_inv_purchase_orders 
      WHERE id = bm_inv_purchase_order_items.order_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update purchase order items for their orders" ON public.bm_inv_purchase_order_items
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.bm_inv_purchase_orders 
      WHERE id = bm_inv_purchase_order_items.order_id 
      AND (user_id = auth.uid() OR user_id IS NULL)
    )
  );

CREATE POLICY "Users can delete purchase order items for their orders" ON public.bm_inv_purchase_order_items
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.bm_inv_purchase_orders 
      WHERE id = bm_inv_purchase_order_items.order_id 
      AND (user_id = auth.uid() OR user_id IS NULL)
    )
  );