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
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/2 to-secondary/3 space-y-6 animate-fade-in p-4 lg:p-6">
      {/* Beautiful Header Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/15 via-primary/8 to-secondary/12 p-6 md:p-8 lg:p-10 border shadow-2xl backdrop-blur-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary/20 to-transparent rounded-full blur-xl"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm border border-primary/20 shadow-lg">
              <Package className="h-8 w-8 md:h-10 md:w-10 text-primary drop-shadow-sm" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary via-primary/90 to-secondary bg-clip-text text-transparent mb-2">
                Inventory Management
              </h1>
              <p className="text-muted-foreground text-base md:text-lg font-medium leading-relaxed">
                Intelligent stock control with AI-powered insights and real-time analytics
              </p>
            </div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="relative">
          <TabsList className="w-full h-auto bg-gradient-to-r from-card/80 via-card/90 to-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-3 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"></div>
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-2 w-full">
              <TabsTrigger value="overview" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 md:px-4 py-3 md:py-4 text-xs md:text-sm font-medium rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/90 data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-500 hover:bg-primary/10 hover:scale-105 group">
                <BarChart3 className="h-4 w-4 md:h-5 md:w-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-center">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="products" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 md:px-4 py-3 md:py-4 text-xs md:text-sm font-medium rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/90 data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-500 hover:bg-primary/10 hover:scale-105 group">
                <Package className="h-4 w-4 md:h-5 md:w-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-center">Products</span>
              </TabsTrigger>
              <TabsTrigger value="tracking" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 md:px-4 py-3 md:py-4 text-xs md:text-sm font-medium rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/90 data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-500 hover:bg-primary/10 hover:scale-105 group">
                <TrendingUp className="h-4 w-4 md:h-5 md:w-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-center">Tracking</span>
              </TabsTrigger>
              <TabsTrigger value="locations" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 md:px-4 py-3 md:py-4 text-xs md:text-sm font-medium rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/90 data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-500 hover:bg-primary/10 hover:scale-105 group">
                <MapPin className="h-4 w-4 md:h-5 md:w-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-center">Locations</span>
              </TabsTrigger>
              <TabsTrigger value="ai-demand" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 md:px-4 py-3 md:py-4 text-xs md:text-sm font-medium rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/90 data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-500 hover:bg-primary/10 hover:scale-105 group">
                <Brain className="h-4 w-4 md:h-5 md:w-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-center">Demand AI</span>
              </TabsTrigger>
              <TabsTrigger value="ai-theft" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 md:px-4 py-3 md:py-4 text-xs md:text-sm font-medium rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/90 data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-500 hover:bg-primary/10 hover:scale-105 group">
                <Shield className="h-4 w-4 md:h-5 md:w-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-center">Theft AI</span>
              </TabsTrigger>
              <TabsTrigger value="ai-shelf" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 md:px-4 py-3 md:py-4 text-xs md:text-sm font-medium rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/90 data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-500 hover:bg-primary/10 hover:scale-105 group">
                <Clock className="h-4 w-4 md:h-5 md:w-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-center">Shelf AI</span>
              </TabsTrigger>
              <TabsTrigger value="reorders" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 md:px-4 py-3 md:py-4 text-xs md:text-sm font-medium rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/90 data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-500 hover:bg-primary/10 hover:scale-105 group">
                <RefreshCw className="h-4 w-4 md:h-5 md:w-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-center">Reorders</span>
              </TabsTrigger>
              <TabsTrigger value="import-export" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 md:px-4 py-3 md:py-4 text-xs md:text-sm font-medium rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/90 data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-500 hover:bg-primary/10 hover:scale-105 group">
                <Download className="h-4 w-4 md:h-5 md:w-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-center">Import/Export</span>
              </TabsTrigger>
            </div>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-6 animate-fade-in mt-8">
          <div className="rounded-2xl bg-gradient-to-br from-card/50 to-card/80 backdrop-blur-xl border border-border/50 shadow-xl overflow-hidden">
            <InventoryOverview 
              inventory={inventory}
              getInventoryStats={getInventoryStats}
              getLowStockItems={getLowStockItems}
            />
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-6 animate-fade-in mt-8">
          <div className="rounded-2xl bg-gradient-to-br from-card/50 to-card/80 backdrop-blur-xl border border-border/50 shadow-xl overflow-hidden">
            <InventoryTable 
              inventory={inventory}
              loading={loading}
              onAddProduct={handleAddProduct}
              onEditProduct={handleEditProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          </div>
        </TabsContent>

        <TabsContent value="tracking" className="space-y-6 animate-fade-in mt-8">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-gradient-to-br from-card/50 to-card/80 backdrop-blur-xl border border-border/50 shadow-xl overflow-hidden">
              <QuickInventoryActions />
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-card/50 to-card/80 backdrop-blur-xl border border-border/50 shadow-xl overflow-hidden">
              <InventoryTracking />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="locations" className="space-y-6 animate-fade-in mt-8">
          <div className="rounded-2xl bg-gradient-to-br from-card/50 to-card/80 backdrop-blur-xl border border-border/50 shadow-xl overflow-hidden">
            <LocationTracker />
          </div>
        </TabsContent>

        <TabsContent value="ai-demand" className="space-y-6 animate-fade-in mt-8">
          <div className="rounded-2xl bg-gradient-to-br from-card/50 to-card/80 backdrop-blur-xl border border-border/50 shadow-xl overflow-hidden">
            <AIDemandProphet />
          </div>
        </TabsContent>

        <TabsContent value="ai-theft" className="space-y-6 animate-fade-in mt-8">
          <div className="rounded-2xl bg-gradient-to-br from-card/50 to-card/80 backdrop-blur-xl border border-border/50 shadow-xl overflow-hidden">
            <AITheftDetectionOracle />
          </div>
        </TabsContent>

        <TabsContent value="ai-shelf" className="space-y-6 animate-fade-in mt-8">
          <div className="rounded-2xl bg-gradient-to-br from-card/50 to-card/80 backdrop-blur-xl border border-border/50 shadow-xl overflow-hidden">
            <AIShelfLifeOptimizer />
          </div>
        </TabsContent>

        <TabsContent value="reorders" className="space-y-6 animate-fade-in mt-8">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-gradient-to-br from-card/50 to-card/80 backdrop-blur-xl border border-border/50 shadow-xl overflow-hidden">
              <SmartReorder 
                inventory={inventory}
                getReorderRecommendations={getReorderRecommendations}
                onProcessReorder={handleProcessReorder} 
              />
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-card/50 to-card/80 backdrop-blur-xl border border-border/50 shadow-xl overflow-hidden">
              <AIInsights />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="import-export" className="space-y-6 animate-fade-in mt-8">
          <div className="rounded-2xl bg-gradient-to-br from-card/50 to-card/80 backdrop-blur-xl border border-border/50 shadow-xl overflow-hidden">
            <ImportExportActions 
              inventory={inventory}
              onImportProducts={handleImportProducts}
            />
          </div>
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