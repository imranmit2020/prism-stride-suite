import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  FileText,
  Receipt,
  CreditCard,
  PiggyBank,
  AlertTriangle
} from "lucide-react";

const financialStats = [
  {
    title: "Total Revenue",
    value: "$387,420",
    change: "+15.2%",
    trend: "up",
    icon: DollarSign,
    description: "this month",
    color: "text-success"
  },
  {
    title: "Total Expenses",
    value: "$142,680",
    change: "+8.1%",
    trend: "up",
    icon: Receipt,
    description: "this month",
    color: "text-destructive"
  },
  {
    title: "Net Profit",
    value: "$244,740",
    change: "+22.3%",
    trend: "up",
    icon: TrendingUp,
    description: "this month",
    color: "text-success"
  },
  {
    title: "Cash Flow",
    value: "$89,320",
    change: "-5.2%",
    trend: "down",
    icon: PiggyBank,
    description: "available",
    color: "text-primary"
  }
];

const monthlyData = [
  { month: "Jan", revenue: 320000, expenses: 125000, profit: 195000 },
  { month: "Feb", revenue: 345000, expenses: 130000, profit: 215000 },
  { month: "Mar", revenue: 387420, expenses: 142680, profit: 244740 },
];

const accountsReceivable = [
  {
    customer: "Acme Corp",
    invoiceNumber: "INV-2024-001",
    amount: 15750,
    dueDate: "2024-02-15",
    status: "overdue",
    daysPastDue: 5
  },
  {
    customer: "TechStart Inc",
    invoiceNumber: "INV-2024-002", 
    amount: 8900,
    dueDate: "2024-02-20",
    status: "pending",
    daysPastDue: 0
  },
  {
    customer: "Global Solutions",
    invoiceNumber: "INV-2024-003",
    amount: 12500,
    dueDate: "2024-02-25",
    status: "pending",
    daysPastDue: 0
  }
];

const recentTransactions = [
  {
    id: "TXN-001",
    description: "Office Supplies Purchase", 
    amount: -450.00,
    type: "expense",
    category: "Office Expenses",
    date: "2024-01-30",
    account: "Business Checking"
  },
  {
    id: "TXN-002",
    description: "Client Payment - Acme Corp",
    amount: 5200.00,
    type: "income",
    category: "Sales Revenue", 
    date: "2024-01-30",
    account: "Business Checking"
  },
  {
    id: "TXN-003",
    description: "Utility Bill Payment",
    amount: -340.00,
    type: "expense", 
    category: "Utilities",
    date: "2024-01-29",
    account: "Business Checking"
  }
];

export function AccountingOverview() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>;
      case "pending":
        return <Badge variant="outline" className="border-warning text-warning">Pending</Badge>;
      case "paid":
        return <Badge variant="secondary" className="bg-success text-success-foreground">Paid</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getTransactionIcon = (type: string) => {
    return type === "income" ? 
      <TrendingUp className="h-4 w-4 text-success" /> : 
      <TrendingDown className="h-4 w-4 text-destructive" />;
  };

  const totalReceivable = accountsReceivable.reduce((sum, ar) => sum + ar.amount, 0);

  return (
    <div className="space-y-6">
      {/* Financial Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {financialStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="mt-2">
                  <span className={`text-xs font-medium ${
                    stat.trend === "up" ? "text-success" : "text-destructive"
                  }`}>
                    {stat.change} from last month
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Accounts Receivable */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Accounts Receivable
              </span>
              <span className="text-lg font-bold">${totalReceivable.toLocaleString()}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {accountsReceivable.map((ar) => (
              <div key={ar.invoiceNumber} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{ar.customer}</h4>
                    {getStatusBadge(ar.status)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {ar.invoiceNumber} • Due: {new Date(ar.dueDate).toLocaleDateString()}
                  </div>
                  {ar.status === "overdue" && (
                    <div className="flex items-center gap-1 text-xs text-destructive">
                      <AlertTriangle className="h-3 w-3" />
                      {ar.daysPastDue} days overdue
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">${ar.amount.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getTransactionIcon(transaction.type)}
                  <div className="space-y-1">
                    <h4 className="font-medium">{transaction.description}</h4>
                    <div className="text-sm text-muted-foreground">
                      {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {transaction.account}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold text-lg ${
                    transaction.amount > 0 ? "text-success" : "text-destructive"
                  }`}>
                    {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Monthly Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Financial Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {monthlyData.map((month) => {
              const profitMargin = (month.profit / month.revenue) * 100;
              return (
                <div key={month.month} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{month.month} 2024</h4>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-success">Revenue: ${month.revenue.toLocaleString()}</span>
                      <span className="text-destructive">Expenses: ${month.expenses.toLocaleString()}</span>
                      <span className="text-primary font-medium">Profit: ${month.profit.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Profit Margin</span>
                      <span>{profitMargin.toFixed(1)}%</span>
                    </div>
                    <Progress value={profitMargin} className="h-2" />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}