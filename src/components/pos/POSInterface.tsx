import { useState } from "react";
import { Search, Scan, Users, Gift } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGlobalization } from "@/contexts/GlobalizationContext";
import { ProductGrid, Product } from "./ProductGrid";
import { Cart, CartItem } from "./Cart";
import { CategoryFilter } from "./CategoryFilter";
import { PaymentModal } from "./PaymentModal";
import { AIRecommendations } from "./AIRecommendations";
import { AIPOSIntelligence } from "./AIPOSIntelligence";
import { AIDynamicPricing } from "./AIDynamicPricing";
import { AISecurityFraudDetection } from "./AISecurityFraudDetection";
import { CustomerManagementDialog } from "./CustomerManagementDialog";
import { LoyaltyProgramDialog } from "./LoyaltyProgramDialog";
import { useToast } from "@/hooks/use-toast";
import { usePOS, POSProduct } from "@/hooks/usePOS";
import { supabase } from "@/integrations/supabase/client";

export function POSInterface() {
  const { formatCurrency } = useGlobalization();
  const { products, createTransaction, createCustomer, refetch } = usePOS();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [showCustomerDialog, setShowCustomerDialog] = useState(false);
  const [showLoyaltyDialog, setShowLoyaltyDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("pos");
  const { toast } = useToast();

  // Convert POSProduct to Product format for compatibility
  const convertedProducts: Product[] = products.map(product => ({
    id: product.id,
    name: product.name,
    price: product.price,
    category: product.category,
    stock: product.stock_quantity,
    barcode: product.barcode
  }));

  const categories = [...new Set(convertedProducts.map(p => p.category))];
  
  const filteredProducts = convertedProducts.filter(product => {
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

  const handlePaymentComplete = async (transactionId: string, paymentMethod: 'cash' | 'card' | 'digital', cashReceived?: number) => {
    try {
      const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const taxAmount = subtotal * 0.08; // 8% tax
      const total = subtotal + taxAmount;
      
      // Create transaction in database
      const transactionData = {
        transaction_number: transactionId,
        subtotal,
        tax_amount: taxAmount,
        total_amount: total,
        payment_method: paymentMethod,
        payment_status: 'completed' as const,
        cash_received: cashReceived,
        change_given: cashReceived ? Math.max(0, cashReceived - total) : undefined
      };

      const transactionItems = cartItems.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        unit_price: item.price,
        line_total: item.price * item.quantity
      }));

      await createTransaction(transactionData, transactionItems);
      
      clearCart();
      toast({
        title: "Sale Complete",
        description: `Transaction ${transactionId} processed successfully.`
      });
    } catch (error) {
      console.error('Error completing transaction:', error);
      toast({
        title: "Error",
        description: "Failed to complete transaction",
        variant: "destructive"
      });
    }
  };

  const handleSaveCustomer = async (customerData: any) => {
    try {
      const customer = {
        customer_code: `CUST-${Date.now()}`,
        name: customerData.name,
        email: customerData.email,
        phone: customerData.phone,
        address: customerData.address,
        loyalty_points: 0,
        total_spent: 0,
        visit_count: 0,
        is_active: true
      };

      await createCustomer(customer);
      
      toast({
        title: "Customer Added",
        description: `${customerData.name} has been added to the system`
      });
    } catch (error) {
      console.error('Error saving customer:', error);
      toast({
        title: "Error",
        description: "Failed to save customer",
        variant: "destructive"
      });
    }
  };

  const handleSaveLoyaltyProgram = (program: any) => {
    toast({
      title: "Loyalty Program Created",
      description: `${program.name} is now active`
    });
  };

  const handleSeedSampleData = async () => {
    try {
      const { error } = await supabase.rpc('seed_pos_data_for_user');
      
      if (error) throw error;
      
      await refetch();
      
      toast({
        title: "Sample Data Added",
        description: "Sample products, categories, and customers have been added to your POS system."
      });
    } catch (error) {
      console.error('Error seeding sample data:', error);
      toast({
        title: "Error",
        description: "Failed to add sample data",
        variant: "destructive"
      });
    }
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 1.08; // Including 8% tax

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex flex-wrap h-auto items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-full gap-1">
          <TabsTrigger value="pos" className="px-3 py-2 text-xs font-medium">Point of Sale</TabsTrigger>
          <TabsTrigger value="ai-intelligence" className="px-3 py-2 text-xs font-medium">AI Intelligence</TabsTrigger>
          <TabsTrigger value="ai-pricing" className="px-3 py-2 text-xs font-medium">AI Pricing</TabsTrigger>
          <TabsTrigger value="ai-security" className="px-3 py-2 text-xs font-medium">AI Security</TabsTrigger>
          <TabsTrigger value="customers" className="px-3 py-2 text-xs font-medium">Customers</TabsTrigger>
          <TabsTrigger value="loyalty" className="px-3 py-2 text-xs font-medium">Loyalty</TabsTrigger>
        </TabsList>

        <TabsContent value="pos" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-[calc(100vh-16rem)]">
            {/* Left Panel - Products */}
            <div className="xl:col-span-2 space-y-4 flex flex-col">
              {/* Search and Scan */}
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products or scan barcode..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
                <Button variant="outline" size="default" className="h-12">
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
                {convertedProducts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                    <p className="text-muted-foreground">No products found in your inventory.</p>
                    <Button onClick={handleSeedSampleData} variant="outline">
                      Add Sample Products
                    </Button>
                  </div>
                ) : (
                  <ProductGrid
                    products={filteredProducts}
                    onAddToCart={addToCart}
                    selectedCategory={selectedCategory}
                  />
                )}
              </div>
            </div>

            {/* Right Panel - Cart */}
            <div className="xl:col-span-1">
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

        <TabsContent value="ai-intelligence" className="space-y-6">
          <AIPOSIntelligence />
        </TabsContent>

        <TabsContent value="ai-pricing" className="space-y-6">
          <AIDynamicPricing />
        </TabsContent>

        <TabsContent value="ai-security" className="space-y-6">
          <AISecurityFraudDetection />
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