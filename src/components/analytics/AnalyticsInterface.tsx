import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AIInsightsDashboard } from "./AIInsightsDashboard";
import { PredictiveAnalytics } from "./PredictiveAnalytics";
import { RealTimeAnalytics } from "./RealTimeAnalytics";
import { PerformanceOptimization } from "./PerformanceOptimization";
import { AIVoiceAnalytics } from "./AIVoiceAnalytics";
import { AICompetitorIntelligence } from "./AICompetitorIntelligence";
import { AICustomerJourneyMapping } from "./AICustomerJourneyMapping";
import { CustomerAnalytics } from "./CustomerAnalytics";
import { SalesAnalytics } from "./SalesAnalytics";
import { FinancialAnalytics } from "./FinancialAnalytics";

export function AnalyticsInterface() {
  console.log("📊 AnalyticsInterface rendering");
  const [activeTab, setActiveTab] = useState("insights");

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex flex-wrap h-auto items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-full gap-1">
          <TabsTrigger value="insights" className="px-3 py-2 text-xs font-medium">AI Insights</TabsTrigger>
          <TabsTrigger value="customers" className="px-3 py-2 text-xs font-medium">Customers</TabsTrigger>
          <TabsTrigger value="sales" className="px-3 py-2 text-xs font-medium">Sales</TabsTrigger>
          <TabsTrigger value="financial" className="px-3 py-2 text-xs font-medium">Financial</TabsTrigger>
          <TabsTrigger value="predictive" className="px-3 py-2 text-xs font-medium">Predictive</TabsTrigger>
          <TabsTrigger value="realtime" className="px-3 py-2 text-xs font-medium">Real-time</TabsTrigger>
          <TabsTrigger value="optimization" className="px-3 py-2 text-xs font-medium">Optimization</TabsTrigger>
          <TabsTrigger value="voice" className="px-3 py-2 text-xs font-medium">Voice AI</TabsTrigger>
          <TabsTrigger value="competitor" className="px-3 py-2 text-xs font-medium">Competitor</TabsTrigger>
          <TabsTrigger value="journey" className="px-3 py-2 text-xs font-medium">Journey</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-6">
          <AIInsightsDashboard />
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <CustomerAnalytics />
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          <SalesAnalytics />
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <FinancialAnalytics />
        </TabsContent>

        <TabsContent value="predictive" className="space-y-6">
          <PredictiveAnalytics />
        </TabsContent>

        <TabsContent value="realtime" className="space-y-6">
          <RealTimeAnalytics />
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <PerformanceOptimization />
        </TabsContent>

        <TabsContent value="voice" className="space-y-6">
          <AIVoiceAnalytics />
        </TabsContent>

        <TabsContent value="competitor" className="space-y-6">
          <AICompetitorIntelligence />
        </TabsContent>

        <TabsContent value="journey" className="space-y-6">
          <AICustomerJourneyMapping />
        </TabsContent>
      </Tabs>
    </div>
  );
}