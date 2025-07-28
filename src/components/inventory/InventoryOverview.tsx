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
    <div className="p-6 md:p-8 space-y-10">
      {/* Enhanced Stats Grid */}
      <div className="grid gap-4 md:gap-6 lg:gap-8 sm:grid-cols-2 xl:grid-cols-4">
        {inventoryStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 border border-border/30 hover:border-primary/30 animate-scale-in transform hover:-translate-y-3 hover:scale-105" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-primary/3 to-secondary/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/15 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-secondary/15 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <CardContent className="p-6 md:p-8 relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/15 to-secondary/15 group-hover:from-primary/25 group-hover:to-secondary/25 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                    <Icon className={`h-7 w-7 md:h-8 md:w-8 transition-all duration-500 group-hover:scale-110 ${
                      stat.variant === "destructive" ? "text-destructive" : "text-primary"
                    }`} />
                  </div>
                  <div className={`text-xs font-bold px-4 py-2 rounded-full border-2 transition-all duration-500 shadow-md ${
                    stat.trend === "up" 
                      ? "text-emerald-600 bg-gradient-to-r from-emerald-50 to-emerald-100 border-emerald-200 dark:text-emerald-400 dark:from-emerald-950 dark:to-emerald-900 dark:border-emerald-800" 
                      : "text-rose-600 bg-gradient-to-r from-rose-50 to-rose-100 border-rose-200 dark:text-rose-400 dark:from-rose-950 dark:to-rose-900 dark:border-rose-800"
                  }`}>
                    {stat.change}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-muted-foreground/90 uppercase tracking-wide">
                    {stat.title}
                  </p>
                  <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-foreground via-foreground/95 to-foreground/85 bg-clip-text text-transparent group-hover:from-primary group-hover:via-primary/95 group-hover:to-secondary transition-all duration-500">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground/80 flex items-center gap-2 font-medium">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary shadow-sm"></div>
                    {stat.description}
                  </p>
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