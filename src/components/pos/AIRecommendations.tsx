import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, Users, DollarSign, Clock, Zap } from "lucide-react";

const aiRecommendations = [
  {
    type: "upsell",
    title: "Smart Upsell Opportunity",
    description: "Customer ordered latte - 78% likely to add pastry",
    confidence: 78,
    impact: "high",
    value: "+$4.50",
    action: "Suggest blueberry muffin",
    icon: TrendingUp
  },
  {
    type: "pricing",
    title: "Dynamic Pricing Alert",
    description: "Peak hours detected - increase coffee prices by 5%",
    confidence: 92,
    impact: "medium",
    value: "+$12/hour",
    action: "Apply peak pricing",
    icon: DollarSign
  },
  {
    type: "inventory",
    title: "Low Stock Warning",
    description: "Sandwich ingredients running low during lunch rush",
    confidence: 95,
    impact: "high",
    value: "Prevent $200 loss",
    action: "Prep more ingredients",
    icon: Clock
  },
  {
    type: "customer",
    title: "VIP Customer Detected",
    description: "Sarah Johnson - frequent customer, prefers oat milk",
    confidence: 88,
    impact: "medium",
    value: "Loyalty boost",
    action: "Offer oat milk upgrade",
    icon: Users
  }
];

const quickActions = [
  { title: "Apply AI Pricing", description: "Optimize prices based on demand", confidence: 85 },
  { title: "Staff Optimization", description: "Adjust staffing for predicted rush", confidence: 79 },
  { title: "Menu Highlights", description: "Promote high-margin items", confidence: 91 },
  { title: "Loyalty Rewards", description: "Target customers for retention", confidence: 82 }
];

export function AIRecommendations() {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "upsell": return "text-success";
      case "pricing": return "text-primary";
      case "inventory": return "text-warning";
      case "customer": return "text-secondary";
      default: return "text-muted-foreground";
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high": return "destructive" as const;
      case "medium": return "outline" as const;
      case "low": return "secondary" as const;
      default: return "secondary" as const;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Sales Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {aiRecommendations.map((rec, index) => {
            const Icon = rec.icon;
            return (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-start gap-3">
                  <Icon className={`h-5 w-5 mt-0.5 ${getTypeColor(rec.type)}`} />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{rec.title}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant={getImpactBadge(rec.impact)}>
                          {rec.impact} impact
                        </Badge>
                        <Badge variant="outline" className="text-success">
                          {rec.value}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {rec.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span>AI Confidence</span>
                        <span>{rec.confidence}%</span>
                      </div>
                      <Progress value={rec.confidence} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="p-2 bg-muted rounded text-sm">
                        <strong>Action:</strong> {rec.action}
                      </div>
                      <Button size="sm" className="ml-2">
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Quick AI Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <div key={index} className="p-3 border rounded-lg space-y-2">
                <h4 className="font-medium text-sm">{action.title}</h4>
                <p className="text-xs text-muted-foreground">{action.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs">{action.confidence}% confidence</span>
                  <Button size="sm" variant="outline">
                    Execute
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}