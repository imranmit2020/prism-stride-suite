import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Sparkles, Target, TrendingUp, Zap, Brain, DollarSign, Clock, MessageSquare, User } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AILeadAlchemist() {
  const [leadData, setLeadData] = useState({
    name: "",
    email: "",
    company: "",
    source: "",
    interest: "",
    budget: "",
    timeline: "",
    notes: "",
    enableAI: true
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const leadAnalysis = {
    leadScore: 87,
    conversionProbability: 73,
    qualificationLevel: "Hot Lead",
    confidence: 94,
    scoringFactors: [
      { factor: "Budget Alignment", score: 92, weight: "High", impact: "Positive" },
      { factor: "Timeline Urgency", score: 78, weight: "High", impact: "Positive" },
      { factor: "Decision Authority", score: 85, weight: "Very High", impact: "Positive" },
      { factor: "Company Fit", score: 89, weight: "Medium", impact: "Positive" },
      { factor: "Engagement Level", score: 76, weight: "Medium", impact: "Neutral" }
    ],
    personalizedOutreach: {
      bestChannel: "LinkedIn + Email",
      optimalTiming: "Tuesday 10:00 AM",
      messageStyle: "Professional + Technical",
      followUpCadence: "3-5-7 day sequence",
      personalizedMessage: "Hi [Name], I noticed your company recently expanded their tech team. Our AI solution has helped similar companies reduce onboarding time by 40%. Would you be interested in a 15-minute demo?"
    },
    conversionStrategy: [
      {
        stage: "Initial Contact",
        recommendation: "Lead with industry-specific case study",
        probability: 78,
        timeline: "Day 1-2"
      },
      {
        stage: "Discovery Call", 
        recommendation: "Focus on ROI and technical integration",
        probability: 85,
        timeline: "Day 3-7"
      },
      {
        stage: "Proposal",
        recommendation: "Include custom pricing with 3 tier options",
        probability: 92,
        timeline: "Day 8-14"
      },
      {
        stage: "Closing",
        recommendation: "Offer limited-time implementation bonus",
        probability: 89,
        timeline: "Day 15-21"
      }
    ],
    competitorAnalysis: {
      primaryCompetitor: "TechCorp Solutions",
      competitorWeakness: "Poor customer support",
      ourAdvantage: "24/7 AI-powered support",
      winProbability: 82,
      counterStrategy: "Emphasize support excellence and response times"
    },
    riskFactors: [
      { risk: "Budget Constraints", probability: 23, mitigation: "Flexible payment terms" },
      { risk: "Decision Delays", probability: 34, mitigation: "Create urgency with limited offer" },
      { risk: "Competitor Interference", probability: 18, mitigation: "Highlight unique value proposition" }
    ],
    aiRecommendations: [
      {
        type: "Immediate Action",
        suggestion: "Send personalized video message within 2 hours",
        confidence: 96,
        impact: "+23% response rate"
      },
      {
        type: "Nurturing",
        suggestion: "Share relevant industry report on automation trends",
        confidence: 89,
        impact: "+15% engagement"
      },
      {
        type: "Closing",
        suggestion: "Offer pilot program at 50% discount for first 3 months",
        confidence: 94,
        impact: "+31% conversion rate"
      }
    ]
  };

  const handleLeadAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 3500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Lead Alchemist
          </CardTitle>
          <CardDescription>
            Mystical AI that transforms cold leads into hot prospects with supernatural conversion magic
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Information</CardTitle>
            <div className="flex items-center space-x-2">
              <Switch 
                id="ai-alchemy" 
                checked={leadData.enableAI}
                onCheckedChange={(checked) => setLeadData({...leadData, enableAI: checked})}
              />
              <Label htmlFor="ai-alchemy">Enable AI Lead Alchemy</Label>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lead-name">Contact Name</Label>
                <Input 
                  id="lead-name" 
                  value={leadData.name}
                  onChange={(e) => setLeadData({...leadData, name: e.target.value})}
                  placeholder="Enter contact name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={leadData.email}
                  onChange={(e) => setLeadData({...leadData, email: e.target.value})}
                  placeholder="contact@company.com"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company">Company</Label>
                <Input 
                  id="company"
                  value={leadData.company}
                  onChange={(e) => setLeadData({...leadData, company: e.target.value})}
                  placeholder="Company name"
                />
              </div>
              <div>
                <Label htmlFor="source">Lead Source</Label>
                <Select value={leadData.source} onValueChange={(value) => setLeadData({...leadData, source: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                    <SelectItem value="event">Trade Show/Event</SelectItem>
                    <SelectItem value="cold-outreach">Cold Outreach</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="interest">Area of Interest</Label>
              <Textarea 
                id="interest"
                value={leadData.interest}
                onChange={(e) => setLeadData({...leadData, interest: e.target.value})}
                placeholder="What are they interested in? What problems are they trying to solve?"
                className="h-20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="budget">Budget Range</Label>
                <Input 
                  id="budget"
                  value={leadData.budget}
                  onChange={(e) => setLeadData({...leadData, budget: e.target.value})}
                  placeholder="$10,000 - $50,000"
                />
              </div>
              <div>
                <Label htmlFor="timeline">Decision Timeline</Label>
                <Input 
                  id="timeline"
                  value={leadData.timeline}
                  onChange={(e) => setLeadData({...leadData, timeline: e.target.value})}
                  placeholder="Next 3 months"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea 
                id="notes"
                value={leadData.notes}
                onChange={(e) => setLeadData({...leadData, notes: e.target.value})}
                placeholder="Any additional context about this lead..."
                className="h-20"
              />
            </div>

            <Button 
              onClick={handleLeadAnalysis} 
              disabled={isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <Brain className="mr-2 h-4 w-4 animate-pulse" />
                  AI Transmuting Lead to Gold...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Perform Lead Alchemy
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Lead Score Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Lead Score Analysis
              <Badge variant="secondary" className="ml-auto">
                {leadAnalysis.confidence}% Confidence
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{leadAnalysis.leadScore}</div>
                <div className="text-lg font-semibold">{leadAnalysis.qualificationLevel}</div>
                <p className="text-sm text-muted-foreground">AI Lead Score</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">{leadAnalysis.conversionProbability}%</div>
                  <div className="text-sm text-muted-foreground">Conversion Probability</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Scoring Factors</h4>
                {leadAnalysis.scoringFactors.slice(0, 3).map((factor, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{factor.factor}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant={factor.weight === 'Very High' ? 'default' : factor.weight === 'High' ? 'secondary' : 'outline'}>
                          {factor.weight}
                        </Badge>
                        <span className="text-sm">{factor.score}%</span>
                      </div>
                    </div>
                    <Progress value={factor.score} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personalized Outreach */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              AI Personalized Outreach
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-sm font-bold text-blue-600">{leadAnalysis.personalizedOutreach.bestChannel}</div>
                <div className="text-xs text-muted-foreground">Best Channel</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-sm font-bold text-purple-600">{leadAnalysis.personalizedOutreach.optimalTiming}</div>
                <div className="text-xs text-muted-foreground">Optimal Timing</div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <Label className="text-sm font-semibold">Message Style</Label>
                <p className="text-sm text-muted-foreground">{leadAnalysis.personalizedOutreach.messageStyle}</p>
              </div>
              
              <div>
                <Label className="text-sm font-semibold">Follow-up Cadence</Label>
                <p className="text-sm text-muted-foreground">{leadAnalysis.personalizedOutreach.followUpCadence}</p>
              </div>

              <div>
                <Label className="text-sm font-semibold">AI-Generated Message</Label>
                <div className="p-3 bg-muted rounded-lg text-sm">
                  {leadAnalysis.personalizedOutreach.personalizedMessage}
                </div>
              </div>
            </div>

            <Button className="w-full">
              <MessageSquare className="mr-2 h-4 w-4" />
              Send AI-Crafted Message
            </Button>
          </CardContent>
        </Card>

        {/* Conversion Strategy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              AI Conversion Strategy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {leadAnalysis.conversionStrategy.map((stage, index) => (
              <div key={index} className="p-3 border rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-sm">{stage.stage}</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{stage.timeline}</Badge>
                    <span className="text-xs text-green-600">{stage.probability}%</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{stage.recommendation}</p>
                <Progress value={stage.probability} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Competitor Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            AI Competitor Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">Primary Competitor</h4>
                <p className="text-sm">{leadAnalysis.competitorAnalysis.primaryCompetitor}</p>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">Their Weakness</h4>
                <p className="text-sm">{leadAnalysis.competitorAnalysis.competitorWeakness}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Our Advantage</h4>
                <p className="text-sm">{leadAnalysis.competitorAnalysis.ourAdvantage}</p>
              </div>

              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{leadAnalysis.competitorAnalysis.winProbability}%</div>
                <p className="text-sm text-muted-foreground">Win Probability</p>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">Counter Strategy</h4>
            <p className="text-sm text-muted-foreground">{leadAnalysis.competitorAnalysis.counterStrategy}</p>
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
          {leadAnalysis.aiRecommendations.map((rec, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline">{rec.type}</Badge>
                <span className="text-xs text-muted-foreground">{rec.confidence}% confidence</span>
              </div>
              <p className="text-sm font-medium">{rec.suggestion}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-600 font-semibold">{rec.impact}</span>
                <Button size="sm" variant="outline">Implement</Button>
              </div>
            </div>
          ))}

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold">Next Best Action</h4>
                <p className="text-sm text-muted-foreground">AI Priority Recommendation</p>
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Sparkles className="mr-2 h-4 w-4" />
                Execute Conversion Sequence
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}