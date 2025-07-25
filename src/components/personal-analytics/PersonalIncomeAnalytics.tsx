import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, Calendar, Target } from "lucide-react";

export function PersonalIncomeAnalytics() {
  const incomeStreams = [
    { source: "Primary Job", amount: 4500, type: "Monthly", percentage: 85 },
    { source: "Freelancing", amount: 650, type: "Variable", percentage: 12 },
    { source: "Investments", amount: 150, type: "Monthly", percentage: 3 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <DollarSign className="h-4 w-4 text-primary" />
              Monthly Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">$5,300</div>
            <div className="text-xs text-muted-foreground">Average this year</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500" />
              YoY Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">+12.5%</div>
            <div className="text-xs text-muted-foreground">Compared to last year</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-blue-500" />
              Best Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">March</div>
            <div className="text-xs text-muted-foreground">$6,200 earned</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Target className="h-4 w-4 text-purple-500" />
              Goal Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">78%</div>
            <div className="text-xs text-muted-foreground">Of annual target</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Income Sources Breakdown</CardTitle>
          <CardDescription>Analyze your income diversification and trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {incomeStreams.map((stream, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded">
                <div>
                  <h4 className="font-medium">{stream.source}</h4>
                  <p className="text-sm text-muted-foreground">{stream.type}</p>
                </div>
                <div className="text-right">
                  <div className="font-medium">${stream.amount.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">{stream.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}