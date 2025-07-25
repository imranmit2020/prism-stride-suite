import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AILifeOptimizer } from "./AILifeOptimizer";
import { AIBehaviorPredictor } from "./AIBehaviorPredictor";
import { AIProductivityProphet } from "./AIProductivityProphet";
import { AIMoodEnergyCorrelator } from "./AIMoodEnergyCorrelator";
import { AIGoalAchievementEngine } from "./AIGoalAchievementEngine";
import { AIHabitFormationIntelligence } from "./AIHabitFormationIntelligence";
import { AITimeInvestmentROI } from "./AITimeInvestmentROI";
import { AILifeBalanceOptimizer } from "./AILifeBalanceOptimizer";
import { AIPersonalRiskAssessment } from "./AIPersonalRiskAssessment";
import { AIFutureSelfSimulator } from "./AIFutureSelfSimulator";

export function PersonalAnalyticsInterface() {
  const [activeTab, setActiveTab] = useState("life-optimizer");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Personal AI Analytics</h1>
          <p className="text-muted-foreground mt-2">
            Revolutionary AI-powered insights into your personal life patterns, optimization, and future potential.
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex flex-wrap h-auto items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-full gap-1">
          <TabsTrigger value="life-optimizer" className="px-3 py-2 text-xs font-medium">Life Optimizer</TabsTrigger>
          <TabsTrigger value="behavior-predictor" className="px-3 py-2 text-xs font-medium">Behavior AI</TabsTrigger>
          <TabsTrigger value="productivity-prophet" className="px-3 py-2 text-xs font-medium">Productivity Prophet</TabsTrigger>
          <TabsTrigger value="mood-energy" className="px-3 py-2 text-xs font-medium">Mood & Energy</TabsTrigger>
          <TabsTrigger value="goal-achievement" className="px-3 py-2 text-xs font-medium">Goal Engine</TabsTrigger>
        </TabsList>

        <TabsContent value="life-optimizer" className="space-y-6">
          <AILifeOptimizer />
        </TabsContent>

        <TabsContent value="behavior-predictor" className="space-y-6">
          <AIBehaviorPredictor />
        </TabsContent>

        <TabsContent value="productivity-prophet" className="space-y-6">
          <AIProductivityProphet />
        </TabsContent>

        <TabsContent value="mood-energy" className="space-y-6">
          <AIMoodEnergyCorrelator />
        </TabsContent>

        <TabsContent value="goal-achievement" className="space-y-6">
          <AIGoalAchievementEngine />
        </TabsContent>
      </Tabs>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-8">
        <TabsList className="flex flex-wrap h-auto items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-full gap-1">
          <TabsTrigger value="habit-intelligence" className="px-3 py-2 text-xs font-medium">Habit Intelligence</TabsTrigger>
          <TabsTrigger value="time-investment" className="px-3 py-2 text-xs font-medium">Time ROI</TabsTrigger>
          <TabsTrigger value="life-balance" className="px-3 py-2 text-xs font-medium">Life Balance</TabsTrigger>
          <TabsTrigger value="risk-assessment" className="px-3 py-2 text-xs font-medium">Risk Assessment</TabsTrigger>
          <TabsTrigger value="future-self" className="px-3 py-2 text-xs font-medium">Future Self</TabsTrigger>
        </TabsList>

        <TabsContent value="habit-intelligence" className="space-y-6">
          <AIHabitFormationIntelligence />
        </TabsContent>

        <TabsContent value="time-investment" className="space-y-6">
          <AITimeInvestmentROI />
        </TabsContent>

        <TabsContent value="life-balance" className="space-y-6">
          <AILifeBalanceOptimizer />
        </TabsContent>

        <TabsContent value="risk-assessment" className="space-y-6">
          <AIPersonalRiskAssessment />
        </TabsContent>

        <TabsContent value="future-self" className="space-y-6">
          <AIFutureSelfSimulator />
        </TabsContent>
      </Tabs>
    </div>
  );
}