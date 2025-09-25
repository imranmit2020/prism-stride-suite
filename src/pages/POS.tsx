import { POSInterface } from "@/components/pos/POSInterface";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface POSProps {
  isHomeMode?: boolean;
}

export default function POS({ isHomeMode = false }: POSProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isHomeMode) {
      navigate("/inventory");
    }
  }, [isHomeMode, navigate]);

  if (isHomeMode) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Redirecting to Home Inventory...</h1>
          <p className="text-muted-foreground mt-2">Point of Sale is not available in Personal Mode.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 h-full">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Point of Sale</h1>
        <p className="text-muted-foreground mt-2">
          Process transactions, manage cart, and handle payments.
        </p>
      </div>
      <div className="h-[calc(100vh-200px)]">
        <POSInterface />
      </div>
    </div>
  );
}