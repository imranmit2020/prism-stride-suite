import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AIRelationshipProphet } from "./AIRelationshipProphet";
import {
  AIDealProbabilityEngine,
  AICustomerLifetimeJourney,
  AIEmotionalIntelligenceTracker,
  AIChurnPreventionOracle,
  AIRevenueOpportunityScanner
} from "./AICRMComponents";

export function CRMInterface() {
  const [activeTab, setActiveTab] = useState("prophet");

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="prophet">Relationship Prophet</TabsTrigger>
          <TabsTrigger value="deals">Deal Probability</TabsTrigger>
          <TabsTrigger value="journey">Customer Journey</TabsTrigger>
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
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="emotional">Emotional Intelligence</TabsTrigger>
          <TabsTrigger value="churn">Churn Prevention</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Scanner</TabsTrigger>
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