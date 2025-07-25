import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AICustomerIntelligence } from "./AICustomerIntelligence";
import { AIVendorRiskAssessment } from "./AIVendorRiskAssessment";
import { AIProjectPredictor } from "./AIProjectPredictor";
import { AIMarketingGenius } from "./AIMarketingGenius";
import { AITalentScout } from "./AITalentScout";
import { AIQualityOracle } from "./AIQualityOracle";
import { AILeadAlchemist } from "./AILeadAlchemist";
import { AILearningArchitect } from "./AILearningArchitect";

export function FormsInterface() {
  const [activeTab, setActiveTab] = useState("customer");

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex flex-wrap h-auto items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-full gap-1">
          <TabsTrigger value="customer" className="px-3 py-2 text-xs font-medium">AI Customer Intelligence</TabsTrigger>
          <TabsTrigger value="vendor" className="px-3 py-2 text-xs font-medium">AI Vendor Risk</TabsTrigger>
          <TabsTrigger value="project" className="px-3 py-2 text-xs font-medium">AI Project Predictor</TabsTrigger>
          <TabsTrigger value="marketing" className="px-3 py-2 text-xs font-medium">AI Marketing Genius</TabsTrigger>
        </TabsList>

        <TabsContent value="customer" className="space-y-6">
          <AICustomerIntelligence />
        </TabsContent>

        <TabsContent value="vendor" className="space-y-6">
          <AIVendorRiskAssessment />
        </TabsContent>

        <TabsContent value="project" className="space-y-6">
          <AIProjectPredictor />
        </TabsContent>

        <TabsContent value="marketing" className="space-y-6">
          <AIMarketingGenius />
        </TabsContent>
      </Tabs>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-8">
        <TabsList className="flex flex-wrap h-auto items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-full gap-1">
          <TabsTrigger value="talent" className="px-3 py-2 text-xs font-medium">AI Talent Scout</TabsTrigger>
          <TabsTrigger value="quality" className="px-3 py-2 text-xs font-medium">AI Quality Oracle</TabsTrigger>
          <TabsTrigger value="lead" className="px-3 py-2 text-xs font-medium">AI Lead Alchemist</TabsTrigger>
          <TabsTrigger value="learning" className="px-3 py-2 text-xs font-medium">AI Learning Architect</TabsTrigger>
        </TabsList>

        <TabsContent value="talent" className="space-y-6">
          <AITalentScout />
        </TabsContent>

        <TabsContent value="quality" className="space-y-6">
          <AIQualityOracle />
        </TabsContent>

        <TabsContent value="lead" className="space-y-6">
          <AILeadAlchemist />
        </TabsContent>

        <TabsContent value="learning" className="space-y-6">
          <AILearningArchitect />
        </TabsContent>
      </Tabs>
    </div>
  );
}