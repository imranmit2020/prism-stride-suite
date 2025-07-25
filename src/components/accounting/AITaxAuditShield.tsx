import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertTriangle, CheckCircle, Brain, Zap, Eye } from "lucide-react";

interface AuditRisk {
  id: string;
  category: string;
  risk: string;
  severity: "low" | "medium" | "high" | "critical";
  probability: number;
  aiConfidence: number;
  impact: string;
  suggestion: string;
  quantumScore: number;
}

interface ComplianceCheck {
  id: string;
  jurisdiction: string;
  regulation: string;
  status: "compliant" | "warning" | "violation";
  aiVerification: number;
  lastChecked: string;
  details: string;
}

export function AITaxAuditShield() {
  const [auditRisks] = useState<AuditRisk[]>([
    {
      id: "1",
      category: "Expense Deductions",
      risk: "Unusually high travel expense ratio detected",
      severity: "medium",
      probability: 73,
      aiConfidence: 94,
      impact: "Potential audit trigger - $12,500 at risk",
      suggestion: "Implement AI-powered receipt validation system",
      quantumScore: 847
    },
    {
      id: "2",
      category: "Revenue Recognition",
      risk: "Irregular revenue timing patterns identified",
      severity: "high",
      probability: 89,
      aiConfidence: 91,
      impact: "High audit probability - $45,000 exposure",
      suggestion: "Deploy quantum revenue matching algorithm",
      quantumScore: 923
    },
    {
      id: "3",
      category: "Depreciation",
      risk: "Asset depreciation method inconsistencies",
      severity: "low",
      probability: 34,
      aiConfidence: 88,
      impact: "Minor compliance issue - $3,200 variance",
      suggestion: "Activate AI depreciation harmonizer",
      quantumScore: 645
    }
  ]);

  const [complianceChecks] = useState<ComplianceCheck[]>([
    {
      id: "1",
      jurisdiction: "Federal (IRS)",
      regulation: "Section 199A Deduction",
      status: "compliant",
      aiVerification: 97,
      lastChecked: "2 minutes ago",
      details: "All QBI calculations verified by quantum AI"
    },
    {
      id: "2",
      jurisdiction: "State (CA)",
      regulation: "FTB Regulation 25128",
      status: "warning",
      aiVerification: 84,
      lastChecked: "5 minutes ago",
      details: "Minor apportionment factor discrepancy detected"
    },
    {
      id: "3",
      jurisdiction: "Local (SF)",
      regulation: "Business Registration Tax",
      status: "compliant",
      aiVerification: 99,
      lastChecked: "1 minute ago",
      details: "Perfect compliance maintained by AI oracle"
    }
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-destructive";
      case "high": return "text-orange-500";
      case "medium": return "text-yellow-500";
      case "low": return "text-green-500";
      default: return "text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant": return "text-green-500";
      case "warning": return "text-yellow-500";
      case "violation": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const overallAuditRisk = Math.round(auditRisks.reduce((acc, risk) => acc + risk.probability, 0) / auditRisks.length);
  const aiShieldScore = 98;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            AI Tax Audit Shield
          </h2>
          <p className="text-muted-foreground">Quantum-powered audit risk prediction and real-time compliance monitoring</p>
        </div>
        <Badge variant="outline" className="px-4 py-2">
          <Shield className="h-4 w-4 mr-2" />
          Protection Level: Maximum
        </Badge>
      </div>

      {/* AI Shield Status */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-green-700">
              <Shield className="h-5 w-5 mr-2" />
              AI Shield Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-700">{aiShieldScore}%</div>
            <Progress value={aiShieldScore} className="mt-2" />
            <p className="text-sm text-green-600 mt-2">Quantum Protection Active</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-orange-700">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Audit Risk Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-700">{overallAuditRisk}%</div>
            <Progress value={overallAuditRisk} className="mt-2" />
            <p className="text-sm text-orange-600 mt-2">AI Monitoring Active</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-blue-700">
              <Brain className="h-5 w-5 mr-2" />
              AI Confidence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700">94%</div>
            <Progress value={94} className="mt-2" />
            <p className="text-sm text-blue-600 mt-2">Quantum Analysis Ready</p>
          </CardContent>
        </Card>
      </div>

      {/* Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Eye className="h-5 w-5 mr-2" />
            AI Risk Assessment Matrix
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {auditRisks.map((risk) => (
            <div key={risk.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{risk.category}</h4>
                  <p className="text-sm text-muted-foreground">{risk.risk}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className={getSeverityColor(risk.severity)}>
                    {risk.severity.toUpperCase()}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">
                    Quantum Score: {risk.quantumScore}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Probability:</span>
                  <div className="flex items-center mt-1">
                    <Progress value={risk.probability} className="flex-1 mr-2" />
                    <span className="font-medium">{risk.probability}%</span>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">AI Confidence:</span>
                  <div className="flex items-center mt-1">
                    <Progress value={risk.aiConfidence} className="flex-1 mr-2" />
                    <span className="font-medium">{risk.aiConfidence}%</span>
                  </div>
                </div>
              </div>

              <Alert>
                <Zap className="h-4 w-4" />
                <AlertDescription>
                  <strong>Impact:</strong> {risk.impact}<br />
                  <strong>AI Suggestion:</strong> {risk.suggestion}
                </AlertDescription>
              </Alert>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Real-time Compliance Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            Real-time Compliance Oracle
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {complianceChecks.map((check) => (
            <div key={check.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-semibold">{check.jurisdiction}</h4>
                  <p className="text-sm text-muted-foreground">{check.regulation}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className={getStatusColor(check.status)}>
                    {check.status.toUpperCase()}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    Updated {check.lastChecked}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center mb-2">
                <span className="text-sm text-muted-foreground mr-2">AI Verification:</span>
                <Progress value={check.aiVerification} className="flex-1 mr-2" />
                <span className="text-sm font-medium">{check.aiVerification}%</span>
              </div>
              
              <p className="text-sm">{check.details}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AI Actions */}
      <div className="flex gap-4">
        <Button className="flex-1">
          <Shield className="h-4 w-4 mr-2" />
          Activate Quantum Shield
        </Button>
        <Button variant="outline" className="flex-1">
          <Brain className="h-4 w-4 mr-2" />
          Generate Audit Report
        </Button>
        <Button variant="outline" className="flex-1">
          <Zap className="h-4 w-4 mr-2" />
          Auto-Fix Risks
        </Button>
      </div>
    </div>
  );
}