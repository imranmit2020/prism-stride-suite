import { 
  Home, 
  DollarSign, 
  TrendingUp,
  TrendingDown,
  Calendar,
  Target,
  Activity,
  Brain,
  Sparkles,
  PiggyBank,
  Receipt,
  AlertCircle,
  CheckCircle,
  Clock,
  ShoppingCart,
  Lightbulb,
  Heart,
  Zap,
  Eye,
  Bell,
  Users
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const personalStats = [
  {
    title: "Monthly Budget Status",
    value: "$2,847",
    remaining: "$1,153",
    change: "+5.2%",
    changeType: "increase" as const,
    icon: PiggyBank,
    description: "spent this month",
    gradient: "from-green-500/10 to-emerald-500/10",
    iconColor: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    prediction: "On track for goals",
    aiInsight: "Spending pattern is healthy",
    progress: 71
  },
  {
    title: "Savings Goals",
    value: "$8,450",
    remaining: "$1,550",
    change: "+12.3%",
    changeType: "increase" as const,
    icon: Target,
    description: "saved this year",
    gradient: "from-blue-500/10 to-indigo-500/10",
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    prediction: "Goal in 3 months",
    aiInsight: "Ahead of schedule",
    progress: 84
  },
  {
    title: "Monthly Income",
    value: "$5,995",
    remaining: "+$245",
    change: "+8.1%",
    changeType: "increase" as const,
    icon: TrendingUp,
    description: "total income",
    gradient: "from-purple-500/10 to-violet-500/10",
    iconColor: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    prediction: "Income growing",
    aiInsight: "Side income increasing",
    progress: 95
  },
  {
    title: "Household Tasks",
    value: "12",
    remaining: "3 overdue",
    change: "-2",
    changeType: "decrease" as const,
    icon: CheckCircle,
    description: "completed this week",
    gradient: "from-orange-500/10 to-red-500/10",
    iconColor: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    prediction: "Productivity up",
    aiInsight: "Routine optimization needed",
    progress: 80
  },
];

const upcomingEvents = [
  { title: "Rent Payment", date: "Tomorrow", type: "bill", amount: "$1,200", priority: "high" },
  { title: "Grocery Shopping", date: "Thursday", type: "task", amount: "~$150", priority: "medium" },
  { title: "Emergency Fund Goal", date: "Mar 15", type: "goal", amount: "$10,000", priority: "low" },
  { title: "Insurance Renewal", date: "Mar 20", type: "bill", amount: "$89", priority: "medium" }
];

const aiInsights = [
  {
    type: "savings",
    title: "Smart Savings Opportunity",
    description: "AI detected you can save $180/month by switching to a high-yield savings account",
    action: "View Options",
    confidence: "96%",
    color: "emerald"
  },
  {
    type: "spending",
    title: "Spending Pattern Alert",
    description: "Your dining out expenses increased 23% this month. Consider meal planning",
    action: "See Budget",
    confidence: "89%",
    color: "orange"
  },
  {
    type: "goals",
    title: "Goal Achievement Prediction",
    description: "You're on track to reach your vacation fund 2 months early with current savings rate",
    action: "Adjust Goal",
    confidence: "92%",
    color: "blue"
  }
];

const quickActions = [
  { title: "Add Expense", icon: Receipt, color: "bg-red-100 text-red-700" },
  { title: "Log Income", icon: DollarSign, color: "bg-green-100 text-green-700" },
  { title: "Set Reminder", icon: Bell, color: "bg-blue-100 text-blue-700" },
  { title: "Review Budget", icon: Target, color: "bg-purple-100 text-purple-700" }
];

export function PersonalHomeDashboard() {
  return (
    <div className="space-y-8">
      {/* AI Personal Assistant Header */}
      <Card className="card-gradient border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">AI Home Assistant</CardTitle>
                <p className="text-sm text-muted-foreground">Your personal financial & household AI</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                <Activity className="h-3 w-3 mr-1 animate-pulse" />
                AI Active
              </Badge>
              <Badge variant="outline">Personal Mode</Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Personal Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {personalStats.map((stat, index) => {
          const Icon = stat.icon;
          const isIncrease = stat.changeType === "increase";
          const TrendIcon = isIncrease ? TrendingUp : TrendingDown;
          
          return (
            <Card 
              key={stat.title} 
              className="card-enhanced group hover:shadow-primary/10 relative overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-50`} />
              
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2.5 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-200 shadow-sm`}>
                  <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                </div>
              </CardHeader>
              
              <CardContent className="relative space-y-4">
                {/* Main Value */}
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                    {stat.value}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full ${
                      isIncrease 
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      <TrendIcon className="h-3 w-3" />
                      <span className="font-medium">{stat.change}</span>
                    </div>
                    <span className="text-muted-foreground">{stat.description}</span>
                  </div>
                </div>

                {/* Progress Bar for Goals */}
                {stat.progress && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{stat.progress}%</span>
                    </div>
                    <Progress value={stat.progress} className="h-2" />
                    <div className="text-xs text-muted-foreground">{stat.remaining}</div>
                  </div>
                )}

                {/* AI Prediction Section */}
                <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200/50 dark:border-blue-800/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-3 w-3 text-blue-600" />
                    <span className="text-xs font-semibold text-blue-800 dark:text-blue-300">AI Insight</span>
                  </div>
                  <div className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-1">
                    {stat.prediction}
                  </div>
                  <div className="text-xs text-blue-600 dark:text-blue-400">
                    {stat.aiInsight}
                  </div>
                </div>
              </CardContent>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </Card>
          );
        })}
      </div>

      {/* Quick Actions Row */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-600" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={action.title}
                variant="outline"
                className="h-20 flex flex-col items-center gap-2 hover:shadow-md transition-shadow"
              >
                <action.icon className={`h-6 w-6 ${action.color.split(' ')[1]}`} />
                <span className="text-sm font-medium">{action.title}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      event.type === 'bill' ? 'bg-red-100 text-red-600' :
                      event.type === 'task' ? 'bg-blue-100 text-blue-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {event.type === 'bill' ? <Receipt className="h-4 w-4" /> :
                       event.type === 'task' ? <Clock className="h-4 w-4" /> :
                       <Target className="h-4 w-4" />}
                    </div>
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{event.amount}</div>
                    <Badge variant={
                      event.priority === 'high' ? 'destructive' :
                      event.priority === 'medium' ? 'default' : 'outline'
                    } className="text-xs">
                      {event.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Insights Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-purple-600" />
              AI Personal Insights
              <Badge variant="outline" className="ml-auto">
                <Activity className="h-3 w-3 mr-1 animate-pulse" />
                Live
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiInsights.map((insight, index) => (
                <div key={index} className={`p-4 rounded-xl border ${
                  insight.color === 'emerald' ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20' :
                  insight.color === 'orange' ? 'bg-orange-50 border-orange-200 dark:bg-orange-900/20' :
                  'bg-blue-50 border-blue-200 dark:bg-blue-900/20'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Lightbulb className={`h-4 w-4 ${
                        insight.color === 'emerald' ? 'text-emerald-600' :
                        insight.color === 'orange' ? 'text-orange-600' :
                        'text-blue-600'
                      }`} />
                      <span className={`text-sm font-semibold ${
                        insight.color === 'emerald' ? 'text-emerald-800 dark:text-emerald-300' :
                        insight.color === 'orange' ? 'text-orange-800 dark:text-orange-300' :
                        'text-blue-800 dark:text-blue-300'
                      }`}>{insight.title}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {insight.confidence}
                    </Badge>
                  </div>
                  <p className={`text-sm mb-3 ${
                    insight.color === 'emerald' ? 'text-emerald-700 dark:text-emerald-400' :
                    insight.color === 'orange' ? 'text-orange-700 dark:text-orange-400' :
                    'text-blue-700 dark:text-blue-400'
                  }`}>
                    {insight.description}
                  </p>
                  <Button size="sm" variant="outline" className="w-full">
                    {insight.action}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Household Members Quick Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-teal-600" />
            Household Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl border border-teal-200/50">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="h-4 w-4 text-teal-600" />
                <span className="text-sm font-semibold text-teal-800 dark:text-teal-300">Family Health</span>
              </div>
              <p className="text-sm text-teal-700 dark:text-teal-400">
                2 doctor appointments scheduled, wellness goals on track
              </p>
            </div>

            <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border border-indigo-200/50">
              <div className="flex items-center gap-2 mb-2">
                <Home className="h-4 w-4 text-indigo-600" />
                <span className="text-sm font-semibold text-indigo-800 dark:text-indigo-300">Home Maintenance</span>
              </div>
              <p className="text-sm text-indigo-700 dark:text-indigo-400">
                3 tasks pending, HVAC service due next month
              </p>
            </div>

            <div className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl border border-pink-200/50">
              <div className="flex items-center gap-2 mb-2">
                <ShoppingCart className="h-4 w-4 text-pink-600" />
                <span className="text-sm font-semibold text-pink-800 dark:text-pink-300">Smart Shopping</span>
              </div>
              <p className="text-sm text-pink-700 dark:text-pink-400">
                AI found better deals, saved $45 on weekly groceries
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}