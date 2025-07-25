import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Target, TrendingUp, Heart, AlertTriangle, Zap } from "lucide-react";

export function AICustomerSuccessPredictor() {
  const [customerData, setCustomerData] = useState({
    customerId: "",
    onboardingDate: "",
    usageLevel: "",
    aiEnabled: false
  });
  const [isPredicting, setIsPredicting] = useState(false);

  const successPrediction = {
    successProbability: 84,
    healthScore: 87,
    riskLevel: "Low",
    timeToValue: "23 days",
    confidence: 91,
    successFactors: [
      { factor: "Feature Adoption", score: 89, weight: "High", trend: "+12%" },
      { factor: "User Engagement", score: 76, weight: "High", trend: "+8%" },
      { factor: "Support Satisfaction", score: 94, weight: "Medium", trend: "+15%" },
      { factor: "Onboarding Completion", score: 92, weight: "High", trend: "Completed" },
      { factor: "Team Growth", score: 67, weight: "Medium", trend: "+5%" }
    ],
    milestones: [
      { milestone: "First Value Achievement", status: "Completed", date: "Jan 15", impact: "High" },
      { milestone: "Team Onboarding", status: "In Progress", date: "Jan 28", impact: "Medium" },
      { milestone: "Advanced Feature Adoption", status: "Pending", date: "Feb 10", impact: "High" },
      { milestone: "ROI Realization", status: "Pending", date: "Feb 25", impact: "Critical" }
    ],
    interventionPoints: [
      { point: "Low feature engagement", urgency: "Medium", timeline: "Next week", action: "Feature training session" },
      { point: "Team scaling challenges", urgency: "Low", timeline: "Next month", action: "Expansion planning workshop" },
      { point: "Advanced feature discovery", urgency: "High", timeline: "This week", action: "Personalized demo" }
    ],
    outcomesPrediction: [
      { outcome: "Renewal probability", prediction: 89, confidence: 94, timeline: "Month 12" },
      { outcome: "Upsell opportunity", prediction: 73, confidence: 87, timeline: "Month 6" },
      { outcome: "Advocacy potential", prediction: 82, confidence: 91, timeline: "Month 9" },
      { outcome: "Expansion likelihood", prediction: 67, confidence: 78, timeline: "Month 8" }
    ],
    successStrategies: [
      { strategy: "Accelerated Value Realization", impact: "+15% success", effort: "Medium", timeline: "2 weeks" },
      { strategy: "Proactive Success Management", impact: "+22% success", effort: "High", timeline: "Ongoing" },
      { strategy: "Peer Success Sharing", impact: "+8% success", effort: "Low", timeline: "1 week" }
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
            AI Customer Success Predictor
            <Badge variant="secondary" className="ml-auto">Revolutionary AI</Badge>
          </CardTitle>
          <CardDescription>
            Predicts customer success probability and provides intervention strategies with 91% accuracy
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
              <Label htmlFor="onboarding-date">Onboarding Date</Label>
              <Input
                id="onboarding-date"
                value={customerData.onboardingDate}
                onChange={(e) => setCustomerData({...customerData, onboardingDate: e.target.value})}
                placeholder="e.g., 2024-01-15"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-enabled">Enable Success Prediction</Label>
            <Switch
              id="ai-enabled"
              checked={customerData.aiEnabled}
              onCheckedChange={(checked) => setCustomerData({...customerData, aiEnabled: checked})}
            />
          </div>

          <Button 
            onClick={handlePrediction} 
            disabled={isPredicting}
            className="w-full"
          >
            {isPredicting ? "Predicting Success..." : "Predict Customer Success"}
          </Button>
        </CardContent>
      </Card>

      {customerData.aiEnabled && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Success Prediction Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary">{successPrediction.successProbability}%</div>
                  <div className="text-sm text-muted-foreground">Success Probability</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{successPrediction.healthScore}</div>
                  <div className="text-sm text-muted-foreground">Health Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{successPrediction.riskLevel}</div>
                  <div className="text-sm text-muted-foreground">Risk Level</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{successPrediction.timeToValue}</div>
                  <div className="text-sm text-muted-foreground">Time to Value</div>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Overall Success Score</span>
                  <span className="text-sm text-muted-foreground">{successPrediction.successProbability}/100</span>
                </div>
                <Progress value={successPrediction.successProbability} className="h-3" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Success Factors Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {successPrediction.successFactors.map((factor, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{factor.factor}</div>
                      <div className="text-sm text-muted-foreground">Weight: {factor.weight}</div>
                    </div>
                    <div className="text-right">
                      <Badge variant={factor.score > 85 ? "secondary" : factor.score > 70 ? "outline" : "destructive"}>
                        {factor.score}/100
                      </Badge>
                      <div className={`text-sm mt-1 ${factor.trend.startsWith('+') || factor.trend === 'Completed' ? 'text-green-600' : 'text-red-600'}`}>
                        {factor.trend}
                      </div>
                    </div>
                  </div>
                  <Progress value={factor.score} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Success Milestones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {successPrediction.milestones.map((milestone, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{milestone.milestone}</div>
                      <div className="text-sm text-muted-foreground">Target: {milestone.date}</div>
                    </div>
                    <div className="text-right">
                      <Badge variant={
                        milestone.status === "Completed" ? "secondary" : 
                        milestone.status === "In Progress" ? "outline" : 
                        "destructive"
                      }>
                        {milestone.status}
                      </Badge>
                      <div className="text-sm text-muted-foreground mt-1">{milestone.impact} impact</div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Intervention Points
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {successPrediction.interventionPoints.map((point, index) => (
                <div key={index} className="border rounded-lg p-3 bg-gradient-to-r from-orange-50 to-red-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{point.point}</div>
                      <div className="text-sm text-muted-foreground">Action: {point.action}</div>
                    </div>
                    <div className="text-right">
                      <Badge variant={point.urgency === "High" ? "destructive" : point.urgency === "Medium" ? "secondary" : "outline"}>
                        {point.urgency} urgency
                      </Badge>
                      <div className="text-sm text-muted-foreground mt-1">{point.timeline}</div>
                    </div>
                  </div>
                  <Button size="sm" className="w-full">Schedule Intervention</Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Future Outcomes Prediction
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {successPrediction.outcomesPrediction.map((outcome, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{outcome.outcome}</div>
                      <div className="text-sm text-muted-foreground">Timeline: {outcome.timeline}</div>
                    </div>
                    <div className="text-right">
                      <Badge variant={outcome.prediction > 80 ? "secondary" : outcome.prediction > 60 ? "outline" : "destructive"}>
                        {outcome.prediction}% likely
                      </Badge>
                      <div className="text-sm text-muted-foreground mt-1">{outcome.confidence}% confidence</div>
                    </div>
                  </div>
                  <Progress value={outcome.prediction} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Success Acceleration Strategies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {successPrediction.successStrategies.map((strategy, index) => (
                <div key={index} className="border rounded-lg p-3 bg-gradient-to-r from-primary/5 to-secondary/5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{strategy.strategy}</div>
                      <div className="text-sm text-muted-foreground">Timeline: {strategy.timeline}</div>
                    </div>
                    <div className="text-right">
                      <Badge variant={strategy.effort === "Low" ? "secondary" : strategy.effort === "Medium" ? "outline" : "destructive"}>
                        {strategy.effort} effort
                      </Badge>
                      <div className="text-sm text-green-600 mt-1">{strategy.impact}</div>
                    </div>
                  </div>
                  <Button size="sm" className="w-full">Implement Strategy</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}