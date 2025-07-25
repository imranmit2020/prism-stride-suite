import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, MessageSquare, Users, TrendingUp, AlertCircle, Share, Download, Eye, Clock } from "lucide-react";

export function AIStorytellingReports() {
  const [selectedStory, setSelectedStory] = useState(null);

  // Revolutionary AI story-driven reports
  const dataStories = [
    {
      id: 1,
      title: "The Great Mobile Revolution",
      subtitle: "How mobile users transformed our business in 90 days",
      category: "Customer Behavior",
      readTime: "4 min read",
      insight: "Revolutionary shift in user behavior patterns",
      audience: "C-Suite",
      engagement: 94,
      story: {
        chapters: [
          {
            title: "The Discovery",
            content: "It started with a simple anomaly in our data. Mobile traffic had quietly been growing, but something remarkable happened in Q3...",
            dataPoint: "+245% mobile engagement",
            visual: "trend-chart"
          },
          {
            title: "The Investigation", 
            content: "Our AI detected patterns humans missed. Mobile users weren't just browsing - they were completing complex purchases at unprecedented rates...",
            dataPoint: "67% mobile conversion rate",
            visual: "conversion-funnel"
          },
          {
            title: "The Revelation",
            content: "The data revealed a new customer archetype: the 'Mobile-First Professional' - highly engaged, decision-makers who complete entire purchase journeys on mobile...",
            dataPoint: "$2.3M mobile revenue",
            visual: "segment-analysis"
          },
          {
            title: "The Transformation",
            content: "Armed with these insights, we restructured our entire strategy. The results were immediate and dramatic...",
            dataPoint: "+156% overall growth",
            visual: "growth-metrics"
          }
        ],
        conclusion: "This story demonstrates how AI-powered insights can reveal hidden opportunities that transform business strategy.",
        actionItems: [
          "Prioritize mobile-first design across all touchpoints",
          "Develop mobile-specific customer journey optimizations",
          "Allocate 60% of marketing budget to mobile channels"
        ]
      }
    },
    {
      id: 2,
      title: "The Customer Whisperer",
      subtitle: "How AI predicted and prevented $500K in churn",
      category: "Retention Analysis",
      readTime: "5 min read",
      insight: "Predictive customer behavior modeling",
      audience: "Product Team",
      engagement: 89,
      story: {
        chapters: [
          {
            title: "The Warning Signs",
            content: "Our AI detected subtle behavioral shifts weeks before customers showed obvious churn signals...",
            dataPoint: "23 early warning indicators",
            visual: "prediction-model"
          },
          {
            title: "The Pattern Recognition",
            content: "Machine learning identified three distinct churn pathways, each requiring different intervention strategies...",
            dataPoint: "91% prediction accuracy",
            visual: "pathway-analysis"
          },
          {
            title: "The Intervention",
            content: "Automated personalized outreach triggered at optimal moments resulted in remarkable retention improvements...",
            dataPoint: "78% retention rate",
            visual: "intervention-results"
          },
          {
            title: "The Success",
            content: "By listening to what the data was telling us, we not only saved existing customers but turned many into advocates...",
            dataPoint: "$500K churn prevented",
            visual: "financial-impact"
          }
        ],
        conclusion: "AI doesn't just predict the future - it helps us change it for the better.",
        actionItems: [
          "Implement early warning system across all customer touchpoints",
          "Create personalized retention campaigns",
          "Train customer success team on AI insights"
        ]
      }
    },
    {
      id: 3,
      title: "The Pricing Paradox",
      subtitle: "Why raising prices actually increased our sales",
      category: "Pricing Strategy",
      readTime: "3 min read", 
      insight: "Counter-intuitive market dynamics",
      audience: "Revenue Team",
      engagement: 96,
      story: {
        chapters: [
          {
            title: "The Bold Decision",
            content: "Against conventional wisdom, our AI recommended a 20% price increase during a competitive pricing war...",
            dataPoint: "+20% price increase",
            visual: "pricing-strategy"
          },
          {
            title: "The Market Response",
            content: "Instead of losing customers, we attracted a new segment that valued quality over price...",
            dataPoint: "+34% new premium customers",
            visual: "customer-segments"
          },
          {
            title: "The Competitive Advantage",
            content: "Higher prices positioned us as the premium choice, creating a psychological value perception...",
            dataPoint: "87% brand preference",
            visual: "brand-positioning"
          },
          {
            title: "The Profit Explosion",
            content: "The combination of higher margins and volume growth created unprecedented profitability...",
            dataPoint: "+145% profit margin",
            visual: "profit-analysis"
          }
        ],
        conclusion: "Sometimes the best strategy is the one that seems counterintuitive - if the data supports it.",
        actionItems: [
          "Implement value-based pricing across product lines",
          "Develop premium service tier",
          "Communicate quality differentiation"
        ]
      }
    }
  ];

  const storyMetrics = {
    totalStories: 47,
    avgEngagement: 87,
    executiveReads: 156,
    actionsImplemented: 23,
    revenueImpact: "$2.1M"
  };

  const audienceInsights = [
    { role: "C-Suite", preferences: ["Executive summaries", "Financial impact", "Strategic insights"], engagement: 92 },
    { role: "Product Team", preferences: ["User behavior", "Feature analysis", "Performance metrics"], engagement: 88 },
    { role: "Marketing", preferences: ["Campaign results", "Customer segments", "Channel effectiveness"], engagement: 94 },
    { role: "Sales", preferences: ["Pipeline analysis", "Conversion insights", "Territory performance"], engagement: 85 }
  ];

  return (
    <div className="space-y-6">
      {/* AI Storytelling Header */}
      <Card className="border-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-indigo-600" />
                AI Data Storytelling Engine
              </CardTitle>
              <CardDescription>
                Revolutionary narrative-driven reports that transform data into compelling business stories
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <MessageSquare className="h-4 w-4 mr-2" />
                Create Story
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Storytelling Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Stories Created</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-600">{storyMetrics.totalStories}</div>
            <p className="text-xs text-muted-foreground mt-1">AI-generated narratives</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Avg Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{storyMetrics.avgEngagement}%</div>
            <p className="text-xs text-muted-foreground mt-1">Reader completion rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Executive Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{storyMetrics.executiveReads}</div>
            <p className="text-xs text-muted-foreground mt-1">C-suite engagement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Actions Taken</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{storyMetrics.actionsImplemented}</div>
            <p className="text-xs text-muted-foreground mt-1">From story insights</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Revenue Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{storyMetrics.revenueImpact}</div>
            <p className="text-xs text-muted-foreground mt-1">From implemented actions</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="stories" className="w-full">
        <TabsList className="flex flex-wrap h-auto items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-full gap-1">
          <TabsTrigger value="stories">Data Stories</TabsTrigger>
          <TabsTrigger value="reader">Story Reader</TabsTrigger>
          <TabsTrigger value="analytics">Story Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="stories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                AI-Generated Data Stories
              </CardTitle>
              <CardDescription>
                Compelling narratives that make complex data insights accessible and actionable
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dataStories.map((story) => (
                  <div key={story.id} className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow cursor-pointer"
                       onClick={() => setSelectedStory(story)}>
                    <div className="flex items-start justify-between">
                      <Badge variant="outline">{story.category}</Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {story.readTime}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg leading-tight">{story.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{story.subtitle}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Engagement</span>
                        <span className="font-medium">{story.engagement}%</span>
                      </div>
                      <Progress value={story.engagement} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        For {story.audience}
                      </Badge>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Share className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-2 rounded text-xs text-blue-700">
                      <strong>Key Insight:</strong> {story.insight}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reader" className="space-y-4">
          {selectedStory ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{selectedStory.title}</CardTitle>
                    <CardDescription className="text-lg mt-1">{selectedStory.subtitle}</CardDescription>
                    <div className="flex items-center gap-4 mt-3">
                      <Badge variant="outline">{selectedStory.category}</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {selectedStory.readTime}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        {selectedStory.audience}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Story Chapters */}
                {selectedStory.story.chapters.map((chapter, idx) => (
                  <div key={idx} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {idx + 1}
                      </div>
                      <h3 className="text-xl font-semibold">{chapter.title}</h3>
                    </div>
                    
                    <div className="ml-11 space-y-4">
                      <p className="text-muted-foreground leading-relaxed">{chapter.content}</p>
                      
                      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border-l-4 border-indigo-500">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bold text-indigo-700">{chapter.dataPoint}</div>
                            <div className="text-sm text-indigo-600">Key Metric</div>
                          </div>
                          <div className="bg-white p-3 rounded-lg shadow-sm">
                            <div className="text-xs text-muted-foreground">Visual: {chapter.visual}</div>
                            <div className="w-16 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded mt-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Conclusion */}
                <div className="bg-emerald-50 p-6 rounded-lg border-l-4 border-emerald-500">
                  <h4 className="font-semibold text-emerald-700 mb-2">Story Conclusion</h4>
                  <p className="text-emerald-600 leading-relaxed">{selectedStory.story.conclusion}</p>
                </div>

                {/* Action Items */}
                <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-orange-700 mb-3">Recommended Actions</h4>
                  <div className="space-y-2">
                    {selectedStory.story.actionItems.map((action, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                        <span className="text-orange-600">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium text-muted-foreground mb-2">Select a Story to Read</h3>
                <p className="text-sm text-muted-foreground">
                  Choose from the data stories above to experience AI-powered narrative reporting
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Story Performance Analytics
              </CardTitle>
              <CardDescription>
                AI insights on how your data stories are performing and engaging audiences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Audience Insights */}
              <div>
                <h4 className="font-medium mb-4">Audience Engagement by Role</h4>
                <div className="space-y-4">
                  {audienceInsights.map((audience, idx) => (
                    <div key={idx} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-medium">{audience.role}</h5>
                        <Badge variant="default">{audience.engagement}% engagement</Badge>
                      </div>
                      <div className="mb-3">
                        <Progress value={audience.engagement} className="h-2" />
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Preferred content: </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {audience.preferences.map((pref, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {pref}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Story Impact */}
              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-green-700 mb-3">Story Impact Metrics</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-green-600">156%</div>
                    <div className="text-sm text-green-600">Increase in action implementation</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">4.2x</div>
                    <div className="text-sm text-green-600">Higher engagement than traditional reports</div>
                  </div>
                </div>
              </div>

              {/* AI Recommendations */}
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-700 mb-3">AI Story Optimization</h4>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• Add more visual elements to increase C-suite engagement by 15%</li>
                  <li>• Include competitive benchmarks for marketing team stories</li>
                  <li>• Create shorter "executive summary" versions for quick consumption</li>
                  <li>• Implement interactive elements to boost engagement by 23%</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}