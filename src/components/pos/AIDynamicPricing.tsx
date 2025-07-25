import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, DollarSign, TrendingUp, Zap, Target, AlertTriangle } from "lucide-react";

export function AIDynamicPricing() {
  const [pricingData, setPricingData] = useState({
    basePrice: 299,
    dynamicPrice: 279,
    discount: 7,
    demandLevel: "High",
    competitorPrice: 295,
    priceOptimization: 94
  });

  const pricingInsights = {
    realTimeFactors: [
      { factor: "Demand Level", impact: 89, adjustment: "-$20", reason: "High inventory, boost sales" },
      { factor: "Customer Profile", impact: 76, adjustment: "-$15", reason: "Loyal customer discount" },
      { factor: "Time of Day", impact: 67, adjustment: "+$5", reason: "Peak shopping hours" },
      { factor: "Competitor Analysis", impact: 84, adjustment: "-$10", reason: "Price match opportunity" },
      { factor: "Inventory Level", impact: 91, adjustment: "-$25", reason: "Overstocked item" }
    ],
    priceStrategies: [
      { strategy: "Psychological Pricing", currentPrice: "$279.00", suggestedPrice: "$277.99", uplift: "+12% conversion" },
      { strategy: "Bundle Optimization", currentPrice: "$279.00", suggestedPrice: "$299.00 + Free Gift", uplift: "+23% value perception" },
      { strategy: "Loyalty Pricing", currentPrice: "$279.00", suggestedPrice: "$259.00", uplift: "+34% retention" }
    ],
    competitiveIntel: [
      { competitor: "TechStore A", price: "$295.00", position: "Higher", opportunity: "Price advantage" },
      { competitor: "MegaMart B", price: "$272.00", position: "Lower", opportunity: "Value positioning" },
      { competitor: "OnlineGiant C", price: "$281.00", position: "Similar", opportunity: "Service differentiation" }
    ],
    priceOptimization: [
      { metric: "Revenue Maximization", currentRevenue: "$279", optimizedRevenue: "$294", improvement: "+5.4%" },
      { metric: "Volume Maximization", currentVolume: "1x", optimizedVolume: "1.3x", improvement: "+30%" },
      { metric: "Profit Maximization", currentProfit: "$89", optimizedProfit: "$106", improvement: "+19%" }
    ]
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Dynamic Pricing Engine
            <Badge variant="secondary" className="ml-auto">Revolutionary AI</Badge>
          </CardTitle>
          <CardDescription>
            Real-time price optimization based on 500+ factors with 94% accuracy increase in profits
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-muted-foreground">${pricingData.basePrice}</div>
              <div className="text-sm text-muted-foreground">Base Price</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">${pricingData.dynamicPrice}</div>
              <div className="text-sm text-muted-foreground">AI Optimized</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{pricingData.discount}%</div>
              <div className="text-sm text-muted-foreground">Smart Discount</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{pricingData.priceOptimization}%</div>
              <div className="text-sm text-muted-foreground">Optimization Score</div>
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">Predicted Revenue Increase: +18.7%</div>
              <div className="text-sm text-muted-foreground">Based on current market conditions and customer behavior</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Real-Time Pricing Factors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {pricingInsights.realTimeFactors.map((factor, index) => (
            <div key={index} className="border rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">{factor.factor}</div>
                  <div className="text-sm text-muted-foreground">{factor.reason}</div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">{factor.impact}% impact</Badge>
                  <div className={`text-sm mt-1 font-bold ${factor.adjustment.startsWith('+') ? 'text-red-600' : 'text-green-600'}`}>
                    {factor.adjustment}
                  </div>
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
            AI Pricing Strategies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {pricingInsights.priceStrategies.map((strategy, index) => (
            <div key={index} className="border rounded-lg p-3 bg-gradient-to-r from-primary/5 to-secondary/5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">{strategy.strategy}</div>
                  <div className="text-sm text-muted-foreground">
                    {strategy.currentPrice} → {strategy.suggestedPrice}
                  </div>
                </div>
                <Badge variant="destructive">{strategy.uplift}</Badge>
              </div>
              <Button size="sm" className="w-full">Apply Strategy</Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Competitive Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {pricingInsights.competitiveIntel.map((comp, index) => (
            <div key={index} className="border rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">{comp.competitor}</div>
                  <div className="text-sm text-muted-foreground">Opportunity: {comp.opportunity}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{comp.price}</div>
                  <Badge variant={comp.position === "Higher" ? "secondary" : comp.position === "Lower" ? "destructive" : "outline"}>
                    {comp.position}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Price Optimization Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {pricingInsights.priceOptimization.map((optimization, index) => (
            <div key={index} className="border rounded-lg p-3 bg-gradient-to-r from-green-50 to-blue-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">{optimization.metric}</div>
                  <div className="text-sm text-muted-foreground">
                    {optimization.currentRevenue || optimization.currentVolume || optimization.currentProfit} → {optimization.optimizedRevenue || optimization.optimizedVolume || optimization.optimizedProfit}
                  </div>
                </div>
                <Badge variant="destructive">{optimization.improvement}</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}