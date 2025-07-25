import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useGlobalization } from "@/contexts/GlobalizationContext";
import { 
  ShoppingCart, 
  AlertCircle, 
  Clock, 
  TrendingUp,
  Zap,
  CheckCircle
} from "lucide-react";

const smartReorders = [
  {
    id: "1",
    productName: "Butter Croissants",
    sku: "PAS-CRO-001",
    currentStock: 8,
    recommendedQuantity: 42,
    urgency: "critical",
    confidence: 95,
    reason: "Stock below minimum, high demand predicted",
    estimatedCost: 50.40,
    supplier: "French Bakery Supply",
    leadTime: "2-3 days",
    aiReasoning: [
      "Current stock (8) below minimum threshold (15)",
      "AI predicts 32 units demand next week (92% confidence)",
      "Seasonal trend shows 15% increase in pastry sales",
      "Optimal reorder quantity: 42 units for 2-week coverage"
    ]
  },
  {
    id: "2",
    productName: "Coffee - Espresso Beans",
    sku: "COF-ESP-001",
    currentStock: 45,
    recommendedQuantity: 85,
    urgency: "moderate",
    confidence: 87,
    reason: "Approaching reorder point, demand trending up",
    estimatedCost: 1062.50,
    supplier: "Premium Coffee Co.",
    leadTime: "5-7 days",
    aiReasoning: [
      "Stock approaching reorder point (30 units)",
      "7-day demand trend shows 23% increase",
      "Weather forecast suggests higher coffee consumption",
      "Bulk discount available for 80+ unit orders"
    ]
  },
  {
    id: "3",
    productName: "Fresh Salad Mix",
    sku: "FOD-SAL-002",
    currentStock: 12,
    recommendedQuantity: 25,
    urgency: "low",
    confidence: 78,
    reason: "Optimal reorder timing for cost efficiency",
    estimatedCost: 87.50,
    supplier: "Fresh Greens Ltd",
    leadTime: "1-2 days",
    aiReasoning: [
      "Stock sufficient for 5 days at current demand",
      "Supplier offers better pricing on Fridays",
      "Quality degradation starts after 7 days",
      "Customer satisfaction scores higher with fresh stock"
    ]
  }
];

interface SmartReorderProps {
  onProcessReorder: (reorderId: string) => void;
}

export function SmartReorder({ onProcessReorder }: SmartReorderProps) {
  const { formatCurrency } = useGlobalization();
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical": return "destructive";
      case "moderate": return "outline";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case "critical": return <AlertCircle className="h-4 w-4" />;
      case "moderate": return <Clock className="h-4 w-4" />;
      case "low": return <TrendingUp className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          AI-Powered Smart Reorders
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {smartReorders.map((reorder) => (
          <div key={reorder.id} className="border rounded-lg p-4 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <h4 className="font-medium">{reorder.productName}</h4>
                  <p className="text-sm text-muted-foreground font-mono">{reorder.sku}</p>
                </div>
                <Badge variant={getUrgencyColor(reorder.urgency)} className="flex items-center gap-1">
                  {getUrgencyIcon(reorder.urgency)}
                  {reorder.urgency}
                </Badge>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">{formatCurrency(reorder.estimatedCost)}</div>
                <div className="text-sm text-muted-foreground">{reorder.recommendedQuantity} units</div>
              </div>
            </div>

            {/* AI Confidence */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  AI Confidence
                </span>
                <span className="font-medium">{reorder.confidence}%</span>
              </div>
              <Progress value={reorder.confidence} className="h-2" />
            </div>

            {/* Current Stock vs Recommendation */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Current Stock</div>
                <div className="text-lg font-bold">{reorder.currentStock}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Recommended</div>
                <div className="text-lg font-bold text-primary">{reorder.recommendedQuantity}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Lead Time</div>
                <div className="text-lg font-bold">{reorder.leadTime}</div>
              </div>
            </div>

            {/* AI Reasoning */}
            <div className="space-y-2">
              <h5 className="font-medium text-sm">AI Analysis:</h5>
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm mb-2">{reorder.reason}</p>
                <ul className="space-y-1">
                  {reorder.aiReasoning.map((reason, index) => (
                    <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 mt-0.5 text-success flex-shrink-0" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Supplier Info */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Supplier: {reorder.supplier}</span>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button 
                onClick={() => onProcessReorder(reorder.id)}
                className="flex-1"
                variant={reorder.urgency === "critical" ? "default" : "outline"}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Process Reorder
              </Button>
              <Button variant="ghost" size="sm">
                Details
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}