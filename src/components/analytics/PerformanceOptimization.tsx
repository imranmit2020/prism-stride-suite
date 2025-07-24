import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  AlertTriangle, 
  CheckCircle,
  Zap,
  Brain,
  Lightbulb,
  Rocket,
  DollarSign
} from "lucide-react";

const performanceKPIs = [
  {
    id: "sales_performance",
    title: "Sales Performance",
    current: 87,
    target: 100,
    trend: "+12%",
    status: "good",
    insights: [
      "Exceeding monthly targets by 8%",
      "Weekend sales driving growth",
      "Premium products performing well"
    ]
  },
  {
    id: "customer_satisfaction",
    title: "Customer Satisfaction",
    current: 92,
    target: 95,
    trend: "+3%",
    status: "excellent",
    insights: [
      "Service quality ratings improved",
      "Wait time reduction successful",
      "Staff training showing results"
    ]
  },
  {
    id: "operational_efficiency",
    title: "Operational Efficiency",
    current: 76,
    target: 85,
    trend: "-2%",
    status: "needs_attention",
    insights: [
      "Kitchen workflow needs optimization",
      "Inventory turnover could improve",
      "Staff scheduling gaps identified"
    ]
  },
  {
    id: "cost_management",
    title: "Cost Management", 
    current: 68,
    target: 80,
    trend: "+5%",
    status: "improving",
    insights: [
      "Food costs reduced by 3%",
      "Energy efficiency gains",
      "Supplier negotiations successful"
    ]
  }
];

const optimizationOpportunities = [
  {
    id: "peak_hour_staffing",
    title: "Peak Hour Staffing Optimization",
    impact: "High",
    effort: "Medium",
    savings: "$12,000/month",
    description: "AI recommends adjusting staff schedules to match customer flow patterns",
    actions: [
      "Add 2 staff during 12-2 PM rush",
      "Reduce morning shift by 1 person",
      "Cross-train for flexibility"
    ],
    expectedROI: "340%",
    timeline: "2 weeks"
  },
  {
    id: "menu_optimization",
    title: "Menu Item Optimization",
    impact: "High",
    effort: "Low",
    savings: "$8,500/month",
    description: "Remove low-performing items and promote high-margin products",
    actions: [
      "Discontinue 3 underperforming pastries",
      "Promote premium coffee options",
      "Introduce seasonal specials"
    ],
    expectedROI: "280%",
    timeline: "1 week"
  },
  {
    id: "inventory_automation",
    title: "Inventory Automation",
    impact: "Medium",
    effort: "High",
    savings: "$5,200/month",
    description: "Implement AI-driven automatic reordering system",
    actions: [
      "Set up automated supplier orders",
      "Implement predictive stock levels",
      "Reduce waste by 15%"
    ],
    expectedROI: "195%",
    timeline: "6 weeks"
  },
  {
    id: "customer_retention",
    title: "Customer Retention Program",
    impact: "High",
    effort: "Medium",
    savings: "$15,000/month",
    description: "Implement AI-powered loyalty and retention strategies",
    actions: [
      "Launch personalized rewards program",
      "Identify at-risk customers",
      "Automated re-engagement campaigns"
    ],
    expectedROI: "425%",
    timeline: "4 weeks"
  }
];

const businessGoals = [
  {
    goal: "Increase Monthly Revenue",
    current: 387420,
    target: 450000,
    progress: 86,
    deadline: "Q2 2024",
    onTrack: true
  },
  {
    goal: "Improve Customer Retention",
    current: 68,
    target: 75,
    progress: 91,
    deadline: "Q1 2024",
    onTrack: true
  },
  {
    goal: "Reduce Operating Costs",
    current: 15,
    target: 20,
    progress: 75,
    deadline: "Q2 2024",
    onTrack: false
  },
  {
    goal: "Expand Market Share",
    current: 12,
    target: 18,
    progress: 67,
    deadline: "Q3 2024",
    onTrack: true
  }
];

export function PerformanceOptimization() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "text-success";
      case "good": return "text-primary";
      case "improving": return "text-warning";
      case "needs_attention": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent": return CheckCircle;
      case "good": return TrendingUp;
      case "improving": return Target;
      case "needs_attention": return AlertTriangle;
      default: return BarChart3;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "bg-destructive text-destructive-foreground";
      case "Medium": return "bg-warning text-warning-foreground";
      case "Low": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case "High": return "border-destructive text-destructive";
      case "Medium": return "border-warning text-warning";
      case "Low": return "border-success text-success";
      default: return "border-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Performance KPIs */}
      <div className="grid gap-6 lg:grid-cols-2">
        {performanceKPIs.map((kpi) => {
          const StatusIcon = getStatusIcon(kpi.status);
          
          return (
            <Card key={kpi.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <StatusIcon className={`h-5 w-5 ${getStatusColor(kpi.status)}`} />
                    {kpi.title}
                  </CardTitle>
                  <Badge variant="outline">{kpi.trend}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{kpi.current}/100</div>
                  <div className="text-sm text-muted-foreground">
                    Target: {kpi.target}
                  </div>
                </div>
                
                <Progress value={kpi.current} className="h-3" />
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Key Insights:</h4>
                  <ul className="space-y-1">
                    {kpi.insights.map((insight, index) => (
                      <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                        <Brain className="h-3 w-3 mt-0.5 text-primary flex-shrink-0" />
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Optimization Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            AI Optimization Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {optimizationOpportunities.map((opportunity) => (
            <div key={opportunity.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">{opportunity.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground max-w-2xl">
                    {opportunity.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getImpactColor(opportunity.impact)}>
                    {opportunity.impact} Impact
                  </Badge>
                  <Badge variant="outline" className={getEffortColor(opportunity.effort)}>
                    {opportunity.effort} Effort
                  </Badge>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Monthly Savings</div>
                  <div className="text-lg font-bold text-success">{opportunity.savings}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Expected ROI</div>
                  <div className="text-lg font-bold">{opportunity.expectedROI}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Timeline</div>
                  <div className="text-lg font-bold">{opportunity.timeline}</div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Recommended Actions:</h4>
                <ul className="space-y-1">
                  {opportunity.actions.map((action, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <Rocket className="h-3 w-3 mt-0.5 text-accent flex-shrink-0" />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2">
                <Button size="sm">Implement</Button>
                <Button variant="outline" size="sm">Learn More</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Business Goals Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Business Goals Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {businessGoals.map((goal) => (
            <div key={goal.goal} className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{goal.goal}</h4>
                <div className="flex items-center gap-2">
                  <Badge variant={goal.onTrack ? "secondary" : "destructive"}>
                    {goal.onTrack ? "On Track" : "Behind"}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{goal.deadline}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span>
                  {typeof goal.current === 'number' && goal.current > 1000 
                    ? `$${goal.current.toLocaleString()}` 
                    : `${goal.current}${goal.goal.includes('Revenue') ? '' : '%'}`}
                </span>
                <span>
                  Target: {typeof goal.target === 'number' && goal.target > 1000 
                    ? `$${goal.target.toLocaleString()}` 
                    : `${goal.target}${goal.goal.includes('Revenue') ? '' : '%'}`}
                </span>
              </div>
              
              <Progress value={goal.progress} className="h-2" />
              
              <div className="text-xs text-muted-foreground">
                {goal.progress}% complete
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}