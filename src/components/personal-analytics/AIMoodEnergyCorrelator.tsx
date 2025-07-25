import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart, Battery, Sun, Moon, TrendingUp, Zap } from "lucide-react";

export function AIMoodEnergyCorrelator() {
  const correlationInsights = [
    {
      correlation: "Sleep Quality ↔ Mood Stability", 
      strength: 0.87,
      finding: "Every hour of quality sleep below 7 decreases mood stability by 23%",
      actionable: "Maintain 7.5+ hours sleep for optimal emotional regulation"
    },
    {
      correlation: "Exercise ↔ Energy Levels",
      strength: 0.82, 
      finding: "30-minute morning workouts boost energy levels for 14+ hours",
      actionable: "Schedule workouts before 10 AM for maximum energy return"
    },
    {
      correlation: "Social Interaction ↔ Happiness",
      strength: 0.79,
      finding: "Meaningful conversations increase happiness by 40% for 48 hours", 
      actionable: "Schedule 2+ deep conversations weekly for sustained wellbeing"
    },
    {
      correlation: "Screen Time ↔ Energy Depletion",
      strength: -0.74,
      finding: "Each hour of evening screen time reduces next-day energy by 12%",
      actionable: "Implement digital sunset 2 hours before bedtime"
    }
  ];

  const energyPatterns = [
    {
      time: "6:00 AM",
      energy: 45,
      mood: 60,
      factors: ["Natural wake-up", "Morning light"],
      optimal_for: "Light movement, planning"
    },
    {
      time: "9:00 AM", 
      energy: 90,
      mood: 85,
      factors: ["Cortisol peak", "Fresh start feeling"],
      optimal_for: "Deep work, important decisions"
    },
    {
      time: "2:00 PM",
      energy: 65,
      mood: 70, 
      factors: ["Post-lunch dip", "Circadian rhythm low"],
      optimal_for: "Routine tasks, collaboration"
    },
    {
      time: "7:00 PM",
      energy: 75,
      mood: 80,
      factors: ["End of workday", "Social time"],
      optimal_for: "Creative work, socializing"
    }
  ];

  const moodTriggers = [
    {
      trigger: "Gratitude Practice",
      impact: "+34% mood improvement",
      duration: "6-8 hours",
      frequency: "Daily, 5 minutes",
      evidence: "89% consistency in mood boost"
    },
    {
      trigger: "Nature Exposure", 
      impact: "+28% stress reduction",
      duration: "4-6 hours",
      frequency: "3x weekly, 20 minutes",
      evidence: "Cortisol levels drop by 21%"
    },
    {
      trigger: "Music Therapy",
      impact: "+45% emotional regulation", 
      duration: "2-3 hours",
      frequency: "As needed",
      evidence: "Immediate mood state change"
    }
  ];

  const energyOptimization = [
    {
      strategy: "Ultradian Rhythm Alignment",
      description: "Match tasks to your natural 90-minute energy cycles",
      implementation: "Work in 90-min focused blocks with 20-min recovery",
      energy_gain: "+41% sustained performance"
    },
    {
      strategy: "Micro-Energy Investments",
      description: "Small actions that yield disproportionate energy returns",
      implementation: "5-min cold shower, 2-min breathing exercise, 10-min walk",
      energy_gain: "+27% baseline energy"
    },
    {
      strategy: "Emotional Energy Banking",
      description: "Build emotional reserves during high-energy periods",
      implementation: "Create positive anchors and stress-relief protocols",
      energy_gain: "+33% resilience to energy drains"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Heart className="h-4 w-4 text-red-500" />
              Current Mood
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">Positive</div>
            <div className="text-xs text-muted-foreground">7.2/10 • Stable trend</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Battery className="h-4 w-4 text-yellow-500" />
              Energy Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">78%</div>
            <div className="text-xs text-muted-foreground">High • Peak in 2 hours</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Sun className="h-4 w-4 text-blue-500" />
              Circadian Phase
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">Rising</div>
            <div className="text-xs text-muted-foreground">Morning activation phase</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-purple-500" />
              Correlation Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">0.84</div>
            <div className="text-xs text-muted-foreground">Strong patterns detected</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Mood-Energy Correlation Insights
          </CardTitle>
          <CardDescription>
            AI-discovered connections between your lifestyle factors and wellbeing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {correlationInsights.map((insight, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{insight.correlation}</h3>
                  <Badge variant={insight.strength > 0.8 ? "default" : insight.strength > 0.6 ? "secondary" : "outline"}>
                    {Math.abs(insight.strength).toFixed(2)} correlation
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium">Finding: </span>
                    <span className="text-sm text-muted-foreground">{insight.finding}</span>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950/20 rounded p-3">
                    <span className="text-sm font-medium text-green-700 dark:text-green-400">Actionable Insight: </span>
                    <span className="text-sm text-green-600 dark:text-green-300">{insight.actionable}</span>
                  </div>
                </div>
                <Progress value={Math.abs(insight.strength) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Daily Energy & Mood Patterns
          </CardTitle>
          <CardDescription>
            Your personalized daily rhythm for optimal scheduling
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {energyPatterns.map((pattern, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{pattern.time}</h3>
                  <div className="flex gap-2">
                    <Badge variant="outline">⚡ {pattern.energy}%</Badge>
                    <Badge variant="outline">😊 {pattern.mood}%</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Energy</span>
                    <Progress value={pattern.energy} className="w-24 h-2" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Mood</span>
                    <Progress value={pattern.mood} className="w-24 h-2" />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Key Factors:</h4>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {pattern.factors.map((factor, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <strong>Optimal for:</strong> {pattern.optimal_for}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Personalized Mood Boosters
          </CardTitle>
          <CardDescription>
            Evidence-based interventions tailored to your response patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {moodTriggers.map((trigger, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <h3 className="font-medium text-center">{trigger.trigger}</h3>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">{trigger.impact}</div>
                  <div className="text-xs text-muted-foreground">Lasts {trigger.duration}</div>
                </div>
                <div className="space-y-1 text-sm">
                  <div><strong>Frequency:</strong> {trigger.frequency}</div>
                  <div><strong>Evidence:</strong> {trigger.evidence}</div>
                </div>
                <Button size="sm" className="w-full">Activate Now</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Battery className="h-5 w-5 text-blue-500" />
            Energy Optimization Strategies
          </CardTitle>
          <CardDescription>
            Advanced techniques for sustainable energy management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {energyOptimization.map((strategy, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{strategy.strategy}</h3>
                  <Badge variant="default">{strategy.energy_gain}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{strategy.description}</p>
                <div className="bg-blue-50 dark:bg-blue-950/20 rounded p-3">
                  <h4 className="text-sm font-medium mb-1 text-blue-700 dark:text-blue-400">Implementation:</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-300">{strategy.implementation}</p>
                </div>
                <Button size="sm" className="w-full" variant="outline">Start 7-Day Trial</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}