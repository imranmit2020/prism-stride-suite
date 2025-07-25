import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalExpenseAnalytics } from "./PersonalExpenseAnalytics";
import { PersonalInventoryAnalytics } from "./PersonalInventoryAnalytics";
import { PersonalBudgetAnalytics } from "./PersonalBudgetAnalytics";
import { PersonalIncomeAnalytics } from "./PersonalIncomeAnalytics";
import { PersonalFinancialHealth } from "./PersonalFinancialHealth";
import { PersonalSpendingPatterns } from "./PersonalSpendingPatterns";

export function PersonalFinanceAnalyticsInterface() {
  const [activeTab, setActiveTab] = useState("expenses");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Personal Analytics</h1>
          <p className="text-muted-foreground mt-2">
            Track your personal expenses, inventory, income trends, and financial health with AI-powered insights.
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex flex-wrap h-auto items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-full gap-1">
          <TabsTrigger value="expenses" className="px-3 py-2 text-xs font-medium">Expense Analytics</TabsTrigger>
          <TabsTrigger value="inventory" className="px-3 py-2 text-xs font-medium">Home Inventory</TabsTrigger>
          <TabsTrigger value="budget" className="px-3 py-2 text-xs font-medium">Budget Analysis</TabsTrigger>
          <TabsTrigger value="income" className="px-3 py-2 text-xs font-medium">Income Trends</TabsTrigger>
          <TabsTrigger value="health" className="px-3 py-2 text-xs font-medium">Financial Health</TabsTrigger>
          <TabsTrigger value="patterns" className="px-3 py-2 text-xs font-medium">Spending Patterns</TabsTrigger>
        </TabsList>

        <TabsContent value="expenses" className="space-y-6">
          <PersonalExpenseAnalytics />
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          <PersonalInventoryAnalytics />
        </TabsContent>

        <TabsContent value="budget" className="space-y-6">
          <PersonalBudgetAnalytics />
        </TabsContent>

        <TabsContent value="income" className="space-y-6">
          <PersonalIncomeAnalytics />
        </TabsContent>

        <TabsContent value="health" className="space-y-6">
          <PersonalFinancialHealth />
        </TabsContent>

        <TabsContent value="patterns" className="space-y-6">
          <PersonalSpendingPatterns />
        </TabsContent>
      </Tabs>
    </div>
  );
}