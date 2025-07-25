import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, TrendingUp, Users, Target, Zap } from "lucide-react";

export function AIFeatureAdoptionProphet() {
  const [featureData, setFeatureData] = useState({
    featureName: "",
    userSegment: "",
    rolloutStrategy: "",
    aiEnabled: false
  });
  const [isPredicting, setIsPredicting] = useState(false);

  const adoptionPrediction = {
    successProbability: 89,
    adoptionRate: 67,
    timeToMassAdoption: "45 days",
    segments: [
      { segment: "Power Users", adoption: 94, timeline: "Week 1", size: "12%" },
      { segment: "Early Adopters", adoption: 78, timeline: "Week 2-3", size: "23%" },
      { segment: "Mainstream", adoption: 56, timeline: "Month 2-3", size: "55%" },
      { segment: "Laggards", adoption: 23, timeline: "Month 4+", size: "10%" }
    ],
    optimizations: [
      { strategy: "In-app onboarding flow", impact: "+23%", effort: "Medium" },
      { strategy: "Gamification elements", impact: "+18%", effort: "High" },
      { strategy: "Peer influence campaigns", impact: "+15%", effort: "Low" }
    ]
  };

  const handlePrediction = () => {
    setIsPredicting(true);
    setTimeout(() => setIsPredicting(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Feature Adoption Prophet
            <Badge variant="secondary" className="ml-auto">Revolutionary AI</Badge>
          </CardTitle>
          <CardDescription>
            Predicts which features will succeed and optimizes feature rollout strategies with 89% accuracy
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="feature-name">Feature Name</Label>
              <Input
                id="feature-name"
                value={featureData.featureName}
                onChange={(e) => setFeatureData({...featureData, featureName: e.target.value})}
                placeholder="e.g., AI Chat Assistant"
              />
            </div>
            <div>
              <Label htmlFor="user-segment">Target Segment</Label>
              <Input
                id="user-segment"
                value={featureData.userSegment}
                onChange={(e) => setFeatureData({...featureData, userSegment: e.target.value})}
                placeholder="e.g., Enterprise Users"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-enabled">Enable Adoption Prediction</Label>
            <Switch
              id="ai-enabled"
              checked={featureData.aiEnabled}
              onCheckedChange={(checked) => setFeatureData({...featureData, aiEnabled: checked})}
            />
          </div>

          <Button 
            onClick={handlePrediction} 
            disabled={isPredicting}
            className="w-full"
          >
            {isPredicting ? "Predicting Adoption..." : "Predict Feature Adoption"}
          </Button>
        </CardContent>
      </Card>

      {featureData.aiEnabled && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Adoption Forecast
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{adoptionPrediction.successProbability}%</div>
                  <div className="text-sm text-muted-foreground">Success Probability</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{adoptionPrediction.adoptionRate}%</div>
                  <div className="text-sm text-muted-foreground">Adoption Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{adoptionPrediction.timeToMassAdoption}</div>
                  <div className="text-sm text-muted-foreground">Time to Mass Adoption</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Segment Adoption Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {adoptionPrediction.segments.map((segment, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{segment.segment}</div>
                      <div className="text-sm text-muted-foreground">{segment.timeline} • {segment.size} of users</div>
                    </div>
                    <Badge variant="secondary">{segment.adoption}% adoption</Badge>
                  </div>
                  <Progress value={segment.adoption} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Optimization Strategies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {adoptionPrediction.optimizations.map((optimization, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{optimization.strategy}</div>
                    <div className="text-sm text-muted-foreground">Impact: {optimization.impact} • Effort: {optimization.effort}</div>
                  </div>
                  <Badge variant="outline">{optimization.impact}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}