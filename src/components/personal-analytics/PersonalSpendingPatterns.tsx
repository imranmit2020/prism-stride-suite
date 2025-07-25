import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, TrendingUp, ShoppingCart } from "lucide-react";

export function PersonalSpendingPatterns() {
  const spendingPatterns = [
    { pattern: "Weekend Splurging", frequency: "Every weekend", impact: "+32% spending", advice: "Set weekend budgets" },
    { pattern: "Impulse Online Shopping", frequency: "Late evenings", impact: "+$245/month", advice: "Use 24-hour rule" },
    { pattern: "Grocery Price Sensitivity", frequency: "Variable", impact: "12% savings potential", advice: "Shop on Tuesdays" },
    { pattern: "Subscription Accumulation", frequency: "Monthly", impact: "$67 unused/month", advice: "Regular subscription audit" }
  ];

  const timeBasedSpending = [
    { time: "Monday", amount: 45, category: "Transport" },
    { time: "Tuesday", amount: 67, category: "Groceries" },
    { time: "Wednesday", amount: 23, category: "Lunch" },
    { time: "Thursday", amount: 89, category: "Shopping" },
    { time: "Friday", amount: 156, category: "Entertainment" },
    { time: "Saturday", amount: 234, category: "Shopping" },
    { time: "Sunday", amount: 78, category: "Dining" }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-primary" />
              Peak Spending Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">8-10 PM</div>
            <div className="text-xs text-muted-foreground">Online shopping hours</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-green-500" />
              Highest Spend Day
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">Saturday</div>
            <div className="text-xs text-muted-foreground">$234 average</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              Impulse Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">23%</div>
            <div className="text-xs text-muted-foreground">Of total spending</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <ShoppingCart className="h-4 w-4 text-purple-500" />
              Patterns Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">12</div>
            <div className="text-xs text-muted-foreground">Behavioral patterns</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Spending Pattern</CardTitle>
          <CardDescription>How your spending varies throughout the week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timeBasedSpending.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center gap-3">
                  <span className="font-medium w-20">{day.time}</span>
                  <Badge variant="outline">{day.category}</Badge>
                </div>
                <div className="font-medium">${day.amount}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Identified Spending Patterns</CardTitle>
          <CardDescription>AI-discovered patterns in your spending behavior</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {spendingPatterns.map((pattern, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{pattern.pattern}</h3>
                  <Badge variant="secondary">{pattern.frequency}</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-red-600">Impact: </span>
                    <span className="text-sm">{pattern.impact}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-green-600">Advice: </span>
                    <span className="text-sm">{pattern.advice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}