-- Rename tables to include 'inv' in the name
ALTER TABLE bm_categories RENAME TO bm_inv_categories;
ALTER TABLE bm_suppliers RENAME TO bm_inv_suppliers;
ALTER TABLE bm_warehouses RENAME TO bm_inv_warehouses;
ALTER TABLE bm_products RENAME TO bm_inv_products;
ALTER TABLE bm_stock RENAME TO bm_inv_stock;
ALTER TABLE bm_transactions RENAME TO bm_inv_transactions;
ALTER TABLE bm_purchase_orders RENAME TO bm_inv_purchase_orders;
ALTER TABLE bm_purchase_order_items RENAME TO bm_inv_purchase_order_items;

-- Update foreign key constraints to reference the renamed tables
ALTER TABLE bm_inv_products 
  DROP CONSTRAINT bm_products_category_id_fkey,
  ADD CONSTRAINT bm_inv_products_category_id_fkey 
    FOREIGN KEY (category_id) REFERENCES bm_inv_categories(id);

ALTER TABLE bm_inv_products 
  DROP CONSTRAINT bm_products_supplier_id_fkey,
  ADD CONSTRAINT bm_inv_products_supplier_id_fkey 
    FOREIGN KEY (supplier_id) REFERENCES bm_inv_suppliers(id);

ALTER TABLE bm_inv_stock 
  DROP CONSTRAINT bm_stock_product_id_fkey,
  ADD CONSTRAINT bm_inv_stock_product_id_fkey 
    FOREIGN KEY (product_id) REFERENCES bm_inv_products(id);

ALTER TABLE bm_inv_stock 
  DROP CONSTRAINT bm_stock_warehouse_id_fkey,
  ADD CONSTRAINT bm_inv_stock_warehouse_id_fkey 
    FOREIGN KEY (warehouse_id) REFERENCES bm_inv_warehouses(id);

ALTER TABLE bm_inv_transactions 
  DROP CONSTRAINT bm_transactions_product_id_fkey,
  ADD CONSTRAINT bm_inv_transactions_product_id_fkey 
    FOREIGN KEY (product_id) REFERENCES bm_inv_products(id);

ALTER TABLE bm_inv_transactions 
  DROP CONSTRAINT bm_transactions_warehouse_id_fkey,
  ADD CONSTRAINT bm_inv_transactions_warehouse_id_fkey 
    FOREIGN KEY (warehouse_id) REFERENCES bm_inv_warehouses(id);

ALTER TABLE bm_inv_purchase_orders 
  DROP CONSTRAINT bm_purchase_orders_supplier_id_fkey,
  ADD CONSTRAINT bm_inv_purchase_orders_supplier_id_fkey 
    FOREIGN KEY (supplier_id) REFERENCES bm_inv_suppliers(id);

ALTER TABLE bm_inv_purchase_order_items 
  DROP CONSTRAINT bm_purchase_order_items_order_id_fkey,
  ADD CONSTRAINT bm_inv_purchase_order_items_order_id_fkey 
    FOREIGN KEY (order_id) REFERENCES bm_inv_purchase_orders(id);

ALTER TABLE bm_inv_purchase_order_items 
  DROP CONSTRAINT bm_purchase_order_items_product_id_fkey,
  ADD CONSTRAINT bm_inv_purchase_order_items_product_id_fkey 
    FOREIGN KEY (product_id) REFERENCES bm_inv_products(id);