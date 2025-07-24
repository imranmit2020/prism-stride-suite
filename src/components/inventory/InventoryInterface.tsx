import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InventoryOverview } from "./InventoryOverview";
import { InventoryTable, InventoryItem } from "./InventoryTable";
import { SmartReorder } from "./SmartReorder";
import { AIInsights } from "./AIInsights";
import { useToast } from "@/hooks/use-toast";

export function InventoryInterface() {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  const handleAddProduct = () => {
    toast({
      title: "Add Product",
      description: "Product form would open here (to be implemented)"
    });
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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="reorders">Smart Reorders</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <InventoryOverview />
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <InventoryTable 
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
          />
        </TabsContent>

        <TabsContent value="reorders" className="space-y-6">
          <SmartReorder onProcessReorder={handleProcessReorder} />
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <AIInsights />
        </TabsContent>
      </Tabs>
    </div>
  );
}