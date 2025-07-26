import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin, 
  Package, 
  Search, 
  Plus, 
  Warehouse, 
  Navigation,
  QrCode,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useInventory } from "@/hooks/useInventory";
import { useWarehouses } from "@/hooks/useWarehouses";
import { supabase } from "@/integrations/supabase/client";

interface Location {
  id: string;
  warehouse: string;
  zone: string;
  aisle: string;
  shelf: string;
  bin: string;
  capacity: number;
  currentStock: number;
  temperature?: string;
  description?: string;
}

interface LocationAssignment {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  location: Location;
  assignedDate: string;
  lastMovement: string;
  status: 'active' | 'moving' | 'empty';
}

export function LocationTracker() {
  const { toast } = useToast();
  const { inventory } = useInventory();
  const { warehouses, loading: warehousesLoading } = useWarehouses();
  const [activeView, setActiveView] = useState("map");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [stockByWarehouse, setStockByWarehouse] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load stock data by warehouse
  const loadStockByWarehouse = async () => {
    try {
      const { data, error } = await supabase
        .from('bm_inv_stock')
        .select(`
          *,
          bm_inv_products(name, sku),
          bm_inv_warehouses(name, location, capacity)
        `);

      if (error) throw error;
      setStockByWarehouse(data || []);
    } catch (error) {
      console.error('Error loading stock by warehouse:', error);
      toast({
        title: "Error Loading Data",
        description: "Failed to load warehouse stock data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStockByWarehouse();
  }, []);

  // Transform warehouses into locations
  const locations: Location[] = warehouses.map(warehouse => {
    const warehouseStock = stockByWarehouse.filter(stock => 
      stock.bm_inv_warehouses?.name === warehouse.name
    );
    const totalStock = warehouseStock.reduce((sum, stock) => sum + stock.quantity, 0);
    const capacity = warehouse.capacity || 1000;

    return {
      id: warehouse.id,
      warehouse: warehouse.name,
      zone: "A", // Default - would be enhanced with location tables
      aisle: "01",
      shelf: "1", 
      bin: "A",
      capacity,
      currentStock: totalStock,
      temperature: "Room Temperature",
      description: warehouse.location || "Warehouse location"
    };
  });

  // Transform stock data into assignments
  const assignments: LocationAssignment[] = stockByWarehouse.map(stock => {
    const warehouse = warehouses.find(w => w.name === stock.bm_inv_warehouses?.name);
    const location: Location = {
      id: warehouse?.id || '',
      warehouse: stock.bm_inv_warehouses?.name || 'Unknown',
      zone: "A",
      aisle: "01", 
      shelf: "1",
      bin: "A",
      capacity: warehouse?.capacity || 1000,
      currentStock: stock.quantity,
      description: warehouse?.location || "Storage location"
    };

    return {
      id: stock.id,
      productId: stock.product_id,
      productName: stock.bm_inv_products?.name || 'Unknown Product',
      sku: stock.bm_inv_products?.sku || 'N/A',
      quantity: stock.quantity,
      location,
      assignedDate: stock.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
      lastMovement: stock.updated_at?.split('T')[0] || new Date().toISOString().split('T')[0],
      status: stock.quantity > 0 ? 'active' as const : 'empty' as const
    };
  });

  const getLocationCode = (location: Location) => {
    return `${location.warehouse.charAt(0)}${location.zone}-${location.aisle}-${location.shelf}-${location.bin}`;
  };

  const getUtilizationPercentage = (location: Location) => {
    return Math.round((location.currentStock / location.capacity) * 100);
  };

  const getUtilizationColor = (percentage: number) => {
    if (percentage >= 90) return "destructive";
    if (percentage >= 70) return "outline";
    return "secondary";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'moving': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'empty': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const filteredAssignments = assignments.filter(assignment =>
    assignment.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getLocationCode(assignment.location).toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading || warehousesLoading) {
    return <div>Loading location data...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Location Tracking System
          </h2>
          <p className="text-muted-foreground">Real-time inventory location management and tracking</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Assign Location
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Assign Product to Location</DialogTitle>
                <DialogDescription>
                  Assign a product to a specific warehouse location
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="product">Product</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="p1">Wireless Headphones (WH-001)</SelectItem>
                      <SelectItem value="p2">Cotton T-Shirt (CT-002)</SelectItem>
                      <SelectItem value="p3">Organic Milk (OM-003)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location.id} value={location.id}>
                          {getLocationCode(location)} - {location.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input id="quantity" type="number" placeholder="Enter quantity" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAssignDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  setShowAssignDialog(false);
                  toast({
                    title: "Location Assigned",
                    description: "Product has been successfully assigned to the location.",
                  });
                }}>
                  Assign
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <QrCode className="h-4 w-4 mr-2" />
            Scan QR
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search by product name, SKU, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList>
          <TabsTrigger value="map">Location Map</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {locations.map((location) => {
              const utilization = getUtilizationPercentage(location);
              const assignments = filteredAssignments.filter(a => a.location.id === location.id);
              
              return (
                <Card key={location.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Warehouse className="h-5 w-5 text-blue-500" />
                        <div>
                          <CardTitle className="text-lg">{getLocationCode(location)}</CardTitle>
                          <CardDescription>{location.description}</CardDescription>
                        </div>
                      </div>
                      <Badge variant={getUtilizationColor(utilization)}>
                        {utilization}% Full
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Warehouse</p>
                        <p className="font-medium">{location.warehouse}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Zone</p>
                        <p className="font-medium">{location.zone}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Capacity</p>
                        <p className="font-medium">{location.capacity} units</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Current Stock</p>
                        <p className="font-medium">{location.currentStock} units</p>
                      </div>
                      {location.temperature && (
                        <div className="col-span-2">
                          <p className="text-muted-foreground">Temperature</p>
                          <p className="font-medium">{location.temperature}</p>
                        </div>
                      )}
                    </div>
                    
                    {assignments.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-2">Products in Location:</p>
                        <div className="space-y-1">
                          {assignments.slice(0, 2).map((assignment) => (
                            <div key={assignment.id} className="flex items-center justify-between text-xs">
                              <span>{assignment.productName}</span>
                              <span className="text-muted-foreground">{assignment.quantity} units</span>
                            </div>
                          ))}
                          {assignments.length > 2 && (
                            <p className="text-xs text-muted-foreground">
                              +{assignments.length - 2} more items
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-6">
          <div className="space-y-4">
            {filteredAssignments.map((assignment) => (
              <Card key={assignment.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(assignment.status)}
                        <div>
                          <h3 className="font-semibold">{assignment.productName}</h3>
                          <p className="text-sm text-muted-foreground">SKU: {assignment.sku}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-blue-500" />
                        <div>
                          <p className="font-medium">{getLocationCode(assignment.location)}</p>
                          <p className="text-sm text-muted-foreground">{assignment.location.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{assignment.quantity} units</p>
                      <p className="text-sm text-muted-foreground">Last moved: {assignment.lastMovement}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Warehouse className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{locations.length}</p>
                    <p className="text-sm text-muted-foreground">Total Locations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <Package className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{assignments.length}</p>
                    <p className="text-sm text-muted-foreground">Items Tracked</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {locations.length > 0 ? 
                        Math.round(locations.reduce((sum, loc) => sum + getUtilizationPercentage(loc), 0) / locations.length) 
                        : 0}%
                    </p>
                    <p className="text-sm text-muted-foreground">Avg Utilization</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Navigation className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{assignments.filter(a => a.status === 'active').length}</p>
                    <p className="text-sm text-muted-foreground">Active Assignments</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Location Utilization Overview</CardTitle>
              <CardDescription>Current capacity usage across all locations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {locations.map((location) => {
                  const utilization = getUtilizationPercentage(location);
                  return (
                    <div key={location.id} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{getLocationCode(location)}</span>
                        <span>{utilization}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            utilization >= 90 ? 'bg-red-500' :
                            utilization >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${utilization}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}