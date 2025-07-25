import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Zap, Clock, Target, Brain, TrendingUp, Calendar } from "lucide-react";

export function AIProductivityProphet() {
  const productivityForecast = [
    {
      period: "Tomorrow Morning",
      score: 94,
      confidence: 89,
      factors: ["8+ hours sleep projected", "Low cortisol levels", "Clear calendar 9-11 AM"],
      optimal_tasks: ["Deep work", "Complex problem solving", "Strategic planning"]
    },
    {
      period: "Wednesday Afternoon", 
      score: 67,
      confidence: 82,
      factors: ["Post-lunch energy dip", "3 meetings scheduled", "High cognitive load"],
      optimal_tasks: ["Administrative tasks", "Email processing", "Routine activities"]
    },
    {
      period: "Friday Morning",
      score: 88,
      confidence: 91,
      factors: ["Week completion motivation", "Fewer interruptions", "Good sleep rhythm"],
      optimal_tasks: ["Creative work", "Project wrap-ups", "Learning activities"]
    }
  ];

  const focusPatterns = [
    {
      timeframe: "9:00 - 10:30 AM",
      focus_score: 96,
      duration: "90 minutes",
      peak_type: "Deep Focus",
      ideal_for: "Complex analysis, writing, coding"
    },
    {
      timeframe: "2:00 - 3:00 PM", 
      focus_score: 72,
      duration: "60 minutes",
      peak_type: "Steady Focus",
      ideal_for: "Review tasks, planning, communication"
    },
    {
      timeframe: "7:00 - 8:30 PM",
      focus_score: 85,
      duration: "90 minutes", 
      peak_type: "Creative Focus",
      ideal_for: "Learning, creative projects, reflection"
    }
  ];

  const productivityInsights = [
    {
      insight: "Productivity Rhythm Discovery",
      finding: "Your productivity follows a 28-day cycle, peaking every 4th Monday",
      impact: "Scheduling important projects on peak days increases success rate by 43%",
      action: "Block high-priority work during predicted peak periods"
    },
    {
      insight: "Context Switching Cost",
      finding: "Each interruption costs you 23 minutes of focus recovery time",
      impact: "Reducing interruptions by 50% could add 2.3 productive hours daily", 
      action: "Implement focused work blocks with communication boundaries"
    },
    {
      insight: "Energy-Task Mismatch",
      finding: "You do routine tasks during peak energy 31% of the time",
      impact: "Better task-energy alignment could boost output by 28%",
      action: "Reserve high-energy windows for demanding cognitive work"
    }
  ];

  const optimizationStrategies = [
    {
      strategy: "Circadian Productivity Alignment", 
      description: "Match task difficulty to your natural energy rhythms",
      implementation: "Schedule deep work during your 9-11 AM peak window",
      expected_gain: "+34% task completion efficiency"
    },
    {
      strategy: "Cognitive Load Balancing",
      description: "Distribute mental effort across the day to prevent burnout", 
      implementation: "Alternate high and low cognitive load tasks every 90 minutes",
      expected_gain: "+28% sustained performance"
    },
    {
      strategy: "Micro-Recovery Protocols",
      description: "Strategic breaks that enhance rather than disrupt flow states",
      implementation: "5-minute nature views between focus blocks",
      expected_gain: "+19% focus recovery speed"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Zap className="h-4 w-4 text-primary" />
              Peak Productivity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">Tomorrow 9AM</div>
            <div className="text-xs text-muted-foreground">94% predicted efficiency</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-blue-500" />
              Daily Focus Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">4.2h</div>
            <div className="text-xs text-muted-foreground">Average this week</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Target className="h-4 w-4 text-green-500" />
              Goal Completion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">87%</div>
            <div className="text-xs text-muted-foreground">This month's rate</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Brain className="h-4 w-4 text-purple-500" />
              Optimization Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">73/100</div>
            <div className="text-xs text-muted-foreground">Room for improvement</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Productivity Forecast - Next 7 Days
          </CardTitle>
          <CardDescription>
            AI-predicted productivity levels and optimal task scheduling
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {productivityForecast.map((forecast, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{forecast.period}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant={forecast.score > 80 ? "default" : forecast.score > 60 ? "secondary" : "destructive"}>
                      {forecast.score}% Productivity
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {forecast.confidence}% confidence
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Contributing Factors:</h4>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {forecast.factors.map((factor, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                  <h4 className="text-sm font-medium mb-2">Optimal Tasks:</h4>
                  <div className="flex flex-wrap gap-1">
                    {forecast.optimal_tasks.map((task, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {task}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Progress value={forecast.score} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Personal Focus Patterns
          </CardTitle>
          <CardDescription>
            Your unique daily focus windows identified by AI analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {focusPatterns.map((pattern, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="text-center">
                  <h3 className="font-semibold text-lg">{pattern.timeframe}</h3>
                  <Badge variant="default" className="mt-1">
                    {pattern.peak_type}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Focus Score:</span>
                    <span className="font-medium">{pattern.focus_score}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Duration:</span>
                    <span className="font-medium">{pattern.duration}</span>
                  </div>
                  <Progress value={pattern.focus_score} className="h-2" />
                  <div className="mt-3">
                    <h4 className="text-sm font-medium mb-1">Ideal For:</h4>
                    <p className="text-xs text-muted-foreground">{pattern.ideal_for}</p>
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
            <TrendingUp className="h-5 w-5 text-green-500" />
            AI Productivity Insights
          </CardTitle>
          <CardDescription>
            Unique patterns discovered in your productivity data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {productivityInsights.map((insight, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <h3 className="font-medium text-primary">{insight.insight}</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium">Finding: </span>
                    <span className="text-sm text-muted-foreground">{insight.finding}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Impact: </span>
                    <span className="text-sm text-green-600">{insight.impact}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium">Action: </span>
                      <span className="text-sm">{insight.action}</span>
                    </div>
                    <Button size="sm" variant="outline">Apply</Button>
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
            Personalized Optimization Strategies
          </CardTitle>
          <CardDescription>
            Science-backed strategies tailored to your unique productivity profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {optimizationStrategies.map((strategy, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{strategy.strategy}</h3>
                  <Badge variant="secondary">{strategy.expected_gain}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{strategy.description}</p>
                <div className="bg-muted/50 rounded p-3">
                  <h4 className="text-sm font-medium mb-1">Implementation:</h4>
                  <p className="text-sm">{strategy.implementation}</p>
                </div>
                <Button size="sm" className="w-full">Implement Strategy</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}