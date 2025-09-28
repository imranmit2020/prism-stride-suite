import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CRMOverview } from "./CRMOverview";
import { LeadManagement } from "./LeadManagement";
import { AIChurnPreventionOracle } from "./AIChurnPreventionOracle";
import { AICustomerLifetimeJourney } from "./AICustomerLifetimeJourney";
import { AIDealProbabilityEngine } from "./AIDealProbabilityEngine";
import { AIEmotionalIntelligenceTracker } from "./AIEmotionalIntelligenceTracker";
import { AIRelationshipProphet } from "./AIRelationshipProphet";
import { AIRevenueOpportunityScanner } from "./AIRevenueOpportunityScanner";

export function CRMInterface() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Customer Relationship Management
          </h1>
          <p className="text-muted-foreground">Intelligent customer lifecycle and relationship management with AI insights</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex flex-wrap h-auto items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-full">
          <TabsTrigger value="overview" className="px-3 py-2 text-xs font-medium">Overview</TabsTrigger>
          <TabsTrigger value="leads" className="px-3 py-2 text-xs font-medium">Leads</TabsTrigger>
          <TabsTrigger value="customers" className="px-3 py-2 text-xs font-medium">Customers</TabsTrigger>
          <TabsTrigger value="ai-crm" className="px-3 py-2 text-xs font-medium">AI CRM</TabsTrigger>
          <TabsTrigger value="churn-prevention" className="px-3 py-2 text-xs font-medium">Churn AI</TabsTrigger>
          <TabsTrigger value="customer-journey" className="px-3 py-2 text-xs font-medium">Journey AI</TabsTrigger>
          <TabsTrigger value="deal-probability" className="px-3 py-2 text-xs font-medium">Deal AI</TabsTrigger>
          <TabsTrigger value="emotional-intelligence" className="px-3 py-2 text-xs font-medium">Emotion AI</TabsTrigger>
          <TabsTrigger value="relationship-prophet" className="px-3 py-2 text-xs font-medium">Relationship AI</TabsTrigger>
          <TabsTrigger value="revenue-scanner" className="px-3 py-2 text-xs font-medium">Revenue AI</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <CRMOverview />
        </TabsContent>

        <TabsContent value="leads" className="space-y-6">
          <LeadManagement />
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <div className="text-center text-muted-foreground py-8">
            Customer management interface coming soon
          </div>
        </TabsContent>

        <TabsContent value="ai-crm" className="space-y-6">
          <div className="text-center text-muted-foreground py-8">
            AI CRM components coming soon
          </div>
        </TabsContent>

        <TabsContent value="churn-prevention" className="space-y-6">
          <AIChurnPreventionOracle />
        </TabsContent>

        <TabsContent value="customer-journey" className="space-y-6">
          <AICustomerLifetimeJourney />
        </TabsContent>

        <TabsContent value="deal-probability" className="space-y-6">
          <AIDealProbabilityEngine />
        </TabsContent>

        <TabsContent value="emotional-intelligence" className="space-y-6">
          <AIEmotionalIntelligenceTracker />
        </TabsContent>

        <TabsContent value="relationship-prophet" className="space-y-6">
          <AIRelationshipProphet />
        </TabsContent>

        <TabsContent value="revenue-scanner" className="space-y-6">
          <AIRevenueOpportunityScanner />
        </TabsContent>
      </Tabs>
    </div>
  );
}