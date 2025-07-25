import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Shield, Eye, AlertTriangle, Target, Users } from "lucide-react";

export function AISecurityFraudDetection() {
  const [securityStatus, setSecurityStatus] = useState({
    overallRisk: "Low",
    fraudProbability: 12,
    suspiciousActivities: 3,
    securityScore: 94,
    activeThreats: 0
  });

  const securityInsights = {
    fraudDetection: [
      { 
        threat: "Card Cloning Attempt", 
        probability: 8, 
        severity: "Medium", 
        indicators: ["Unusual magnetic stripe pattern", "Multiple failed attempts"],
        action: "Request additional ID verification"
      },
      { 
        threat: "Identity Theft", 
        probability: 15, 
        severity: "High", 
        indicators: ["Mismatched signatures", "Nervous customer behavior"],
        action: "Manager approval required"
      },
      { 
        threat: "Synthetic Identity", 
        probability: 5, 
        severity: "Low", 
        indicators: ["New credit profile", "Limited credit history"],
        action: "Additional verification steps"
      }
    ],
    behaviorAnalysis: [
      { behavior: "Shopping Pattern", risk: 12, status: "Normal", analysis: "Consistent with customer history" },
      { behavior: "Payment Method", risk: 23, status: "Caution", analysis: "New card, verify with customer" },
      { behavior: "Purchase Amount", risk: 8, status: "Normal", analysis: "Within typical spending range" },
      { behavior: "Transaction Timing", risk: 34, status: "Monitor", analysis: "Unusual time for this customer" }
    ],
    realTimeProtection: [
      { protection: "AI Transaction Monitoring", status: "Active", effectiveness: 97, threats: "0 blocked today" },
      { protection: "Biometric Verification", status: "Active", effectiveness: 94, threats: "2 verified today" },
      { protection: "Behavioral Analytics", status: "Active", effectiveness: 91, threats: "1 flagged today" },
      { protection: "Network Threat Detection", status: "Active", effectiveness: 98, threats: "5 blocked today" }
    ],
    customerSafety: [
      { safety: "Personal Data Protection", level: 98, status: "Excellent", compliance: "GDPR, CCPA compliant" },
      { safety: "Payment Security", level: 96, status: "Excellent", compliance: "PCI DSS Level 1" },
      { safety: "Transaction Encryption", level: 99, status: "Excellent", compliance: "AES-256 encryption" },
      { safety: "Access Control", level: 94, status: "Strong", compliance: "Multi-factor authentication" }
    ],
    emergencyProtocols: [
      { protocol: "Immediate Transaction Block", trigger: "High fraud probability", response: "Automatic", time: "< 1 second" },
      { protocol: "Manager Alert", trigger: "Suspicious behavior", response: "Notification", time: "< 5 seconds" },
      { protocol: "Law Enforcement Contact", trigger: "Criminal activity", response: "Manual", time: "< 2 minutes" },
      { protocol: "Customer Communication", trigger: "Security concern", response: "Automated", time: "< 10 seconds" }
    ]
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Security & Fraud Detection
            <Badge variant="secondary" className="ml-auto">Revolutionary AI</Badge>
          </CardTitle>
          <CardDescription>
            Advanced AI protection with 99.7% fraud detection accuracy and real-time threat prevention
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">{securityStatus.overallRisk}</div>
              <div className="text-sm text-muted-foreground">Overall Risk</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{securityStatus.fraudProbability}%</div>
              <div className="text-sm text-muted-foreground">Fraud Probability</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{securityStatus.securityScore}%</div>
              <div className="text-sm text-muted-foreground">Security Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{securityStatus.activeThreats}</div>
              <div className="text-sm text-muted-foreground">Active Threats</div>
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-200">
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">🛡️ All Systems Secure</div>
              <div className="text-sm text-muted-foreground">AI monitoring active • 24/7 protection • Zero breaches detected</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-destructive" />
            Fraud Detection Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {securityInsights.fraudDetection.map((fraud, index) => (
            <div key={index} className="border rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">{fraud.threat}</div>
                  <div className="text-sm text-muted-foreground">{fraud.action}</div>
                </div>
                <div className="text-right">
                  <Badge variant={fraud.severity === "High" ? "destructive" : fraud.severity === "Medium" ? "secondary" : "outline"}>
                    {fraud.severity} Risk
                  </Badge>
                  <div className="text-sm text-muted-foreground mt-1">{fraud.probability}% probability</div>
                </div>
              </div>
              <div className="mb-2">
                <div className="text-sm font-medium mb-1">Risk Indicators</div>
                <div className="flex gap-1 flex-wrap">
                  {fraud.indicators.map((indicator, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">{indicator}</Badge>
                  ))}
                </div>
              </div>
              <Progress value={fraud.probability} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Behavior Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {securityInsights.behaviorAnalysis.map((behavior, index) => (
            <div key={index} className="border rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">{behavior.behavior}</div>
                  <div className="text-sm text-muted-foreground">{behavior.analysis}</div>
                </div>
                <div className="text-right">
                  <Badge variant={behavior.status === "Normal" ? "secondary" : behavior.status === "Caution" ? "outline" : "destructive"}>
                    {behavior.status}
                  </Badge>
                  <div className="text-sm text-muted-foreground mt-1">{behavior.risk}% risk</div>
                </div>
              </div>
              <Progress value={behavior.risk} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Real-Time Protection Systems
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {securityInsights.realTimeProtection.map((protection, index) => (
            <div key={index} className="border rounded-lg p-3 bg-gradient-to-r from-green-50 to-blue-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">{protection.protection}</div>
                  <div className="text-sm text-muted-foreground">{protection.threats}</div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">{protection.status}</Badge>
                  <div className="text-sm text-green-600 mt-1">{protection.effectiveness}% effective</div>
                </div>
              </div>
              <Progress value={protection.effectiveness} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Customer Safety Measures
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {securityInsights.customerSafety.map((safety, index) => (
            <div key={index} className="border rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">{safety.safety}</div>
                  <div className="text-sm text-muted-foreground">{safety.compliance}</div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">{safety.status}</Badge>
                  <div className="text-sm text-green-600 mt-1">{safety.level}%</div>
                </div>
              </div>
              <Progress value={safety.level} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Emergency Response Protocols
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {securityInsights.emergencyProtocols.map((protocol, index) => (
            <div key={index} className="border rounded-lg p-3 bg-gradient-to-r from-red-50 to-orange-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">{protocol.protocol}</div>
                  <div className="text-sm text-muted-foreground">Trigger: {protocol.trigger}</div>
                </div>
                <div className="text-right">
                  <Badge variant={protocol.response === "Automatic" ? "destructive" : "secondary"}>
                    {protocol.response}
                  </Badge>
                  <div className="text-sm text-muted-foreground mt-1">{protocol.time}</div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}