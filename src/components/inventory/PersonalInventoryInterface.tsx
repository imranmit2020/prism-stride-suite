import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Package,
  Search,
  Home,
  AlertTriangle,
  MapPin
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePersonalInventory } from "@/hooks/usePersonalInventory";
import { AddPersonalItemDialog } from "./AddPersonalItemDialog";
import { PersonalImportExportActions } from "./PersonalImportExportActions";
import { PersonalInventoryAnalytics } from "@/components/personal-analytics/PersonalInventoryAnalytics";

export function PersonalInventoryInterface() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  
  const { 
    items, 
    categories, 
    locations, 
    loading,
    addItem,
    updateItem,
    deleteItem,
    getInventoryStats
  } = usePersonalInventory();

  const stats = getInventoryStats();

  // Filter items based on search term
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (item: any) => {
    if (item.condition === 'poor') return <Badge variant="destructive">Poor</Badge>;
    if (item.condition === 'fair') return <Badge variant="outline" className="border-warning text-warning">Fair</Badge>;
    if (item.condition === 'good') return <Badge variant="secondary">Good</Badge>;
    return <Badge variant="default">Excellent</Badge>;
  };

  const handleAddItem = async (item: any) => {
    await addItem(item);
  };

  const handleImportItems = async (importedItems: any[]) => {
    for (const item of importedItems) {
      await addItem(item);
    }
  };

  // Transform items for import/export component
  const transformedItems = items.map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    category: item.category?.name || '',
    location: item.location,
    condition: item.condition,
    purchase_date: item.purchase_date,
    purchase_price: item.purchase_price,
    current_value: item.current_value,
    warranty_expiry: item.warranty_expiry,
    serial_number: item.serial_number,
    model: item.model,
    brand: item.brand,
    notes: item.notes
  }));

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex flex-wrap h-auto items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-full">
          <TabsTrigger value="overview" className="px-3 py-2 text-xs font-medium">Overview</TabsTrigger>
          <TabsTrigger value="items" className="px-3 py-2 text-xs font-medium">My Items</TabsTrigger>
          <TabsTrigger value="import-export" className="px-3 py-2 text-xs font-medium">Import/Export</TabsTrigger>
          <TabsTrigger value="analytics" className="px-3 py-2 text-xs font-medium">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
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
                  <Package className="h-4 w-4 text-blue-500" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-500">{loading ? '...' : categories.length}</div>
                <div className="text-xs text-muted-foreground">Item categories</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {items.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">{item.category?.name || 'Uncategorized'}</div>
                      </div>
                    </div>
                    {getStatusBadge(item)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="items" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Personal Items
                </CardTitle>
                <Button onClick={() => setShowAddDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>
              <div className="flex gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">{item.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>{item.category?.name || 'Uncategorized'}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-blue-500" />
                          <span>{item.location || 'Not set'}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(item)}</TableCell>
                      <TableCell>${item.current_value || 0}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
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
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="import-export" className="space-y-6">
          <PersonalImportExportActions 
            items={transformedItems}
            onImportItems={handleImportItems}
          />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <PersonalInventoryAnalytics />
        </TabsContent>
      </Tabs>

      <AddPersonalItemDialog 
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddItem={handleAddItem}
      />
    </div>
  );
}