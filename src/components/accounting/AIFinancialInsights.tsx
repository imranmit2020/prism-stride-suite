import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useGlobalization } from "@/contexts/GlobalizationContext";
import { Brain, TrendingUp, AlertTriangle, Shield, DollarSign, Target } from "lucide-react";

const aiInsights = [
  {
    type: "forecast",
    title: "Cash Flow Prediction",
    description: "Potential cash shortage in 3 weeks based on payment patterns",
    confidence: 87,
    impact: "high",
    value: 15000,
    action: "Accelerate receivables",
    icon: DollarSign
  },
  {
    type: "anomaly",
    title: "Expense Anomaly Detected",
    description: "Office supplies expense 340% above normal - possible fraud",
    confidence: 94,
    impact: "critical",
    value: 2400,
    action: "Review transactions",
    icon: AlertTriangle
  },
  {
    type: "optimization",
    title: "Tax Optimization Opportunity",
    description: "Prepay Q1 expenses to reduce current year tax burden",
    confidence: 82,
    impact: "medium",
    value: 3200,
    action: "Prepay utilities",
    icon: Target
  },
  {
    type: "compliance",
    title: "Audit Readiness Check",
    description: "Missing documentation for 12 transactions",
    confidence: 100,
    impact: "high",
    value: "Compliance",
    action: "Collect receipts",
    icon: Shield
  }
];

const financialPredictionsRaw = [
  { 
    metric: "Revenue Forecast", 
    current: 45200, 
    predicted: 52800, 
    confidence: 89,
    timeframe: "Next Month",
    isCurrency: true
  },
  { 
    metric: "Expense Trend", 
    current: 32100, 
    predicted: 34500, 
    confidence: 76,
    timeframe: "Next Month",
    isCurrency: true
  },
  { 
    metric: "Profit Margin", 
    current: "18.2%", 
    predicted: "21.4%", 
    confidence: 83,
    timeframe: "Q1 2024",
    isCurrency: false
  },
  { 
    metric: "Cash Balance", 
    current: 28900, 
    predicted: 31200, 
    confidence: 91,
    timeframe: "End of Month",
    isCurrency: true
  }
];

const smartCategories = [
  { transaction: "AMZN MARKETPLACE", category: "Office Supplies", confidence: 95, auto: true },
  { transaction: "UBER RIDE", category: "Travel Expense", confidence: 89, auto: true },
  { transaction: "STARBUCKS #2847", category: "Meals & Entertainment", confidence: 92, auto: false },
  { transaction: "OFFICE DEPOT", category: "Office Supplies", confidence: 97, auto: true }
];

const riskAssessment = [
  { risk: "Late Payment Risk", level: "Low", score: 15, description: "3 customers with overdue payments" },
  { risk: "Cash Flow Risk", level: "Medium", score: 45, description: "Seasonal revenue variance" },
  { risk: "Compliance Risk", level: "Low", score: 22, description: "Missing 2 expense receipts" },
  { risk: "Fraud Risk", level: "Very Low", score: 8, description: "All transactions verified" }
];

export function AIFinancialInsights() {
  const { formatCurrency } = useGlobalization();
  
  // Convert raw predictions to formatted predictions
  const financialPredictions = financialPredictionsRaw.map(pred => ({
    ...pred,
    current: pred.isCurrency ? formatCurrency(pred.current as number) : pred.current,
    predicted: pred.isCurrency ? formatCurrency(pred.predicted as number) : pred.predicted
  }));
  const getTypeColor = (type: string) => {
    switch (type) {
      case "forecast": return "text-primary";
      case "anomaly": return "text-destructive";
      case "optimization": return "text-success";
      case "compliance": return "text-warning";
      default: return "text-muted-foreground";
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "critical": return "destructive" as const;
      case "high": return "destructive" as const;
      case "medium": return "outline" as const;
      case "low": return "secondary" as const;
      default: return "secondary" as const;
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Very Low": return "text-success";
      case "Low": return "text-success";
      case "Medium": return "text-warning";
      case "High": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Financial Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {aiInsights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-start gap-3">
                  <Icon className={`h-5 w-5 mt-0.5 ${getTypeColor(insight.type)}`} />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{insight.title}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant={getImpactBadge(insight.impact)}>
                          {insight.impact} impact
                        </Badge>
                        <Badge variant="outline" className="text-success">
                          {typeof insight.value === 'number' ? formatCurrency(insight.value) : insight.value}
                        </Badge>
                      </div>
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
                    <div className="flex items-center justify-between">
                      <div className="p-2 bg-muted rounded text-sm">
                        <strong>Recommended Action:</strong> {insight.action}
                      </div>
                      <Button size="sm" className="ml-2">
                        Act Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              AI Financial Predictions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {financialPredictions.map((prediction, index) => (
                <div key={index} className="p-3 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{prediction.metric}</h4>
                    <Badge variant="outline">{prediction.timeframe}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-muted-foreground">Current</div>
                      <div className="font-medium">{prediction.current}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Predicted</div>
                      <div className="font-medium text-success">{prediction.predicted}</div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span>Confidence</span>
                      <span>{prediction.confidence}%</span>
                    </div>
                    <Progress value={prediction.confidence} className="h-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Smart Transaction Categorization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {smartCategories.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{item.transaction}</div>
                    <div className="text-xs text-muted-foreground">{item.category}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={item.auto ? "default" : "outline"}>
                      {item.confidence}%
                    </Badge>
                    {item.auto && <Badge variant="secondary">Auto</Badge>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            AI Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {riskAssessment.map((risk, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{risk.risk}</h4>
                  <Badge variant="outline" className={getRiskColor(risk.level)}>
                    {risk.level}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{risk.description}</p>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>Risk Score</span>
                    <span>{risk.score}/100</span>
                  </div>
                  <Progress value={risk.score} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}