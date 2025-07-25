import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  PieChart,
  BarChart3,
  Calculator,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target
} from "lucide-react";

const financialMetrics = [
  {
    title: "Net Profit Margin",
    value: "18.7%",
    change: "+2.3%",
    trend: "up",
    target: "15%",
    status: "above",
    icon: Calculator
  },
  {
    title: "Cash Flow",
    value: "$234K",
    change: "+12%",
    trend: "up",
    target: "$200K",
    status: "above",
    icon: DollarSign
  },
  {
    title: "ROI",
    value: "24.3%",
    change: "+3.1%",
    trend: "up",
    target: "20%",
    status: "above",
    icon: TrendingUp
  },
  {
    title: "Debt-to-Equity",
    value: "0.35",
    change: "-0.05",
    trend: "up",
    target: "0.40",
    status: "good",
    icon: BarChart3
  }
];

const expenseCategories = [
  { category: "Cost of Goods Sold", amount: 425000, percentage: 45.2, budget: 450000, variance: -5.6 },
  { category: "Operating Expenses", amount: 187000, percentage: 19.9, budget: 180000, variance: 3.9 },
  { category: "Marketing & Sales", amount: 89000, percentage: 9.5, budget: 95000, variance: -6.3 },
  { category: "Salaries & Benefits", amount: 156000, percentage: 16.6, budget: 155000, variance: 0.6 },
  { category: "Technology & Software", amount: 34000, percentage: 3.6, budget: 35000, variance: -2.9 },
  { category: "Office & Facilities", amount: 28000, percentage: 3.0, budget: 30000, variance: -6.7 },
  { category: "Other", amount: 21000, percentage: 2.2, budget: 25000, variance: -16.0 }
];

const profitLossData = {
  revenue: {
    total: 1240000,
    breakdown: [
      { source: "Product Sales", amount: 890000, percentage: 71.8 },
      { source: "Services", amount: 235000, percentage: 18.9 },
      { source: "Subscriptions", amount: 87000, percentage: 7.0 },
      { source: "Other", amount: 28000, percentage: 2.3 }
    ]
  },
  expenses: {
    total: 940000,
    categories: expenseCategories
  },
  netProfit: 300000,
  profitMargin: 24.2
};

const cashFlowData = [
  { month: "Jan", operating: 45000, investing: -12000, financing: 8000, net: 41000 },
  { month: "Feb", operating: 52000, investing: -8000, financing: -5000, net: 39000 },
  { month: "Mar", operating: 48000, investing: -15000, financing: 12000, net: 45000 },
  { month: "Apr", operating: 61000, investing: -7000, financing: -8000, net: 46000 },
  { month: "May", operating: 58000, investing: -22000, financing: 15000, net: 51000 },
  { month: "Jun", operating: 67000, investing: -5000, financing: -12000, net: 50000 }
];

const budgetAnalysis = [
  { category: "Revenue", budget: 1200000, actual: 1240000, variance: 3.3, status: "above" },
  { category: "Gross Profit", budget: 720000, actual: 815000, variance: 13.2, status: "above" },
  { category: "Operating Expenses", budget: 180000, actual: 187000, variance: -3.9, status: "over" },
  { category: "EBITDA", budget: 480000, actual: 568000, variance: 18.3, status: "above" },
  { category: "Net Income", budget: 240000, actual: 300000, variance: 25.0, status: "above" }
];

const financialRatios = [
  { name: "Current Ratio", value: 2.34, benchmark: 2.0, status: "good" },
  { name: "Quick Ratio", value: 1.87, benchmark: 1.5, status: "good" },
  { name: "Inventory Turnover", value: 8.2, benchmark: 6.0, status: "excellent" },
  { name: "Receivables Turnover", value: 12.5, benchmark: 10.0, status: "good" },
  { name: "Gross Margin", value: 65.7, benchmark: 60.0, status: "excellent" },
  { name: "Operating Margin", value: 45.8, benchmark: 40.0, status: "excellent" }
];

export function FinancialAnalytics() {
  const [timeRange, setTimeRange] = useState("ytd");
  const [comparisonType, setComparisonType] = useState("yoy");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Financial Analytics</h2>
          <p className="text-muted-foreground">Comprehensive financial performance and insights</p>
        </div>
        <div className="flex gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="ytd">Year to Date</SelectItem>
              <SelectItem value="annual">Annual</SelectItem>
            </SelectContent>
          </Select>
          <Button>Generate Report</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="flex flex-wrap h-auto items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-full gap-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="profitloss">P&L</TabsTrigger>
          <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="ratios">Ratios</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Financial Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {financialMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <Card key={metric.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-2">{metric.value}</div>
                    <div className={`text-xs flex items-center mb-3 ${
                      metric.trend === "up" ? "text-success" : "text-destructive"
                    }`}>
                      {metric.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {metric.change} from last period
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">Target: {metric.target}</span>
                      {metric.status === "above" || metric.status === "good" ? (
                        <CheckCircle className="h-3 w-3 text-success" />
                      ) : (
                        <AlertTriangle className="h-3 w-3 text-warning" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Financial Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Revenue Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profitLossData.revenue.breakdown.map((item) => (
                    <div key={item.source} className="flex items-center justify-between">
                      <span className="text-sm">{item.source}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={item.percentage} className="w-20" />
                        <span className="text-sm font-medium w-16">
                          ${(item.amount / 1000).toFixed(0)}K
                        </span>
                        <span className="text-xs text-muted-foreground w-12">
                          {item.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Revenue</span>
                    <span className="text-xl font-bold">
                      ${(profitLossData.revenue.total / 1000).toFixed(0)}K
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expense Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expenseCategories.slice(0, 5).map((expense) => (
                    <div key={expense.category} className="flex items-center justify-between">
                      <span className="text-sm">{expense.category}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium w-16">
                          ${(expense.amount / 1000).toFixed(0)}K
                        </span>
                        <Badge variant={expense.variance < 0 ? "default" : "destructive"}>
                          {expense.variance > 0 ? "+" : ""}{expense.variance.toFixed(1)}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Expenses</span>
                    <span className="text-xl font-bold">
                      ${(profitLossData.expenses.total / 1000).toFixed(0)}K
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="profitloss" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profit & Loss Statement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4 p-4 bg-muted/20 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">
                      ${(profitLossData.revenue.total / 1000).toFixed(0)}K
                    </div>
                    <div className="text-sm text-muted-foreground">Total Revenue</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-destructive">
                      ${(profitLossData.expenses.total / 1000).toFixed(0)}K
                    </div>
                    <div className="text-sm text-muted-foreground">Total Expenses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      ${(profitLossData.netProfit / 1000).toFixed(0)}K
                    </div>
                    <div className="text-sm text-muted-foreground">Net Profit</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Revenue Sources</h3>
                  {profitLossData.revenue.breakdown.map((item) => (
                    <div key={item.source} className="flex justify-between items-center p-3 border rounded-lg">
                      <span>{item.source}</span>
                      <div className="text-right">
                        <div className="font-medium">${item.amount.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">{item.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Expense Categories</h3>
                  {expenseCategories.map((expense) => (
                    <div key={expense.category} className="flex justify-between items-center p-3 border rounded-lg">
                      <span>{expense.category}</span>
                      <div className="text-right">
                        <div className="font-medium">${expense.amount.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">
                          {expense.percentage}% • Budget: ${expense.budget.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cashflow" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Cash Flow Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cashFlowData.map((month) => (
                  <div key={month.month} className="grid grid-cols-5 gap-4 p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{month.month}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-success font-medium">
                        ${(month.operating / 1000).toFixed(0)}K
                      </div>
                      <div className="text-xs text-muted-foreground">Operating</div>
                    </div>
                    <div className="text-center">
                      <div className={`font-medium ${month.investing < 0 ? "text-destructive" : "text-success"}`}>
                        ${(month.investing / 1000).toFixed(0)}K
                      </div>
                      <div className="text-xs text-muted-foreground">Investing</div>
                    </div>
                    <div className="text-center">
                      <div className={`font-medium ${month.financing < 0 ? "text-destructive" : "text-success"}`}>
                        ${(month.financing / 1000).toFixed(0)}K
                      </div>
                      <div className="text-xs text-muted-foreground">Financing</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg">
                        ${(month.net / 1000).toFixed(0)}K
                      </div>
                      <div className="text-xs text-muted-foreground">Net</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Budget vs Actual Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {budgetAnalysis.map((item) => (
                  <div key={item.category} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{item.category}</h3>
                      <Badge variant={
                        item.status === "above" ? "default" : 
                        item.status === "over" ? "destructive" : "secondary"
                      }>
                        {item.variance > 0 ? "+" : ""}{item.variance.toFixed(1)}%
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Budget</div>
                        <div className="font-medium">${item.budget.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Actual</div>
                        <div className="font-medium">${item.actual.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ratios" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Ratios & Benchmarks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {financialRatios.map((ratio) => (
                  <div key={ratio.name} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{ratio.name}</h3>
                      <Badge variant={
                        ratio.status === "excellent" ? "default" :
                        ratio.status === "good" ? "secondary" : "destructive"
                      }>
                        {ratio.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Current</span>
                        <span className="font-bold">{ratio.value}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Benchmark</span>
                        <span>{ratio.benchmark}</span>
                      </div>
                      <Progress 
                        value={Math.min((ratio.value / ratio.benchmark) * 100, 100)} 
                        className="h-2" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}