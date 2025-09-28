import { useState, useEffect } from "react";
import { useGlobalization } from "@/contexts/GlobalizationContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { validationSchemas } from "@/lib/validation";
import { InventoryItem } from "./InventoryTable";
import { Sparkles, Wand2, TrendingUp, AlertCircle, MapPin } from "lucide-react";
import type { z } from "zod";

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
  const { formatCurrency, currentCurrency } = useGlobalization();
  const { toast } = useToast();
  const [aiSuggestions, setAiSuggestions] = useState({
    category: '',
    sku: '',
    pricing: { suggested: 0, min: 0, max: 0, markup: 0 },
    stockLevels: { min: 0, max: 0, reorder: 0 },
    supplier: ''
  });
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);

  const form = useForm<z.infer<typeof validationSchemas.inventoryProduct>>({
    resolver: zodResolver(validationSchemas.inventoryProduct),
    defaultValues: {
      name: "",
      sku: "",
      category: "",
      currentStock: 0,
      minStock: 0,
      maxStock: 100,
      reorderPoint: 0,
      unitCost: 0,
      sellingPrice: 0,
      supplier: "",
      warehouse: "",
      zone: "",
      aisle: "",
      shelf: "",
      bin: "",
    },
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
    const name = form.watch("name");
    if (name && name.length > 2) {
      const category = aiCategorizeProduct(name);
      const sku = aiGenerateSKU(name, category);
      const stockLevels = aiSuggestStockLevels(category);
      const supplier = aiSuggestSupplier(category);
      
      const unitCost = form.watch("unitCost");
      setAiSuggestions({
        category,
        sku,
        pricing: unitCost ? aiSuggestPricing(unitCost, category) : { suggested: 0, min: 0, max: 0, markup: 0 },
        stockLevels,
        supplier
      });
      setShowAiSuggestions(true);
    } else {
      setShowAiSuggestions(false);
    }
  }, [form.watch("name"), form.watch("unitCost")]);

  // Update pricing suggestions when unit cost or category changes
  useEffect(() => {
    const unitCost = form.watch("unitCost");
    const category = form.watch("category");
    if (unitCost && category && unitCost > 0) {
      const pricing = aiSuggestPricing(unitCost, category);
      setAiSuggestions(prev => ({ ...prev, pricing }));
    }
  }, [form.watch("unitCost"), form.watch("category")]);

  const handleSubmit = (values: z.infer<typeof validationSchemas.inventoryProduct>) => {
    const newProduct: Omit<InventoryItem, 'id'> = {
      name: values.name,
      sku: values.sku,
      category: values.category,
      currentStock: values.currentStock,
      minStock: values.minStock,
      maxStock: values.maxStock,
      reorderPoint: values.reorderPoint,
      unitCost: values.unitCost,
      sellingPrice: values.sellingPrice,
      supplier: values.supplier || "Unknown",
      lastRestocked: new Date().toISOString().split('T')[0],
      demand7Days: 0,
      demand30Days: 0,
      location: values.warehouse && values.zone ? {
        warehouse: values.warehouse,
        zone: values.zone,
        aisle: values.aisle,
        shelf: values.shelf,
        bin: values.bin,
      } : undefined,
      aiPrediction: {
        nextWeekDemand: values.currentStock,
        confidence: 75,
        recommendation: "New product - monitor initial performance"
      }
    };

    onAddProduct(newProduct);
    
    // Reset form
    form.reset();

    toast({
      title: "Product Added",
      description: `${values.name} has been added to inventory`
    });

    onOpenChange(false);
  };

  const applyAiSuggestion = (field: string, value: string | number) => {
    form.setValue(field as any, typeof value === 'string' ? value : value.toString());
    toast({
      title: "AI Suggestion Applied",
      description: `Applied AI suggestion for ${field}`
    });
  };

  const applyAllAiSuggestions = () => {
    form.setValue("category", aiSuggestions.category);
    form.setValue("sku", aiSuggestions.sku);
    form.setValue("minStock", aiSuggestions.stockLevels.min);
    form.setValue("maxStock", aiSuggestions.stockLevels.max);
    form.setValue("reorderPoint", aiSuggestions.stockLevels.reorder);
    form.setValue("supplier", aiSuggestions.supplier);
    if (aiSuggestions.pricing.suggested > 0) {
      form.setValue("sellingPrice", aiSuggestions.pricing.suggested);
    }
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
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Coffee - Espresso Beans" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SKU *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., COF-ESP-001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="supplier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supplier</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Premium Coffee Co." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="currentStock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Stock</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="minStock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min Stock</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxStock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Stock</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="100" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reorderPoint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reorder Point</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="unitCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit Cost ($)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sellingPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selling Price ({currentCurrency.symbol})</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Location Fields */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-500" />
              <Label className="text-base font-medium">Storage Location (Optional)</Label>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="warehouse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Warehouse</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select warehouse" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Main Warehouse">Main Warehouse</SelectItem>
                        <SelectItem value="Distribution Center">Distribution Center</SelectItem>
                        <SelectItem value="Cold Storage">Cold Storage</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zone</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., A, B, C" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="aisle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aisle</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 01, 02" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shelf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shelf</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 1, 2, 3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bin</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., A, B, C" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
        </Form>
      </DialogContent>
    </Dialog>
  );
}