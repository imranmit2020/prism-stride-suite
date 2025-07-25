import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AISystemOptimization } from "./AISystemOptimization";
import { AIPersonalization } from "./AIPersonalization";
import { AISecurityCenter } from "./AISecurityCenter";
import { AIPreferenceEngine } from "./AIPreferenceEngine";
import { GlobalLocalizationSettings } from "./GlobalLocalizationSettings";

export function SettingsInterface() {
  const [activeTab, setActiveTab] = useState("localization");

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex flex-wrap h-auto items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-full">
          <TabsTrigger value="localization" className="px-3 py-2 text-xs font-medium">Global Settings</TabsTrigger>
          <TabsTrigger value="optimization" className="px-3 py-2 text-xs font-medium">AI Optimization</TabsTrigger>
          <TabsTrigger value="personalization" className="px-3 py-2 text-xs font-medium">AI Personalization</TabsTrigger>
          <TabsTrigger value="security" className="px-3 py-2 text-xs font-medium">AI Security</TabsTrigger>
          <TabsTrigger value="preferences" className="px-3 py-2 text-xs font-medium">AI Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="localization" className="space-y-6">
          <GlobalLocalizationSettings />
        </TabsContent>

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