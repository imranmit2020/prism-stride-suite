-- Add latitude and longitude columns to warehouses table for geographic mapping
ALTER TABLE bm_inv_warehouses 
ADD COLUMN latitude NUMERIC(10, 8),
ADD COLUMN longitude NUMERIC(11, 8);

-- Create index for geographic queries
CREATE INDEX idx_warehouses_location ON bm_inv_warehouses (latitude, longitude);