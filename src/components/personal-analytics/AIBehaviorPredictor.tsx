import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, AlertTriangle, TrendingUp, Calendar, Clock, Smile } from "lucide-react";

export function AIBehaviorPredictor() {
  const behaviorPredictions = [
    {
      behavior: "Procrastination Risk",
      probability: 73,
      timeframe: "Next 3 days",
      triggers: ["Large project deadlines", "Monday mornings", "After social events"],
      confidence: 91
    },
    {
      behavior: "Peak Performance Window",
      probability: 89,
      timeframe: "Tomorrow 10-11:30 AM",
      triggers: ["Good sleep (7+ hours)", "Morning exercise", "Healthy breakfast"],
      confidence: 94
    },
    {
      behavior: "Social Energy Depletion",
      probability: 67,
      timeframe: "Weekend",
      triggers: ["3+ social events this week", "Work stress", "Limited alone time"],
      confidence: 87
    },
    {
      behavior: "Creative Breakthrough",
      probability: 82,
      timeframe: "Thursday evening",
      triggers: ["Meditation this week", "Nature walk", "Low schedule density"],
      confidence: 78
    }
  ];

  const behaviorPatterns = [
    {
      pattern: "Decision Fatigue Cycle",
      frequency: "Every 12-14 days",
      description: "You make increasingly poor decisions after making 15+ significant choices",
      intervention: "Implement decision batching and delegate routine choices"
    },
    {
      pattern: "Motivation Spike Trigger",
      frequency: "After setbacks",
      description: "Your motivation increases 340% within 48 hours of perceived failures",
      intervention: "Channel this energy into structured goal pursuit"
    },
    {
      pattern: "Energy Crash Predictor",
      frequency: "Wednesdays, 3-4 PM",
      description: "Consistent energy dip correlated with lunch choices and meeting density",
      intervention: "Schedule light activities and optimize nutrition timing"
    }
  ];

  const interventionStrategies = [
    {
      scenario: "High Procrastination Risk Detected",
      strategy: "Micro-commitment technique",
      description: "Break tasks into 5-minute chunks when resistance patterns emerge",
      effectiveness: "78% success rate in past situations"
    },
    {
      scenario: "Social Battery Low",
      strategy: "Proactive recharge protocol",
      description: "Schedule 2-hour solo time with specific restoration activities",
      effectiveness: "85% success rate in maintaining social performance"
    },
    {
      scenario: "Creative Block Incoming",
      strategy: "Environmental shift trigger",
      description: "Change physical location and engage in unrelated manual activity",
      effectiveness: "71% success rate in breakthrough achievement"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Brain className="h-4 w-4 text-purple-500" />
              Prediction Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">87.3%</div>
            <div className="text-xs text-muted-foreground">Last 30 predictions</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-blue-500" />
              Patterns Identified
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">247</div>
            <div className="text-xs text-muted-foreground">Unique behavior patterns</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-green-500" />
              Intervention Success
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">74%</div>
            <div className="text-xs text-muted-foreground">Successful interventions</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Smile className="h-4 w-4 text-yellow-500" />
              Mood Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">↗️ Rising</div>
            <div className="text-xs text-muted-foreground">Next 48 hours</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Upcoming Behavior Predictions
          </CardTitle>
          <CardDescription>
            AI-powered forecasts based on your behavioral patterns and current context
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {behaviorPredictions.map((prediction, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{prediction.behavior}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant={prediction.probability > 70 ? "destructive" : "secondary"}>
                      {prediction.probability}% likely
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {prediction.confidence}% confidence
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {prediction.timeframe}
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Key Triggers:</h4>
                  <div className="flex flex-wrap gap-1">
                    {prediction.triggers.map((trigger, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {trigger}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Progress value={prediction.probability} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Discovered Behavior Patterns
          </CardTitle>
          <CardDescription>
            Unique patterns AI has identified in your behavior over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {behaviorPatterns.map((pattern, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{pattern.pattern}</h3>
                  <Badge variant="outline">{pattern.frequency}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{pattern.description}</p>
                <div className="bg-muted/50 rounded p-3">
                  <h4 className="text-sm font-medium mb-1">Recommended Intervention:</h4>
                  <p className="text-sm">{pattern.intervention}</p>
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
            Personalized Intervention Strategies
          </CardTitle>
          <CardDescription>
            Proven strategies tailored to your specific behavioral patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {interventionStrategies.map((strategy, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{strategy.scenario}</h3>
                  <Button size="sm" variant="outline">Activate</Button>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-primary mb-1">{strategy.strategy}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{strategy.description}</p>
                  <Badge variant="secondary" className="text-xs">
                    {strategy.effectiveness}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}