import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Repeat, Brain, Calendar, TrendingUp, Clock, Zap } from "lucide-react";

export function AIHabitFormationIntelligence() {
  const habitAnalysis = [
    {
      habit: "Morning Meditation",
      status: "Forming",
      day: 18,
      total_days: 66,
      automaticity: 67,
      strength: "Medium",
      risk_factors: ["Weekend inconsistency", "Travel disruption"],
      success_predictors: ["Morning routine anchor", "Immediate mood benefits"]
    },
    {
      habit: "Evening Reading",
      status: "Established", 
      day: 89,
      total_days: 66,
      automaticity: 94,
      strength: "Very Strong",
      risk_factors: ["Social evening events"],
      success_predictors: ["Strong environmental cue", "Intrinsic motivation"]
    },
    {
      habit: "Daily Journaling",
      status: "Struggling",
      day: 12,
      total_days: 66,
      automaticity: 34,
      strength: "Weak",
      risk_factors: ["No clear time slot", "Perfectionism barrier"],
      success_predictors: ["Values alignment", "Stress relief benefits"]
    }
  ];

  const formationScience = [
    {
      principle: "Cue-Routine-Reward Loop",
      your_pattern: "Visual cues increase habit execution by 89% in your case",
      optimization: "Place visual reminders in your primary daily paths",
      evidence: "12/14 successful habits had strong visual cues"
    },
    {
      principle: "Identity-Based Formation",
      your_pattern: "Identity language improves persistence by 156% for you",
      optimization: "Frame habits as 'I am someone who...' statements",
      evidence: "Exercise habit succeeded when framed as 'I am an athlete'"
    },
    {
      principle: "Environment Design",
      your_pattern: "Environmental friction reduces habit execution by 73%",
      optimization: "Remove barriers and create obvious trigger conditions",
      evidence: "Guitar practice 4x more consistent when guitar visible"
    },
    {
      principle: "Minimum Viable Habit",
      your_pattern: "You succeed with 2-minute start habits 91% of the time",
      optimization: "Begin every habit with a 2-minute version",
      evidence: "Reading habit started with 'read 1 page' commitment"
    }
  ];

  const stackingOpportunities = [
    {
      anchor_habit: "Morning Coffee",
      reliability: 98,
      stackable_habits: ["Meditation", "Planning", "Gratitude practice"],
      timing: "During coffee brewing (4-5 minutes)",
      success_rate: "87% for meditation stacking"
    },
    {
      anchor_habit: "Brushing Teeth",
      reliability: 99,
      stackable_habits: ["Affirmations", "Posture check", "Deep breathing"],
      timing: "While brushing (2 minutes)",
      success_rate: "94% for affirmation practice"
    },
    {
      anchor_habit: "Checking Phone (Evening)",
      reliability: 96,
      stackable_habits: ["Gratitude logging", "Next day prep", "Wind-down ritual"],
      timing: "After last phone check",
      success_rate: "78% for gratitude practice"
    }
  ];

  const personalizedStrategies = [
    {
      strategy: "Temporal Anchoring",
      description: "Link new habits to specific times when your willpower is highest",
      your_optimal_times: ["7:30-8:00 AM", "6:00-6:30 PM"],
      implementation: "Schedule habit practice during natural energy peaks",
      expected_success: "84% formation rate"
    },
    {
      strategy: "Progressive Complexity",
      description: "Gradually increase habit difficulty once automaticity develops",
      your_pattern: "Best results when complexity increases every 21 days",
      implementation: "Start simple, add elements at 3-week intervals",
      expected_success: "91% long-term maintenance"
    },
    {
      strategy: "Social Integration",
      description: "Leverage your social connections for habit reinforcement",
      your_pattern: "Social habits have 67% higher success rate",
      implementation: "Share progress weekly with accountability partner",
      expected_success: "79% improved consistency"
    }
  ];

  const interventionProtocols = [
    {
      scenario: "3+ Day Streak Break",
      intervention: "Reset Protocol",
      description: "Immediate re-engagement strategy to prevent habit decay",
      actions: ["Analyze failure point", "Reduce complexity", "Restart tomorrow"],
      recovery_rate: "73% successful re-establishment"
    },
    {
      scenario: "Motivation Decline",
      intervention: "Benefit Reconnection",
      description: "Reconnect with core benefits and progress made",
      actions: ["Review habit benefits journal", "Visualize compound effects", "Celebrate small wins"],
      recovery_rate: "81% motivation restoration"
    },
    {
      scenario: "Environmental Disruption",
      intervention: "Adaptation Strategy",
      description: "Maintain habit essence in new environments",
      actions: ["Identify core habit element", "Create portable version", "Use implementation intentions"],
      recovery_rate: "67% habit maintenance during disruption"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Repeat className="h-4 w-4 text-blue-500" />
              Active Habits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">3</div>
            <div className="text-xs text-muted-foreground">1 established, 2 forming</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500" />
              Formation Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">78%</div>
            <div className="text-xs text-muted-foreground">Personal success rate</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Brain className="h-4 w-4 text-purple-500" />
              Automaticity Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">65%</div>
            <div className="text-xs text-muted-foreground">Average across habits</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-orange-500" />
              Streak Record
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">89 days</div>
            <div className="text-xs text-muted-foreground">Evening reading habit</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Repeat className="h-5 w-5" />
            Habit Formation Progress Analysis
          </CardTitle>
          <CardDescription>
            AI-powered tracking of your habit development stages and success predictors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {habitAnalysis.map((habit, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{habit.habit}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      habit.status === "Established" ? "default" : 
                      habit.status === "Forming" ? "secondary" : "destructive"
                    }>
                      {habit.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Day {habit.day}/{habit.total_days}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Automaticity Level</span>
                    <span className="font-medium">{habit.automaticity}%</span>
                  </div>
                  <Progress value={habit.automaticity} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span>Habit Strength</span>
                    <Badge variant="outline">{habit.strength}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2 text-red-600">Risk Factors:</h4>
                    <div className="space-y-1">
                      {habit.risk_factors.map((risk, i) => (
                        <div key={i} className="text-xs text-muted-foreground">• {risk}</div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2 text-green-600">Success Predictors:</h4>
                    <div className="space-y-1">
                      {habit.success_predictors.map((predictor, i) => (
                        <div key={i} className="text-xs text-muted-foreground">• {predictor}</div>
                      ))}
                    </div>
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
            <Brain className="h-5 w-5 text-purple-500" />
            Personal Habit Formation Science
          </CardTitle>
          <CardDescription>
            Behavioral science principles customized to your unique patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {formationScience.map((principle, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <h3 className="font-medium text-primary">{principle.principle}</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium">Your Pattern: </span>
                    <span className="text-sm text-muted-foreground">{principle.your_pattern}</span>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/20 rounded p-3">
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Optimization: </span>
                    <span className="text-sm text-blue-600 dark:text-blue-300">{principle.optimization}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Evidence: </span>
                    <span className="text-sm text-green-600">{principle.evidence}</span>
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
            <Zap className="h-5 w-5 text-yellow-500" />
            Habit Stacking Opportunities
          </CardTitle>
          <CardDescription>
            Leverage your existing reliable habits to build new ones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stackingOpportunities.map((stack, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{stack.anchor_habit}</h3>
                  <Badge variant="default">{stack.reliability}% Reliable</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Stackable Habits:</h4>
                    <div className="flex flex-wrap gap-1">
                      {stack.stackable_habits.map((habit, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {habit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Timing:</h4>
                    <p className="text-sm text-muted-foreground">{stack.timing}</p>
                    <Badge variant="outline" className="text-xs mt-1">
                      {stack.success_rate}
                    </Badge>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full">
                  Create Habit Stack
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Personalized Formation Strategies
          </CardTitle>
          <CardDescription>
            Evidence-based strategies optimized for your behavior patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {personalizedStrategies.map((strategy, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{strategy.strategy}</h3>
                  <Badge variant="default">{strategy.expected_success}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{strategy.description}</p>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium">Your Pattern: </span>
                    <span className="text-sm">{strategy.your_pattern || strategy.your_optimal_times?.join(", ")}</span>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950/20 rounded p-3">
                    <span className="text-sm font-medium text-green-700 dark:text-green-400">Implementation: </span>
                    <span className="text-sm text-green-600 dark:text-green-300">{strategy.implementation}</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full">
                  Apply Strategy
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-500" />
            Intervention Protocols
          </CardTitle>
          <CardDescription>
            Automated responses to common habit formation challenges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {interventionProtocols.map((protocol, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{protocol.scenario}</h3>
                  <Badge variant="secondary">{protocol.recovery_rate}</Badge>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-primary mb-1">{protocol.intervention}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{protocol.description}</p>
                  <div className="space-y-1">
                    <h5 className="text-xs font-medium">Actions:</h5>
                    {protocol.actions.map((action, i) => (
                      <div key={i} className="text-xs text-muted-foreground">• {action}</div>
                    ))}
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full">
                  Configure Auto-Response
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}