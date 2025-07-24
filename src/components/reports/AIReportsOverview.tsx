import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Brain, 
  Download, 
  Eye, 
  Calendar,
  TrendingUp,
  DollarSign,
  Users,
  Package,
  BarChart3,
  Zap,
  Clock,
  Target
} from "lucide-react";

const aiGeneratedReports = [
  {
    id: "executive_summary",
    title: "AI Executive Summary",
    description: "Comprehensive business overview with key insights",
    type: "Executive",
    lastGenerated: "2024-01-30 09:15 AM",
    confidence: 96,
    keyInsights: [
      "Revenue up 23% vs last month",
      "Customer satisfaction at all-time high",
      "Inventory optimization saved $12K"
    ],
    aiFindings: "Strong growth trajectory with optimized operations. Recommend expanding premium offerings.",
    icon: Brain,
    priority: "high",
    automationLevel: "Fully Automated"
  },
  {
    id: "predictive_forecast",
    title: "Predictive Business Forecast",
    description: "AI-powered 90-day business predictions",
    type: "Predictive",
    lastGenerated: "2024-01-30 06:00 AM", 
    confidence: 89,
    keyInsights: [
      "Q2 revenue projected: $1.2M",
      "Staff optimization needed in March",
      "Inventory adjustment for spring season"
    ],
    aiFindings: "Seasonal patterns indicate 18% growth opportunity with strategic adjustments.",
    icon: TrendingUp,
    priority: "high",
    automationLevel: "AI Generated"
  },
  {
    id: "customer_intelligence",
    title: "Customer Intelligence Report",
    description: "Deep AI analysis of customer behavior patterns",
    type: "Customer Analytics",
    lastGenerated: "2024-01-29 11:30 PM",
    confidence: 91,
    keyInsights: [
      "Premium segment growing 45%",
      "Mobile ordering up 78%",
      "Weekend loyalty increasing"
    ],
    aiFindings: "Customer lifetime value increased 34%. Loyalty programs driving retention.",
    icon: Users,
    priority: "medium",
    automationLevel: "AI Enhanced"
  },
  {
    id: "operational_efficiency",
    title: "Operational Efficiency Analysis",
    description: "AI optimization recommendations for operations",
    type: "Operations",
    lastGenerated: "2024-01-29 08:45 AM",
    confidence: 87,
    keyInsights: [
      "Kitchen workflow 15% faster",
      "Energy costs reduced 8%",
      "Waste decreased by 22%"
    ],
    aiFindings: "Process improvements yielding significant cost savings. Further automation recommended.",
    icon: Package,
    priority: "medium",
    automationLevel: "AI Optimized"
  },
  {
    id: "financial_performance",
    title: "AI Financial Performance",
    description: "Intelligent financial analysis with recommendations",
    type: "Financial",
    lastGenerated: "2024-01-30 07:20 AM",
    confidence: 94,
    keyInsights: [
      "Profit margin improved to 38%",
      "Cash flow positive trend",
      "ROI on marketing: 340%"
    ],
    aiFindings: "Strong financial health. Investment in expansion recommended for Q2.",
    icon: DollarSign,
    priority: "high",
    automationLevel: "AI Generated"
  },
  {
    id: "market_analysis",
    title: "Market Intelligence Report",
    description: "AI-powered competitive and market analysis",
    type: "Market Research",
    lastGenerated: "2024-01-29 06:15 PM",
    confidence: 82,
    keyInsights: [
      "Market share increased 12%",
      "Competitor analysis favorable",
      "New opportunity segments identified"
    ],
    aiFindings: "Market position strengthening. Premium positioning strategy successful.",
    icon: Target,
    priority: "low",
    automationLevel: "AI Enhanced"
  }
];

interface AIReportsOverviewProps {
  onViewReport: (reportId: string) => void;
  onGenerateReport: (reportId: string) => void;
}

export function AIReportsOverview({ onViewReport, onGenerateReport }: AIReportsOverviewProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-destructive";
      case "medium": return "text-warning";
      case "low": return "text-success";
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

  const getAutomationBadge = (level: string) => {
    switch (level) {
      case "Fully Automated": return <Badge variant="secondary" className="bg-success text-success-foreground">Fully Automated</Badge>;
      case "AI Generated": return <Badge variant="outline" className="border-primary text-primary">AI Generated</Badge>;
      case "AI Enhanced": return <Badge variant="outline">AI Enhanced</Badge>;
      case "AI Optimized": return <Badge variant="secondary">AI Optimized</Badge>;
      default: return <Badge variant="secondary">Standard</Badge>;
    }
  };

  const averageConfidence = Math.round(
    aiGeneratedReports.reduce((sum, report) => sum + report.confidence, 0) / aiGeneratedReports.length
  );

  const highPriorityReports = aiGeneratedReports.filter(r => r.priority === "high").length;

  return (
    <div className="space-y-6">
      {/* AI Reports Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            AI-Powered Business Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{aiGeneratedReports.length}</div>
              <div className="text-sm text-muted-foreground">AI Reports</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{averageConfidence}%</div>
              <div className="text-sm text-muted-foreground">Avg Confidence</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-destructive">{highPriorityReports}</div>
              <div className="text-sm text-muted-foreground">High Priority</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">24/7</div>
              <div className="text-sm text-muted-foreground">AI Monitoring</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Generated Reports Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {aiGeneratedReports.map((report) => {
          const IconComponent = report.icon;
          
          return (
            <Card key={report.id} className="relative overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{report.title}</h3>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {getPriorityBadge(report.priority)}
                    {getAutomationBadge(report.automationLevel)}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Last Generated */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Last generated: {report.lastGenerated}
                  </div>
                  <Badge variant="outline">{report.type}</Badge>
                </div>

                {/* AI Confidence */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Brain className="h-3 w-3 text-primary" />
                      AI Confidence
                    </span>
                    <span className="font-medium">{report.confidence}%</span>
                  </div>
                  <Progress value={report.confidence} className="h-2" />
                </div>

                {/* Key Insights */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Key AI Insights:</h4>
                  <ul className="space-y-1">
                    {report.keyInsights.map((insight, index) => (
                      <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                        <Zap className="h-3 w-3 mt-0.5 text-primary flex-shrink-0" />
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* AI Findings */}
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="text-sm font-medium mb-1">AI Analysis:</h4>
                  <p className="text-xs text-muted-foreground">{report.aiFindings}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => onViewReport(report.id)}
                    className="flex-1"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View Report
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onGenerateReport(report.id)}
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Quick Report Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            <Button variant="outline" className="h-auto p-4 justify-start">
              <div className="flex items-center gap-3">
                <Brain className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <div className="font-medium">Generate AI Insights</div>
                  <div className="text-xs text-muted-foreground">Create instant business insights</div>
                </div>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 justify-start">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-success" />
                <div className="text-left">
                  <div className="font-medium">Schedule Reports</div>
                  <div className="text-xs text-muted-foreground">Automate report generation</div>
                </div>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 justify-start">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-accent" />
                <div className="text-left">
                  <div className="font-medium">Custom Reports</div>
                  <div className="text-xs text-muted-foreground">Build AI-powered reports</div>
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}