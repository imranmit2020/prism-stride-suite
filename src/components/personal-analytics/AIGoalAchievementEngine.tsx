import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Target, TrendingUp, AlertTriangle, CheckCircle, Clock, Zap } from "lucide-react";

export function AIGoalAchievementEngine() {
  const goalPredictions = [
    {
      goal: "Complete Online Course",
      probability: 89,
      timeline: "3 weeks remaining",
      confidence: 94,
      key_factors: ["Consistent daily progress", "High engagement", "Good time allocation"],
      risks: ["Upcoming work deadlines", "Course difficulty increase"],
      interventions: ["Block 1-hour daily study time", "Connect with study group"]
    },
    {
      goal: "Morning Exercise Habit",
      probability: 67,
      timeline: "Day 23 of 66-day formation",
      confidence: 82,
      key_factors: ["Morning motivation peak", "Visible progress"],
      risks: ["Weekend consistency drop", "Weather dependency"],
      interventions: ["Indoor backup routine", "Weekend accountability partner"]
    },
    {
      goal: "Save $5,000 Emergency Fund",
      probability: 94,
      timeline: "2 months ahead of schedule",
      confidence: 97,
      key_factors: ["Automated savings", "Reduced unnecessary spending"],
      risks: ["Unexpected expenses", "Income variation"],
      interventions: ["Increase automation", "Set up expense alerts"]
    }
  ];

  const achievementPatterns = [
    {
      pattern: "Momentum Multiplier Effect",
      description: "Your goal completion rate increases 340% after achieving any goal",
      utilization: "Chain goals together with 1-week gaps for maximum momentum",
      historical_data: "87% success rate when following this pattern"
    },
    {
      pattern: "Social Accountability Amplifier", 
      description: "Goals shared with others have 78% higher completion rates",
      utilization: "Share progress weekly with accountability partner or group",
      historical_data: "12/15 socially shared goals completed vs 3/8 private goals"
    },
    {
      pattern: "Environmental Design Success",
      description: "Physical environment changes boost goal success by 156%",
      utilization: "Modify your space to make desired actions easier than alternatives",
      historical_data: "Gym bag by door = 89% workout consistency"
    }
  ];

  const motivationInsights = [
    {
      factor: "Progress Visibility",
      impact: 94,
      description: "Visual progress tracking increases persistence by 67%",
      optimal_method: "Daily visual check-ins with progress charts"
    },
    {
      factor: "Micro-Celebrations",
      impact: 88,
      description: "Small rewards for milestones maintain motivation over time",
      optimal_method: "Celebrate 25%, 50%, 75% completion milestones"
    },
    {
      factor: "Future Self Visualization",
      impact: 82,
      description: "Imagining goal completion creates emotional drive",
      optimal_method: "5-minute visualization before each action session"
    },
    {
      factor: "Identity-Based Framing",
      impact: 91,
      description: "Viewing yourself as the type of person who achieves goals",
      optimal_method: "Use identity language: 'I am someone who...' statements"
    }
  ];

  const strategicInterventions = [
    {
      scenario: "Motivation Decline Detected",
      intervention: "Reconnect with Core Why",
      description: "Return to fundamental reasons behind the goal",
      timing: "When progress drops below 70% of baseline",
      success_rate: "79% motivation recovery"
    },
    {
      scenario: "Consistency Challenges",
      intervention: "Micro-Habit Implementation",
      description: "Break goal into 2-minute daily actions",
      timing: "After 3 consecutive missed days",
      success_rate: "84% habit resurrection"
    },
    {
      scenario: "Overwhelm Pattern",
      intervention: "Goal Hierarchy Restructure",
      description: "Focus on one primary goal, pause others",
      timing: "When juggling 3+ active goals",
      success_rate: "91% completion rate for prioritized goal"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Target className="h-4 w-4 text-green-500" />
              Active Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">7</div>
            <div className="text-xs text-muted-foreground">3 high probability</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">78%</div>
            <div className="text-xs text-muted-foreground">Last 12 months</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Zap className="h-4 w-4 text-purple-500" />
              Motivation Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">84/100</div>
            <div className="text-xs text-muted-foreground">High momentum phase</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-orange-500" />
              Next Milestone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">5 days</div>
            <div className="text-xs text-muted-foreground">Course module completion</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            AI Goal Achievement Predictions
          </CardTitle>
          <CardDescription>
            Probability analysis and strategic interventions for your active goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {goalPredictions.map((goal, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{goal.goal}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant={goal.probability > 80 ? "default" : goal.probability > 60 ? "secondary" : "destructive"}>
                      {goal.probability}% Success Probability
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {goal.confidence}% confidence
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {goal.timeline}
                </div>
                
                <Progress value={goal.probability} className="h-3" />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2 text-green-600">Success Factors:</h4>
                    <div className="space-y-1">
                      {goal.key_factors.map((factor, i) => (
                        <div key={i} className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span className="text-xs">{factor}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2 text-orange-600">Risk Factors:</h4>
                    <div className="space-y-1">
                      {goal.risks.map((risk, i) => (
                        <div key={i} className="flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3 text-orange-500" />
                          <span className="text-xs">{risk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2 text-blue-600">Interventions:</h4>
                    <div className="space-y-1">
                      {goal.interventions.map((intervention, i) => (
                        <div key={i} className="flex items-center gap-1">
                          <Zap className="h-3 w-3 text-blue-500" />
                          <span className="text-xs">{intervention}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Adjust Strategy</Button>
                  <Button size="sm">Apply Interventions</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-500" />
            Personal Achievement Patterns
          </CardTitle>
          <CardDescription>
            Unique patterns discovered in your goal completion behavior
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {achievementPatterns.map((pattern, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <h3 className="font-medium text-primary">{pattern.pattern}</h3>
                <p className="text-sm text-muted-foreground">{pattern.description}</p>
                <div className="bg-green-50 dark:bg-green-950/20 rounded p-3">
                  <h4 className="text-sm font-medium mb-1 text-green-700 dark:text-green-400">How to Use:</h4>
                  <p className="text-sm text-green-600 dark:text-green-300">{pattern.utilization}</p>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {pattern.historical_data}
                  </Badge>
                  <Button size="sm" variant="outline">Apply Pattern</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Motivation Optimization Factors
          </CardTitle>
          <CardDescription>
            Evidence-based factors that maximize your goal persistence
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {motivationInsights.map((insight, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{insight.factor}</h3>
                  <Badge variant="default">{insight.impact}% Impact</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
                <div className="bg-blue-50 dark:bg-blue-950/20 rounded p-3">
                  <h4 className="text-sm font-medium mb-1 text-blue-700 dark:text-blue-400">Optimal Method:</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-300">{insight.optimal_method}</p>
                </div>
                <Progress value={insight.impact} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Strategic Intervention Protocols
          </CardTitle>
          <CardDescription>
            Automated responses to common goal achievement challenges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {strategicInterventions.map((strategy, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{strategy.scenario}</h3>
                  <Badge variant="secondary">{strategy.success_rate}</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Intervention:</h4>
                    <p className="text-sm font-medium text-primary">{strategy.intervention}</p>
                    <p className="text-sm text-muted-foreground mt-1">{strategy.description}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Timing:</h4>
                    <p className="text-sm">{strategy.timing}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full">
                  Configure Auto-Intervention
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}