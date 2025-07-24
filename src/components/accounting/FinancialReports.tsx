import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, 
  Download, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Calendar,
  BarChart3,
  PieChart
} from "lucide-react";
import { useState } from "react";

const reportTypes = [
  { id: "profit_loss", name: "Profit & Loss Statement", description: "Revenue, expenses, and net income" },
  { id: "balance_sheet", name: "Balance Sheet", description: "Assets, liabilities, and equity" },
  { id: "cash_flow", name: "Cash Flow Statement", description: "Cash receipts and payments" },
  { id: "ar_aging", name: "Accounts Receivable Aging", description: "Outstanding customer invoices" },
  { id: "expense_report", name: "Expense Report", description: "Detailed expense breakdown" },
  { id: "tax_summary", name: "Tax Summary", description: "Tax-related income and deductions" }
];

const profitLossData = {
  revenue: {
    salesRevenue: 387420,
    serviceRevenue: 125800,
    other: 15200,
    total: 528420
  },
  expenses: {
    costOfGoods: 156800,
    salariesWages: 124500,
    rent: 8500,
    utilities: 3400,
    marketing: 12600,
    insurance: 2800,
    other: 18900,
    total: 327500
  },
  netIncome: 200920
};

const balanceSheetData = {
  assets: {
    cash: 89320,
    accountsReceivable: 37150,
    inventory: 25600,
    equipment: 45000,
    total: 197070
  },
  liabilities: {
    accountsPayable: 15200,
    accrued: 8500,
    loans: 35000,
    total: 58700
  },
  equity: {
    ownersEquity: 138370,
    total: 138370
  }
};

const monthlyTrends = [
  { month: "Oct", revenue: 298000, expenses: 245000, profit: 53000 },
  { month: "Nov", revenue: 345000, expenses: 278000, profit: 67000 },
  { month: "Dec", revenue: 412000, expenses: 298000, profit: 114000 },
  { month: "Jan", revenue: 528420, expenses: 327500, profit: 200920 }
];

export function FinancialReports() {
  const [selectedReport, setSelectedReport] = useState("profit_loss");
  const [selectedPeriod, setSelectedPeriod] = useState("current_month");

  const renderProfitLoss = () => (
    <div className="space-y-6">
      {/* Revenue Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-success">
            <TrendingUp className="h-5 w-5" />
            Revenue
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span>Sales Revenue</span>
            <span className="font-medium">${profitLossData.revenue.salesRevenue.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Service Revenue</span>
            <span className="font-medium">${profitLossData.revenue.serviceRevenue.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Other Income</span>
            <span className="font-medium">${profitLossData.revenue.other.toLocaleString()}</span>
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between font-bold text-lg">
              <span>Total Revenue</span>
              <span className="text-success">${profitLossData.revenue.total.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expenses Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <TrendingDown className="h-5 w-5" />
            Expenses
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span>Cost of Goods Sold</span>
            <span className="font-medium">${profitLossData.expenses.costOfGoods.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Salaries & Wages</span>
            <span className="font-medium">${profitLossData.expenses.salariesWages.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Rent</span>
            <span className="font-medium">${profitLossData.expenses.rent.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Utilities</span>
            <span className="font-medium">${profitLossData.expenses.utilities.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Marketing</span>
            <span className="font-medium">${profitLossData.expenses.marketing.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Insurance</span>
            <span className="font-medium">${profitLossData.expenses.insurance.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Other Expenses</span>
            <span className="font-medium">${profitLossData.expenses.other.toLocaleString()}</span>
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between font-bold text-lg">
              <span>Total Expenses</span>
              <span className="text-destructive">${profitLossData.expenses.total.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Net Income */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <DollarSign className="h-5 w-5" />
            Net Income
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center text-2xl font-bold">
            <span>Net Income</span>
            <span className="text-primary">${profitLossData.netIncome.toLocaleString()}</span>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            Profit Margin: {((profitLossData.netIncome / profitLossData.revenue.total) * 100).toFixed(1)}%
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBalanceSheet = () => (
    <div className="space-y-6">
      {/* Assets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Assets
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span>Cash & Cash Equivalents</span>
            <span className="font-medium">${balanceSheetData.assets.cash.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Accounts Receivable</span>
            <span className="font-medium">${balanceSheetData.assets.accountsReceivable.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Inventory</span>
            <span className="font-medium">${balanceSheetData.assets.inventory.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Equipment</span>
            <span className="font-medium">${balanceSheetData.assets.equipment.toLocaleString()}</span>
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between font-bold text-lg">
              <span>Total Assets</span>
              <span>${balanceSheetData.assets.total.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liabilities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5" />
            Liabilities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span>Accounts Payable</span>
            <span className="font-medium">${balanceSheetData.liabilities.accountsPayable.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Accrued Expenses</span>
            <span className="font-medium">${balanceSheetData.liabilities.accrued.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Long-term Loans</span>
            <span className="font-medium">${balanceSheetData.liabilities.loans.toLocaleString()}</span>
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between font-bold text-lg">
              <span>Total Liabilities</span>
              <span>${balanceSheetData.liabilities.total.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Equity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            Owner's Equity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between font-bold text-lg">
            <span>Total Equity</span>
            <span>${balanceSheetData.equity.total.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMonthlyTrends = () => (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Performance Trends</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {monthlyTrends.map((month) => (
          <div key={month.month} className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{month.month} 2024</h4>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-success">Rev: ${month.revenue.toLocaleString()}</span>
                <span className="text-destructive">Exp: ${month.expenses.toLocaleString()}</span>
                <span className="text-primary font-medium">Profit: ${month.profit.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const renderReportContent = () => {
    switch (selectedReport) {
      case "profit_loss":
        return renderProfitLoss();
      case "balance_sheet":
        return renderBalanceSheet();
      default:
        return (
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Report Coming Soon</h3>
              <p className="text-muted-foreground">
                This report type is currently under development.
              </p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Financial Reports
            </CardTitle>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <Select value={selectedReport} onValueChange={setSelectedReport}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((report) => (
                    <SelectItem key={report.id} value={report.id}>
                      <div>
                        <div className="font-medium">{report.name}</div>
                        <div className="text-xs text-muted-foreground">{report.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current_month">Current Month</SelectItem>
                <SelectItem value="last_month">Last Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
                <SelectItem value="custom">Custom Period</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      {/* Report Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {renderReportContent()}
        </div>
        
        <div className="space-y-6">
          {renderMonthlyTrends()}
          
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Key Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Gross Margin</span>
                <Badge variant="secondary">
                  {(((profitLossData.revenue.total - profitLossData.expenses.costOfGoods) / profitLossData.revenue.total) * 100).toFixed(1)}%
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Current Ratio</span>
                <Badge variant="secondary">
                  {(balanceSheetData.assets.total / balanceSheetData.liabilities.total).toFixed(2)}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Debt-to-Equity</span>
                <Badge variant="secondary">
                  {(balanceSheetData.liabilities.total / balanceSheetData.equity.total).toFixed(2)}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}