import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Heart, TrendingUp, AlertTriangle, Zap, Target } from "lucide-react";

export function AIEmotionalIntelligenceTracker() {
  const [customerData, setCustomerData] = useState({
    customerId: "",
    interactionHistory: "",
    communicationPreference: "",
    aiEnabled: false
  });
  const [isTracking, setIsTracking] = useState(false);

  const emotionalProfile = {
    overallEQ: 87,
    currentMood: "Optimistic",
    emotionalTrend: "+12%",
    emotionalStates: [
      { emotion: "Satisfaction", level: 89, trend: "+5%", triggers: ["Product performance", "Support quality"] },
      { emotion: "Trust", level: 92, trend: "+8%", triggers: ["Consistent delivery", "Transparent communication"] },
      { emotion: "Excitement", level: 76, trend: "+15%", triggers: ["New features", "Innovation updates"] },
      { emotion: "Frustration", level: 23, trend: "-12%", triggers: ["Complex processes", "Delayed responses"] }
    ],
    communicationAdaptation: {
      recommendedTone: "Enthusiastic and solution-focused",
      optimalTiming: "Tuesday-Thursday, 10-11 AM",
      preferredChannel: "Video calls with follow-up emails",
      emotionalTriggers: ["Achievement recognition", "Progress visualization"]
    },
    riskIndicators: [
      { indicator: "Declining enthusiasm", severity: "Low", probability: 18 },
      { indicator: "Increased support requests", severity: "Medium", probability: 34 },
      { indicator: "Communication gaps", severity: "Low", probability: 12 }
    ],
    interventionStrategies: [
      { strategy: "Proactive check-in call", timing: "This week", expectedImpact: "+15% satisfaction" },
      { strategy: "Share success metrics", timing: "Next week", expectedImpact: "+8% excitement" },
      { strategy: "Personalized feature demo", timing: "Next month", expectedImpact: "+12% engagement" }
    ]
  };

  const handleTracking = () => {
    setIsTracking(true);
    setTimeout(() => setIsTracking(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Emotional Intelligence Tracker
            <Badge variant="secondary" className="ml-auto">Revolutionary AI</Badge>
          </CardTitle>
          <CardDescription>
            Tracks customer emotions over time and adapts communication strategies with 94% emotional accuracy
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customer-id">Customer ID</Label>
              <Input
                id="customer-id"
                value={customerData.customerId}
                onChange={(e) => setCustomerData({...customerData, customerId: e.target.value})}
                placeholder="e.g., CUST-12345"
              />
            </div>
            <div>
              <Label htmlFor="interaction-history">Recent Interactions</Label>
              <Input
                id="interaction-history"
                value={customerData.interactionHistory}
                onChange={(e) => setCustomerData({...customerData, interactionHistory: e.target.value})}
                placeholder="e.g., 5 emails, 2 calls, 1 demo"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-enabled">Enable Emotional Intelligence Tracking</Label>
            <Switch
              id="ai-enabled"
              checked={customerData.aiEnabled}
              onCheckedChange={(checked) => setCustomerData({...customerData, aiEnabled: checked})}
            />
          </div>

          <Button 
            onClick={handleTracking} 
            disabled={isTracking}
            className="w-full"
          >
            {isTracking ? "Analyzing Emotions..." : "Track Emotional Intelligence"}
          </Button>
        </CardContent>
      </Card>

      {customerData.aiEnabled && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Emotional Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{emotionalProfile.overallEQ}</div>
                  <div className="text-sm text-muted-foreground">Overall EQ Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{emotionalProfile.currentMood}</div>
                  <div className="text-sm text-muted-foreground">Current Mood</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{emotionalProfile.emotionalTrend}</div>
                  <div className="text-sm text-muted-foreground">Emotional Trend</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Emotional States Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {emotionalProfile.emotionalStates.map((state, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{state.emotion}</div>
                      <div className="text-sm text-muted-foreground">
                        Triggers: {state.triggers.join(", ")}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={state.level > 80 ? "secondary" : state.level > 60 ? "outline" : "destructive"}>
                        {state.level}%
                      </Badge>
                      <div className={`text-sm mt-1 ${state.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {state.trend}
                      </div>
                    </div>
                  </div>
                  <Progress value={state.level} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Communication Adaptation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <div className="font-medium text-sm text-muted-foreground">Recommended Tone</div>
                  <div className="font-medium">{emotionalProfile.communicationAdaptation.recommendedTone}</div>
                </div>
                <div>
                  <div className="font-medium text-sm text-muted-foreground">Optimal Timing</div>
                  <div className="font-medium">{emotionalProfile.communicationAdaptation.optimalTiming}</div>
                </div>
                <div>
                  <div className="font-medium text-sm text-muted-foreground">Preferred Channel</div>
                  <div className="font-medium">{emotionalProfile.communicationAdaptation.preferredChannel}</div>
                </div>
                <div>
                  <div className="font-medium text-sm text-muted-foreground">Emotional Triggers</div>
                  <div className="flex gap-1 flex-wrap mt-1">
                    {emotionalProfile.communicationAdaptation.emotionalTriggers.map((trigger, idx) => (
                      <Badge key={idx} variant="secondary">{trigger}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Risk Indicators
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {emotionalProfile.riskIndicators.map((risk, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium">{risk.indicator}</div>
                    <Badge variant={risk.severity === "High" ? "destructive" : risk.severity === "Medium" ? "secondary" : "outline"}>
                      {risk.severity} Risk
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Probability: {risk.probability}%</span>
                  </div>
                  <Progress value={risk.probability} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Intervention Strategies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {emotionalProfile.interventionStrategies.map((strategy, index) => (
                <div key={index} className="border rounded-lg p-3 bg-gradient-to-r from-primary/5 to-secondary/5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{strategy.strategy}</div>
                      <div className="text-sm text-green-600">Expected: {strategy.expectedImpact}</div>
                    </div>
                    <Badge variant="secondary">{strategy.timing}</Badge>
                  </div>
                  <Button size="sm" className="w-full mt-2">Execute Strategy</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}