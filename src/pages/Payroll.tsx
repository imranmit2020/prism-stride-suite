import { PayrollInterface } from "@/components/payroll/PayrollInterface";
import { PersonalIncomeInterface } from "@/components/payroll/PersonalIncomeInterface";

interface PayrollProps {
  isHomeMode?: boolean;
}

export default function Payroll({ isHomeMode = false }: PayrollProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          {isHomeMode ? "Income Tracking" : "Payroll Management"}
        </h1>
        <p className="text-muted-foreground mt-2">
          {isHomeMode 
            ? "Track multiple income sources, freelance payments, and tax withholdings."
            : "Comprehensive payroll processing with employee management and tax calculations."
          }
        </p>
      </div>
      {isHomeMode ? <PersonalIncomeInterface /> : <PayrollInterface />}
    </div>
  );
}