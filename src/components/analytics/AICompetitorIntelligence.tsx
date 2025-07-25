import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, TrendingUp, AlertCircle, Eye, Search, Zap, Globe, DollarSign, Users } from "lucide-react";

export function AICompetitorIntelligence() {
  const [isScanning, setIsScanning] = useState(false);

  // Revolutionary competitor intelligence data
  const competitorData = [
    {
      id: 1,
      name: "TechCorp Solutions",
      marketShare: 24.3,
      threat: "high",
      recentActions: ["Price drop 15%", "New AI feature", "Marketing push"],
      sentimentChange: -0.12,
      customerMovement: "+234 from us",
      strengthScore: 8.2,
      weaknessScore: 6.1,
      aiPrediction: "Likely to launch major product update Q2"
    },
    {
      id: 2,
      name: "InnovateTech",
      marketShare: 18.7,
      threat: "medium",
      recentActions: ["Partnership with Google", "Team expansion", "Patent filing"],
      sentimentChange: +0.08,
      customerMovement: "-67 to us",
      strengthScore: 7.8,
      weaknessScore: 7.2,
      aiPrediction: "Focusing on enterprise segment expansion"
    },
    {
      id: 3,
      name: "StartupX",
      marketShare: 12.1,
      threat: "rising",
      recentActions: ["$50M funding", "Celebrity endorsement", "Viral campaign"],
      sentimentChange: +0.24,
      customerMovement: "+156 from market",
      strengthScore: 6.9,
      weaknessScore: 8.5,
      aiPrediction: "Rapid growth trajectory, watch closely"
    }
  ];

  const marketIntelligence = {
    totalMarketSize: "$2.4B",
    ourShare: 15.2,
    growthRate: "+12.3%",
    threatLevel: "moderate",
    opportunities: 7,
    emergingCompetitors: 3,
    marketTrends: ["AI automation", "Mobile-first", "Sustainability"]
  };

  const competitiveAlerts = [
    {
      id: 1,
      type: "pricing",
      competitor: "TechCorp Solutions",
      alert: "Major price reduction detected",
      impact: "high",
      action: "Review pricing strategy",
      confidence: 94,
      timeDetected: "2 hours ago"
    },
    {
      id: 2,
      type: "product",
      competitor: "InnovateTech",
      alert: "New AI feature announcement",
      impact: "medium",
      action: "Analyze feature gap",
      confidence: 87,
      timeDetected: "6 hours ago"
    },
    {
      id: 3,
      type: "marketing",
      competitor: "StartupX",
      alert: "Viral social campaign launched",
      impact: "rising",
      action: "Monitor engagement metrics",
      confidence: 91,
      timeDetected: "1 day ago"
    }
  ];

  const strategicRecommendations = [
    {
      title: "Immediate Price Response",
      priority: "urgent",
      impact: "high",
      effort: "low",
      description: "Counter TechCorp's pricing with strategic discount",
      expectedOutcome: "+2.1% market share",
      timeline: "1-2 weeks"
    },
    {
      title: "AI Feature Development",
      priority: "high",
      impact: "high",
      effort: "high",
      description: "Accelerate AI capabilities to match competitors",
      expectedOutcome: "Maintain competitive edge",
      timeline: "2-3 months"
    },
    {
      title: "Social Media Offensive",
      priority: "medium",
      impact: "medium",
      effort: "medium",
      description: "Launch counter-campaign to StartupX viral content",
      expectedOutcome: "+15% brand awareness",
      timeline: "2-4 weeks"
    }
  ];

  const handleStartScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* AI Competitor Intelligence Header */}
      <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Target className="h-6 w-6 text-orange-600" />
                AI Competitor Intelligence
              </CardTitle>
              <CardDescription>
                Revolutionary real-time competitive analysis with predictive insights
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={handleStartScan}
                disabled={isScanning}
                className="bg-orange-600 hover:bg-orange-700"
              >
                {isScanning ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Deep Scan
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Market Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{marketIntelligence.totalMarketSize}</div>
            <p className="text-xs text-muted-foreground mt-1">Total addressable market</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Our Market Share</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{marketIntelligence.ourShare}%</div>
            <div className="text-xs text-green-600 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              {marketIntelligence.growthRate}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Threat Level</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary" className="text-sm capitalize">
              {marketIntelligence.threatLevel}
            </Badge>
            <p className="text-xs text-muted-foreground mt-2">{marketIntelligence.emergingCompetitors} new threats</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{marketIntelligence.opportunities}</div>
            <p className="text-xs text-muted-foreground mt-1">Strategic openings</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="competitors" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="competitors">Competitor Analysis</TabsTrigger>
          <TabsTrigger value="alerts">Real-time Alerts</TabsTrigger>
          <TabsTrigger value="strategy">AI Strategy</TabsTrigger>
          <TabsTrigger value="trends">Market Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="competitors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Competitor Landscape
              </CardTitle>
              <CardDescription>
                AI-powered competitive analysis with predictive insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {competitorData.map((competitor) => (
                  <div key={competitor.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{competitor.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Market Share: {competitor.marketShare}%
                        </p>
                      </div>
                      <Badge variant={
                        competitor.threat === 'high' ? 'destructive' :
                        competitor.threat === 'rising' ? 'default' :
                        'secondary'
                      }>
                        {competitor.threat} threat
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Strength vs Weakness</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Strengths</span>
                            <span>{competitor.strengthScore}/10</span>
                          </div>
                          <Progress value={competitor.strengthScore * 10} className="h-2" />
                          <div className="flex items-center justify-between text-sm">
                            <span>Weaknesses</span>
                            <span>{competitor.weaknessScore}/10</span>
                          </div>
                          <Progress value={competitor.weaknessScore * 10} className="h-2 bg-red-100" />
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Recent Activity</h4>
                        <div className="space-y-1">
                          {competitor.recentActions.map((action, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs mr-1 mb-1">
                              {action}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          Customer movement: {competitor.customerMovement}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">AI Prediction</h4>
                        <p className="text-sm bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                          {competitor.aiPrediction}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Real-time Competitive Alerts
              </CardTitle>
              <CardDescription>
                AI-detected competitive movements requiring immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {competitiveAlerts.map((alert) => (
                  <div key={alert.id} className={`border rounded-lg p-4 ${
                    alert.impact === 'high' ? 'border-red-200 bg-red-50' :
                    alert.impact === 'rising' ? 'border-orange-200 bg-orange-50' :
                    'border-yellow-200 bg-yellow-50'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{alert.type}</Badge>
                        <span className="font-medium">{alert.competitor}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {alert.timeDetected}
                      </div>
                    </div>
                    
                    <h4 className="font-medium mb-1">{alert.alert}</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Recommended action: {alert.action}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Badge variant={
                          alert.impact === 'high' ? 'destructive' :
                          alert.impact === 'rising' ? 'default' :
                          'secondary'
                        }>
                          {alert.impact} impact
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Confidence: {alert.confidence}%
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Analyze
                        </Button>
                        <Button size="sm">
                          Take Action
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                AI Strategic Recommendations
              </CardTitle>
              <CardDescription>
                Data-driven strategies to outperform competitors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {strategicRecommendations.map((rec, idx) => (
                  <div key={idx} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{rec.title}</h3>
                      <Badge variant={
                        rec.priority === 'urgent' ? 'destructive' :
                        rec.priority === 'high' ? 'default' :
                        'secondary'
                      }>
                        {rec.priority}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground">{rec.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Impact:</span>
                        <Badge variant="outline" className="ml-2">
                          {rec.impact}
                        </Badge>
                      </div>
                      <div>
                        <span className="font-medium">Effort:</span>
                        <Badge variant="outline" className="ml-2">
                          {rec.effort}
                        </Badge>
                      </div>
                      <div>
                        <span className="font-medium">Timeline:</span>
                        <span className="ml-2 text-muted-foreground">{rec.timeline}</span>
                      </div>
                    </div>

                    <div className="bg-green-50 p-3 rounded border-l-4 border-green-500">
                      <span className="font-medium text-green-700">Expected Outcome: </span>
                      <span className="text-green-600">{rec.expectedOutcome}</span>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        Implement Strategy
                      </Button>
                      <Button size="sm" variant="outline">
                        Simulate Impact
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Market Trend Intelligence
              </CardTitle>
              <CardDescription>
                AI-detected market movements and emerging opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marketIntelligence.marketTrends.map((trend, idx) => (
                  <div key={idx} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold capitalize">{trend}</h3>
                      <Badge variant="default">Trending</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      AI analysis shows this trend gaining momentum across the industry
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Analyze Opportunity
                      </Button>
                      <Button size="sm">
                        Create Strategy
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}