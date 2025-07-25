import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Sparkles, Target, TrendingUp, Users, MessageSquare, Eye, Brain, Zap, DollarSign } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AIMarketingGenius() {
  const [campaignData, setCampaignData] = useState({
    name: "",
    objective: "",
    budget: "",
    duration: "",
    targetAudience: "",
    product: "",
    channels: "",
    enableAI: true
  });
  const [isOptimizing, setIsOptimizing] = useState(false);

  const aiOptimization = {
    campaignScore: 94,
    conversionPrediction: 8.7,
    roiPrediction: 340,
    confidence: 91,
    audienceInsights: [
      { segment: "Tech-Savvy Millennials", size: "2.3M", engagement: 89, conversion: 12.4 },
      { segment: "Budget-Conscious Professionals", size: "1.8M", engagement: 76, conversion: 9.2 },
      { segment: "Early Adopters", size: "890K", engagement: 94, conversion: 15.7 },
      { segment: "Enterprise Decision Makers", size: "420K", engagement: 82, conversion: 22.1 }
    ],
    contentOptimization: {
      headlines: [
        { text: "Revolutionary AI-Powered Solution That Saves You 40% Time", score: 96, emotion: "Excitement" },
        { text: "Join 50,000+ Companies Already Transforming Their Business", score: 89, emotion: "Trust" },
        { text: "Limited Time: Get Premium Features at Standard Price", score: 84, emotion: "Urgency" }
      ],
      emotionalTriggers: [
        { emotion: "Trust", strength: 87, impact: "High" },
        { emotion: "Excitement", strength: 92, impact: "Very High" },
        { emotion: "Urgency", strength: 74, impact: "Medium" },
        { emotion: "Fear of Missing Out", strength: 89, impact: "High" }
      ]
    },
    channelOptimization: [
      { channel: "LinkedIn Ads", allocation: 35, roi: 420, reach: "1.2M", cost: "$0.89" },
      { channel: "Google Ads", allocation: 30, roi: 380, reach: "2.1M", cost: "$1.23" },
      { channel: "Facebook/Meta", allocation: 20, roi: 290, reach: "3.4M", cost: "$0.67" },
      { channel: "Email Marketing", allocation: 15, roi: 560, reach: "180K", cost: "$0.12" }
    ],
    timeOptimization: {
      bestLaunchTime: "Tuesday 2:00 PM EST",
      optimalDuration: "21 days",
      peakEngagement: "Wed-Thu 1-4 PM",
      recommendedSchedule: [
        { day: "Monday", time: "9 AM", activity: "Content Launch", impact: "Medium" },
        { day: "Tuesday", time: "2 PM", activity: "Campaign Launch", impact: "High" },
        { day: "Wednesday", time: "3 PM", activity: "Retargeting Boost", impact: "High" },
        { day: "Friday", time: "11 AM", activity: "Weekly Report", impact: "Low" }
      ]
    },
    aiRecommendations: [
      {
        type: "Content",
        suggestion: "Add customer testimonials with 40% emotional impact increase",
        confidence: 94,
        impact: "+23% conversion rate"
      },
      {
        type: "Targeting",
        suggestion: "Focus 60% budget on 'Tech-Savvy Millennials' segment",
        confidence: 89,
        impact: "+15% ROI improvement"
      },
      {
        type: "Timing",
        suggestion: "Launch Tuesday 2 PM for maximum initial engagement",
        confidence: 96,
        impact: "+8% click-through rate"
      }
    ]
  };

  const handleOptimization = () => {
    setIsOptimizing(true);
    setTimeout(() => setIsOptimizing(false), 4000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Marketing Genius
          </CardTitle>
          <CardDescription>
            Revolutionary AI that creates perfect campaigns, predicts viral content, and maximizes ROI
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaign Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Details</CardTitle>
            <div className="flex items-center space-x-2">
              <Switch 
                id="ai-optimization" 
                checked={campaignData.enableAI}
                onCheckedChange={(checked) => setCampaignData({...campaignData, enableAI: checked})}
              />
              <Label htmlFor="ai-optimization">Enable AI Optimization</Label>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="campaign-name">Campaign Name</Label>
              <Input 
                id="campaign-name" 
                value={campaignData.name}
                onChange={(e) => setCampaignData({...campaignData, name: e.target.value})}
                placeholder="Enter campaign name"
              />
            </div>
            
            <div>
              <Label htmlFor="objective">Campaign Objective</Label>
              <Select value={campaignData.objective} onValueChange={(value) => setCampaignData({...campaignData, objective: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select objective" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="awareness">Brand Awareness</SelectItem>
                  <SelectItem value="leads">Lead Generation</SelectItem>
                  <SelectItem value="sales">Sales Conversion</SelectItem>
                  <SelectItem value="engagement">User Engagement</SelectItem>
                  <SelectItem value="retention">Customer Retention</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="budget">Budget</Label>
                <Input 
                  id="budget"
                  value={campaignData.budget}
                  onChange={(e) => setCampaignData({...campaignData, budget: e.target.value})}
                  placeholder="$10,000"
                />
              </div>
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input 
                  id="duration"
                  value={campaignData.duration}
                  onChange={(e) => setCampaignData({...campaignData, duration: e.target.value})}
                  placeholder="30 days"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="target-audience">Target Audience</Label>
              <Textarea 
                id="target-audience"
                value={campaignData.targetAudience}
                onChange={(e) => setCampaignData({...campaignData, targetAudience: e.target.value})}
                placeholder="Describe your target audience..."
                className="h-20"
              />
            </div>

            <div>
              <Label htmlFor="product">Product/Service</Label>
              <Input 
                id="product"
                value={campaignData.product}
                onChange={(e) => setCampaignData({...campaignData, product: e.target.value})}
                placeholder="What are you promoting?"
              />
            </div>

            <Button 
              onClick={handleOptimization} 
              disabled={isOptimizing}
              className="w-full"
            >
              {isOptimizing ? (
                <>
                  <Brain className="mr-2 h-4 w-4 animate-pulse" />
                  AI Creating Perfect Campaign...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate AI Campaign
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Campaign Performance Prediction */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performance Prediction
              <Badge variant="secondary" className="ml-auto">
                {aiOptimization.confidence}% Confidence
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{aiOptimization.campaignScore}</div>
                <p className="text-sm text-muted-foreground">AI Campaign Score</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">{aiOptimization.conversionPrediction}%</div>
                  <div className="text-sm text-muted-foreground">Conversion Rate</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">{aiOptimization.roiPrediction}%</div>
                  <div className="text-sm text-muted-foreground">Predicted ROI</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Emotional Triggers</h4>
                {aiOptimization.contentOptimization.emotionalTriggers.map((trigger, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{trigger.emotion}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant={trigger.impact === 'Very High' ? 'default' : trigger.impact === 'High' ? 'secondary' : 'outline'}>
                          {trigger.impact}
                        </Badge>
                        <span className="text-sm">{trigger.strength}%</span>
                      </div>
                    </div>
                    <Progress value={trigger.strength} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Audience Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              AI Audience Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiOptimization.audienceInsights.map((segment, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-sm">{segment.segment}</h4>
                  <Badge variant="outline">{segment.size}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Engagement: </span>
                    <span className="font-semibold">{segment.engagement}%</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Conversion: </span>
                    <span className="font-semibold">{segment.conversion}%</span>
                  </div>
                </div>
                <Progress value={segment.engagement} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Channel Optimization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Channel Optimization
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiOptimization.channelOptimization.map((channel, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-sm">{channel.channel}</h4>
                  <Badge variant="secondary">{channel.allocation}%</Badge>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">ROI: </span>
                    <span className="font-semibold text-green-600">{channel.roi}%</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Reach: </span>
                    <span className="font-semibold">{channel.reach}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">CPC: </span>
                    <span className="font-semibold">{channel.cost}</span>
                  </div>
                </div>
                <Progress value={channel.allocation} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Content Optimization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            AI Content Optimization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h4 className="font-semibold">AI-Generated Headlines</h4>
            {aiOptimization.contentOptimization.headlines.map((headline, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-2">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium flex-1 mr-4">{headline.text}</p>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant="outline">{headline.emotion}</Badge>
                    <span className="text-xs text-muted-foreground">{headline.score}% score</span>
                  </div>
                </div>
                <Progress value={headline.score} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            AI Strategic Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {aiOptimization.aiRecommendations.map((rec, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline">{rec.type}</Badge>
                <span className="text-xs text-muted-foreground">{rec.confidence}% confidence</span>
              </div>
              <p className="text-sm font-medium">{rec.suggestion}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-600 font-semibold">{rec.impact}</span>
                <Button size="sm" variant="outline">Apply</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}