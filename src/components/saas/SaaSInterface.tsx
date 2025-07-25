import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AIUserBehaviorPredictor } from "./AIUserBehaviorPredictor";
import { AIFeatureAdoptionProphet } from "./AIFeatureAdoptionProphet";
import {
  AIPricingOptimizationEngine,
  AICustomerSuccessPredictor,
  AIProductMarketFitAnalyzer,
  AIRetentionAlchemist
} from "./AISaaSComponents";

export function SaaSInterface() {
  const [activeTab, setActiveTab] = useState("behavior");

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="behavior">Behavior Predictor</TabsTrigger>
          <TabsTrigger value="features">Feature Prophet</TabsTrigger>
          <TabsTrigger value="pricing">Pricing Engine</TabsTrigger>
        </TabsList>

        <TabsContent value="behavior" className="space-y-6">
          <AIUserBehaviorPredictor />
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <AIFeatureAdoptionProphet />
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
          <AIPricingOptimizationEngine />
        </TabsContent>
      </Tabs>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="success">Success Predictor</TabsTrigger>
          <TabsTrigger value="pmf">PMF Analyzer</TabsTrigger>
          <TabsTrigger value="retention">Retention Alchemist</TabsTrigger>
        </TabsList>

        <TabsContent value="success" className="space-y-6">
          <AICustomerSuccessPredictor />
        </TabsContent>

        <TabsContent value="pmf" className="space-y-6">
          <AIProductMarketFitAnalyzer />
        </TabsContent>

        <TabsContent value="retention" className="space-y-6">
          <AIRetentionAlchemist />
        </TabsContent>
      </Tabs>
    </div>
  );
}