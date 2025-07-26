import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { usePersonalFinance } from "@/hooks/usePersonalFinance";

export function PersonalBudgetAnalytics() {
  const { loading, getBudgetStats } = usePersonalFinance();
  const budgetStats = getBudgetStats();
  
  const budgetCategories = budgetStats.budgetCategories;

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
            <div className="text-2xl font-bold text-primary">{loading ? "..." : `$${budgetStats.totalBudget.toLocaleString()}`}</div>
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
            <div className="text-2xl font-bold text-green-500">{loading ? "..." : `$${budgetStats.totalSpent.toLocaleString()}`}</div>
            <div className="text-xs text-muted-foreground">{loading ? "..." : `${Math.round((budgetStats.totalSpent / budgetStats.totalBudget) * 100)}% of budget`}</div>
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
            <div className="text-2xl font-bold text-blue-500">{loading ? "..." : `$${budgetStats.remaining.toLocaleString()}`}</div>
            <div className="text-xs text-muted-foreground">{loading ? "..." : `${Math.round((budgetStats.remaining / budgetStats.totalBudget) * 100)}% left for month`}</div>
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
            <div className="text-2xl font-bold text-red-500">{loading ? "..." : budgetStats.overBudgetCount}</div>
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
            {loading ? (
              <div className="text-center text-muted-foreground">Loading budget data...</div>
            ) : budgetCategories.length === 0 ? (
              <div className="text-center text-muted-foreground">No budget data found. Start by creating some budgets to track.</div>
            ) : (
              budgetCategories.map((category, index) => (
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
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}