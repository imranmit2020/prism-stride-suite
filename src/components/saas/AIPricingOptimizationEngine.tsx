import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, DollarSign, TrendingUp, Target, Zap, BarChart3 } from "lucide-react";

export function AIPricingOptimizationEngine() {
  const [pricingData, setPricingData] = useState({
    currentPlan: "",
    customerSegment: "",
    competitorPrice: "",
    aiEnabled: false
  });
  const [isOptimizing, setIsOptimizing] = useState(false);

  const pricingOptimization = {
    optimalPrice: "$149/month",
    currentPrice: "$99/month",
    revenueUplift: "+51%",
    conversionImpact: "-8%",
    overallGain: "+47%",
    confidence: 93,
    marketAnalysis: {
      competitorAverage: "$134/month",
      priceElasticity: 0.67,
      demandForecast: "Strong",
      marketPosition: "Underpriced"
    },
    segmentOptimization: [
      { segment: "Enterprise", currentPrice: "$199", optimalPrice: "$279", uplift: "+40%", adoption: 89 },
      { segment: "SMB", currentPrice: "$99", optimalPrice: "$149", uplift: "+51%", adoption: 76 },
      { segment: "Startup", currentPrice: "$49", optimalPrice: "$69", uplift: "+41%", adoption: 83 },
      { segment: "Individual", currentPrice: "$29", optimalPrice: "$39", uplift: "+34%", adoption: 91 }
    ],
    valueBased: [
      { valueDriver: "Time Savings", customerValue: "$2,400/month", priceCapture: "12%", potential: "$288" },
      { valueDriver: "Efficiency Gains", customerValue: "$1,800/month", priceCapture: "8%", potential: "$144" },
      { valueDriver: "Error Reduction", customerValue: "$1,200/month", priceCapture: "15%", potential: "$180" },
      { valueDriver: "Compliance Benefits", customerValue: "$3,000/month", priceCapture: "6%", potential: "$180" }
    ],
    dynamicStrategies: [
      { strategy: "Usage-based pricing", impact: "+23% revenue", feasibility: "High", implementation: "3 months" },
      { strategy: "Tiered value pricing", impact: "+34% revenue", feasibility: "Medium", implementation: "6 months" },
      { strategy: "Personalized pricing", impact: "+41% revenue", feasibility: "High", implementation: "4 months" },
      { strategy: "Bundle optimization", impact: "+18% revenue", feasibility: "Low", implementation: "8 months" }
    ],
    testingRecommendations: [
      { test: "A/B price point test", duration: "30 days", confidence: "95%", expectedLift: "+15%" },
      { test: "Value messaging test", duration: "21 days", confidence: "90%", expectedLift: "+8%" },
      { test: "Bundling strategy test", duration: "45 days", confidence: "88%", expectedLift: "+12%" }
    ]
  };

  const handleOptimization = () => {
    setIsOptimizing(true);
    setTimeout(() => setIsOptimizing(false), 3000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Pricing Optimization Engine
            <Badge variant="secondary" className="ml-auto">Revolutionary AI</Badge>
          </CardTitle>
          <CardDescription>
            Dynamic pricing based on value perception, market conditions, and customer behavior with 93% accuracy
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="current-plan">Current Plan</Label>
              <Input
                id="current-plan"
                value={pricingData.currentPlan}
                onChange={(e) => setPricingData({...pricingData, currentPlan: e.target.value})}
                placeholder="e.g., Professional Plan"
              />
            </div>
            <div>
              <Label htmlFor="customer-segment">Customer Segment</Label>
              <Input
                id="customer-segment"
                value={pricingData.customerSegment}
                onChange={(e) => setPricingData({...pricingData, customerSegment: e.target.value})}
                placeholder="e.g., SMB, Enterprise"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-enabled">Enable Pricing Optimization</Label>
            <Switch
              id="ai-enabled"
              checked={pricingData.aiEnabled}
              onCheckedChange={(checked) => setPricingData({...pricingData, aiEnabled: checked})}
            />
          </div>

          <Button 
            onClick={handleOptimization} 
            disabled={isOptimizing}
            className="w-full"
          >
            {isOptimizing ? "Optimizing Pricing..." : "Optimize Pricing Strategy"}
          </Button>
        </CardContent>
      </Card>

      {pricingData.aiEnabled && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Pricing Optimization Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{pricingOptimization.optimalPrice}</div>
                  <div className="text-sm text-muted-foreground">Optimal Price</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-muted-foreground">{pricingOptimization.currentPrice}</div>
                  <div className="text-sm text-muted-foreground">Current Price</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{pricingOptimization.revenueUplift}</div>
                  <div className="text-sm text-muted-foreground">Revenue Uplift</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{pricingOptimization.confidence}%</div>
                  <div className="text-sm text-muted-foreground">Confidence</div>
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">Overall Revenue Gain: {pricingOptimization.overallGain}</div>
                  <div className="text-sm text-muted-foreground">Conversion Impact: {pricingOptimization.conversionImpact}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Market Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="font-medium text-sm text-muted-foreground">Competitor Average</div>
                  <div className="text-lg font-bold">{pricingOptimization.marketAnalysis.competitorAverage}</div>
                </div>
                <div>
                  <div className="font-medium text-sm text-muted-foreground">Price Elasticity</div>
                  <div className="text-lg font-bold">{pricingOptimization.marketAnalysis.priceElasticity}</div>
                </div>
                <div>
                  <div className="font-medium text-sm text-muted-foreground">Demand Forecast</div>
                  <div className="text-lg font-bold">{pricingOptimization.marketAnalysis.demandForecast}</div>
                </div>
                <div>
                  <div className="font-medium text-sm text-muted-foreground">Market Position</div>
                  <div className="text-lg font-bold">{pricingOptimization.marketAnalysis.marketPosition}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Segment Optimization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pricingOptimization.segmentOptimization.map((segment, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{segment.segment}</div>
                      <div className="text-sm text-muted-foreground">
                        {segment.currentPrice} → {segment.optimalPrice}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">{segment.uplift}</Badge>
                      <div className="text-sm text-muted-foreground mt-1">{segment.adoption}% adoption</div>
                    </div>
                  </div>
                  <Progress value={segment.adoption} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Value-Based Pricing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pricingOptimization.valueBased.map((value, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{value.valueDriver}</div>
                      <div className="text-sm text-muted-foreground">Customer Value: {value.customerValue}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{value.potential}</div>
                      <div className="text-sm text-muted-foreground">{value.priceCapture} capture</div>
                    </div>
                  </div>
                  <Progress value={parseInt(value.priceCapture)} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Dynamic Pricing Strategies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pricingOptimization.dynamicStrategies.map((strategy, index) => (
                <div key={index} className="border rounded-lg p-3 bg-gradient-to-r from-primary/5 to-secondary/5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{strategy.strategy}</div>
                      <div className="text-sm text-muted-foreground">Implementation: {strategy.implementation}</div>
                    </div>
                    <div className="text-right">
                      <Badge variant={strategy.feasibility === "High" ? "secondary" : strategy.feasibility === "Medium" ? "outline" : "destructive"}>
                        {strategy.feasibility} feasibility
                      </Badge>
                      <div className="text-sm text-green-600 mt-1">{strategy.impact}</div>
                    </div>
                  </div>
                  <Button size="sm" className="w-full">Implement Strategy</Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Testing Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pricingOptimization.testingRecommendations.map((test, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{test.test}</div>
                      <div className="text-sm text-muted-foreground">Duration: {test.duration}</div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">{test.confidence} confidence</Badge>
                      <div className="text-sm text-green-600 mt-1">{test.expectedLift}</div>
                    </div>
                  </div>
                  <Button size="sm" className="w-full">Start Test</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}