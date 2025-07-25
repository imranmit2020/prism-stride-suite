import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, DollarSign, TrendingUp, AlertCircle } from "lucide-react";

export function PersonalBudgetAnalytics() {
  const budgetCategories = [
    { name: "Housing", budget: 1500, spent: 1500, percentage: 100 },
    { name: "Food", budget: 800, spent: 687, percentage: 86 },
    { name: "Transportation", budget: 400, spent: 345, percentage: 86 },
    { name: "Entertainment", budget: 300, spent: 412, percentage: 137 },
    { name: "Savings", budget: 500, spent: 350, percentage: 70 },
    { name: "Miscellaneous", budget: 200, spent: 156, percentage: 78 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Target className="h-4 w-4 text-primary" />
              Monthly Budget
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">$3,700</div>
            <div className="text-xs text-muted-foreground">Total allocated</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <DollarSign className="h-4 w-4 text-green-500" />
              Total Spent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">$3,450</div>
            <div className="text-xs text-muted-foreground">93% of budget</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              Remaining
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">$250</div>
            <div className="text-xs text-muted-foreground">7% left for month</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <AlertCircle className="h-4 w-4 text-red-500" />
              Over Budget
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">1</div>
            <div className="text-xs text-muted-foreground">Category exceeded</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Budget vs Actual Spending</CardTitle>
          <CardDescription>Track your spending against planned budgets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {budgetCategories.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{category.name}</span>
                  <div className="text-right">
                    <div className="font-medium">
                      ${category.spent} / ${category.budget}
                    </div>
                    <div className={`text-xs ${category.percentage > 100 ? 'text-red-500' : 'text-muted-foreground'}`}>
                      {category.percentage}%
                    </div>
                  </div>
                </div>
                <Progress 
                  value={Math.min(category.percentage, 100)} 
                  className={`h-2 ${category.percentage > 100 ? 'bg-red-100' : ''}`}
                />
                {category.percentage > 100 && (
                  <div className="text-xs text-red-500">
                    Over budget by ${category.spent - category.budget}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}