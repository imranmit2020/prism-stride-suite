import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, Zap, Target, Clock, Heart } from "lucide-react";

export function AILifeOptimizer() {
  const optimizationScores = [
    { area: "Sleep Quality", score: 78, trend: "up", potential: 94 },
    { area: "Work-Life Balance", score: 62, trend: "down", potential: 87 },
    { area: "Physical Health", score: 85, trend: "up", potential: 92 },
    { area: "Mental Wellness", score: 71, trend: "up", potential: 89 },
    { area: "Social Connections", score: 58, trend: "stable", potential: 83 },
    { area: "Personal Growth", score: 82, trend: "up", potential: 95 }
  ];

  const aiRecommendations = [
    {
      priority: "High",
      category: "Sleep Optimization",
      insight: "Your REM sleep drops 23% when you use devices 2+ hours before bed",
      action: "Implement a 2-hour digital sunset routine",
      impact: "+16% sleep quality, +12% next-day productivity"
    },
    {
      priority: "Medium",
      category: "Energy Management",
      insight: "You're most creative between 10-11:30 AM based on 6 months of data",
      action: "Schedule demanding creative work during your peak window",
      impact: "+31% creative output efficiency"
    },
    {
      priority: "High",
      category: "Social Wellness",
      insight: "Your happiness increases 40% after meaningful 1-on-1 conversations",
      action: "Schedule 2 deep conversations per week with close friends",
      impact: "+28% overall life satisfaction"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-2 border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              AI Life Score
            </CardTitle>
            <CardDescription>Overall life optimization potential</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary mb-2">74/100</div>
            <Progress value={74} className="mb-3" />
            <div className="text-sm text-muted-foreground">
              +6 points this month • 26% untapped potential
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Energy Efficiency
            </CardTitle>
            <CardDescription>How well you manage your daily energy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500 mb-2">68%</div>
            <div className="text-sm text-muted-foreground">
              Peak hours: 10AM-12PM, 7PM-9PM
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-500" />
              Goal Alignment
            </CardTitle>
            <CardDescription>Actions matching your values</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500 mb-2">81%</div>
            <div className="text-sm text-muted-foreground">
              Strong alignment with core values
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Life Area Optimization Scores
          </CardTitle>
          <CardDescription>
            Current performance vs. AI-calculated potential in key life areas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {optimizationScores.map((area, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{area.area}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant={area.trend === "up" ? "default" : area.trend === "down" ? "destructive" : "secondary"}>
                      {area.score}/100
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Potential: {area.potential}
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <Progress value={area.score} className="h-2" />
                  <div 
                    className="absolute top-0 h-2 bg-primary/20 rounded-full"
                    style={{ 
                      left: `${area.score}%`, 
                      width: `${area.potential - area.score}%` 
                    }}
                  />
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
            AI-Powered Life Optimization Recommendations
          </CardTitle>
          <CardDescription>
            Personalized insights based on your unique patterns and data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiRecommendations.map((rec, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant={rec.priority === "High" ? "destructive" : "secondary"}>
                    {rec.priority} Priority
                  </Badge>
                  <span className="text-sm font-medium text-muted-foreground">
                    {rec.category}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium mb-2">AI Insight:</h4>
                  <p className="text-sm text-muted-foreground mb-3">{rec.insight}</p>
                  <h4 className="font-medium mb-2">Recommended Action:</h4>
                  <p className="text-sm mb-3">{rec.action}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-600">
                      Expected Impact: {rec.impact}
                    </span>
                    <Button size="sm">Implement</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}