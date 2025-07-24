import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountingOverview } from "./AccountingOverview";
import { InvoiceManagement, Invoice } from "./InvoiceManagement";
import { ExpenseTracking, Expense } from "./ExpenseTracking";
import { FinancialReports } from "./FinancialReports";
import { useToast } from "@/hooks/use-toast";

export function AccountingInterface() {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  const handleCreateInvoice = () => {
    toast({
      title: "Create Invoice",
      description: "Invoice creation form would open here (to be implemented)"
    });
  };

  const handleEditInvoice = (invoice: Invoice) => {
    toast({
      title: "Edit Invoice", 
      description: `Editing invoice ${invoice.invoiceNumber} for ${invoice.customerName}`
    });
  };

  const handleAddExpense = () => {
    toast({
      title: "Add Expense",
      description: "Expense entry form would open here (to be implemented)"
    });
  };

  const handleEditExpense = (expense: Expense) => {
    toast({
      title: "Edit Expense",
      description: `Editing expense: ${expense.description}`
    });
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <AccountingOverview />
        </TabsContent>

        <TabsContent value="invoices" className="space-y-6">
          <InvoiceManagement 
            onCreateInvoice={handleCreateInvoice}
            onEditInvoice={handleEditInvoice}
          />
        </TabsContent>

        <TabsContent value="expenses" className="space-y-6">
          <ExpenseTracking 
            onAddExpense={handleAddExpense}
            onEditExpense={handleEditExpense}
          />
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <FinancialReports />
        </TabsContent>
      </Tabs>
    </div>
  );
}