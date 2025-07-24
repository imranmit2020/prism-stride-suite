import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  ShoppingCart,
  Package,
  Target,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  Download,
  Share,
  Printer,
  Calendar
} from "lucide-react";

const reportData = {
  title: "AI Executive Summary Report",
  generatedAt: "2024-01-30 09:15 AM",
  reportType: "Executive Summary",
  confidenceLevel: 96,
  timeRange: "Last 30 Days",
  
  executiveSummary: {
    overview: "Business performance shows exceptional growth with AI-optimized operations delivering superior results. Revenue increased 23% month-over-month with improved operational efficiency.",
    keyHighlights: [
      "Revenue growth accelerated to 23% MoM",
      "Customer satisfaction reached all-time high of 94%",
      "Operational efficiency improved by 18%",
      "AI optimization saved $47K in operational costs"
    ],
    aiRecommendations: [
      "Expand premium product offerings based on demand analysis",
      "Implement dynamic pricing during peak hours",
      "Increase marketing spend by 25% for high-ROI channels",
      "Consider opening second location based on geographic analysis"
    ]
  },

  financialMetrics: [
    { metric: "Total Revenue", value: "$387,420", change: "+23.1%", trend: "up", confidence: 96 },
    { metric: "Net Profit", value: "$147,239", change: "+28.5%", trend: "up", confidence: 94 },
    { metric: "Gross Margin", value: "38.0%", change: "+2.3%", trend: "up", confidence: 92 },
    { metric: "Cash Flow", value: "$89,320", change: "-5.2%", trend: "down", confidence: 88 }
  ],

  operationalMetrics: [
    { metric: "Customer Satisfaction", value: "94%", change: "+7%", trend: "up", confidence: 91 },
    { metric: "Order Volume", value: "2,847", change: "+15%", trend: "up", confidence: 89 },
    { metric: "Avg Order Value", value: "$18.50", change: "+8%", trend: "up", confidence: 87 },
    { metric: "Staff Efficiency", value: "87%", change: "+12%", trend: "up", confidence: 93 }
  ],

  aiInsights: [
    {
      type: "opportunity",
      title: "Premium Product Expansion",
      description: "AI analysis shows 340% ROI potential for premium coffee line expansion",
      confidence: 94,
      estimatedImpact: "$125K annual revenue",
      timeframe: "6 months",
      priority: "high"
    },
    {
      type: "risk",
      title: "Supply Chain Optimization",
      description: "Supplier consolidation could reduce costs by 15% with minimal risk",
      confidence: 89,
      estimatedImpact: "$23K annual savings",
      timeframe: "3 months", 
      priority: "medium"
    },
    {
      type: "prediction",
      title: "Seasonal Demand Surge",
      description: "Spring season projected to increase beverage sales by 28%",
      confidence: 91,
      estimatedImpact: "+$89K revenue",
      timeframe: "Next quarter",
      priority: "high"
    }
  ],

  marketAnalysis: {
    marketPosition: "Strong growth trajectory with expanding market share",
    competitiveAdvantage: "AI-optimized operations providing 23% cost advantage",
    growthOpportunities: [
      "Digital ordering platform showing 78% adoption rate",
      "Corporate catering market underserved in area",
      "Evening hours expansion potential"
    ],
    threats: [
      "New competitor opening 0.5 miles away",
      "Rising ingredient costs projected 8% increase",
      "Economic uncertainty affecting consumer spending"
    ]
  },

  predictions: [
    {
      period: "Next Month",
      metric: "Revenue",
      predicted: "$445,680",
      confidence: 92,
      factors: ["Seasonal trends", "Marketing campaigns", "Product launches"]
    },
    {
      period: "Next Quarter",
      metric: "Customer Growth",
      predicted: "+18%",
      confidence: 87,
      factors: ["Retention programs", "Referral initiatives", "Market expansion"]
    }
  ]
};

interface DetailedReportViewProps {
  reportId: string;
  onClose: () => void;
}

export function DetailedReportView({ reportId, onClose }: DetailedReportViewProps) {
  const getMetricIcon = (metric: string) => {
    if (metric.toLowerCase().includes('revenue') || metric.toLowerCase().includes('profit')) return DollarSign;
    if (metric.toLowerCase().includes('customer')) return Users;
    if (metric.toLowerCase().includes('order')) return ShoppingCart;
    if (metric.toLowerCase().includes('efficiency')) return Package;
    return TrendingUp;
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? TrendingUp : TrendingDown;
  };

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-success" : "text-destructive";
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "opportunity": return Target;
      case "risk": return AlertTriangle;
      case "prediction": return Brain;
      default: return Lightbulb;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case "opportunity": return "text-success";
      case "risk": return "text-destructive";
      case "prediction": return "text-primary";
      default: return "text-muted-foreground";
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high": return <Badge variant="destructive">High Priority</Badge>;
      case "medium": return <Badge variant="outline" className="border-warning text-warning">Medium</Badge>;
      case "low": return <Badge variant="secondary">Low Priority</Badge>;
      default: return <Badge variant="secondary">Normal</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Report Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-primary" />
                {reportData.title}
              </CardTitle>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Generated: {reportData.generatedAt}
                </span>
                <span>Period: {reportData.timeRange}</span>
                <span>AI Confidence: {reportData.confidenceLevel}%</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share className="h-3 w-3 mr-1" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Printer className="h-3 w-3 mr-1" />
                Print
              </Button>
              <Button size="sm">
                <Download className="h-3 w-3 mr-1" />
                Export PDF
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={reportData.confidenceLevel} className="h-2" />
          <div className="text-xs text-muted-foreground mt-1">
            AI Analysis Confidence: {reportData.confidenceLevel}%
          </div>
        </CardContent>
      </Card>

      {/* Executive Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Executive Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{reportData.executiveSummary.overview}</p>
          
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h4 className="font-medium mb-3">Key Highlights</h4>
              <ul className="space-y-2">
                {reportData.executiveSummary.keyHighlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">AI Recommendations</h4>
              <ul className="space-y-2">
                {reportData.executiveSummary.aiRecommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Brain className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    {recommendation}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial & Operational Metrics */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Financial Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {reportData.financialMetrics.map((metric) => {
              const IconComponent = getMetricIcon(metric.metric);
              const TrendIcon = getTrendIcon(metric.trend);
              
              return (
                <div key={metric.metric} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <IconComponent className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{metric.metric}</div>
                      <div className="text-sm text-muted-foreground">
                        Confidence: {metric.confidence}%
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{metric.value}</div>
                    <div className={`flex items-center gap-1 text-sm ${getTrendColor(metric.trend)}`}>
                      <TrendIcon className="h-3 w-3" />
                      {metric.change}
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Operational Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {reportData.operationalMetrics.map((metric) => {
              const IconComponent = getMetricIcon(metric.metric);
              const TrendIcon = getTrendIcon(metric.trend);
              
              return (
                <div key={metric.metric} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <IconComponent className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{metric.metric}</div>
                      <div className="text-sm text-muted-foreground">
                        Confidence: {metric.confidence}%
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{metric.value}</div>
                    <div className={`flex items-center gap-1 text-sm ${getTrendColor(metric.trend)}`}>
                      <TrendIcon className="h-3 w-3" />
                      {metric.change}
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle>AI Strategic Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {reportData.aiInsights.map((insight, index) => {
            const IconComponent = getInsightIcon(insight.type);
            
            return (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <IconComponent className={`h-5 w-5 ${getInsightColor(insight.type)}`} />
                    <h4 className="font-medium">{insight.title}</h4>
                  </div>
                  {getPriorityBadge(insight.priority)}
                </div>
                
                <p className="text-sm text-muted-foreground">{insight.description}</p>
                
                <div className="grid gap-4 md:grid-cols-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Impact:</span>
                    <div className="font-medium">{insight.estimatedImpact}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Timeframe:</span>
                    <div className="font-medium">{insight.timeframe}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Confidence:</span>
                    <div className="font-medium">{insight.confidence}%</div>
                  </div>
                </div>
                
                <Progress value={insight.confidence} className="h-1" />
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Market Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Market Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h4 className="font-medium mb-3">Growth Opportunities</h4>
              <ul className="space-y-2">
                {reportData.marketAnalysis.growthOpportunities.map((opportunity, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Target className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    {opportunity}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Risk Factors</h4>
              <ul className="space-y-2">
                {reportData.marketAnalysis.threats.map((threat, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    {threat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Predictions */}
      <Card>
        <CardHeader>
          <CardTitle>AI Predictions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {reportData.predictions.map((prediction, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{prediction.period}</h4>
                  <Badge variant="outline">{prediction.confidence}% confidence</Badge>
                </div>
                <div className="text-2xl font-bold mb-2">{prediction.predicted}</div>
                <div className="text-sm text-muted-foreground mb-3">{prediction.metric}</div>
                <div className="text-xs text-muted-foreground">
                  Key factors: {prediction.factors.join(", ")}
                </div>
                <Progress value={prediction.confidence} className="h-1 mt-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}