import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GoalsOverview } from "./goals/GoalsOverview";
import { GoalsManagement } from "./goals/GoalsManagement";
import { SavingsAccounts } from "./goals/SavingsAccounts";
import { MilestoneTracker } from "./goals/MilestoneTracker";

export function PersonalGoalsInterface() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Goals & Savings</h1>
          <p className="text-muted-foreground mt-2">
            Track your financial goals, manage savings accounts, and monitor progress with AI insights.
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex flex-wrap h-auto items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-full gap-1">
          <TabsTrigger value="overview" className="px-3 py-2 text-xs font-medium">Overview</TabsTrigger>
          <TabsTrigger value="goals" className="px-3 py-2 text-xs font-medium">Manage Goals</TabsTrigger>
          <TabsTrigger value="savings" className="px-3 py-2 text-xs font-medium">Savings Accounts</TabsTrigger>
          <TabsTrigger value="milestones" className="px-3 py-2 text-xs font-medium">Milestones</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <GoalsOverview />
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <GoalsManagement />
        </TabsContent>

        <TabsContent value="savings" className="space-y-6">
          <SavingsAccounts />
        </TabsContent>

        <TabsContent value="milestones" className="space-y-6">
          <MilestoneTracker />
        </TabsContent>
      </Tabs>
    </div>
  );
}