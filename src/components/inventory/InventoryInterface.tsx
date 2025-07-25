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
import { ImportExportActions } from "./ImportExportActions";
import { useToast } from "@/hooks/use-toast";

export function InventoryInterface() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const { toast } = useToast();

  const handleAddProduct = () => {
    setShowAddDialog(true);
  };

  const handleAddNewProduct = (product: Omit<InventoryItem, 'id'>) => {
    const newProduct: InventoryItem = {
      ...product,
      id: Date.now().toString()
    };
    setInventory(prev => [...prev, newProduct]);
  };

  const handleImportProducts = (products: Omit<InventoryItem, 'id'>[]) => {
    const newProducts: InventoryItem[] = products.map((product, index) => ({
      ...product,
      id: `${Date.now()}-${index}`
    }));
    setInventory(prev => [...prev, ...newProducts]);
  };

  const handleEditProduct = (item: InventoryItem) => {
    toast({
      title: "Edit Product",
      description: `Editing ${item.name} (${item.sku})`
    });
  };

  const handleProcessReorder = (reorderId: string) => {
    toast({
      title: "Reorder Processed",
      description: "Purchase order has been generated and sent to supplier.",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="overflow-x-auto">
          <TabsList className="inline-flex h-12 items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground min-w-max">
            <TabsTrigger value="overview" className="px-4 py-2 text-sm font-medium">Overview</TabsTrigger>
            <TabsTrigger value="products" className="px-4 py-2 text-sm font-medium">Products</TabsTrigger>
            <TabsTrigger value="ai-demand" className="px-4 py-2 text-sm font-medium">AI Demand Prophet</TabsTrigger>
            <TabsTrigger value="ai-theft" className="px-4 py-2 text-sm font-medium">AI Theft Detection</TabsTrigger>
            <TabsTrigger value="ai-shelf" className="px-4 py-2 text-sm font-medium">AI Shelf Life</TabsTrigger>
            <TabsTrigger value="reorders" className="px-4 py-2 text-sm font-medium">Smart Reorders</TabsTrigger>
            <TabsTrigger value="import-export" className="px-4 py-2 text-sm font-medium">Import/Export</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-6">
          <InventoryOverview />
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <InventoryTable 
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
          />
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
          <SmartReorder onProcessReorder={handleProcessReorder} />
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
    </div>
  );
}