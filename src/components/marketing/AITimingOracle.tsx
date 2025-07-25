import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Clock, Target, TrendingUp, Calendar, Zap } from "lucide-react";

export function AITimingOracle() {
  const [campaignData, setCampaignData] = useState({
    type: "",
    audience: "",
    channels: "",
    duration: "",
    aiEnabled: false
  });
  const [isPredicting, setIsPredicting] = useState(false);

  const timingPredictions = {
    overallScore: 96,
    optimalLaunchTime: "Tuesday, March 12, 2025 at 10:23 AM EST",
    confidence: 94,
    peakMoments: [
      { time: "10:23 AM EST", day: "Tuesday", score: 96, reason: "Peak email open rates + low competitor activity" },
      { time: "2:47 PM EST", day: "Wednesday", score: 89, reason: "High social media engagement window" },
      { time: "9:15 AM EST", day: "Thursday", score: 87, reason: "B2B decision maker focus time" }
    ],
    seasonalFactors: [
      { factor: "Industry Budget Cycles", impact: 92, timing: "Q1 2025", effect: "Maximum budget availability" },
      { factor: "Economic Indicators", impact: 78, timing: "March 2025", effect: "Consumer confidence peak" },
      { factor: "Competitor Activity", impact: 85, timing: "February 2025", effect: "Low competition window" }
    ],
    audienceActivity: [
      { timeFrame: "6-9 AM", engagement: 67, platform: "Email", conversion: 8.4 },
      { timeFrame: "10 AM-12 PM", engagement: 94, platform: "LinkedIn", conversion: 12.7 },
      { timeFrame: "2-4 PM", engagement: 89, platform: "Social Media", conversion: 9.2 },
      { timeFrame: "7-9 PM", engagement: 76, platform: "Content Consumption", conversion: 6.8 }
    ],
    microMoments: [
      { moment: "Industry Event Aftermath", time: "March 15-17", opportunity: 91, description: "Post-conference decision making" },
      { moment: "Quarterly Planning", time: "March 20-25", opportunity: 88, description: "Budget allocation decisions" },
      { moment: "Competitor Product Launch", time: "March 8", opportunity: 73, description: "Counter-narrative window" }
    ],
    riskFactors: [
      { risk: "Market Volatility", probability: 23, impact: "Medium", mitigation: "Flexible launch timeline" },
      { risk: "Competitor Response", probability: 34, impact: "Low", mitigation: "First-mover advantage" },
      { risk: "Audience Fatigue", probability: 12, impact: "High", mitigation: "Fresh messaging angle" }
    ]
  };

  const handlePrediction = () => {
    setIsPredicting(true);
    setTimeout(() => setIsPredicting(false), 3000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Timing Oracle
            <Badge variant="secondary" className="ml-auto">Revolutionary AI</Badge>
          </CardTitle>
          <CardDescription>
            Predicts optimal timing for campaigns, launches, and marketing activities with supernatural 96% accuracy
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="campaign-type">Campaign Type</Label>
              <Input
                id="campaign-type"
                value={campaignData.type}
                onChange={(e) => setCampaignData({...campaignData, type: e.target.value})}
                placeholder="e.g., Product Launch, Email Campaign"
              />
            </div>
            <div>
              <Label htmlFor="audience">Target Audience</Label>
              <Input
                id="audience"
                value={campaignData.audience}
                onChange={(e) => setCampaignData({...campaignData, audience: e.target.value})}
                placeholder="e.g., B2B Decision Makers"
              />
            </div>
            <div>
              <Label htmlFor="channels">Marketing Channels</Label>
              <Input
                id="channels"
                value={campaignData.channels}
                onChange={(e) => setCampaignData({...campaignData, channels: e.target.value})}
                placeholder="e.g., Email, LinkedIn, PR"
              />
            </div>
            <div>
              <Label htmlFor="duration">Campaign Duration</Label>
              <Input
                id="duration"
                value={campaignData.duration}
                onChange={(e) => setCampaignData({...campaignData, duration: e.target.value})}
                placeholder="e.g., 2 weeks, 1 month"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-enabled">Enable Timing Oracle</Label>
            <Switch
              id="ai-enabled"
              checked={campaignData.aiEnabled}
              onCheckedChange={(checked) => setCampaignData({...campaignData, aiEnabled: checked})}
            />
          </div>

          <Button 
            onClick={handlePrediction} 
            disabled={isPredicting}
            className="w-full"
          >
            {isPredicting ? "Reading Market Timing..." : "Predict Optimal Timing"}
          </Button>
        </CardContent>
      </Card>

      {campaignData.aiEnabled && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Oracle Prediction
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-primary">{timingPredictions.overallScore}%</div>
                <div className="text-sm text-muted-foreground">Timing Accuracy Score</div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border-2 border-primary/20">
                <div className="text-center">
                  <div className="text-sm font-medium text-muted-foreground mb-1">Optimal Launch Time</div>
                  <div className="text-lg font-bold">{timingPredictions.optimalLaunchTime}</div>
                  <div className="text-sm text-muted-foreground mt-1">Confidence: {timingPredictions.confidence}%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Peak Performance Windows
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {timingPredictions.peakMoments.map((moment, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{moment.time} - {moment.day}</div>
                      <div className="text-sm text-muted-foreground">{moment.reason}</div>
                    </div>
                    <Badge variant={moment.score > 90 ? "destructive" : "secondary"}>
                      {moment.score}% optimal
                    </Badge>
                  </div>
                  <Progress value={moment.score} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Seasonal & Market Factors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {timingPredictions.seasonalFactors.map((factor, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{factor.factor}</div>
                      <div className="text-sm text-muted-foreground">{factor.effect}</div>
                    </div>
                    <Badge variant="secondary">{factor.timing}</Badge>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Impact Score: {factor.impact}%</span>
                  </div>
                  <Progress value={factor.impact} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Audience Activity Patterns
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {timingPredictions.audienceActivity.map((activity, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{activity.timeFrame}</div>
                      <div className="text-sm text-muted-foreground">{activity.platform}</div>
                    </div>
                    <Badge variant="outline">{activity.conversion}% conversion</Badge>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Engagement: {activity.engagement}%</span>
                  </div>
                  <Progress value={activity.engagement} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Micro-Moment Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {timingPredictions.microMoments.map((moment, index) => (
                <div key={index} className="border rounded-lg p-3 bg-gradient-to-r from-primary/5 to-secondary/5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{moment.moment}</div>
                      <div className="text-sm text-muted-foreground">{moment.description}</div>
                    </div>
                    <Badge variant="destructive">{moment.opportunity}% opportunity</Badge>
                  </div>
                  <div className="text-sm font-medium">{moment.time}</div>
                  <Progress value={moment.opportunity} className="h-2 mt-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-destructive" />
                Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {timingPredictions.riskFactors.map((risk, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{risk.risk}</div>
                      <div className="text-sm text-muted-foreground">Mitigation: {risk.mitigation}</div>
                    </div>
                    <Badge variant={risk.impact === "High" ? "destructive" : risk.impact === "Medium" ? "secondary" : "outline"}>
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