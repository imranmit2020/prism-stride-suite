import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Heart, Brain, TrendingUp, TrendingDown, Users, MessageSquare, Clock, AlertTriangle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AIRelationshipProphet() {
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    company: "",
    industry: "",
    relationship_length: "",
    interaction_history: "",
    enableAI: true
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const relationshipAnalysis = {
    relationshipScore: 78,
    trend: "declining",
    riskLevel: "Medium",
    confidence: 94,
    futureTrajectory: [
      { period: "Next 30 days", score: 75, prediction: "Slight decline expected" },
      { period: "Next 60 days", score: 68, prediction: "Requires intervention" },
      { period: "Next 90 days", score: 85, prediction: "Strong recovery if actions taken" }
    ],
    relationshipFactors: [
      { factor: "Communication Frequency", score: 65, trend: "down", impact: "High", recommendation: "Increase touchpoints by 40%" },
      { factor: "Response Quality", score: 89, trend: "stable", impact: "Medium", recommendation: "Maintain current approach" },
      { factor: "Value Perception", score: 72, trend: "down", impact: "Very High", recommendation: "Demonstrate ROI immediately" },
      { factor: "Trust Level", score: 91, trend: "up", impact: "High", recommendation: "Leverage for upselling" },
      { factor: "Satisfaction", score: 76, trend: "down", impact: "Very High", recommendation: "Schedule feedback session" }
    ],
    emotionalState: {
      currentMood: "Concerned",
      satisfaction: 76,
      engagement: 68,
      loyalty: 82,
      frustration: 34
    },
    communicationInsights: [
      {
        insight: "Customer using more formal language lately - indicates distance",
        confidence: 87,
        action: "Return to casual, friendly tone in next interaction"
      },
      {
        insight: "Response time has increased from 2 hours to 8 hours average",
        confidence: 94,
        action: "Schedule priority call to address concerns"
      },
      {
        insight: "Mentions competitors 3x more frequently in recent conversations",
        confidence: 91,
        action: "Prepare competitive differentiation presentation"
      }
    ],
    predictedEvents: [
      {
        event: "Contract Renewal Decision",
        probability: 67,
        timeframe: "45 days",
        influence_factors: ["Value demonstration", "Relationship repair"],
        recommendation: "Immediate value showcase meeting"
      },
      {
        event: "Executive Escalation",
        probability: 34,
        timeframe: "2 weeks",
        influence_factors: ["Response time", "Issue resolution"],
        recommendation: "Proactive status update call"
      }
    ],
    interventionPlan: [
      { action: "Send personalized value report", urgency: "High", timeline: "24 hours", impact: "+12 points" },
      { action: "Schedule executive check-in", urgency: "Medium", timeline: "3 days", impact: "+8 points" },
      { action: "Provide exclusive feature preview", urgency: "Low", timeline: "1 week", impact: "+15 points" }
    ]
  };

  const handleAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 3500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            AI Relationship Prophet
          </CardTitle>
          <CardDescription>
            Revolutionary AI that predicts relationship changes, reads emotional states, and prevents relationship decay
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Input */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
            <div className="flex items-center space-x-2">
              <Switch 
                id="ai-prophet" 
                checked={customerData.enableAI}
                onCheckedChange={(checked) => setCustomerData({...customerData, enableAI: checked})}
              />
              <Label htmlFor="ai-prophet">Enable AI Relationship Analysis</Label>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customer-name">Customer Name</Label>
                <Input 
                  id="customer-name" 
                  value={customerData.name}
                  onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                  placeholder="Enter customer name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={customerData.email}
                  onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                  placeholder="customer@company.com"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company">Company</Label>
                <Input 
                  id="company"
                  value={customerData.company}
                  onChange={(e) => setCustomerData({...customerData, company: e.target.value})}
                  placeholder="Company name"
                />
              </div>
              <div>
                <Label htmlFor="industry">Industry</Label>
                <Select value={customerData.industry} onValueChange={(value) => setCustomerData({...customerData, industry: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="relationship-length">Relationship Length</Label>
              <Input 
                id="relationship-length"
                value={customerData.relationship_length}
                onChange={(e) => setCustomerData({...customerData, relationship_length: e.target.value})}
                placeholder="e.g., 2 years, 6 months"
              />
            </div>

            <div>
              <Label htmlFor="interaction-history">Recent Interaction Notes</Label>
              <Textarea 
                id="interaction-history"
                value={customerData.interaction_history}
                onChange={(e) => setCustomerData({...customerData, interaction_history: e.target.value})}
                placeholder="Describe recent interactions, concerns, or communication patterns..."
                className="h-24"
              />
            </div>

            <Button 
              onClick={handleAnalysis} 
              disabled={isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <Brain className="mr-2 h-4 w-4 animate-pulse" />
                  AI Reading Relationship Signals...
                </>
              ) : (
                <>
                  <Heart className="mr-2 h-4 w-4" />
                  Analyze Relationship Health
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Relationship Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Relationship Health Analysis
              <Badge variant="secondary" className="ml-auto">
                {relationshipAnalysis.confidence}% Confidence
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-orange-600">{relationshipAnalysis.relationshipScore}</div>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <TrendingDown className="h-4 w-4 text-red-500" />
                  <span className="text-lg font-semibold text-red-600">{relationshipAnalysis.trend}</span>
                </div>
                <p className="text-sm text-muted-foreground">Relationship Score</p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Future Trajectory</h4>
                {relationshipAnalysis.futureTrajectory.map((traj, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{traj.period}</span>
                      <span className="text-sm font-bold">{traj.score}%</span>
                    </div>
                    <Progress value={traj.score} className="h-2" />
                    <p className="text-xs text-muted-foreground">{traj.prediction}</p>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-semibold text-orange-800">Risk Alert</span>
                </div>
                <p className="text-sm text-orange-700">
                  Relationship showing decline signals. Immediate intervention recommended.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Relationship Factors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Relationship Factor Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {relationshipAnalysis.relationshipFactors.map((factor, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{factor.factor}</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant={factor.impact === 'Very High' ? 'destructive' : factor.impact === 'High' ? 'outline' : 'secondary'}>
                      {factor.impact}
                    </Badge>
                    {factor.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : factor.trend === 'down' ? (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    ) : (
                      <div className="h-4 w-4 bg-gray-400 rounded-full" />
                    )}
                  </div>
                </div>
                <Progress value={factor.score} className="h-2" />
                <p className="text-sm text-muted-foreground">{factor.recommendation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Communication Insights & Intervention Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              AI Communication Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {relationshipAnalysis.communicationInsights.map((insight, index) => (
              <div key={index} className="p-3 border rounded-lg space-y-2">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium flex-1">{insight.insight}</p>
                  <Badge variant="outline" className="text-xs">{insight.confidence}%</Badge>
                </div>
                <p className="text-sm text-green-600 font-medium">{insight.action}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              AI Intervention Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {relationshipAnalysis.interventionPlan.map((plan, index) => (
              <div key={index} className="p-3 border rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{plan.action}</span>
                  <Badge variant={plan.urgency === 'High' ? 'destructive' : plan.urgency === 'Medium' ? 'outline' : 'secondary'}>
                    {plan.urgency}
                  </Badge>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Timeline: {plan.timeline}</span>
                  <span className="text-green-600 font-medium">Impact: {plan.impact}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}