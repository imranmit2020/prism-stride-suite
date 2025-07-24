import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { InventoryItem } from "./InventoryTable";

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddProduct: (product: Omit<InventoryItem, 'id'>) => void;
}

export function AddProductDialog({ open, onOpenChange, onAddProduct }: AddProductDialogProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    currentStock: "",
    minStock: "",
    maxStock: "",
    reorderPoint: "",
    unitCost: "",
    sellingPrice: "",
    supplier: "",
  });

  const categories = [
    "Beverages",
    "Pastries",
    "Food",
    "Dairy",
    "Supplies",
    "Equipment"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.sku || !formData.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newProduct: Omit<InventoryItem, 'id'> = {
      name: formData.name,
      sku: formData.sku,
      category: formData.category,
      currentStock: parseInt(formData.currentStock) || 0,
      minStock: parseInt(formData.minStock) || 0,
      maxStock: parseInt(formData.maxStock) || 100,
      reorderPoint: parseInt(formData.reorderPoint) || 0,
      unitCost: parseFloat(formData.unitCost) || 0,
      sellingPrice: parseFloat(formData.sellingPrice) || 0,
      supplier: formData.supplier || "Unknown",
      lastRestocked: new Date().toISOString().split('T')[0],
      demand7Days: 0,
      demand30Days: 0,
      aiPrediction: {
        nextWeekDemand: parseInt(formData.currentStock) || 0,
        confidence: 75,
        recommendation: "New product - monitor initial performance"
      }
    };

    onAddProduct(newProduct);
    
    // Reset form
    setFormData({
      name: "",
      sku: "",
      category: "",
      currentStock: "",
      minStock: "",
      maxStock: "",
      reorderPoint: "",
      unitCost: "",
      sellingPrice: "",
      supplier: "",
    });

    toast({
      title: "Product Added",
      description: `${formData.name} has been added to inventory`
    });

    onOpenChange(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Add a new product to your inventory with stock levels and pricing information.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="e.g., Coffee - Espresso Beans"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sku">SKU *</Label>
              <Input
                id="sku"
                value={formData.sku}
                onChange={(e) => handleInputChange("sku", e.target.value)}
                placeholder="e.g., COF-ESP-001"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="supplier">Supplier</Label>
              <Input
                id="supplier"
                value={formData.supplier}
                onChange={(e) => handleInputChange("supplier", e.target.value)}
                placeholder="e.g., Premium Coffee Co."
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentStock">Current Stock</Label>
              <Input
                id="currentStock"
                type="number"
                value={formData.currentStock}
                onChange={(e) => handleInputChange("currentStock", e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minStock">Min Stock</Label>
              <Input
                id="minStock"
                type="number"
                value={formData.minStock}
                onChange={(e) => handleInputChange("minStock", e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxStock">Max Stock</Label>
              <Input
                id="maxStock"
                type="number"
                value={formData.maxStock}
                onChange={(e) => handleInputChange("maxStock", e.target.value)}
                placeholder="100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reorderPoint">Reorder Point</Label>
              <Input
                id="reorderPoint"
                type="number"
                value={formData.reorderPoint}
                onChange={(e) => handleInputChange("reorderPoint", e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="unitCost">Unit Cost ($)</Label>
              <Input
                id="unitCost"
                type="number"
                step="0.01"
                value={formData.unitCost}
                onChange={(e) => handleInputChange("unitCost", e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sellingPrice">Selling Price ($)</Label>
              <Input
                id="sellingPrice"
                type="number"
                step="0.01"
                value={formData.sellingPrice}
                onChange={(e) => handleInputChange("sellingPrice", e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Product</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}