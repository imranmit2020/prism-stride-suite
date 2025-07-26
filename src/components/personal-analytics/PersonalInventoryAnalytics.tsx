import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Home, AlertTriangle, TrendingDown } from "lucide-react";
import { usePersonalInventory } from "@/hooks/usePersonalInventory";

export function PersonalInventoryAnalytics() {
  const { loading, getInventoryStats, getItemsByCategory } = usePersonalInventory();
  
  const stats = getInventoryStats();
  const inventoryItems = getItemsByCategory();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Package className="h-4 w-4 text-primary" />
              Total Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{loading ? '...' : stats.totalItems}</div>
            <div className="text-xs text-muted-foreground">Tracked items</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Home className="h-4 w-4 text-green-500" />
              Total Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{loading ? '...' : `$${stats.totalValue.toLocaleString()}`}</div>
            <div className="text-xs text-muted-foreground">Estimated value</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              Need Replacement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{loading ? '...' : stats.needReplacement}</div>
            <div className="text-xs text-muted-foreground">Items to replace</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <TrendingDown className="h-4 w-4 text-blue-500" />
              Depreciation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{loading ? '...' : `-$${stats.totalDepreciation.toLocaleString()}`}</div>
            <div className="text-xs text-muted-foreground">Total depreciation</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Home Inventory Overview</CardTitle>
          <CardDescription>Track your personal belongings and their value</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loading ? (
              <div className="text-center text-muted-foreground">Loading inventory data...</div>
            ) : inventoryItems.length === 0 ? (
              <div className="text-center text-muted-foreground">No inventory items found. Start by adding some items to track.</div>
            ) : (
              inventoryItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <h4 className="font-medium">{item.category}</h4>
                    <p className="text-sm text-muted-foreground">{item.items} items</p>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${item.value.toLocaleString()}</div>
                    <Badge variant="outline">{item.condition}</Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}