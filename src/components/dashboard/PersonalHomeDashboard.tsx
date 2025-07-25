import { 
  Home, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Package,
  Receipt,
  PiggyBank,
  ShoppingCart,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Plus,
  Eye
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const homeFinanceStats = [
  {
    title: "Monthly Expenses",
    value: "$2,347",
    target: "$2,800",
    change: "-8.2%",
    changeType: "decrease" as const,
    icon: Receipt,
    description: "vs last month",
    color: "text-red-600",
    bgColor: "bg-red-50",
    note: "Saved money on groceries!",
    progress: 84
  },
  {
    title: "Household Income",
    value: "$5,850",
    target: "$5,500",
    change: "+6.4%",
    changeType: "increase" as const,
    icon: DollarSign,
    description: "vs last month",
    color: "text-green-600", 
    bgColor: "bg-green-50",
    note: "Bonus from side work",
    progress: 106
  },
  {
    title: "Emergency Fund",
    value: "$8,450",
    target: "$10,000",
    change: "+12.3%",
    changeType: "increase" as const,
    icon: PiggyBank,
    description: "towards goal",
    color: "text-blue-600",
    bgColor: "bg-blue-50", 
    note: "Almost there!",
    progress: 85
  }
];

const inventoryItems = [
  { item: "Milk", category: "Dairy", status: "low", expires: "Tomorrow", icon: ShoppingCart },
  { item: "Bread", category: "Bakery", status: "out", expires: "Today", icon: AlertTriangle },
  { item: "Chicken", category: "Meat", status: "good", expires: "Mar 25", icon: CheckCircle },
  { item: "Apples", category: "Produce", status: "low", expires: "Mar 22", icon: ShoppingCart }
];

const recentExpenses = [
  { description: "Grocery Store", amount: "$127.85", category: "Food", date: "Today" },
  { description: "Gas Station", amount: "$45.20", category: "Transport", date: "Yesterday" },
  { description: "Electric Bill", amount: "$89.45", category: "Utilities", date: "Mar 15" },
  { description: "Pharmacy", amount: "$23.67", category: "Health", date: "Mar 14" }
];

const quickActions = [
  { title: "Add Expense", icon: Receipt },
  { title: "Log Income", icon: DollarSign },
  { title: "Check Inventory", icon: Package },
  { title: "Shopping List", icon: ShoppingCart }
];

export function PersonalHomeDashboard() {
  return (
    <div className="space-y-6">
      {/* Personal Finance Header */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-xl">
                <Home className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-xl text-blue-800">Personal Finance Manager</CardTitle>
                <p className="text-sm text-blue-600">Track your household expenses, income & inventory</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-700 border-green-200">
              <CheckCircle className="h-3 w-3 mr-1" />
              Up to date
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Financial Overview */}
      <div className="grid gap-6 md:grid-cols-3">
        {homeFinanceStats.map((stat, index) => {
          const Icon = stat.icon;
          const isIncrease = stat.changeType === "increase";
          const TrendIcon = isIncrease ? TrendingUp : TrendingDown;
          
          return (
            <Card key={stat.title} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-xl ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="text-2xl font-bold">{stat.value}</div>
                
                <div className="flex items-center gap-2 text-sm">
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${
                    isIncrease 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    <TrendIcon className="h-3 w-3" />
                    <span className="font-medium">{stat.change}</span>
                  </div>
                  <span className="text-muted-foreground">{stat.description}</span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Target: {stat.target}</span>
                    <span>{stat.progress}%</span>
                  </div>
                  <Progress value={stat.progress} className="h-2" />
                </div>

                <div className="text-xs text-blue-600 italic">{stat.note}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-green-600" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickActions.map((action, index) => (
              <Button
                key={action.title}
                variant="outline"
                className="h-16 flex flex-col items-center gap-1"
              >
                <action.icon className="h-5 w-5" />
                <span className="text-xs">{action.title}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Inventory & Expenses */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Household Inventory Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-orange-600" />
              Household Inventory
              <Badge variant="outline" className="ml-auto">
                <AlertTriangle className="h-3 w-3 mr-1 text-orange-500" />
                2 items low
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {inventoryItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-full ${
                      item.status === 'out' ? 'bg-red-100 text-red-600' :
                      item.status === 'low' ? 'bg-orange-100 text-orange-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      <item.icon className="h-3 w-3" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{item.item}</div>
                      <div className="text-xs text-muted-foreground">{item.category}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={
                      item.status === 'out' ? 'destructive' :
                      item.status === 'low' ? 'secondary' : 'outline'
                    } className="text-xs">
                      {item.status}
                    </Badge>
                    <div className="text-xs text-muted-foreground mt-1">{item.expires}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Expenses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5 text-purple-600" />
              Recent Expenses
              <Button variant="ghost" size="sm" className="ml-auto">
                <Eye className="h-4 w-4 mr-1" />
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentExpenses.map((expense, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                  <div>
                    <div className="font-medium text-sm">{expense.description}</div>
                    <div className="text-xs text-muted-foreground">{expense.category} • {expense.date}</div>
                  </div>
                  <div className="font-semibold text-red-600">{expense.amount}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}