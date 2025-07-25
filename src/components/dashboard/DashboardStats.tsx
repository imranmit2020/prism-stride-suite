import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package,
  TrendingUp,
  TrendingDown,
  Activity,
  Eye,
  Brain,
  Zap,
  Target,
  Sparkles
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    changeType: "increase" as const,
    icon: DollarSign,
    description: "from last month",
    gradient: "from-emerald-500/10 to-green-500/10",
    iconColor: "text-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    prediction: "$52,000 projected",
    aiInsight: "AI detected seasonal surge pattern"
  },
  {
    title: "Orders",
    value: "2,350",
    change: "+12.5%",
    changeType: "increase" as const,
    icon: ShoppingCart,
    description: "from last month",
    gradient: "from-blue-500/10 to-indigo-500/10",
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    prediction: "2,800 expected",
    aiInsight: "Peak ordering hours identified"
  },
  {
    title: "Active Users",
    value: "14,653",
    change: "+5.2%",
    changeType: "increase" as const,
    icon: Users,
    description: "from last month",
    gradient: "from-purple-500/10 to-violet-500/10",
    iconColor: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    prediction: "16,000 by month-end",
    aiInsight: "Engagement patterns improving"
  },
  {
    title: "Inventory Items",
    value: "1,248",
    change: "-3.1%",
    changeType: "decrease" as const,
    icon: Package,
    description: "from last month",
    gradient: "from-orange-500/10 to-red-500/10",
    iconColor: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    prediction: "Restock needed",
    aiInsight: "Auto-reorder triggered"
  },
];

export function DashboardStats() {
  return (
    <div className="space-y-8">
      {/* AI Status Header */}
      <Card className="card-gradient border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">AI Command Center</CardTitle>
                <p className="text-sm text-muted-foreground">Real-time business intelligence</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                <Activity className="h-3 w-3 mr-1 animate-pulse" />
                AI Active
              </Badge>
              <Badge variant="outline">94% Confidence</Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Enhanced Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
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

                {/* AI Prediction Section */}
                <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200/50 dark:border-blue-800/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-3 w-3 text-blue-600" />
                    <span className="text-xs font-semibold text-blue-800 dark:text-blue-300">AI Prediction</span>
                    <Badge variant="outline" className="text-xs bg-blue-100 text-blue-700 border-blue-300">
                      96%
                    </Badge>
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

      {/* AI Insights Quick Panel */}
      <Card className="card-glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-purple-600" />
            Live AI Insights
            <Badge variant="outline" className="ml-auto">
              <Activity className="h-3 w-3 mr-1 animate-pulse" />
              Real-time
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl border border-emerald-200/50">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">Opportunity Detected</span>
              </div>
              <p className="text-sm text-emerald-700 dark:text-emerald-400">
                AI identified 23% revenue increase potential through pricing optimization
              </p>
            </div>

            <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200/50">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800 dark:text-blue-300">Automation Triggered</span>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                Smart reorder system activated for low-stock items
              </p>
            </div>

            <div className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl border border-purple-200/50">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-semibold text-purple-800 dark:text-purple-300">Pattern Learning</span>
              </div>
              <p className="text-sm text-purple-700 dark:text-purple-400">
                Customer behavior model improved by 15% accuracy
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}