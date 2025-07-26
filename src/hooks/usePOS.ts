import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface POSProduct {
  id: string;
  product_code: string;
  name: string;
  description?: string;
  price: number;
  cost_price?: number;
  category: string;
  stock_quantity: number;
  barcode?: string;
  image_url?: string;
  is_active: boolean;
  tax_rate?: number;
  created_at: string;
  updated_at: string;
}

export interface POSCustomer {
  id: string;
  customer_code: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  date_of_birth?: string;
  loyalty_points: number;
  total_spent: number;
  visit_count: number;
  last_visit?: string;
  is_active: boolean;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface POSTransaction {
  id: string;
  transaction_number: string;
  customer_id?: string;
  cashier_id?: string;
  subtotal: number;
  tax_amount: number;
  discount_amount?: number;
  total_amount: number;
  payment_method: 'cash' | 'card' | 'digital' | 'loyalty_points' | 'mixed';
  payment_status: 'pending' | 'completed' | 'refunded' | 'cancelled';
  cash_received?: number;
  change_given?: number;
  receipt_number?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface POSTransactionItem {
  id: string;
  transaction_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  discount_amount?: number;
  tax_amount?: number;
  line_total: number;
  created_at: string;
}

export interface POSCategory {
  id: string;
  name: string;
  description?: string;
  color?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export function usePOS() {
  const [products, setProducts] = useState<POSProduct[]>([]);
  const [customers, setCustomers] = useState<POSCustomer[]>([]);
  const [transactions, setTransactions] = useState<POSTransaction[]>([]);
  const [categories, setCategories] = useState<POSCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('bm_pos_products')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setProducts((data || []) as POSProduct[]);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive"
      });
    }
  };

  // Fetch all customers
  const fetchCustomers = async () => {
    try {
      const { data, error } = await supabase
        .from('bm_pos_customers')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setCustomers((data || []) as POSCustomer[]);
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast({
        title: "Error",
        description: "Failed to fetch customers",
        variant: "destructive"
      });
    }
  };

  // Fetch all transactions
  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('bm_pos_transactions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTransactions((data || []) as POSTransaction[]);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast({
        title: "Error",
        description: "Failed to fetch transactions",
        variant: "destructive"
      });
    }
  };

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('bm_pos_categories')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setCategories((data || []) as POSCategory[]);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: "Error",
        description: "Failed to fetch categories",
        variant: "destructive"
      });
    }
  };

  // Create a new product
  const createProduct = async (product: Omit<POSProduct, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('bm_pos_products')
        .insert([{ ...product, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      setProducts(prev => [...prev, data as POSProduct]);
      toast({
        title: "Success",
        description: "Product created successfully"
      });
      return data;
    } catch (error) {
      console.error('Error creating product:', error);
      toast({
        title: "Error",
        description: "Failed to create product",
        variant: "destructive"
      });
      throw error;
    }
  };

  // Update a product
  const updateProduct = async (id: string, updates: Partial<POSProduct>) => {
    try {
      const { data, error } = await supabase
        .from('bm_pos_products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setProducts(prev => prev.map(prod => prod.id === id ? data as POSProduct : prod));
      toast({
        title: "Success",
        description: "Product updated successfully"
      });
      return data;
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "destructive"
      });
      throw error;
    }
  };

  // Create a new customer
  const createCustomer = async (customer: Omit<POSCustomer, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('bm_pos_customers')
        .insert([{ ...customer, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      setCustomers(prev => [...prev, data as POSCustomer]);
      toast({
        title: "Success",
        description: "Customer created successfully"
      });
      return data;
    } catch (error) {
      console.error('Error creating customer:', error);
      toast({
        title: "Error",
        description: "Failed to create customer",
        variant: "destructive"
      });
      throw error;
    }
  };

  // Create a new transaction
  const createTransaction = async (
    transaction: Omit<POSTransaction, 'id' | 'created_at' | 'updated_at'>,
    items: Omit<POSTransactionItem, 'id' | 'transaction_id' | 'created_at'>[]
  ) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Create transaction
      const { data: transactionData, error: transactionError } = await supabase
        .from('bm_pos_transactions')
        .insert([{ ...transaction, user_id: user.id }])
        .select()
        .single();

      if (transactionError) throw transactionError;

      // Create transaction items
      const transactionItems = items.map(item => ({
        ...item,
        transaction_id: transactionData.id
      }));

      const { error: itemsError } = await supabase
        .from('bm_pos_transaction_items')
        .insert(transactionItems);

      if (itemsError) throw itemsError;

      // Update product stock
      for (const item of items) {
        const product = products.find(p => p.id === item.product_id);
        if (product) {
          await supabase
            .from('bm_pos_products')
            .update({
              stock_quantity: Math.max(0, product.stock_quantity - item.quantity)
            })
            .eq('id', item.product_id);
        }
      }

      setTransactions(prev => [transactionData as POSTransaction, ...prev]);
      await fetchProducts(); // Refresh products to get updated stock

      toast({
        title: "Success",
        description: "Transaction completed successfully"
      });
      return transactionData;
    } catch (error) {
      console.error('Error creating transaction:', error);
      toast({
        title: "Error",
        description: "Failed to complete transaction",
        variant: "destructive"
      });
      throw error;
    }
  };

  // Create a new category
  const createCategory = async (category: Omit<POSCategory, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('bm_pos_categories')
        .insert([{ ...category, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      setCategories(prev => [...prev, data as POSCategory]);
      toast({
        title: "Success",
        description: "Category created successfully"
      });
      return data;
    } catch (error) {
      console.error('Error creating category:', error);
      toast({
        title: "Error",
        description: "Failed to create category",
        variant: "destructive"
      });
      throw error;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchProducts(),
        fetchCustomers(),
        fetchTransactions(),
        fetchCategories()
      ]);
      setLoading(false);
    };

    loadData();
  }, []);

  return {
    products,
    customers,
    transactions,
    categories,
    loading,
    createProduct,
    updateProduct,
    createCustomer,
    createTransaction,
    createCategory,
    refetch: async () => {
      await Promise.all([
        fetchProducts(),
        fetchCustomers(),
        fetchTransactions(),
        fetchCategories()
      ]);
    }
  };
}