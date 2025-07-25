import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AIViralContentGenerator } from "./AIViralContentGenerator";
import { 
  AICompetitorMindReader,
  AICustomerPsychologyMapper,
  AIInfluenceNetworkDiscovery,
  AITimingOracle,
  AIBrandSentimentShapeshifter
} from "./AIMarketingComponents";

export function MarketingInterface() {
  const [activeTab, setActiveTab] = useState("viral");

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="viral">AI Viral Generator</TabsTrigger>
          <TabsTrigger value="psychology">Psychology Mapper</TabsTrigger>
          <TabsTrigger value="competitor">Competitor Mind Reader</TabsTrigger>
        </TabsList>

        <TabsContent value="viral" className="space-y-6">
          <AIViralContentGenerator />
        </TabsContent>

        <TabsContent value="psychology" className="space-y-6">
          <AICustomerPsychologyMapper />
        </TabsContent>

        <TabsContent value="competitor" className="space-y-6">
          <AICompetitorMindReader />
        </TabsContent>
      </Tabs>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="influence">Influence Discovery</TabsTrigger>
          <TabsTrigger value="timing">Timing Oracle</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment Shapeshifter</TabsTrigger>
        </TabsList>

        <TabsContent value="influence" className="space-y-6">
          <AIInfluenceNetworkDiscovery />
        </TabsContent>

        <TabsContent value="timing" className="space-y-6">
          <AITimingOracle />
        </TabsContent>

        <TabsContent value="sentiment" className="space-y-6">
          <AIBrandSentimentShapeshifter />
        </TabsContent>
      </Tabs>
    </div>
  );
}