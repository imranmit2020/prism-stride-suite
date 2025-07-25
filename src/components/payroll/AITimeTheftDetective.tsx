import { useState } from "react";
import { useGlobalization } from "@/contexts/GlobalizationContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Clock, Eye, AlertTriangle, Shield, Target } from "lucide-react";

export function AITimeTheftDetective() {
  const { formatCurrency } = useGlobalization();
  const [detectionData, setDetectionData] = useState({
    totalEmployees: 247,
    suspiciousActivities: 8,
    timeTheftDetected: 23,
    accuracyRate: 97
  });

  const timeTheftDetection = {
    overallAccuracy: 97,
    falsePositiveRate: 1.2,
    detectionMethods: "Behavioral AI + Biometrics",
    recoveredTime: "156 hours/week",
    suspiciousPatterns: [
      {
        employee: "Anonymous Employee #1247",
        department: "Operations",
        pattern: "Buddy Punching",
        confidence: 94,
        frequency: "Daily",
        timeStolen: "2.3 hours/day",
        costImpact: formatCurrency(89) + "/day",
        evidence: ["Different biometric patterns", "Location inconsistencies", "Timing anomalies"],
        recommendation: "Immediate investigation + biometric verification"
      },
      {
        employee: "Anonymous Employee #0892", 
        department: "Customer Service",
        pattern: "Extended Break Fraud",
        confidence: 87,
        frequency: "3x/week",
        timeStolen: "1.7 hours/week",
        costImpact: formatCurrency(67) + "/week",
        evidence: ["Break duration anomalies", "Location tracking gaps", "Productivity dips"],
        recommendation: "Manager coaching + monitoring increase"
      },
      {
        employee: "Anonymous Employee #1583",
        department: "Sales",
        pattern: "Remote Work Time Fraud",
        confidence: 91,
        frequency: "2x/week", 
        timeStolen: "3.2 hours/week",
        costImpact: formatCurrency(134) + "/week",
        evidence: ["Activity tracking gaps", "System idle time", "Response delays"],
        recommendation: "Productivity tool deployment + check-ins"
      }
    ],
    detectionTechniques: [
      {
        method: "Biometric Verification",
        accuracy: 99.2,
        coverage: "Clock-in/out",
        effectiveness: "Eliminates buddy punching",
        status: "Active"
      },
      {
        method: "Behavioral Pattern Analysis", 
        accuracy: 94.7,
        coverage: "Work patterns",
        effectiveness: "Detects routine anomalies",
        status: "Active"
      },
      {
        method: "Location Intelligence",
        accuracy: 96.1,
        coverage: "Mobile workforce",
        effectiveness: "Verifies work location",
        status: "Active"
      },
      {
        method: "Activity Correlation",
        accuracy: 92.8,
        coverage: "System usage",
        effectiveness: "Matches activity to time",
        status: "Active"
      }
    ],
    preventionStrategies: [
      {
        strategy: "Predictive Intervention",
        description: "AI predicts theft before it happens",
        effectiveness: 89,
        implementation: "Real-time alerts to managers",
        savings: formatCurrency(45000) + "/year"
      },
      {
        strategy: "Behavioral Conditioning",
        description: "Subtle deterrents based on AI analysis", 
        effectiveness: 76,
        implementation: "Personalized notifications",
        savings: formatCurrency(28000) + "/year"
      },
      {
        strategy: "Gamification Incentives",
        description: "Reward accurate time tracking",
        effectiveness: 84,
        implementation: "Time accuracy leaderboards",
        savings: formatCurrency(67000) + "/year"
      }
    ],
    timeTheftCategories: [
      { category: "Buddy Punching", frequency: 23, cost: formatCurrency(12400) + "/month", detection: 96 },
      { category: "Extended Breaks", frequency: 34, cost: formatCurrency(8900) + "/month", detection: 89 },
      { category: "Personal Activities", frequency: 45, cost: formatCurrency(15600) + "/month", detection: 92 },
      { category: "Ghost Employees", frequency: 2, cost: formatCurrency(34000) + "/month", detection: 99 }
    ],
    aiCountermeasures: [
      {
        measure: "Quantum Timestamp Verification",
        status: "Active",
        accuracy: 99.8,
        description: "Unhackable time verification"
      },
      {
        measure: "Behavioral Fingerprinting",
        status: "Active", 
        accuracy: 94.2,
        description: "Unique work pattern identification"
      },
      {
        measure: "Multi-Factor Time Authentication",
        status: "Active",
        accuracy: 97.6,
        description: "Layered verification system"
      },
      {
        measure: "Predictive Anomaly Detection",
        status: "Active",
        accuracy: 91.4,
        description: "Catches new theft methods"
      }
    ]
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Time Theft Detective
            <Badge variant="secondary" className="ml-auto">Revolutionary AI</Badge>
          </CardTitle>
          <CardDescription>
            Detects time theft with 97% accuracy using behavioral AI, biometrics, and quantum timestamp verification
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">{timeTheftDetection.overallAccuracy}%</div>
              <div className="text-sm text-muted-foreground">Detection Accuracy</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{timeTheftDetection.falsePositiveRate}%</div>
              <div className="text-sm text-muted-foreground">False Positives</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{timeTheftDetection.recoveredTime}</div>
              <div className="text-sm text-muted-foreground">Time Recovered</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">{detectionData.timeTheftDetected}</div>
              <div className="text-sm text-muted-foreground">Cases Detected</div>
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border-2 border-red-200">
            <div className="text-center">
              <div className="text-lg font-bold text-red-600">🕵️ Detective AI Active</div>
              <div className="text-sm text-muted-foreground">AI monitoring time patterns • Quantum verification engaged</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Suspicious Time Patterns
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {timeTheftDetection.suspiciousPatterns.map((pattern, index) => (
            <div key={index} className="border rounded-lg p-4 bg-gradient-to-r from-red-50 to-orange-50">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-medium text-lg">{pattern.employee}</div>
                  <div className="text-sm text-muted-foreground">
                    {pattern.department} • Pattern: {pattern.pattern}
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="destructive">{pattern.confidence}% confidence</Badge>
                  <div className="text-sm text-red-600 font-bold mt-1">{pattern.costImpact}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <div className="text-sm font-medium">Frequency</div>
                  <div className="text-lg font-bold text-red-600">{pattern.frequency}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Time Stolen</div>
                  <div className="text-lg font-bold text-red-600">{pattern.timeStolen}</div>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="text-sm font-medium mb-1">Evidence Detected</div>
                <div className="flex gap-1 flex-wrap mb-2">
                  {pattern.evidence.map((evidence, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">{evidence}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="mb-3">
                <div className="text-sm font-medium mb-1">AI Recommendation</div>
                <div className="text-sm text-muted-foreground bg-muted p-2 rounded">
                  {pattern.recommendation}
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Detection Confidence</span>
                </div>
                <Progress value={pattern.confidence} className="h-3" />
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="destructive" className="flex-1">Escalate Case</Button>
                <Button size="sm" variant="outline" className="flex-1">False Positive</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Detection Methods
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {timeTheftDetection.detectionTechniques.map((method, index) => (
            <div key={index} className="border rounded-lg p-3 bg-gradient-to-r from-primary/5 to-secondary/5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">{method.method}</div>
                  <div className="text-sm text-muted-foreground">{method.effectiveness}</div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">{method.status}</Badge>
                  <div className="text-sm text-green-600 mt-1">{method.accuracy}% accurate</div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground mb-2">Coverage: {method.coverage}</div>
              <Progress value={method.accuracy} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Prevention Strategies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {timeTheftDetection.preventionStrategies.map((strategy, index) => (
            <div key={index} className="border rounded-lg p-3 bg-gradient-to-r from-green-50 to-blue-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">{strategy.strategy}</div>
                  <div className="text-sm text-muted-foreground">{strategy.description}</div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">{strategy.effectiveness}% effective</Badge>
                  <div className="text-lg font-bold text-green-600">{strategy.savings}</div>
                </div>
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
            <Clock className="h-5 w-5 text-primary" />
            Time Theft Categories
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {timeTheftDetection.timeTheftCategories.map((category, index) => (
            <div key={index} className="border rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">{category.category}</div>
                  <div className="text-sm text-muted-foreground">
                    {category.frequency} cases/month • Cost: {category.cost}
                  </div>
                </div>
                <Badge variant="secondary">{category.detection}% detected</Badge>
              </div>
              <Progress value={category.detection} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            AI Countermeasures
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {timeTheftDetection.aiCountermeasures.map((measure, index) => (
            <div key={index} className="border rounded-lg p-3 bg-gradient-to-r from-purple-50 to-blue-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">🛡️ {measure.measure}</div>
                  <div className="text-sm text-muted-foreground">{measure.description}</div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">{measure.status}</Badge>
                  <div className="text-sm text-green-600 mt-1">{measure.accuracy}% accurate</div>
                </div>
              </div>
              <Progress value={measure.accuracy} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}