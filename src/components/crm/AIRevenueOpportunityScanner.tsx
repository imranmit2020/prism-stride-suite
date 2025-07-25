import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, DollarSign, TrendingUp, Target, Zap, Eye } from "lucide-react";

export function AIRevenueOpportunityScanner() {
  const [accountData, setAccountData] = useState({
    accountId: "",
    currentRevenue: "",
    industry: "",
    aiEnabled: false
  });
  const [isScanning, setIsScanning] = useState(false);

  const revenueOpportunities = {
    totalPotential: "$347,500",
    currentRevenue: "$125,000",
    upliftPotential: "178%",
    confidence: 91,
    opportunities: [
      { 
        type: "Upsell - Premium Features", 
        potential: "$45,000", 
        probability: 87, 
        timeline: "30 days",
        effort: "Low",
        indicators: ["High usage", "Feature requests", "Support queries"]
      },
      { 
        type: "Cross-sell - Additional Modules", 
        potential: "$78,000", 
        probability: 73, 
        timeline: "60 days",
        effort: "Medium",
        indicators: ["Team growth", "Workflow gaps", "Integration needs"]
      },
      { 
        type: "Contract Extension", 
        potential: "$156,000", 
        probability: 89, 
        timeline: "90 days",
        effort: "Low",
        indicators: ["High satisfaction", "Renewal season", "Budget planning"]
      },
      { 
        type: "Volume Expansion", 
        potential: "$68,500", 
        probability: 65, 
        timeline: "45 days",
        effort: "Medium",
        indicators: ["Usage growth", "Team scaling", "Process automation"]
      }
    ],
    hiddenValue: [
      { source: "Underutilized features", value: "$23,000", realization: "Feature training" },
      { source: "Process optimization", value: "$34,500", realization: "Workflow consulting" },
      { source: "Team efficiency gains", value: "$19,200", realization: "Advanced training" },
      { source: "Integration benefits", value: "$28,800", realization: "API implementation" }
    ],
    competitiveThreats: [
      { threat: "Competitor pricing pressure", risk: 34, mitigation: "Value demonstration", urgency: "Medium" },
      { threat: "Feature gap concerns", risk: 28, mitigation: "Roadmap sharing", urgency: "High" },
      { threat: "Alternative solution evaluation", risk: 19, mitigation: "Switching cost analysis", urgency: "Low" }
    ],
    actionPlan: [
      { action: "Schedule expansion discussion", priority: "Critical", timeline: "This week", expectedRevenue: "$45,000" },
      { action: "Present ROI analysis", priority: "High", timeline: "Next week", expectedRevenue: "$78,000" },
      { action: "Propose multi-year agreement", priority: "High", timeline: "This month", expectedRevenue: "$156,000" },
      { action: "Demonstrate advanced features", priority: "Medium", timeline: "Next month", expectedRevenue: "$23,000" }
    ]
  };

  const handleScanning = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Revenue Opportunity Scanner
            <Badge variant="secondary" className="ml-auto">Revolutionary AI</Badge>
          </CardTitle>
          <CardDescription>
            Finds hidden revenue opportunities in existing customer relationships with 91% accuracy
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="account-id">Account ID</Label>
              <Input
                id="account-id"
                value={accountData.accountId}
                onChange={(e) => setAccountData({...accountData, accountId: e.target.value})}
                placeholder="e.g., ACC-12345"
              />
            </div>
            <div>
              <Label htmlFor="current-revenue">Current Revenue</Label>
              <Input
                id="current-revenue"
                value={accountData.currentRevenue}
                onChange={(e) => setAccountData({...accountData, currentRevenue: e.target.value})}
                placeholder="e.g., $125,000"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-enabled">Enable Revenue Opportunity Scanning</Label>
            <Switch
              id="ai-enabled"
              checked={accountData.aiEnabled}
              onCheckedChange={(checked) => setAccountData({...accountData, aiEnabled: checked})}
            />
          </div>

          <Button 
            onClick={handleScanning} 
            disabled={isScanning}
            className="w-full"
          >
            {isScanning ? "Scanning Revenue Opportunities..." : "Scan Revenue Opportunities"}
          </Button>
        </CardContent>
      </Card>

      {accountData.aiEnabled && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Revenue Opportunity Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{revenueOpportunities.totalPotential}</div>
                  <div className="text-sm text-muted-foreground">Total Potential</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-muted-foreground">{revenueOpportunities.currentRevenue}</div>
                  <div className="text-sm text-muted-foreground">Current Revenue</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{revenueOpportunities.upliftPotential}</div>
                  <div className="text-sm text-muted-foreground">Uplift Potential</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{revenueOpportunities.confidence}%</div>
                  <div className="text-sm text-muted-foreground">Confidence</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Revenue Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {revenueOpportunities.opportunities.map((opportunity, index) => (
                <div key={index} className="border rounded-lg p-3 bg-gradient-to-r from-primary/5 to-secondary/5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{opportunity.type}</div>
                      <div className="text-sm text-muted-foreground">Timeline: {opportunity.timeline} • Effort: {opportunity.effort}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{opportunity.potential}</div>
                      <Badge variant="secondary">{opportunity.probability}% likely</Badge>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="text-sm font-medium mb-1">Key Indicators</div>
                    <div className="flex gap-1 flex-wrap">
                      {opportunity.indicators.map((indicator, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">{indicator}</Badge>
                      ))}
                    </div>
                  </div>
                  <Progress value={opportunity.probability} className="h-2 mb-2" />
                  <Button size="sm" className="w-full">Pursue Opportunity</Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                Hidden Value Sources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {revenueOpportunities.hiddenValue.map((value, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{value.source}</div>
                      <div className="text-sm text-muted-foreground">Realization: {value.realization}</div>
                    </div>
                    <div className="text-lg font-bold text-green-600">{value.value}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-destructive" />
                Competitive Threats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {revenueOpportunities.competitiveThreats.map((threat, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{threat.threat}</div>
                      <div className="text-sm text-muted-foreground">Mitigation: {threat.mitigation}</div>
                    </div>
                    <div className="text-right">
                      <Badge variant={threat.risk > 30 ? "destructive" : threat.risk > 20 ? "secondary" : "outline"}>
                        {threat.risk}% risk
                      </Badge>
                      <div className="text-sm text-muted-foreground mt-1">{threat.urgency} urgency</div>
                    </div>
                  </div>
                  <Progress value={threat.risk} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Action Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {revenueOpportunities.actionPlan.map((action, index) => (
                <div key={index} className="border rounded-lg p-3 bg-gradient-to-r from-green-50 to-blue-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{action.action}</div>
                      <div className="text-sm text-muted-foreground">Timeline: {action.timeline}</div>
                    </div>
                    <div className="text-right">
                      <Badge variant={action.priority === "Critical" ? "destructive" : action.priority === "High" ? "secondary" : "outline"}>
                        {action.priority}
                      </Badge>
                      <div className="text-sm text-green-600 mt-1">{action.expectedRevenue}</div>
                    </div>
                  </div>
                  <Button size="sm" className="w-full">Execute Action</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}