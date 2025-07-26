import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AccountingOverview } from "./AccountingOverview";
import { InvoiceManagement } from "./InvoiceManagement";
import { ExpenseTracking } from "./ExpenseTracking";
import { FinancialReports } from "./FinancialReports";
import { AIFinancialInsights } from "./AIFinancialInsights";
import { AITaxAuditShield } from "./AITaxAuditShield";
import { AIFraudPatternGenesis } from "./AIFraudPatternGenesis";
import { AICashFlowProphet } from "./AICashFlowProphet";
import { AILanguageIntelligence } from "./AILanguageIntelligence";
import { AICurrencyProphet } from "./AICurrencyProphet";
import { AITaxQuantumEngine } from "./AITaxQuantumEngine";
import { AICountryIntelligence } from "./AICountryIntelligence";
import { SmartInvoiceDialog } from "./SmartInvoiceDialog";
import { ExpenseManagementDialog } from "./ExpenseManagementDialog";
import { useAccounting } from "@/hooks/useAccounting";
import { useToast } from "@/hooks/use-toast";
import { FileText, Receipt, PiggyBank } from "lucide-react";
import { PersonalExpenseInput } from "../personal-analytics/PersonalExpenseInput";
import { PersonalBudgetInput } from "../personal-analytics/PersonalBudgetInput";

interface AccountingInterfaceProps {
  isHomeMode?: boolean;
}

export function AccountingInterface({ isHomeMode = false }: AccountingInterfaceProps) {
  console.log("🧮 AccountingInterface rendering");
  const [activeTab, setActiveTab] = useState("overview");
  const [showInvoiceDialog, setShowInvoiceDialog] = useState(false);
  const [showExpenseDialog, setShowExpenseDialog] = useState(false);
  const { toast } = useToast();
  const { saveInvoice, loading } = useAccounting();

  const handleSaveInvoice = async (invoice: any) => {
    const result = await saveInvoice(invoice);
    if (result.success) {
      setShowInvoiceDialog(false);
    }
  };

  const handleSaveExpense = (expense: any) => {
    toast({
      title: "Expense Saved",
      description: `Expense of $${expense.receipt.total.toFixed(2)} has been processed and categorized`
    });
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex flex-wrap h-auto items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-full">
          {isHomeMode ? (
            <>
              <TabsTrigger value="overview" className="px-3 py-2 text-xs font-medium">Overview</TabsTrigger>
              <TabsTrigger value="add-expense" className="px-3 py-2 text-xs font-medium">Add Expense</TabsTrigger>
              <TabsTrigger value="add-budget" className="px-3 py-2 text-xs font-medium">Add Budget</TabsTrigger>
              <TabsTrigger value="expenses" className="px-3 py-2 text-xs font-medium">Expense Tracking</TabsTrigger>
              <TabsTrigger value="budgets" className="px-3 py-2 text-xs font-medium">Budget Management</TabsTrigger>
              <TabsTrigger value="reports" className="px-3 py-2 text-xs font-medium">Financial Reports</TabsTrigger>
            </>
          ) : (
            <>
              <TabsTrigger value="overview" className="px-3 py-2 text-xs font-medium">Overview</TabsTrigger>
              <TabsTrigger value="invoices" className="px-3 py-2 text-xs font-medium">Invoices</TabsTrigger>
              <TabsTrigger value="smart-invoice" className="px-3 py-2 text-xs font-medium">Smart Invoice</TabsTrigger>
              <TabsTrigger value="expenses" className="px-3 py-2 text-xs font-medium">Expenses</TabsTrigger>
              <TabsTrigger value="reports" className="px-3 py-2 text-xs font-medium">Reports</TabsTrigger>
              <TabsTrigger value="ai-insights" className="px-3 py-2 text-xs font-medium">AI Insights</TabsTrigger>
              <TabsTrigger value="audit-shield" className="px-3 py-2 text-xs font-medium">Audit AI</TabsTrigger>
              <TabsTrigger value="fraud-genesis" className="px-3 py-2 text-xs font-medium">Fraud AI</TabsTrigger>
              <TabsTrigger value="cash-prophet" className="px-3 py-2 text-xs font-medium">Cash AI</TabsTrigger>
              <TabsTrigger value="language-ai" className="px-3 py-2 text-xs font-medium">Language AI</TabsTrigger>
              <TabsTrigger value="currency-ai" className="px-3 py-2 text-xs font-medium">Currency AI</TabsTrigger>
              <TabsTrigger value="tax-quantum" className="px-3 py-2 text-xs font-medium">Tax AI</TabsTrigger>
              <TabsTrigger value="country-ai" className="px-3 py-2 text-xs font-medium">Country AI</TabsTrigger>
            </>
          )}
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <AccountingOverview />
        </TabsContent>

        {isHomeMode ? (
          <>
            <TabsContent value="add-expense" className="space-y-6">
              <PersonalExpenseInput />
            </TabsContent>

            <TabsContent value="add-budget" className="space-y-6">
              <PersonalBudgetInput />
            </TabsContent>

            <TabsContent value="expenses" className="space-y-6">
              <ExpenseTracking 
                onAddExpense={() => setActiveTab("add-expense")}
                onEditExpense={(expense) => console.log("Edit expense:", expense)}
              />
            </TabsContent>

            <TabsContent value="budgets" className="space-y-6">
              <div className="text-center text-muted-foreground py-8">
                Personal budget management and tracking interface coming soon
              </div>
            </TabsContent>
          </>
        ) : (
          <>
            <TabsContent value="invoices" className="space-y-6">
              <div className="text-center text-muted-foreground py-8">
                Standard invoice management interface
              </div>
            </TabsContent>

            <TabsContent value="smart-invoice" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Smart Invoice Processing</h2>
                <Button onClick={() => setShowInvoiceDialog(true)}>
                  <FileText className="h-4 w-4 mr-2" />
                  Process Invoice
                </Button>
              </div>
              <div className="text-center text-muted-foreground py-8">
                AI-powered invoice processing with OCR extraction, fraud detection, and smart categorization
              </div>
              {showInvoiceDialog && (
                <div className="p-4 bg-green-100 rounded">
                  Dialog state: Invoice dialog is open
                </div>
              )}
            </TabsContent>

            <TabsContent value="expenses" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Smart Expense Management</h2>
                <Button onClick={() => setShowExpenseDialog(true)}>
                  <Receipt className="h-4 w-4 mr-2" />
                  Add Expense
                </Button>
              </div>
              <div className="text-center text-muted-foreground py-8">
                AI-powered expense processing with receipt OCR, smart categorization, and compliance checking
              </div>
              {showExpenseDialog && (
                <div className="p-4 bg-blue-100 rounded">
                  Dialog state: Expense dialog is open
                </div>
              )}
            </TabsContent>
          </>
        )}

        <TabsContent value="reports" className="space-y-6">
          <FinancialReports />
        </TabsContent>

        {!isHomeMode && (
          <>
            <TabsContent value="ai-insights" className="space-y-6">
              <AIFinancialInsights />
            </TabsContent>

            <TabsContent value="audit-shield" className="space-y-6">
              <AITaxAuditShield />
            </TabsContent>

            <TabsContent value="fraud-genesis" className="space-y-6">
              <AIFraudPatternGenesis />
            </TabsContent>

            <TabsContent value="cash-prophet" className="space-y-6">
              <AICashFlowProphet />
            </TabsContent>

            <TabsContent value="language-ai" className="space-y-6">
              <AILanguageIntelligence />
            </TabsContent>

            <TabsContent value="currency-ai" className="space-y-6">
              <AICurrencyProphet />
            </TabsContent>

            <TabsContent value="tax-quantum" className="space-y-6">
              <AITaxQuantumEngine />
            </TabsContent>

            <TabsContent value="country-ai" className="space-y-6">
              <AICountryIntelligence />
            </TabsContent>
          </>
        )}
      </Tabs>

      {!isHomeMode && (
        <>
          <SmartInvoiceDialog
            open={showInvoiceDialog}
            onOpenChange={setShowInvoiceDialog}
            onSaveInvoice={handleSaveInvoice}
          />

          <ExpenseManagementDialog
            open={showExpenseDialog}
            onOpenChange={setShowExpenseDialog}
            onSaveExpense={handleSaveExpense}
          />
        </>
      )}
    </div>
  );
}