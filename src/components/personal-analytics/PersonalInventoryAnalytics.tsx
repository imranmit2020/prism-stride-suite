import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Home, AlertTriangle, TrendingDown } from "lucide-react";

export function PersonalInventoryAnalytics() {
  const inventoryItems = [
    { category: "Kitchen Appliances", items: 12, value: 2400, condition: "Good" },
    { category: "Electronics", items: 8, value: 3200, condition: "Excellent" },
    { category: "Furniture", items: 15, value: 1800, condition: "Good" },
    { category: "Clothing", items: 45, value: 900, condition: "Good" },
    { category: "Books & Media", items: 23, value: 450, condition: "Fair" },
    { category: "Tools & Equipment", items: 7, value: 650, condition: "Good" }
  ];

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
            <div className="text-2xl font-bold text-primary">110</div>
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
            <div className="text-2xl font-bold text-green-500">$9,400</div>
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
            <div className="text-2xl font-bold text-orange-500">3</div>
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
            <div className="text-2xl font-bold text-blue-500">-$340</div>
            <div className="text-xs text-muted-foreground">This year</div>
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
            {inventoryItems.map((item, index) => (
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
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}