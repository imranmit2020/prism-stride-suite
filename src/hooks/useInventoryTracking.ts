import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface TransactionRecord {
  productId: string;
  warehouseId: string;
  transactionType: 'stock_in' | 'stock_out' | 'transfer' | 'adjustment' | 'purchase' | 'sale' | 'return' | 'waste';
  quantity: number;
  unitCost?: number;
  referenceNumber?: string;
  notes?: string;
  userId?: string;
}

export function useInventoryTracking() {
  const { toast } = useToast();

  // Log a new inventory transaction
  const logTransaction = async (transaction: TransactionRecord) => {
    try {
      const { error } = await supabase
        .from('bm_inv_transactions')
        .insert([{
          product_id: transaction.productId,
          warehouse_id: transaction.warehouseId,
          transaction_type: transaction.transactionType,
          quantity: transaction.quantity,
          unit_cost: transaction.unitCost,
          reference_number: transaction.referenceNumber,
          notes: transaction.notes,
          user_id: transaction.userId,
        }]);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error logging transaction:', error);
      return false;
    }
  };

  // Log stock adjustment (when manually updating quantities)
  const logStockAdjustment = async (
    productId: string, 
    warehouseId: string, 
    oldQuantity: number, 
    newQuantity: number, 
    reason: string
  ) => {
    const quantityDiff = newQuantity - oldQuantity;
    
    return await logTransaction({
      productId,
      warehouseId,
      transactionType: 'adjustment',
      quantity: quantityDiff,
      notes: `Stock adjustment: ${reason}. Changed from ${oldQuantity} to ${newQuantity}`,
    });
  };

  // Log purchase receipt
  const logPurchaseReceipt = async (
    productId: string,
    warehouseId: string,
    quantity: number,
    unitCost: number,
    purchaseOrderNumber?: string
  ) => {
    return await logTransaction({
      productId,
      warehouseId,
      transactionType: 'purchase',
      quantity: Math.abs(quantity),
      unitCost,
      referenceNumber: purchaseOrderNumber,
      notes: `Purchase receipt${purchaseOrderNumber ? ` for PO ${purchaseOrderNumber}` : ''}`,
    });
  };

  // Log sale/stock out
  const logSale = async (
    productId: string,
    warehouseId: string,
    quantity: number,
    saleOrderNumber?: string
  ) => {
    return await logTransaction({
      productId,
      warehouseId,
      transactionType: 'sale',
      quantity: -Math.abs(quantity), // Negative for outgoing
      referenceNumber: saleOrderNumber,
      notes: `Sale${saleOrderNumber ? ` - Order ${saleOrderNumber}` : ''}`,
    });
  };

  // Log transfer between warehouses
  const logTransfer = async (
    productId: string,
    fromWarehouseId: string,
    toWarehouseId: string,
    quantity: number,
    transferNumber?: string
  ) => {
    const transferRef = transferNumber || `TXF-${Date.now()}`;
    
    // Log outgoing from source warehouse
    await logTransaction({
      productId,
      warehouseId: fromWarehouseId,
      transactionType: 'transfer',
      quantity: -Math.abs(quantity),
      referenceNumber: transferRef,
      notes: `Transfer out to warehouse`,
    });

    // Log incoming to destination warehouse
    return await logTransaction({
      productId,
      warehouseId: toWarehouseId,
      transactionType: 'transfer',
      quantity: Math.abs(quantity),
      referenceNumber: transferRef,
      notes: `Transfer in from warehouse`,
    });
  };

  // Log return (customer return or supplier return)
  const logReturn = async (
    productId: string,
    warehouseId: string,
    quantity: number,
    returnType: 'customer' | 'supplier',
    returnNumber?: string
  ) => {
    return await logTransaction({
      productId,
      warehouseId,
      transactionType: 'return',
      quantity: returnType === 'customer' ? Math.abs(quantity) : -Math.abs(quantity),
      referenceNumber: returnNumber,
      notes: `${returnType === 'customer' ? 'Customer' : 'Supplier'} return${returnNumber ? ` - ${returnNumber}` : ''}`,
    });
  };

  // Log waste/damaged goods
  const logWaste = async (
    productId: string,
    warehouseId: string,
    quantity: number,
    reason: string
  ) => {
    return await logTransaction({
      productId,
      warehouseId,
      transactionType: 'waste',
      quantity: -Math.abs(quantity),
      notes: `Waste/Damage: ${reason}`,
    });
  };

  // Enhanced stock update with automatic transaction logging
  const updateStockWithTracking = async (
    productId: string,
    warehouseId: string,
    newQuantity: number,
    transactionType: TransactionRecord['transactionType'],
    options?: {
      unitCost?: number;
      referenceNumber?: string;
      notes?: string;
      skipTransactionLog?: boolean;
    }
  ) => {
    try {
      // Get current stock level
      const { data: currentStock, error: stockError } = await supabase
        .from('bm_inv_stock')
        .select('quantity')
        .eq('product_id', productId)
        .eq('warehouse_id', warehouseId)
        .single();

      if (stockError && stockError.code !== 'PGRST116') {
        throw stockError;
      }

      const oldQuantity = currentStock?.quantity || 0;
      const quantityDiff = newQuantity - oldQuantity;

      // Update stock in database
      const { error: updateError } = await supabase
        .from('bm_inv_stock')
        .upsert({
          product_id: productId,
          warehouse_id: warehouseId,
          quantity: newQuantity,
          updated_at: new Date().toISOString()
        });

      if (updateError) throw updateError;

      // Log the transaction unless explicitly skipped
      if (!options?.skipTransactionLog) {
        await logTransaction({
          productId,
          warehouseId,
          transactionType,
          quantity: quantityDiff,
          unitCost: options?.unitCost,
          referenceNumber: options?.referenceNumber,
          notes: options?.notes || `Stock update: ${oldQuantity} → ${newQuantity}`,
        });
      }

      toast({
        title: "Stock Updated",
        description: `Stock level updated and transaction logged`,
      });

      return true;
    } catch (error) {
      console.error('Error updating stock with tracking:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update stock level",
        variant: "destructive"
      });
      return false;
    }
  };

  return {
    logTransaction,
    logStockAdjustment,
    logPurchaseReceipt,
    logSale,
    logTransfer,
    logReturn,
    logWaste,
    updateStockWithTracking
  };
}