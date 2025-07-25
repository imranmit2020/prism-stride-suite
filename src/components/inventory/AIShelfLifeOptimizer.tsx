import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Clock, Package, AlertTriangle, TrendingUp, Zap } from "lucide-react";

export function AIShelfLifeOptimizer() {
  const [optimizationData, setOptimizationData] = useState({
    totalItems: 1247,
    expiringItems: 23,
    wasteReduction: 89,
    revenueRecovered: "$12,400"
  });

  const shelfLifeOptimization = {
    overallEfficiency: 94,
    wasteReduction: 89,
    revenueRecovery: 76,
    predictionAccuracy: 97,
    expiringProducts: [
      {
        product: "Organic Milk - 2%",
        currentStock: 45,
        expiresIn: "2 days",
        wasteRisk: 89,
        recommendedAction: "Flash sale 30% off",
        potentialLoss: "$180",
        aiStrategy: "Bundle with cereal products",
        confidence: 94
      },
      {
        product: "Fresh Salmon Fillets", 
        currentStock: 12,
        expiresIn: "1 day",
        wasteRisk: 95,
        recommendedAction: "Staff meal/donation",
        potentialLoss: "$240",
        aiStrategy: "Chef special promotion",
        confidence: 97
      },
      {
        product: "Artisan Bread Loaves",
        currentStock: 28,
        expiresIn: "3 days", 
        wasteRisk: 67,
        recommendedAction: "Bakery discount",
        potentialLoss: "$84",
        aiStrategy: "Cross-sell with soup",
        confidence: 91
      }
    ],
    optimizationStrategies: [
      {
        strategy: "Dynamic Pricing Algorithm",
        impact: "+34% recovery",
        description: "AI adjusts prices based on expiration proximity",
        implementation: "Real-time price updates",
        expectedSavings: "$4,200/month"
      },
      {
        strategy: "Predictive Bundling",
        impact: "+28% sales",
        description: "AI creates smart product bundles",
        implementation: "Automated bundle suggestions",
        expectedSavings: "$3,100/month"
      },
      {
        strategy: "Expiration Forecasting",
        impact: "+41% waste reduction",
        description: "AI predicts exact expiration timing",
        implementation: "Temperature and environment analysis",
        expectedSavings: "$5,800/month"
      }
    ],
    rotationOptimization: [
      { area: "Dairy Section", currentRotation: 78, optimizedRotation: 96, improvement: "+23%" },
      { area: "Produce Section", currentRotation: 67, optimizedRotation: 91, improvement: "+36%" },
      { area: "Meat Department", currentRotation: 89, optimizedRotation: 98, improvement: "+10%" },
      { area: "Bakery Items", currentRotation: 54, optimizedRotation: 87, improvement: "+61%" }
    ],
    environmentalFactors: [
      { factor: "Temperature Fluctuation", impact: 67, optimization: "Smart climate control", potential: "+12% shelf life" },
      { factor: "Humidity Levels", impact: 54, optimization: "Moisture regulation", potential: "+8% shelf life" },
      { factor: "Light Exposure", impact: 43, optimization: "UV-filtered lighting", potential: "+15% shelf life" },
      { factor: "Air Quality", impact: 71, optimization: "Purification systems", potential: "+9% shelf life" }
    ],
    wasteCategories: [
      { category: "Natural Expiration", current: 45, optimized: 12, reduction: "-73%" },
      { category: "Quality Degradation", current: 32, optimized: 8, reduction: "-75%" },
      { category: "Damage/Mishandling", current: 18, optimized: 5, reduction: "-72%" },
      { category: "Overordering", current: 28, optimized: 3, reduction: "-89%" }
    ]
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Shelf Life Optimizer
            <Badge variant="secondary" className="ml-auto">Revolutionary AI</Badge>
          </CardTitle>
          <CardDescription>
            Eliminates 89% of food waste using quantum freshness prediction and temporal optimization algorithms
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">{shelfLifeOptimization.overallEfficiency}%</div>
              <div className="text-sm text-muted-foreground">Optimization Efficiency</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{shelfLifeOptimization.wasteReduction}%</div>
              <div className="text-sm text-muted-foreground">Waste Reduction</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{optimizationData.revenueRecovered}</div>
              <div className="text-sm text-muted-foreground">Revenue Recovered</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{shelfLifeOptimization.predictionAccuracy}%</div>
              <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-200">
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">🌱 Zero Waste Mission Active</div>
              <div className="text-sm text-muted-foreground">AI monitoring molecular decay • Quantum freshness sensors engaged</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-destructive" />
            Critical Expiration Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {shelfLifeOptimization.expiringProducts.map((product, index) => (
            <div key={index} className="border rounded-lg p-4 bg-gradient-to-r from-red-50 to-orange-50">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-medium text-lg">{product.product}</div>
                  <div className="text-sm text-muted-foreground">
                    Stock: {product.currentStock} • Expires: {product.expiresIn}
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="destructive">{product.wasteRisk}% waste risk</Badge>
                  <div className="text-sm text-red-600 font-bold mt-1">{product.potentialLoss} loss</div>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="text-sm font-medium mb-1">AI Recommended Action</div>
                <Badge variant="secondary" className="text-xs mb-2">{product.recommendedAction}</Badge>
                <div className="text-sm text-muted-foreground bg-muted p-2 rounded">
                  Strategy: {product.aiStrategy}
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Waste Risk Level</span>
                  <span className="text-sm text-muted-foreground">{product.confidence}% confidence</span>
                </div>
                <Progress value={product.wasteRisk} className="h-3" />
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">Execute AI Strategy</Button>
                <Button size="sm" variant="outline" className="flex-1">Custom Action</Button>
              </div>
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
          {shelfLifeOptimization.optimizationStrategies.map((strategy, index) => (
            <div key={index} className="border rounded-lg p-3 bg-gradient-to-r from-primary/5 to-secondary/5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">{strategy.strategy}</div>
                  <div className="text-sm text-muted-foreground">{strategy.description}</div>
                </div>
                <div className="text-right">
                  <Badge variant="destructive">{strategy.impact}</Badge>
                  <div className="text-lg font-bold text-green-600">{strategy.expectedSavings}</div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground mb-2">{strategy.implementation}</div>
              <Button size="sm" className="w-full">Implement Strategy</Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Rotation Optimization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {shelfLifeOptimization.rotationOptimization.map((rotation, index) => (
            <div key={index} className="border rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">{rotation.area}</div>
                  <div className="text-sm text-muted-foreground">
                    Current: {rotation.currentRotation}% • Optimized: {rotation.optimizedRotation}%
                  </div>
                </div>
                <Badge variant="destructive">{rotation.improvement}</Badge>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Current Efficiency</div>
                <Progress value={rotation.currentRotation} className="h-2" />
                <div className="text-xs text-muted-foreground">AI Optimized</div>
                <Progress value={rotation.optimizedRotation} className="h-2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Environmental Optimization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {shelfLifeOptimization.environmentalFactors.map((factor, index) => (
            <div key={index} className="border rounded-lg p-3 bg-gradient-to-r from-green-50 to-blue-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">{factor.factor}</div>
                  <div className="text-sm text-muted-foreground">{factor.optimization}</div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">{factor.impact}% impact</Badge>
                  <div className="text-sm text-green-600 mt-1">{factor.potential}</div>
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
            <AlertTriangle className="h-5 w-5 text-primary" />
            Waste Category Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {shelfLifeOptimization.wasteCategories.map((category, index) => (
            <div key={index} className="border rounded-lg p-3 bg-gradient-to-r from-green-50 to-blue-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">{category.category}</div>
                  <div className="text-sm text-muted-foreground">
                    Before: {category.current}% • After: {category.optimized}%
                  </div>
                </div>
                <Badge variant="destructive">{category.reduction}</Badge>
              </div>
              <Progress value={category.optimized} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}