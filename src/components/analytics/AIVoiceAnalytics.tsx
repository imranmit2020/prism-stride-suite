import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Mic, Play, Pause, BarChart3, TrendingUp, AlertTriangle, Users, Phone, HeadphonesIcon } from "lucide-react";

export function AIVoiceAnalytics() {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Revolutionary voice analytics data
  const voiceInsights = [
    {
      id: 1,
      callId: "CALL-2024-001",
      customerSentiment: "Frustrated",
      emotionScore: 0.73,
      keyPhrases: ["refund", "disappointed", "terrible experience"],
      riskLevel: "high",
      resolution: "Escalate to manager",
      aiSuggestion: "Offer 15% discount + expedited shipping",
      confidence: 94
    },
    {
      id: 2,
      callId: "CALL-2024-002", 
      customerSentiment: "Satisfied",
      emotionScore: 0.85,
      keyPhrases: ["great service", "helpful", "recommend"],
      riskLevel: "low",
      resolution: "Upsell opportunity",
      aiSuggestion: "Suggest premium package",
      confidence: 88
    }
  ];

  const realTimeMetrics = {
    activeCallsAnalyzed: 47,
    avgSentimentScore: 0.68,
    escalationPrevented: 12,
    upsellOpportunities: 8,
    churnRiskDetected: 3,
    satisfactionImprovement: "+23%"
  };

  const voicePatterns = [
    { pattern: "Complaint Keywords", frequency: 156, trend: "down", impact: "high" },
    { pattern: "Appreciation Phrases", frequency: 342, trend: "up", impact: "positive" },
    { pattern: "Confusion Indicators", frequency: 89, trend: "stable", impact: "medium" },
    { pattern: "Urgency Signals", frequency: 67, trend: "up", impact: "high" }
  ];

  const handleStartRecording = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setIsAnalyzing(true);
      setTimeout(() => setIsAnalyzing(false), 3000);
    }, 5000);
  };

  return (
    <div className="space-y-6">
      {/* Real-time Voice Analytics Header */}
      <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <HeadphonesIcon className="h-6 w-6 text-primary" />
                AI Voice Analytics Engine
              </CardTitle>
              <CardDescription>
                Revolutionary real-time voice sentiment analysis with AI-powered insights
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={handleStartRecording}
                disabled={isRecording || isAnalyzing}
                className="relative"
              >
                {isRecording ? (
                  <>
                    <div className="animate-pulse h-3 w-3 bg-red-500 rounded-full mr-2" />
                    Recording...
                  </>
                ) : isAnalyzing ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4 mr-2" />
                    Start Analysis
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Live Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Active Calls Analyzed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{realTimeMetrics.activeCallsAnalyzed}</div>
            <p className="text-xs text-muted-foreground mt-1">Real-time processing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Avg Sentiment Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{(realTimeMetrics.avgSentimentScore * 100).toFixed(0)}%</div>
            <div className="text-xs text-green-600 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              {realTimeMetrics.satisfactionImprovement}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">AI Interventions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{realTimeMetrics.escalationPrevented}</div>
            <p className="text-xs text-muted-foreground mt-1">Escalations prevented</p>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Call Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Live Call Analysis
          </CardTitle>
          <CardDescription>
            Real-time sentiment analysis and AI recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {voiceInsights.map((insight) => (
              <div key={insight.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant={insight.riskLevel === 'high' ? 'destructive' : 'secondary'}>
                      {insight.callId}
                    </Badge>
                    <Badge variant="outline" className={
                      insight.customerSentiment === 'Frustrated' ? 'border-red-500 text-red-700' :
                      insight.customerSentiment === 'Satisfied' ? 'border-green-500 text-green-700' :
                      'border-yellow-500 text-yellow-700'
                    }>
                      {insight.customerSentiment}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Confidence: {insight.confidence}%
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Emotion Analysis</h4>
                    <Progress value={insight.emotionScore * 100} className="mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Score: {(insight.emotionScore * 100).toFixed(1)}%
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">AI Recommendation</h4>
                    <p className="text-sm bg-blue-50 p-2 rounded border-l-4 border-blue-500">
                      {insight.aiSuggestion}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Key Phrases Detected</h4>
                  <div className="flex flex-wrap gap-1">
                    {insight.keyPhrases.map((phrase, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        "{phrase}"
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Voice Pattern Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Voice Pattern Intelligence
          </CardTitle>
          <CardDescription>
            AI-detected communication patterns and trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {voicePatterns.map((pattern, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{pattern.pattern}</h4>
                  <p className="text-sm text-muted-foreground">
                    Detected {pattern.frequency} times this week
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={pattern.impact === 'high' ? 'destructive' : pattern.impact === 'positive' ? 'default' : 'secondary'}>
                    {pattern.impact}
                  </Badge>
                  <div className={`flex items-center gap-1 text-sm ${
                    pattern.trend === 'up' ? 'text-green-600' : 
                    pattern.trend === 'down' ? 'text-red-600' : 
                    'text-gray-600'
                  }`}>
                    {pattern.trend === 'up' ? '↗' : pattern.trend === 'down' ? '↙' : '→'}
                    {pattern.trend}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Action Center */}
      <Card className="border-2 border-amber-200 bg-amber-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-700">
            <AlertTriangle className="h-5 w-5" />
            AI Action Center
          </CardTitle>
          <CardDescription>
            Immediate actions recommended by AI analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
              <div>
                <h4 className="font-medium text-red-700">High Churn Risk Detected</h4>
                <p className="text-sm text-red-600">3 customers showing frustration patterns</p>
              </div>
              <Button size="sm" variant="destructive">
                Review Now
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div>
                <h4 className="font-medium text-green-700">Upsell Opportunities</h4>
                <p className="text-sm text-green-600">8 satisfied customers ready for premium offers</p>
              </div>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                Launch Campaign
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div>
                <h4 className="font-medium text-blue-700">Training Recommendation</h4>
                <p className="text-sm text-blue-600">Agent training needed on complaint handling</p>
              </div>
              <Button size="sm" variant="outline">
                Schedule Training
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}