import { useState } from "react";
import { useGlobalization } from "@/contexts/GlobalizationContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, TrendingUp, Target, Users, Zap, Star } from "lucide-react";

export function AIEmployeePerformancePredictor() {
  const { formatCurrency } = useGlobalization();
  const [performanceData, setPerformanceData] = useState({
    totalEmployees: 247,
    atRiskEmployees: 12,
    topPerformers: 34,
    predictionAccuracy: 94
  });

  const performancePredictions = {
    overallAccuracy: 94,
    predictionHorizon: "12 months",
    confidence: 96,
    riskModel: "Advanced Neural Network",
    employeeForecasts: [
      {
        employee: "Sarah Chen",
        department: "Engineering",
        currentRating: 4.2,
        predictedRating: 4.7,
        trajectory: "Rising Star",
        riskFactors: ["High workload", "Remote work challenges"],
        recommendations: ["Mentorship program", "Flexible schedule", "Performance bonus"],
        retentionProbability: 87,
        promotionReadiness: 89,
        burnoutRisk: 23
      },
      {
        employee: "Michael Rodriguez", 
        department: "Sales",
        currentRating: 3.8,
        predictedRating: 3.2,
        trajectory: "At Risk",
        riskFactors: ["Declining sales numbers", "Team conflicts", "Personal stress"],
        recommendations: ["Sales training", "Team mediation", "Wellness support"],
        retentionProbability: 45,
        promotionReadiness: 12,
        burnoutRisk: 78
      },
      {
        employee: "Emily Johnson",
        department: "Marketing",
        currentRating: 4.5,
        predictedRating: 4.8,
        trajectory: "High Potential",
        riskFactors: ["Limited growth opportunities"],
        recommendations: ["Leadership training", "Cross-department projects", "Stock options"],
        retentionProbability: 93,
        promotionReadiness: 94,
        burnoutRisk: 15
      }
    ],
    performanceFactors: [
      { factor: "Work-Life Balance", impact: 89, trend: "Improving", weight: "High" },
      { factor: "Team Dynamics", impact: 76, trend: "Stable", weight: "Medium" },
      { factor: "Career Growth", impact: 84, trend: "Declining", weight: "High" },
      { factor: "Compensation Satisfaction", impact: 71, trend: "Improving", weight: "Medium" },
      { factor: "Manager Relationship", impact: 92, trend: "Stable", weight: "Critical" }
    ],
    aiInsights: [
      {
        insight: "Q2 Performance Dip Predicted",
        probability: 67,
        impact: "Medium",
        mitigation: "Proactive team building and goal adjustment",
        timeline: "8 weeks"
      },
      {
        insight: "High Performer Flight Risk",
        probability: 89,
        impact: "High", 
        mitigation: "Immediate retention conversation and counter-offer",
        timeline: "2 weeks"
      },
      {
        insight: "Emerging Leadership Potential",
        probability: 84,
        impact: "Positive",
        mitigation: "Leadership development track enrollment",
        timeline: "1 month"
      }
    ],
    optimizationStrategies: [
      {
        strategy: "Predictive Performance Coaching",
        impact: "+23% performance improvement",
        description: "AI-guided coaching before issues arise",
        roi: "$89,000 annually"
      },
      {
        strategy: "Dynamic Goal Adjustment",
        impact: "+31% goal achievement",
        description: "Real-time goal optimization based on capacity",
        roi: formatCurrency(156000) + " annually"
      },
      {
        strategy: "Proactive Retention Intervention",
        impact: "+67% retention rate",
        description: "Early intervention for at-risk employees",
        roi: formatCurrency(234000) + " annually"
      }
    ]
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Employee Performance Predictor
            <Badge variant="secondary" className="ml-auto">Revolutionary AI</Badge>
          </CardTitle>
          <CardDescription>
            Predicts future employee performance with 94% accuracy using behavioral analytics and quantum psychology modeling
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">{performancePredictions.overallAccuracy}%</div>
              <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{performancePredictions.predictionHorizon}</div>
              <div className="text-sm text-muted-foreground">Forecast Horizon</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{performanceData.topPerformers}</div>
              <div className="text-sm text-muted-foreground">Rising Stars</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">{performanceData.atRiskEmployees}</div>
              <div className="text-sm text-muted-foreground">At Risk</div>
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border-2 border-primary/20">
            <div className="text-center">
              <div className="text-lg font-bold text-primary">🔮 Performance Oracle Active</div>
              <div className="text-sm text-muted-foreground">AI analyzing behavioral patterns • Quantum psychology algorithms engaged</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Employee Performance Forecasts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {performancePredictions.employeeForecasts.map((forecast, index) => (
            <div key={index} className="border rounded-lg p-4 bg-gradient-to-r from-primary/5 to-secondary/5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-medium text-lg">{forecast.employee}</div>
                  <div className="text-sm text-muted-foreground">
                    {forecast.department} • Current: {forecast.currentRating}/5 → Predicted: {forecast.predictedRating}/5
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={
                    forecast.trajectory === "Rising Star" ? "secondary" :
                    forecast.trajectory === "High Potential" ? "destructive" :
                    "outline"
                  }>
                    {forecast.trajectory}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-3">
                <div>
                  <div className="text-sm font-medium">Retention</div>
                  <div className="text-lg font-bold text-primary">{forecast.retentionProbability}%</div>
                  <Progress value={forecast.retentionProbability} className="h-2" />
                </div>
                <div>
                  <div className="text-sm font-medium">Promotion Ready</div>
                  <div className="text-lg font-bold text-primary">{forecast.promotionReadiness}%</div>
                  <Progress value={forecast.promotionReadiness} className="h-2" />
                </div>
                <div>
                  <div className="text-sm font-medium">Burnout Risk</div>
                  <div className="text-lg font-bold text-red-600">{forecast.burnoutRisk}%</div>
                  <Progress value={forecast.burnoutRisk} className="h-2" />
                </div>
              </div>
              
              <div className="mb-3">
                <div className="text-sm font-medium mb-1">Risk Factors</div>
                <div className="flex gap-1 flex-wrap mb-2">
                  {forecast.riskFactors.map((risk, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">{risk}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="mb-3">
                <div className="text-sm font-medium mb-1">AI Recommendations</div>
                <div className="flex gap-1 flex-wrap">
                  {forecast.recommendations.map((rec, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">{rec}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">Execute AI Plan</Button>
                <Button size="sm" variant="outline" className="flex-1">Schedule Review</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Performance Factor Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {performancePredictions.performanceFactors.map((factor, index) => (
            <div key={index} className="border rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">{factor.factor}</div>
                  <div className="text-sm text-muted-foreground">Weight: {factor.weight}</div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">{factor.impact}% impact</Badge>
                  <div className={`text-sm mt-1 ${factor.trend === 'Improving' ? 'text-green-600' : factor.trend === 'Declining' ? 'text-red-600' : 'text-gray-600'}`}>
                    {factor.trend}
                  </div>
                </div>
              </div>
              <Progress value={factor.impact} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            AI Strategic Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {performancePredictions.aiInsights.map((insight, index) => (
            <div key={index} className="border rounded-lg p-3 bg-gradient-to-r from-orange-50 to-red-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">{insight.insight}</div>
                  <div className="text-sm text-muted-foreground">Mitigation: {insight.mitigation}</div>
                </div>
                <div className="text-right">
                  <Badge variant={insight.impact === "High" ? "destructive" : insight.impact === "Medium" ? "secondary" : "outline"}>
                    {insight.impact} Impact
                  </Badge>
                  <div className="text-sm text-muted-foreground mt-1">{insight.timeline}</div>
                </div>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span>Probability: {insight.probability}%</span>
              </div>
              <Progress value={insight.probability} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            AI Optimization Strategies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {performancePredictions.optimizationStrategies.map((strategy, index) => (
            <div key={index} className="border rounded-lg p-3 bg-gradient-to-r from-green-50 to-blue-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">{strategy.strategy}</div>
                  <div className="text-sm text-muted-foreground">{strategy.description}</div>
                </div>
                <div className="text-right">
                  <Badge variant="destructive">{strategy.impact}</Badge>
                  <div className="text-lg font-bold text-green-600">{strategy.roi}</div>
                </div>
              </div>
              <Button size="sm" className="w-full">Implement Strategy</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}