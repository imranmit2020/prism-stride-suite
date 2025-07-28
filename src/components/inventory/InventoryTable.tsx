import { useState } from "react";
import { useGlobalization } from "@/contexts/GlobalizationContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Plus, 
  AlertCircle, 
  TrendingUp, 
  TrendingDown,
  Package,
  Search,
  MapPin,
  Brain
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  reorderPoint: number;
  unitCost: number;
  sellingPrice: number;
  supplier: string;
  lastRestocked: string;
  demand7Days: number;
  demand30Days: number;
  location?: {
    warehouse: string;
    zone: string;
    aisle: string;
    shelf: string;
    bin: string;
  };
  aiPrediction: {
    nextWeekDemand: number;
    confidence: number;
    recommendation: string;
  };
}

// Mock inventory data with AI predictions
const mockInventory: InventoryItem[] = [
  {
    id: "1",
    name: "Coffee - Espresso Beans",
    sku: "COF-ESP-001",
    category: "Beverages",
    currentStock: 45,
    minStock: 20,
    maxStock: 200,
    reorderPoint: 30,
    unitCost: 12.50,
    sellingPrice: 3.50,
    supplier: "Premium Coffee Co.",
    lastRestocked: "2024-01-15",
    demand7Days: 35,
    demand30Days: 142,
    location: {
      warehouse: "Main Warehouse",
      zone: "A",
      aisle: "01",
      shelf: "3",
      bin: "B"
    },
    aiPrediction: {
      nextWeekDemand: 43,
      confidence: 87,
      recommendation: "Reorder soon - demand trending up"
    }
  },
  {
    id: "2",
    name: "Butter Croissants",
    sku: "PAS-CRO-001",
    category: "Pastries",
    currentStock: 8,
    minStock: 15,
    maxStock: 50,
    reorderPoint: 20,
    unitCost: 1.20,
    sellingPrice: 2.25,
    supplier: "French Bakery Supply",
    lastRestocked: "2024-01-18",
    demand7Days: 28,
    demand30Days: 95,
    location: {
      warehouse: "Main Warehouse",
      zone: "B",
      aisle: "05",
      shelf: "2",
      bin: "A"
    },
    aiPrediction: {
      nextWeekDemand: 32,
      confidence: 92,
      recommendation: "URGENT: Stock below minimum, high demand predicted"
    }
  },
  {
    id: "3",
    name: "Ham & Cheese Sandwiches",
    sku: "FOD-SAN-001",
    category: "Food",
    currentStock: 25,
    minStock: 10,
    maxStock: 40,
    reorderPoint: 15,
    unitCost: 4.50,
    sellingPrice: 8.95,
    supplier: "Fresh Foods Ltd",
    lastRestocked: "2024-01-19",
    demand7Days: 18,
    demand30Days: 67,
    location: {
      warehouse: "Distribution Center",
      zone: "C",
      aisle: "12",
      shelf: "1",
      bin: "C"
    },
    aiPrediction: {
      nextWeekDemand: 22,
      confidence: 78,
      recommendation: "Stock adequate - consider price optimization"
    }
  }
];

interface InventoryTableProps {
  inventory: InventoryItem[];
  loading: boolean;
  onAddProduct: () => void;
  onEditProduct: (item: InventoryItem) => void;
  onDeleteProduct: (item: InventoryItem) => void;
}

export function InventoryTable({ inventory, loading, onAddProduct, onEditProduct, onDeleteProduct }: InventoryTableProps) {
  const { formatCurrency } = useGlobalization();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter inventory based on search term
  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLocationCode = (location?: InventoryItem['location']) => {
    if (!location) return "Not Assigned";
    return `${location.warehouse.charAt(0)}${location.zone}-${location.aisle}-${location.shelf}-${location.bin}`;
  };

  const getStockStatus = (item: InventoryItem) => {
    if (item.currentStock <= item.minStock) return "critical";
    if (item.currentStock <= item.reorderPoint) return "low";
    if (item.currentStock >= item.maxStock * 0.9) return "overstocked";
    return "normal";
  };

  const getStockBadge = (status: string) => {
    switch (status) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      case "low":
        return <Badge variant="outline" className="border-warning text-warning">Low Stock</Badge>;
      case "overstocked":
        return <Badge variant="outline" className="border-primary text-primary">High Stock</Badge>;
      default:
        return <Badge variant="secondary">Normal</Badge>;
    }
  };

  const getTrendIcon = (demand7Days: number, demand30Days: number) => {
    const weeklyAverage = demand30Days / 4;
    if (demand7Days > weeklyAverage * 1.1) {
      return <TrendingUp className="h-4 w-4 text-success" />;
    } else if (demand7Days < weeklyAverage * 0.9) {
      return <TrendingDown className="h-4 w-4 text-destructive" />;
    }
    return null;
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <Card className="overflow-hidden border-2 hover:border-primary/20 transition-all duration-300 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary/5 via-primary/3 to-secondary/5 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Product Inventory
              </span>
              <p className="text-sm text-muted-foreground font-normal">Manage your product catalog</p>
            </div>
          </CardTitle>
          <Button onClick={onAddProduct} className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
        <div className="flex gap-4 mt-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products, SKU, category..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 border-2 focus:border-primary/50 transition-all duration-300"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            {filteredInventory.length} products
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/70 transition-colors">
                <TableHead className="font-semibold">Product</TableHead>
                <TableHead className="font-semibold">SKU</TableHead>
                <TableHead className="font-semibold">Location</TableHead>
                <TableHead className="font-semibold">Stock Status</TableHead>
                <TableHead className="font-semibold">Current Stock</TableHead>
                <TableHead className="font-semibold">AI Prediction</TableHead>
                <TableHead className="font-semibold">Unit Cost</TableHead>
                <TableHead className="font-semibold">Selling Price</TableHead>
                <TableHead className="font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item, index) => {
                const status = getStockStatus(item);
                return (
                  <TableRow 
                    key={item.id} 
                    className="group hover:bg-primary/5 transition-all duration-300 border-b hover:border-primary/20 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <TableCell className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300">
                          <Package className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold text-base">{item.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <div className="w-1 h-1 rounded-full bg-primary"></div>
                            {item.category}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm font-medium bg-muted/30 rounded-md px-2 py-1 mx-2">{item.sku}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-blue-500" />
                        <div>
                          <div className="font-medium text-sm bg-blue-50 dark:bg-blue-950 px-2 py-1 rounded-md">{getLocationCode(item.location)}</div>
                          {item.location && (
                            <div className="text-xs text-muted-foreground mt-1">
                              {item.location.warehouse}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStockBadge(status)}
                        {getTrendIcon(item.demand7Days, item.demand30Days)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="text-lg font-bold">{item.currentStock} <span className="text-sm font-normal text-muted-foreground">units</span></div>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-amber-500"></div>
                            Min: {item.minStock}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                            Reorder: {item.reorderPoint}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2 p-3 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 rounded-lg">
                        <div className="text-sm font-semibold flex items-center gap-2">
                          <Brain className="h-3 w-3 text-purple-600" />
                          {item.aiPrediction.nextWeekDemand} units/week
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {item.aiPrediction.confidence}% confidence
                        </div>
                        {status === "critical" && (
                          <div className="flex items-center gap-1 text-xs text-destructive bg-destructive/10 p-2 rounded-md">
                            <AlertCircle className="h-3 w-3" />
                            {item.aiPrediction.recommendation}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-emerald-600">{formatCurrency(item.unitCost)}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-blue-600">{formatCurrency(item.sellingPrice)}</div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-primary/10 transition-all duration-300">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 border-2 shadow-lg">
                          <DropdownMenuItem onClick={() => onEditProduct(item)} className="hover:bg-primary/10 transition-colors">
                            <Edit className="h-4 w-4 mr-2 text-blue-600" />
                            Edit Product
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive hover:bg-destructive/10 transition-colors"
                            onClick={() => onDeleteProduct(item)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Product
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}