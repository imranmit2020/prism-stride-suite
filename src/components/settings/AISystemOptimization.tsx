import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Zap, Cpu, Database, Network, TrendingUp, AlertTriangle, CheckCircle, Settings } from "lucide-react";

export function AISystemOptimization() {
  const [autoOptimization, setAutoOptimization] = useState(true);
  const [isOptimizing, setIsOptimizing] = useState(false);

  // Revolutionary AI system optimization data
  const systemMetrics = {
    overallHealth: 94,
    performance: 87,
    efficiency: 92,
    reliability: 96,
    aiOptimizationSavings: "$2,340/month",
    autoFixesApplied: 47,
    predictiveMaintenanceScore: 89
  };

  const optimizationOpportunities = [
    {
      id: 1,
      category: "Performance",
      title: "Database Query Optimization",
      description: "AI detected 23 slow queries that can be optimized",
      impact: "high",
      effort: "low",
      savings: "$450/month",
      confidence: 94,
      autoFixAvailable: true,
      estimatedTime: "2 minutes"
    },
    {
      id: 2,
      category: "Cost",
      title: "Resource Scaling Intelligence",
      description: "Auto-scale resources based on AI usage prediction",
      impact: "high",
      effort: "medium",
      savings: "$890/month",
      confidence: 87,
      autoFixAvailable: true,
      estimatedTime: "5 minutes"
    },
    {
      id: 3,
      category: "Security",
      title: "Anomaly Detection Enhancement",
      description: "Upgrade ML models for better threat detection",
      impact: "medium",
      effort: "high",
      savings: "$230/month",
      confidence: 91,
      autoFixAvailable: false,
      estimatedTime: "15 minutes"
    }
  ];

  const aiInsights = [
    "Your system performs 23% better during off-peak hours",
    "AI predicts 15% resource spike in next 2 weeks",
    "Automated optimization prevented 3 potential outages this month",
    "Machine learning models suggest switching to regional servers for 18% latency improvement"
  ];

  const systemComponents = [
    { name: "API Performance", status: "optimal", score: 96, trend: "up" },
    { name: "Database Efficiency", status: "good", score: 87, trend: "stable" },
    { name: "Memory Usage", status: "optimal", score: 94, trend: "up" },
    { name: "Network Latency", status: "warning", score: 72, trend: "down" },
    { name: "Security Score", status: "optimal", score: 98, trend: "up" }
  ];

  const handleAutoOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => setIsOptimizing(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* AI System Optimization Header */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Zap className="h-6 w-6 text-blue-600" />
                AI System Optimization Engine
              </CardTitle>
              <CardDescription>
                Revolutionary autonomous system optimization with predictive maintenance
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Auto-Optimization</span>
                <Switch checked={autoOptimization} onCheckedChange={setAutoOptimization} />
              </div>
              <Button 
                onClick={handleAutoOptimize}
                disabled={isOptimizing}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isOptimizing ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                    Optimizing...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    AI Optimize Now
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Overall Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{systemMetrics.overallHealth}%</div>
            <Progress value={systemMetrics.overallHealth} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">AI Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{systemMetrics.aiOptimizationSavings}</div>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Auto Fixes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{systemMetrics.autoFixesApplied}</div>
            <p className="text-xs text-muted-foreground mt-1">Applied automatically</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Predictive Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{systemMetrics.predictiveMaintenanceScore}%</div>
            <p className="text-xs text-muted-foreground mt-1">Maintenance accuracy</p>
          </CardContent>
        </Card>
      </div>

      {/* System Components Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="h-5 w-5" />
            Real-time Component Health
          </CardTitle>
          <CardDescription>
            AI-monitored system components with predictive issue detection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systemComponents.map((component, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    component.status === 'optimal' ? 'bg-green-500' :
                    component.status === 'good' ? 'bg-blue-500' :
                    'bg-yellow-500'
                  }`} />
                  <div>
                    <h4 className="font-medium">{component.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={
                        component.status === 'optimal' ? 'default' :
                        component.status === 'good' ? 'secondary' :
                        'destructive'
                      } className="text-xs">
                        {component.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {component.trend === 'up' ? '↗' : component.trend === 'down' ? '↙' : '→'} {component.trend}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">{component.score}%</div>
                  <Progress value={component.score} className="w-20 h-2 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Optimization Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            AI-Detected Optimization Opportunities
          </CardTitle>
          <CardDescription>
            Intelligent recommendations to improve system performance and reduce costs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {optimizationOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{opportunity.title}</h3>
                    <p className="text-sm text-muted-foreground">{opportunity.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{opportunity.category}</Badge>
                    {opportunity.autoFixAvailable && (
                      <Badge variant="default" className="bg-green-600">
                        Auto-fix Available
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Impact:</span>
                    <Badge variant={opportunity.impact === 'high' ? 'destructive' : 'secondary'} className="ml-2">
                      {opportunity.impact}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Effort:</span>
                    <Badge variant="outline" className="ml-2">{opportunity.effort}</Badge>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Savings:</span>
                    <span className="ml-2 font-medium text-green-600">{opportunity.savings}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Confidence:</span>
                    <span className="ml-2 font-medium">{opportunity.confidence}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Est. Time: {opportunity.estimatedTime}
                  </span>
                  <div className="flex gap-2">
                    {opportunity.autoFixAvailable ? (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Auto-Apply Fix
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline">
                        Manual Review
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="border-2 border-purple-200 bg-purple-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-700">
            <Database className="h-5 w-5" />
            AI System Intelligence
          </CardTitle>
          <CardDescription>
            Machine learning insights about your system patterns and future needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {aiInsights.map((insight, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-white border border-purple-200 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                <span className="text-sm text-purple-700">{insight}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}