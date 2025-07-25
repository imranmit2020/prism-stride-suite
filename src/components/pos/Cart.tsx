import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useGlobalization } from "@/contexts/GlobalizationContext";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { Product } from "./ProductGrid";

export interface CartItem extends Product {
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  onClearCart: () => void;
}

export function Cart({ items, onUpdateQuantity, onRemoveItem, onCheckout, onClearCart }: CartProps) {
  const { formatCurrency } = useGlobalization();
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Cart ({items.length})
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-center">
            <div>
              <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No items in cart</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-12 h-12 bg-muted rounded flex items-center justify-center text-sm">
                    📦
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(item.price)} each
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-6 w-6 p-0"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    
                    <Badge variant="secondary" className="min-w-[2rem] justify-center">
                      {item.quantity}
                    </Badge>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-6 w-6 p-0"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="destructive"
                      className="h-6 w-6 p-0"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 pt-4">
              <Separator />
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8%):</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button 
                  onClick={onCheckout}
                  className="w-full"
                  size="lg"
                >
                  Checkout - {formatCurrency(total)}
                </Button>
                
                <Button 
                  onClick={onClearCart}
                  variant="outline"
                  className="w-full"
                  size="sm"
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}