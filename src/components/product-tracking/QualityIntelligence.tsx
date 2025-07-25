import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useGlobalization } from "@/contexts/GlobalizationContext";
import { 
  TestTube, 
  Camera, 
  Cpu, 
  Brain, 
  Target, 
  Zap,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Eye,
  Scan,
  Shield,
  BarChart3,
  Clock
} from "lucide-react";

interface QualityMetric {
  id: string;
  name: string;
  current: number;
  target: number;
  trend: "improving" | "stable" | "declining";
  category: "defect_rate" | "performance" | "durability" | "compliance" | "user_satisfaction";
  aiPrediction: {
    futureValue: number;
    confidence: number;
    riskFactors: string[];
    recommendations: string[];
  };
  lastUpdated: string;
}

interface DefectPattern {
  id: string;
  type: string;
  frequency: number;
  severity: "low" | "medium" | "high" | "critical";
  trend: "increasing" | "stable" | "decreasing";
  rootCause: string;
  aiAnalysis: {
    predictedOccurrence: number;
    preventionMethods: string[];
    costImpact: number;
    detectionAccuracy: number;
  };
  affectedComponents: string[];
  detectionMethod: "visual_ai" | "sensor_data" | "performance_test" | "customer_feedback";
}

interface QualityPrediction {
  id: string;
  component: string;
  failureProbability: number;
  timeToFailure: number;
  confidenceLevel: number;
  preventiveMeasures: string[];
  costOfPrevention: number;
  costOfFailure: number;
  aiRecommendation: string;
}

interface InspectionResult {
  id: string;
  batchId: string;
  timestamp: string;
  overallScore: number;
  passRate: number;
  aiInspectionResults: {
    visualDefects: number;
    performanceIssues: number;
    complianceViolations: number;
    predictiveFlags: number;
  };
  criticalFindings: string[];
  recommendations: string[];
}

export function QualityIntelligence() {
  const { formatCurrency } = useGlobalization();

  const [qualityMetrics] = useState<QualityMetric[]>([
    {
      id: "1",
      name: "Overall Defect Rate",
      current: 0.8,
      target: 0.5,
      trend: "improving",
      category: "defect_rate",
      aiPrediction: {
        futureValue: 0.3,
        confidence: 94,
        riskFactors: ["Supplier quality variance", "Manufacturing process drift"],
        recommendations: ["Implement real-time quality monitoring", "Enhance supplier quality agreements"]
      },
      lastUpdated: "2 hours ago"
    },
    {
      id: "2",
      name: "Performance Consistency",
      current: 96.2,
      target: 98.0,
      trend: "stable",
      category: "performance",
      aiPrediction: {
        futureValue: 97.8,
        confidence: 89,
        riskFactors: ["Component aging patterns", "Environmental stress factors"],
        recommendations: ["Optimize burn-in testing", "Implement predictive component replacement"]
      },
      lastUpdated: "1 hour ago"
    },
    {
      id: "3",
      name: "Durability Score",
      current: 87.5,
      target: 92.0,
      trend: "improving",
      category: "durability",
      aiPrediction: {
        futureValue: 91.2,
        confidence: 91,
        riskFactors: ["Material fatigue", "Design stress points"],
        recommendations: ["Strengthen housing design", "Upgrade to higher-grade materials"]
      },
      lastUpdated: "30 minutes ago"
    },
    {
      id: "4",
      name: "Regulatory Compliance",
      current: 99.1,
      target: 100.0,
      trend: "stable",
      category: "compliance",
      aiPrediction: {
        futureValue: 99.7,
        confidence: 96,
        riskFactors: ["Changing regulations", "Testing procedure updates"],
        recommendations: ["Automated compliance monitoring", "Regulatory change tracking system"]
      },
      lastUpdated: "4 hours ago"
    }
  ]);

  const [defectPatterns] = useState<DefectPattern[]>([
    {
      id: "1",
      type: "Voice Recognition Sensitivity",
      frequency: 3.2,
      severity: "medium",
      trend: "decreasing",
      rootCause: "Microphone calibration variance during assembly",
      aiAnalysis: {
        predictedOccurrence: 2.1,
        preventionMethods: ["Automated calibration testing", "Enhanced quality gates"],
        costImpact: 45000,
        detectionAccuracy: 96
      },
      affectedComponents: ["Microphone array", "Signal processing unit"],
      detectionMethod: "performance_test"
    },
    {
      id: "2",
      type: "Wi-Fi Connectivity Dropout",
      frequency: 1.8,
      severity: "high",
      trend: "stable",
      rootCause: "Antenna placement interference with heat dissipation",
      aiAnalysis: {
        predictedOccurrence: 1.5,
        preventionMethods: ["Redesign antenna placement", "Thermal simulation testing"],
        costImpact: 78000,
        detectionAccuracy: 91
      },
      affectedComponents: ["Wi-Fi module", "Antenna", "Heat sink"],
      detectionMethod: "sensor_data"
    },
    {
      id: "3",
      type: "LED Status Indicator Malfunction",
      frequency: 0.9,
      severity: "low",
      trend: "stable",
      rootCause: "LED driver circuit temperature sensitivity",
      aiAnalysis: {
        predictedOccurrence: 0.7,
        preventionMethods: ["Temperature-compensated LED drivers", "Improved thermal design"],
        costImpact: 12000,
        detectionAccuracy: 98
      },
      affectedComponents: ["LED indicators", "Driver circuit"],
      detectionMethod: "visual_ai"
    }
  ]);

  const [qualityPredictions] = useState<QualityPrediction[]>([
    {
      id: "1",
      component: "Power Supply Unit",
      failureProbability: 15,
      timeToFailure: 18,
      confidenceLevel: 87,
      preventiveMeasures: ["Capacitor replacement", "Thermal stress testing", "Voltage regulation check"],
      costOfPrevention: 25,
      costOfFailure: 180,
      aiRecommendation: "Schedule preventive maintenance at 15-month intervals to avoid field failures"
    },
    {
      id: "2",
      component: "Touch Interface",
      failureProbability: 8,
      timeToFailure: 24,
      confidenceLevel: 92,
      preventiveMeasures: ["Surface coating renewal", "Calibration verification", "Pressure sensor check"],
      costOfPrevention: 15,
      costOfFailure: 95,
      aiRecommendation: "Implement touch sensitivity monitoring in production testing"
    },
    {
      id: "3",
      component: "Memory Module",
      failureProbability: 22,
      timeToFailure: 12,
      confidenceLevel: 94,
      preventiveMeasures: ["Memory stress testing", "Error correction validation", "Temperature cycling"],
      costOfPrevention: 35,
      costOfFailure: 220,
      aiRecommendation: "Critical: Upgrade to industrial-grade memory modules for better reliability"
    }
  ]);

  const [inspectionResults] = useState<InspectionResult[]>([
    {
      id: "1",
      batchId: "BATCH-2024-0156",
      timestamp: "2024-01-15 14:30:00",
      overallScore: 96.8,
      passRate: 97.2,
      aiInspectionResults: {
        visualDefects: 2,
        performanceIssues: 1,
        complianceViolations: 0,
        predictiveFlags: 3
      },
      criticalFindings: ["Minor surface scratches on 2 units", "Wi-Fi signal strength below optimal on 1 unit"],
      recommendations: ["Adjust polishing process parameters", "Review antenna assembly procedure"]
    },
    {
      id: "2",
      batchId: "BATCH-2024-0157",
      timestamp: "2024-01-15 16:45:00",
      overallScore: 98.4,
      passRate: 99.1,
      aiInspectionResults: {
        visualDefects: 0,
        performanceIssues: 1,
        complianceViolations: 0,
        predictiveFlags: 1
      },
      criticalFindings: ["Voice response time 5ms above target on 1 unit"],
      recommendations: ["Verify microphone calibration process"]
    }
  ]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving": return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "declining": return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
      default: return <BarChart3 className="h-4 w-4 text-gray-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-600 bg-red-50";
      case "high": return "text-orange-600 bg-orange-50";
      case "medium": return "text-yellow-600 bg-yellow-50";
      case "low": return "text-green-600 bg-green-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getDetectionIcon = (method: string) => {
    switch (method) {
      case "visual_ai": return <Camera className="h-4 w-4" />;
      case "sensor_data": return <Cpu className="h-4 w-4" />;
      case "performance_test": return <TestTube className="h-4 w-4" />;
      case "customer_feedback": return <Eye className="h-4 w-4" />;
      default: return <Scan className="h-4 w-4" />;
    }
  };

  const avgQualityScore = Math.round(qualityMetrics.reduce((acc, metric) => acc + metric.current, 0) / qualityMetrics.length);
  const criticalDefects = defectPatterns.filter(pattern => pattern.severity === "critical" || pattern.severity === "high").length;
  const totalCostImpact = defectPatterns.reduce((acc, pattern) => acc + pattern.aiAnalysis.costImpact, 0);
  const avgPredictionConfidence = Math.round(qualityPredictions.reduce((acc, pred) => acc + pred.confidenceLevel, 0) / qualityPredictions.length);

  return (
    <div className="space-y-6">
      {/* Quality Overview */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-green-700">
              <CheckCircle className="h-5 w-5 mr-2" />
              Quality Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{avgQualityScore}%</div>
            <Progress value={avgQualityScore} className="mt-2" />
            <p className="text-sm text-green-600 mt-1">Overall Quality</p>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-red-700">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Critical Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">{criticalDefects}</div>
            <p className="text-sm text-red-600 mt-1">High Priority Defects</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-purple-700">
              <Brain className="h-5 w-5 mr-2" />
              AI Confidence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">{avgPredictionConfidence}%</div>
            <Progress value={avgPredictionConfidence} className="mt-2" />
            <p className="text-sm text-purple-600 mt-1">Prediction Accuracy</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-blue-700">
              <Target className="h-5 w-5 mr-2" />
              Cost Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{formatCurrency(totalCostImpact)}</div>
            <p className="text-sm text-blue-600 mt-1">Annual Quality Costs</p>
          </CardContent>
        </Card>
      </div>

      {/* Quality Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            AI Quality Metrics Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {qualityMetrics.map((metric) => (
            <div key={metric.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h4 className="font-semibold">{metric.name}</h4>
                  {getTrendIcon(metric.trend)}
                  <Badge variant="outline" className={metric.trend === "improving" ? "text-green-600" : metric.trend === "declining" ? "text-red-600" : "text-gray-600"}>
                    {metric.trend.toUpperCase()}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">
                    {metric.current}{metric.category === "defect_rate" ? "%" : metric.category === "user_satisfaction" ? "/10" : "%"}
                  </div>
                  <p className="text-sm text-muted-foreground">Target: {metric.target}{metric.category === "defect_rate" ? "%" : metric.category === "user_satisfaction" ? "/10" : "%"}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Current Performance:</span>
                  <div className="flex items-center mt-1">
                    <Progress value={(metric.current / metric.target) * 100} className="flex-1 mr-2" />
                    <span className="font-medium">{Math.round((metric.current / metric.target) * 100)}%</span>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">AI Prediction Confidence:</span>
                  <div className="flex items-center mt-1">
                    <Progress value={metric.aiPrediction.confidence} className="flex-1 mr-2" />
                    <span className="font-medium">{metric.aiPrediction.confidence}%</span>
                  </div>
                </div>
              </div>

              <Alert className="bg-blue-50 border-blue-200">
                <Brain className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-1">
                    <div><strong>AI Prediction:</strong> Future value {metric.aiPrediction.futureValue}{metric.category === "defect_rate" ? "%" : "%"} (confidence: {metric.aiPrediction.confidence}%)</div>
                    <div><strong>Risk Factors:</strong> {metric.aiPrediction.riskFactors.join(", ")}</div>
                  </div>
                </AlertDescription>
              </Alert>

              <div className="bg-gray-50 rounded p-3 text-xs">
                <strong>AI Recommendations:</strong>
                <ul className="mt-1 space-y-1">
                  {metric.aiPrediction.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Zap className="h-3 w-3 text-blue-500" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Defect Pattern Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Scan className="h-5 w-5 mr-2" />
            AI Defect Pattern Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {defectPatterns.map((pattern) => (
            <div key={pattern.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    {getDetectionIcon(pattern.detectionMethod)}
                  </div>
                  <div>
                    <h4 className="font-semibold">{pattern.type}</h4>
                    <p className="text-sm text-muted-foreground">Frequency: {pattern.frequency}% of units</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getSeverityColor(pattern.severity)}>
                    {pattern.severity.toUpperCase()}
                  </Badge>
                  {getTrendIcon(pattern.trend)}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Predicted Frequency:</span>
                  <p className="font-medium text-green-600">{pattern.aiAnalysis.predictedOccurrence}%</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Detection Accuracy:</span>
                  <p className="font-medium">{pattern.aiAnalysis.detectionAccuracy}%</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Annual Cost Impact:</span>
                  <p className="font-medium text-red-600">{formatCurrency(pattern.aiAnalysis.costImpact)}</p>
                </div>
              </div>

              <div className="bg-yellow-50 rounded p-3 text-sm">
                <div><strong>Root Cause:</strong> {pattern.rootCause}</div>
                <div className="mt-2"><strong>Affected Components:</strong> {pattern.affectedComponents.join(", ")}</div>
              </div>

              <div className="bg-green-50 rounded p-3 text-xs">
                <strong>AI Prevention Methods:</strong>
                <ul className="mt-1 space-y-1">
                  {pattern.aiAnalysis.preventionMethods.map((method, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Shield className="h-3 w-3 text-green-500" />
                      {method}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Predictive Quality Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Eye className="h-5 w-5 mr-2" />
            Predictive Quality Failure Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {qualityPredictions.map((prediction) => (
            <div key={prediction.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{prediction.component}</h4>
                  <p className="text-sm text-muted-foreground">
                    Predicted failure in {prediction.timeToFailure} months
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-red-600">
                    {prediction.failureProbability}%
                  </div>
                  <p className="text-sm text-muted-foreground">Failure Probability</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">AI Confidence:</span>
                  <div className="flex items-center mt-1">
                    <Progress value={prediction.confidenceLevel} className="flex-1 mr-2" />
                    <span className="font-medium">{prediction.confidenceLevel}%</span>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Prevention Cost:</span>
                  <p className="font-medium text-green-600">{formatCurrency(prediction.costOfPrevention)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Failure Cost:</span>
                  <p className="font-medium text-red-600">{formatCurrency(prediction.costOfFailure)}</p>
                </div>
              </div>

              <Alert className="bg-purple-50 border-purple-200">
                <Brain className="h-4 w-4" />
                <AlertDescription>
                  <strong>AI Recommendation:</strong> {prediction.aiRecommendation}
                </AlertDescription>
              </Alert>

              <div className="bg-blue-50 rounded p-3 text-xs">
                <strong>Preventive Measures:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                  {prediction.preventiveMeasures.map((measure, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {measure}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Inspection Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Camera className="h-5 w-5 mr-2" />
            AI Vision Inspection Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {inspectionResults.map((result) => (
            <div key={result.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Batch {result.batchId}</h4>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {result.timestamp}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">{result.overallScore}%</div>
                  <p className="text-sm text-muted-foreground">Quality Score</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Pass Rate:</span>
                  <p className="font-medium">{result.passRate}%</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Visual Defects:</span>
                  <p className="font-medium">{result.aiInspectionResults.visualDefects}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Performance Issues:</span>
                  <p className="font-medium">{result.aiInspectionResults.performanceIssues}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Predictive Flags:</span>
                  <p className="font-medium">{result.aiInspectionResults.predictiveFlags}</p>
                </div>
              </div>

              {result.criticalFindings.length > 0 && (
                <div className="bg-yellow-50 rounded p-3 text-sm">
                  <strong>Critical Findings:</strong>
                  <ul className="mt-1 space-y-1">
                    {result.criticalFindings.map((finding, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <AlertTriangle className="h-3 w-3 text-yellow-600" />
                        {finding}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-green-50 rounded p-3 text-xs">
                <strong>AI Recommendations:</strong>
                <ul className="mt-1 space-y-1">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AI Actions */}
      <div className="flex gap-4">
        <Button className="flex-1 bg-green-600 hover:bg-green-700">
          <Brain className="h-4 w-4 mr-2" />
          Run AI Quality Scan
        </Button>
        <Button variant="outline" className="flex-1">
          <Camera className="h-4 w-4 mr-2" />
          Visual Inspection
        </Button>
        <Button variant="outline" className="flex-1">
          <Target className="h-4 w-4 mr-2" />
          Predictive Analysis
        </Button>
      </div>
    </div>
  );
}