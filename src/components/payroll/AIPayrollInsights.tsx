import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Brain, Users, TrendingUp, AlertTriangle, Calendar, DollarSign } from "lucide-react";

const aiInsights = [
  {
    type: "scheduling",
    title: "Optimal Staffing Prediction",
    description: "Thursday lunch needs +2 staff based on historical data",
    confidence: 89,
    impact: "high",
    value: "15% efficiency gain",
    action: "Schedule Sarah & Mike",
    icon: Calendar
  },
  {
    type: "performance",
    title: "Performance Anomaly Detected",
    description: "John's productivity down 23% - may need support",
    confidence: 76,
    impact: "medium",
    value: "Prevent turnover",
    action: "Schedule check-in",
    icon: TrendingUp
  },
  {
    type: "cost",
    title: "Overtime Cost Alert",
    description: "Current schedule will exceed overtime budget by $340",
    confidence: 94,
    impact: "high",
    value: "Save $340",
    action: "Redistribute shifts",
    icon: DollarSign
  },
  {
    type: "compliance",
    title: "Labor Law Compliance",
    description: "Emma approaching weekly hour limit",
    confidence: 100,
    impact: "critical",
    value: "Avoid penalties",
    action: "Adjust schedule",
    icon: AlertTriangle
  }
];

const performanceMetrics = [
  { name: "Sarah Johnson", role: "Barista", score: 94, trend: "up", hours: 32, efficiency: 112 },
  { name: "Mike Chen", role: "Cashier", score: 87, trend: "stable", hours: 28, efficiency: 98 },
  { name: "Emma Davis", role: "Manager", score: 91, trend: "up", hours: 38, efficiency: 105 },
  { name: "John Smith", role: "Barista", score: 72, trend: "down", hours: 35, efficiency: 85 }
];

const predictiveAnalytics = [
  { metric: "Turnover Risk", value: "12%", change: "-3%", status: "improving" },
  { metric: "Optimal Team Size", value: "8 staff", change: "+1", status: "expanding" },
  { metric: "Training ROI", value: "$4.2k", change: "+18%", status: "positive" },
  { metric: "Schedule Efficiency", value: "92%", change: "+5%", status: "optimized" }
];

export function AIPayrollInsights() {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "scheduling": return "text-primary";
      case "performance": return "text-secondary";
      case "cost": return "text-warning";
      case "compliance": return "text-destructive";
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

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? "📈" : trend === "down" ? "📉" : "➡️";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Payroll Intelligence
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
                          {insight.value}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              AI Performance Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceMetrics.map((employee, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-sm">{employee.name}</h4>
                      <span className="text-xs">{getTrendIcon(employee.trend)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{employee.role}</p>
                    <div className="flex items-center gap-4 text-xs">
                      <span>{employee.hours}h/week</span>
                      <span>{employee.efficiency}% efficiency</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{employee.score}</div>
                    <div className="text-xs text-muted-foreground">AI Score</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Predictive Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {predictiveAnalytics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium text-sm">{metric.metric}</h4>
                    <p className="text-xs text-muted-foreground">{metric.status}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{metric.value}</div>
                    <div className="text-xs text-success">{metric.change}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}