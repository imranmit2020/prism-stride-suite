import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AIInsightsDashboard } from "./AIInsightsDashboard";
import { PredictiveAnalytics } from "./PredictiveAnalytics";
import { RealTimeAnalytics } from "./RealTimeAnalytics";
import { PerformanceOptimization } from "./PerformanceOptimization";

export function AnalyticsInterface() {
  const [activeTab, setActiveTab] = useState("insights");

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="predictive">Predictive</TabsTrigger>
          <TabsTrigger value="realtime">Real-time</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-6">
          <AIInsightsDashboard />
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
      </Tabs>
    </div>
  );
}