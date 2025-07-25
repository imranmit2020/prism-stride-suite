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
  const [activeTab, setActiveTab] = useState("insights");

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 text-xs">
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="predictive">Predictive</TabsTrigger>
          <TabsTrigger value="realtime">Real-time</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="voice">Voice AI</TabsTrigger>
          <TabsTrigger value="competitor">Competitor</TabsTrigger>
          <TabsTrigger value="journey">Journey</TabsTrigger>
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