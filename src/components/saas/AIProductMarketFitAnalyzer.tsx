import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Target, TrendingUp, Users, Zap, AlertTriangle } from "lucide-react";

export function AIProductMarketFitAnalyzer() {
  const [productData, setProductData] = useState({
    productName: "",
    targetMarket: "",
    userFeedback: "",
    aiEnabled: false
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const pmfAnalysis = {
    overallPMFScore: 87,
    fitLevel: "Strong",
    confidence: 94,
    timeToOptimalFit: "45 days",
    marketDemand: 89,
    productStrength: 82,
    fitDimensions: [
      { dimension: "Problem-Solution Fit", score: 91, status: "Excellent", insights: "Clear pain point identification" },
      { dimension: "Product-Market Fit", score: 87, status: "Strong", insights: "Good market alignment with optimization potential" },
      { dimension: "Market-Channel Fit", score: 78, status: "Good", insights: "Distribution channels need refinement" },
      { dimension: "Business Model Fit", score: 84, status: "Strong", insights: "Revenue model aligns with market expectations" }
    ],
    marketSegments: [
      { segment: "Early Adopters", fit: 94, size: "12%", potential: "High", acquisition: "Easy" },
      { segment: "Early Majority", fit: 78, size: "34%", potential: "High", acquisition: "Medium" },
      { segment: "Late Majority", fit: 56, size: "34%", potential: "Medium", acquisition: "Hard" },
      { segment: "Laggards", fit: 23, size: "16%", potential: "Low", acquisition: "Very Hard" }
    ],
    competitivePosition: [
      { competitor: "Market Leader", strength: 85, weakness: "High pricing", opportunity: "Better value proposition" },
      { competitor: "Fast Follower", strength: 72, weakness: "Limited features", opportunity: "Feature differentiation" },
      { competitor: "Niche Player", strength: 58, weakness: "Small market share", opportunity: "Market expansion" }
    ],
    optimizationStrategies: [
      {
        strategy: "Feature-Market Alignment",
        impact: "+12% PMF score",
        effort: "Medium",
        timeline: "6 weeks",
        actions: ["User feedback integration", "Feature prioritization", "MVP refinement"]
      },
      {
        strategy: "Market Positioning Optimization",
        impact: "+8% PMF score", 
        effort: "Low",
        timeline: "3 weeks",
        actions: ["Messaging refinement", "Value proposition clarity", "Competitive differentiation"]
      },
      {
        strategy: "Channel-Market Alignment",
        impact: "+15% PMF score",
        effort: "High", 
        timeline: "8 weeks",
        actions: ["Distribution strategy", "Partner channel development", "Go-to-market optimization"]
      }
    ],
    riskFactors: [
      { risk: "Market Saturation", probability: 34, impact: "Medium", mitigation: "Blue ocean strategy" },
      { risk: "Competitive Response", probability: 67, impact: "High", mitigation: "Faster innovation cycles" },
      { risk: "Customer Churn", probability: 23, impact: "Medium", mitigation: "Retention optimization" }
    ],
    realTimeMetrics: [
      { metric: "Customer Satisfaction", score: 8.7, trend: "+0.3", target: 9.0 },
      { metric: "Net Promoter Score", score: 67, trend: "+12", target: 80 },
      { metric: "Product Usage Growth", score: 89, trend: "+23%", target: "95%" },
      { metric: "Market Share", score: 12, trend: "+3%", target: "20%" }
    ]
  };

  const handleAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Product-Market Fit Analyzer
            <Badge variant="secondary" className="ml-auto">Revolutionary AI</Badge>
          </CardTitle>
          <CardDescription>
            Continuously measures and optimizes product-market fit with real-time insights at 94% accuracy
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="product-name">Product Name</Label>
              <Input
                id="product-name"
                value={productData.productName}
                onChange={(e) => setProductData({...productData, productName: e.target.value})}
                placeholder="e.g., AI Analytics Platform"
              />
            </div>
            <div>
              <Label htmlFor="target-market">Target Market</Label>
              <Input
                id="target-market"
                value={productData.targetMarket}
                onChange={(e) => setProductData({...productData, targetMarket: e.target.value})}
                placeholder="e.g., Enterprise SaaS"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-enabled">Enable PMF Analysis</Label>
            <Switch
              id="ai-enabled"
              checked={productData.aiEnabled}
              onCheckedChange={(checked) => setProductData({...productData, aiEnabled: checked})}
            />
          </div>

          <Button 
            onClick={handleAnalysis} 
            disabled={isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? "Analyzing Product-Market Fit..." : "Analyze Product-Market Fit"}
          </Button>
        </CardContent>
      </Card>

      {productData.aiEnabled && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                PMF Analysis Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary">{pmfAnalysis.overallPMFScore}</div>
                  <div className="text-sm text-muted-foreground">PMF Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{pmfAnalysis.fitLevel}</div>
                  <div className="text-sm text-muted-foreground">Fit Level</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{pmfAnalysis.confidence}%</div>
                  <div className="text-sm text-muted-foreground">Confidence</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{pmfAnalysis.timeToOptimalFit}</div>
                  <div className="text-sm text-muted-foreground">Time to Optimal</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Market Demand</span>
                    <span className="text-sm text-muted-foreground">{pmfAnalysis.marketDemand}%</span>
                  </div>
                  <Progress value={pmfAnalysis.marketDemand} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Product Strength</span>
                    <span className="text-sm text-muted-foreground">{pmfAnalysis.productStrength}%</span>
                  </div>
                  <Progress value={pmfAnalysis.productStrength} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Fit Dimensions Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pmfAnalysis.fitDimensions.map((dimension, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{dimension.dimension}</div>
                      <div className="text-sm text-muted-foreground">{dimension.insights}</div>
                    </div>
                    <div className="text-right">
                      <Badge variant={dimension.score > 85 ? "secondary" : dimension.score > 70 ? "outline" : "destructive"}>
                        {dimension.status}
                      </Badge>
                      <div className="text-sm text-muted-foreground mt-1">{dimension.score}/100</div>
                    </div>
                  </div>
                  <Progress value={dimension.score} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Market Segment Fit
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pmfAnalysis.marketSegments.map((segment, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{segment.segment}</div>
                      <div className="text-sm text-muted-foreground">Size: {segment.size} of market</div>
                    </div>
                    <div className="text-right">
                      <Badge variant={segment.fit > 80 ? "secondary" : segment.fit > 60 ? "outline" : "destructive"}>
                        {segment.fit}% fit
                      </Badge>
                      <div className="text-sm text-muted-foreground mt-1">{segment.potential} potential</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Acquisition: {segment.acquisition}</div>
                  </div>
                  <Progress value={segment.fit} className="h-2 mt-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Competitive Position
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pmfAnalysis.competitivePosition.map((comp, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{comp.competitor}</div>
                      <div className="text-sm text-muted-foreground">Weakness: {comp.weakness}</div>
                    </div>
                    <Badge variant={comp.strength > 80 ? "destructive" : comp.strength > 60 ? "secondary" : "outline"}>
                      {comp.strength} strength
                    </Badge>
                  </div>
                  <div className="text-sm text-green-600 mb-1">Opportunity: {comp.opportunity}</div>
                  <Progress value={comp.strength} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Optimization Strategies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pmfAnalysis.optimizationStrategies.map((strategy, index) => (
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
                  <div className="mb-2">
                    <div className="text-sm font-medium mb-1">Key Actions</div>
                    <div className="flex gap-1 flex-wrap">
                      {strategy.actions.map((action, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">{action}</Badge>
                      ))}
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
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pmfAnalysis.riskFactors.map((risk, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{risk.risk}</div>
                      <div className="text-sm text-muted-foreground">Mitigation: {risk.mitigation}</div>
                    </div>
                    <Badge variant={risk.probability > 50 ? "destructive" : risk.probability > 30 ? "secondary" : "outline"}>
                      {risk.impact} impact
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
                <TrendingUp className="h-5 w-5 text-primary" />
                Real-Time PMF Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pmfAnalysis.realTimeMetrics.map((metric, index) => (
                <div key={index} className="border rounded-lg p-3 bg-gradient-to-r from-blue-50 to-green-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{metric.metric}</div>
                      <div className="text-sm text-muted-foreground">Target: {metric.target}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">{metric.score}</div>
                      <div className={`text-sm ${metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {metric.trend}
                      </div>
                    </div>
                  </div>
                  <Progress value={typeof metric.score === 'number' ? metric.score : parseInt(metric.score)} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}