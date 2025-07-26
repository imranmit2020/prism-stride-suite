-- Fix security warnings by restricting policies to authenticated users only
-- Remove policies that allow NULL user_id access and require authentication

-- Update profiles policies to only allow authenticated users
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

CREATE POLICY "Authenticated users can view their own profile" ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "Authenticated users can update their own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id);

CREATE POLICY "Authenticated users can insert their own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- Update product policies to only allow authenticated users with proper ownership
DROP POLICY IF EXISTS "Users can view their own products" ON public.bm_inv_products;
DROP POLICY IF EXISTS "Users can insert their own products" ON public.bm_inv_products;
DROP POLICY IF EXISTS "Users can update their own products" ON public.bm_inv_products;
DROP POLICY IF EXISTS "Users can delete their own products" ON public.bm_inv_products;

CREATE POLICY "Authenticated users can view their own products" ON public.bm_inv_products
  FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Authenticated users can insert their own products" ON public.bm_inv_products
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

CREATE POLICY "Authenticated users can update their own products" ON public.bm_inv_products
  FOR UPDATE TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Authenticated users can delete their own products" ON public.bm_inv_products
  FOR DELETE TO authenticated USING (user_id = auth.uid());

-- Update warehouse policies
DROP POLICY IF EXISTS "Users can view their own warehouses" ON public.bm_inv_warehouses;
DROP POLICY IF EXISTS "Users can insert their own warehouses" ON public.bm_inv_warehouses;
DROP POLICY IF EXISTS "Users can update their own warehouses" ON public.bm_inv_warehouses;
DROP POLICY IF EXISTS "Users can delete their own warehouses" ON public.bm_inv_warehouses;

CREATE POLICY "Authenticated users can view their own warehouses" ON public.bm_inv_warehouses
  FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Authenticated users can insert their own warehouses" ON public.bm_inv_warehouses
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

CREATE POLICY "Authenticated users can update their own warehouses" ON public.bm_inv_warehouses
  FOR UPDATE TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Authenticated users can delete their own warehouses" ON public.bm_inv_warehouses
  FOR DELETE TO authenticated USING (user_id = auth.uid());

-- Update category policies
DROP POLICY IF EXISTS "Users can view their own categories" ON public.bm_inv_categories;
DROP POLICY IF EXISTS "Users can insert their own categories" ON public.bm_inv_categories;
DROP POLICY IF EXISTS "Users can update their own categories" ON public.bm_inv_categories;
DROP POLICY IF EXISTS "Users can delete their own categories" ON public.bm_inv_categories;

CREATE POLICY "Authenticated users can view their own categories" ON public.bm_inv_categories
  FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Authenticated users can insert their own categories" ON public.bm_inv_categories
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

CREATE POLICY "Authenticated users can update their own categories" ON public.bm_inv_categories
  FOR UPDATE TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Authenticated users can delete their own categories" ON public.bm_inv_categories
  FOR DELETE TO authenticated USING (user_id = auth.uid());

-- Update supplier policies
DROP POLICY IF EXISTS "Users can view their own suppliers" ON public.bm_inv_suppliers;
DROP POLICY IF EXISTS "Users can insert their own suppliers" ON public.bm_inv_suppliers;
DROP POLICY IF EXISTS "Users can update their own suppliers" ON public.bm_inv_suppliers;
DROP POLICY IF EXISTS "Users can delete their own suppliers" ON public.bm_inv_suppliers;

CREATE POLICY "Authenticated users can view their own suppliers" ON public.bm_inv_suppliers
  FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Authenticated users can insert their own suppliers" ON public.bm_inv_suppliers
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

CREATE POLICY "Authenticated users can update their own suppliers" ON public.bm_inv_suppliers
  FOR UPDATE TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Authenticated users can delete their own suppliers" ON public.bm_inv_suppliers
  FOR DELETE TO authenticated USING (user_id = auth.uid());

-- Update stock policies
DROP POLICY IF EXISTS "Users can view stock for their products" ON public.bm_inv_stock;
DROP POLICY IF EXISTS "Users can insert stock for their products" ON public.bm_inv_stock;
DROP POLICY IF EXISTS "Users can update stock for their products" ON public.bm_inv_stock;
DROP POLICY IF EXISTS "Users can delete stock for their products" ON public.bm_inv_stock;

CREATE POLICY "Authenticated users can view stock for their products" ON public.bm_inv_stock
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.bm_inv_products 
      WHERE id = bm_inv_stock.product_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can insert stock for their products" ON public.bm_inv_stock
  FOR INSERT TO authenticated WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.bm_inv_products 
      WHERE id = bm_inv_stock.product_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can update stock for their products" ON public.bm_inv_stock
  FOR UPDATE TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.bm_inv_products 
      WHERE id = bm_inv_stock.product_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can delete stock for their products" ON public.bm_inv_stock
  FOR DELETE TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.bm_inv_products 
      WHERE id = bm_inv_stock.product_id 
      AND user_id = auth.uid()
    )
  );

-- Update transaction policies
DROP POLICY IF EXISTS "Users can view transactions for their products" ON public.bm_inv_transactions;
DROP POLICY IF EXISTS "Users can insert transactions for their products" ON public.bm_inv_transactions;
DROP POLICY IF EXISTS "Users can update transactions for their products" ON public.bm_inv_transactions;
DROP POLICY IF EXISTS "Users can delete transactions for their products" ON public.bm_inv_transactions;

CREATE POLICY "Authenticated users can view transactions for their products" ON public.bm_inv_transactions
  FOR SELECT TO authenticated USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.bm_inv_products 
      WHERE id = bm_inv_transactions.product_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can insert transactions for their products" ON public.bm_inv_transactions
  FOR INSERT TO authenticated WITH CHECK (
    user_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM public.bm_inv_products 
      WHERE id = bm_inv_transactions.product_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can update transactions for their products" ON public.bm_inv_transactions
  FOR UPDATE TO authenticated USING (
    user_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM public.bm_inv_products 
      WHERE id = bm_inv_transactions.product_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can delete transactions for their products" ON public.bm_inv_transactions
  FOR DELETE TO authenticated USING (
    user_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM public.bm_inv_products 
      WHERE id = bm_inv_transactions.product_id 
      AND user_id = auth.uid()
    )
  );

-- Update purchase order policies
DROP POLICY IF EXISTS "Users can view their own purchase orders" ON public.bm_inv_purchase_orders;
DROP POLICY IF EXISTS "Users can insert their own purchase orders" ON public.bm_inv_purchase_orders;
DROP POLICY IF EXISTS "Users can update their own purchase orders" ON public.bm_inv_purchase_orders;
DROP POLICY IF EXISTS "Users can delete their own purchase orders" ON public.bm_inv_purchase_orders;

CREATE POLICY "Authenticated users can view their own purchase orders" ON public.bm_inv_purchase_orders
  FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Authenticated users can insert their own purchase orders" ON public.bm_inv_purchase_orders
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

CREATE POLICY "Authenticated users can update their own purchase orders" ON public.bm_inv_purchase_orders
  FOR UPDATE TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Authenticated users can delete their own purchase orders" ON public.bm_inv_purchase_orders
  FOR DELETE TO authenticated USING (user_id = auth.uid());

-- Update purchase order items policies
DROP POLICY IF EXISTS "Users can view purchase order items for their orders" ON public.bm_inv_purchase_order_items;
DROP POLICY IF EXISTS "Users can insert purchase order items for their orders" ON public.bm_inv_purchase_order_items;
DROP POLICY IF EXISTS "Users can update purchase order items for their orders" ON public.bm_inv_purchase_order_items;
DROP POLICY IF EXISTS "Users can delete purchase order items for their orders" ON public.bm_inv_purchase_order_items;

CREATE POLICY "Authenticated users can view purchase order items for their orders" ON public.bm_inv_purchase_order_items
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.bm_inv_purchase_orders 
      WHERE id = bm_inv_purchase_order_items.order_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can insert purchase order items for their orders" ON public.bm_inv_purchase_order_items
  FOR INSERT TO authenticated WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.bm_inv_purchase_orders 
      WHERE id = bm_inv_purchase_order_items.order_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can update purchase order items for their orders" ON public.bm_inv_purchase_order_items
  FOR UPDATE TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.bm_inv_purchase_orders 
      WHERE id = bm_inv_purchase_order_items.order_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can delete purchase order items for their orders" ON public.bm_inv_purchase_order_items
  FOR DELETE TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.bm_inv_purchase_orders 
      WHERE id = bm_inv_purchase_order_items.order_id 
      AND user_id = auth.uid()
    )
  );