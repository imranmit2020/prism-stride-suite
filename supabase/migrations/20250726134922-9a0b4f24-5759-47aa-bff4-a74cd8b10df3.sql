-- Create function to seed personal inventory sample data
CREATE OR REPLACE FUNCTION seed_personal_inventory_data_for_user()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_user_id uuid;
  home_category_id uuid;
  kitchen_category_id uuid;
  electronics_category_id uuid;
  living_room_location_id uuid;
  kitchen_location_id uuid;
  bedroom_location_id uuid;
BEGIN
  -- Get the current authenticated user
  current_user_id := auth.uid();
  
  -- Check if user is authenticated
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'User must be authenticated to seed personal inventory data';
  END IF;

  -- Insert sample categories
  INSERT INTO pm_inv_categories (name, description, color, user_id, is_active)
  VALUES 
    ('Electronics', 'Electronic devices and gadgets', '#3B82F6', current_user_id, true),
    ('Furniture', 'Home furniture and fixtures', '#10B981', current_user_id, true),
    ('Kitchen', 'Kitchen appliances and tools', '#F59E0B', current_user_id, true),
    ('Clothing', 'Personal clothing and accessories', '#EF4444', current_user_id, true),
    ('Books', 'Books and educational materials', '#8B5CF6', current_user_id, true)
  ON CONFLICT DO NOTHING
  RETURNING id INTO home_category_id;

  -- Get category IDs for reference
  SELECT id INTO electronics_category_id FROM pm_inv_categories WHERE name = 'Electronics' AND user_id = current_user_id;
  SELECT id INTO kitchen_category_id FROM pm_inv_categories WHERE name = 'Kitchen' AND user_id = current_user_id;
  SELECT id INTO home_category_id FROM pm_inv_categories WHERE name = 'Furniture' AND user_id = current_user_id;

  -- Insert sample locations
  INSERT INTO pm_inv_locations (name, description, room_type, floor_level, user_id, is_active)
  VALUES 
    ('Living Room', 'Main living area', 'living_room', 1, current_user_id, true),
    ('Kitchen', 'Cooking and dining area', 'kitchen', 1, current_user_id, true),
    ('Master Bedroom', 'Primary bedroom', 'bedroom', 2, current_user_id, true),
    ('Home Office', 'Work and study area', 'office', 1, current_user_id, true),
    ('Garage', 'Storage and utility area', 'garage', 1, current_user_id, true)
  ON CONFLICT DO NOTHING;

  -- Get location IDs for reference
  SELECT id INTO living_room_location_id FROM pm_inv_locations WHERE name = 'Living Room' AND user_id = current_user_id;
  SELECT id INTO kitchen_location_id FROM pm_inv_locations WHERE name = 'Kitchen' AND user_id = current_user_id;
  SELECT id INTO bedroom_location_id FROM pm_inv_locations WHERE name = 'Master Bedroom' AND user_id = current_user_id;

  -- Insert sample inventory items
  INSERT INTO pm_inv_items (
    name, description, category_id, brand, model, purchase_date, purchase_price, 
    current_value, condition, location, room, notes, is_insured, user_id, is_active
  )
  VALUES 
    ('Samsung 65" Smart TV', '4K Ultra HD Smart LED TV', electronics_category_id, 'Samsung', 'UN65TU8000', '2023-01-15', 899.99, 750.00, 'Excellent', 'Living Room', 'Main TV', 'Wall mounted in living room', true, current_user_id, true),
    ('MacBook Pro 16"', 'Apple MacBook Pro with M2 chip', electronics_category_id, 'Apple', 'MacBook Pro 16"', '2023-06-20', 2499.99, 2100.00, 'Excellent', 'Home Office', 'Office', 'Primary work laptop', true, current_user_id, true),
    ('KitchenAid Stand Mixer', 'Professional 5-qt stand mixer', kitchen_category_id, 'KitchenAid', 'KSM150PS', '2022-11-10', 379.99, 320.00, 'Good', 'Kitchen', 'Counter', 'Red color, used regularly', false, current_user_id, true),
    ('Sectional Sofa', 'L-shaped sectional sofa with ottoman', home_category_id, 'West Elm', 'Andes Sectional', '2023-03-05', 1899.99, 1600.00, 'Good', 'Living Room', 'Seating area', 'Charcoal gray fabric', false, current_user_id, true),
    ('iPhone 14 Pro', 'Apple iPhone with 256GB storage', electronics_category_id, 'Apple', 'iPhone 14 Pro', '2023-09-15', 1099.99, 950.00, 'Excellent', 'Master Bedroom', 'Nightstand', 'Space Black color', true, current_user_id, true),
    ('Instant Pot', '8-quart multi-use pressure cooker', kitchen_category_id, 'Instant Pot', 'Duo 8Qt', '2022-12-01', 119.99, 90.00, 'Good', 'Kitchen', 'Cabinet', 'Used for meal prep', false, current_user_id, true),
    ('Gaming Chair', 'Ergonomic office gaming chair', home_category_id, 'Herman Miller', 'Embody', '2023-04-12', 1395.00, 1200.00, 'Excellent', 'Home Office', 'Desk area', 'Black frame with sync fabric', true, current_user_id, true),
    ('Air Fryer', 'Digital air fryer with presets', kitchen_category_id, 'Ninja', 'AF101', '2023-01-28', 89.99, 70.00, 'Good', 'Kitchen', 'Counter', 'Used 3-4 times per week', false, current_user_id, true)
  ON CONFLICT DO NOTHING;

  RAISE NOTICE 'Personal inventory sample data seeded successfully for user %', current_user_id;
END;
$$;