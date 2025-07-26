import { useState } from "react";
import { useGlobalization } from "@/contexts/GlobalizationContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Banknote, Smartphone, Receipt } from "lucide-react";
import { CartItem } from "./Cart";
import { useToast } from "@/hooks/use-toast";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onPaymentComplete: (transactionId: string, paymentMethod: 'cash' | 'card' | 'digital', cashReceived?: number) => void;
}

export function PaymentModal({ isOpen, onClose, items, total, onPaymentComplete }: PaymentModalProps) {
  const { formatCurrency } = useGlobalization();
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card" | "digital">("cash");
  const [cashReceived, setCashReceived] = useState("");
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const change = paymentMethod === "cash" ? Math.max(0, parseFloat(cashReceived || "0") - total) : 0;

  const handlePayment = async () => {
    if (paymentMethod === "cash" && parseFloat(cashReceived) < total) {
      toast({
        title: "Insufficient Cash",
        description: "Cash received is less than the total amount.",
        variant: "destructive"
      });
      return;
    }

    setProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const transactionId = `TXN-${Date.now()}`;
    const cashAmount = paymentMethod === "cash" ? parseFloat(cashReceived) : undefined;
    
    onPaymentComplete(transactionId, paymentMethod, cashAmount);
    
    toast({
      title: "Payment Successful",
      description: `Transaction ${transactionId} completed successfully.`
    });
    
    setProcessing(false);
    onClose();
    setCashReceived("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Complete Payment
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Summary */}
          <div className="space-y-3">
            <h3 className="font-medium">Order Summary</h3>
            <div className="max-h-32 overflow-y-auto space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.quantity}x {item.name}</span>
                  <span>{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            
            <Separator />
            
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <h3 className="font-medium">Payment Method</h3>
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant={paymentMethod === "cash" ? "default" : "outline"}
                onClick={() => setPaymentMethod("cash")}
                className="flex flex-col gap-2 h-16"
              >
                <Banknote className="h-5 w-5" />
                Cash
              </Button>
              <Button
                variant={paymentMethod === "card" ? "default" : "outline"}
                onClick={() => setPaymentMethod("card")}
                className="flex flex-col gap-2 h-16"
              >
                <CreditCard className="h-5 w-5" />
                Card
              </Button>
              <Button
                variant={paymentMethod === "digital" ? "default" : "outline"}
                onClick={() => setPaymentMethod("digital")}
                className="flex flex-col gap-2 h-16"
              >
                <Smartphone className="h-5 w-5" />
                Digital
              </Button>
            </div>
          </div>

          {/* Cash Payment Details */}
          {paymentMethod === "cash" && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="cash-received">Cash Received</Label>
                  <Input
                    id="cash-received"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={cashReceived}
                    onChange={(e) => setCashReceived(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Change</Label>
                  <div className="h-10 flex items-center px-3 bg-muted rounded-md">
                    ${change.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
              disabled={processing}
            >
              Cancel
            </Button>
            <Button 
              onClick={handlePayment}
              className="flex-1"
              disabled={processing || (paymentMethod === "cash" && !cashReceived)}
            >
              {processing ? "Processing..." : `Complete Payment`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}