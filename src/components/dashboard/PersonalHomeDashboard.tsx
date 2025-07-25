import { 
  Home, 
  DollarSign, 
  TrendingUp,
  TrendingDown,
  Target,
  Activity,
  Brain,
  Sparkles,
  PiggyBank,
  Receipt,
  Calendar,
  Bell,
  Zap,
  CheckCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const personalStats = [
  {
    title: "Monthly Budget",
    value: "$2,847",
    remaining: "$1,153 left",
    change: "+5.2%",
    changeType: "increase" as const,
    icon: PiggyBank,
    description: "spent this month",
    gradient: "from-green-500/10 to-emerald-500/10",
    iconColor: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    aiInsight: "On track with spending",
    progress: 71
  },
  {
    title: "Savings Goal",
    value: "$8,450",
    remaining: "$1,550 to go",
    change: "+12.3%",
    changeType: "increase" as const,
    icon: Target,
    description: "Emergency fund",
    gradient: "from-blue-500/10 to-indigo-500/10",
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    aiInsight: "3 months ahead of schedule",
    progress: 84
  },
  {
    title: "Monthly Income",
    value: "$5,995",
    remaining: "+$245 vs last month",
    change: "+8.1%",
    changeType: "increase" as const,
    icon: TrendingUp,
    description: "total income",
    gradient: "from-purple-500/10 to-violet-500/10",
    iconColor: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    aiInsight: "Income trend is positive",
    progress: 95
  }
];

const upcomingItems = [
  { title: "Rent Payment", date: "Tomorrow", type: "bill", amount: "$1,200" },
  { title: "Grocery Shopping", date: "Thursday", type: "task", amount: "~$150" },
  { title: "Emergency Fund Goal", date: "Mar 15", type: "goal", amount: "$10,000" }
];

const quickActions = [
  { title: "Add Expense", icon: Receipt },
  { title: "Log Income", icon: DollarSign },
  { title: "Set Reminder", icon: Bell },
  { title: "Review Budget", icon: Target }
];

export function PersonalHomeDashboard() {
  return (
    <div className="space-y-6">
      {/* AI Personal Assistant Header */}
      <Card className="border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">Personal Home Manager</CardTitle>
                <p className="text-sm text-muted-foreground">AI-powered financial & household assistant</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-700 border-green-200">
              <Activity className="h-3 w-3 mr-1" />
              Active
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Personal Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {personalStats.map((stat, index) => {
          const Icon = stat.icon;
          const isIncrease = stat.changeType === "increase";
          const TrendIcon = isIncrease ? TrendingUp : TrendingDown;
          
          return (
            <Card key={stat.title} className="relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-50`} />
              
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-xl ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.iconColor}`} />
                </div>
              </CardHeader>
              <CardContent className="relative space-y-3">
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                
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

                {stat.progress && (
                  <div className="space-y-1">
                    <Progress value={stat.progress} className="h-2" />
                    <div className="text-xs text-muted-foreground">{stat.remaining}</div>
                  </div>
                )}

                <div className="text-xs text-blue-600">{stat.aiInsight}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
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

      {/* Upcoming Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    item.type === 'bill' ? 'bg-red-100 text-red-600' :
                    item.type === 'task' ? 'bg-blue-100 text-blue-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {item.type === 'bill' ? <Receipt className="h-4 w-4" /> :
                     item.type === 'task' ? <CheckCircle className="h-4 w-4" /> :
                     <Target className="h-4 w-4" />}
                  </div>
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                  </div>
                </div>
                <div className="font-medium">{item.amount}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}