import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, AlertTriangle, Zap } from "lucide-react";

const aiInsights = [
  {
    type: "forecast",
    title: "Demand Surge Predicted",
    description: "Coffee products expected to increase 23% next week",
    confidence: 87,
    impact: "high",
    icon: TrendingUp,
    action: "Increase coffee inventory by 150 units"
  },
  {
    type: "optimization",
    title: "Price Optimization",
    description: "Sandwich pricing could be optimized for better margins",
    confidence: 92,
    impact: "medium",
    icon: Zap,
    action: "Increase sandwich prices by $0.50"
  },
  {
    type: "risk",
    title: "Seasonal Drop Warning",
    description: "Hot beverages demand will drop 35% in 2 weeks",
    confidence: 78,
    impact: "medium",
    icon: TrendingDown,
    action: "Reduce hot beverage orders by 40%"
  },
  {
    type: "alert",
    title: "Supply Chain Risk",
    description: "Pastry supplier showing delivery delays",
    confidence: 95,
    impact: "high",
    icon: AlertTriangle,
    action: "Contact backup supplier for pastries"
  }
];

export function AIInsights() {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "destructive" as const;
      case "medium": return "outline" as const;
      case "low": return "secondary" as const;
      default: return "secondary" as const;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "forecast": return "text-success";
      case "optimization": return "text-primary";
      case "risk": return "text-warning";
      case "alert": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          AI Insights & Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {aiInsights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <div key={index} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-start gap-3">
                <Icon className={`h-5 w-5 mt-0.5 ${getIconColor(insight.type)}`} />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{insight.title}</h4>
                    <Badge variant={getImpactColor(insight.impact)}>
                      {insight.impact} impact
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {insight.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>AI Confidence</span>
                      <span>{insight.confidence}%</span>
                    </div>
                    <Progress value={insight.confidence} className="h-2" />
                  </div>
                  <div className="p-2 bg-muted rounded text-sm">
                    <strong>Recommended Action:</strong> {insight.action}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}