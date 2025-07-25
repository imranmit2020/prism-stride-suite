import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Shield, Eye, Zap, AlertTriangle, Target } from "lucide-react";

export function AITheftDetectionOracle() {
  const [securityStatus, setSecurityStatus] = useState({
    theftRisk: "Low",
    suspiciousActivities: 2,
    securityScore: 97,
    activeMonitoring: true
  });

  const theftDetection = {
    overallSecurity: 97,
    detectionAccuracy: 99.2,
    falsePositiveRate: 0.3,
    responseTime: "< 2 seconds",
    suspiciousPatterns: [
      {
        pattern: "Unusual Product Movement",
        riskLevel: 34,
        location: "Electronics Section",
        timeDetected: "2 minutes ago",
        aiAnalysis: "Product moved without scanner beep",
        actionTaken: "Security alert sent",
        confidence: 87
      },
      {
        pattern: "Frequent Area Visits",
        riskLevel: 67,
        location: "High-Value Items",
        timeDetected: "5 minutes ago", 
        aiAnalysis: "Same person, 4th visit, no purchases",
        actionTaken: "Staff notification sent",
        confidence: 92
      },
      {
        pattern: "Concealment Behavior",
        riskLevel: 89,
        location: "Jewelry Display",
        timeDetected: "Just now",
        aiAnalysis: "Item hidden in bag-like motion detected",
        actionTaken: "Manager alert + Security approach",
        confidence: 95
      }
    ],
    behaviorAnalytics: [
      { behavior: "Browsing Pattern", normalcy: 91, status: "Normal", analysis: "Typical customer behavior" },
      { behavior: "Item Handling", normalcy: 76, status: "Monitor", analysis: "Slightly unusual item touches" },
      { behavior: "Movement Speed", normalcy: 45, status: "Alert", analysis: "Unusually rapid movements" },
      { behavior: "Eye Contact Avoidance", normalcy: 23, status: "Suspicious", analysis: "Avoiding staff/cameras" }
    ],
    preventionStrategies: [
      {
        strategy: "Predictive Positioning",
        effectiveness: 94,
        description: "AI positions staff before theft attempt",
        implementation: "Real-time staff guidance system"
      },
      {
        strategy: "Behavioral Intervention", 
        effectiveness: 87,
        description: "Friendly approach based on AI prediction",
        implementation: "Customer service interaction"
      },
      {
        strategy: "Environmental Adjustment",
        effectiveness: 82,
        description: "AI adjusts lighting/music to deter theft",
        implementation: "Smart environment controls"
      }
    ],
    riskCategories: [
      { category: "Shoplifting", currentRisk: 23, averageRisk: 45, improvement: "-49%" },
      { category: "Employee Theft", currentRisk: 8, averageRisk: 32, improvement: "-75%" },
      { category: "Vendor Fraud", currentRisk: 12, averageRisk: 28, improvement: "-57%" },
      { category: "Organized Retail Crime", currentRisk: 15, averageRisk: 38, improvement: "-61%" }
    ],
    aiCountermeasures: [
      { measure: "Invisible Digital Fence", status: "Active", coverage: "98%", effectiveness: "96%" },
      { measure: "Micro-Expression Analysis", status: "Active", coverage: "85%", effectiveness: "91%" },
      { measure: "Behavioral Prediction Engine", status: "Active", coverage: "100%", effectiveness: "94%" },
      { measure: "Social Engineering Detection", status: "Active", coverage: "92%", effectiveness: "89%" }
    ]
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Theft Detection Oracle
            <Badge variant="secondary" className="ml-auto">Revolutionary AI</Badge>
          </CardTitle>
          <CardDescription>
            Supernatural theft prevention with 99.2% accuracy using behavioral prediction and micro-expression analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600">{theftDetection.overallSecurity}%</div>
              <div className="text-sm text-muted-foreground">Security Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{theftDetection.detectionAccuracy}%</div>
              <div className="text-sm text-muted-foreground">Detection Accuracy</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{theftDetection.falsePositiveRate}%</div>
              <div className="text-sm text-muted-foreground">False Positives</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{theftDetection.responseTime}</div>
              <div className="text-sm text-muted-foreground">Response Time</div>
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-200">
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">🛡️ Oracle Protection Active</div>
              <div className="text-sm text-muted-foreground">AI monitoring 247 behavioral patterns • Quantum theft prediction engaged</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Real-Time Suspicious Activities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {theftDetection.suspiciousPatterns.map((pattern, index) => (
            <div key={index} className="border rounded-lg p-4 bg-gradient-to-r from-red-50 to-orange-50">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-medium text-lg">{pattern.pattern}</div>
                  <div className="text-sm text-muted-foreground">
                    {pattern.location} • {pattern.timeDetected}
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={pattern.riskLevel > 80 ? "destructive" : pattern.riskLevel > 50 ? "secondary" : "outline"}>
                    {pattern.riskLevel}% risk
                  </Badge>
                  <div className="text-sm text-muted-foreground mt-1">{pattern.confidence}% confident</div>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="text-sm font-medium mb-1">AI Analysis</div>
                <div className="text-sm text-muted-foreground bg-muted p-2 rounded">{pattern.aiAnalysis}</div>
              </div>
              
              <div className="mb-3">
                <div className="text-sm font-medium mb-1">Action Taken</div>
                <Badge variant="destructive" className="text-xs">{pattern.actionTaken}</Badge>
              </div>
              
              <Progress value={pattern.riskLevel} className="h-3 mb-3" />
              
              <div className="flex gap-2">
                <Button size="sm" variant="destructive" className="flex-1">Escalate Alert</Button>
                <Button size="sm" variant="outline" className="flex-1">False Alarm</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Behavioral Analytics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {theftDetection.behaviorAnalytics.map((behavior, index) => (
            <div key={index} className="border rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">{behavior.behavior}</div>
                  <div className="text-sm text-muted-foreground">{behavior.analysis}</div>
                </div>
                <div className="text-right">
                  <Badge variant={
                    behavior.status === "Normal" ? "secondary" : 
                    behavior.status === "Monitor" ? "outline" :
                    behavior.status === "Alert" ? "secondary" : "destructive"
                  }>
                    {behavior.status}
                  </Badge>
                  <div className="text-sm text-muted-foreground mt-1">{behavior.normalcy}% normal</div>
                </div>
              </div>
              <Progress value={behavior.normalcy} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            AI Prevention Strategies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {theftDetection.preventionStrategies.map((strategy, index) => (
            <div key={index} className="border rounded-lg p-3 bg-gradient-to-r from-primary/5 to-secondary/5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">{strategy.strategy}</div>
                  <div className="text-sm text-muted-foreground">{strategy.description}</div>
                </div>
                <Badge variant="secondary">{strategy.effectiveness}% effective</Badge>
              </div>
              <div className="text-xs text-muted-foreground mb-2">{strategy.implementation}</div>
              <Progress value={strategy.effectiveness} className="h-2 mb-2" />
              <Button size="sm" className="w-full">Activate Strategy</Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Risk Category Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {theftDetection.riskCategories.map((category, index) => (
            <div key={index} className="border rounded-lg p-3 bg-gradient-to-r from-green-50 to-blue-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">{category.category}</div>
                  <div className="text-sm text-muted-foreground">
                    Industry Average: {category.averageRisk}% • Current: {category.currentRisk}%
                  </div>
                </div>
                <Badge variant="destructive">{category.improvement}</Badge>
              </div>
              <Progress value={category.currentRisk} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Active AI Countermeasures
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {theftDetection.aiCountermeasures.map((measure, index) => (
            <div key={index} className="border rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">🔮 {measure.measure}</div>
                  <div className="text-sm text-muted-foreground">Coverage: {measure.coverage}</div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">{measure.status}</Badge>
                  <div className="text-sm text-green-600 mt-1">{measure.effectiveness} effective</div>
                </div>
              </div>
              <Progress value={parseInt(measure.effectiveness)} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}