import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Target, TrendingUp, AlertTriangle, Eye, Zap } from "lucide-react";

export function AICompetitorMindReader() {
  const [competitorData, setCompetitorData] = useState({
    name: "",
    website: "",
    industry: "",
    marketCap: "",
    employees: "",
    aiEnabled: false
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const aiIntelligence = {
    mindReadScore: 94,
    intentPrediction: "Aggressive expansion into AI market",
    confidence: 91,
    threats: [
      { threat: "AI Product Launch", probability: 87, timeline: "2-3 months", impact: "High" },
      { threat: "Pricing War Initiative", probability: 73, timeline: "4-6 weeks", impact: "Medium" },
      { threat: "Partnership with Tech Giant", probability: 65, timeline: "6-8 months", impact: "Critical" }
    ],
    psychology: {
      leadership: "Innovation-driven, Risk-taking",
      culture: "Fast-moving, Competitive",
      decisionPattern: "Data-driven with aggressive timelines"
    },
    nextMoves: [
      { move: "Launch AI-powered feature", confidence: 89, timeframe: "Q1 2025" },
      { move: "Acquire smaller competitor", confidence: 67, timeframe: "Q2 2025" },
      { move: "Enter new geographic market", confidence: 78, timeframe: "Q3 2025" }
    ],
    weaknesses: [
      { weakness: "Technical debt in core platform", exploitability: 82 },
      { weakness: "High customer acquisition cost", exploitability: 75 },
      { weakness: "Limited enterprise features", exploitability: 91 }
    ]
  };

  const handleAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 3000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Competitor Mind Reader
            <Badge variant="secondary" className="ml-auto">Revolutionary AI</Badge>
          </CardTitle>
          <CardDescription>
            Read competitor minds, predict their next moves, and stay 3 steps ahead with supernatural market intelligence
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="competitor-name">Competitor Name</Label>
              <Input
                id="competitor-name"
                value={competitorData.name}
                onChange={(e) => setCompetitorData({...competitorData, name: e.target.value})}
                placeholder="e.g., TechCorp Inc"
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={competitorData.website}
                onChange={(e) => setCompetitorData({...competitorData, website: e.target.value})}
                placeholder="https://competitor.com"
              />
            </div>
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                value={competitorData.industry}
                onChange={(e) => setCompetitorData({...competitorData, industry: e.target.value})}
                placeholder="e.g., SaaS, E-commerce"
              />
            </div>
            <div>
              <Label htmlFor="market-cap">Market Cap</Label>
              <Input
                id="market-cap"
                value={competitorData.marketCap}
                onChange={(e) => setCompetitorData({...competitorData, marketCap: e.target.value})}
                placeholder="e.g., $100M"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-enabled">Enable Deep AI Mind Reading</Label>
            <Switch
              id="ai-enabled"
              checked={competitorData.aiEnabled}
              onCheckedChange={(checked) => setCompetitorData({...competitorData, aiEnabled: checked})}
            />
          </div>

          <Button 
            onClick={handleAnalysis} 
            disabled={isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? "Reading Competitor Mind..." : "Read Competitor Mind"}
          </Button>
        </CardContent>
      </Card>

      {competitorData.aiEnabled && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                Mind Reading Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{aiIntelligence.mindReadScore}%</div>
                  <div className="text-sm text-muted-foreground">Mind Read Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{aiIntelligence.confidence}%</div>
                  <div className="text-sm text-muted-foreground">Prediction Confidence</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-semibold">{aiIntelligence.threats.length}</div>
                  <div className="text-sm text-muted-foreground">Identified Threats</div>
                </div>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <div className="font-semibold text-sm text-muted-foreground mb-1">AI Intent Prediction</div>
                <div className="font-medium">{aiIntelligence.intentPrediction}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Predicted Threats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiIntelligence.threats.map((threat, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium">{threat.threat}</div>
                    <Badge variant={threat.impact === "Critical" ? "destructive" : threat.impact === "High" ? "secondary" : "outline"}>
                      {threat.impact} Impact
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Probability: {threat.probability}%</span>
                      <span>Timeline: {threat.timeline}</span>
                    </div>
                    <Progress value={threat.probability} className="h-2" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Psychology Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <div className="font-medium text-sm text-muted-foreground">Leadership Style</div>
                  <div className="font-medium">{aiIntelligence.psychology.leadership}</div>
                </div>
                <div>
                  <div className="font-medium text-sm text-muted-foreground">Company Culture</div>
                  <div className="font-medium">{aiIntelligence.psychology.culture}</div>
                </div>
                <div>
                  <div className="font-medium text-sm text-muted-foreground">Decision Pattern</div>
                  <div className="font-medium">{aiIntelligence.psychology.decisionPattern}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Predicted Next Moves
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiIntelligence.nextMoves.map((move, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium">{move.move}</div>
                    <Badge variant="secondary">{move.timeframe}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Confidence: {move.confidence}%</span>
                  </div>
                  <Progress value={move.confidence} className="h-2 mt-1" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Exploitable Weaknesses
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiIntelligence.weaknesses.map((weakness, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="font-medium mb-2">{weakness.weakness}</div>
                  <div className="flex justify-between text-sm">
                    <span>Exploitability: {weakness.exploitability}%</span>
                  </div>
                  <Progress value={weakness.exploitability} className="h-2 mt-1" />
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}