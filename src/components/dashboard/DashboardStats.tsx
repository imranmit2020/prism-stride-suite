import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  ShoppingCart, 
  Brain,
  Zap,
  Target,
  Eye,
  AlertTriangle,
  CheckCircle,
  Sparkles,
  Activity,
  Package,
  TrendingDown as TrendingDownIcon
} from "lucide-react";

export function DashboardStats() {
  const aiMetrics = {
    aiConfidence: 94,
    predictiveAccuracy: 97,
    automationSavings: "$47,230",
    aiDecisionsMade: 1847,
    futureRevenuePrediction: "$2.4M",
    riskLevel: "Low",
    aiOptimizations: 23,
    marketOpportunities: 7
  };

  const realTimeInsights = [
    {
      type: "Revenue Prediction",
      insight: "AI predicts 23% revenue increase next quarter based on current trends",
      confidence: 96,
      impact: "High",
      timeframe: "Next 90 days",
      action: "Scale marketing budget by 15%"
    },
    {
      type: "Risk Alert",
      insight: "Potential supply chain disruption detected in Asian markets",
      confidence: 87,
      impact: "Medium",
      timeframe: "Next 30 days", 
      action: "Diversify suppliers immediately"
    },
    {
      type: "Opportunity",
      insight: "Untapped customer segment identified with $340K potential",
      confidence: 92,
      impact: "High",
      timeframe: "Immediate",
      action: "Launch targeted campaign"
    }
  ];

  const kpis = [
    {
      title: "AI Revenue Forecast",
      value: "$847,230",
      change: "+23.4%",
      trend: "up",
      prediction: "$1.2M by Q2",
      confidence: 94,
      icon: DollarSign,
      aiInsight: "AI detected seasonal surge pattern"
    },
    {
      title: "Predictive Customer Growth",
      value: "2,847",
      change: "+18.2%", 
      trend: "up",
      prediction: "4,200 by month-end",
      confidence: 91,
      icon: Users,
      aiInsight: "Viral coefficient increasing 12% weekly"
    },
    {
      title: "AI-Optimized Conversion",
      value: "12.7%",
      change: "+4.3%",
      trend: "up", 
      prediction: "15.2% achievable",
      confidence: 88,
      icon: Target,
      aiInsight: "A/B tests suggest 3x improvement possible"
    },
    {
      title: "Smart Automation ROI",
      value: "340%",
      change: "+67%",
      trend: "up",
      prediction: "450% next month",
      confidence: 96,
      icon: Zap,
      aiInsight: "Process optimization accelerating"
    }
  ];

  return (
    <div className="space-y-6">
      {/* AI Command Center Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Brain className="h-6 w-6 text-blue-600" />
                AI Command Center
              </CardTitle>
              <CardDescription>
                Real-time AI insights, predictions, and autonomous business intelligence
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-100 text-green-800">
                <Activity className="h-3 w-3 mr-1" />
                AI Active
              </Badge>
              <Badge variant="secondary">
                {aiMetrics.aiConfidence}% Confidence
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{aiMetrics.predictiveAccuracy}%</div>
              <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{aiMetrics.automationSavings}</div>
              <div className="text-sm text-muted-foreground">AI Savings Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{aiMetrics.aiDecisionsMade}</div>
              <div className="text-sm text-muted-foreground">AI Decisions Made</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{aiMetrics.aiOptimizations}</div>
              <div className="text-sm text-muted-foreground">Auto Optimizations</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revolutionary KPI Cards with AI Predictions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          const isPositive = kpi.trend === "up";
          
          return (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                <Icon className={`h-4 w-4 ${isPositive ? 'text-green-600' : 'text-red-600'}`} />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="text-2xl font-bold">{kpi.value}</div>
                    <div className="flex items-center gap-2">
                      {isPositive ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDownIcon className="h-4 w-4 text-red-600" />
                      )}
                      <span className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {kpi.change}
                      </span>
                      <span className="text-xs text-muted-foreground">vs last month</span>
                    </div>
                  </div>
                  
                  {/* AI Prediction */}
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-1 mb-1">
                      <Sparkles className="h-3 w-3 text-blue-600" />
                      <span className="text-xs font-semibold text-blue-800">AI Prediction</span>
                      <Badge variant="outline" className="text-xs">{kpi.confidence}%</Badge>
                    </div>
                    <div className="text-sm font-semibold text-blue-700">{kpi.prediction}</div>
                    <div className="text-xs text-blue-600 mt-1">{kpi.aiInsight}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Real-time AI Insights Stream */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-purple-600" />
            Live AI Intelligence Stream
            <Badge variant="outline" className="ml-auto">
              <Activity className="h-3 w-3 mr-1 animate-pulse" />
              Real-time
            </Badge>
          </CardTitle>
          <CardDescription>
            AI continuously analyzes your business and provides actionable insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {realTimeInsights.map((insight, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg border-l-4 ${
                  insight.impact === 'High' ? 'border-red-500 bg-red-50' :
                  insight.impact === 'Medium' ? 'border-yellow-500 bg-yellow-50' :
                  'border-green-500 bg-green-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{insight.type}</Badge>
                      <Badge variant={insight.impact === 'High' ? 'destructive' : insight.impact === 'Medium' ? 'outline' : 'secondary'}>
                        {insight.impact} Impact
                      </Badge>
                      <span className="text-xs text-muted-foreground">{insight.confidence}% confidence</span>
                    </div>
                    <p className="text-sm font-medium mb-2">{insight.insight}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>⏱️ {insight.timeframe}</span>
                      <span>🎯 {insight.action}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="ml-4">
                    {insight.type === 'Risk Alert' ? (
                      <>
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Mitigate
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Act Now
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Market Intelligence */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-600" />
              AI Market Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-green-800">Emerging Market: Gen-Z Segment</span>
                  <Badge className="bg-green-100 text-green-800">$340K Potential</Badge>
                </div>
                <p className="text-sm text-green-700">AI detected 67% increase in engagement from 18-24 demographic</p>
                <Progress value={78} className="mt-2" />
                <span className="text-xs text-green-600">78% probability of success</span>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-blue-800">Product Expansion: AI Tools</span>
                  <Badge className="bg-blue-100 text-blue-800">$890K Potential</Badge>
                </div>
                <p className="text-sm text-blue-700">Market gap identified in AI automation for SMBs</p>
                <Progress value={92} className="mt-2" />
                <span className="text-xs text-blue-600">92% market readiness</span>
              </div>

              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-purple-800">Geographic: APAC Expansion</span>
                  <Badge className="bg-purple-100 text-purple-800">$1.2M Potential</Badge>
                </div>
                <p className="text-sm text-purple-700">Optimal timing for Southeast Asia market entry</p>
                <Progress value={84} className="mt-2" />
                <span className="text-xs text-purple-600">84% market conditions favorable</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              AI Risk Monitoring
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-semibold">Overall Risk Level</span>
                  <div className="text-2xl font-bold text-green-600 mt-1">LOW</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Risk Score</div>
                  <div className="text-xl font-bold">23/100</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Market Volatility</span>
                  <div className="flex items-center gap-2">
                    <Progress value={15} className="w-16 h-2" />
                    <Badge variant="secondary">Low</Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Operational Risk</span>
                  <div className="flex items-center gap-2">
                    <Progress value={28} className="w-16 h-2" />
                    <Badge variant="outline">Medium</Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Financial Exposure</span>
                  <div className="flex items-center gap-2">
                    <Progress value={12} className="w-16 h-2" />
                    <Badge variant="secondary">Low</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Competitive Threat</span>
                  <div className="flex items-center gap-2">
                    <Progress value={34} className="w-16 h-2" />
                    <Badge variant="outline">Medium</Badge>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm font-semibold text-yellow-800">AI Alert</span>
                </div>
                <p className="text-sm text-yellow-700">
                  Supply chain vulnerability detected. Recommend diversifying supplier base by 25%.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}