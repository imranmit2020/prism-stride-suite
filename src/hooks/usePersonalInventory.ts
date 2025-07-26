import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface PersonalInventoryItem {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  category_id?: string;
  category?: {
    id: string;
    name: string;
    color?: string;
  };
  brand?: string;
  model?: string;
  serial_number?: string;
  purchase_date?: string;
  purchase_price?: number;
  current_value?: number;
  condition?: string;
  location?: string;
  room?: string;
  warranty_expiry?: string;
  notes?: string;
  image_url?: string;
  is_insured?: boolean;
  insurance_policy?: string;
  replacement_cost?: number;
  depreciation_rate?: number;
  tags?: string[];
  is_active?: boolean;
  created_at: string;
  updated_at: string;
}

export interface PersonalInventoryCategory {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  color?: string;
  is_active?: boolean;
  created_at: string;
  updated_at: string;
}

export interface PersonalInventoryLocation {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  room_type?: string;
  floor_level?: number;
  is_active?: boolean;
  created_at: string;
  updated_at: string;
}

export function usePersonalInventory() {
  const [items, setItems] = useState<PersonalInventoryItem[]>([]);
  const [categories, setCategories] = useState<PersonalInventoryCategory[]>([]);
  const [locations, setLocations] = useState<PersonalInventoryLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load data
  const loadData = async () => {
    try {
      setLoading(true);
      console.log('🏠 Loading personal inventory data...');
      
      // Load categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('pm_inv_categories')
        .select('*')
        .eq('is_active', true)
        .order('name');

      console.log('🏠 Categories loaded:', categoriesData?.length || 0, categoriesError);

      if (categoriesError) throw categoriesError;
      setCategories(categoriesData || []);

      // Load locations
      const { data: locationsData, error: locationsError } = await supabase
        .from('pm_inv_locations')
        .select('*')
        .eq('is_active', true)
        .order('name');

      console.log('🏠 Locations loaded:', locationsData?.length || 0, locationsError);
      if (locationsError) throw locationsError;
      setLocations(locationsData || []);

      // Load items with categories
      const { data: itemsData, error: itemsError } = await supabase
        .from('pm_inv_items')
        .select(`
          *,
          category:pm_inv_categories(id, name, color)
        `)
        .eq('is_active', true)
        .order('name');

      console.log('🏠 Items loaded:', itemsData?.length || 0, itemsError);
      if (itemsError) throw itemsError;
      setItems(itemsData || []);

    } catch (error) {
      console.error('Error loading personal inventory:', error);
      toast({
        title: "Error",
        description: "Failed to load inventory data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Add item
  const addItem = async (item: Omit<PersonalInventoryItem, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('pm_inv_items')
        .insert([{
          ...item,
          user_id: (await supabase.auth.getUser()).data.user?.id,
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Item added successfully",
      });

      await loadData();
      return data;
    } catch (error) {
      console.error('Error adding item:', error);
      toast({
        title: "Error",
        description: "Failed to add item",
        variant: "destructive",
      });
    }
  };

  // Update item
  const updateItem = async (itemId: string, updates: Partial<PersonalInventoryItem>) => {
    try {
      const { error } = await supabase
        .from('pm_inv_items')
        .update(updates)
        .eq('id', itemId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Item updated successfully",
      });

      await loadData();
    } catch (error) {
      console.error('Error updating item:', error);
      toast({
        title: "Error",
        description: "Failed to update item",
        variant: "destructive",
      });
    }
  };

  // Delete item
  const deleteItem = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('pm_inv_items')
        .update({ is_active: false })
        .eq('id', itemId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Item deleted successfully",
      });

      await loadData();
    } catch (error) {
      console.error('Error deleting item:', error);
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      });
    }
  };

  // Add category
  const addCategory = async (category: Omit<PersonalInventoryCategory, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('pm_inv_categories')
        .insert([{
          ...category,
          user_id: (await supabase.auth.getUser()).data.user?.id,
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Category added successfully",
      });

      await loadData();
      return data;
    } catch (error) {
      console.error('Error adding category:', error);
      toast({
        title: "Error",
        description: "Failed to add category",
        variant: "destructive",
      });
    }
  };

  // Get inventory stats
  const getInventoryStats = () => {
    const totalItems = items.length;
    const totalValue = items.reduce((sum, item) => sum + (item.current_value || 0), 0);
    const needReplacement = items.filter(item => item.condition === 'Poor' || item.condition === 'Damaged').length;
    const totalDepreciation = items.reduce((sum, item) => {
      const purchasePrice = item.purchase_price || 0;
      const currentValue = item.current_value || 0;
      return sum + (purchasePrice - currentValue);
    }, 0);

    return {
      totalItems,
      totalValue,
      needReplacement,
      totalDepreciation
    };
  };

  // Get items by category
  const getItemsByCategory = () => {
    const categoryStats = categories.map(category => {
      const categoryItems = items.filter(item => item.category_id === category.id);
      const totalValue = categoryItems.reduce((sum, item) => sum + (item.current_value || 0), 0);
      const avgCondition = categoryItems.length > 0 
        ? categoryItems.reduce((sum, item) => {
            const conditionScore = { 'Excellent': 5, 'Good': 4, 'Fair': 3, 'Poor': 2, 'Damaged': 1 };
            return sum + (conditionScore[item.condition as keyof typeof conditionScore] || 3);
          }, 0) / categoryItems.length
        : 0;
      
      const conditionMap = { 5: 'Excellent', 4: 'Good', 3: 'Fair', 2: 'Poor', 1: 'Damaged' };
      const roundedCondition = Math.round(avgCondition);
      
      return {
        category: category.name,
        items: categoryItems.length,
        value: totalValue,
        condition: conditionMap[roundedCondition as keyof typeof conditionMap] || 'Good'
      };
    });

    return categoryStats;
  };

  return {
    items,
    categories,
    locations,
    loading,
    addItem,
    updateItem,
    deleteItem,
    addCategory,
    getInventoryStats,
    getItemsByCategory,
    refreshData: loadData
  };
}