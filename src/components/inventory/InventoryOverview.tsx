import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  TrendingUp, 
  Package, 
  DollarSign,
  BarChart3,
  Brain
} from "lucide-react";

const inventoryStats = [
  {
    title: "Total Products",
    value: "847",
    change: "+12",
    trend: "up",
    icon: Package,
    description: "items in catalog"
  },
  {
    title: "Low Stock Alerts",
    value: "23",
    change: "+5",
    trend: "up",
    icon: AlertTriangle,
    description: "need attention",
    variant: "destructive"
  },
  {
    title: "Inventory Value",
    value: "$156,430",
    change: "+8.2%",
    trend: "up",
    icon: DollarSign,
    description: "total value"
  },
  {
    title: "AI Accuracy",
    value: "94.2%",
    change: "+2.1%",
    trend: "up",
    icon: Brain,
    description: "prediction accuracy"
  }
];

const demandForecast = [
  { category: "Beverages", currentStock: 245, predictedDemand: 187, status: "adequate" },
  { category: "Food", currentStock: 89, predictedDemand: 156, status: "reorder" },
  { category: "Pastries", currentStock: 34, predictedDemand: 78, status: "critical" },
  { category: "Snacks", currentStock: 167, predictedDemand: 92, status: "overstocked" }
];

export function InventoryOverview() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "bg-destructive";
      case "reorder": return "bg-warning";
      case "adequate": return "bg-success";
      case "overstocked": return "bg-primary";
      default: return "bg-muted";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "critical": return "Critical";
      case "reorder": return "Reorder";
      case "adequate": return "Adequate";
      case "overstocked": return "Overstocked";
      default: return "Unknown";
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {inventoryStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${
                    stat.variant === "destructive" ? "text-destructive" : "text-muted-foreground"
                  }`} />
                </div>
                <div className="mt-2">
                  <span className={`text-xs font-medium ${
                    stat.trend === "up" ? "text-success" : "text-destructive"
                  }`}>
                    {stat.change} from last month
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* AI Demand Forecast */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            AI Demand Forecast - Next 7 Days
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {demandForecast.map((forecast) => {
            const stockRatio = (forecast.currentStock / forecast.predictedDemand) * 100;
            const clampedRatio = Math.min(Math.max(stockRatio, 0), 100);
            
            return (
              <div key={forecast.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium">{forecast.category}</h4>
                    <Badge 
                      variant="secondary"
                      className={getStatusColor(forecast.status)}
                    >
                      {getStatusText(forecast.status)}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Stock: {forecast.currentStock} | Predicted: {forecast.predictedDemand}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Stock vs Predicted Demand</span>
                    <span>{stockRatio.toFixed(0)}%</span>
                  </div>
                  <Progress 
                    value={clampedRatio} 
                    className={`h-2 ${
                      forecast.status === "critical" ? "[&>div]:bg-destructive" :
                      forecast.status === "reorder" ? "[&>div]:bg-warning" :
                      forecast.status === "overstocked" ? "[&>div]:bg-primary" :
                      "[&>div]:bg-success"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}