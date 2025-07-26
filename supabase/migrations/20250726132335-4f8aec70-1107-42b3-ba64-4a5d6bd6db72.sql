-- Insert sample POS categories
INSERT INTO bm_pos_categories (name, description, color, user_id) VALUES
('Electronics', 'Electronic devices and accessories', '#3B82F6', auth.uid()),
('Clothing', 'Apparel and fashion items', '#10B981', auth.uid()),
('Food & Beverages', 'Food items and drinks', '#F59E0B', auth.uid()),
('Books', 'Books and publications', '#8B5CF6', auth.uid()),
('Home & Garden', 'Home improvement and gardening', '#EF4444', auth.uid());

-- Insert sample POS products
INSERT INTO bm_pos_products (product_code, name, description, price, cost_price, category, stock_quantity, barcode, user_id) VALUES
('ELE001', 'Wireless Bluetooth Headphones', 'High-quality wireless headphones with noise cancellation', 79.99, 45.00, 'Electronics', 25, '1234567890123', auth.uid()),
('ELE002', 'Smartphone Charger', 'Universal USB-C fast charger', 19.99, 8.50, 'Electronics', 50, '1234567890124', auth.uid()),
('CLO001', 'Cotton T-Shirt', 'Comfortable cotton t-shirt in various colors', 24.99, 12.00, 'Clothing', 75, '1234567890125', auth.uid()),
('CLO002', 'Denim Jeans', 'Classic blue denim jeans', 49.99, 25.00, 'Clothing', 30, '1234567890126', auth.uid()),
('FOO001', 'Organic Coffee Beans', 'Premium organic coffee beans - 1lb bag', 14.99, 8.00, 'Food & Beverages', 40, '1234567890127', auth.uid()),
('FOO002', 'Energy Drink', 'Natural energy drink with vitamins', 3.99, 1.50, 'Food & Beverages', 100, '1234567890128', auth.uid()),
('BOO001', 'Programming Guide', 'Complete guide to modern programming', 34.99, 18.00, 'Books', 20, '1234567890129', auth.uid()),
('HOM001', 'Ceramic Plant Pot', 'Decorative ceramic pot for indoor plants', 12.99, 6.00, 'Home & Garden', 35, '1234567890130', auth.uid());

-- Insert sample customers
INSERT INTO bm_pos_customers (customer_code, name, email, phone, loyalty_points, total_spent, visit_count, user_id) VALUES
('CUST001', 'Sarah Johnson', 'sarah.johnson@email.com', '+1-555-0101', 250, 125.50, 8, auth.uid()),
('CUST002', 'Mike Chen', 'mike.chen@email.com', '+1-555-0102', 180, 89.25, 5, auth.uid()),
('CUST003', 'Emily Davis', 'emily.davis@email.com', '+1-555-0103', 320, 245.75, 12, auth.uid());