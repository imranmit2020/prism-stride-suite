import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  stock: number;
  barcode?: string;
}

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  selectedCategory: string;
}

export function ProductGrid({ products, onAddToCart, selectedCategory }: ProductGridProps) {
  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredProducts.map((product) => (
        <Card 
          key={product.id} 
          className="cursor-pointer hover:shadow-md transition-shadow"
        >
          <CardContent className="p-4">
            <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center">
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-4xl">📦</div>
              )}
            </div>
            
            <h3 className="font-medium text-sm mb-1 line-clamp-2">
              {product.name}
            </h3>
            
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
              <Badge variant="secondary" className="text-xs">
                {product.stock} left
              </Badge>
            </div>
            
            <Button 
              onClick={() => onAddToCart(product)}
              disabled={product.stock === 0}
              className="w-full h-8 text-xs"
              size="sm"
            >
              <Plus className="h-3 w-3 mr-1" />
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}