import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, DollarSign, TrendingUp, Target, Zap, Users } from "lucide-react";

export function AISalaryOptimizationEngine() {
  const [optimizationData, setOptimizationData] = useState({
    totalEmployees: 247,
    optimizedSalaries: 89,
    costSavings: "$234,000",
    retentionImprovement: 67
  });

  const salaryOptimization = {
    overallOptimization: 91,
    marketAlignment: 94,
    retentionImpact: 78,
    equityScore: 96,
    employeeOptimizations: [
      {
        employee: "Alex Thompson",
        department: "Engineering",
        currentSalary: 95000,
        marketRate: 110000,
        optimizedSalary: 108000,
        adjustment: "+13.7%",
        retentionRisk: 89,
        performanceScore: 4.6,
        recommendations: ["Immediate adjustment", "Stock options", "Performance bonus"],
        competitivePosition: "Below Market",
        flightRisk: "High"
      },
      {
        employee: "Maria Garcia",
        department: "Sales", 
        currentSalary: 78000,
        marketRate: 75000,
        optimizedSalary: 82000,
        adjustment: "+5.1%",
        retentionRisk: 23,
        performanceScore: 4.8,
        recommendations: ["Merit increase", "Commission optimization", "Leadership track"],
        competitivePosition: "Above Market",
        flightRisk: "Low"
      },
      {
        employee: "David Kim",
        department: "Marketing",
        currentSalary: 68000,
        marketRate: 72000,
        optimizedSalary: 74000,
        adjustment: "+8.8%",
        retentionRisk: 45,
        performanceScore: 4.2,
        recommendations: ["Market adjustment", "Skill development bonus", "Flexible benefits"],
        competitivePosition: "Slightly Below",
        flightRisk: "Medium"
      }
    ],
    marketIntelligence: [
      { role: "Senior Engineer", marketMin: 95000, marketMax: 130000, companyAvg: 102000, gap: "-3.2%" },
      { role: "Sales Manager", marketMin: 75000, marketMax: 95000, companyAvg: 84000, gap: "+4.7%" },
      { role: "Marketing Specialist", marketMin: 60000, marketMax: 80000, companyAvg: 71000, gap: "+1.4%" },
      { role: "Product Manager", marketMin: 85000, marketMax: 120000, companyAvg: 98000, gap: "-5.1%" }
    ],
    optimizationStrategies: [
      {
        strategy: "Performance-Based Adjustments",
        impact: "+23% retention",
        cost: "$89,000",
        employees: 34,
        roi: "340%"
      },
      {
        strategy: "Market Parity Corrections",
        impact: "+18% competitiveness", 
        cost: "$156,000",
        employees: 67,
        roi: "210%"
      },
      {
        strategy: "Equity Optimization",
        impact: "+31% satisfaction",
        cost: "$45,000",
        employees: 23,
        roi: "280%"
      }
    ],
    retentionModel: [
      { salaryPercentile: "90th+", retentionRate: 96, flightRisk: 4, satisfaction: 94 },
      { salaryPercentile: "75th-89th", retentionRate: 89, flightRisk: 11, satisfaction: 87 },
      { salaryPercentile: "50th-74th", retentionRate: 78, flightRisk: 22, satisfaction: 76 },
      { salaryPercentile: "Below 50th", retentionRate: 54, flightRisk: 46, satisfaction: 58 }
    ],
    aiRecommendations: [
      {
        recommendation: "Immediate High-Performer Retention",
        urgency: "Critical",
        employees: 8,
        investment: "$127,000",
        expectedReturn: "$890,000"
      },
      {
        recommendation: "Market Adjustment Phase 1",
        urgency: "High", 
        employees: 23,
        investment: "$245,000",
        expectedReturn: "$612,000"
      },
      {
        recommendation: "Equity Gap Closure",
        urgency: "Medium",
        employees: 45,
        investment: "$178,000",
        expectedReturn: "$456,000"
      }
    ]
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Salary Optimization Engine
            <Badge variant="secondary" className="ml-auto">Revolutionary AI</Badge>
          </CardTitle>
          <CardDescription>
            Optimizes salaries for maximum retention and performance with 94% market accuracy and quantum equity analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">{salaryOptimization.overallOptimization}%</div>
              <div className="text-sm text-muted-foreground">Optimization Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{salaryOptimization.marketAlignment}%</div>
              <div className="text-sm text-muted-foreground">Market Alignment</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{optimizationData.costSavings}</div>
              <div className="text-sm text-muted-foreground">Annual Savings</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{salaryOptimization.equityScore}%</div>
              <div className="text-sm text-muted-foreground">Equity Score</div>
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-primary/20">
            <div className="text-center">
              <div className="text-lg font-bold text-primary">💰 Salary Oracle Active</div>
              <div className="text-sm text-muted-foreground">AI analyzing market data • Quantum equity algorithms engaged</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Employee Salary Optimizations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {salaryOptimization.employeeOptimizations.map((optimization, index) => (
            <div key={index} className="border rounded-lg p-4 bg-gradient-to-r from-primary/5 to-secondary/5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-medium text-lg">{optimization.employee}</div>
                  <div className="text-sm text-muted-foreground">
                    {optimization.department} • Performance: {optimization.performanceScore}/5
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={optimization.flightRisk === "High" ? "destructive" : optimization.flightRisk === "Medium" ? "secondary" : "outline"}>
                    {optimization.flightRisk} Risk
                  </Badge>
                  <div className="text-sm text-muted-foreground mt-1">{optimization.competitivePosition}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-3">
                <div>
                  <div className="text-sm font-medium">Current</div>
                  <div className="text-lg font-bold">${optimization.currentSalary.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Market Rate</div>
                  <div className="text-lg font-bold">${optimization.marketRate.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">AI Optimized</div>
                  <div className="text-lg font-bold text-green-600">${optimization.optimizedSalary.toLocaleString()}</div>
                  <Badge variant="destructive" className="text-xs">{optimization.adjustment}</Badge>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="text-sm font-medium mb-1">Retention Risk</div>
                <Progress value={optimization.retentionRisk} className="h-3" />
                <div className="text-xs text-muted-foreground mt-1">{optimization.retentionRisk}% probability of leaving</div>
              </div>
              
              <div className="mb-3">
                <div className="text-sm font-medium mb-1">AI Recommendations</div>
                <div className="flex gap-1 flex-wrap">
                  {optimization.recommendations.map((rec, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">{rec}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">Apply Optimization</Button>
                <Button size="sm" variant="outline" className="flex-1">Custom Adjustment</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Market Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {salaryOptimization.marketIntelligence.map((market, index) => (
            <div key={index} className="border rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">{market.role}</div>
                  <div className="text-sm text-muted-foreground">
                    Market Range: ${market.marketMin.toLocaleString()} - ${market.marketMax.toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">${market.companyAvg.toLocaleString()}</div>
                  <Badge variant={market.gap.startsWith('+') ? "secondary" : "destructive"}>
                    {market.gap}
                  </Badge>
                </div>
              </div>
              <Progress value={((market.companyAvg - market.marketMin) / (market.marketMax - market.marketMin)) * 100} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Optimization Strategies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {salaryOptimization.optimizationStrategies.map((strategy, index) => (
            <div key={index} className="border rounded-lg p-3 bg-gradient-to-r from-green-50 to-blue-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">{strategy.strategy}</div>
                  <div className="text-sm text-muted-foreground">
                    {strategy.employees} employees • Cost: {strategy.cost}
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="destructive">{strategy.impact}</Badge>
                  <div className="text-lg font-bold text-green-600">{strategy.roi} ROI</div>
                </div>
              </div>
              <Button size="sm" className="w-full">Execute Strategy</Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Retention Model Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {salaryOptimization.retentionModel.map((model, index) => (
            <div key={index} className="border rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">Salary {model.salaryPercentile} Percentile</div>
                  <div className="text-sm text-muted-foreground">Flight Risk: {model.flightRisk}%</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">{model.retentionRate}%</div>
                  <div className="text-sm text-muted-foreground">Retention</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Retention Rate</div>
                  <Progress value={model.retentionRate} className="h-2" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Satisfaction</div>
                  <Progress value={model.satisfaction} className="h-2" />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            AI Strategic Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {salaryOptimization.aiRecommendations.map((rec, index) => (
            <div key={index} className="border rounded-lg p-3 bg-gradient-to-r from-orange-50 to-red-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">{rec.recommendation}</div>
                  <div className="text-sm text-muted-foreground">
                    {rec.employees} employees • Investment: {rec.investment}
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={rec.urgency === "Critical" ? "destructive" : rec.urgency === "High" ? "secondary" : "outline"}>
                    {rec.urgency}
                  </Badge>
                  <div className="text-lg font-bold text-green-600">{rec.expectedReturn}</div>
                </div>
              </div>
              <Button size="sm" className="w-full">Implement Recommendation</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}