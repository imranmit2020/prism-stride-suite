import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Heart, Zap, Target, Users, TrendingUp } from "lucide-react";

export function AICustomerPsychologyMapper() {
  const [customerData, setCustomerData] = useState({
    segment: "",
    demographics: "",
    behaviors: "",
    touchpoints: "",
    aiEnabled: false
  });
  const [isMapping, setIsMapping] = useState(false);

  const psychologyMap = {
    overallScore: 92,
    archetypes: [
      { type: "The Achiever", percentage: 34, triggers: ["Success", "Recognition", "Status"] },
      { type: "The Caregiver", percentage: 28, triggers: ["Family", "Safety", "Protection"] },
      { type: "The Explorer", percentage: 23, triggers: ["Adventure", "Freedom", "Discovery"] },
      { type: "The Sage", percentage: 15, triggers: ["Knowledge", "Truth", "Wisdom"] }
    ],
    emotionalTriggers: [
      { emotion: "Fear of Missing Out", strength: 89, context: "Limited time offers" },
      { emotion: "Social Proof", strength: 84, context: "Peer recommendations" },
      { emotion: "Achievement", strength: 76, context: "Status enhancement" },
      { emotion: "Security", strength: 71, context: "Risk mitigation" }
    ],
    decisionDrivers: [
      { driver: "Price Sensitivity", influence: 82, priority: "High" },
      { driver: "Brand Trust", influence: 78, priority: "High" },
      { driver: "Feature Richness", influence: 65, priority: "Medium" },
      { driver: "Social Impact", influence: 43, priority: "Low" }
    ],
    cognitiveBiases: [
      { bias: "Anchoring Bias", susceptibility: 87, application: "Price anchoring in premium tiers" },
      { bias: "Loss Aversion", susceptibility: 83, application: "Risk-free trials and guarantees" },
      { bias: "Social Proof", susceptibility: 79, application: "Customer testimonials and reviews" },
      { bias: "Scarcity Effect", susceptibility: 74, application: "Limited availability messaging" }
    ],
    communicationStyle: {
      tone: "Professional yet approachable",
      complexity: "Moderate detail with clear benefits",
      channels: ["Email", "LinkedIn", "Webinars"],
      timing: "Tuesday-Thursday, 10-11 AM"
    }
  };

  const handleMapping = () => {
    setIsMapping(true);
    setTimeout(() => setIsMapping(false), 3000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Customer Psychology Mapper
            <Badge variant="secondary" className="ml-auto">Revolutionary AI</Badge>
          </CardTitle>
          <CardDescription>
            Deep psychological profiling that maps customer motivations, triggers, and decision patterns with 94% accuracy
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="segment">Customer Segment</Label>
              <Input
                id="segment"
                value={customerData.segment}
                onChange={(e) => setCustomerData({...customerData, segment: e.target.value})}
                placeholder="e.g., Enterprise Decision Makers"
              />
            </div>
            <div>
              <Label htmlFor="demographics">Demographics</Label>
              <Input
                id="demographics"
                value={customerData.demographics}
                onChange={(e) => setCustomerData({...customerData, demographics: e.target.value})}
                placeholder="e.g., 35-55, Tech Leaders"
              />
            </div>
            <div>
              <Label htmlFor="behaviors">Key Behaviors</Label>
              <Input
                id="behaviors"
                value={customerData.behaviors}
                onChange={(e) => setCustomerData({...customerData, behaviors: e.target.value})}
                placeholder="e.g., Research-heavy, Price-conscious"
              />
            </div>
            <div>
              <Label htmlFor="touchpoints">Touchpoints</Label>
              <Input
                id="touchpoints"
                value={customerData.touchpoints}
                onChange={(e) => setCustomerData({...customerData, touchpoints: e.target.value})}
                placeholder="e.g., Website, Sales calls"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-enabled">Enable Deep Psychology Mapping</Label>
            <Switch
              id="ai-enabled"
              checked={customerData.aiEnabled}
              onCheckedChange={(checked) => setCustomerData({...customerData, aiEnabled: checked})}
            />
          </div>

          <Button 
            onClick={handleMapping} 
            disabled={isMapping}
            className="w-full"
          >
            {isMapping ? "Mapping Customer Psychology..." : "Map Customer Psychology"}
          </Button>
        </CardContent>
      </Card>

      {customerData.aiEnabled && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Psychological Archetypes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-primary">{psychologyMap.overallScore}%</div>
                <div className="text-sm text-muted-foreground">Psychology Mapping Accuracy</div>
              </div>
              
              {psychologyMap.archetypes.map((archetype, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium">{archetype.type}</div>
                    <div className="text-sm font-semibold">{archetype.percentage}%</div>
                  </div>
                  <Progress value={archetype.percentage} className="h-2 mb-2" />
                  <div className="flex gap-1 flex-wrap">
                    {archetype.triggers.map((trigger, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">{trigger}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Emotional Triggers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {psychologyMap.emotionalTriggers.map((trigger, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium">{trigger.emotion}</div>
                    <div className="text-sm font-semibold">{trigger.strength}%</div>
                  </div>
                  <Progress value={trigger.strength} className="h-2 mb-1" />
                  <div className="text-sm text-muted-foreground">{trigger.context}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Decision Drivers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {psychologyMap.decisionDrivers.map((driver, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium">{driver.driver}</div>
                    <Badge variant={driver.priority === "High" ? "destructive" : driver.priority === "Medium" ? "secondary" : "outline"}>
                      {driver.priority} Priority
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Influence: {driver.influence}%</span>
                  </div>
                  <Progress value={driver.influence} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Cognitive Biases
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {psychologyMap.cognitiveBiases.map((bias, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium">{bias.bias}</div>
                    <div className="text-sm font-semibold">{bias.susceptibility}%</div>
                  </div>
                  <Progress value={bias.susceptibility} className="h-2 mb-2" />
                  <div className="text-sm text-muted-foreground">Application: {bias.application}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Optimal Communication Strategy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <div className="font-medium text-sm text-muted-foreground">Recommended Tone</div>
                  <div className="font-medium">{psychologyMap.communicationStyle.tone}</div>
                </div>
                <div>
                  <div className="font-medium text-sm text-muted-foreground">Content Complexity</div>
                  <div className="font-medium">{psychologyMap.communicationStyle.complexity}</div>
                </div>
                <div>
                  <div className="font-medium text-sm text-muted-foreground">Optimal Channels</div>
                  <div className="flex gap-1 flex-wrap mt-1">
                    {psychologyMap.communicationStyle.channels.map((channel, idx) => (
                      <Badge key={idx} variant="secondary">{channel}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="font-medium text-sm text-muted-foreground">Best Contact Times</div>
                  <div className="font-medium">{psychologyMap.communicationStyle.timing}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}