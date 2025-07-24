import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AccountingOverview } from "./AccountingOverview";
import { InvoiceManagement } from "./InvoiceManagement";
import { ExpenseTracking } from "./ExpenseTracking";
import { FinancialReports } from "./FinancialReports";
import { AIFinancialInsights } from "./AIFinancialInsights";
import { SmartInvoiceDialog } from "./SmartInvoiceDialog";
import { ExpenseManagementDialog } from "./ExpenseManagementDialog";
import { useToast } from "@/hooks/use-toast";
import { FileText, Receipt } from "lucide-react";

export function AccountingInterface() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showInvoiceDialog, setShowInvoiceDialog] = useState(false);
  const [showExpenseDialog, setShowExpenseDialog] = useState(false);
  const { toast } = useToast();

  const handleSaveInvoice = (invoice: any) => {
    toast({
      title: "Invoice Processed",
      description: `Invoice ${invoice.invoiceNumber} has been saved with AI validation`
    });
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
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="smart-invoice">Smart Invoice</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <AccountingOverview />
        </TabsContent>

        <TabsContent value="invoices" className="space-y-6">
          <div className="text-center text-muted-foreground py-8">
            Standard invoice management interface
          </div>
        </TabsContent>

        <TabsContent value="smart-invoice" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Smart Invoice Processing</h2>
            <Button onClick={() => {
              console.log('Invoice button clicked');
              setShowInvoiceDialog(true);
            }}>
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
            <Button onClick={() => {
              console.log('Expense button clicked');
              setShowExpenseDialog(true);
            }}>
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

        <TabsContent value="reports" className="space-y-6">
          <FinancialReports />
        </TabsContent>

        <TabsContent value="ai-insights" className="space-y-6">
          <AIFinancialInsights />
        </TabsContent>
      </Tabs>

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
    </div>
  );
}