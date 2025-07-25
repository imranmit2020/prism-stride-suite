import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Receipt, TrendingUp, TrendingDown, DollarSign, ShoppingCart, Home } from "lucide-react";
import { useState } from "react";

export function PersonalExpenseAnalytics() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("6months");

  const monthlyExpenses = [
    { category: "Groceries", amount: 1247, budget: 1200, change: 3.9, trend: "up" },
    { category: "Transportation", amount: 456, budget: 500, change: -8.8, trend: "down" },
    { category: "Utilities", amount: 234, budget: 250, change: -6.4, trend: "down" },
    { category: "Entertainment", amount: 312, budget: 300, change: 4.0, trend: "up" },
    { category: "Shopping", amount: 789, budget: 600, change: 31.5, trend: "up" },
    { category: "Healthcare", amount: 156, budget: 200, change: -22.0, trend: "down" }
  ];

  const expenseInsights = [
    {
      title: "Highest Spending Day",
      value: "Saturdays",
      detail: "40% more than weekday average",
      icon: ShoppingCart
    },
    {
      title: "Most Expensive Category",
      value: "Groceries",
      detail: "$1,247 this month",
      icon: Receipt
    },
    {
      title: "Budget Variance",
      value: "+$203",
      detail: "8.9% over monthly budget",
      icon: TrendingUp
    },
    {
      title: "Savings Opportunity",
      value: "$189/month",
      detail: "From subscription optimization",
      icon: DollarSign
    }
  ];

  const spendingTrendsData = {
    "3months": [
      { month: "Jan", amount: 2234 },
      { month: "Feb", amount: 2456 },
      { month: "Mar", amount: 2189 }
    ],
    "6months": [
      { month: "Oct", amount: 2194 },
      { month: "Nov", amount: 2456 },
      { month: "Dec", amount: 2687 },
      { month: "Jan", amount: 2234 },
      { month: "Feb", amount: 2456 },
      { month: "Mar", amount: 2189 }
    ],
    "12months": [
      { month: "Apr", amount: 2089 },
      { month: "May", amount: 2234 },
      { month: "Jun", amount: 2456 },
      { month: "Jul", amount: 2187 },
      { month: "Aug", amount: 2334 },
      { month: "Sep", amount: 2445 },
      { month: "Oct", amount: 2194 },
      { month: "Nov", amount: 2456 },
      { month: "Dec", amount: 2687 },
      { month: "Jan", amount: 2234 },
      { month: "Feb", amount: 2456 },
      { month: "Mar", amount: 2189 }
    ]
  };

  const spendingTrends = spendingTrendsData[selectedTimeRange as keyof typeof spendingTrendsData];
  
  const getTimeRangeLabel = () => {
    switch (selectedTimeRange) {
      case "3months": return "3-Month";
      case "6months": return "6-Month";
      case "12months": return "12-Month";
      default: return "6-Month";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {expenseInsights.map((insight, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <insight.icon className="h-4 w-4 text-primary" />
                {insight.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{insight.value}</div>
              <div className="text-xs text-muted-foreground">{insight.detail}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Monthly Expense Breakdown
          </CardTitle>
          <CardDescription>
            Compare your spending against budgets and track trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyExpenses.map((expense, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{expense.category}</span>
                    <Badge variant={expense.trend === "up" ? "destructive" : "default"}>
                      {expense.trend === "up" ? "+" : ""}{expense.change.toFixed(1)}%
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${expense.amount.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">
                      Budget: ${expense.budget.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <Progress value={(expense.amount / expense.budget) * 100} className="h-2" />
                  {expense.amount > expense.budget && (
                    <div 
                      className="absolute top-0 h-2 bg-destructive rounded-full"
                      style={{ 
                        left: "100%", 
                        width: `${((expense.amount - expense.budget) / expense.budget) * 100}%`,
                        maxWidth: "50%"
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                {getTimeRangeLabel()} Spending Trend
              </CardTitle>
              <CardDescription>
                Track your total monthly expenses over time
              </CardDescription>
            </div>
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3months">3 Months</SelectItem>
                <SelectItem value="6months">6 Months</SelectItem>
                <SelectItem value="12months">12 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span>Average Monthly Spending:</span>
              <span className="font-medium">
                ${Math.round(spendingTrends.reduce((sum, trend) => sum + trend.amount, 0) / spendingTrends.length).toLocaleString()}
              </span>
            </div>
            <div className={`grid gap-2 ${spendingTrends.length <= 3 ? 'grid-cols-3' : spendingTrends.length <= 6 ? 'grid-cols-6' : 'grid-cols-12'}`}>
              {spendingTrends.map((trend, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="text-xs text-muted-foreground">{trend.month}</div>
                  <div 
                    className="bg-primary rounded w-full"
                    style={{ 
                      height: `${(trend.amount / Math.max(...spendingTrends.map(t => t.amount))) * 100}px`,
                      minHeight: "20px"
                    }}
                  />
                  <div className="text-xs font-medium">${(trend.amount / 1000).toFixed(1)}k</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            AI Expense Insights & Recommendations
          </CardTitle>
          <CardDescription>
            Personalized insights to optimize your spending
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="destructive">Alert</Badge>
                <span className="text-sm text-muted-foreground">Shopping Category</span>
              </div>
              <div>
                <h4 className="font-medium mb-2">Spending Spike Detected</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Your shopping expenses increased 31.5% this month, exceeding your budget by $189.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">
                    Recommendation: Review recent purchases and set spending alerts
                  </span>
                  <Button size="sm">Set Alert</Button>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="default">Opportunity</Badge>
                <span className="text-sm text-muted-foreground">Subscriptions</span>
              </div>
              <div>
                <h4 className="font-medium mb-2">Subscription Optimization</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  You have 7 active subscriptions totaling $189/month. 3 haven't been used in 30 days.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-600">
                    Potential Monthly Savings: $67
                  </span>
                  <Button size="sm" variant="outline">Review</Button>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">Pattern</Badge>
                <span className="text-sm text-muted-foreground">Grocery Shopping</span>
              </div>
              <div>
                <h4 className="font-medium mb-2">Optimal Shopping Days</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Shopping on Tuesdays saves you an average of 12% compared to weekend shopping.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-600">
                    Potential Annual Savings: $248
                  </span>
                  <Button size="sm" variant="outline">Set Reminder</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}