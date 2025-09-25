import { AccountingInterface } from "@/components/accounting/AccountingInterface";
import { useHomeMode } from "@/contexts/HomeModeContext";

export default function Accounting() {
  const { isHomeMode } = useHomeMode();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          {isHomeMode ? "Personal Finance" : "Accounting"}
        </h1>
        <p className="text-muted-foreground mt-2">
          {isHomeMode 
            ? "Personal budget tracking, bill management, and expense categorization."
            : "Complete financial management with invoicing, expenses, and reporting."
          }
        </p>
      </div>
      <AccountingInterface isHomeMode={isHomeMode} />
    </div>
  );
}