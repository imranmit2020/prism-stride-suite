import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  BarChart3, 
  TrendingUp, 
  MapPin, 
  Brain, 
  Shield, 
  Clock, 
  RefreshCw, 
  Download 
} from "lucide-react";
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
import { QuickInventoryActions } from "./QuickInventoryActions";
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
    updateProduct,
    deleteProduct,
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

  const handleUpdateProduct = async (productId: string, updates: Partial<InventoryItem>) => {
    await updateProduct(productId, updates);
    setShowEditDialog(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = async (item: InventoryItem) => {
    if (confirm(`Are you sure you want to delete ${item.name}?`)) {
      await deleteProduct(item.id);
    }
  };

  const handleProcessReorder = async (reorderId: string) => {
    // This would create a purchase order based on the reorder recommendation
    // For now, we'll just show a success message
    console.log('Processing reorder:', reorderId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 space-y-8 animate-fade-in">
      {/* Beautiful Header Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 p-8 border shadow-lg">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-primary/10 backdrop-blur-sm">
              <Package className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Inventory Management
              </h1>
              <p className="text-muted-foreground text-lg">Intelligent stock control with AI-powered insights</p>
            </div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-9 h-auto bg-card/50 backdrop-blur-sm border rounded-xl p-2 shadow-lg">
          <TabsTrigger value="overview" className="flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 hover:bg-primary/5">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 hover:bg-primary/5">
            <Package className="h-4 w-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="tracking" className="flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 hover:bg-primary/5">
            <TrendingUp className="h-4 w-4" />
            Tracking
          </TabsTrigger>
          <TabsTrigger value="locations" className="flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 hover:bg-primary/5">
            <MapPin className="h-4 w-4" />
            Locations
          </TabsTrigger>
          <TabsTrigger value="ai-demand" className="flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 hover:bg-primary/5">
            <Brain className="h-4 w-4" />
            Demand AI
          </TabsTrigger>
          <TabsTrigger value="ai-theft" className="flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 hover:bg-primary/5">
            <Shield className="h-4 w-4" />
            Theft AI
          </TabsTrigger>
          <TabsTrigger value="ai-shelf" className="flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 hover:bg-primary/5">
            <Clock className="h-4 w-4" />
            Shelf AI
          </TabsTrigger>
          <TabsTrigger value="reorders" className="flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 hover:bg-primary/5">
            <RefreshCw className="h-4 w-4" />
            Reorders
          </TabsTrigger>
          <TabsTrigger value="import-export" className="flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 hover:bg-primary/5">
            <Download className="h-4 w-4" />
            Import/Export
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 animate-fade-in">
          <InventoryOverview 
            inventory={inventory}
            getInventoryStats={getInventoryStats}
            getLowStockItems={getLowStockItems}
          />
        </TabsContent>

        <TabsContent value="products" className="space-y-6 animate-fade-in">
          <InventoryTable 
            inventory={inventory}
            loading={loading}
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        </TabsContent>

        <TabsContent value="tracking" className="space-y-6 animate-fade-in">
          <QuickInventoryActions />
          <InventoryTracking />
        </TabsContent>

        <TabsContent value="locations" className="space-y-6 animate-fade-in">
          <LocationTracker />
        </TabsContent>

        <TabsContent value="ai-demand" className="space-y-6 animate-fade-in">
          <AIDemandProphet />
        </TabsContent>

        <TabsContent value="ai-theft" className="space-y-6 animate-fade-in">
          <AITheftDetectionOracle />
        </TabsContent>

        <TabsContent value="ai-shelf" className="space-y-6 animate-fade-in">
          <AIShelfLifeOptimizer />
        </TabsContent>

        <TabsContent value="reorders" className="space-y-6 animate-fade-in">
          <SmartReorder 
            inventory={inventory}
            getReorderRecommendations={getReorderRecommendations}
            onProcessReorder={handleProcessReorder} 
          />
          <AIInsights />
        </TabsContent>

        <TabsContent value="import-export" className="space-y-6 animate-fade-in">
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
        onUpdateProduct={handleUpdateProduct}
      />
    </div>
  );
}