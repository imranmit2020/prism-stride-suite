-- Create a function to seed POS data for the current user
CREATE OR REPLACE FUNCTION public.seed_pos_data_for_user()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    current_user_id uuid;
BEGIN
    -- Get the current user ID
    current_user_id := auth.uid();
    
    -- Only proceed if user is authenticated
    IF current_user_id IS NULL THEN
        RAISE EXCEPTION 'User must be authenticated to seed POS data';
    END IF;
    
    -- Insert sample POS categories (only if none exist for this user)
    IF NOT EXISTS (SELECT 1 FROM bm_pos_categories WHERE user_id = current_user_id) THEN
        INSERT INTO bm_pos_categories (name, description, color, user_id) VALUES
        ('Electronics', 'Electronic devices and accessories', '#3B82F6', current_user_id),
        ('Clothing', 'Apparel and fashion items', '#10B981', current_user_id),
        ('Food & Beverages', 'Food items and drinks', '#F59E0B', current_user_id),
        ('Books', 'Books and publications', '#8B5CF6', current_user_id),
        ('Home & Garden', 'Home improvement and gardening', '#EF4444', current_user_id);
    END IF;
    
    -- Insert sample POS products (only if none exist for this user)
    IF NOT EXISTS (SELECT 1 FROM bm_pos_products WHERE user_id = current_user_id) THEN
        INSERT INTO bm_pos_products (product_code, name, description, price, cost_price, category, stock_quantity, barcode, user_id) VALUES
        ('ELE001', 'Wireless Bluetooth Headphones', 'High-quality wireless headphones with noise cancellation', 79.99, 45.00, 'Electronics', 25, '1234567890123', current_user_id),
        ('ELE002', 'Smartphone Charger', 'Universal USB-C fast charger', 19.99, 8.50, 'Electronics', 50, '1234567890124', current_user_id),
        ('CLO001', 'Cotton T-Shirt', 'Comfortable cotton t-shirt in various colors', 24.99, 12.00, 'Clothing', 75, '1234567890125', current_user_id),
        ('CLO002', 'Denim Jeans', 'Classic blue denim jeans', 49.99, 25.00, 'Clothing', 30, '1234567890126', current_user_id),
        ('FOO001', 'Organic Coffee Beans', 'Premium organic coffee beans - 1lb bag', 14.99, 8.00, 'Food & Beverages', 40, '1234567890127', current_user_id),
        ('FOO002', 'Energy Drink', 'Natural energy drink with vitamins', 3.99, 1.50, 'Food & Beverages', 100, '1234567890128', current_user_id),
        ('BOO001', 'Programming Guide', 'Complete guide to modern programming', 34.99, 18.00, 'Books', 20, '1234567890129', current_user_id),
        ('HOM001', 'Ceramic Plant Pot', 'Decorative ceramic pot for indoor plants', 12.99, 6.00, 'Home & Garden', 35, '1234567890130', current_user_id);
    END IF;
    
    -- Insert sample customers (only if none exist for this user)
    IF NOT EXISTS (SELECT 1 FROM bm_pos_customers WHERE user_id = current_user_id) THEN
        INSERT INTO bm_pos_customers (customer_code, name, email, phone, loyalty_points, total_spent, visit_count, user_id) VALUES
        ('CUST001', 'Sarah Johnson', 'sarah.johnson@email.com', '+1-555-0101', 250, 125.50, 8, current_user_id),
        ('CUST002', 'Mike Chen', 'mike.chen@email.com', '+1-555-0102', 180, 89.25, 5, current_user_id),
        ('CUST003', 'Emily Davis', 'emily.davis@email.com', '+1-555-0103', 320, 245.75, 12, current_user_id);
    END IF;
END;
$$;