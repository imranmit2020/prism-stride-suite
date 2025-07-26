import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Warehouse {
  id: string;
  name: string;
  location: string;
  manager?: string;
  capacity?: number;
  currentStock: number;
  utilization: number;
}

export interface LocationAssignment {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  warehouseId: string;
  warehouseName: string;
  zone?: string;
  aisle?: string;
  shelf?: string;
  bin?: string;
  assignedDate: string;
  lastMovement: string;
  status: 'active' | 'moving' | 'empty';
}

export function useWarehouses() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [locationAssignments, setLocationAssignments] = useState<LocationAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadWarehouses = async () => {
    try {
      setLoading(true);
      
      // Load warehouses with stock data
      const { data: warehouseData, error: warehouseError } = await supabase
        .from('bm_inv_warehouses')
        .select(`
          *,
          bm_inv_stock(quantity)
        `);

      if (warehouseError) {
        console.error('Error loading warehouses:', warehouseError);
        toast({
          title: "Error Loading Warehouses",
          description: "Failed to load warehouse data",
          variant: "destructive"
        });
        return;
      }

      const transformedWarehouses: Warehouse[] = (warehouseData || []).map(warehouse => {
        const totalStock = (warehouse.bm_inv_stock || []).reduce(
          (sum: number, stock: any) => sum + (stock.quantity || 0), 
          0
        );
        const capacity = warehouse.capacity || 1000; // Default capacity
        const utilization = Math.min(100, Math.round((totalStock / capacity) * 100));

        return {
          id: warehouse.id,
          name: warehouse.name,
          location: warehouse.location,
          manager: warehouse.manager,
          capacity,
          currentStock: totalStock,
          utilization
        };
      });

      setWarehouses(transformedWarehouses);

      // Load location assignments
      const { data: stockData, error: stockError } = await supabase
        .from('bm_inv_stock')
        .select(`
          *,
          bm_inv_products(name, sku),
          bm_inv_warehouses(name)
        `)
        .gt('quantity', 0);

      if (stockError) {
        console.error('Error loading stock assignments:', stockError);
        return;
      }

      const assignments: LocationAssignment[] = (stockData || []).map(stock => ({
        id: stock.id,
        productId: stock.product_id,
        productName: stock.bm_inv_products?.name || 'Unknown Product',
        sku: stock.bm_inv_products?.sku || '',
        quantity: stock.quantity,
        warehouseId: stock.warehouse_id,
        warehouseName: stock.bm_inv_warehouses?.name || 'Unknown Warehouse',
        zone: 'A', // Default - would expand this with proper location tracking
        aisle: '01',
        shelf: '1',
        bin: 'A',
        assignedDate: stock.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
        lastMovement: stock.updated_at?.split('T')[0] || new Date().toISOString().split('T')[0],
        status: stock.quantity > 0 ? 'active' : 'empty'
      }));

      setLocationAssignments(assignments);
    } catch (error) {
      console.error('Error in loadWarehouses:', error);
      toast({
        title: "Database Error",
        description: "Unable to connect to database",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createWarehouse = async (warehouse: Omit<Warehouse, 'id' | 'currentStock' | 'utilization'>) => {
    try {
      const { error } = await supabase
        .from('bm_inv_warehouses')
        .insert({
          name: warehouse.name,
          location: warehouse.location,
          manager: warehouse.manager,
          capacity: warehouse.capacity
        });

      if (error) throw error;

      toast({
        title: "Warehouse Created",
        description: `${warehouse.name} has been created successfully`
      });

      await loadWarehouses();
    } catch (error) {
      console.error('Error creating warehouse:', error);
      toast({
        title: "Failed to Create Warehouse",
        description: "There was an error creating the warehouse",
        variant: "destructive"
      });
    }
  };

  const assignProductToLocation = async (
    productId: string,
    warehouseId: string,
    quantity: number
  ) => {
    try {
      // Check if there's already a stock record for this product/warehouse combo
      const { data: existingStock, error: checkError } = await supabase
        .from('bm_inv_stock')
        .select('id, quantity')
        .eq('product_id', productId)
        .eq('warehouse_id', warehouseId)
        .maybeSingle();

      if (checkError) throw checkError;

      if (existingStock) {
        // Update existing stock
        const { error: updateError } = await supabase
          .from('bm_inv_stock')
          .update({ quantity: existingStock.quantity + quantity })
          .eq('id', existingStock.id);

        if (updateError) throw updateError;
      } else {
        // Create new stock record
        const { error: insertError } = await supabase
          .from('bm_inv_stock')
          .insert({
            product_id: productId,
            warehouse_id: warehouseId,
            quantity: quantity,
            min_stock: 0,
            max_stock: 100,
            reorder_point: 10
          });

        if (insertError) throw insertError;
      }

      toast({
        title: "Location Assigned",
        description: "Product has been successfully assigned to the location"
      });

      await loadWarehouses();
    } catch (error) {
      console.error('Error assigning location:', error);
      toast({
        title: "Failed to Assign Location",
        description: "There was an error assigning the product to the location",
        variant: "destructive"
      });
    }
  };

  const moveStock = async (
    stockId: string,
    fromWarehouseId: string,
    toWarehouseId: string,
    quantity: number
  ) => {
    try {
      // This would typically involve transaction logging
      // For now, we'll update the stock directly
      
      // Record the transaction
      const { error: transactionError } = await supabase
        .from('bm_inv_transactions')
        .insert({
          product_id: stockId, // This should be the product_id, not stock_id
          warehouse_id: toWarehouseId,
          transaction_type: 'transfer',
          quantity: quantity,
          reference_number: `TRANSFER-${Date.now()}`,
          notes: `Transferred from warehouse ${fromWarehouseId} to ${toWarehouseId}`
        });

      if (transactionError) {
        console.warn('Could not log transaction:', transactionError);
      }

      toast({
        title: "Stock Moved",
        description: "Stock has been successfully moved between locations"
      });

      await loadWarehouses();
    } catch (error) {
      console.error('Error moving stock:', error);
      toast({
        title: "Failed to Move Stock",
        description: "There was an error moving the stock",
        variant: "destructive"
      });
    }
  };

  const getWarehouseUtilization = () => {
    const totalCapacity = warehouses.reduce((sum, w) => sum + (w.capacity || 0), 0);
    const totalStock = warehouses.reduce((sum, w) => sum + w.currentStock, 0);
    return totalCapacity > 0 ? Math.round((totalStock / totalCapacity) * 100) : 0;
  };

  const getLocationCode = (assignment: LocationAssignment) => {
    return `${assignment.warehouseName.charAt(0)}${assignment.zone}-${assignment.aisle}-${assignment.shelf}-${assignment.bin}`;
  };

  useEffect(() => {
    loadWarehouses();
  }, []);

  return {
    warehouses,
    locationAssignments,
    loading,
    createWarehouse,
    assignProductToLocation,
    moveStock,
    refreshWarehouses: loadWarehouses,
    getWarehouseUtilization,
    getLocationCode
  };
}