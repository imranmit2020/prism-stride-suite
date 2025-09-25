import { InventoryInterface } from "@/components/inventory/InventoryInterface";
import { PersonalInventoryInterface } from "@/components/inventory/PersonalInventoryInterface";

interface InventoryProps {
  isHomeMode?: boolean;
}

export default function Inventory({ isHomeMode = false }: InventoryProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          {isHomeMode ? "Home Inventory" : "Inventory Management"}
        </h1>
        <p className="text-muted-foreground mt-2">
          {isHomeMode 
            ? "Track household items, pantry stock, and personal belongings."
            : "AI-powered inventory management with smart reorders and demand forecasting."
          }
        </p>
      </div>
      {isHomeMode ? <PersonalInventoryInterface /> : <InventoryInterface />}
    </div>
  );
}