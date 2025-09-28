import { useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useValidatedForm } from "@/hooks/useValidatedForm";
import { validationSchemas } from "@/lib/validation";
import { InventoryItem } from "./InventoryTable";
import { useInventory } from "@/hooks/useInventory";
import type { z } from "zod";

interface EditProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: InventoryItem | null;
  onUpdateProduct: (productId: string, updates: Partial<InventoryItem>) => Promise<void>;
}

export function EditProductDialog({ open, onOpenChange, product, onUpdateProduct }: EditProductDialogProps) {
  const defaultValues = {
    name: product?.name || "",
    sku: product?.sku || "",
    category: product?.category || "",
    currentStock: product?.currentStock || 0,
    minStock: product?.minStock || 0,
    maxStock: product?.maxStock || 0,
    reorderPoint: product?.reorderPoint || 0,
    unitCost: product?.unitCost || 0,
    sellingPrice: product?.sellingPrice || 0,
    supplier: product?.supplier || "",
    warehouse: product?.location?.warehouse || "",
    zone: product?.location?.zone || "",
    aisle: product?.location?.aisle || "",
    shelf: product?.location?.shelf || "",
    bin: product?.location?.bin || ""
  };

  const { form, handleSubmit, isSubmitting } = useValidatedForm(
    validationSchemas.inventoryProduct,
    defaultValues,
    async (data) => {
      if (!product) return;
      await onUpdateProduct(product.id, data);
      onOpenChange(false);
    }
  );

  // Update form when product changes
  useEffect(() => {
    if (product && open) {
      form.reset({
        name: product.name || "",
        sku: product.sku || "",
        category: product.category || "",
        currentStock: product.currentStock || 0,
        minStock: product.minStock || 0,
        maxStock: product.maxStock || 0,
        reorderPoint: product.reorderPoint || 0,
        unitCost: product.unitCost || 0,
        sellingPrice: product.sellingPrice || 0,
        supplier: product.supplier || "",
        warehouse: product.location?.warehouse || "",
        zone: product.location?.zone || "",
        aisle: product.location?.aisle || "",
        shelf: product.location?.shelf || "",
        bin: product.location?.bin || ""
      });
    }
  }, [product, open, form]);

  const categories = [
    "Electronics",
    "Clothing", 
    "Groceries",
    "Toys",
    "Furniture",
    "Sports",
    "Books",
    "Beverages",
    "Food",
    "Pastries",
    "Dairy",
    "Supplies",
    "Equipment",
    "Pharmaceuticals",
    "Automotive",
    "Beauty & Health",
    "Home & Garden"
  ];

  const suppliers = [
    "Supplier A",
    "Supplier B", 
    "Supplier C",
    "Supplier D",
    "Supplier E",
    "Premium Coffee Co.",
    "French Bakery Supply",
    "Fresh Foods Ltd",
    "Dairy Fresh Co.",
    "Restaurant Supply Co.",
    "Kitchen Equipment Ltd",
    "Global Electronics Inc.",
    "Fashion Forward Wholesale",
    "Green Valley Organics"
  ];

  const currencies = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'INR', name: 'Indian Rupee' },
    { code: 'MXN', name: 'Mexican Peso' },
    { code: 'BRL', name: 'Brazilian Real' },
    { code: 'CNY', name: 'Chinese Yuan' }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" key={product?.id}>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Update product information with comprehensive validation for global operations
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
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
                      <Input placeholder="Enter SKU" {...field} />
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
                    <Select onValueChange={field.onChange} value={field.value}>
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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select supplier" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {suppliers.map((supplier) => (
                          <SelectItem key={supplier} value={supplier}>
                            {supplier}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                    <FormLabel>Unit Cost</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01" 
                        min="0"
                        placeholder="0.00"
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
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
                    <FormLabel>Selling Price</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01" 
                        min="0"
                        placeholder="0.00"
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
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
                      <Input 
                        type="number" 
                        min="0"
                        placeholder="0"
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
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
                      <Input 
                        type="number" 
                        min="0"
                        placeholder="0"
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
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
                      <Input 
                        type="number" 
                        min="0"
                        placeholder="0"
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
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
                      <Input 
                        type="number" 
                        min="0"
                        placeholder="0"
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="warehouse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Warehouse</FormLabel>
                    <FormControl>
                      <Input placeholder="Main Warehouse" {...field} />
                    </FormControl>
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
                      <Input placeholder="A" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="aisle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aisle</FormLabel>
                    <FormControl>
                      <Input placeholder="1" {...field} />
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
                      <Input placeholder="A" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Product"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}