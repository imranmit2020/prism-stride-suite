import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Eye, Brain, Activity, Target, TrendingUp, Users, Clock, Zap } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AIUserBehaviorPredictor() {
  const [userData, setUserData] = useState({
    user_id: "",
    subscription_tier: "",
    usage_pattern: "",
    feature_engagement: "",
    support_interactions: "",
    account_age: "",
    enableAI: true
  });
  const [isPredicting, setIsPredicting] = useState(false);

  const behaviorPrediction = {
    nextAction: "Feature Discovery",
    probability: 87,
    timeframe: "Next 48 hours",
    confidence: 94,
    userSegment: "Power User Potential",
    behaviorScore: 89,
    futureActions: [
      { action: "Explore Advanced Features", probability: 87, timeline: "Next 2 days", value: "High" },
      { action: "Upgrade Subscription", probability: 72, timeline: "Next 7 days", value: "Very High" },
      { action: "Invite Team Members", probability: 65, timeline: "Next 14 days", value: "High" },
      { action: "API Integration", probability: 43, timeline: "Next 30 days", value: "Medium" }
    ],
    engagementPattern: [
      { metric: "Session Frequency", score: 92, trend: "increasing", prediction: "Daily user within 2 weeks" },
      { metric: "Feature Exploration", score: 78, trend: "steady", prediction: "Will discover 3 new features" },
      { metric: "Value Realization", score: 84, trend: "increasing", prediction: "Achieving ROI goals" },
      { metric: "Community Participation", score: 56, trend: "stable", prediction: "Potential ambassador" }
    ],
    personalizedRecommendations: [
      {
        type: "Feature Introduction",
        recommendation: "Introduce advanced analytics dashboard during next login",
        reason: "User behavior indicates readiness for complex features",
        timing: "During peak usage hours (2-4 PM)",
        success_probability: 89
      },
      {
        type: "Onboarding",
        recommendation: "Skip basic tutorials, fast-track to advanced workflows",
        reason: "Learning velocity 3x higher than average",
        timing: "Immediate",
        success_probability: 94
      },
      {
        type: "Upgrade Nudge",
        recommendation: "Present Pro features when hitting usage limits",
        reason: "High willingness to pay for enhanced capabilities",
        timing: "When approaching 80% of current plan limits",
        success_probability: 76
      }
    ],
    riskFactors: [
      { risk: "Feature Overwhelm", probability: 23, mitigation: "Gradual feature introduction" },
      { risk: "Price Sensitivity", probability: 34, mitigation: "Value demonstration focus" },
      { risk: "Competition", probability: 18, mitigation: "Unique value highlighting" }
    ],
    aiInsights: [
      {
        insight: "User exhibits 'Explorer' behavior pattern - high curiosity, fast adoption",
        confidence: 96,
        implication: "Prime candidate for beta feature testing"
      },
      {
        insight: "Usage spikes correlate with business quarterly planning cycles",
        confidence: 89,
        implication: "Target expansion offers during planning periods"
      },
      {
        insight: "Strong correlation between support interactions and feature adoption",
        confidence: 92,
        implication: "Proactive support drives engagement"
      }
    ]
  };

  const handlePrediction = () => {
    setIsPredicting(true);
    setTimeout(() => setIsPredicting(false), 3500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            AI User Behavior Predictor
          </CardTitle>
          <CardDescription>
            Revolutionary AI that predicts user actions, personalizes experiences, and optimizes engagement in real-time
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Input */}
        <Card>
          <CardHeader>
            <CardTitle>User Analysis Input</CardTitle>
            <div className="flex items-center space-x-2">
              <Switch 
                id="ai-behavior" 
                checked={userData.enableAI}
                onCheckedChange={(checked) => setUserData({...userData, enableAI: checked})}
              />
              <Label htmlFor="ai-behavior">Enable AI Behavior Prediction</Label>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="user-id">User ID</Label>
                <Input 
                  id="user-id" 
                  value={userData.user_id}
                  onChange={(e) => setUserData({...userData, user_id: e.target.value})}
                  placeholder="Enter user ID"
                />
              </div>
              <div>
                <Label htmlFor="subscription-tier">Subscription Tier</Label>
                <Select value={userData.subscription_tier} onValueChange={(value) => setUserData({...userData, subscription_tier: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="starter">Starter</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="usage-pattern">Usage Pattern</Label>
              <Textarea 
                id="usage-pattern"
                value={userData.usage_pattern}
                onChange={(e) => setUserData({...userData, usage_pattern: e.target.value})}
                placeholder="Describe user's typical usage patterns..."
                className="h-20"
              />
            </div>

            <div>
              <Label htmlFor="feature-engagement">Feature Engagement</Label>
              <Textarea 
                id="feature-engagement"
                value={userData.feature_engagement}
                onChange={(e) => setUserData({...userData, feature_engagement: e.target.value})}
                placeholder="Which features does the user engage with most?"
                className="h-20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="support-interactions">Support Interactions</Label>
                <Input 
                  id="support-interactions"
                  value={userData.support_interactions}
                  onChange={(e) => setUserData({...userData, support_interactions: e.target.value})}
                  placeholder="Number of support tickets"
                />
              </div>
              <div>
                <Label htmlFor="account-age">Account Age</Label>
                <Input 
                  id="account-age"
                  value={userData.account_age}
                  onChange={(e) => setUserData({...userData, account_age: e.target.value})}
                  placeholder="e.g., 3 months"
                />
              </div>
            </div>

            <Button 
              onClick={handlePrediction} 
              disabled={isPredicting}
              className="w-full"
            >
              {isPredicting ? (
                <>
                  <Brain className="mr-2 h-4 w-4 animate-pulse" />
                  AI Analyzing Behavior Patterns...
                </>
              ) : (
                <>
                  <Eye className="mr-2 h-4 w-4" />
                  Predict User Behavior
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Behavior Prediction Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Behavior Prediction Overview
              <Badge variant="secondary" className="ml-auto">
                {behaviorPrediction.confidence}% Confidence
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-xl font-bold text-blue-600">{behaviorPrediction.nextAction}</div>
                <div className="text-lg font-semibold text-green-600">{behaviorPrediction.probability}%</div>
                <p className="text-sm text-muted-foreground">{behaviorPrediction.timeframe}</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <span className="text-sm font-medium">User Segment</span>
                  <Badge className="bg-blue-100 text-blue-800">{behaviorPrediction.userSegment}</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                  <span className="text-sm font-medium">Behavior Score</span>
                  <span className="font-bold text-green-600">{behaviorPrediction.behaviorScore}/100</span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Engagement Pattern</h4>
                {behaviorPrediction.engagementPattern.map((pattern, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{pattern.metric}</span>
                      <div className="flex items-center gap-2">
                        <TrendingUp className={`h-3 w-3 ${
                          pattern.trend === 'increasing' ? 'text-green-500' :
                          pattern.trend === 'decreasing' ? 'text-red-500' : 'text-gray-500'
                        }`} />
                        <span className="text-sm">{pattern.score}%</span>
                      </div>
                    </div>
                    <Progress value={pattern.score} className="h-2" />
                    <p className="text-xs text-muted-foreground">{pattern.prediction}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Future Actions Prediction */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            AI-Predicted Future Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {behaviorPrediction.futureActions.map((action, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-sm">{action.action}</h4>
                  <Badge variant={action.value === 'Very High' ? 'default' : action.value === 'High' ? 'secondary' : 'outline'}>
                    {action.value}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Probability</span>
                    <span className="font-semibold">{action.probability}%</span>
                  </div>
                  <Progress value={action.probability} className="h-2" />
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {action.timeline}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Personalized Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            AI Personalized Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {behaviorPrediction.personalizedRecommendations.map((rec, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline">{rec.type}</Badge>
                <span className="text-xs text-muted-foreground">{rec.success_probability}% success rate</span>
              </div>
              <h4 className="font-semibold text-sm">{rec.recommendation}</h4>
              <p className="text-sm text-muted-foreground">{rec.reason}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="text-blue-600">Timing: {rec.timing}</span>
                <Button size="sm" variant="outline">Implement</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Strategic Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {behaviorPrediction.aiInsights.map((insight, index) => (
            <div key={index} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline">AI Insight</Badge>
                <span className="text-xs text-muted-foreground">{insight.confidence}% confidence</span>
              </div>
              <p className="text-sm font-medium mb-2">{insight.insight}</p>
              <p className="text-sm text-blue-700 font-medium">💡 {insight.implication}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}