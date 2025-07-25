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
          <TabsTrigger value="customer">AI Customer Intelligence</TabsTrigger>
          <TabsTrigger value="vendor">AI Vendor Risk</TabsTrigger>
          <TabsTrigger value="project">AI Project Predictor</TabsTrigger>
          <TabsTrigger value="marketing">AI Marketing Genius</TabsTrigger>
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
          <TabsTrigger value="talent">AI Talent Scout</TabsTrigger>
          <TabsTrigger value="quality">AI Quality Oracle</TabsTrigger>
          <TabsTrigger value="lead">AI Lead Alchemist</TabsTrigger>
          <TabsTrigger value="learning">AI Learning Architect</TabsTrigger>
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