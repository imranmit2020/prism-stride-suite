import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Map, Users, TrendingUp, AlertTriangle, Eye, Heart, ShoppingCart, Star, Clock, Zap } from "lucide-react";

export function AICustomerJourneyMapping() {
  const [selectedJourney, setSelectedJourney] = useState("conversion");

  // Revolutionary customer journey data
  const journeyStages = [
    {
      stage: "Awareness",
      customers: 12450,
      conversionRate: 23.5,
      avgTime: "3.2 days",
      dropOffRate: 76.5,
      emotions: ["curious", "interested"],
      touchpoints: ["Social Media", "Search", "Referral"],
      aiInsights: "Peak interest on Tuesday mornings"
    },
    {
      stage: "Consideration", 
      customers: 2926,
      conversionRate: 34.8,
      avgTime: "8.7 days",
      dropOffRate: 65.2,
      emotions: ["researching", "comparing"],
      touchpoints: ["Website", "Reviews", "Demo"],
      aiInsights: "Price sensitivity highest barrier"
    },
    {
      stage: "Purchase",
      customers: 1018,
      conversionRate: 67.3,
      avgTime: "2.1 days",
      dropOffRate: 32.7,
      emotions: ["confident", "eager"],
      touchpoints: ["Checkout", "Support", "Payment"],
      aiInsights: "Abandoned carts recoverable with 15% discount"
    },
    {
      stage: "Onboarding",
      customers: 685,
      conversionRate: 89.2,
      avgTime: "5.4 days",
      dropOffRate: 10.8,
      emotions: ["excited", "overwhelmed"],
      touchpoints: ["Welcome Email", "Tutorial", "Setup"],
      aiInsights: "Personalized tutorials increase completion by 34%"
    },
    {
      stage: "Retention",
      customers: 611,
      conversionRate: 78.4,
      avgTime: "ongoing",
      dropOffRate: 21.6,
      emotions: ["satisfied", "loyal"],
      touchpoints: ["Product", "Support", "Updates"],
      aiInsights: "Usage drops after 30 days without engagement"
    }
  ];

  const customerSegments = [
    {
      id: 1,
      name: "Tech Enthusiasts",
      size: 2847,
      conversionRate: 42.3,
      avgValue: "$2,450",
      journeyLength: "18 days",
      preferredChannels: ["Product Hunt", "Tech Blogs", "GitHub"],
      painPoints: ["Complex setup", "Limited documentation"],
      opportunities: ["Advanced features", "API access"],
      loyaltyScore: 8.7
    },
    {
      id: 2,
      name: "Business Professionals",
      size: 5234,
      conversionRate: 28.9,
      avgValue: "$890",
      journeyLength: "31 days",
      preferredChannels: ["LinkedIn", "Industry Reports", "Webinars"],
      painPoints: ["ROI justification", "Team training"],
      opportunities: ["Enterprise features", "Team plans"],
      loyaltyScore: 7.2
    },
    {
      id: 3,
      name: "Small Business Owners",
      size: 3156,
      conversionRate: 35.6,
      avgValue: "$340",
      journeyLength: "12 days",
      preferredChannels: ["Google Ads", "Facebook", "Word of mouth"],
      painPoints: ["Budget constraints", "Time limitations"],
      opportunities: ["Affordable plans", "Quick setup"],
      loyaltyScore: 6.8
    }
  ];

  const realTimeJourneyData = {
    activeVisitors: 847,
    currentStageDistribution: {
      awareness: 423,
      consideration: 198,
      purchase: 89,
      onboarding: 67,
      retention: 70
    },
    emergingPatterns: [
      "Mobile users 40% more likely to convert",
      "Video content increases engagement by 67%",
      "Chat support reduces abandon rate by 23%"
    ]
  };

  const journeyOptimizations = [
    {
      stage: "Awareness",
      issue: "High drop-off from social media",
      recommendation: "Create targeted content for each platform",
      impact: "+15% conversion",
      effort: "Medium",
      timeline: "2 weeks"
    },
    {
      stage: "Consideration",
      issue: "Long evaluation period",
      recommendation: "Implement progressive disclosure in demos",
      impact: "+23% faster decisions",
      effort: "High",
      timeline: "4 weeks"
    },
    {
      stage: "Purchase",
      issue: "Cart abandonment at payment",
      recommendation: "Add multiple payment options + trust badges",
      impact: "+18% completion",
      effort: "Low",
      timeline: "1 week"
    }
  ];

  return (
    <div className="space-y-6">
      {/* AI Customer Journey Header */}
      <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Map className="h-6 w-6 text-purple-600" />
                AI Customer Journey Intelligence
              </CardTitle>
              <CardDescription>
                Revolutionary customer journey mapping with predictive analytics and emotion tracking
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Eye className="h-4 w-4 mr-2" />
                Live Journey View
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Real-time Journey Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Active Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{realTimeJourneyData.activeVisitors}</div>
            <p className="text-xs text-muted-foreground mt-1">Currently navigating</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">In Consideration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{realTimeJourneyData.currentStageDistribution.consideration}</div>
            <p className="text-xs text-muted-foreground mt-1">Evaluating options</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Ready to Purchase</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{realTimeJourneyData.currentStageDistribution.purchase}</div>
            <p className="text-xs text-muted-foreground mt-1">High intent signals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">At Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">23</div>
            <p className="text-xs text-muted-foreground mt-1">Churn indicators</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="journey" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="journey">Journey Stages</TabsTrigger>
          <TabsTrigger value="segments">Customer Segments</TabsTrigger>
          <TabsTrigger value="emotions">Emotion Tracking</TabsTrigger>
          <TabsTrigger value="optimizations">AI Optimizations</TabsTrigger>
        </TabsList>

        <TabsContent value="journey" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5" />
                Customer Journey Flow
              </CardTitle>
              <CardDescription>
                AI-powered journey analysis with conversion optimization insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {journeyStages.map((stage, idx) => (
                  <div key={idx} className="relative">
                    {idx < journeyStages.length - 1 && (
                      <div className="absolute left-8 top-16 h-12 w-0.5 bg-gradient-to-b from-primary to-primary/30" />
                    )}
                    
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {idx + 1}
                      </div>
                      
                      <div className="flex-grow border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-lg">{stage.stage}</h3>
                          <div className="flex gap-2">
                            <Badge variant="outline">
                              {stage.customers.toLocaleString()} customers
                            </Badge>
                            <Badge variant={stage.conversionRate > 50 ? 'default' : stage.conversionRate > 30 ? 'secondary' : 'destructive'}>
                              {stage.conversionRate}% conversion
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <h4 className="font-medium mb-2">Performance</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Conversion Rate</span>
                                <span>{stage.conversionRate}%</span>
                              </div>
                              <Progress value={stage.conversionRate} className="h-2" />
                              <div className="text-xs text-muted-foreground">
                                Avg time: {stage.avgTime}
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Emotions</h4>
                            <div className="flex flex-wrap gap-1">
                              {stage.emotions.map((emotion, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  <Heart className="h-3 w-3 mr-1" />
                                  {emotion}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Touchpoints</h4>
                            <div className="flex flex-wrap gap-1">
                              {stage.touchpoints.map((touchpoint, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {touchpoint}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">AI Insight</h4>
                            <p className="text-xs bg-blue-50 p-2 rounded border-l-4 border-blue-500">
                              {stage.aiInsights}
                            </p>
                          </div>
                        </div>

                        {stage.dropOffRate > 50 && (
                          <div className="bg-red-50 p-3 rounded border-l-4 border-red-500">
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-red-600" />
                              <span className="font-medium text-red-700">High Drop-off Alert</span>
                            </div>
                            <p className="text-sm text-red-600 mt-1">
                              {stage.dropOffRate}% of customers are leaving at this stage
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="segments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Customer Segment Analysis
              </CardTitle>
              <CardDescription>
                AI-identified customer segments with journey insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customerSegments.map((segment) => (
                  <div key={segment.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{segment.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {segment.size.toLocaleString()} customers • {segment.conversionRate}% conversion
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="font-medium">{segment.loyaltyScore}/10</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Journey Metrics</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Avg Value:</span>
                            <span className="font-medium text-green-600">{segment.avgValue}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Journey Length:</span>
                            <span>{segment.journeyLength}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Conversion:</span>
                            <span>{segment.conversionRate}%</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Preferred Channels</h4>
                        <div className="flex flex-wrap gap-1">
                          {segment.preferredChannels.map((channel, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {channel}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Key Insights</h4>
                        <div className="space-y-2">
                          <div>
                            <span className="text-xs font-medium text-red-600">Pain Points:</span>
                            {segment.painPoints.map((pain, i) => (
                              <Badge key={i} variant="destructive" className="text-xs ml-1 mb-1">
                                {pain}
                              </Badge>
                            ))}
                          </div>
                          <div>
                            <span className="text-xs font-medium text-green-600">Opportunities:</span>
                            {segment.opportunities.map((opp, i) => (
                              <Badge key={i} variant="default" className="text-xs ml-1">
                                {opp}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emotions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Real-time Emotion Tracking
              </CardTitle>
              <CardDescription>
                AI-powered emotional analysis throughout the customer journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Current Emotional State Distribution</h3>
                    {[
                      { emotion: "Excited", percentage: 34, color: "bg-green-500" },
                      { emotion: "Curious", percentage: 28, color: "bg-blue-500" },
                      { emotion: "Frustrated", percentage: 18, color: "bg-red-500" },
                      { emotion: "Confused", percentage: 12, color: "bg-yellow-500" },
                      { emotion: "Satisfied", percentage: 8, color: "bg-purple-500" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded ${item.color}`} />
                        <span className="flex-grow">{item.emotion}</span>
                        <span className="font-medium">{item.percentage}%</span>
                        <Progress value={item.percentage} className="w-20 h-2" />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Emotion Triggers</h3>
                    <div className="space-y-3">
                      <div className="border rounded p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-green-600">Positive Triggers</span>
                          <Badge variant="default">+23%</Badge>
                        </div>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Quick loading times</li>
                          <li>• Personalized recommendations</li>
                          <li>• Instant support responses</li>
                        </ul>
                      </div>

                      <div className="border rounded p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-red-600">Negative Triggers</span>
                          <Badge variant="destructive">-15%</Badge>
                        </div>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Complex checkout process</li>
                          <li>• Hidden pricing</li>
                          <li>• Slow page loads</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-500">
                  <h4 className="font-medium text-blue-700 mb-2">AI Emotion Insights</h4>
                  <ul className="text-sm text-blue-600 space-y-1">
                    <li>• Customers show 40% more positive emotions on mobile devices</li>
                    <li>• Frustration peaks during payment flow (stage 3)</li>
                    <li>• Personalized onboarding increases excitement by 67%</li>
                    <li>• Video tutorials reduce confusion by 45%</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimizations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                AI Journey Optimizations
              </CardTitle>
              <CardDescription>
                Data-driven recommendations to improve customer journey performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {journeyOptimizations.map((opt, idx) => (
                  <div key={idx} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{opt.stage} Stage Optimization</h3>
                        <p className="text-sm text-red-600">{opt.issue}</p>
                      </div>
                      <Badge variant="outline">{opt.effort} effort</Badge>
                    </div>

                    <p className="text-sm text-muted-foreground">{opt.recommendation}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="bg-green-50 p-3 rounded">
                        <span className="font-medium text-green-700">Expected Impact:</span>
                        <div className="text-green-600 font-medium">{opt.impact}</div>
                      </div>
                      <div className="bg-blue-50 p-3 rounded">
                        <span className="font-medium text-blue-700">Timeline:</span>
                        <div className="text-blue-600 font-medium">{opt.timeline}</div>
                      </div>
                      <div className="bg-purple-50 p-3 rounded">
                        <span className="font-medium text-purple-700">Priority:</span>
                        <div className="text-purple-600 font-medium">High</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Implement Now
                      </Button>
                      <Button size="sm" variant="outline">
                        A/B Test First
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
      </Tabs>

      {/* Emerging Patterns */}
      <Card className="border-2 border-green-200 bg-green-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <TrendingUp className="h-5 w-5" />
            Emerging Journey Patterns
          </CardTitle>
          <CardDescription>
            AI-detected patterns that are reshaping customer behavior
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {realTimeJourneyData.emergingPatterns.map((pattern, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-white border border-green-200 rounded-lg">
                <span className="text-sm font-medium">{pattern}</span>
                <Button size="sm" variant="outline" className="border-green-500 text-green-700">
                  Leverage This
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}