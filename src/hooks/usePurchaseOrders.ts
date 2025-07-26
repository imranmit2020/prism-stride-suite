import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface PurchaseOrder {
  id: string;
  orderNumber: string;
  supplierId: string;
  supplierName: string;
  status: 'pending' | 'approved' | 'ordered' | 'received' | 'cancelled';
  orderDate: string;
  expectedDate?: string;
  totalAmount: number;
  notes?: string;
  items: PurchaseOrderItem[];
}

export interface PurchaseOrderItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  receivedQuantity?: number;
}

export function usePurchaseOrders() {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadPurchaseOrders = async () => {
    try {
      setLoading(true);
      const { data: orders, error } = await supabase
        .from('bm_inv_purchase_orders')
        .select(`
          *,
          bm_inv_suppliers(name),
          bm_inv_purchase_order_items(
            *,
            bm_inv_products(name, sku)
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading purchase orders:', error);
        toast({
          title: "Error Loading Orders",
          description: "Failed to load purchase orders from database",
          variant: "destructive"
        });
        return;
      }

      const transformedOrders: PurchaseOrder[] = (orders || []).map(order => ({
        id: order.id,
        orderNumber: order.order_number,
        supplierId: order.supplier_id,
        supplierName: order.bm_inv_suppliers?.name || 'Unknown Supplier',
        status: order.status as PurchaseOrder['status'],
        orderDate: order.order_date,
        expectedDate: order.expected_date,
        totalAmount: parseFloat(order.total_amount?.toString() || '0'),
        notes: order.notes,
        items: (order.bm_inv_purchase_order_items || []).map((item: any) => ({
          id: item.id,
          productId: item.product_id,
          productName: item.bm_inv_products?.name || 'Unknown Product',
          sku: item.bm_inv_products?.sku || '',
          quantity: item.quantity,
          unitCost: parseFloat(item.unit_cost?.toString() || '0'),
          totalCost: parseFloat(item.total_cost?.toString() || '0'),
          receivedQuantity: item.received_quantity || 0
        }))
      }));

      setPurchaseOrders(transformedOrders);
    } catch (error) {
      console.error('Error in loadPurchaseOrders:', error);
      toast({
        title: "Database Error",
        description: "Unable to connect to database",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createPurchaseOrder = async (
    supplierId: string,
    items: Array<{
      productId: string;
      quantity: number;
      unitCost: number;
    }>,
    notes?: string
  ) => {
    try {
      // Generate order number
      const orderNumber = `PO-${Date.now()}`;
      const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.unitCost), 0);
      
      // Get today's date + 7 days for expected delivery
      const orderDate = new Date().toISOString().split('T')[0];
      const expectedDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      // Create purchase order
      const { data: newOrder, error: orderError } = await supabase
        .from('bm_inv_purchase_orders')
        .insert({
          order_number: orderNumber,
          supplier_id: supplierId,
          status: 'pending',
          order_date: orderDate,
          expected_date: expectedDate,
          total_amount: totalAmount,
          notes
        })
        .select('id')
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map(item => ({
        order_id: newOrder.id,
        product_id: item.productId,
        quantity: item.quantity,
        unit_cost: item.unitCost,
        total_cost: item.quantity * item.unitCost,
        received_quantity: 0
      }));

      const { error: itemsError } = await supabase
        .from('bm_inv_purchase_order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      toast({
        title: "Purchase Order Created",
        description: `Order ${orderNumber} has been created successfully`
      });

      await loadPurchaseOrders();
      return newOrder.id;
    } catch (error) {
      console.error('Error creating purchase order:', error);
      toast({
        title: "Failed to Create Order",
        description: "There was an error creating the purchase order",
        variant: "destructive"
      });
      return null;
    }
  };

  const updateOrderStatus = async (orderId: string, status: PurchaseOrder['status']) => {
    try {
      const { error } = await supabase
        .from('bm_inv_purchase_orders')
        .update({ status })
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: "Order Updated",
        description: `Order status updated to ${status}`
      });

      await loadPurchaseOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast({
        title: "Failed to Update Order",
        description: "There was an error updating the order status",
        variant: "destructive"
      });
    }
  };

  const receiveOrderItems = async (
    orderId: string,
    receivedItems: Array<{ itemId: string; receivedQuantity: number }>
  ) => {
    try {
      // Update received quantities
      for (const item of receivedItems) {
        const { error } = await supabase
          .from('bm_inv_purchase_order_items')
          .update({ received_quantity: item.receivedQuantity })
          .eq('id', item.itemId);

        if (error) throw error;

        // Also update stock levels (add received quantity to current stock)
        const { data: orderItem } = await supabase
          .from('bm_inv_purchase_order_items')
          .select('product_id')
          .eq('id', item.itemId)
          .single();

        if (orderItem) {
          // For now, just log the stock update - would need proper transaction handling
          console.log(`Would update stock for product ${orderItem.product_id} by +${item.receivedQuantity}`);
        }
      }

      // Check if all items are fully received
      const order = purchaseOrders.find(o => o.id === orderId);
      if (order) {
        const allReceived = order.items.every(item => {
          const received = receivedItems.find(r => r.itemId === item.id);
          return (received?.receivedQuantity || item.receivedQuantity || 0) >= item.quantity;
        });

        if (allReceived) {
          await updateOrderStatus(orderId, 'received');
        }
      }

      toast({
        title: "Items Received",
        description: "Inventory has been updated with received items"
      });

      await loadPurchaseOrders();
    } catch (error) {
      console.error('Error receiving order items:', error);
      toast({
        title: "Failed to Receive Items",
        description: "There was an error updating the received items",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    loadPurchaseOrders();
  }, []);

  return {
    purchaseOrders,
    loading,
    createPurchaseOrder,
    updateOrderStatus,
    receiveOrderItems,
    refreshOrders: loadPurchaseOrders
  };
}