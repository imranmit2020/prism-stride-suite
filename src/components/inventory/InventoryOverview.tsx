import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useGlobalization } from "@/contexts/GlobalizationContext";
import { InventoryItem } from "./InventoryTable";
import { 
  AlertTriangle, 
  TrendingUp, 
  Package, 
  DollarSign,
  BarChart3,
  Brain
} from "lucide-react";

interface InventoryOverviewProps {
  inventory: InventoryItem[];
  getInventoryStats: () => {
    totalProducts: number;
    lowStockCount: number;
    totalValue: number;
    avgAccuracy: number;
  };
  getLowStockItems: () => InventoryItem[];
}

const inventoryStatsRaw = [
  {
    title: "Total Products",
    value: "847",
    change: "+12",
    trend: "up",
    icon: Package,
    description: "items in catalog",
    type: "number"
  },
  {
    title: "Low Stock Alerts",
    value: "23",
    change: "+5",
    trend: "up",
    icon: AlertTriangle,
    description: "need attention",
    variant: "destructive",
    type: "number"
  },
  {
    title: "Inventory Value",
    value: 156430,
    change: "+8.2%",
    trend: "up",
    icon: DollarSign,
    description: "total value",
    type: "currency"
  },
  {
    title: "AI Accuracy",
    value: "94.2%",
    change: "+2.1%",
    trend: "up",
    icon: Brain,
    description: "prediction accuracy",
    type: "number"
  }
];

export function InventoryOverview({ inventory, getInventoryStats, getLowStockItems }: InventoryOverviewProps) {
  const { formatCurrency } = useGlobalization();
  
  // Get real stats from hooks
  const stats = getInventoryStats();
  const lowStockItems = getLowStockItems();
  
  // Create dynamic stats based on real data
  const inventoryStats = [
    {
      title: "Total Products",
      value: stats.totalProducts.toString(),
      change: "+12",
      trend: "up",
      icon: Package,
      description: "items in catalog",
      type: "number"
    },
    {
      title: "Low Stock Alerts",
      value: stats.lowStockCount.toString(),
      change: "+5",
      trend: "up",
      icon: AlertTriangle,
      description: "need attention",
      variant: stats.lowStockCount > 0 ? "destructive" : "secondary",
      type: "number"
    },
    {
      title: "Inventory Value",
      value: formatCurrency(stats.totalValue),
      change: "+8.2%",
      trend: "up",
      icon: DollarSign,
      description: "total value",
      type: "currency"
    },
    {
      title: "AI Accuracy",
      value: `${stats.avgAccuracy}%`,
      change: "+2.1%",
      trend: "up",
      icon: Brain,
      description: "prediction accuracy",
      type: "number"
    }
  ];

  // Generate category-based forecast from real data
  const categoryStats = inventory.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = { 
        currentStock: 0, 
        predictedDemand: 0, 
        items: 0 
      };
    }
    acc[item.category].currentStock += item.currentStock;
    acc[item.category].predictedDemand += item.aiPrediction.nextWeekDemand;
    acc[item.category].items += 1;
    return acc;
  }, {} as Record<string, { currentStock: number; predictedDemand: number; items: number }>);

  const demandForecast = Object.entries(categoryStats).map(([category, stats]) => {
    const ratio = stats.currentStock / Math.max(stats.predictedDemand, 1);
    let status = "adequate";
    if (ratio < 0.5) status = "critical";
    else if (ratio < 1) status = "reorder"; 
    else if (ratio > 2) status = "overstocked";
    
    return {
      category,
      currentStock: stats.currentStock,
      predictedDemand: stats.predictedDemand,
      status
    };
  });

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