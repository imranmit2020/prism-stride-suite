import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Heart, TrendingUp, AlertTriangle, Zap, Target } from "lucide-react";

export function AIBrandSentimentShapeshifter() {
  const [brandData, setBrandData] = useState({
    brandName: "",
    industry: "",
    targetSentiment: "",
    timeframe: "",
    aiEnabled: false
  });
  const [isShaping, setIsShaping] = useState(false);

  const sentimentData = {
    currentScore: 73,
    targetScore: 89,
    shapeabilityIndex: 94,
    realTimeMetrics: [
      { platform: "Twitter/X", sentiment: 68, volume: "12.4K", trend: "+5.2%" },
      { platform: "LinkedIn", sentiment: 84, volume: "3.8K", trend: "+12.1%" },
      { platform: "Reddit", sentiment: 59, volume: "7.2K", trend: "-2.3%" },
      { platform: "News Media", sentiment: 81, volume: "847", trend: "+8.7%" }
    ],
    emotionalProfile: [
      { emotion: "Trust", current: 78, target: 92, gap: 14 },
      { emotion: "Excitement", current: 65, target: 85, gap: 20 },
      { emotion: "Innovation", current: 71, target: 88, gap: 17 },
      { emotion: "Reliability", current: 82, target: 91, gap: 9 }
    ],
    narrativeShifts: [
      { 
        narrative: "Innovation Leader", 
        current: 67, 
        potential: 91, 
        strategy: "Amplify R&D achievements, showcase cutting-edge features",
        timeline: "2-3 weeks"
      },
      { 
        narrative: "Customer Champion", 
        current: 74, 
        potential: 88, 
        strategy: "Highlight customer success stories, responsive support",
        timeline: "1-2 weeks"
      },
      { 
        narrative: "Industry Disruptor", 
        current: 61, 
        potential: 85, 
        strategy: "Position as market challenger, demonstrate competitive advantages",
        timeline: "4-6 weeks"
      }
    ],
    interventionStrategies: [
      {
        strategy: "Positive News Amplification",
        impact: 87,
        effort: "Medium",
        channels: ["PR", "Social Media", "Influencers"],
        expectedLift: "+12-15 points"
      },
      {
        strategy: "Counter-Narrative Deployment",
        impact: 82,
        effort: "High",
        channels: ["Thought Leadership", "Industry Reports"],
        expectedLift: "+8-11 points"
      },
      {
        strategy: "Community Mobilization",
        impact: 79,
        effort: "Low",
        channels: ["User Communities", "Employee Advocacy"],
        expectedLift: "+6-9 points"
      }
    ],
    riskFactors: [
      { risk: "Competitor Attack Campaign", probability: 34, impact: "High", mitigation: "Preemptive defense strategy" },
      { risk: "Negative Viral Content", probability: 23, impact: "Critical", mitigation: "Rapid response protocol" },
      { risk: "Industry Controversy", probability: 45, impact: "Medium", mitigation: "Stakeholder communication plan" }
    ]
  };

  const handleShaping = () => {
    setIsShaping(true);
    setTimeout(() => setIsShaping(false), 3000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Brand Sentiment Shapeshifter
            <Badge variant="secondary" className="ml-auto">Revolutionary AI</Badge>
          </CardTitle>
          <CardDescription>
            Real-time brand perception management that shapes sentiment and controls narrative with 94% effectiveness
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="brand-name">Brand Name</Label>
              <Input
                id="brand-name"
                value={brandData.brandName}
                onChange={(e) => setBrandData({...brandData, brandName: e.target.value})}
                placeholder="e.g., TechCorp, InnovateAI"
              />
            </div>
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                value={brandData.industry}
                onChange={(e) => setBrandData({...brandData, industry: e.target.value})}
                placeholder="e.g., Technology, Healthcare"
              />
            </div>
            <div>
              <Label htmlFor="target-sentiment">Target Sentiment</Label>
              <Input
                id="target-sentiment"
                value={brandData.targetSentiment}
                onChange={(e) => setBrandData({...brandData, targetSentiment: e.target.value})}
                placeholder="e.g., Innovation Leader, Trusted Partner"
              />
            </div>
            <div>
              <Label htmlFor="timeframe">Timeframe</Label>
              <Input
                id="timeframe"
                value={brandData.timeframe}
                onChange={(e) => setBrandData({...brandData, timeframe: e.target.value})}
                placeholder="e.g., 30 days, 3 months"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-enabled">Enable Sentiment Shapeshifting</Label>
            <Switch
              id="ai-enabled"
              checked={brandData.aiEnabled}
              onCheckedChange={(checked) => setBrandData({...brandData, aiEnabled: checked})}
            />
          </div>

          <Button 
            onClick={handleShaping} 
            disabled={isShaping}
            className="w-full"
          >
            {isShaping ? "Analyzing Brand Sentiment..." : "Analyze & Shape Sentiment"}
          </Button>
        </CardContent>
      </Card>

      {brandData.aiEnabled && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Sentiment Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{sentimentData.currentScore}</div>
                  <div className="text-sm text-muted-foreground">Current Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{sentimentData.targetScore}</div>
                  <div className="text-sm text-muted-foreground">Target Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{sentimentData.shapeabilityIndex}%</div>
                  <div className="text-sm text-muted-foreground">Shapeability Index</div>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Progress to Target</span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round((sentimentData.currentScore / sentimentData.targetScore) * 100)}%
                  </span>
                </div>
                <Progress value={(sentimentData.currentScore / sentimentData.targetScore) * 100} className="h-3" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Real-Time Platform Sentiment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sentimentData.realTimeMetrics.map((metric, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{metric.platform}</div>
                      <div className="text-sm text-muted-foreground">{metric.volume} mentions</div>
                    </div>
                    <div className="text-right">
                      <Badge variant={metric.sentiment > 75 ? "secondary" : metric.sentiment > 60 ? "outline" : "destructive"}>
                        {metric.sentiment}/100
                      </Badge>
                      <div className={`text-sm mt-1 ${metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {metric.trend}
                      </div>
                    </div>
                  </div>
                  <Progress value={metric.sentiment} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Emotional Profile Shaping
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sentimentData.emotionalProfile.map((emotion, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium">{emotion.emotion}</div>
                    <Badge variant="outline">Gap: {emotion.gap} points</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                    <div>Current: {emotion.current}%</div>
                    <div>Target: {emotion.target}%</div>
                  </div>
                  <div className="space-y-1">
                    <Progress value={emotion.current} className="h-2" />
                    <div className="text-xs text-muted-foreground text-right">
                      Need +{emotion.gap} points
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Narrative Shift Strategies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sentimentData.narrativeShifts.map((shift, index) => (
                <div key={index} className="border rounded-lg p-3 bg-gradient-to-r from-primary/5 to-secondary/5">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium">{shift.narrative}</div>
                    <Badge variant="secondary">{shift.timeline}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">{shift.strategy}</div>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                    <div>Current: {shift.current}%</div>
                    <div>Potential: {shift.potential}%</div>
                  </div>
                  <Progress value={shift.current} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">
                    Uplift potential: +{shift.potential - shift.current} points
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Intervention Strategies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sentimentData.interventionStrategies.map((strategy, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{strategy.strategy}</div>
                      <div className="text-sm text-muted-foreground">Expected lift: {strategy.expectedLift}</div>
                    </div>
                    <Badge variant={strategy.effort === "Low" ? "secondary" : strategy.effort === "Medium" ? "outline" : "destructive"}>
                      {strategy.effort} Effort
                    </Badge>
                  </div>
                  <div className="flex gap-1 flex-wrap mb-2">
                    {strategy.channels.map((channel, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">{channel}</Badge>
                    ))}
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Impact Score: {strategy.impact}%</span>
                  </div>
                  <Progress value={strategy.impact} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Risk Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sentimentData.riskFactors.map((risk, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{risk.risk}</div>
                      <div className="text-sm text-muted-foreground">Mitigation: {risk.mitigation}</div>
                    </div>
                    <Badge variant={risk.impact === "Critical" ? "destructive" : risk.impact === "High" ? "secondary" : "outline"}>
                      {risk.impact} Impact
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Probability: {risk.probability}%</span>
                  </div>
                  <Progress value={risk.probability} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}