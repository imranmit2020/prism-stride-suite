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
  MapPin
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
  onAddProduct: () => void;
  onEditProduct: (item: InventoryItem) => void;
}

export function InventoryTable({ onAddProduct, onEditProduct }: InventoryTableProps) {
  const { formatCurrency } = useGlobalization();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInventory, setFilteredInventory] = useState(mockInventory);

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
    const filtered = mockInventory.filter(item =>
      item.name.toLowerCase().includes(term.toLowerCase()) ||
      item.sku.toLowerCase().includes(term.toLowerCase()) ||
      item.category.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredInventory(filtered);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Inventory Management
          </CardTitle>
          <Button onClick={onAddProduct}>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
        <div className="flex gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Stock Status</TableHead>
              <TableHead>Current Stock</TableHead>
              <TableHead>AI Prediction</TableHead>
              <TableHead>Unit Cost</TableHead>
              <TableHead>Selling Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInventory.map((item) => {
              const status = getStockStatus(item);
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">{item.category}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-500" />
                      <div>
                        <div className="font-medium text-sm">{getLocationCode(item.location)}</div>
                        {item.location && (
                          <div className="text-xs text-muted-foreground">
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
                    <div className="space-y-1">
                      <div className="font-medium">{item.currentStock} units</div>
                      <div className="text-xs text-muted-foreground">
                        Min: {item.minStock} | Reorder: {item.reorderPoint}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">
                        {item.aiPrediction.nextWeekDemand} units/week
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {item.aiPrediction.confidence}% confidence
                      </div>
                      {status === "critical" && (
                        <div className="flex items-center gap-1 text-xs text-destructive">
                          <AlertCircle className="h-3 w-3" />
                          {item.aiPrediction.recommendation}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{formatCurrency(item.unitCost)}</TableCell>
                  <TableCell>{formatCurrency(item.sellingPrice)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEditProduct(item)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}