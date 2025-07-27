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
      <Card className="card-accent">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl text-foreground">Business Intelligence</CardTitle>
                <p className="text-sm text-muted-foreground">Real-time analytics and insights</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-50 text-green-700 border border-green-200">
                <Activity className="h-3 w-3 mr-1" />
                Active
              </Badge>
              <Badge variant="outline">94% Accuracy</Badge>
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
            <Card key={stat.title} className="card-floating group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/15 transition-colors duration-200">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
                    isIncrease 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    <TrendIcon className="h-3 w-3" />
                    {stat.change}
                  </div>
                  <span className="text-muted-foreground">{stat.description}</span>
                </div>
                
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="h-3 w-3 text-blue-600" />
                    <span className="text-xs font-medium text-blue-800">Insight</span>
                  </div>
                  <div className="text-xs text-blue-700 mb-1 font-medium">
                    {stat.prediction}
                  </div>
                  <div className="text-xs text-blue-600">
                    {stat.aiInsight}
                  </div>
                </div>
              </CardContent>
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