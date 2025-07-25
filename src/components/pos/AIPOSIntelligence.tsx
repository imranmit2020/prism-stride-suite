import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Eye, TrendingUp, Shield, Zap, Target, Users, DollarSign } from "lucide-react";

export function AIPOSIntelligence() {
  const [aiAnalysis, setAiAnalysis] = useState({
    customerMood: "Positive",
    purchaseIntent: 89,
    fraudRisk: 12,
    upsellOpportunity: 94,
    queueOptimization: 87,
    inventoryAlert: 23,
    lifetimeValue: "$2,340",
    behaviorPattern: "High-Value Shopper"
  });

  const aiInsights = {
    realTimeAnalysis: [
      { metric: "Customer Mood", value: "Positive", confidence: 94, trend: "+12%" },
      { metric: "Purchase Intent", value: "89%", confidence: 91, trend: "+23%" },
      { metric: "Fraud Risk", value: "12%", confidence: 97, trend: "-45%" },
      { metric: "Upsell Probability", value: "94%", confidence: 88, trend: "+67%" }
    ],
    customerPredictions: [
      { prediction: "Will add premium item", probability: 87, value: "+$45", action: "Show premium options" },
      { prediction: "Likely to use loyalty points", probability: 76, value: "Engagement+", action: "Suggest point redemption" },
      { prediction: "May abandon cart", probability: 23, value: "-$89", action: "Offer quick checkout" },
      { prediction: "Potential bulk purchase", probability: 65, value: "+$120", action: "Show bulk discounts" }
    ],
    aiRecommendations: [
      { item: "Premium Headphones", reason: "Complements phone purchase", confidence: 92, uplift: "+$199" },
      { item: "Extended Warranty", reason: "High-value customer profile", confidence: 84, uplift: "+$79" },
      { item: "Accessories Bundle", reason: "Previous purchase pattern", confidence: 78, uplift: "+$45" }
    ],
    securityAlerts: [
      { alert: "Suspicious card behavior", severity: "Low", confidence: 67, action: "Extra verification" },
      { alert: "Unusual purchase pattern", severity: "Medium", confidence: 34, action: "Manager approval" },
      { alert: "High-risk transaction", severity: "High", confidence: 12, action: "Additional ID check" }
    ]
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI POS Intelligence Center
            <Badge variant="secondary" className="ml-auto">Revolutionary AI</Badge>
          </CardTitle>
          <CardDescription>
            Real-time AI analysis of customers, transactions, and business optimization with 94% accuracy
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{aiAnalysis.customerMood}</div>
              <div className="text-sm text-muted-foreground">Customer Mood</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{aiAnalysis.purchaseIntent}%</div>
              <div className="text-sm text-muted-foreground">Purchase Intent</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{aiAnalysis.fraudRisk}%</div>
              <div className="text-sm text-muted-foreground">Fraud Risk</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{aiAnalysis.lifetimeValue}</div>
              <div className="text-sm text-muted-foreground">Customer LTV</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              Real-Time Customer Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {aiInsights.realTimeAnalysis.map((insight, index) => (
              <div key={index} className="border rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium">{insight.metric}</div>
                    <div className="text-lg font-bold text-primary">{insight.value}</div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary">{insight.confidence}% confident</Badge>
                    <div className={`text-sm mt-1 ${insight.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {insight.trend}
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
              <TrendingUp className="h-5 w-5 text-primary" />
              AI Predictions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {aiInsights.customerPredictions.map((prediction, index) => (
              <div key={index} className="border rounded-lg p-3 bg-gradient-to-r from-primary/5 to-secondary/5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium">{prediction.prediction}</div>
                    <div className="text-sm text-muted-foreground">{prediction.action}</div>
                  </div>
                  <div className="text-right">
                    <Badge variant={prediction.probability > 80 ? "secondary" : "outline"}>
                      {prediction.probability}%
                    </Badge>
                    <div className="text-sm text-green-600 mt-1">{prediction.value}</div>
                  </div>
                </div>
                <Progress value={prediction.probability} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            AI Smart Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {aiInsights.aiRecommendations.map((rec, index) => (
            <div key={index} className="border rounded-lg p-3 bg-gradient-to-r from-green-50 to-blue-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">{rec.item}</div>
                  <div className="text-sm text-muted-foreground">{rec.reason}</div>
                </div>
                <div className="text-right">
                  <Badge variant="destructive">{rec.confidence}% match</Badge>
                  <div className="text-lg font-bold text-green-600">{rec.uplift}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">Add to Cart</Button>
                <Button size="sm" variant="outline" className="flex-1">Show Customer</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-destructive" />
            AI Security Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {aiInsights.securityAlerts.map((alert, index) => (
            <div key={index} className="border rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">{alert.alert}</div>
                  <div className="text-sm text-muted-foreground">Recommended: {alert.action}</div>
                </div>
                <Badge variant={alert.severity === "High" ? "destructive" : alert.severity === "Medium" ? "secondary" : "outline"}>
                  {alert.severity} Risk
                </Badge>
              </div>
              <Progress value={alert.confidence} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}