import { useState, useEffect } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { InventoryItem } from "./InventoryTable";
import { Sparkles, Wand2, TrendingUp, AlertCircle } from "lucide-react";

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddProduct: (product: Omit<InventoryItem, 'id'>) => void;
}

// AI-powered product categorization
const aiCategorizeProduct = (name: string): string => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('coffee') || lowerName.includes('tea') || lowerName.includes('drink') || lowerName.includes('juice')) return 'Beverages';
  if (lowerName.includes('croissant') || lowerName.includes('muffin') || lowerName.includes('cake') || lowerName.includes('pastry')) return 'Pastries';
  if (lowerName.includes('sandwich') || lowerName.includes('burger') || lowerName.includes('salad') || lowerName.includes('meal')) return 'Food';
  if (lowerName.includes('milk') || lowerName.includes('cream') || lowerName.includes('cheese') || lowerName.includes('yogurt')) return 'Dairy';
  if (lowerName.includes('cup') || lowerName.includes('napkin') || lowerName.includes('bag') || lowerName.includes('container')) return 'Supplies';
  if (lowerName.includes('machine') || lowerName.includes('equipment') || lowerName.includes('tool')) return 'Equipment';
  return 'Food';
};

// AI-powered SKU generation
const aiGenerateSKU = (name: string, category: string): string => {
  const categoryCode = category.substring(0, 3).toUpperCase();
  const nameWords = name.split(' ').filter(word => word.length > 2);
  const nameCode = nameWords.slice(0, 2).map(word => word.substring(0, 3).toUpperCase()).join('-');
  const randomNum = Math.floor(Math.random() * 900) + 100;
  return `${categoryCode}-${nameCode}-${randomNum}`;
};

// AI pricing suggestions
const aiSuggestPricing = (unitCost: number, category: string) => {
  const markupRates: Record<string, number> = {
    'Beverages': 2.8,
    'Pastries': 1.9,
    'Food': 2.2,
    'Dairy': 1.7,
    'Supplies': 1.5,
    'Equipment': 1.3
  };
  
  const markup = markupRates[category] || 2.0;
  const suggestedPrice = unitCost * markup;
  const minPrice = unitCost * 1.2;
  const maxPrice = unitCost * 3.5;
  
  return {
    suggested: Math.round(suggestedPrice * 100) / 100,
    min: Math.round(minPrice * 100) / 100,
    max: Math.round(maxPrice * 100) / 100,
    markup
  };
};

// AI stock level recommendations
const aiSuggestStockLevels = (category: string) => {
  const stockProfiles: Record<string, { min: number; max: number; reorder: number }> = {
    'Beverages': { min: 20, max: 200, reorder: 35 },
    'Pastries': { min: 10, max: 50, reorder: 20 },
    'Food': { min: 15, max: 80, reorder: 25 },
    'Dairy': { min: 8, max: 30, reorder: 15 },
    'Supplies': { min: 50, max: 500, reorder: 100 },
    'Equipment': { min: 2, max: 10, reorder: 5 }
  };
  
  return stockProfiles[category] || { min: 10, max: 100, reorder: 20 };
};

// AI supplier suggestions
const aiSuggestSupplier = (category: string): string => {
  const suppliers: Record<string, string[]> = {
    'Beverages': ['Premium Coffee Co.', 'Tea & More Ltd', 'Beverage Solutions Inc'],
    'Pastries': ['French Bakery Supply', 'Sweet Delights Co.', 'Artisan Pastries Ltd'],
    'Food': ['Fresh Foods Ltd', 'Gourmet Suppliers Inc', 'Quality Food Co.'],
    'Dairy': ['Dairy Fresh Co.', 'Organic Dairy Ltd', 'Premium Dairy Supply'],
    'Supplies': ['Restaurant Supply Co.', 'Food Service Solutions', 'Supply Chain Plus'],
    'Equipment': ['Kitchen Equipment Ltd', 'Commercial Solutions', 'Pro Equipment Co.']
  };
  
  const categorySuppliers = suppliers[category] || ['Generic Supplier Co.'];
  return categorySuppliers[Math.floor(Math.random() * categorySuppliers.length)];
};

export function AddProductDialog({ open, onOpenChange, onAddProduct }: AddProductDialogProps) {
  const { toast } = useToast();
  const [aiSuggestions, setAiSuggestions] = useState({
    category: '',
    sku: '',
    pricing: { suggested: 0, min: 0, max: 0, markup: 0 },
    stockLevels: { min: 0, max: 0, reorder: 0 },
    supplier: ''
  });
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
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

  // AI analysis when product name changes
  useEffect(() => {
    if (formData.name.length > 2) {
      const category = aiCategorizeProduct(formData.name);
      const sku = aiGenerateSKU(formData.name, category);
      const stockLevels = aiSuggestStockLevels(category);
      const supplier = aiSuggestSupplier(category);
      
      setAiSuggestions({
        category,
        sku,
        pricing: formData.unitCost ? aiSuggestPricing(parseFloat(formData.unitCost), category) : { suggested: 0, min: 0, max: 0, markup: 0 },
        stockLevels,
        supplier
      });
      setShowAiSuggestions(true);
    } else {
      setShowAiSuggestions(false);
    }
  }, [formData.name, formData.unitCost]);

  // Update pricing suggestions when unit cost or category changes
  useEffect(() => {
    if (formData.unitCost && formData.category) {
      const cost = parseFloat(formData.unitCost);
      if (cost > 0) {
        const pricing = aiSuggestPricing(cost, formData.category);
        setAiSuggestions(prev => ({ ...prev, pricing }));
      }
    }
  }, [formData.unitCost, formData.category]);

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

  const applyAiSuggestion = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value.toString() }));
    toast({
      title: "AI Suggestion Applied",
      description: `Applied AI suggestion for ${field}`
    });
  };

  const applyAllAiSuggestions = () => {
    setFormData(prev => ({
      ...prev,
      category: aiSuggestions.category,
      sku: aiSuggestions.sku,
      minStock: aiSuggestions.stockLevels.min.toString(),
      maxStock: aiSuggestions.stockLevels.max.toString(),
      reorderPoint: aiSuggestions.stockLevels.reorder.toString(),
      supplier: aiSuggestions.supplier,
      ...(aiSuggestions.pricing.suggested > 0 && {
        sellingPrice: aiSuggestions.pricing.suggested.toString()
      })
    }));
    toast({
      title: "AI Suggestions Applied",
      description: "All AI suggestions have been applied to the form"
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Add New Product
          </DialogTitle>
          <DialogDescription>
            Add a new product to your inventory. Our AI will suggest optimal settings based on your input.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* AI Suggestions Panel */}
          {showAiSuggestions && (
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Wand2 className="h-4 w-4 text-primary" />
                    <span className="font-medium text-sm">AI Suggestions</span>
                  </div>
                  <Button 
                    type="button" 
                    size="sm" 
                    variant="outline"
                    onClick={applyAllAiSuggestions}
                    className="text-xs"
                  >
                    Apply All
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-1 text-xs"
                        onClick={() => applyAiSuggestion('category', aiSuggestions.category)}
                      >
                        <Badge variant="secondary">{aiSuggestions.category}</Badge>
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">SKU:</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-1 text-xs font-mono"
                        onClick={() => applyAiSuggestion('sku', aiSuggestions.sku)}
                      >
                        {aiSuggestions.sku}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Supplier:</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-1 text-xs"
                        onClick={() => applyAiSuggestion('supplier', aiSuggestions.supplier)}
                      >
                        {aiSuggestions.supplier}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {aiSuggestions.pricing.suggested > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Price:</span>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3 text-green-500" />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-auto p-1 text-xs"
                            onClick={() => applyAiSuggestion('sellingPrice', aiSuggestions.pricing.suggested)}
                          >
                            ${aiSuggestions.pricing.suggested}
                          </Button>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Min Stock:</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-1 text-xs"
                        onClick={() => applyAiSuggestion('minStock', aiSuggestions.stockLevels.min)}
                      >
                        {aiSuggestions.stockLevels.min}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Reorder:</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-1 text-xs"
                        onClick={() => applyAiSuggestion('reorderPoint', aiSuggestions.stockLevels.reorder)}
                      >
                        {aiSuggestions.stockLevels.reorder}
                      </Button>
                    </div>
                  </div>
                </div>
                
                {aiSuggestions.pricing.suggested > 0 && (
                  <div className="mt-3 p-2 bg-background rounded text-xs">
                    <div className="flex items-center gap-1 mb-1">
                      <AlertCircle className="h-3 w-3" />
                      <span className="font-medium">Pricing Analysis</span>
                    </div>
                    <div className="text-muted-foreground">
                      Suggested markup: {Math.round((aiSuggestions.pricing.markup - 1) * 100)}% • 
                      Range: ${aiSuggestions.pricing.min} - ${aiSuggestions.pricing.max}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
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