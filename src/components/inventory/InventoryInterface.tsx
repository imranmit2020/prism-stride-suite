import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InventoryOverview } from "./InventoryOverview";
import { InventoryTable, InventoryItem } from "./InventoryTable";
import { SmartReorder } from "./SmartReorder";
import { AIInsights } from "./AIInsights";
import { AIDemandProphet } from "./AIDemandProphet";
import { AITheftDetectionOracle } from "./AITheftDetectionOracle";
import { AIShelfLifeOptimizer } from "./AIShelfLifeOptimizer";
import { AddProductDialog } from "./AddProductDialog";
import { EditProductDialog } from "./EditProductDialog";
import { ImportExportActions } from "./ImportExportActions";
import { LocationTracker } from "./LocationTracker";
import { InventoryTracking } from "./InventoryTracking";
import { useInventory } from "@/hooks/useInventory";
import { usePurchaseOrders } from "@/hooks/usePurchaseOrders";

export function InventoryInterface() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<InventoryItem | null>(null);
  
  const { 
    inventory, 
    loading, 
    addProduct, 
    refreshInventory, 
    getInventoryStats,
    getLowStockItems,
    getReorderRecommendations 
  } = useInventory();
  
  const { createPurchaseOrder } = usePurchaseOrders();

  // All data loading is now handled by hooks

  const handleAddProduct = () => {
    setShowAddDialog(true);
  };

  const handleAddNewProduct = async (product: Omit<InventoryItem, 'id'>) => {
    await addProduct(product);
    setShowAddDialog(false);
  };

  const handleImportProducts = async (products: Omit<InventoryItem, 'id'>[]) => {
    for (const product of products) {
      await addProduct(product);
    }
  };

  const handleEditProduct = (item: InventoryItem) => {
    setSelectedProduct(item);
    setShowEditDialog(true);
  };

  const handleProcessReorder = async (reorderId: string) => {
    // This would create a purchase order based on the reorder recommendation
    // For now, we'll just show a success message
    console.log('Processing reorder:', reorderId);
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex flex-wrap h-auto items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-full">
          <TabsTrigger value="overview" className="px-3 py-2 text-xs font-medium">Overview</TabsTrigger>
          <TabsTrigger value="products" className="px-3 py-2 text-xs font-medium">Products</TabsTrigger>
          <TabsTrigger value="tracking" className="px-3 py-2 text-xs font-medium">Inventory Tracking</TabsTrigger>
          <TabsTrigger value="locations" className="px-3 py-2 text-xs font-medium">Location Tracking</TabsTrigger>
          <TabsTrigger value="ai-demand" className="px-3 py-2 text-xs font-medium">Demand AI</TabsTrigger>
          <TabsTrigger value="ai-theft" className="px-3 py-2 text-xs font-medium">Theft AI</TabsTrigger>
          <TabsTrigger value="ai-shelf" className="px-3 py-2 text-xs font-medium">Shelf AI</TabsTrigger>
          <TabsTrigger value="reorders" className="px-3 py-2 text-xs font-medium">Reorders</TabsTrigger>
          <TabsTrigger value="import-export" className="px-3 py-2 text-xs font-medium">Import/Export</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <InventoryOverview 
            inventory={inventory}
            getInventoryStats={getInventoryStats}
            getLowStockItems={getLowStockItems}
          />
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <InventoryTable 
            inventory={inventory}
            loading={loading}
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
          />
        </TabsContent>

        <TabsContent value="tracking" className="space-y-6">
          <InventoryTracking />
        </TabsContent>

        <TabsContent value="locations" className="space-y-6">
          <LocationTracker />
        </TabsContent>

        <TabsContent value="ai-demand" className="space-y-6">
          <AIDemandProphet />
        </TabsContent>

        <TabsContent value="ai-theft" className="space-y-6">
          <AITheftDetectionOracle />
        </TabsContent>

        <TabsContent value="ai-shelf" className="space-y-6">
          <AIShelfLifeOptimizer />
        </TabsContent>

        <TabsContent value="reorders" className="space-y-6">
          <SmartReorder 
            inventory={inventory}
            getReorderRecommendations={getReorderRecommendations}
            onProcessReorder={handleProcessReorder} 
          />
          <AIInsights />
        </TabsContent>

        <TabsContent value="import-export" className="space-y-6">
          <ImportExportActions 
            inventory={inventory}
            onImportProducts={handleImportProducts}
          />
        </TabsContent>
      </Tabs>

      <AddProductDialog 
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddProduct={handleAddNewProduct}
      />

      <EditProductDialog 
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        product={selectedProduct}
      />
    </div>
  );
}