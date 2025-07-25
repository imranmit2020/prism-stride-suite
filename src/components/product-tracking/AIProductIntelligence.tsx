import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useGlobalization } from "@/contexts/GlobalizationContext";
import { 
  Brain, 
  Zap, 
  Eye, 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb,
  Radar,
  Network,
  Cpu,
  Database,
  Globe
} from "lucide-react";

interface AIInsight {
  id: string;
  category: "market" | "technical" | "financial" | "risk" | "opportunity";
  title: string;
  description: string;
  confidence: number;
  impact: "high" | "medium" | "low";
  urgency: "immediate" | "short-term" | "long-term";
  recommendations: string[];
  dataPoints: number;
  trend: "positive" | "negative" | "neutral";
  prediction: {
    timeframe: string;
    probability: number;
    outcome: string;
  };
}

interface PatentAnalysis {
  id: string;
  technology: string;
  patentCount: number;
  riskLevel: number;
  competitorPatents: {
    company: string;
    patents: number;
    relevanceScore: number;
  }[];
  recommendations: string;
  ipOpportunities: string[];
}

interface CompetitiveEdge {
  id: string;
  feature: string;
  ourCapability: number;
  marketAverage: number;
  advantage: number;
  aiRecommendation: string;
  investmentRequired: number;
  timeToImplement: string;
}

export function AIProductIntelligence() {
  const { formatCurrency } = useGlobalization();

  const [aiInsights] = useState<AIInsight[]>([
    {
      id: "1",
      category: "market",
      title: "Emerging Voice Control Demand",
      description: "AI detects 340% increase in voice control feature searches across smart home devices",
      confidence: 94,
      impact: "high",
      urgency: "immediate",
      recommendations: [
        "Accelerate voice AI integration development",
        "Partner with major voice platforms",
        "Conduct voice UX testing with 500+ users"
      ],
      dataPoints: 12500,
      trend: "positive",
      prediction: {
        timeframe: "6 months",
        probability: 87,
        outcome: "Voice control will become primary interface for 65% of users"
      }
    },
    {
      id: "2",
      category: "technical",
      title: "Edge Computing Opportunity",
      description: "Neural network analysis suggests 45% performance improvement with edge processing",
      confidence: 89,
      impact: "high",
      urgency: "short-term",
      recommendations: [
        "Implement edge computing architecture",
        "Optimize local AI processing",
        "Reduce cloud dependency by 60%"
      ],
      dataPoints: 8900,
      trend: "positive",
      prediction: {
        timeframe: "12 months",
        probability: 92,
        outcome: "Edge processing will enable real-time responses under 50ms"
      }
    },
    {
      id: "3",
      category: "financial",
      title: "Cost Optimization Detected",
      description: "AI identifies manufacturing cost reduction opportunity through supplier optimization",
      confidence: 91,
      impact: "medium",
      urgency: "short-term",
      recommendations: [
        "Negotiate with top 3 alternative suppliers",
        "Implement lean manufacturing protocols",
        "Automate quality control processes"
      ],
      dataPoints: 5600,
      trend: "positive",
      prediction: {
        timeframe: "8 months",
        probability: 85,
        outcome: "Manufacturing costs reduced by 18% while maintaining quality"
      }
    },
    {
      id: "4",
      category: "risk",
      title: "Regulatory Compliance Alert",
      description: "New privacy regulations in EU may affect data collection features",
      confidence: 96,
      impact: "high",
      urgency: "immediate",
      recommendations: [
        "Implement privacy-by-design principles",
        "Conduct GDPR compliance audit",
        "Develop opt-in data collection flows"
      ],
      dataPoints: 3200,
      trend: "negative",
      prediction: {
        timeframe: "3 months",
        probability: 98,
        outcome: "Non-compliance could result in €20M penalties and launch delays"
      }
    }
  ]);

  const [patentAnalysis] = useState<PatentAnalysis[]>([
    {
      id: "1",
      technology: "Smart Home Mesh Networking",
      patentCount: 1247,
      riskLevel: 65,
      competitorPatents: [
        { company: "TechGiant Corp", patents: 89, relevanceScore: 87 },
        { company: "InnovateTech", patents: 56, relevanceScore: 73 },
        { company: "SmartSystems Ltd", patents: 34, relevanceScore: 91 }
      ],
      recommendations: "Focus on proprietary mesh optimization algorithms. File defensive patents in Q1.",
      ipOpportunities: [
        "Mesh network auto-healing algorithms",
        "Energy-efficient device discovery protocols",
        "Cross-vendor compatibility standards"
      ]
    },
    {
      id: "2",
      technology: "AI-Powered Voice Recognition",
      patentCount: 2341,
      riskLevel: 78,
      competitorPatents: [
        { company: "VoiceAI Inc", patents: 234, relevanceScore: 94 },
        { company: "AudioTech", patents: 187, relevanceScore: 82 },
        { company: "SpeechWorks", patents: 98, relevanceScore: 76 }
      ],
      recommendations: "High patent density area. Consider licensing agreements or alternative approaches.",
      ipOpportunities: [
        "Context-aware voice commands",
        "Multi-language voice training",
        "Privacy-preserving voice processing"
      ]
    }
  ]);

  const [competitiveEdges] = useState<CompetitiveEdge[]>([
    {
      id: "1",
      feature: "Battery Life Optimization",
      ourCapability: 45,
      marketAverage: 28,
      advantage: 60,
      aiRecommendation: "Strong competitive advantage. Consider premium pricing strategy.",
      investmentRequired: 150000,
      timeToImplement: "4 months"
    },
    {
      id: "2",
      feature: "Setup Simplicity Score",
      ourCapability: 82,
      marketAverage: 65,
      advantage: 26,
      aiRecommendation: "Moderate advantage. Focus on marketing this differentiator.",
      investmentRequired: 75000,
      timeToImplement: "2 months"
    },
    {
      id: "3",
      feature: "Cross-Platform Integration",
      ourCapability: 34,
      marketAverage: 58,
      advantage: -41,
      aiRecommendation: "Critical gap. Immediate investment required to reach market parity.",
      investmentRequired: 450000,
      timeToImplement: "8 months"
    }
  ]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "market": return <Globe className="h-4 w-4" />;
      case "technical": return <Cpu className="h-4 w-4" />;
      case "financial": return <TrendingUp className="h-4 w-4" />;
      case "risk": return <AlertTriangle className="h-4 w-4" />;
      case "opportunity": return <Lightbulb className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "market": return "text-blue-600 bg-blue-50";
      case "technical": return "text-green-600 bg-green-50";
      case "financial": return "text-purple-600 bg-purple-50";
      case "risk": return "text-red-600 bg-red-50";
      case "opportunity": return "text-orange-600 bg-orange-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "text-red-600";
      case "medium": return "text-yellow-600";
      case "low": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "immediate": return "text-red-600 bg-red-50";
      case "short-term": return "text-yellow-600 bg-yellow-50";
      case "long-term": return "text-green-600 bg-green-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "positive": return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "negative": return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
      default: return <TrendingUp className="h-4 w-4 text-gray-400 rotate-90" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Intelligence Overview */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-blue-700">
              <Brain className="h-5 w-5 mr-2" />
              AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{aiInsights.length}</div>
            <p className="text-sm text-blue-600 mt-1">Active Intelligence Reports</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-green-700">
              <Database className="h-5 w-5 mr-2" />
              Data Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">
              {(aiInsights.reduce((acc, insight) => acc + insight.dataPoints, 0) / 1000).toFixed(1)}K
            </div>
            <p className="text-sm text-green-600 mt-1">Analyzed Data Points</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-purple-700">
              <Target className="h-5 w-5 mr-2" />
              Avg Confidence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">
              {Math.round(aiInsights.reduce((acc, insight) => acc + insight.confidence, 0) / aiInsights.length)}%
            </div>
            <p className="text-sm text-purple-600 mt-1">Intelligence Accuracy</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-orange-700">
              <Radar className="h-5 w-5 mr-2" />
              High Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">
              {aiInsights.filter(insight => insight.impact === "high").length}
            </div>
            <p className="text-sm text-orange-600 mt-1">Critical Insights</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            Real-Time AI Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {aiInsights.map((insight) => (
            <div key={insight.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge className={getCategoryColor(insight.category)}>
                    {getCategoryIcon(insight.category)}
                    <span className="ml-1">{insight.category.toUpperCase()}</span>
                  </Badge>
                  <h4 className="font-semibold">{insight.title}</h4>
                  {getTrendIcon(insight.trend)}
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getUrgencyColor(insight.urgency)}>
                    {insight.urgency}
                  </Badge>
                  <Badge variant="outline" className={getImpactColor(insight.impact)}>
                    {insight.impact.toUpperCase()} IMPACT
                  </Badge>
                </div>
              </div>
              
              <p className="text-muted-foreground">{insight.description}</p>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">AI Confidence:</span>
                  <div className="flex items-center mt-1">
                    <Progress value={insight.confidence} className="flex-1 mr-2" />
                    <span className="font-medium">{insight.confidence}%</span>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Data Points:</span>
                  <p className="font-medium">{insight.dataPoints.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Prediction Probability:</span>
                  <p className="font-medium">{insight.prediction.probability}%</p>
                </div>
              </div>

              <Alert className="bg-blue-50 border-blue-200">
                <Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  <strong>AI Prediction ({insight.prediction.timeframe}):</strong> {insight.prediction.outcome}
                </AlertDescription>
              </Alert>

              <div className="bg-gray-50 rounded p-3 text-sm">
                <strong className="text-gray-900">AI Recommendations:</strong>
                <ul className="mt-2 space-y-1">
                  {insight.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Zap className="h-3 w-3 text-blue-500" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Patent Intelligence */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Network className="h-5 w-5 mr-2" />
            Patent & IP Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {patentAnalysis.map((patent) => (
            <div key={patent.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{patent.technology}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {patent.patentCount} related patents
                  </span>
                  <Badge 
                    variant="outline" 
                    className={patent.riskLevel > 70 ? "text-red-600" : patent.riskLevel > 40 ? "text-yellow-600" : "text-green-600"}
                  >
                    Risk: {patent.riskLevel}%
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium mb-2">Competitor Patent Holdings</h5>
                  <div className="space-y-2">
                    {patent.competitorPatents.map((comp, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span>{comp.company}</span>
                        <div className="flex items-center gap-2">
                          <span>{comp.patents} patents</span>
                          <span className="text-muted-foreground">({comp.relevanceScore}% relevant)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="font-medium mb-2">IP Opportunities</h5>
                  <ul className="space-y-1 text-sm">
                    {patent.ipOpportunities.map((opportunity, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Lightbulb className="h-3 w-3 text-yellow-500" />
                        <span>{opportunity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <Alert className="bg-yellow-50 border-yellow-200">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>AI Recommendation:</strong> {patent.recommendations}
                </AlertDescription>
              </Alert>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Competitive Intelligence */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Eye className="h-5 w-5 mr-2" />
            Competitive Edge Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {competitiveEdges.map((edge) => (
            <div key={edge.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{edge.feature}</h4>
                <Badge 
                  variant="outline" 
                  className={edge.advantage > 20 ? "text-green-600" : edge.advantage > 0 ? "text-yellow-600" : "text-red-600"}
                >
                  {edge.advantage > 0 ? "+" : ""}{edge.advantage}% vs Market
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Our Capability:</span>
                  <div className="flex items-center mt-1">
                    <Progress value={edge.ourCapability} className="flex-1 mr-2" />
                    <span className="font-medium">{edge.ourCapability}</span>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Market Average:</span>
                  <div className="flex items-center mt-1">
                    <Progress value={edge.marketAverage} className="flex-1 mr-2" />
                    <span className="font-medium">{edge.marketAverage}</span>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Investment Required:</span>
                  <p className="font-medium">{formatCurrency(edge.investmentRequired)}</p>
                  <p className="text-muted-foreground">{edge.timeToImplement}</p>
                </div>
              </div>
              
              <Alert className="bg-blue-50 border-blue-200">
                <Brain className="h-4 w-4" />
                <AlertDescription>
                  <strong>AI Strategic Recommendation:</strong> {edge.aiRecommendation}
                </AlertDescription>
              </Alert>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AI Actions */}
      <div className="flex gap-4">
        <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
          <Brain className="h-4 w-4 mr-2" />
          Generate Deep Analysis
        </Button>
        <Button variant="outline" className="flex-1">
          <Target className="h-4 w-4 mr-2" />
          Run Competitive Scan
        </Button>
        <Button variant="outline" className="flex-1">
          <Network className="h-4 w-4 mr-2" />
          Patent Risk Assessment
        </Button>
      </div>
    </div>
  );
}