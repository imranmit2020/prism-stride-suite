import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skull, Radar, Zap, Brain, Shield, AlertTriangle } from "lucide-react";

interface FraudPattern {
  id: string;
  type: string;
  pattern: string;
  confidence: number;
  severity: "low" | "medium" | "high" | "critical";
  transactions: number;
  estimatedLoss: number;
  aiDetectionMethod: string;
  quantumSignature: string;
  neuralPathway: string;
}

interface BehavioralAnomaly {
  id: string;
  entity: string;
  anomaly: string;
  deviationScore: number;
  baseline: string;
  current: string;
  aiInsight: string;
  emotionalSignature: string;
}

export function AIFraudPatternGenesis() {
  const [fraudPatterns] = useState<FraudPattern[]>([
    {
      id: "1",
      type: "Velocity Fraud",
      pattern: "Unusual transaction velocity spike detected",
      confidence: 96,
      severity: "critical",
      transactions: 47,
      estimatedLoss: 23500,
      aiDetectionMethod: "Quantum Temporal Analysis",
      quantumSignature: "QS-7829-VELOCITY-ANOMALY",
      neuralPathway: "Deep Behavioral Network Layer 7"
    },
    {
      id: "2",
      type: "Synthetic Identity",
      pattern: "AI-generated identity markers identified",
      confidence: 89,
      severity: "high",
      transactions: 12,
      estimatedLoss: 8900,
      aiDetectionMethod: "Neural Identity Genesis Scanner",
      quantumSignature: "QS-4521-SYNTHETIC-ID",
      neuralPathway: "Identity Validation Matrix"
    },
    {
      id: "3",
      type: "Micro-laundering",
      pattern: "Systematic micro-transaction laundering",
      confidence: 94,
      severity: "high",
      transactions: 156,
      estimatedLoss: 45200,
      aiDetectionMethod: "Quantum Flow Pattern Recognition",
      quantumSignature: "QS-9134-MICRO-LAUNDER",
      neuralPathway: "Transaction Flow Deep Learning"
    }
  ]);

  const [behavioralAnomalies] = useState<BehavioralAnomaly[]>([
    {
      id: "1",
      entity: "Vendor #V-4521",
      anomaly: "Invoice timing pattern deviation",
      deviationScore: 87,
      baseline: "Monthly invoices on 15th ±2 days",
      current: "Random timing with emotional stress indicators",
      aiInsight: "Possible financial distress or collusion pattern",
      emotionalSignature: "Anxiety: 73%, Deception: 45%"
    },
    {
      id: "2",
      entity: "Employee #E-7829",
      anomaly: "Expense report behavioral shift",
      deviationScore: 91,
      baseline: "Conservative, detailed documentation",
      current: "Aggressive amounts, minimal documentation",
      aiInsight: "Lifestyle inflation or external pressure detected",
      emotionalSignature: "Stress: 89%, Risk-taking: 67%"
    },
    {
      id: "3",
      entity: "Customer #C-3456",
      anomaly: "Payment behavior metamorphosis",
      deviationScore: 78,
      baseline: "Prompt payment, consistent amounts",
      current: "Delayed payments, unusual amounts",
      aiInsight: "Possible account takeover or financial crisis",
      emotionalSignature: "Confusion: 56%, Desperation: 34%"
    }
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-600";
      case "high": return "text-orange-500";
      case "medium": return "text-yellow-500";
      case "low": return "text-green-500";
      default: return "text-muted-foreground";
    }
  };

  const totalExposure = fraudPatterns.reduce((acc, pattern) => acc + pattern.estimatedLoss, 0);
  const avgConfidence = Math.round(fraudPatterns.reduce((acc, pattern) => acc + pattern.confidence, 0) / fraudPatterns.length);
  const totalTransactions = fraudPatterns.reduce((acc, pattern) => acc + pattern.transactions, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
            AI Fraud Pattern Genesis
          </h2>
          <p className="text-muted-foreground">Advanced behavioral AI fraud detection with emotional pattern analysis</p>
        </div>
        <Badge variant="outline" className="px-4 py-2 border-red-200">
          <Skull className="h-4 w-4 mr-2 text-red-500" />
          Genesis Protocol Active
        </Badge>
      </div>

      {/* Fraud Detection Overview */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-red-200 bg-red-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-red-700">
              <Skull className="h-5 w-5 mr-2" />
              Total Exposure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">${totalExposure.toLocaleString()}</div>
            <p className="text-sm text-red-600 mt-1">Detected Loss Risk</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-orange-700">
              <Radar className="h-5 w-5 mr-2" />
              AI Confidence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">{avgConfidence}%</div>
            <Progress value={avgConfidence} className="mt-2" />
            <p className="text-sm text-orange-600 mt-1">Neural Certainty</p>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-yellow-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-yellow-700">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Flagged Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-700">{totalTransactions}</div>
            <p className="text-sm text-yellow-600 mt-1">Quantum Analyzed</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-blue-700">
              <Brain className="h-5 w-5 mr-2" />
              Neural Pathways
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">12</div>
            <p className="text-sm text-blue-600 mt-1">Active AI Models</p>
          </CardContent>
        </Card>
      </div>

      {/* Fraud Pattern Detection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Skull className="h-5 w-5 mr-2" />
            Detected Fraud Patterns
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {fraudPatterns.map((pattern) => (
            <div key={pattern.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold flex items-center">
                    {pattern.type}
                    <Badge variant="outline" className={`ml-2 ${getSeverityColor(pattern.severity)}`}>
                      {pattern.severity.toUpperCase()}
                    </Badge>
                  </h4>
                  <p className="text-sm text-muted-foreground">{pattern.pattern}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-red-600">
                    ${pattern.estimatedLoss.toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {pattern.transactions} transactions
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">AI Confidence:</span>
                  <div className="flex items-center mt-1">
                    <Progress value={pattern.confidence} className="flex-1 mr-2" />
                    <span className="font-medium">{pattern.confidence}%</span>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Detection Method:</span>
                  <p className="font-medium">{pattern.aiDetectionMethod}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded p-3 text-xs space-y-1">
                <div><strong>Quantum Signature:</strong> {pattern.quantumSignature}</div>
                <div><strong>Neural Pathway:</strong> {pattern.neuralPathway}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Behavioral Anomaly Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            Behavioral Anomaly Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {behavioralAnomalies.map((anomaly) => (
            <div key={anomaly.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{anomaly.entity}</h4>
                  <p className="text-sm text-muted-foreground">{anomaly.anomaly}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-orange-600">
                    {anomaly.deviationScore}%
                  </div>
                  <p className="text-sm text-muted-foreground">Deviation Score</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Baseline Behavior:</span>
                  <p className="font-medium">{anomaly.baseline}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Current Behavior:</span>
                  <p className="font-medium">{anomaly.current}</p>
                </div>
              </div>

              <Alert>
                <Brain className="h-4 w-4" />
                <AlertDescription>
                  <strong>AI Insight:</strong> {anomaly.aiInsight}<br />
                  <strong>Emotional Signature:</strong> {anomaly.emotionalSignature}
                </AlertDescription>
              </Alert>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AI Actions */}
      <div className="flex gap-4">
        <Button className="flex-1 bg-red-600 hover:bg-red-700">
          <Shield className="h-4 w-4 mr-2" />
          Activate Genesis Protocol
        </Button>
        <Button variant="outline" className="flex-1">
          <Radar className="h-4 w-4 mr-2" />
          Deep Scan All Entities
        </Button>
        <Button variant="outline" className="flex-1">
          <Zap className="h-4 w-4 mr-2" />
          Auto-Block Threats
        </Button>
      </div>
    </div>
  );
}