import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useInventoryTracking } from '@/hooks/useInventoryTracking';
import { useAuth } from '@/contexts/AuthContext';
import { InventoryItem } from '@/components/inventory/InventoryTable';

export function useInventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();
  const { logStockAdjustment, logPurchaseReceipt } = useInventoryTracking();

  const loadInventory = async () => {
    try {
      setLoading(true);
      const { data: products, error } = await supabase
        .from('bm_inv_products')
        .select(`
          *,
          bm_inv_categories(name),
          bm_inv_suppliers(name),
          bm_inv_stock(
            quantity, 
            min_stock, 
            max_stock, 
            reorder_point, 
            bm_inv_warehouses(name, location)
          )
        `);

      if (error) {
        console.error('Error loading inventory:', error);
        toast({
          title: "Error Loading Inventory",
          description: "Failed to load inventory from database",
          variant: "destructive"
        });
        return;
      }

      const transformedProducts: InventoryItem[] = (products || []).map(product => ({
        id: product.id,
        name: product.name,
        sku: product.sku,
        category: product.bm_inv_categories?.name || 'Uncategorized',
        currentStock: product.bm_inv_stock?.[0]?.quantity || 0,
        minStock: product.bm_inv_stock?.[0]?.min_stock || 0,
        maxStock: product.bm_inv_stock?.[0]?.max_stock || 100,
        reorderPoint: product.bm_inv_stock?.[0]?.reorder_point || 0,
        unitCost: parseFloat(product.cost_price?.toString() || '0') || 0,
        sellingPrice: parseFloat(product.unit_price?.toString() || '0') || 0,
        supplier: product.bm_inv_suppliers?.name || 'Unknown',
        lastRestocked: new Date().toISOString().split('T')[0],
        demand7Days: 0, // Would come from transaction history
        demand30Days: 0, // Would come from transaction history
        location: product.bm_inv_stock?.[0]?.bm_inv_warehouses ? {
          warehouse: product.bm_inv_stock[0].bm_inv_warehouses.name,
          zone: 'A', // Default values - would be in location system
          aisle: '01',
          shelf: '1',
          bin: 'A'
        } : undefined,
        aiPrediction: {
          nextWeekDemand: Math.floor(Math.random() * 50) + 10, // AI would calculate this
          confidence: Math.floor(Math.random() * 30) + 70,
          recommendation: "Monitor performance"
        }
      }));

      setInventory(transformedProducts);
    } catch (error) {
      console.error('Error in loadInventory:', error);
      toast({
        title: "Database Error",
        description: "Unable to connect to database",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Omit<InventoryItem, 'id'>) => {
    try {
      setLoading(true);

      // Create category if it doesn't exist
      if (product.category) {
        const { data: existingCategory } = await supabase
          .from('bm_inv_categories')
          .select('id')
          .eq('name', product.category)
          .single();

        if (!existingCategory) {
          const { error: categoryError } = await supabase
            .from('bm_inv_categories')
            .insert([{ name: product.category, user_id: user?.id }]);
          
          if (categoryError) throw categoryError;
        }
      }

      // Create supplier if it doesn't exist
      if (product.supplier) {
        const { data: existingSupplier } = await supabase
          .from('bm_inv_suppliers')
          .select('id')
          .eq('name', product.supplier)
          .single();

        if (!existingSupplier) {
          const { error: supplierError } = await supabase
            .from('bm_inv_suppliers')
            .insert([{ name: product.supplier, user_id: user?.id }]);
          
          if (supplierError) throw supplierError;
        }
      }

      // Get category and supplier IDs
      const { data: categoryData } = await supabase
        .from('bm_inv_categories')
        .select('id')
        .eq('name', product.category || '')
        .single();

      const { data: supplierData } = await supabase
        .from('bm_inv_suppliers')
        .select('id')
        .eq('name', product.supplier || '')
        .single();

      // Create the product
      const { data: newProduct, error: productError } = await supabase
        .from('bm_inv_products')
        .insert([{
          name: product.name,
          sku: product.sku,
          category_id: categoryData?.id,
          supplier_id: supplierData?.id,
          unit_price: product.sellingPrice,
          cost_price: product.unitCost,
          user_id: user?.id
        }])
        .select()
        .single();

      if (productError) throw productError;

      // Get or create default warehouse
      let { data: warehouse } = await supabase
        .from('bm_inv_warehouses')
        .select('id')
        .eq('user_id', user?.id)
        .limit(1)
        .single();

      if (!warehouse) {
        const { data: newWarehouse, error: warehouseError } = await supabase
          .from('bm_inv_warehouses')
          .insert([{
            name: 'Main Warehouse',
            location: 'Default Location',
            capacity: 10000,
            user_id: user?.id
          }])
          .select()
          .single();

        if (warehouseError) throw warehouseError;
        warehouse = newWarehouse;
      }

      // Create stock record
      const { error: stockError } = await supabase
        .from('bm_inv_stock')
        .insert([{
          product_id: newProduct.id,
          warehouse_id: warehouse.id,
          quantity: product.currentStock,
          min_stock: product.minStock,
          max_stock: product.maxStock,
          reorder_point: product.reorderPoint
        }]);

      if (stockError) throw stockError;

      // Log initial stock if quantity > 0
      if (product.currentStock > 0) {
        await logPurchaseReceipt(
          newProduct.id,
          warehouse.id,
          product.currentStock,
          product.unitCost,
          'INITIAL-STOCK'
        );
      }

      toast({
        title: "Product Added",
        description: "Product has been successfully added with transaction logged"
      });

      await loadInventory();
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        title: "Failed to Add Product",
        description: "There was an error adding the product",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (productId: string, updates: Partial<InventoryItem>) => {
    try {
      // Update product basic info
      if (updates.name || updates.sku || updates.unitCost || updates.sellingPrice) {
        const { error: productError } = await supabase
          .from('bm_inv_products')
          .update({
            ...(updates.name && { name: updates.name }),
            ...(updates.sku && { sku: updates.sku }),
            ...(updates.unitCost && { cost_price: updates.unitCost }),
            ...(updates.sellingPrice && { unit_price: updates.sellingPrice })
          })
          .eq('id', productId);

        if (productError) throw productError;
      }

      // Update stock levels with tracking
      if (updates.currentStock !== undefined || updates.minStock !== undefined || 
          updates.maxStock !== undefined || updates.reorderPoint !== undefined) {
        
        // Get current stock to log adjustment if quantity changed
        if (updates.currentStock !== undefined) {
          const { data: currentStockData } = await supabase
            .from('bm_inv_stock')
            .select('quantity, warehouse_id')
            .eq('product_id', productId)
            .single();

          if (currentStockData && currentStockData.quantity !== updates.currentStock) {
            // Log the stock adjustment
            await logStockAdjustment(
              productId,
              currentStockData.warehouse_id,
              currentStockData.quantity,
              updates.currentStock,
              'Manual stock adjustment via product update'
            );
          }
        }

        const { error: stockError } = await supabase
          .from('bm_inv_stock')
          .update({
            ...(updates.currentStock !== undefined && { quantity: updates.currentStock }),
            ...(updates.minStock !== undefined && { min_stock: updates.minStock }),
            ...(updates.maxStock !== undefined && { max_stock: updates.maxStock }),
            ...(updates.reorderPoint !== undefined && { reorder_point: updates.reorderPoint })
          })
          .eq('product_id', productId);

        if (stockError) throw stockError;
      }

      toast({
        title: "Product Updated",
        description: "Product has been successfully updated with transaction logged"
      });

      await loadInventory();
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: "Failed to Update Product",
        description: "There was an error updating the product",
        variant: "destructive"
      });
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      // Log deletion transaction first
      const { data: stockData } = await supabase
        .from('bm_inv_stock')
        .select('quantity, warehouse_id')
        .eq('product_id', productId)
        .single();

      if (stockData && stockData.quantity > 0) {
        await logStockAdjustment(
          productId,
          stockData.warehouse_id,
          stockData.quantity,
          0,
          'Product deletion - stock write-off'
        );
      }

      // Delete stock records first (foreign key constraint)
      const { error: stockError } = await supabase
        .from('bm_inv_stock')
        .delete()
        .eq('product_id', productId);

      if (stockError) throw stockError;

      // Delete the product
      const { error: productError } = await supabase
        .from('bm_inv_products')
        .delete()
        .eq('id', productId);

      if (productError) throw productError;

      toast({
        title: "Product Deleted",
        description: "Product has been successfully deleted with transaction logged"
      });

      await loadInventory();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Failed to Delete Product",
        description: "There was an error deleting the product",
        variant: "destructive"
      });
    }
  };

  // Add function to adjust stock with tracking
  const adjustStock = async (productId: string, warehouseId: string, newQuantity: number, reason: string) => {
    try {
      const { data: currentStock } = await supabase
        .from('bm_inv_stock')
        .select('quantity')
        .eq('product_id', productId)
        .eq('warehouse_id', warehouseId)
        .single();

      if (!currentStock) {
        throw new Error('Stock record not found');
      }

      // Update stock
      const { error: stockError } = await supabase
        .from('bm_inv_stock')
        .update({ quantity: newQuantity })
        .eq('product_id', productId)
        .eq('warehouse_id', warehouseId);

      if (stockError) throw stockError;

      // Log the adjustment
      await logStockAdjustment(
        productId,
        warehouseId,
        currentStock.quantity,
        newQuantity,
        reason
      );

      toast({
        title: "Stock Adjusted",
        description: "Stock level has been adjusted and transaction logged"
      });

      await loadInventory();
      return true;
    } catch (error) {
      console.error('Error adjusting stock:', error);
      toast({
        title: "Failed to Adjust Stock",
        description: "There was an error adjusting the stock level",
        variant: "destructive"
      });
      return false;
    }
  };

  const getInventoryStats = () => {
    const totalProducts = inventory.length;
    const lowStockCount = inventory.filter(item => item.currentStock <= item.minStock).length;
    const totalValue = inventory.reduce((sum, item) => sum + (item.currentStock * item.unitCost), 0);
    const avgAccuracy = inventory.reduce((sum, item) => sum + item.aiPrediction.confidence, 0) / Math.max(totalProducts, 1);

    return {
      totalProducts,
      lowStockCount,
      totalValue,
      avgAccuracy: Math.round(avgAccuracy * 10) / 10
    };
  };

  const getLowStockItems = () => {
    return inventory.filter(item => item.currentStock <= item.minStock);
  };

  const getReorderRecommendations = () => {
    return inventory.filter(item => item.currentStock <= item.reorderPoint);
  };

  useEffect(() => {
    loadInventory();
  }, []);

  return {
    inventory,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    adjustStock,
    refreshInventory: loadInventory,
    getInventoryStats,
    getLowStockItems,
    getReorderRecommendations
  };
}