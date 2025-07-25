import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { User, Brain, Palette, Layout, Clock, Target, Sparkles, Eye } from "lucide-react";

export function AIPersonalization() {
  const [aiLearning, setAiLearning] = useState(true);
  const [adaptiveUI, setAdaptiveUI] = useState(true);
  const [intelligenceLevel, setIntelligenceLevel] = useState([85]);

  // Revolutionary AI personalization data
  const personalityProfile = {
    workStyle: "Data-Driven Analyst",
    preferredTime: "Morning (9-11 AM)",
    decisionSpeed: "Deliberate",
    informationDepth: "Detailed",
    visualPreference: "Charts & Graphs",
    interactionStyle: "Efficient",
    learningAccuracy: 94
  };

  const aiAdaptations = [
    {
      category: "Interface Layout",
      adaptation: "Prioritized analytics widgets based on 87% usage pattern",
      impact: "23% faster task completion",
      confidence: 91,
      active: true
    },
    {
      category: "Color Scheme",
      adaptation: "Adjusted to blue-dominant palette (reduces eye strain by 34%)",
      impact: "67% longer focused sessions",
      confidence: 88,
      active: true
    },
    {
      category: "Information Density",
      adaptation: "Increased data detail level to match analytical preference",
      impact: "45% better decision accuracy",
      confidence: 92,
      active: true
    },
    {
      category: "Notification Timing",
      adaptation: "Optimized for 9-11 AM peak productivity window",
      impact: "56% higher engagement rate",
      confidence: 89,
      active: true
    }
  ];

  const behaviorInsights = [
    {
      insight: "You're 34% more productive when using keyboard shortcuts",
      recommendation: "Enable advanced keyboard navigation",
      value: "high"
    },
    {
      insight: "Your attention peaks during 9-11 AM for complex analysis",
      recommendation: "Schedule important reports for morning delivery",
      value: "medium"
    },
    {
      insight: "You prefer summarized alerts over detailed notifications",
      recommendation: "Switch to digest mode for system updates",
      value: "low"
    },
    {
      insight: "Visual charts increase your comprehension by 67%",
      recommendation: "Default to visual report formats",
      value: "high"
    }
  ];

  const aiPersonalityTraits = [
    { trait: "Analytical Thinking", score: 92, description: "Prefers data-driven decisions" },
    { trait: "Detail Orientation", score: 88, description: "Values comprehensive information" },
    { trait: "Efficiency Focus", score: 85, description: "Optimizes for quick task completion" },
    { trait: "Visual Processing", score: 91, description: "Learns better with visual aids" },
    { trait: "Pattern Recognition", score: 89, description: "Quickly identifies trends" }
  ];

  const adaptiveFeatures = [
    { name: "Smart Dashboard", description: "Auto-arranges based on usage patterns", enabled: true },
    { name: "Predictive Search", description: "Suggests searches before you type", enabled: true },
    { name: "Mood-Based Colors", description: "Adjusts theme based on stress levels", enabled: false },
    { name: "Cognitive Load Monitoring", description: "Simplifies UI when overwhelmed", enabled: true },
    { name: "Circadian Optimization", description: "Adjusts brightness and contrast by time", enabled: true }
  ];

  return (
    <div className="space-y-6">
      {/* AI Personalization Header */}
      <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Brain className="h-6 w-6 text-purple-600" />
                AI Personalization Engine
              </CardTitle>
              <CardDescription>
                Revolutionary adaptive interface that learns and evolves with your behavior
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">AI Learning</span>
                <Switch checked={aiLearning} onCheckedChange={setAiLearning} />
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Personality Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            AI-Analyzed Personality Profile
          </CardTitle>
          <CardDescription>
            Machine learning analysis of your work patterns and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Core Traits</h4>
              <div className="space-y-3">
                {Object.entries(personalityProfile).filter(([key]) => key !== 'learningAccuracy').map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <Badge variant="outline">{value}</Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Behavioral Analysis</h4>
              <div className="space-y-3">
                {aiPersonalityTraits.map((trait, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{trait.trait}</span>
                      <span className="font-medium">{trait.score}%</span>
                    </div>
                    <Progress value={trait.score} className="h-2" />
                    <p className="text-xs text-muted-foreground">{trait.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-700">Learning Accuracy</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">{personalityProfile.learningAccuracy}%</div>
            <p className="text-sm text-blue-600 mt-1">AI confidence in personality analysis</p>
          </div>
        </CardContent>
      </Card>

      {/* Active AI Adaptations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Active AI Adaptations
          </CardTitle>
          <CardDescription>
            Intelligent modifications AI has made to optimize your experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiAdaptations.map((adaptation, idx) => (
              <div key={idx} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{adaptation.category}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="bg-green-600">Active</Badge>
                    <Badge variant="outline">{adaptation.confidence}% confidence</Badge>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{adaptation.adaptation}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-3 rounded border-l-4 border-green-500">
                    <span className="text-sm font-medium text-green-700">Impact:</span>
                    <div className="text-green-600 font-medium">{adaptation.impact}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Adjust
                    </Button>
                    <Button size="sm" variant="outline">
                      Disable
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Intelligence Level Control */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Intelligence Level
          </CardTitle>
          <CardDescription>
            Control how aggressively AI adapts and learns from your behavior
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Learning Intensity</span>
              <span className="text-2xl font-bold text-purple-600">{intelligenceLevel[0]}%</span>
            </div>
            <Slider
              value={intelligenceLevel}
              onValueChange={setIntelligenceLevel}
              max={100}
              step={5}
              className="w-full"
            />
            <div className="grid grid-cols-3 text-xs text-muted-foreground">
              <span>Conservative</span>
              <span className="text-center">Balanced</span>
              <span className="text-right">Aggressive</span>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-medium text-purple-700 mb-2">Current Mode: 
              {intelligenceLevel[0] < 40 ? " Conservative" : 
               intelligenceLevel[0] < 70 ? " Balanced" : " Aggressive"}
            </h4>
            <p className="text-sm text-purple-600">
              {intelligenceLevel[0] < 40 ? 
                "AI makes minimal changes, focuses on proven optimizations" :
                intelligenceLevel[0] < 70 ?
                "AI balances exploration with stability, moderate learning rate" :
                "AI actively experiments with new adaptations, rapid learning"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Behavior Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            AI Behavior Insights
          </CardTitle>
          <CardDescription>
            Intelligent observations about your work patterns with actionable recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {behaviorInsights.map((item, idx) => (
              <div key={idx} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-grow">
                    <p className="font-medium">{item.insight}</p>
                    <p className="text-sm text-muted-foreground mt-1">{item.recommendation}</p>
                  </div>
                  <Badge variant={
                    item.value === 'high' ? 'default' :
                    item.value === 'medium' ? 'secondary' :
                    'outline'
                  }>
                    {item.value} value
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm">Apply Recommendation</Button>
                  <Button size="sm" variant="outline">Dismiss</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Adaptive Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layout className="h-5 w-5" />
            Adaptive Features Control
          </CardTitle>
          <CardDescription>
            Enable or disable specific AI personalization features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {adaptiveFeatures.map((feature, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{feature.name}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
                <Switch checked={feature.enabled} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}