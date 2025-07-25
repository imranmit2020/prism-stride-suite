import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductLifecycleTracker } from "./ProductLifecycleTracker";
import { AIProductIntelligence } from "./AIProductIntelligence";
import { SmartResourceAllocation } from "./SmartResourceAllocation";
import { PredictiveAnalytics } from "./PredictiveAnalytics";
import { QualityIntelligence } from "./QualityIntelligence";
import { MarketSentimentTracker } from "./MarketSentimentTracker";
import { SupplyChainOracle } from "./SupplyChainOracle";
import { CompetitiveIntelligence } from "./CompetitiveIntelligence";
import { CustomerJourneyAI } from "./CustomerJourneyAI";
import { RegulatoryCompliance } from "./RegulatoryCompliance";

export function ProductTrackingInterface() {
  const [activeTab, setActiveTab] = useState("lifecycle");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            AI Product Lifecycle Tracking
          </h1>
          <p className="text-muted-foreground">End-to-end intelligent product management with revolutionary AI insights</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex flex-wrap h-auto items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-full">
          <TabsTrigger value="lifecycle" className="px-3 py-2 text-xs font-medium">Lifecycle Tracker</TabsTrigger>
          <TabsTrigger value="ai-intelligence" className="px-3 py-2 text-xs font-medium">AI Intelligence</TabsTrigger>
          <TabsTrigger value="resource-allocation" className="px-3 py-2 text-xs font-medium">Smart Resources</TabsTrigger>
          <TabsTrigger value="predictive" className="px-3 py-2 text-xs font-medium">Predictive Analytics</TabsTrigger>
          <TabsTrigger value="quality" className="px-3 py-2 text-xs font-medium">Quality AI</TabsTrigger>
          <TabsTrigger value="market-sentiment" className="px-3 py-2 text-xs font-medium">Market Sentiment</TabsTrigger>
          <TabsTrigger value="supply-chain" className="px-3 py-2 text-xs font-medium">Supply Chain Oracle</TabsTrigger>
          <TabsTrigger value="competitive" className="px-3 py-2 text-xs font-medium">Competitive AI</TabsTrigger>
          <TabsTrigger value="customer-journey" className="px-3 py-2 text-xs font-medium">Customer Journey</TabsTrigger>
          <TabsTrigger value="compliance" className="px-3 py-2 text-xs font-medium">Regulatory AI</TabsTrigger>
        </TabsList>

        <TabsContent value="lifecycle" className="space-y-6">
          <ProductLifecycleTracker />
        </TabsContent>

        <TabsContent value="ai-intelligence" className="space-y-6">
          <AIProductIntelligence />
        </TabsContent>

        <TabsContent value="resource-allocation" className="space-y-6">
          <SmartResourceAllocation />
        </TabsContent>

        <TabsContent value="predictive" className="space-y-6">
          <PredictiveAnalytics />
        </TabsContent>

        <TabsContent value="quality" className="space-y-6">
          <QualityIntelligence />
        </TabsContent>

        <TabsContent value="market-sentiment" className="space-y-6">
          <MarketSentimentTracker />
        </TabsContent>

        <TabsContent value="supply-chain" className="space-y-6">
          <SupplyChainOracle />
        </TabsContent>

        <TabsContent value="competitive" className="space-y-6">
          <CompetitiveIntelligence />
        </TabsContent>

        <TabsContent value="customer-journey" className="space-y-6">
          <CustomerJourneyAI />
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <RegulatoryCompliance />
        </TabsContent>
      </Tabs>
    </div>
  );
}