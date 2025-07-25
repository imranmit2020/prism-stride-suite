import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useGlobalization } from "@/contexts/GlobalizationContext";
import { 
  TrendingUp, 
  TrendingDown, 
  MessageCircle, 
  Heart, 
  ThumbsUp, 
  ThumbsDown,
  Brain,
  Globe,
  Eye,
  Zap,
  AlertTriangle,
  Star,
  Users,
  Calendar,
  BarChart3
} from "lucide-react";

interface SentimentData {
  id: string;
  platform: string;
  source: "social_media" | "reviews" | "forums" | "news" | "support_tickets";
  sentiment: "positive" | "negative" | "neutral";
  score: number;
  confidence: number;
  mentions: number;
  engagement: number;
  keywords: string[];
  aiAnalysis: {
    emotion: string;
    intent: string;
    urgency: "low" | "medium" | "high";
    actionable: boolean;
  };
  timeline: string;
  impact: "high" | "medium" | "low";
}

interface EmotionAnalysis {
  emotion: string;
  percentage: number;
  trend: "increasing" | "decreasing" | "stable";
  triggers: string[];
  color: string;
}

interface CompetitorSentiment {
  competitor: string;
  ourProduct: number;
  theirProduct: number;
  gap: number;
  aiInsight: string;
  opportunity: string;
}

interface TrendPrediction {
  topic: string;
  currentMomentum: number;
  predictedGrowth: number;
  timeframe: string;
  confidence: number;
  aiRecommendation: string;
}

export function MarketSentimentTracker() {
  const { formatCurrency } = useGlobalization();

  const [sentimentData] = useState<SentimentData[]>([
    {
      id: "1",
      platform: "Twitter",
      source: "social_media",
      sentiment: "positive",
      score: 82,
      confidence: 94,
      mentions: 2847,
      engagement: 156000,
      keywords: ["smart home", "voice control", "easy setup", "reliable"],
      aiAnalysis: {
        emotion: "excitement",
        intent: "purchase_consideration",
        urgency: "medium",
        actionable: true
      },
      timeline: "Last 24h",
      impact: "high"
    },
    {
      id: "2",
      platform: "Amazon Reviews",
      source: "reviews",
      sentiment: "negative",
      score: 23,
      confidence: 89,
      mentions: 156,
      engagement: 8900,
      keywords: ["connectivity issues", "setup problems", "support response"],
      aiAnalysis: {
        emotion: "frustration",
        intent: "complaint_resolution",
        urgency: "high",
        actionable: true
      },
      timeline: "Last 7d",
      impact: "high"
    },
    {
      id: "3",
      platform: "Reddit",
      source: "forums",
      sentiment: "positive",
      score: 76,
      confidence: 91,
      mentions: 489,
      engagement: 23400,
      keywords: ["competitor comparison", "value for money", "features"],
      aiAnalysis: {
        emotion: "satisfaction",
        intent: "recommendation",
        urgency: "low",
        actionable: false
      },
      timeline: "Last 3d",
      impact: "medium"
    },
    {
      id: "4",
      platform: "Tech News",
      source: "news",
      sentiment: "neutral",
      score: 58,
      confidence: 87,
      mentions: 234,
      engagement: 45600,
      keywords: ["market analysis", "innovation", "smart home trend"],
      aiAnalysis: {
        emotion: "analytical",
        intent: "information_seeking",
        urgency: "low",
        actionable: false
      },
      timeline: "Last 2d",
      impact: "medium"
    }
  ]);

  const [emotionAnalysis] = useState<EmotionAnalysis[]>([
    { emotion: "Excitement", percentage: 34, trend: "increasing", triggers: ["new features", "voice control"], color: "text-green-600" },
    { emotion: "Frustration", percentage: 28, trend: "stable", triggers: ["setup issues", "connectivity"], color: "text-red-600" },
    { emotion: "Satisfaction", percentage: 22, trend: "increasing", triggers: ["performance", "reliability"], color: "text-blue-600" },
    { emotion: "Curiosity", percentage: 16, trend: "decreasing", triggers: ["upcoming features", "comparisons"], color: "text-purple-600" }
  ]);

  const [competitorSentiment] = useState<CompetitorSentiment[]>([
    {
      competitor: "TechRival Pro",
      ourProduct: 76,
      theirProduct: 68,
      gap: 8,
      aiInsight: "We lead in ease of setup and voice recognition",
      opportunity: "Leverage setup simplicity in marketing campaigns"
    },
    {
      competitor: "SmartHome Elite",
      ourProduct: 71,
      theirProduct: 84,
      gap: -13,
      aiInsight: "They excel in ecosystem integration",
      opportunity: "Invest in broader platform compatibility"
    },
    {
      competitor: "HomeGenius",
      ourProduct: 79,
      theirProduct: 62,
      gap: 17,
      aiInsight: "Strong lead in AI capabilities and learning",
      opportunity: "Emphasize AI intelligence in positioning"
    }
  ]);

  const [trendPredictions] = useState<TrendPrediction[]>([
    {
      topic: "Voice Privacy Concerns",
      currentMomentum: 67,
      predictedGrowth: 85,
      timeframe: "Next 3 months",
      confidence: 92,
      aiRecommendation: "Proactively address privacy with transparent data policies"
    },
    {
      topic: "Energy Efficiency Focus",
      currentMomentum: 54,
      predictedGrowth: 78,
      timeframe: "Next 6 months",
      confidence: 88,
      aiRecommendation: "Highlight low power consumption and green features"
    },
    {
      topic: "Multi-Platform Integration",
      currentMomentum: 71,
      predictedGrowth: 89,
      timeframe: "Next 4 months",
      confidence: 91,
      aiRecommendation: "Accelerate partnerships with major ecosystems"
    }
  ]);

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return <ThumbsUp className="h-4 w-4 text-green-600" />;
      case "negative": return <ThumbsDown className="h-4 w-4 text-red-600" />;
      default: return <MessageCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return "text-green-600 bg-green-50";
      case "negative": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "text-red-600 bg-red-50";
      case "medium": return "text-yellow-600 bg-yellow-50";
      case "low": return "text-green-600 bg-green-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing": return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "decreasing": return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <BarChart3 className="h-4 w-4 text-gray-600" />;
    }
  };

  const overallSentiment = Math.round(sentimentData.reduce((acc, data) => acc + data.score, 0) / sentimentData.length);
  const totalMentions = sentimentData.reduce((acc, data) => acc + data.mentions, 0);
  const avgConfidence = Math.round(sentimentData.reduce((acc, data) => acc + data.confidence, 0) / sentimentData.length);
  const actionableInsights = sentimentData.filter(data => data.aiAnalysis.actionable).length;

  return (
    <div className="space-y-6">
      {/* Sentiment Overview */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-blue-700">
              <Heart className="h-5 w-5 mr-2" />
              Overall Sentiment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{overallSentiment}%</div>
            <Progress value={overallSentiment} className="mt-2" />
            <p className="text-sm text-blue-600 mt-1">Market Positivity</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-green-700">
              <MessageCircle className="h-5 w-5 mr-2" />
              Total Mentions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{(totalMentions / 1000).toFixed(1)}K</div>
            <p className="text-sm text-green-600 mt-1">Cross-Platform Discussions</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-purple-700">
              <Brain className="h-5 w-5 mr-2" />
              AI Confidence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">{avgConfidence}%</div>
            <Progress value={avgConfidence} className="mt-2" />
            <p className="text-sm text-purple-600 mt-1">Analysis Accuracy</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-orange-700">
              <Zap className="h-5 w-5 mr-2" />
              Actionable Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">{actionableInsights}</div>
            <p className="text-sm text-orange-600 mt-1">Require Immediate Action</p>
          </CardContent>
        </Card>
      </div>

      {/* Real-Time Sentiment Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            Real-Time Sentiment Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {sentimentData.map((data) => (
            <div key={data.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge className={getSentimentColor(data.sentiment)}>
                    {getSentimentIcon(data.sentiment)}
                    <span className="ml-1">{data.sentiment.toUpperCase()}</span>
                  </Badge>
                  <h4 className="font-semibold">{data.platform}</h4>
                  <span className="text-sm text-muted-foreground">{data.timeline}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getUrgencyColor(data.aiAnalysis.urgency)}>
                    {data.aiAnalysis.urgency.toUpperCase()}
                  </Badge>
                  {data.aiAnalysis.actionable && (
                    <Badge variant="outline" className="text-red-600">
                      ACTION REQUIRED
                    </Badge>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Sentiment Score:</span>
                  <div className="flex items-center mt-1">
                    <Progress value={data.score} className="flex-1 mr-2" />
                    <span className="font-medium">{data.score}%</span>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Mentions:</span>
                  <p className="font-medium">{data.mentions.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Engagement:</span>
                  <p className="font-medium">{(data.engagement / 1000).toFixed(1)}K</p>
                </div>
                <div>
                  <span className="text-muted-foreground">AI Confidence:</span>
                  <p className="font-medium">{data.confidence}%</p>
                </div>
              </div>

              <div className="bg-blue-50 rounded p-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong className="text-blue-900">Emotional Analysis:</strong>
                    <p className="text-blue-800">
                      {data.aiAnalysis.emotion} → {data.aiAnalysis.intent}
                    </p>
                  </div>
                  <div>
                    <strong className="text-blue-900">Key Keywords:</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {data.keywords.map((keyword, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Emotion Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Heart className="h-5 w-5 mr-2" />
            AI Emotional Intelligence Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              {emotionAnalysis.map((emotion, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{emotion.emotion}</span>
                      {getTrendIcon(emotion.trend)}
                    </div>
                    <span className={`font-bold ${emotion.color}`}>{emotion.percentage}%</span>
                  </div>
                  <Progress value={emotion.percentage} className="mb-2" />
                  <div className="text-xs text-muted-foreground">
                    <strong>Triggers:</strong> {emotion.triggers.join(", ")}
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <Alert className="bg-purple-50 border-purple-200">
                <Brain className="h-4 w-4" />
                <AlertDescription>
                  <strong>AI Emotional Insight:</strong> Excitement is growing (+12% this week) driven by voice control anticipation. Address frustration with connectivity by releasing setup improvement guide.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Competitor Sentiment Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Eye className="h-5 w-5 mr-2" />
            Competitive Sentiment Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {competitorSentiment.map((comp, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{comp.competitor}</h4>
                <Badge 
                  variant="outline" 
                  className={comp.gap > 0 ? "text-green-600" : "text-red-600"}
                >
                  {comp.gap > 0 ? "+" : ""}{comp.gap}% vs Us
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Our Product Sentiment:</span>
                  <div className="flex items-center mt-1">
                    <Progress value={comp.ourProduct} className="flex-1 mr-2" />
                    <span className="font-medium">{comp.ourProduct}%</span>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Their Product Sentiment:</span>
                  <div className="flex items-center mt-1">
                    <Progress value={comp.theirProduct} className="flex-1 mr-2" />
                    <span className="font-medium">{comp.theirProduct}%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 rounded p-3 text-sm">
                <div><strong className="text-yellow-900">AI Insight:</strong> {comp.aiInsight}</div>
                <div className="mt-1"><strong className="text-yellow-900">Opportunity:</strong> {comp.opportunity}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Trend Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            AI Trend Prediction Engine
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {trendPredictions.map((trend, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{trend.topic}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{trend.timeframe}</span>
                  <Badge variant="outline">
                    {trend.confidence}% Confidence
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Current Momentum:</span>
                  <div className="flex items-center mt-1">
                    <Progress value={trend.currentMomentum} className="flex-1 mr-2" />
                    <span className="font-medium">{trend.currentMomentum}%</span>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Predicted Growth:</span>
                  <div className="flex items-center mt-1">
                    <Progress value={trend.predictedGrowth} className="flex-1 mr-2" />
                    <span className="font-medium text-green-600">{trend.predictedGrowth}%</span>
                  </div>
                </div>
              </div>
              
              <Alert className="bg-green-50 border-green-200">
                <Zap className="h-4 w-4" />
                <AlertDescription>
                  <strong>AI Strategic Recommendation:</strong> {trend.aiRecommendation}
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
          Generate Sentiment Report
        </Button>
        <Button variant="outline" className="flex-1">
          <Globe className="h-4 w-4 mr-2" />
          Monitor Competitor Mentions
        </Button>
        <Button variant="outline" className="flex-1">
          <TrendingUp className="h-4 w-4 mr-2" />
          Predict Market Shifts
        </Button>
      </div>
    </div>
  );
}