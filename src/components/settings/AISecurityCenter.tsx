import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Shield, Lock, Eye, AlertTriangle, CheckCircle, Zap, Brain, Globe } from "lucide-react";

export function AISecurityCenter() {
  const [aiThreatDetection, setAiThreatDetection] = useState(true);
  const [behaviorAnalysis, setBehaviorAnalysis] = useState(true);
  const [isScanning, setIsScanning] = useState(false);

  // Revolutionary AI security data
  const securityMetrics = {
    overallScore: 96,
    threatsBlocked: 247,
    anomaliesDetected: 12,
    aiAccuracy: 94,
    riskLevel: "Low",
    lastScan: "2 minutes ago"
  };

  const threatIntelligence = [
    {
      id: 1,
      type: "Behavioral Anomaly",
      severity: "medium",
      description: "Unusual login pattern detected from new device",
      aiConfidence: 87,
      status: "monitoring",
      timeDetected: "15 minutes ago",
      recommendedAction: "Verify identity through secondary authentication"
    },
    {
      id: 2,
      type: "Data Access Pattern",
      severity: "low",
      description: "Irregular access to financial reports outside normal hours",
      aiConfidence: 72,
      status: "reviewed",
      timeDetected: "2 hours ago",
      recommendedAction: "Monitor for 24 hours, no immediate action needed"
    },
    {
      id: 3,
      type: "API Abuse Attempt",
      severity: "high",
      description: "Potential brute force attack on authentication endpoint",
      aiConfidence: 96,
      status: "blocked",
      timeDetected: "6 hours ago",
      recommendedAction: "IP blocked automatically, review security logs"
    }
  ];

  const securityAdaptations = [
    {
      feature: "Behavioral Biometrics",
      description: "AI learns your typing patterns and mouse movements",
      effectiveness: 94,
      active: true,
      impact: "Detects account takeover attempts with 94% accuracy"
    },
    {
      feature: "Contextual Access Control",
      description: "AI adjusts permissions based on location and behavior",
      effectiveness: 89,
      active: true,
      impact: "Prevents 67% of unauthorized access attempts"
    },
    {
      feature: "Anomaly Prediction",
      description: "Predicts security threats before they manifest",
      effectiveness: 91,
      active: true,
      impact: "Early warning system with 15-minute average lead time"
    },
    {
      feature: "Automated Incident Response",
      description: "AI takes immediate action on high-confidence threats",
      effectiveness: 88,
      active: true,
      impact: "Reduces threat response time by 89%"
    }
  ];

  const riskFactors = [
    { factor: "Password Strength", score: 95, status: "excellent", trend: "stable" },
    { factor: "Device Security", score: 92, status: "good", trend: "improving" },
    { factor: "Network Safety", score: 87, status: "good", trend: "stable" },
    { factor: "Data Encryption", score: 98, status: "excellent", trend: "stable" },
    { factor: "Access Patterns", score: 84, status: "warning", trend: "concerning" }
  ];

  const aiInsights = [
    "Your security score improved 12% this month through AI adaptations",
    "Behavioral analysis prevented 3 potential account compromises",
    "AI detected unusual data access pattern worth investigating",
    "Predicted security recommendations could improve score by 8%"
  ];

  const predictiveThreats = [
    {
      threat: "Social Engineering Attack",
      probability: 23,
      timeframe: "Next 30 days",
      prevention: "Enhanced email filtering and user training",
      confidence: 78
    },
    {
      threat: "Credential Stuffing",
      probability: 45,
      timeframe: "Next 7 days",
      prevention: "Enable advanced rate limiting",
      confidence: 89
    },
    {
      threat: "Insider Threat",
      probability: 12,
      timeframe: "Next 90 days",
      prevention: "Increase behavioral monitoring sensitivity",
      confidence: 67
    }
  ];

  const handleSecurityScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 5000);
  };

  return (
    <div className="space-y-6">
      {/* AI Security Center Header */}
      <Card className="border-2 border-red-200 bg-gradient-to-r from-red-50 to-orange-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Shield className="h-6 w-6 text-red-600" />
                AI Security Intelligence Center
              </CardTitle>
              <CardDescription>
                Revolutionary AI-powered threat detection with behavioral analysis and predictive security
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className={`${
                securityMetrics.riskLevel === 'Low' ? 'border-green-500 text-green-700' :
                securityMetrics.riskLevel === 'Medium' ? 'border-yellow-500 text-yellow-700' :
                'border-red-500 text-red-700'
              }`}>
                Risk: {securityMetrics.riskLevel}
              </Badge>
              <Button 
                onClick={handleSecurityScan}
                disabled={isScanning}
                className="bg-red-600 hover:bg-red-700"
              >
                {isScanning ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    AI Deep Scan
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Security Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{securityMetrics.overallScore}%</div>
            <Progress value={securityMetrics.overallScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Threats Blocked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{securityMetrics.threatsBlocked}</div>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Anomalies Detected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{securityMetrics.anomaliesDetected}</div>
            <p className="text-xs text-muted-foreground mt-1">Under investigation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">AI Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{securityMetrics.aiAccuracy}%</div>
            <p className="text-xs text-muted-foreground mt-1">Threat detection</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Security Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Security Controls
          </CardTitle>
          <CardDescription>
            Configure intelligent security features and behavioral analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">AI Threat Detection</h4>
                  <p className="text-sm text-muted-foreground">Real-time threat analysis and blocking</p>
                </div>
                <Switch checked={aiThreatDetection} onCheckedChange={setAiThreatDetection} />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Behavioral Analysis</h4>
                  <p className="text-sm text-muted-foreground">Monitor user behavior patterns</p>
                </div>
                <Switch checked={behaviorAnalysis} onCheckedChange={setBehaviorAnalysis} />
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Security Adaptations Active</h4>
              {securityAdaptations.map((adaptation, idx) => (
                <div key={idx} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-green-700">{adaptation.feature}</span>
                    <Badge variant="default" className="bg-green-600">{adaptation.effectiveness}%</Badge>
                  </div>
                  <p className="text-sm text-green-600">{adaptation.impact}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Threat Intelligence */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Real-time Threat Intelligence
          </CardTitle>
          <CardDescription>
            AI-detected security events and recommended actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {threatIntelligence.map((threat) => (
              <div key={threat.id} className={`border rounded-lg p-4 space-y-3 ${
                threat.severity === 'high' ? 'border-red-200 bg-red-50' :
                threat.severity === 'medium' ? 'border-yellow-200 bg-yellow-50' :
                'border-blue-200 bg-blue-50'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{threat.type}</h3>
                    <p className="text-sm text-muted-foreground">{threat.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      threat.severity === 'high' ? 'destructive' :
                      threat.severity === 'medium' ? 'default' :
                      'secondary'
                    }>
                      {threat.severity}
                    </Badge>
                    <Badge variant="outline">{threat.aiConfidence}% confidence</Badge>
                  </div>
                </div>

                <div className="bg-white p-3 rounded border-l-4 border-blue-500">
                  <span className="font-medium text-blue-700">AI Recommendation: </span>
                  <span className="text-blue-600">{threat.recommendedAction}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Detected {threat.timeDetected} • Status: {threat.status}
                  </span>
                  <div className="flex gap-2">
                    <Button size="sm">Take Action</Button>
                    <Button size="sm" variant="outline">Investigate</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            AI Risk Assessment
          </CardTitle>
          <CardDescription>
            Comprehensive security analysis with improvement recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riskFactors.map((factor, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    factor.status === 'excellent' ? 'bg-green-500' :
                    factor.status === 'good' ? 'bg-blue-500' :
                    'bg-yellow-500'
                  }`} />
                  <div>
                    <h4 className="font-medium">{factor.factor}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={
                        factor.status === 'excellent' ? 'default' :
                        factor.status === 'good' ? 'secondary' :
                        'destructive'
                      } className="text-xs">
                        {factor.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {factor.trend === 'improving' ? '↗' : factor.trend === 'concerning' ? '↙' : '→'} {factor.trend}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">{factor.score}%</div>
                  <Progress value={factor.score} className="w-20 h-2 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Predictive Threats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Predictive Threat Analysis
          </CardTitle>
          <CardDescription>
            AI predictions of potential future security threats
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {predictiveThreats.map((threat, idx) => (
              <div key={idx} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{threat.threat}</h3>
                  <Badge variant={
                    threat.probability > 40 ? 'destructive' :
                    threat.probability > 20 ? 'default' :
                    'secondary'
                  }>
                    {threat.probability}% probability
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Timeframe: </span>
                    <span className="font-medium">{threat.timeframe}</span>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">AI Confidence: </span>
                    <span className="font-medium">{threat.confidence}%</span>
                  </div>
                </div>

                <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-500">
                  <span className="font-medium text-purple-700">Prevention Strategy: </span>
                  <span className="text-purple-600">{threat.prevention}</span>
                </div>

                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  Implement Prevention
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Security Insights */}
      <Card className="border-2 border-green-200 bg-green-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <CheckCircle className="h-5 w-5" />
            AI Security Intelligence
          </CardTitle>
          <CardDescription>
            Machine learning insights about your security posture
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {aiInsights.map((insight, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-white border border-green-200 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                <span className="text-sm text-green-700">{insight}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}