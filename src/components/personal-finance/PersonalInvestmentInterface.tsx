import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvestmentPortfolio } from "./investments/InvestmentPortfolio";
import { InvestmentPerformance } from "./investments/InvestmentPerformance";
import { InvestmentAnalytics } from "./investments/InvestmentAnalytics";
import { InvestmentGoals } from "./investments/InvestmentGoals";

export function PersonalInvestmentInterface() {
  const [activeTab, setActiveTab] = useState("portfolio");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Investment Portfolio</h1>
          <p className="text-muted-foreground mt-2">
            Track your investments, monitor performance, and analyze portfolio allocation with AI-powered insights.
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex flex-wrap h-auto items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-full gap-1">
          <TabsTrigger value="portfolio" className="px-3 py-2 text-xs font-medium">Portfolio</TabsTrigger>
          <TabsTrigger value="performance" className="px-3 py-2 text-xs font-medium">Performance</TabsTrigger>
          <TabsTrigger value="analytics" className="px-3 py-2 text-xs font-medium">Analytics</TabsTrigger>
          <TabsTrigger value="goals" className="px-3 py-2 text-xs font-medium">Investment Goals</TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio" className="space-y-6">
          <InvestmentPortfolio />
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <InvestmentPerformance />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <InvestmentAnalytics />
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <InvestmentGoals />
        </TabsContent>
      </Tabs>
    </div>
  );
}