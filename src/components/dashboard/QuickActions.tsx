import { 
  Plus, 
  FileText, 
  Users, 
  Package,
  DollarSign,
  ShoppingCart,
  BarChart3,
  Settings,
  Zap,
  Brain,
  Sparkles,
  Target,
  TrendingUp,
  MessageSquare,
  Wand2,
  Activity,
  Eye,
  Rocket
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

const aiQuickActions = [
  {
    id: "settings",
    title: "AI Business Optimizer",
    description: "Let AI analyze and optimize your entire business automatically",
    icon: Zap,
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-50",
    improvement: "+34% efficiency",
    confidence: 96
  },
  {
    id: "analytics", 
    title: "Predictive Analytics",
    description: "See what will happen next quarter with AI forecasting",
    icon: Brain,
    gradient: "from-purple-500 to-violet-600",
    bgGradient: "from-purple-50 to-violet-50",
    improvement: "97% accuracy",
    confidence: 94
  },
  {
    id: "forms",
    title: "AI Forms Suite", 
    description: "Access revolutionary AI-powered forms not available anywhere",
    icon: Sparkles,
    gradient: "from-emerald-500 to-green-600",
    bgGradient: "from-emerald-50 to-green-50",
    improvement: "Unique features",
    confidence: 100
  },
  {
    id: "reports",
    title: "Smart Reports",
    description: "Generate insights that write themselves with AI storytelling",
    icon: BarChart3,
    gradient: "from-orange-500 to-red-600",
    bgGradient: "from-orange-50 to-red-50",
    improvement: "Auto-generated",
    confidence: 91
  },
];

const automations = [
  {
    name: "Revenue Optimization",
    status: "Active",
    impact: "+$12,400 this month",
    progress: 78,
    color: "emerald"
  },
  {
    name: "Customer Retention AI",
    status: "Learning", 
    impact: "89% accuracy improving",
    progress: 65,
    color: "blue"
  },
  {
    name: "Inventory Prophet",
    status: "Active",
    impact: "Zero stockouts this week",
    progress: 92,
    color: "purple"
  },
  {
    name: "Price Intelligence",
    status: "Monitoring",
    impact: "Competitive edge maintained",
    progress: 84,
    color: "orange"
  }
];

const emergingOpportunities = [
  {
    opportunity: "Gen-Z Market Segment",
    potential: "$340K",
    probability: 78,
    timeframe: "Next 60 days"
  },
  {
    opportunity: "AI Product Line",
    potential: "$890K", 
    probability: 92,
    timeframe: "Next quarter"
  },
  {
    opportunity: "APAC Expansion",
    potential: "$1.2M",
    probability: 84,
    timeframe: "Next 6 months"
  }
];

export function QuickActions({ onActionClick }: QuickActionsProps) {
  return (
    <div className="space-y-6">
      {/* AI Quick Actions */}
      <Card className="card-enhanced">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-xl">
              <Rocket className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">AI Quick Actions</CardTitle>
              <CardDescription>Supercharge your business with one-click AI magic</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {aiQuickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.id}
                  variant="ghost"
                  className="h-auto p-0 hover:scale-[1.02] transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => onActionClick(action.id)}
                >
                  <div className={`
                    w-full p-4 rounded-xl border border-border/50 
                    bg-gradient-to-br ${action.bgGradient} 
                    dark:from-card dark:to-card/80
                    hover:shadow-lg hover:border-primary/30 
                    transition-all duration-300 group
                    relative overflow-hidden
                  `}>
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient}`} />
                    </div>
                    
                    <div className="relative space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-white/80 dark:bg-card/80 rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-sm">
                          <Icon className="h-5 w-5 text-primary group-hover:text-primary" />
                        </div>
                        
                        <div className="flex-1 text-left">
                          <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors duration-300">
                            {action.title}
                          </h3>
                          <p className="text-xs text-muted-foreground group-hover:text-muted-foreground/80 mt-1">
                            {action.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs bg-white/60 dark:bg-card/60">
                          {action.improvement}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {action.confidence}% confident
                        </span>
                      </div>
                    </div>
                    
                    {/* Hover gradient overlay */}
                    <div className={`
                      absolute inset-0 bg-gradient-to-br ${action.gradient} 
                      opacity-0 group-hover:opacity-10 transition-opacity duration-300
                    `} />
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Active AI Automations */}
      <Card className="card-enhanced">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                <Activity className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <CardTitle>Active AI Automations</CardTitle>
                <CardDescription>AI systems working for you 24/7</CardDescription>
              </div>
            </div>
            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
              <Brain className="h-3 w-3 mr-1" />
              4 Running
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {automations.map((automation, index) => (
              <div key={index} className="p-4 rounded-lg bg-gradient-to-r from-card to-card/80 border border-border/50 hover:shadow-md transition-all duration-300">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{automation.name}</span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          automation.color === 'emerald' ? 'text-emerald-600 border-emerald-200 bg-emerald-50' :
                          automation.color === 'blue' ? 'text-blue-600 border-blue-200 bg-blue-50' :
                          automation.color === 'purple' ? 'text-purple-600 border-purple-200 bg-purple-50' :
                          'text-orange-600 border-orange-200 bg-orange-50'
                        }`}
                      >
                        {automation.status}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">{automation.progress}%</span>
                  </div>
                  <Progress value={automation.progress} className="h-2" />
                  <p className="text-xs text-emerald-600 font-medium">{automation.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emerging Opportunities */}
      <Card className="card-enhanced">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
              <Eye className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <CardTitle>AI-Discovered Opportunities</CardTitle>
              <CardDescription>Market opportunities identified by AI</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emergingOpportunities.map((opp, index) => (
              <div key={index} className="p-4 rounded-lg bg-gradient-to-r from-card to-card/80 border border-border/50 hover:shadow-md transition-all duration-300">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{opp.opportunity}</span>
                    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">{opp.potential}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{opp.timeframe}</span>
                    <span className="text-emerald-600 font-medium">{opp.probability}% probability</span>
                  </div>
                  <Progress value={opp.probability} className="h-2" />
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="outline" className="w-full mt-4 hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
            <Target className="h-4 w-4 mr-2" />
            Explore All Opportunities
          </Button>
        </CardContent>
      </Card>

      {/* AI Chat Assistant */}
      <Card className="card-glass">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <MessageSquare className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle>Ask AI Anything</CardTitle>
              <CardDescription>Your intelligent business advisor</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200/50">
              <p className="text-sm text-blue-800 dark:text-blue-300 font-medium mb-2">💡 Try asking:</p>
              <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1">
                <li>• "What should I focus on this week?"</li>
                <li>• "How can I increase profits by 20%?"</li>
                <li>• "Which customers are likely to churn?"</li>
              </ul>
            </div>
            
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Ask your personal AI helper..."
                className="flex-1 px-3 py-2 border border-border rounded-lg text-sm bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
              />
              <Button size="sm" className="bg-gradient-primary hover:shadow-lg transition-all duration-300">
                <Wand2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}