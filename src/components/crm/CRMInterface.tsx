import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AIRelationshipProphet } from "./AIRelationshipProphet";
import { AIDealProbabilityEngine } from "./AIDealProbabilityEngine";
import { AICustomerLifetimeJourney } from "./AICustomerLifetimeJourney";
import { AIEmotionalIntelligenceTracker } from "./AIEmotionalIntelligenceTracker";
import { AIChurnPreventionOracle } from "./AIChurnPreventionOracle";
import { AIRevenueOpportunityScanner } from "./AIRevenueOpportunityScanner";

export function CRMInterface() {
  const [activeTab, setActiveTab] = useState("prophet");

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex flex-wrap h-auto items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-full gap-1">
          <TabsTrigger value="prophet" className="px-3 py-2 text-xs font-medium">Relationship Prophet</TabsTrigger>
          <TabsTrigger value="deals" className="px-3 py-2 text-xs font-medium">Deal Probability</TabsTrigger>
          <TabsTrigger value="journey" className="px-3 py-2 text-xs font-medium">Customer Journey</TabsTrigger>
        </TabsList>

        <TabsContent value="prophet" className="space-y-6">
          <AIRelationshipProphet />
        </TabsContent>

        <TabsContent value="deals" className="space-y-6">
          <AIDealProbabilityEngine />
        </TabsContent>

        <TabsContent value="journey" className="space-y-6">
          <AICustomerLifetimeJourney />
        </TabsContent>
      </Tabs>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-8">
        <TabsList className="flex flex-wrap h-auto items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-full gap-1">
          <TabsTrigger value="emotional" className="px-3 py-2 text-xs font-medium">Emotional Intelligence</TabsTrigger>
          <TabsTrigger value="churn" className="px-3 py-2 text-xs font-medium">Churn Prevention</TabsTrigger>
          <TabsTrigger value="revenue" className="px-3 py-2 text-xs font-medium">Revenue Scanner</TabsTrigger>
        </TabsList>

        <TabsContent value="emotional" className="space-y-6">
          <AIEmotionalIntelligenceTracker />
        </TabsContent>

        <TabsContent value="churn" className="space-y-6">
          <AIChurnPreventionOracle />
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <AIRevenueOpportunityScanner />
        </TabsContent>
      </Tabs>
    </div>
  );
}