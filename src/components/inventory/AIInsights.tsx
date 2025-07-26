import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, AlertTriangle, Zap, Package, DollarSign } from "lucide-react";
import { useInventory } from "@/hooks/useInventory";

interface AIInsight {
  type: "forecast" | "optimization" | "risk" | "alert";
  title: string;
  description: string;
  confidence: number;
  impact: "high" | "medium" | "low";
  icon: any;
  action: string;
}

export function AIInsights() {
  const { inventory, getLowStockItems, getReorderRecommendations } = useInventory();
  
  // Generate real AI insights from inventory data
  const aiInsights = useMemo(() => {
    const insights: AIInsight[] = [];
    const lowStockItems = getLowStockItems();
    const reorderItems = getReorderRecommendations();
    
    // Low stock alerts
    if (lowStockItems.length > 0) {
      const criticalItems = lowStockItems.filter(item => item.currentStock === 0);
      if (criticalItems.length > 0) {
        insights.push({
          type: "alert",
          title: "Critical Stock Alert",
          description: `${criticalItems.length} products are out of stock`,
          confidence: 100,
          impact: "high",
          icon: AlertTriangle,
          action: `Immediate restocking needed for ${criticalItems[0]?.name || 'critical items'}`
        });
      } else {
        insights.push({
          type: "risk",
          title: "Low Stock Warning",
          description: `${lowStockItems.length} products below minimum stock levels`,
          confidence: 95,
          impact: "medium",
          icon: TrendingDown,
          action: `Review stock levels for ${lowStockItems[0]?.name || 'low stock items'}`
        });
      }
    }

    // Demand forecasting based on AI predictions
    const highDemandItems = inventory.filter(item => 
      item.aiPrediction.nextWeekDemand > item.currentStock * 1.5
    );
    if (highDemandItems.length > 0) {
      insights.push({
        type: "forecast",
        title: "High Demand Forecast",
        description: `${highDemandItems.length} products predicted to have high demand`,
        confidence: Math.round(highDemandItems.reduce((sum, item) => sum + item.aiPrediction.confidence, 0) / highDemandItems.length),
        impact: "high",
        icon: TrendingUp,
        action: `Increase inventory for ${highDemandItems[0]?.name || 'high-demand items'}`
      });
    }

    // Price optimization opportunities
    const lowMarginItems = inventory.filter(item => 
      item.sellingPrice > 0 && ((item.sellingPrice - item.unitCost) / item.sellingPrice) < 0.3
    );
    if (lowMarginItems.length > 0) {
      insights.push({
        type: "optimization",
        title: "Price Optimization Opportunity",
        description: `${lowMarginItems.length} products have margins below 30%`,
        confidence: 85,
        impact: "medium",
        icon: DollarSign,
        action: `Review pricing for ${lowMarginItems[0]?.name || 'low-margin items'}`
      });
    }

    // Overstock detection
    const overstockedItems = inventory.filter(item => 
      item.currentStock > item.maxStock * 0.9
    );
    if (overstockedItems.length > 0) {
      insights.push({
        type: "optimization",
        title: "Overstock Alert",
        description: `${overstockedItems.length} products approaching maximum capacity`,
        confidence: 90,
        impact: "medium",
        icon: Package,
        action: `Consider promotions for ${overstockedItems[0]?.name || 'overstocked items'}`
      });
    }

    // Supplier diversification
    const supplierCounts = inventory.reduce((acc, item) => {
      acc[item.supplier] = (acc[item.supplier] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const dominantSupplier = Object.entries(supplierCounts).reduce((max, [supplier, count]) => 
      count > max.count ? { supplier, count } : max, { supplier: '', count: 0 }
    );
    
    if (dominantSupplier.count > inventory.length * 0.6) {
      insights.push({
        type: "risk",
        title: "Supplier Concentration Risk",
        description: `${Math.round((dominantSupplier.count / inventory.length) * 100)}% of products from single supplier`,
        confidence: 95,
        impact: "medium",
        icon: AlertTriangle,
        action: `Diversify supplier base beyond ${dominantSupplier.supplier}`
      });
    }

    return insights;
  }, [inventory, getLowStockItems, getReorderRecommendations]);

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