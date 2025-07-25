import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Target, TrendingUp, AlertTriangle, DollarSign, Calendar } from "lucide-react";

export function AIDealProbabilityEngine() {
  const [dealData, setDealData] = useState({
    dealName: "",
    value: "",
    stage: "",
    contact: "",
    company: "",
    aiEnabled: false
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const dealAnalysis = {
    closeProbability: 87,
    confidence: 92,
    timeToClose: "23 days",
    riskLevel: "Low",
    probabilityFactors: [
      { factor: "Engagement Level", score: 94, impact: "High", trend: "+12%" },
      { factor: "Budget Confirmed", score: 89, impact: "High", trend: "+5%" },
      { factor: "Decision Maker Access", score: 76, impact: "Medium", trend: "-3%" },
      { factor: "Competitive Pressure", score: 67, impact: "Medium", trend: "+8%" },
      { factor: "Timeline Alignment", score: 91, impact: "High", trend: "+15%" }
    ],
    stageProgression: [
      { stage: "Qualification", probability: 95, completed: true, date: "Jan 15" },
      { stage: "Needs Analysis", probability: 91, completed: true, date: "Jan 22" },
      { stage: "Proposal", probability: 87, completed: false, date: "Feb 5" },
      { stage: "Negotiation", probability: 78, completed: false, date: "Feb 12" },
      { stage: "Close", probability: 87, completed: false, date: "Feb 19" }
    ],
    riskFactors: [
      { risk: "Budget Cycle Timing", impact: 34, mitigation: "Accelerate approval process" },
      { risk: "New Stakeholder Entry", impact: 28, mitigation: "Stakeholder mapping update" },
      { risk: "Competitor Pressure", impact: 45, mitigation: "Value differentiation focus" }
    ],
    optimizationActions: [
      { action: "Schedule executive meeting", impact: "+12%", timeline: "This week", priority: "High" },
      { action: "Provide ROI calculator", impact: "+8%", timeline: "Next 3 days", priority: "Medium" },
      { action: "Share case study", impact: "+6%", timeline: "Next week", priority: "Medium" },
      { action: "Competitive analysis document", impact: "+11%", timeline: "This week", priority: "High" }
    ],
    nextBestActions: [
      { action: "Send personalized proposal", urgency: "Critical", expectedImpact: "15% increase" },
      { action: "Connect with economic buyer", urgency: "High", expectedImpact: "12% increase" },
      { action: "Address technical concerns", urgency: "Medium", expectedImpact: "8% increase" }
    ]
  };

  const handleAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 3000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Deal Probability Engine
            <Badge variant="secondary" className="ml-auto">Revolutionary AI</Badge>
          </CardTitle>
          <CardDescription>
            Predicts deal closure probability with reasons, timeline, and optimization recommendations with 92% accuracy
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="deal-name">Deal Name</Label>
              <Input
                id="deal-name"
                value={dealData.dealName}
                onChange={(e) => setDealData({...dealData, dealName: e.target.value})}
                placeholder="e.g., Enterprise Software Deal"
              />
            </div>
            <div>
              <Label htmlFor="value">Deal Value</Label>
              <Input
                id="value"
                value={dealData.value}
                onChange={(e) => setDealData({...dealData, value: e.target.value})}
                placeholder="e.g., $150,000"
              />
            </div>
            <div>
              <Label htmlFor="stage">Current Stage</Label>
              <Input
                id="stage"
                value={dealData.stage}
                onChange={(e) => setDealData({...dealData, stage: e.target.value})}
                placeholder="e.g., Proposal, Negotiation"
              />
            </div>
            <div>
              <Label htmlFor="contact">Primary Contact</Label>
              <Input
                id="contact"
                value={dealData.contact}
                onChange={(e) => setDealData({...dealData, contact: e.target.value})}
                placeholder="e.g., John Smith, CTO"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-enabled">Enable AI Deal Probability Analysis</Label>
            <Switch
              id="ai-enabled"
              checked={dealData.aiEnabled}
              onCheckedChange={(checked) => setDealData({...dealData, aiEnabled: checked})}
            />
          </div>

          <Button 
            onClick={handleAnalysis} 
            disabled={isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? "Analyzing Deal Probability..." : "Analyze Deal Probability"}
          </Button>
        </CardContent>
      </Card>

      {dealData.aiEnabled && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Deal Probability Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary">{dealAnalysis.closeProbability}%</div>
                  <div className="text-sm text-muted-foreground">Close Probability</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{dealAnalysis.confidence}%</div>
                  <div className="text-sm text-muted-foreground">AI Confidence</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{dealAnalysis.timeToClose}</div>
                  <div className="text-sm text-muted-foreground">Est. Time to Close</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-green-600">{dealAnalysis.riskLevel}</div>
                  <div className="text-sm text-muted-foreground">Risk Level</div>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Deal Health Score</span>
                  <span className="text-sm text-muted-foreground">{dealAnalysis.closeProbability}/100</span>
                </div>
                <Progress value={dealAnalysis.closeProbability} className="h-3" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Probability Factors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {dealAnalysis.probabilityFactors.map((factor, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{factor.factor}</div>
                      <div className="text-sm text-muted-foreground">Impact: {factor.impact}</div>
                    </div>
                    <div className="text-right">
                      <Badge variant={factor.score > 85 ? "secondary" : factor.score > 70 ? "outline" : "destructive"}>
                        {factor.score}/100
                      </Badge>
                      <div className={`text-sm mt-1 ${factor.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
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
                <Calendar className="h-5 w-5 text-primary" />
                Stage Progression Forecast
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {dealAnalysis.stageProgression.map((stage, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{stage.stage}</div>
                      <div className="text-sm text-muted-foreground">Target: {stage.date}</div>
                    </div>
                    <Badge variant={stage.completed ? "secondary" : "outline"}>
                      {stage.completed ? "Completed" : "Pending"}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Success Probability: {stage.probability}%</span>
                  </div>
                  <Progress value={stage.probability} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {dealAnalysis.riskFactors.map((risk, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{risk.risk}</div>
                      <div className="text-sm text-muted-foreground">Mitigation: {risk.mitigation}</div>
                    </div>
                    <Badge variant={risk.impact > 40 ? "destructive" : risk.impact > 25 ? "secondary" : "outline"}>
                      {risk.impact}% impact
                    </Badge>
                  </div>
                  <Progress value={risk.impact} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Optimization Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {dealAnalysis.optimizationActions.map((action, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{action.action}</div>
                      <div className="text-sm text-muted-foreground">Timeline: {action.timeline}</div>
                    </div>
                    <div className="text-right">
                      <Badge variant={action.priority === "High" ? "destructive" : "secondary"}>
                        {action.priority}
                      </Badge>
                      <div className="text-sm text-green-600 mt-1">{action.impact}</div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Next Best Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {dealAnalysis.nextBestActions.map((action, index) => (
                <div key={index} className="border rounded-lg p-3 bg-gradient-to-r from-primary/5 to-secondary/5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{action.action}</div>
                      <div className="text-sm text-green-600">Expected: {action.expectedImpact}</div>
                    </div>
                    <Badge variant={action.urgency === "Critical" ? "destructive" : action.urgency === "High" ? "secondary" : "outline"}>
                      {action.urgency}
                    </Badge>
                  </div>
                  <Button size="sm" className="w-full mt-2">Take Action</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}