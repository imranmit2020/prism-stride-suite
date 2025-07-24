import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Package,
  BarChart3,
  Lightbulb,
  Target,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Download
} from "lucide-react";
import { useState } from "react";

const reportTemplates = [
  {
    id: "sales_performance",
    name: "Sales Performance Analysis",
    category: "Sales",
    aiCapabilities: ["Trend Analysis", "Forecasting", "Anomaly Detection"],
    description: "AI-powered sales analysis with predictive insights",
    estimatedTime: "3 minutes",
    confidence: 94
  },
  {
    id: "customer_segmentation",
    name: "Customer Segmentation Report",
    category: "Customer",
    aiCapabilities: ["Behavioral Analysis", "Clustering", "Lifetime Value"],
    description: "Deep customer insights using machine learning",
    estimatedTime: "5 minutes",
    confidence: 89
  },
  {
    id: "inventory_optimization",
    name: "Inventory Optimization",
    category: "Operations",
    aiCapabilities: ["Demand Forecasting", "Stock Optimization", "Supplier Analysis"],
    description: "AI-driven inventory recommendations",
    estimatedTime: "4 minutes",
    confidence: 91
  },
  {
    id: "financial_health",
    name: "Financial Health Assessment",
    category: "Financial",
    aiCapabilities: ["Risk Analysis", "Cash Flow Prediction", "Profit Optimization"],
    description: "Comprehensive financial analysis with AI insights",
    estimatedTime: "6 minutes",
    confidence: 96
  }
];

const reportParameters = [
  {
    id: "date_range",
    label: "Date Range",
    type: "select",
    options: ["Last 7 days", "Last 30 days", "Last 90 days", "Year to date", "Custom"]
  },
  {
    id: "analysis_depth",
    label: "AI Analysis Depth",
    type: "select", 
    options: ["Quick Insights", "Standard Analysis", "Deep Learning", "Comprehensive AI"]
  },
  {
    id: "include_predictions",
    label: "Include Predictions",
    type: "select",
    options: ["None", "7-day forecast", "30-day forecast", "90-day forecast"]
  },
  {
    id: "confidence_threshold",
    label: "Confidence Threshold",
    type: "select",
    options: ["70%+", "80%+", "90%+", "95%+"]
  }
];

const aiInsights = [
  {
    type: "trend",
    title: "Revenue Growth Trend",
    description: "AI detected 23% month-over-month growth acceleration",
    confidence: 94,
    impact: "high",
    recommendation: "Increase inventory for top-performing products"
  },
  {
    type: "anomaly",
    title: "Weekend Performance Anomaly",
    description: "Saturday sales 45% above historical average",
    confidence: 87,
    impact: "medium",
    recommendation: "Investigate and replicate success factors"
  },
  {
    type: "optimization",
    title: "Staff Optimization Opportunity",
    description: "AI suggests 15% reduction in Monday morning staffing",
    confidence: 91,
    impact: "high",
    recommendation: "Adjust scheduling to reduce labor costs"
  },
  {
    type: "prediction",
    title: "Customer Churn Risk",
    description: "12 premium customers showing early churn signals",
    confidence: 88,
    impact: "high",
    recommendation: "Initiate targeted retention campaigns"
  }
];

interface SmartReportBuilderProps {
  onGenerateReport: (template: string, parameters: Record<string, string>) => void;
}

export function SmartReportBuilder({ onGenerateReport }: SmartReportBuilderProps) {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [parameters, setParameters] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "trend": return TrendingUp;
      case "anomaly": return AlertTriangle;
      case "optimization": return Target;
      case "prediction": return Brain;
      default: return BarChart3;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case "trend": return "text-success";
      case "anomaly": return "text-warning";
      case "optimization": return "text-primary";
      case "prediction": return "text-accent";
      default: return "text-muted-foreground";
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high": return <Badge variant="destructive">High Impact</Badge>;
      case "medium": return <Badge variant="outline" className="border-warning text-warning">Medium</Badge>;
      case "low": return <Badge variant="secondary">Low Impact</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const handleParameterChange = (parameterId: string, value: string) => {
    setParameters(prev => ({
      ...prev,
      [parameterId]: value
    }));
  };

  const handleGenerateReport = async () => {
    if (!selectedTemplate) return;
    
    setIsGenerating(true);
    
    // Simulate AI report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    onGenerateReport(selectedTemplate, parameters);
    setIsGenerating(false);
  };

  const selectedTemplateDetails = reportTemplates.find(t => t.id === selectedTemplate);

  return (
    <div className="space-y-6">
      {/* Report Template Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Report Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {reportTemplates.map((template) => (
              <div 
                key={template.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedTemplate === template.id 
                    ? "border-primary bg-primary/5" 
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{template.name}</h3>
                    <Badge variant="outline">{template.category}</Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {template.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      Est. time: {template.estimatedTime}
                    </span>
                    <span className="font-medium">
                      AI Confidence: {template.confidence}%
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {template.aiCapabilities.map((capability) => (
                      <Badge key={capability} variant="secondary" className="text-xs">
                        {capability}
                      </Badge>
                    ))}
                  </div>
                  
                  <Progress value={template.confidence} className="h-1" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Parameters */}
      {selectedTemplate && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Report Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {reportParameters.map((param) => (
                <div key={param.id} className="space-y-2">
                  <label className="text-sm font-medium">{param.label}</label>
                  <Select 
                    value={parameters[param.id] || ""} 
                    onValueChange={(value) => handleParameterChange(param.id, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={`Select ${param.label.toLowerCase()}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {param.options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>

            {selectedTemplateDetails && (
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Selected Template: {selectedTemplateDetails.name}</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {selectedTemplateDetails.description}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span>Estimated generation time: {selectedTemplateDetails.estimatedTime}</span>
                  <span>AI Confidence: {selectedTemplateDetails.confidence}%</span>
                </div>
              </div>
            )}

            <Button 
              onClick={handleGenerateReport}
              disabled={isGenerating || !selectedTemplate}
              className="w-full"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Brain className="h-4 w-4 mr-2 animate-spin" />
                  Generating AI Report...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Generate AI Report
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* AI Insights Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Live AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {aiInsights.map((insight, index) => {
            const IconComponent = getInsightIcon(insight.type);
            
            return (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <IconComponent className={`h-4 w-4 ${getInsightColor(insight.type)}`} />
                    <h4 className="font-medium">{insight.title}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    {getImpactBadge(insight.impact)}
                    <Badge variant="outline">{insight.confidence}%</Badge>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">
                  {insight.description}
                </p>
                
                <div className="flex items-center gap-2 text-xs">
                  <CheckCircle className="h-3 w-3 text-success" />
                  <span className="text-muted-foreground">
                    Recommendation: {insight.recommendation}
                  </span>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}