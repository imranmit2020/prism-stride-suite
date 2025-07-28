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
    <div className="p-6 md:p-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Product Inventory
          </h2>
          <p className="text-muted-foreground/80 text-base md:text-lg font-medium">
            Manage your product catalog with intelligent insights
          </p>
        </div>
        <Button 
          onClick={onAddProduct} 
          className="group bg-gradient-to-r from-primary via-primary/95 to-primary/90 hover:from-primary/90 hover:via-primary/85 hover:to-primary/80 text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 px-6 py-3 rounded-xl font-semibold"
        >
          <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
          Add Product
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground/60" />
          <Input
            placeholder="Search products, SKU, category, supplier..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-12 pr-4 py-3 border-2 border-border/50 focus:border-primary/50 transition-all duration-300 rounded-xl bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md"
          />
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 rounded-xl border border-emerald-200 dark:border-emerald-800 shadow-sm">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-sm animate-pulse"></div>
          <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
            {filteredInventory.length} products
          </span>
        </div>
      </div>

      {/* Enhanced Table */}
      <Card className="overflow-hidden border border-border/30 hover:border-primary/30 transition-all duration-500 shadow-2xl bg-gradient-to-br from-card/80 via-card/90 to-card/80 backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-transparent to-secondary/3"></div>
        <CardContent className="p-0 relative z-10">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-muted/60 via-muted/80 to-muted/60 backdrop-blur-sm hover:from-muted/70 hover:via-muted/90 hover:to-muted/70 transition-all duration-300 border-b border-border/50">
                  <TableHead className="font-bold text-foreground/90 py-5 px-6 text-sm uppercase tracking-wide">Product</TableHead>
                  <TableHead className="font-bold text-foreground/90 py-5 text-sm uppercase tracking-wide">SKU</TableHead>
                  <TableHead className="font-bold text-foreground/90 py-5 text-sm uppercase tracking-wide">Location</TableHead>
                  <TableHead className="font-bold text-foreground/90 py-5 text-sm uppercase tracking-wide">Status</TableHead>
                  <TableHead className="font-bold text-foreground/90 py-5 text-sm uppercase tracking-wide">Stock</TableHead>
                  <TableHead className="font-bold text-foreground/90 py-5 text-sm uppercase tracking-wide">AI Prediction</TableHead>
                  <TableHead className="font-bold text-foreground/90 py-5 text-sm uppercase tracking-wide">Unit Cost</TableHead>
                  <TableHead className="font-bold text-foreground/90 py-5 text-sm uppercase tracking-wide">Selling Price</TableHead>
                  <TableHead className="font-bold text-foreground/90 py-5 px-6 text-sm uppercase tracking-wide text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
            <TableBody>
              {filteredInventory.map((item, index) => {
                const status = getStockStatus(item);
                return (
                  <TableRow 
                    key={item.id} 
                    className="group hover:bg-gradient-to-r hover:from-primary/8 hover:via-primary/5 hover:to-secondary/8 transition-all duration-500 border-b border-border/30 hover:border-primary/30 animate-fade-in hover:shadow-lg"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <TableCell className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="relative p-3 rounded-2xl bg-gradient-to-br from-primary/15 to-secondary/15 group-hover:from-primary/25 group-hover:to-secondary/25 transition-all duration-500 shadow-lg group-hover:shadow-xl group-hover:scale-110">
                          <Package className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        <div className="space-y-1">
                          <div className="font-bold text-base group-hover:text-primary transition-colors duration-300">{item.name}</div>
                          <div className="text-sm text-muted-foreground/80 flex items-center gap-2 font-medium">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary shadow-sm"></div>
                            {item.category}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm font-bold bg-gradient-to-r from-muted/40 to-muted/60 rounded-xl px-3 py-2 mx-2 shadow-sm">{item.sku}</TableCell>
                    <TableCell className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/15 to-cyan-500/15 shadow-sm">
                          <MapPin className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="space-y-1">
                          <div className="font-bold text-sm bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 px-3 py-2 rounded-xl border border-blue-200 dark:border-blue-800 shadow-sm">
                            {getLocationCode(item.location)}
                          </div>
                          {item.location && (
                            <div className="text-xs text-muted-foreground/80 font-medium">
                              {item.location.warehouse}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="transform group-hover:scale-110 transition-transform duration-300">
                          {getStockBadge(status)}
                        </div>
                        <div className="transform group-hover:scale-110 transition-transform duration-300">
                          {getTrendIcon(item.demand7Days, item.demand30Days)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="p-6">
                      <div className="space-y-3">
                        <div className="text-xl font-black">
                          {item.currentStock} 
                          <span className="text-sm font-medium text-muted-foreground/70 ml-1">units</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs font-medium">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 shadow-sm"></div>
                            <span className="text-muted-foreground/80">Min: {item.minStock}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs font-medium">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-sm"></div>
                            <span className="text-muted-foreground/80">Reorder: {item.reorderPoint}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="p-6">
                      <div className="space-y-3 p-4 bg-gradient-to-br from-violet-50/80 via-purple-50/60 to-blue-50/80 dark:from-violet-950/80 dark:via-purple-950/60 dark:to-blue-950/80 rounded-2xl border border-violet-200/50 dark:border-violet-800/50 shadow-lg backdrop-blur-sm">
                        <div className="text-sm font-bold flex items-center gap-2">
                          <div className="p-1 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500 shadow-sm">
                            <Brain className="h-4 w-4 text-white" />
                          </div>
                          <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                            {item.aiPrediction.nextWeekDemand} units/week
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground/80 font-medium flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
                          {item.aiPrediction.confidence}% confidence
                        </div>
                        {status === "critical" && (
                          <div className="flex items-center gap-2 text-xs text-destructive bg-gradient-to-r from-destructive/10 to-destructive/5 p-3 rounded-xl border border-destructive/20 shadow-sm">
                            <AlertCircle className="h-4 w-4 animate-pulse" />
                            <span className="font-medium">{item.aiPrediction.recommendation}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="p-6">
                      <div className="font-black text-lg text-emerald-600">{formatCurrency(item.unitCost)}</div>
                    </TableCell>
                    <TableCell className="p-6">
                      <div className="font-black text-lg text-blue-600">{formatCurrency(item.sellingPrice)}</div>
                    </TableCell>
                    <TableCell className="p-6">
                      <div className="flex items-center gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEditProduct(item)}
                          className="group hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all duration-300 hover:scale-110 hover:shadow-lg rounded-xl p-3 border-border/50"
                        >
                          <Edit className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDeleteProduct(item)}
                          className="group hover:bg-destructive/10 hover:border-destructive/30 hover:text-destructive transition-all duration-300 hover:scale-110 hover:shadow-lg rounded-xl p-3 border-border/50"
                        >
                          <Trash2 className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
    </div>
  );
}