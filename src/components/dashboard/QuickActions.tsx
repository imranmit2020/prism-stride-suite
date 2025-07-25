import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Zap, 
  Brain, 
  Sparkles, 
  Target, 
  TrendingUp,
  MessageSquare,
  Wand2,
  Activity,
  Eye,
  BarChart3,
  Settings,
  Rocket
} from "lucide-react";

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

export function QuickActions({ onActionClick }: QuickActionsProps) {
  const aiActions = [
    {
      title: "AI Business Optimizer",
      description: "Let AI analyze and optimize your entire business automatically",
      icon: Zap,
      action: "settings",
      color: "bg-blue-600 hover:bg-blue-700",
      improvement: "+34% efficiency",
      confidence: 96
    },
    {
      title: "Predictive Analytics",
      description: "See what will happen next quarter with AI forecasting",
      icon: Brain,
      action: "analytics", 
      color: "bg-purple-600 hover:bg-purple-700",
      improvement: "97% accuracy",
      confidence: 94
    },
    {
      title: "AI Forms Suite",
      description: "Access revolutionary AI-powered forms not available anywhere",
      icon: Sparkles,
      action: "forms",
      color: "bg-green-600 hover:bg-green-700",
      improvement: "Unique features",
      confidence: 100
    },
    {
      title: "Smart Reports",
      description: "Generate insights that write themselves with AI storytelling",
      icon: BarChart3,
      action: "reports",
      color: "bg-orange-600 hover:bg-orange-700",
      improvement: "Auto-generated",
      confidence: 91
    }
  ];

  const automations = [
    {
      name: "Revenue Optimization",
      status: "Active",
      impact: "+$12,400 this month",
      progress: 78,
      color: "green"
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

  return (
    <div className="space-y-6">
      {/* AI Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-blue-600" />
            AI Quick Actions
          </CardTitle>
          <CardDescription>
            Supercharge your business with one-click AI magic
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {aiActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  onClick={() => onActionClick(action.action)}
                  variant="outline"
                  className={`w-full p-4 h-auto hover:${action.color.split(' ')[1]} hover:text-white transition-all group`}
                >
                  <div className="flex items-start gap-3 w-full">
                    <Icon className="h-5 w-5 mt-1 group-hover:text-white" />
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-sm">{action.title}</div>
                      <div className="text-xs text-muted-foreground group-hover:text-white/80">
                        {action.description}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {action.improvement}
                        </Badge>
                        <span className="text-xs text-muted-foreground group-hover:text-white/60">
                          {action.confidence}% confident
                        </span>
                      </div>
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Active AI Automations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-600" />
            Active AI Automations
            <Badge variant="outline" className="ml-auto">
              <Brain className="h-3 w-3 mr-1" />
              4 Running
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {automations.map((automation, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{automation.name}</span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        automation.color === 'green' ? 'text-green-600' :
                        automation.color === 'blue' ? 'text-blue-600' :
                        automation.color === 'purple' ? 'text-purple-600' :
                        'text-orange-600'
                      }`}
                    >
                      {automation.status}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">{automation.progress}%</span>
                </div>
                <Progress value={automation.progress} className="h-2" />
                <p className="text-xs text-green-600 font-medium">{automation.impact}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emerging Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-purple-600" />
            AI-Discovered Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emergingOpportunities.map((opp, index) => (
              <div key={index} className="p-3 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{opp.opportunity}</span>
                  <Badge className="bg-green-100 text-green-800">{opp.potential}</Badge>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{opp.timeframe}</span>
                  <span className="text-green-600 font-medium">{opp.probability}% probability</span>
                </div>
                <Progress value={opp.probability} className="h-2" />
              </div>
            ))}
          </div>
          
          <Button variant="outline" className="w-full mt-4">
            <Target className="h-4 w-4 mr-2" />
            Explore All Opportunities
          </Button>
        </CardContent>
      </Card>

      {/* AI Chat Assistant */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            Ask AI Anything
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800 font-medium">💡 Try asking:</p>
              <ul className="text-xs text-blue-700 mt-2 space-y-1">
                <li>• "What should I focus on this week?"</li>
                <li>• "How can I increase profits by 20%?"</li>
                <li>• "Which customers are likely to churn?"</li>
              </ul>
            </div>
            
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Ask your AI business advisor..."
                className="flex-1 px-3 py-2 border rounded-lg text-sm"
              />
              <Button size="sm">
                <Wand2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}