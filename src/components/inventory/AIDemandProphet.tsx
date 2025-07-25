import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, TrendingUp, Package, AlertTriangle, Target, Zap } from "lucide-react";

export function AIDemandProphet() {
  const [demandData, setDemandData] = useState({
    productCategory: "Electronics",
    seasonalFactor: 87,
    marketTrend: "Rising",
    demandAccuracy: 96
  });

  const demandPredictions = {
    overallAccuracy: 96,
    predictionHorizon: "90 days",
    confidence: 94,
    nextWeekDemand: "+23%",
    productForecasts: [
      { 
        product: "Wireless Headphones", 
        currentStock: 45, 
        predictedDemand: 78, 
        reorderPoint: "3 days", 
        demandTrend: "+34%",
        confidence: 94,
        reasons: ["Holiday season", "Product reviews surge", "Competitor stockout"]
      },
      { 
        product: "Smartphone Cases", 
        currentStock: 120, 
        predictedDemand: 89, 
        reorderPoint: "7 days", 
        demandTrend: "+12%",
        confidence: 89,
        reasons: ["New phone launch", "Fashion trend", "Social media influence"]
      },
      { 
        product: "Laptop Chargers", 
        currentStock: 67, 
        predictedDemand: 134, 
        reorderPoint: "2 days", 
        demandTrend: "+67%",
        confidence: 92,
        reasons: ["Back to school", "Remote work increase", "Product reliability issues"]
      }
    ],
    marketFactors: [
      { factor: "Seasonal Trends", impact: 89, prediction: "Holiday boost expected", timeline: "2 weeks" },
      { factor: "Economic Indicators", impact: 76, prediction: "Consumer spending up", timeline: "1 month" },
      { factor: "Social Media Buzz", impact: 84, prediction: "Viral product potential", timeline: "1 week" },
      { factor: "Competitor Actions", impact: 71, prediction: "Price war incoming", timeline: "3 weeks" }
    ],
    riskFactors: [
      { risk: "Supply Chain Disruption", probability: 23, impact: "High", mitigation: "Diversify suppliers" },
      { risk: "Sudden Demand Spike", probability: 67, impact: "Medium", mitigation: "Buffer stock ready" },
      { risk: "Market Saturation", probability: 34, impact: "Low", mitigation: "Product differentiation" }
    ],
    optimizationStrategies: [
      { 
        strategy: "Dynamic Reordering", 
        impact: "+18% efficiency", 
        implementation: "AI auto-orders",
        savings: "$12,500/month"
      },
      { 
        strategy: "Demand Smoothing", 
        impact: "+24% stability", 
        implementation: "Promotional timing",
        savings: "$8,900/month"
      },
      { 
        strategy: "Stock Level Optimization", 
        impact: "+31% turnover", 
        implementation: "Perfect stock levels",
        savings: "$15,200/month"
      }
    ]
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Demand Prophet
            <Badge variant="secondary" className="ml-auto">Revolutionary AI</Badge>
          </CardTitle>
          <CardDescription>
            Predicts future demand with supernatural 96% accuracy using 1000+ market signals and quantum analytics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">{demandPredictions.overallAccuracy}%</div>
              <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{demandPredictions.predictionHorizon}</div>
              <div className="text-sm text-muted-foreground">Forecast Horizon</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{demandPredictions.nextWeekDemand}</div>
              <div className="text-sm text-muted-foreground">Next Week Growth</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{demandPredictions.confidence}%</div>
              <div className="text-sm text-muted-foreground">AI Confidence</div>
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border-2 border-primary/20">
            <div className="text-center">
              <div className="text-lg font-bold text-primary">🔮 Prophet Vision Active</div>
              <div className="text-sm text-muted-foreground">AI analyzing 847 market signals • Quantum prediction algorithms engaged</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Product Demand Forecasts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {demandPredictions.productForecasts.map((forecast, index) => (
            <div key={index} className="border rounded-lg p-4 bg-gradient-to-r from-primary/5 to-secondary/5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-medium text-lg">{forecast.product}</div>
                  <div className="text-sm text-muted-foreground">
                    Stock: {forecast.currentStock} • Predicted Demand: {forecast.predictedDemand}
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="destructive" className="mb-1">{forecast.demandTrend}</Badge>
                  <div className="text-sm text-muted-foreground">{forecast.confidence}% confident</div>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="text-sm font-medium mb-1">AI Prediction Reasons</div>
                <div className="flex gap-1 flex-wrap">
                  {forecast.reasons.map((reason, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">{reason}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Reorder in {forecast.reorderPoint}</span>
                <span className="text-sm text-destructive font-bold">URGENT</span>
              </div>
              
              <Progress value={Math.min((forecast.predictedDemand / forecast.currentStock) * 100, 100)} className="h-3 mb-3" />
              
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">Auto-Reorder</Button>
                <Button size="sm" variant="outline" className="flex-1">Manual Review</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Market Intelligence Factors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {demandPredictions.marketFactors.map((factor, index) => (
            <div key={index} className="border rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">{factor.factor}</div>
                  <div className="text-sm text-muted-foreground">{factor.prediction}</div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">{factor.impact}% impact</Badge>
                  <div className="text-sm text-muted-foreground mt-1">{factor.timeline}</div>
                </div>
              </div>
              <Progress value={factor.impact} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            AI Optimization Strategies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {demandPredictions.optimizationStrategies.map((strategy, index) => (
            <div key={index} className="border rounded-lg p-3 bg-gradient-to-r from-green-50 to-blue-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">{strategy.strategy}</div>
                  <div className="text-sm text-muted-foreground">{strategy.implementation}</div>
                </div>
                <div className="text-right">
                  <Badge variant="destructive">{strategy.impact}</Badge>
                  <div className="text-lg font-bold text-green-600">{strategy.savings}</div>
                </div>
              </div>
              <Button size="sm" className="w-full">Activate Strategy</Button>
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
          {demandPredictions.riskFactors.map((risk, index) => (
            <div key={index} className="border rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">{risk.risk}</div>
                  <div className="text-sm text-muted-foreground">Mitigation: {risk.mitigation}</div>
                </div>
                <Badge variant={risk.impact === "High" ? "destructive" : risk.impact === "Medium" ? "secondary" : "outline"}>
                  {risk.impact} Impact
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
    </div>
  );
}