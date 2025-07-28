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
    <div className="space-y-8">
      {/* Enhanced Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {inventoryStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="p-6 relative overflow-hidden">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300">
                      <Icon className={`h-6 w-6 transition-colors duration-300 ${
                        stat.variant === "destructive" ? "text-destructive" : "text-primary"
                      }`} />
                    </div>
                    <div className={`text-xs font-medium px-3 py-1 rounded-full border transition-all duration-300 ${
                      stat.trend === "up" 
                        ? "text-emerald-600 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950 dark:border-emerald-800" 
                        : "text-rose-600 bg-rose-50 border-rose-200 dark:text-rose-400 dark:bg-rose-950 dark:border-rose-800"
                    }`}>
                      {stat.change}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <div className="w-1 h-1 rounded-full bg-primary"></div>
                      {stat.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Enhanced AI Demand Forecast */}
      <Card className="overflow-hidden border-2 hover:border-primary/20 transition-all duration-300 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary/5 via-primary/3 to-secondary/5 border-b">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AI Demand Forecast
              </span>
              <p className="text-sm text-muted-foreground font-normal">Predictive analytics for next 7 days</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {demandForecast.map((forecast, index) => {
            const stockRatio = (forecast.currentStock / forecast.predictedDemand) * 100;
            const clampedRatio = Math.min(Math.max(stockRatio, 0), 100);
            
            return (
              <div key={forecast.category} className="group space-y-4 p-4 rounded-xl border transition-all duration-300 hover:bg-primary/5 hover:border-primary/20 animate-slide-in-right" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300">
                      <Package className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{forecast.category}</h4>
                      <p className="text-sm text-muted-foreground">Category performance</p>
                    </div>
                    <Badge 
                      variant="secondary"
                      className={`${getStatusColor(forecast.status)} text-white border-none shadow-md transition-all duration-300 hover:scale-105`}
                    >
                      {getStatusText(forecast.status)}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">
                      {forecast.currentStock} <span className="text-sm font-normal text-muted-foreground">units</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Predicted: {forecast.predictedDemand}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Stock Coverage Ratio</span>
                    <span className={`font-semibold ${
                      stockRatio >= 100 ? "text-emerald-600" : 
                      stockRatio >= 50 ? "text-amber-600" : "text-rose-600"
                    }`}>
                      {stockRatio.toFixed(1)}%
                    </span>
                  </div>
                  <div className="relative">
                    <Progress 
                      value={clampedRatio} 
                      className={`h-3 rounded-full transition-all duration-500 ${
                        forecast.status === "critical" ? "[&>div]:bg-gradient-to-r [&>div]:from-rose-500 [&>div]:to-rose-600" :
                        forecast.status === "reorder" ? "[&>div]:bg-gradient-to-r [&>div]:from-amber-500 [&>div]:to-amber-600" :
                        forecast.status === "overstocked" ? "[&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-blue-600" :
                        "[&>div]:bg-gradient-to-r [&>div]:from-emerald-500 [&>div]:to-emerald-600"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}