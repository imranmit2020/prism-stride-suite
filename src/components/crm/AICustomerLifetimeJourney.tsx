import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Map, TrendingUp, Users, Heart, Target } from "lucide-react";

export function AICustomerLifetimeJourney() {
  const [customerData, setCustomerData] = useState({
    customerId: "",
    segment: "",
    industry: "",
    tenure: "",
    aiEnabled: false
  });
  const [isMapping, setIsMapping] = useState(false);

  const journeyMap = {
    lifetimeValue: "$234,500",
    currentStage: "Growth",
    journeyHealth: 87,
    churnRisk: 12,
    journeyStages: [
      { 
        stage: "Awareness", 
        duration: "14 days", 
        touchpoints: 8, 
        conversion: 23,
        sentiment: 72,
        completed: true,
        keyActions: ["Website visits", "Content downloads", "Demo request"]
      },
      { 
        stage: "Consideration", 
        duration: "21 days", 
        touchpoints: 12, 
        conversion: 67,
        sentiment: 84,
        completed: true,
        keyActions: ["Product trials", "Sales calls", "Competitor analysis"]
      },
      { 
        stage: "Purchase", 
        duration: "7 days", 
        touchpoints: 5, 
        conversion: 89,
        sentiment: 91,
        completed: true,
        keyActions: ["Contract negotiation", "Technical setup", "Onboarding"]
      },
      { 
        stage: "Onboarding", 
        duration: "30 days", 
        touchpoints: 15, 
        conversion: 94,
        sentiment: 88,
        completed: true,
        keyActions: ["Training sessions", "Initial setup", "Success metrics"]
      },
      { 
        stage: "Growth", 
        duration: "Ongoing", 
        touchpoints: 45, 
        conversion: 78,
        sentiment: 85,
        completed: false,
        keyActions: ["Feature adoption", "Usage expansion", "Feedback collection"]
      },
      { 
        stage: "Advocacy", 
        duration: "Future", 
        touchpoints: 0, 
        conversion: 0,
        sentiment: 0,
        completed: false,
        keyActions: ["Referrals", "Case studies", "Reviews"]
      }
    ],
    touchpointAnalysis: [
      { touchpoint: "Email Campaigns", engagement: 67, effectiveness: 84, frequency: "Weekly" },
      { touchpoint: "Product Usage", engagement: 92, effectiveness: 96, frequency: "Daily" },
      { touchpoint: "Support Interactions", engagement: 78, effectiveness: 89, frequency: "As needed" },
      { touchpoint: "Account Management", engagement: 85, effectiveness: 91, frequency: "Monthly" }
    ],
    predictiveInsights: [
      { insight: "High probability of feature upgrade", confidence: 89, timeline: "Next 30 days", revenue: "+$12,500" },
      { insight: "Likely to become advocate", confidence: 76, timeline: "Next quarter", revenue: "+$8,000" },
      { insight: "Risk of usage decline", confidence: 34, timeline: "Next 60 days", revenue: "-$3,500" }
    ],
    optimizationOpportunities: [
      { 
        opportunity: "Accelerate Feature Adoption", 
        impact: "High", 
        effort: "Medium", 
        expectedLift: "+23% engagement",
        timeline: "2-3 weeks"
      },
      { 
        opportunity: "Personalized Content Strategy", 
        impact: "Medium", 
        effort: "Low", 
        expectedLift: "+15% touchpoint effectiveness",
        timeline: "1 week"
      },
      { 
        opportunity: "Proactive Success Management", 
        impact: "High", 
        effort: "High", 
        expectedLift: "+31% retention",
        timeline: "4-6 weeks"
      }
    ]
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
            AI Customer Lifetime Journey
            <Badge variant="secondary" className="ml-auto">Revolutionary AI</Badge>
          </CardTitle>
          <CardDescription>
            Maps entire customer lifecycle with predictive insights and optimization opportunities at 94% accuracy
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
              <Label htmlFor="segment">Customer Segment</Label>
              <Input
                id="segment"
                value={customerData.segment}
                onChange={(e) => setCustomerData({...customerData, segment: e.target.value})}
                placeholder="e.g., Enterprise, SMB"
              />
            </div>
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                value={customerData.industry}
                onChange={(e) => setCustomerData({...customerData, industry: e.target.value})}
                placeholder="e.g., Technology, Healthcare"
              />
            </div>
            <div>
              <Label htmlFor="tenure">Customer Tenure</Label>
              <Input
                id="tenure"
                value={customerData.tenure}
                onChange={(e) => setCustomerData({...customerData, tenure: e.target.value})}
                placeholder="e.g., 18 months, 3 years"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-enabled">Enable Journey Mapping</Label>
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
            {isMapping ? "Mapping Customer Journey..." : "Map Customer Journey"}
          </Button>
        </CardContent>
      </Card>

      {customerData.aiEnabled && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Journey Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{journeyMap.lifetimeValue}</div>
                  <div className="text-sm text-muted-foreground">Lifetime Value</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{journeyMap.currentStage}</div>
                  <div className="text-sm text-muted-foreground">Current Stage</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{journeyMap.journeyHealth}%</div>
                  <div className="text-sm text-muted-foreground">Journey Health</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{journeyMap.churnRisk}%</div>
                  <div className="text-sm text-muted-foreground">Churn Risk</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5 text-primary" />
                Journey Stages
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {journeyMap.journeyStages.map((stage, index) => (
                <div key={index} className={`border rounded-lg p-4 ${stage.stage === journeyMap.currentStage ? 'bg-primary/5 border-primary' : ''}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {stage.stage}
                        {stage.stage === journeyMap.currentStage && <Badge variant="secondary">Current</Badge>}
                      </div>
                      <div className="text-sm text-muted-foreground">Duration: {stage.duration}</div>
                    </div>
                    <Badge variant={stage.completed ? "secondary" : "outline"}>
                      {stage.completed ? "Completed" : "Future"}
                    </Badge>
                  </div>
                  
                  {stage.completed && (
                    <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                      <div>
                        <div className="font-medium">Touchpoints</div>
                        <div className="text-muted-foreground">{stage.touchpoints}</div>
                      </div>
                      <div>
                        <div className="font-medium">Conversion</div>
                        <div className="text-muted-foreground">{stage.conversion}%</div>
                      </div>
                      <div>
                        <div className="font-medium">Sentiment</div>
                        <div className="text-muted-foreground">{stage.sentiment}%</div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-2">
                    <div className="text-sm font-medium mb-1">Key Actions</div>
                    <div className="flex gap-1 flex-wrap">
                      {stage.keyActions.map((action, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">{action}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  {stage.completed && (
                    <Progress value={stage.sentiment} className="h-2" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Touchpoint Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {journeyMap.touchpointAnalysis.map((touchpoint, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{touchpoint.touchpoint}</div>
                      <div className="text-sm text-muted-foreground">Frequency: {touchpoint.frequency}</div>
                    </div>
                    <Badge variant="secondary">{touchpoint.effectiveness}% effective</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                    <div>Engagement: {touchpoint.engagement}%</div>
                    <div>Effectiveness: {touchpoint.effectiveness}%</div>
                  </div>
                  <Progress value={touchpoint.effectiveness} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Predictive Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {journeyMap.predictiveInsights.map((insight, index) => (
                <div key={index} className="border rounded-lg p-3 bg-gradient-to-r from-primary/5 to-secondary/5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{insight.insight}</div>
                      <div className="text-sm text-muted-foreground">Timeline: {insight.timeline}</div>
                    </div>
                    <div className="text-right">
                      <Badge variant={insight.confidence > 80 ? "secondary" : "outline"}>
                        {insight.confidence}% confidence
                      </Badge>
                      <div className={`text-sm mt-1 ${insight.revenue.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {insight.revenue}
                      </div>
                    </div>
                  </div>
                  <Progress value={insight.confidence} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Optimization Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {journeyMap.optimizationOpportunities.map((opportunity, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{opportunity.opportunity}</div>
                      <div className="text-sm text-muted-foreground">Timeline: {opportunity.timeline}</div>
                    </div>
                    <div className="text-right">
                      <Badge variant={opportunity.impact === "High" ? "destructive" : "secondary"}>
                        {opportunity.impact} Impact
                      </Badge>
                      <div className="text-sm text-green-600 mt-1">{opportunity.expectedLift}</div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Effort Required: {opportunity.effort}</span>
                  </div>
                  <Button size="sm" className="w-full">Implement Optimization</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}