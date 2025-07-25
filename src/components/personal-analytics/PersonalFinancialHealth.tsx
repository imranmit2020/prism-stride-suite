import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, Shield, TrendingUp, AlertTriangle } from "lucide-react";

export function PersonalFinancialHealth() {
  const healthMetrics = [
    { metric: "Emergency Fund", current: 8500, target: 10000, score: 85 },
    { metric: "Debt-to-Income", current: 25, target: 30, score: 92 },
    { metric: "Savings Rate", current: 18, target: 20, score: 90 },
    { metric: "Credit Score", current: 748, target: 750, score: 95 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Heart className="h-4 w-4 text-primary" />
              Health Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">88/100</div>
            <div className="text-xs text-muted-foreground">Excellent</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4 text-green-500" />
              Emergency Fund
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">$8,500</div>
            <div className="text-xs text-muted-foreground">5.1 months coverage</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              Savings Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">18%</div>
            <div className="text-xs text-muted-foreground">Of gross income</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              Debt Ratio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">25%</div>
            <div className="text-xs text-muted-foreground">Debt-to-income</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Financial Health Metrics</CardTitle>
          <CardDescription>Track your overall financial wellness</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {healthMetrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{metric.metric}</span>
                  <div className="text-right">
                    <div className="font-medium">Score: {metric.score}/100</div>
                  </div>
                </div>
                <Progress value={metric.score} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  Current: {metric.current} | Target: {metric.target}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}