import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Sparkles, Zap, TrendingUp, Heart, Share, Eye, Brain, Target } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AIViralContentGenerator() {
  const [contentData, setContentData] = useState({
    topic: "",
    audience: "",
    platform: "",
    tone: "",
    objective: "",
    currentTrends: "",
    enableAI: true
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const viralPrediction = {
    viralProbability: 87,
    emotionalResonance: 94,
    shareabilityScore: 89,
    engagementForecast: 156000,
    reach: "2.3M people",
    confidence: 92,
    viralFactors: [
      { factor: "Emotional Trigger", score: 96, impact: "Very High", reason: "Nostalgia + Achievement combo" },
      { factor: "Timing Optimization", score: 89, impact: "High", reason: "Peak engagement window: Tue 3PM" },
      { factor: "Platform Algorithm", score: 91, impact: "Very High", reason: "Format perfectly matches algorithm" },
      { factor: "Audience Psychology", score: 88, impact: "High", reason: "Appeals to core identity triggers" },
      { factor: "Share Motivation", score: 93, impact: "Very High", reason: "High social currency value" }
    ],
    generatedContent: {
      headline: "The 30-Second Rule That Changed Everything (And Why 99% of People Miss It)",
      hook: "I used to waste 3 hours every morning until I discovered this...",
      body: "Here's what nobody tells you about productivity:\n\nIt's not about doing more. It's about doing ONE thing right.\n\nThe 30-second rule:\nBefore starting ANY task, ask yourself:\n'Will this move me closer to my #1 goal?'\n\nIf no → Don't do it.\nIf yes → Do it immediately.\n\nI went from scattered to focused in 30 days.\nMy income doubled.\nMy stress disappeared.\n\nTry it for one week. You'll never go back.",
      callToAction: "What's YOUR #1 goal right now? Drop it below 👇",
      hashtags: "#ProductivityHack #Success #Mindset #Goals #Focus"
    },
    emotionalAnalysis: [
      { emotion: "Curiosity", strength: 94, trigger: "Mysterious 30-second rule" },
      { emotion: "FOMO", strength: 87, trigger: "99% of people miss it" },
      { emotion: "Hope", strength: 91, trigger: "Personal transformation story" },
      { emotion: "Validation", strength: 83, trigger: "Simple solution to complex problem" }
    ],
    viralMechanics: [
      { mechanic: "Pattern Interrupt", effectiveness: 92, description: "Breaks expected productivity advice pattern" },
      { mechanic: "Social Proof", effectiveness: 88, description: "Personal success story builds credibility" },
      { mechanic: "Specificity", effectiveness: 94, description: "Exact timeframe and results create believability" },
      { mechanic: "Engagement Bait", effectiveness: 89, description: "Question ending encourages comments" }
    ]
  };

  const contentVariations = [
    {
      version: "Story-driven",
      headline: "How I Accidentally Discovered the Secret to Never Being Overwhelmed Again",
      viralScore: 89,
      platform: "LinkedIn"
    },
    {
      version: "List-based",
      headline: "5 Signs You're Wasting Your Life (And the 1 Simple Fix)",
      viralScore: 92,
      platform: "Twitter"
    },
    {
      version: "Challenge-based",
      headline: "The 7-Day Focus Challenge That's Breaking the Internet",
      viralScore: 85,
      platform: "Instagram"
    }
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 4000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Viral Content Generator
          </CardTitle>
          <CardDescription>
            Revolutionary AI that predicts viral content with 87% accuracy and generates content optimized for maximum reach
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Input */}
        <Card>
          <CardHeader>
            <CardTitle>Content Parameters</CardTitle>
            <div className="flex items-center space-x-2">
              <Switch 
                id="ai-viral" 
                checked={contentData.enableAI}
                onCheckedChange={(checked) => setContentData({...contentData, enableAI: checked})}
              />
              <Label htmlFor="ai-viral">Enable AI Viral Optimization</Label>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="topic">Content Topic</Label>
              <Input 
                id="topic" 
                value={contentData.topic}
                onChange={(e) => setContentData({...contentData, topic: e.target.value})}
                placeholder="What's your content about?"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="platform">Platform</Label>
                <Select value={contentData.platform} onValueChange={(value) => setContentData({...contentData, platform: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="twitter">Twitter/X</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="tone">Tone</Label>
                <Select value={contentData.tone} onValueChange={(value) => setContentData({...contentData, tone: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inspirational">Inspirational</SelectItem>
                    <SelectItem value="educational">Educational</SelectItem>
                    <SelectItem value="humorous">Humorous</SelectItem>
                    <SelectItem value="controversial">Controversial</SelectItem>
                    <SelectItem value="storytelling">Storytelling</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="audience">Target Audience</Label>
              <Textarea 
                id="audience"
                value={contentData.audience}
                onChange={(e) => setContentData({...contentData, audience: e.target.value})}
                placeholder="Describe your target audience..."
                className="h-20"
              />
            </div>

            <div>
              <Label htmlFor="objective">Content Objective</Label>
              <Input 
                id="objective"
                value={contentData.objective}
                onChange={(e) => setContentData({...contentData, objective: e.target.value})}
                placeholder="What do you want to achieve?"
              />
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Brain className="mr-2 h-4 w-4 animate-pulse" />
                  AI Generating Viral Content...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Viral Content
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Viral Prediction */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Viral Prediction Analysis
              <Badge variant="secondary" className="ml-auto">
                {viralPrediction.confidence}% Confidence
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-green-600">{viralPrediction.viralProbability}%</div>
                <p className="text-sm text-muted-foreground">Viral Probability</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">{viralPrediction.emotionalResonance}%</div>
                  <div className="text-sm text-muted-foreground">Emotional Resonance</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">{viralPrediction.shareabilityScore}%</div>
                  <div className="text-sm text-muted-foreground">Shareability</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Predicted Engagement:</span>
                  <span className="font-semibold">{viralPrediction.engagementForecast.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Estimated Reach:</span>
                  <span className="font-semibold">{viralPrediction.reach}</span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Viral Factors</h4>
                {viralPrediction.viralFactors.slice(0, 3).map((factor, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{factor.factor}</span>
                      <Badge variant={factor.impact === 'Very High' ? 'default' : 'secondary'}>
                        {factor.impact}
                      </Badge>
                    </div>
                    <Progress value={factor.score} className="h-2" />
                    <p className="text-xs text-muted-foreground">{factor.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Generated Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            AI-Generated Viral Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <h3 className="font-bold text-lg mb-2">{viralPrediction.generatedContent.headline}</h3>
              <p className="font-medium text-blue-700 mb-3">{viralPrediction.generatedContent.hook}</p>
              <div className="whitespace-pre-line text-sm mb-3">{viralPrediction.generatedContent.body}</div>
              <p className="font-medium text-green-700 mb-2">{viralPrediction.generatedContent.callToAction}</p>
              <p className="text-sm text-blue-600">{viralPrediction.generatedContent.hashtags}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Emotional Analysis */}
              <div>
                <h4 className="font-semibold mb-3">Emotional Triggers</h4>
                <div className="space-y-3">
                  {viralPrediction.emotionalAnalysis.map((emotion, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{emotion.emotion}</span>
                        <span className="text-sm">{emotion.strength}%</span>
                      </div>
                      <Progress value={emotion.strength} className="h-2" />
                      <p className="text-xs text-muted-foreground">{emotion.trigger}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Viral Mechanics */}
              <div>
                <h4 className="font-semibold mb-3">Viral Mechanics</h4>
                <div className="space-y-3">
                  {viralPrediction.viralMechanics.map((mechanic, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">{mechanic.mechanic}</span>
                        <Badge variant="outline">{mechanic.effectiveness}%</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{mechanic.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Variations */}
            <div>
              <h4 className="font-semibold mb-3">Platform-Optimized Variations</h4>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {contentVariations.map((variation, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <Badge variant="outline">{variation.version}</Badge>
                      <Badge className="bg-green-100 text-green-800">{variation.viralScore}%</Badge>
                    </div>
                    <h5 className="font-medium text-sm mb-2">{variation.headline}</h5>
                    <p className="text-xs text-muted-foreground">Optimized for {variation.platform}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}