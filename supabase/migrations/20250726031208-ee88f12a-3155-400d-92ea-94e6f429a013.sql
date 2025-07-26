-- Create personal inventory categories table
CREATE TABLE public.pm_inv_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  color CHARACTER VARYING DEFAULT '#3B82F6',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on categories
ALTER TABLE public.pm_inv_categories ENABLE ROW LEVEL SECURITY;

-- Create policies for categories
CREATE POLICY "Users can manage their own categories" 
ON public.pm_inv_categories 
FOR ALL 
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Create personal inventory items table
CREATE TABLE public.pm_inv_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category_id UUID REFERENCES public.pm_inv_categories(id),
  brand TEXT,
  model TEXT,
  serial_number TEXT,
  purchase_date DATE,
  purchase_price NUMERIC DEFAULT 0.00,
  current_value NUMERIC DEFAULT 0.00,
  condition CHARACTER VARYING DEFAULT 'Good',
  location TEXT,
  room TEXT,
  warranty_expiry DATE,
  notes TEXT,
  image_url TEXT,
  is_insured BOOLEAN DEFAULT false,
  insurance_policy TEXT,
  replacement_cost NUMERIC DEFAULT 0.00,
  depreciation_rate NUMERIC DEFAULT 0.00,
  tags TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on items
ALTER TABLE public.pm_inv_items ENABLE ROW LEVEL SECURITY;

-- Create policies for items
CREATE POLICY "Users can manage their own items" 
ON public.pm_inv_items 
FOR ALL 
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Create personal inventory locations table
CREATE TABLE public.pm_inv_locations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  room_type CHARACTER VARYING,
  floor_level INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on locations
ALTER TABLE public.pm_inv_locations ENABLE ROW LEVEL SECURITY;

-- Create policies for locations
CREATE POLICY "Users can manage their own locations" 
ON public.pm_inv_locations 
FOR ALL 
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Create personal inventory maintenance records table
CREATE TABLE public.pm_inv_maintenance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  item_id UUID NOT NULL REFERENCES public.pm_inv_items(id) ON DELETE CASCADE,
  maintenance_type CHARACTER VARYING NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  cost NUMERIC DEFAULT 0.00,
  service_provider TEXT,
  warranty_impact TEXT,
  next_maintenance_date DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on maintenance
ALTER TABLE public.pm_inv_maintenance ENABLE ROW LEVEL SECURITY;

-- Create policies for maintenance
CREATE POLICY "Users can manage maintenance for their items" 
ON public.pm_inv_maintenance 
FOR ALL 
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Create triggers for updated_at columns
CREATE TRIGGER update_pm_inv_categories_updated_at
  BEFORE UPDATE ON public.pm_inv_categories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pm_inv_items_updated_at
  BEFORE UPDATE ON public.pm_inv_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pm_inv_locations_updated_at
  BEFORE UPDATE ON public.pm_inv_locations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pm_inv_maintenance_updated_at
  BEFORE UPDATE ON public.pm_inv_maintenance
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();