import { useState } from "react";
import { Search, Scan, Users, Gift } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductGrid, Product } from "./ProductGrid";
import { Cart, CartItem } from "./Cart";
import { CategoryFilter } from "./CategoryFilter";
import { PaymentModal } from "./PaymentModal";
import { AIRecommendations } from "./AIRecommendations";
import { CustomerManagementDialog } from "./CustomerManagementDialog";
import { LoyaltyProgramDialog } from "./LoyaltyProgramDialog";
import { useToast } from "@/hooks/use-toast";

// Mock data - replace with real data from your backend
const mockProducts: Product[] = [
  { id: "1", name: "Coffee - Espresso", price: 3.50, category: "beverages", stock: 50, barcode: "123456789" },
  { id: "2", name: "Croissant - Butter", price: 2.25, category: "pastries", stock: 20 },
  { id: "3", name: "Sandwich - Ham & Cheese", price: 8.95, category: "food", stock: 15 },
  { id: "4", name: "Coffee - Latte", price: 4.25, category: "beverages", stock: 45 },
  { id: "5", name: "Muffin - Blueberry", price: 3.75, category: "pastries", stock: 12 },
  { id: "6", name: "Salad - Caesar", price: 9.50, category: "food", stock: 8 },
  { id: "7", name: "Tea - Earl Grey", price: 2.95, category: "beverages", stock: 30 },
  { id: "8", name: "Bagel - Everything", price: 2.50, category: "pastries", stock: 25 },
  { id: "9", name: "Soup - Tomato", price: 6.75, category: "food", stock: 10 },
  { id: "10", name: "Smoothie - Berry", price: 5.95, category: "beverages", stock: 18 }
];

export function POSInterface() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [showCustomerDialog, setShowCustomerDialog] = useState(false);
  const [showLoyaltyDialog, setShowLoyaltyDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("pos");
  const { toast } = useToast();

  const categories = [...new Set(mockProducts.map(p => p.category))];
  
  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.barcode?.includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product) => {
    setCartItems(items => {
      const existingItem = items.find(item => item.id === product.id);
      
      if (existingItem) {
        if (existingItem.quantity >= product.stock) {
          toast({
            title: "Stock Limit Reached",
            description: `Only ${product.stock} ${product.name} available.`,
            variant: "destructive"
          });
          return items;
        }
        
        return items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...items, { ...product, quantity: 1 }];
    });
    
    toast({
      title: "Added to Cart",
      description: `${product.name} added to cart.`
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(items =>
      items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCartItems(items => items.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart Cleared",
      description: "All items removed from cart."
    });
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Add items to cart before checkout.",
        variant: "destructive"
      });
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentComplete = (transactionId: string) => {
    // Here you would typically:
    // 1. Update inventory
    // 2. Save transaction to database
    // 3. Print receipt
    // 4. Clear cart
    
    clearCart();
    toast({
      title: "Sale Complete",
      description: `Transaction ${transactionId} processed successfully.`
    });
  };

  const handleSaveCustomer = (customer: any) => {
    toast({
      title: "Customer Added",
      description: `${customer.name} has been added to the system`
    });
  };

  const handleSaveLoyaltyProgram = (program: any) => {
    toast({
      title: "Loyalty Program Created",
      description: `${program.name} is now active`
    });
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 1.08; // Including 8% tax

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pos">Point of Sale</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="loyalty">Loyalty</TabsTrigger>
          <TabsTrigger value="ai">AI Assistant</TabsTrigger>
        </TabsList>

        <TabsContent value="pos" className="space-y-6">
          <div className="h-full flex gap-6">
            {/* Left Panel - Products */}
            <div className="flex-1 space-y-4">
              {/* Search and Scan */}
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products or scan barcode..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="default">
                  <Scan className="h-4 w-4 mr-2" />
                  Scan
                </Button>
              </div>

              {/* Categories */}
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />

              {/* Product Grid */}
              <div className="flex-1 overflow-y-auto">
                <ProductGrid
                  products={filteredProducts}
                  onAddToCart={addToCart}
                  selectedCategory={selectedCategory}
                />
              </div>
            </div>

            {/* Right Panel - Cart */}
            <div className="w-80">
              <Cart
                items={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeFromCart}
                onCheckout={handleCheckout}
                onClearCart={clearCart}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Customer Management</h2>
            <Button onClick={() => setShowCustomerDialog(true)}>
              <Users className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </div>
          <div className="text-center text-muted-foreground py-8">
            Customer list and management tools will be displayed here
          </div>
        </TabsContent>

        <TabsContent value="loyalty" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Loyalty Program</h2>
            <Button onClick={() => setShowLoyaltyDialog(true)}>
              <Gift className="h-4 w-4 mr-2" />
              Create Program
            </Button>
          </div>
          <div className="text-center text-muted-foreground py-8">
            Loyalty program management tools will be displayed here
          </div>
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          <AIRecommendations />
        </TabsContent>
      </Tabs>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        items={cartItems}
        total={total}
        onPaymentComplete={handlePaymentComplete}
      />

      <CustomerManagementDialog
        open={showCustomerDialog}
        onOpenChange={setShowCustomerDialog}
        onSaveCustomer={handleSaveCustomer}
      />

      <LoyaltyProgramDialog
        open={showLoyaltyDialog}
        onOpenChange={setShowLoyaltyDialog}
        onSaveProgram={handleSaveLoyaltyProgram}
      />
    </div>
  );
}