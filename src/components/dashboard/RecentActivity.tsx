import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Zap, 
  TrendingUp, 
  MessageSquare, 
  Target,
  Sparkles,
  Activity,
  Clock,
  CheckCircle,
  ArrowRight,
  DollarSign,
  Users,
  AlertTriangle,
  Star
} from "lucide-react";

interface RecentActivityProps {
  isHomeMode?: boolean;
}

export function RecentActivity({ isHomeMode = false }: RecentActivityProps) {
  const businessActivities = [
    {
      type: "AI Optimization",
      title: "Automated inventory reorder for top-selling products",
      description: "AI detected low stock levels and automatically placed orders for 12 items",
      value: "+$23,400 potential revenue saved",
      time: "2 minutes ago",
      confidence: 96,
      icon: Zap,
      status: "completed",
      impact: "High"
    },
    {
      type: "Predictive Alert",
      title: "Customer churn risk identified",
      description: "AI flagged 8 high-value customers showing early churn signals",
      value: "$45,600 at risk",
      time: "5 minutes ago", 
      confidence: 89,
      icon: AlertTriangle,
      status: "action-needed",
      impact: "High"
    },
    {
      type: "Market Intelligence",
      title: "Competitor price change detected",
      description: "Rival company reduced prices by 12% - recommendation generated",
      value: "Strategy adjustment needed",
      time: "12 minutes ago",
      confidence: 94,
      icon: Target,
      status: "pending",
      impact: "Medium"
    },
    {
      type: "AI Insights",
      title: "New market opportunity discovered",
      description: "AI identified underserved segment with 340K potential customers",
      value: "$890K revenue opportunity",
      time: "18 minutes ago",
      confidence: 87,
      icon: Star,
      status: "opportunity",
      impact: "Very High"
    },
    {
      type: "Process Automation",
      title: "Invoice processing accelerated",
      description: "AI processed 47 invoices in 3 minutes with 99.8% accuracy",
      value: "6.5 hours saved",
      time: "25 minutes ago",
      confidence: 99,
      icon: CheckCircle,
      status: "completed",
      impact: "Medium"
    },
    {
      type: "Customer Insight",
      title: "Personalization engine updated",
      description: "AI refined customer preferences for 1,247 users",
      value: "+23% engagement predicted",
      time: "35 minutes ago",
      confidence: 91,
      icon: Brain,
      status: "completed",
      impact: "High"
    }
  ];

  const homeActivities = [
    {
      type: "Smart Budget",
      title: "Grocery budget alert",
      description: "You've spent $120 on groceries this week - getting close to your $150 limit",
      value: "$30 remaining",
      time: "2 minutes ago",
      confidence: 95,
      icon: AlertTriangle,
      status: "action-needed",
      impact: "Medium"
    },
    {
      type: "Bill Reminder",
      title: "Electric bill due soon",
      description: "Your electric bill of $76.45 is due in 3 days",
      value: "Due March 15th",
      time: "5 minutes ago",
      confidence: 100,
      icon: CheckCircle,
      status: "pending",
      impact: "High"
    },
    {
      type: "Expense Insight",
      title: "Coffee spending increased",
      description: "You've spent 40% more on coffee this month compared to last month",
      value: "+$23 vs last month",
      time: "12 minutes ago",
      confidence: 92,
      icon: TrendingUp,
      status: "completed",
      impact: "Low"
    },
    {
      type: "Shopping Alert",
      title: "Milk expiring soon",
      description: "The milk in your fridge expires in 2 days - add to shopping list?",
      value: "Expires March 14th",
      time: "18 minutes ago",
      confidence: 88,
      icon: Target,
      status: "opportunity",
      impact: "Low"
    },
    {
      type: "Savings Goal",
      title: "Emergency fund growing",
      description: "You're 82% towards your $3,000 emergency fund goal",
      value: "+$150 this month",
      time: "25 minutes ago",
      confidence: 100,
      icon: Star,
      status: "completed",
      impact: "High"
    },
    {
      type: "Income Tracking",
      title: "Side income received",
      description: "Freelance payment of $450 deposited to your account",
      value: "+$450",
      time: "35 minutes ago",
      confidence: 100,
      icon: Brain,
      status: "completed",
      impact: "Medium"
    }
  ];

  const aiActivities = isHomeMode ? homeActivities : businessActivities;

  const businessConversations = [
    {
      question: "What's our biggest revenue opportunity this quarter?",
      answer: "AI analysis shows expanding to the Gen-Z segment could generate $340K additional revenue with 78% confidence. The market is showing 67% increased engagement from 18-24 demographics.",
      time: "3 minutes ago",
      confidence: 94
    },
    {
      question: "How can we reduce customer acquisition costs?",
      answer: "Optimize your LinkedIn ads budget allocation. AI predicts shifting 35% to video content will reduce CAC by $23 while increasing conversion by 18%.",
      time: "8 minutes ago", 
      confidence: 88
    },
    {
      question: "Which products should we discontinue?",
      answer: "Product SKU-4471 shows declining trend with 89% probability of negative ROI next quarter. Recommend phasing out within 60 days while promoting alternatives.",
      time: "15 minutes ago",
      confidence: 92
    }
  ];

  const homeConversations = [
    {
      question: "How can I save more money each month?",
      answer: "Based on your spending patterns, you could save $180/month by reducing coffee shop visits by 50% and switching to a cheaper phone plan. Your grocery spending is actually very efficient!",
      time: "3 minutes ago",
      confidence: 89
    },
    {
      question: "When should I buy groceries to save money?",
      answer: "Shop on Wednesdays for best deals. Your local stores have 23% more discounts midweek. Stock up on non-perishables during the first week of each month when sales are highest.",
      time: "8 minutes ago", 
      confidence: 92
    },
    {
      question: "Is my emergency fund on track?",
      answer: "You're doing great! At $2,450 with your current $150/month savings rate, you'll reach your $3,000 goal in 4 months. Consider increasing to $200/month if possible.",
      time: "15 minutes ago",
      confidence: 95
    }
  ];

  const aiConversations = isHomeMode ? homeConversations : businessConversations;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'action-needed': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'opportunity': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Very High': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Activity Stream */}
      <Card className="card-modern">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <Activity className="h-5 w-5 text-primary" />
            </div>
            AI Activity Stream
            <Badge className="ml-auto bg-accent/10 text-accent border border-accent/20">
              <Brain className="h-3 w-3 mr-1" />
              Real-time
            </Badge>
          </CardTitle>
          <CardDescription>
            {isHomeMode ? "Live feed of AI decisions, optimizations, and insights happening in your home" : "Live feed of AI decisions, optimizations, and insights happening across your business"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiActivities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="group flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 hover:border-border transition-all duration-200">
                  <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/15 transition-colors duration-200">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">{activity.type}</Badge>
                      <div className={`w-2 h-2 rounded-full ${getImpactColor(activity.impact)}`} title={`${activity.impact} Impact`} />
                      <span className="text-xs text-muted-foreground">{activity.confidence}% confidence</span>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm">{activity.title}</h4>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(activity.status)} variant="outline">
                          {activity.status.replace('-', ' ')}
                        </Badge>
                        <span className="text-sm font-semibold text-green-600">{activity.value}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </div>
                    </div>
                  </div>
                  
                  {activity.status === 'action-needed' && (
                    <Button size="sm" variant="outline">
                      <ArrowRight className="h-3 w-3 mr-1" />
                      Act
                    </Button>
                  )}
                  
                  {activity.status === 'opportunity' && (
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Star className="h-3 w-3 mr-1" />
                      Explore
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* AI Business Advisor Chat - Only show in business mode */}
      {!isHomeMode && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-purple-600" />
              Business AI Helper
              <Badge variant="outline" className="ml-auto">
                <Sparkles className="h-3 w-3 mr-1 animate-pulse" />
                Always Available
              </Badge>
            </CardTitle>
            <CardDescription>
              Ask your AI anything about your business - get instant strategic insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiConversations.map((conv, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium">{conv.question}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <Brain className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="flex-1 p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm">{conv.answer}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {conv.confidence}% confident
                        </Badge>
                        <span className="text-xs text-muted-foreground">{conv.time}</span>
                      </div>
                    </div>
                  </div>
                  
                  {index < aiConversations.length - 1 && <div className="border-t my-4" />}
                </div>
              ))}
              
              <div className="pt-4 border-t">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Ask your business AI advisor anything..."
                    className="flex-1 px-3 py-2 border rounded-lg text-sm"
                  />
                  <Button size="sm">
                    <Sparkles className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}