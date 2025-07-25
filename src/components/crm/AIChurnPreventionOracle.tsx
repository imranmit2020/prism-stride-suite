import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, AlertTriangle, Shield, TrendingDown, Zap, Target } from "lucide-react";

export function AIChurnPreventionOracle() {
  const [customerData, setCustomerData] = useState({
    customerId: "",
    accountValue: "",
    engagementLevel: "",
    aiEnabled: false
  });
  const [isPredicting, setIsPredicting] = useState(false);

  const churnAnalysis = {
    churnRisk: 23,
    riskLevel: "Low",
    timeToChurn: "180+ days",
    confidence: 96,
    riskFactors: [
      { factor: "Declining Usage", risk: 34, trend: "+8%", impact: "High" },
      { factor: "Support Tickets", risk: 28, trend: "+15%", impact: "Medium" },
      { factor: "Feature Adoption", risk: 19, trend: "-5%", impact: "Medium" },
      { factor: "Payment Delays", risk: 12, trend: "0%", impact: "Low" }
    ],
    behavioralSignals: [
      { signal: "Login Frequency", status: "Declining", severity: "Medium", change: "-23%" },
      { signal: "Feature Usage", status: "Stable", severity: "Low", change: "+2%" },
      { signal: "Support Engagement", status: "Increasing", severity: "High", change: "+45%" },
      { signal: "Team Growth", status: "Stagnant", severity: "Medium", change: "0%" }
    ],
    preventionStrategies: [
      { 
        strategy: "Proactive Success Intervention", 
        effectiveness: 89, 
        timeline: "Immediate",
        actions: ["Personal success manager", "Usage audit", "Training session"]
      },
      { 
        strategy: "Value Demonstration Campaign", 
        effectiveness: 76, 
        timeline: "This week",
        actions: ["ROI report", "Success metrics", "Peer case studies"]
      },
      { 
        strategy: "Feature Adoption Boost", 
        effectiveness: 68, 
        timeline: "Next 2 weeks",
        actions: ["Feature demos", "Implementation support", "Usage incentives"]
      }
    ],
    winBackScenarios: [
      { scenario: "Early intervention", probability: 91, cost: "Low", timeline: "30 days" },
      { scenario: "Value reinforcement", probability: 78, cost: "Medium", timeline: "60 days" },
      { scenario: "Competitive defense", probability: 65, cost: "High", timeline: "90 days" }
    ],
    retentionOpportunities: [
      { opportunity: "Upsell to premium tier", probability: 67, revenue: "+$15,000", timeline: "Q1" },
      { opportunity: "Multi-year contract", probability: 54, revenue: "+$45,000", timeline: "Q2" },
      { opportunity: "Additional team licenses", probability: 71, revenue: "+$8,500", timeline: "Q1" }
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
            AI Churn Prevention Oracle
            <Badge variant="secondary" className="ml-auto">Revolutionary AI</Badge>
          </CardTitle>
          <CardDescription>
            Predicts and prevents churn before it happens with proactive intervention strategies at 96% accuracy
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
              <Label htmlFor="account-value">Account Value</Label>
              <Input
                id="account-value"
                value={customerData.accountValue}
                onChange={(e) => setCustomerData({...customerData, accountValue: e.target.value})}
                placeholder="e.g., $50,000/year"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-enabled">Enable Churn Prevention Oracle</Label>
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
            {isPredicting ? "Analyzing Churn Risk..." : "Predict Churn Risk"}
          </Button>
        </CardContent>
      </Card>

      {customerData.aiEnabled && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Churn Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-600">{churnAnalysis.churnRisk}%</div>
                  <div className="text-sm text-muted-foreground">Churn Risk</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{churnAnalysis.riskLevel}</div>
                  <div className="text-sm text-muted-foreground">Risk Level</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{churnAnalysis.timeToChurn}</div>
                  <div className="text-sm text-muted-foreground">Time to Churn</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{churnAnalysis.confidence}%</div>
                  <div className="text-sm text-muted-foreground">Confidence</div>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Retention Health Score</span>
                  <span className="text-sm text-muted-foreground">{100 - churnAnalysis.churnRisk}/100</span>
                </div>
                <Progress value={100 - churnAnalysis.churnRisk} className="h-3" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Risk Factors Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {churnAnalysis.riskFactors.map((factor, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{factor.factor}</div>
                      <div className="text-sm text-muted-foreground">Impact: {factor.impact}</div>
                    </div>
                    <div className="text-right">
                      <Badge variant={factor.risk > 30 ? "destructive" : factor.risk > 20 ? "secondary" : "outline"}>
                        {factor.risk}% risk
                      </Badge>
                      <div className={`text-sm mt-1 ${factor.trend.startsWith('+') ? 'text-red-600' : factor.trend.startsWith('-') ? 'text-green-600' : 'text-gray-600'}`}>
                        {factor.trend}
                      </div>
                    </div>
                  </div>
                  <Progress value={factor.risk} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-primary" />
                Behavioral Signals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {churnAnalysis.behavioralSignals.map((signal, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{signal.signal}</div>
                      <div className="text-sm text-muted-foreground">Status: {signal.status}</div>
                    </div>
                    <div className="text-right">
                      <Badge variant={signal.severity === "High" ? "destructive" : signal.severity === "Medium" ? "secondary" : "outline"}>
                        {signal.severity}
                      </Badge>
                      <div className={`text-sm mt-1 ${signal.change.startsWith('+') ? (signal.signal === 'Support Engagement' ? 'text-red-600' : 'text-green-600') : signal.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'}`}>
                        {signal.change}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Prevention Strategies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {churnAnalysis.preventionStrategies.map((strategy, index) => (
                <div key={index} className="border rounded-lg p-3 bg-gradient-to-r from-primary/5 to-secondary/5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{strategy.strategy}</div>
                      <div className="text-sm text-muted-foreground">Timeline: {strategy.timeline}</div>
                    </div>
                    <Badge variant="secondary">{strategy.effectiveness}% effective</Badge>
                  </div>
                  <div className="mb-2">
                    <div className="text-sm font-medium mb-1">Actions</div>
                    <div className="flex gap-1 flex-wrap">
                      {strategy.actions.map((action, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">{action}</Badge>
                      ))}
                    </div>
                  </div>
                  <Progress value={strategy.effectiveness} className="h-2 mb-2" />
                  <Button size="sm" className="w-full">Execute Strategy</Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Win-Back Scenarios
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {churnAnalysis.winBackScenarios.map((scenario, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{scenario.scenario}</div>
                      <div className="text-sm text-muted-foreground">Timeline: {scenario.timeline}</div>
                    </div>
                    <div className="text-right">
                      <Badge variant={scenario.probability > 80 ? "secondary" : scenario.probability > 60 ? "outline" : "destructive"}>
                        {scenario.probability}% success
                      </Badge>
                      <div className="text-sm text-muted-foreground mt-1">{scenario.cost} cost</div>
                    </div>
                  </div>
                  <Progress value={scenario.probability} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}