import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Settings, Brain, Lightbulb, Target, Zap, Clock, Palette, Layout } from "lucide-react";

export function AIPreferenceEngine() {
  const [autoAdjust, setAutoAdjust] = useState(true);
  const [adaptationSpeed, setAdaptationSpeed] = useState([70]);
  const [privacyLevel, setPrivacyLevel] = useState([85]);

  // Revolutionary AI preference learning data
  const learnedPreferences = [
    {
      category: "Work Schedule",
      preference: "Peak productivity: 9-11 AM, 2-4 PM",
      confidence: 94,
      daysLearned: 23,
      adaptations: ["Meeting scheduling", "Report delivery", "Notification timing"]
    },
    {
      category: "Information Density",
      preference: "Detailed data preferred over summaries",
      confidence: 89,
      daysLearned: 18,
      adaptations: ["Dashboard widgets", "Report format", "Email content"]
    },
    {
      category: "Visual Style",
      preference: "High contrast, blue-dominant color schemes",
      confidence: 91,
      daysLearned: 31,
      adaptations: ["Theme selection", "Chart colors", "UI elements"]
    },
    {
      category: "Interaction Pattern",
      preference: "Keyboard shortcuts over mouse clicks (73% usage)",
      confidence: 96,
      daysLearned: 45,
      adaptations: ["Quick actions", "Navigation", "Shortcut suggestions"]
    }
  ];

  const adaptationSettings = [
    {
      name: "Predictive UI Adjustments",
      description: "AI predicts and pre-loads likely next actions",
      enabled: true,
      impact: "34% faster task completion",
      privacyLevel: "Medium"
    },
    {
      name: "Contextual Content",
      description: "Automatically filters information based on current focus",
      enabled: true,
      impact: "67% better information relevance",
      privacyLevel: "High"
    },
    {
      name: "Mood-Based Adaptations",
      description: "Adjusts interface based on stress level indicators",
      enabled: false,
      impact: "23% reduced cognitive load",
      privacyLevel: "High"
    },
    {
      name: "Collaborative Intelligence",
      description: "Learns from team patterns to suggest optimizations",
      enabled: true,
      impact: "45% better team coordination",
      privacyLevel: "Medium"
    },
    {
      name: "Temporal Pattern Learning",
      description: "Adapts based on time-of-day performance patterns",
      enabled: true,
      impact: "28% productivity improvement",
      privacyLevel: "Low"
    }
  ];

  const aiSuggestions = [
    {
      id: 1,
      title: "Enable Dark Mode Scheduling",
      description: "AI detected you prefer dark themes after 6 PM",
      impact: "Reduce eye strain by 31%",
      effort: "1 click",
      confidence: 87
    },
    {
      id: 2,
      title: "Optimize Widget Layout",
      description: "Frequently used analytics should be moved to top-left",
      impact: "12% faster access to key data",
      effort: "Auto-applied",
      confidence: 92
    },
    {
      id: 3,
      title: "Smart Notification Batching",
      description: "Group similar notifications during your focus hours",
      impact: "45% fewer interruptions",
      effort: "Configure once",
      confidence: 89
    }
  ];

  const learningMetrics = {
    totalDataPoints: 2847,
    patternAccuracy: 94,
    adaptationSuccess: 87,
    userSatisfaction: 91,
    learningDays: 45,
    activeAdaptations: 23
  };

  const privacyControls = [
    { setting: "Behavior Tracking", level: "Essential only", enabled: true },
    { setting: "Usage Analytics", level: "Anonymous aggregated", enabled: true },
    { setting: "Preference Sharing", level: "Team optimization only", enabled: false },
    { setting: "External Integration", level: "Disabled", enabled: false },
    { setting: "Data Retention", level: "30 days", enabled: true }
  ];

  return (
    <div className="space-y-6">
      {/* AI Preference Engine Header */}
      <Card className="border-2 border-teal-200 bg-gradient-to-r from-teal-50 to-green-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Brain className="h-6 w-6 text-teal-600" />
                AI Preference Learning Engine
              </CardTitle>
              <CardDescription>
                Revolutionary adaptive system that learns and evolves with your unique work patterns
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Auto-Adjust</span>
                <Switch checked={autoAdjust} onCheckedChange={setAutoAdjust} />
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Learning Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Learning Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-teal-600">{learningMetrics.patternAccuracy}%</div>
            <Progress value={learningMetrics.patternAccuracy} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Data Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{learningMetrics.totalDataPoints.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Collected patterns</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Active Adaptations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{learningMetrics.activeAdaptations}</div>
            <p className="text-xs text-muted-foreground mt-1">Currently applied</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{learningMetrics.userSatisfaction}%</div>
            <p className="text-xs text-muted-foreground mt-1">AI effectiveness</p>
          </CardContent>
        </Card>
      </div>

      {/* Learned Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            AI-Discovered Preferences
          </CardTitle>
          <CardDescription>
            Intelligent analysis of your behavior patterns and work preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {learnedPreferences.map((pref, idx) => (
              <div key={idx} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{pref.category}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{pref.confidence}% confidence</Badge>
                    <Badge variant="secondary">{pref.daysLearned} days learning</Badge>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{pref.preference}</p>

                <div>
                  <h4 className="text-sm font-medium mb-2">Applied Adaptations:</h4>
                  <div className="flex flex-wrap gap-1">
                    {pref.adaptations.map((adaptation, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {adaptation}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="bg-teal-50 p-3 rounded">
                  <div className="flex items-center justify-between text-sm">
                    <span>Learning Progress</span>
                    <span className="font-medium">{pref.confidence}%</span>
                  </div>
                  <Progress value={pref.confidence} className="mt-2 h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Adaptation Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            AI Adaptation Controls
          </CardTitle>
          <CardDescription>
            Fine-tune how aggressively AI learns and adapts to your preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium">Adaptation Speed</span>
                <span className="text-lg font-bold text-teal-600">{adaptationSpeed[0]}%</span>
              </div>
              <Slider
                value={adaptationSpeed}
                onValueChange={setAdaptationSpeed}
                max={100}
                step={10}
                className="w-full"
              />
              <div className="grid grid-cols-3 text-xs text-muted-foreground mt-2">
                <span>Conservative</span>
                <span className="text-center">Balanced</span>
                <span className="text-right">Aggressive</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium">Privacy Level</span>
                <span className="text-lg font-bold text-purple-600">{privacyLevel[0]}%</span>
              </div>
              <Slider
                value={privacyLevel}
                onValueChange={setPrivacyLevel}
                max={100}
                step={5}
                className="w-full"
              />
              <div className="grid grid-cols-3 text-xs text-muted-foreground mt-2">
                <span>Open</span>
                <span className="text-center">Balanced</span>
                <span className="text-right">Private</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Adaptive Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Intelligent Adaptation Features
          </CardTitle>
          <CardDescription>
            Enable specific AI learning capabilities for different aspects of your workflow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {adaptationSettings.map((setting, idx) => (
              <div key={idx} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{setting.name}</h3>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </div>
                  <Switch checked={setting.enabled} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-green-50 p-3 rounded">
                    <span className="font-medium text-green-700">Impact: </span>
                    <span className="text-green-600">{setting.impact}</span>
                  </div>
                  <div className="bg-purple-50 p-3 rounded">
                    <span className="font-medium text-purple-700">Privacy: </span>
                    <Badge variant={
                      setting.privacyLevel === 'Low' ? 'default' :
                      setting.privacyLevel === 'Medium' ? 'secondary' :
                      'destructive'
                    } className="ml-1">
                      {setting.privacyLevel}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            AI Optimization Suggestions
          </CardTitle>
          <CardDescription>
            Intelligent recommendations based on your usage patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiSuggestions.map((suggestion) => (
              <div key={suggestion.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{suggestion.title}</h3>
                  <Badge variant="outline">{suggestion.confidence}% confidence</Badge>
                </div>

                <p className="text-sm text-muted-foreground">{suggestion.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded">
                    <span className="font-medium text-blue-700">Expected Impact: </span>
                    <span className="text-blue-600">{suggestion.impact}</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <span className="font-medium text-gray-700">Implementation: </span>
                    <span className="text-gray-600">{suggestion.effort}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                    Apply Suggestion
                  </Button>
                  <Button size="sm" variant="outline">
                    Learn More
                  </Button>
                  <Button size="sm" variant="outline">
                    Not Interested
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Privacy Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layout className="h-5 w-5" />
            AI Learning Privacy Controls
          </CardTitle>
          <CardDescription>
            Granular control over what data AI uses for learning your preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {privacyControls.map((control, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{control.setting}</h4>
                  <p className="text-sm text-muted-foreground">Current: {control.level}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={control.enabled} />
                  <Button size="sm" variant="outline">
                    Configure
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 mt-6">
            <h4 className="font-medium text-blue-700 mb-2">Data Usage Summary</h4>
            <p className="text-sm text-blue-600">
              AI is currently learning from your interface interactions and timing patterns. 
              No personal content or sensitive data is analyzed. All learning happens locally 
              with encrypted pattern storage.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}