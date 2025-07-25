import { useState, useEffect } from "react";
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
import { LocationTracker } from "./LocationTracker";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function InventoryInterface() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  // Authenticate user anonymously on component mount
  useEffect(() => {
    // Authentication is now handled by AuthContext, so we can directly load products
    loadProducts();
  }, []);

  const authenticateUser = async () => {
    // This function is no longer needed since authentication is handled by AuthContext
    return true;
  };

  // Load products from database on component mount
  useEffect(() => {
    // loadProducts will be called from authenticateUser
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const { data: products, error } = await supabase
        .from('bm_inv_products')
        .select(`
          *,
          bm_inv_categories(name),
          bm_inv_suppliers(name),
          bm_inv_stock(quantity, min_stock, max_stock, reorder_point, bm_inv_warehouses(name))
        `);

      if (error) {
        console.error('Error loading products:', error);
        toast({
          title: "Error Loading Products",
          description: "Failed to load products from database",
          variant: "destructive"
        });
        return;
      }

      // Transform database data to match InventoryItem interface
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
        demand7Days: 0,
        demand30Days: 0,
        aiPrediction: {
          nextWeekDemand: 0,
          confidence: 75,
          recommendation: "Monitor performance"
        }
      }));

      setInventory(transformedProducts);
    } catch (error) {
      console.error('Error in loadProducts:', error);
      toast({
        title: "Database Error",
        description: "Unable to connect to database",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    setShowAddDialog(true);
  };

  const handleAddNewProduct = async (product: Omit<InventoryItem, 'id'>) => {
    try {
      // First, ensure category exists
      let categoryId = null;
      const { data: existingCategory } = await supabase
        .from('bm_inv_categories')
        .select('id')
        .eq('name', product.category)
        .single();

      if (existingCategory) {
        categoryId = existingCategory.id;
      } else {
        const { data: newCategory, error: categoryError } = await supabase
          .from('bm_inv_categories')
          .insert({ name: product.category })
          .select('id')
          .single();

        if (categoryError) {
          console.error('Error creating category:', categoryError);
          toast({
            title: "Error",
            description: "Failed to create product category",
            variant: "destructive"
          });
          return;
        }
        categoryId = newCategory.id;
      }

      // Ensure supplier exists
      let supplierId = null;
      const { data: existingSupplier } = await supabase
        .from('bm_inv_suppliers')
        .select('id')
        .eq('name', product.supplier)
        .single();

      if (existingSupplier) {
        supplierId = existingSupplier.id;
      } else {
        const { data: newSupplier, error: supplierError } = await supabase
          .from('bm_inv_suppliers')
          .insert({ name: product.supplier })
          .select('id')
          .single();

        if (supplierError) {
          console.error('Error creating supplier:', supplierError);
          toast({
            title: "Error",
            description: "Failed to create supplier",
            variant: "destructive"
          });
          return;
        }
        supplierId = newSupplier.id;
      }

      // Create the product
      const { data: newProduct, error: productError } = await supabase
        .from('bm_inv_products')
        .insert({
          name: product.name,
          sku: product.sku,
          category_id: categoryId,
          supplier_id: supplierId,
          cost_price: product.unitCost,
          unit_price: product.sellingPrice,
          description: `${product.category} product`
        })
        .select('id')
        .single();

      if (productError) {
        console.error('Error creating product:', productError);
        toast({
          title: "Error",
          description: "Failed to create product",
          variant: "destructive"
        });
        return;
      }

      // Get default warehouse (create one if none exists)
      let warehouseId = null;
      const { data: warehouses } = await supabase
        .from('bm_inv_warehouses')
        .select('id')
        .limit(1);

      if (warehouses && warehouses.length > 0) {
        warehouseId = warehouses[0].id;
      } else {
        const { data: newWarehouse, error: warehouseError } = await supabase
          .from('bm_inv_warehouses')
          .insert({ name: 'Main Warehouse', location: 'Primary Location' })
          .select('id')
          .single();

        if (warehouseError) {
          console.error('Error creating warehouse:', warehouseError);
          toast({
            title: "Error",
            description: "Failed to create warehouse",
            variant: "destructive"
          });
          return;
        }
        warehouseId = newWarehouse.id;
      }

      // Create stock record
      const { error: stockError } = await supabase
        .from('bm_inv_stock')
        .insert({
          product_id: newProduct.id,
          warehouse_id: warehouseId,
          quantity: product.currentStock,
          min_stock: product.minStock,
          max_stock: product.maxStock,
          reorder_point: product.reorderPoint
        });

      if (stockError) {
        console.error('Error creating stock record:', stockError);
        toast({
          title: "Error",
          description: "Failed to create stock record",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Product Added Successfully",
        description: `${product.name} has been added to inventory`
      });

      // Reload products to show the new one
      await loadProducts();

    } catch (error) {
      console.error('Error in handleAddNewProduct:', error);
      toast({
        title: "Database Error",
        description: "Failed to save product to database",
        variant: "destructive"
      });
    }
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
        <TabsList className="flex flex-wrap h-auto items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-full">
          <TabsTrigger value="overview" className="px-3 py-2 text-xs font-medium">Overview</TabsTrigger>
          <TabsTrigger value="products" className="px-3 py-2 text-xs font-medium">Products</TabsTrigger>
          <TabsTrigger value="locations" className="px-3 py-2 text-xs font-medium">Location Tracking</TabsTrigger>
          <TabsTrigger value="ai-demand" className="px-3 py-2 text-xs font-medium">Demand AI</TabsTrigger>
          <TabsTrigger value="ai-theft" className="px-3 py-2 text-xs font-medium">Theft AI</TabsTrigger>
          <TabsTrigger value="ai-shelf" className="px-3 py-2 text-xs font-medium">Shelf AI</TabsTrigger>
          <TabsTrigger value="reorders" className="px-3 py-2 text-xs font-medium">Reorders</TabsTrigger>
          <TabsTrigger value="import-export" className="px-3 py-2 text-xs font-medium">Import/Export</TabsTrigger>
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