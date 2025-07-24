import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  Zap,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  Package,
  BarChart3
} from "lucide-react";

const aiInsights = [
  {
    id: "revenue_forecast",
    type: "prediction",
    title: "Revenue Prediction",
    description: "Q2 revenue projected to reach $1.2M",
    confidence: 94,
    impact: "high",
    trend: "up",
    value: "+23.5%",
    icon: DollarSign,
    timeframe: "Next Quarter",
    details: [
      "Coffee sales driving 40% of growth",
      "Weekend traffic up 15% vs last quarter",
      "New product launches contributing $180K"
    ]
  },
  {
    id: "customer_churn",
    type: "alert",
    title: "Customer Retention Risk",
    description: "12% of premium customers showing churn signals",
    confidence: 87,
    impact: "high",
    trend: "down",
    value: "156 customers",
    icon: Users,
    timeframe: "Next 30 Days",
    details: [
      "Reduced visit frequency by 45%",
      "Lower average transaction value",
      "Competitor activity in area increased"
    ]
  },
  {
    id: "inventory_optimization",
    type: "optimization",
    title: "Inventory Efficiency",
    description: "AI suggests reducing overstock by 18%",
    confidence: 91,
    impact: "medium",
    trend: "up", 
    value: "$45K savings",
    icon: Package,
    timeframe: "This Month",
    details: [
      "Pastry overstock costing $12K monthly",
      "Seasonal adjustments needed for beverages",
      "Supplier consolidation opportunities"
    ]
  },
  {
    id: "staff_optimization",
    type: "recommendation",
    title: "Staffing Optimization",
    description: "Optimal scheduling could reduce costs by 12%",
    confidence: 89,
    impact: "medium",
    trend: "up",
    value: "$8.2K/month",
    icon: Clock,
    timeframe: "Ongoing",
    details: [
      "Peak hours: 11AM-2PM, 6PM-8PM",
      "Reduce Monday morning shifts by 2 staff",
      "Add weekend evening coverage"
    ]
  },
  {
    id: "market_opportunity",
    type: "opportunity",
    title: "Market Expansion",
    description: "Delivery service could add 28% revenue",
    confidence: 82,
    impact: "high",
    trend: "up",
    value: "$320K annually",
    icon: Target,
    timeframe: "6 Months",
    details: [
      "3-mile radius has 15K potential customers",
      "Competitors not serving evenings",
      "Initial investment: $35K setup cost"
    ]
  },
  {
    id: "price_optimization",
    type: "optimization",
    title: "Dynamic Pricing Opportunity",
    description: "AI-driven pricing could boost margins by 7%",
    confidence: 76,
    impact: "medium",
    trend: "up",
    value: "$2.1K/month",
    icon: TrendingUp,
    timeframe: "Next Quarter",
    details: [
      "Premium items can increase 8-12%",
      "Happy hour discounts recommended",
      "Seasonal pricing adjustments"
    ]
  }
];

export function AIInsightsDashboard() {
  const getInsightColor = (type: string) => {
    switch (type) {
      case "prediction": return "text-primary";
      case "alert": return "text-destructive";
      case "optimization": return "text-success";
      case "recommendation": return "text-warning";
      case "opportunity": return "text-accent";
      default: return "text-muted-foreground";
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "prediction": return Brain;
      case "alert": return AlertTriangle;
      case "optimization": return Zap;
      case "recommendation": return CheckCircle;
      case "opportunity": return Target;
      default: return BarChart3;
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high": return <Badge variant="destructive">High Impact</Badge>;
      case "medium": return <Badge variant="outline">Medium Impact</Badge>;
      case "low": return <Badge variant="secondary">Low Impact</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const averageConfidence = Math.round(
    aiInsights.reduce((sum, insight) => sum + insight.confidence, 0) / aiInsights.length
  );

  return (
    <div className="space-y-6">
      {/* AI Analytics Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            AI Business Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{aiInsights.length}</div>
              <div className="text-sm text-muted-foreground">Active Insights</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{averageConfidence}%</div>
              <div className="text-sm text-muted-foreground">Avg Confidence</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">$383K</div>
              <div className="text-sm text-muted-foreground">Potential Value</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {aiInsights.map((insight) => {
          const IconComponent = insight.icon;
          const InsightIcon = getInsightIcon(insight.type);
          
          return (
            <Card key={insight.id} className="relative overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-muted ${getInsightColor(insight.type)}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{insight.title}</h3>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <InsightIcon className={`h-4 w-4 ${getInsightColor(insight.type)}`} />
                    {getImpactBadge(insight.impact)}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Key Metric */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {insight.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-success" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-destructive" />
                    )}
                    <span className="text-lg font-bold">{insight.value}</span>
                  </div>
                  <Badge variant="outline">{insight.timeframe}</Badge>
                </div>

                {/* AI Confidence */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Brain className="h-3 w-3" />
                      AI Confidence
                    </span>
                    <span className="font-medium">{insight.confidence}%</span>
                  </div>
                  <Progress value={insight.confidence} className="h-2" />
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Key Factors:</h4>
                  <ul className="space-y-1">
                    {insight.details.map((detail, index) => (
                      <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 mt-0.5 text-success flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}