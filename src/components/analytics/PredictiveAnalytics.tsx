import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  ShoppingCart, 
  Package,
  Clock,
  Calendar,
  Eye,
  BarChart3
} from "lucide-react";

const predictiveMetrics = [
  {
    id: "revenue_forecast",
    title: "Revenue Forecast",
    current: 387420,
    predicted: 475680,
    change: "+22.8%",
    trend: "up",
    confidence: 94,
    timeframe: "Next Month",
    factors: ["Seasonal trends", "Marketing campaigns", "Historical patterns"],
    icon: DollarSign
  },
  {
    id: "customer_growth",
    title: "Customer Growth",
    current: 2847,
    predicted: 3156,
    change: "+10.9%",
    trend: "up", 
    confidence: 89,
    timeframe: "Next Month",
    factors: ["Referral programs", "Digital marketing", "Location expansion"],
    icon: Users
  },
  {
    id: "transaction_volume",
    title: "Transaction Volume",
    current: 1245,
    predicted: 1089,
    change: "-12.5%",
    trend: "down",
    confidence: 76,
    timeframe: "Next Month",
    factors: ["Economic conditions", "Competition", "Seasonal decline"],
    icon: ShoppingCart
  },
  {
    id: "inventory_turnover",
    title: "Inventory Turnover",
    current: 4.2,
    predicted: 4.8,
    change: "+14.3%",
    trend: "up",
    confidence: 91,
    timeframe: "Next Quarter",
    factors: ["Better forecasting", "Supplier optimization", "Demand patterns"],
    icon: Package
  }
];

const salesPredictions = [
  { 
    date: "2024-02-01", 
    predicted: 12500, 
    confidence: 92,
    factors: ["Thursday peak", "Payroll day", "Weather favorable"]
  },
  { 
    date: "2024-02-02", 
    predicted: 15800, 
    confidence: 89,
    factors: ["Friday high traffic", "Weekend prep", "Events nearby"]
  },
  { 
    date: "2024-02-03", 
    predicted: 18200, 
    confidence: 87,
    factors: ["Saturday peak", "Family visits", "Special promotions"]
  },
  { 
    date: "2024-02-04", 
    predicted: 16900, 
    confidence: 85,
    factors: ["Sunday brunch", "Leisure visits", "Steady traffic"]
  },
  { 
    date: "2024-02-05", 
    predicted: 11200, 
    confidence: 88,
    factors: ["Monday dip", "Work week start", "Regular customers"]
  }
];

const customerSegments = [
  {
    segment: "Premium Customers",
    size: 486,
    growthPrediction: "+18%",
    revenue: 156780,
    churnRisk: "Low",
    characteristics: ["High frequency", "Large orders", "Loyal"],
    color: "text-success"
  },
  {
    segment: "Regular Customers", 
    size: 1234,
    growthPrediction: "+8%",
    revenue: 189340,
    churnRisk: "Medium",
    characteristics: ["Weekly visits", "Consistent spend", "Price-sensitive"],
    color: "text-primary"
  },
  {
    segment: "Occasional Visitors",
    size: 892,
    growthPrediction: "-5%",
    revenue: 67890,
    churnRisk: "High", 
    characteristics: ["Monthly visits", "Low spend", "Promotion-driven"],
    color: "text-warning"
  },
  {
    segment: "New Customers",
    size: 235,
    growthPrediction: "+45%",
    revenue: 23450,
    churnRisk: "Unknown",
    characteristics: ["First-time", "Testing phase", "Potential growth"],
    color: "text-accent"
  }
];

export function PredictiveAnalytics() {
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  const getChurnRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "text-success";
      case "Medium": return "text-warning";
      case "High": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Predictive Metrics */}
      <div className="grid gap-6 lg:grid-cols-2">
        {predictiveMetrics.map((metric) => {
          const Icon = metric.icon;
          const changeValue = parseFloat(metric.change.replace(/[+%-]/g, ''));
          
          return (
            <Card key={metric.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Icon className="h-5 w-5" />
                    {metric.title}
                  </CardTitle>
                  <Badge variant="outline">{metric.timeframe}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">Current</div>
                    <div className="text-lg font-bold">
                      {metric.id.includes('revenue') ? formatCurrency(metric.current) : metric.current.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Predicted</div>
                    <div className="text-lg font-bold">
                      {metric.id.includes('revenue') ? formatCurrency(metric.predicted) : metric.predicted.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-success" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-destructive" />
                    )}
                    <span className={`font-medium ${
                      metric.trend === "up" ? "text-success" : "text-destructive"
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {metric.confidence}% confidence
                  </div>
                </div>

                <div className="space-y-2">
                  <Progress value={metric.confidence} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    Factors: {metric.factors.slice(0, 2).join(", ")}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Sales Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            5-Day Sales Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {salesPredictions.map((prediction, index) => {
              const date = new Date(prediction.date);
              const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
              const dayDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              
              return (
                <div key={prediction.date} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="font-medium">{dayName}</div>
                      <div className="text-sm text-muted-foreground">{dayDate}</div>
                    </div>
                    <div>
                      <div className="font-bold text-lg">{formatCurrency(prediction.predicted)}</div>
                      <div className="text-xs text-muted-foreground">
                        {prediction.confidence}% confidence
                      </div>
                    </div>
                  </div>
                  <div className="text-right max-w-xs">
                    <div className="text-xs text-muted-foreground">
                      {prediction.factors.slice(0, 2).join(" • ")}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Customer Segmentation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Customer Segment Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {customerSegments.map((segment, index) => (
              <div key={segment.segment} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{segment.segment}</h4>
                  <Badge variant="outline" className={getChurnRiskColor(segment.churnRisk)}>
                    {segment.churnRisk} Risk
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Size</div>
                    <div className="font-medium">{segment.size.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Growth</div>
                    <div className={`font-medium ${segment.color}`}>
                      {segment.growthPrediction}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-muted-foreground">Revenue</div>
                    <div className="font-medium">{formatCurrency(segment.revenue)}</div>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  {segment.characteristics.join(" • ")}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}