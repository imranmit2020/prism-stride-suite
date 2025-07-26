import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  Plus, 
  Minus, 
  ArrowRightLeft, 
  RotateCcw,
  TrendingUp,
  AlertTriangle 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useInventory } from "@/hooks/useInventory";
import { useWarehouses } from "@/hooks/useWarehouses";
import { useInventoryTracking } from "@/hooks/useInventoryTracking";

interface QuickTransaction {
  type: 'adjustment' | 'sale' | 'purchase' | 'transfer';
  productId: string;
  warehouseId: string;
  quantity: number;
  reason?: string;
  unitCost?: number;
  referenceNumber?: string;
}

export function QuickInventoryActions() {
  const { toast } = useToast();
  const { inventory, refreshInventory } = useInventory();
  const { warehouses } = useWarehouses();
  const { 
    logStockAdjustment, 
    logSale, 
    logPurchaseReceipt, 
    logTransfer, 
    updateStockWithTracking 
  } = useInventoryTracking();

  const [showQuickDialog, setShowQuickDialog] = useState(false);
  const [transactionType, setTransactionType] = useState<'adjustment' | 'sale' | 'purchase' | 'transfer'>('adjustment');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('');
  const [unitCost, setUnitCost] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');

  const handleQuickTransaction = async () => {
    try {
      if (!selectedProduct || !selectedWarehouse || !quantity) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }

      const quantityNum = parseInt(quantity);
      const unitCostNum = unitCost ? parseFloat(unitCost) : undefined;

      switch (transactionType) {
        case 'adjustment':
          await logStockAdjustment(
            selectedProduct,
            selectedWarehouse,
            0, // Current quantity will be fetched
            quantityNum,
            reason || 'Manual adjustment'
          );
          break;

        case 'sale':
          await logSale(
            selectedProduct,
            selectedWarehouse,
            quantityNum,
            referenceNumber
          );
          break;

        case 'purchase':
          await logPurchaseReceipt(
            selectedProduct,
            selectedWarehouse,
            quantityNum,
            unitCostNum || 0,
            referenceNumber
          );
          break;

        case 'transfer':
          // For transfers, we'd need source and destination warehouses
          // This is a simplified version
          await logTransfer(
            selectedProduct,
            selectedWarehouse,
            selectedWarehouse, // Same warehouse for demo
            quantityNum,
            referenceNumber
          );
          break;
      }

      // Update the actual stock
      await updateStockWithTracking(
        selectedProduct,
        selectedWarehouse,
        transactionType === 'sale' ? -quantityNum : quantityNum,
        transactionType,
        {
          unitCost: unitCostNum,
          referenceNumber,
          notes: reason
        }
      );

      toast({
        title: "Transaction Completed",
        description: `${transactionType} transaction has been logged and stock updated`,
      });

      // Reset form
      setSelectedProduct('');
      setSelectedWarehouse('');
      setQuantity('');
      setReason('');
      setUnitCost('');
      setReferenceNumber('');
      setShowQuickDialog(false);
      
      await refreshInventory();
    } catch (error) {
      console.error('Error processing transaction:', error);
      toast({
        title: "Transaction Failed",
        description: "There was an error processing the transaction",
        variant: "destructive"
      });
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'adjustment': return <RotateCcw className="h-4 w-4" />;
      case 'sale': return <Minus className="h-4 w-4" />;
      case 'purchase': return <Plus className="h-4 w-4" />;
      case 'transfer': return <ArrowRightLeft className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const lowStockItems = inventory.filter(item => item.currentStock <= item.minStock);
  const reorderItems = inventory.filter(item => item.currentStock <= item.reorderPoint);

  return (
    <div className="space-y-6">
      {/* Quick Actions Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Quick Inventory Actions</h3>
          <p className="text-sm text-muted-foreground">Perform common inventory operations with automatic tracking</p>
        </div>
        <Dialog open={showQuickDialog} onOpenChange={setShowQuickDialog}>
          <DialogTrigger asChild>
            <Button>
              <Package className="h-4 w-4 mr-2" />
              Quick Transaction
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Quick Inventory Transaction</DialogTitle>
              <DialogDescription>
                Record a quick inventory transaction with automatic tracking
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="transaction-type">Transaction Type</Label>
                <Select value={transactionType} onValueChange={(value: any) => setTransactionType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transaction type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adjustment">Stock Adjustment</SelectItem>
                    <SelectItem value="sale">Sale/Stock Out</SelectItem>
                    <SelectItem value="purchase">Purchase/Stock In</SelectItem>
                    <SelectItem value="transfer">Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="product">Product</Label>
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {inventory.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name} ({item.sku})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="warehouse">Warehouse</Label>
                <Select value={selectedWarehouse} onValueChange={setSelectedWarehouse}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select warehouse" />
                  </SelectTrigger>
                  <SelectContent>
                    {warehouses.map((warehouse) => (
                      <SelectItem key={warehouse.id} value={warehouse.id}>
                        {warehouse.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter quantity"
                />
              </div>

              {transactionType === 'purchase' && (
                <div className="space-y-2">
                  <Label htmlFor="unit-cost">Unit Cost</Label>
                  <Input
                    id="unit-cost"
                    type="number"
                    step="0.01"
                    value={unitCost}
                    onChange={(e) => setUnitCost(e.target.value)}
                    placeholder="Enter unit cost"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="reference">Reference Number (Optional)</Label>
                <Input
                  id="reference"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  placeholder="PO number, invoice, etc."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason/Notes</Label>
                <Input
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Reason for transaction"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowQuickDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleQuickTransaction}>
                  {getTransactionIcon(transactionType)}
                  <span className="ml-2">Process Transaction</span>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Alert Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {lowStockItems.length > 0 && (
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <CardTitle className="text-orange-700">Low Stock Alert</CardTitle>
              </div>
              <CardDescription className="text-orange-600">
                {lowStockItems.length} items are at or below minimum stock level
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {lowStockItems.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.name}</span>
                    <Badge variant="outline" className="text-orange-700">
                      {item.currentStock}/{item.minStock}
                    </Badge>
                  </div>
                ))}
                {lowStockItems.length > 3 && (
                  <p className="text-xs text-orange-600">
                    +{lowStockItems.length - 3} more items
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {reorderItems.length > 0 && (
          <Card className="border-red-200 bg-red-50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-red-500" />
                <CardTitle className="text-red-700">Reorder Required</CardTitle>
              </div>
              <CardDescription className="text-red-600">
                {reorderItems.length} items need reordering
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {reorderItems.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.name}</span>
                    <Badge variant="outline" className="text-red-700">
                      {item.currentStock}/{item.reorderPoint}
                    </Badge>
                  </div>
                ))}
                {reorderItems.length > 3 && (
                  <p className="text-xs text-red-600">
                    +{reorderItems.length - 3} more items
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Quick Action Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Common Actions</CardTitle>
          <CardDescription>Quick access to frequently used inventory operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2"
              onClick={() => {
                setTransactionType('adjustment');
                setShowQuickDialog(true);
              }}
            >
              <RotateCcw className="h-6 w-6" />
              <span className="text-sm">Stock Adjustment</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2"
              onClick={() => {
                setTransactionType('sale');
                setShowQuickDialog(true);
              }}
            >
              <Minus className="h-6 w-6" />
              <span className="text-sm">Record Sale</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2"
              onClick={() => {
                setTransactionType('purchase');
                setShowQuickDialog(true);
              }}
            >
              <Plus className="h-6 w-6" />
              <span className="text-sm">Receive Stock</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2"
              onClick={() => {
                setTransactionType('transfer');
                setShowQuickDialog(true);
              }}
            >
              <ArrowRightLeft className="h-6 w-6" />
              <span className="text-sm">Transfer Stock</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}