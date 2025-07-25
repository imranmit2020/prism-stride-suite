import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AISystemOptimization } from "./AISystemOptimization";
import { AIPersonalization } from "./AIPersonalization";
import { AISecurityCenter } from "./AISecurityCenter";
import { AIPreferenceEngine } from "./AIPreferenceEngine";

export function SettingsInterface() {
  const [activeTab, setActiveTab] = useState("optimization");

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="optimization">AI Optimization</TabsTrigger>
          <TabsTrigger value="personalization">AI Personalization</TabsTrigger>
          <TabsTrigger value="security">AI Security</TabsTrigger>
          <TabsTrigger value="preferences">AI Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="optimization" className="space-y-6">
          <AISystemOptimization />
        </TabsContent>

        <TabsContent value="personalization" className="space-y-6">
          <AIPersonalization />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <AISecurityCenter />
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <AIPreferenceEngine />
        </TabsContent>
      </Tabs>
    </div>
  );
}