import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TrendingUp, Gem, Waves, Brain, Zap, Eye } from "lucide-react";

interface CashFlowPrediction {
  id: string;
  period: string;
  predictedInflow: number;
  predictedOutflow: number;
  netFlow: number;
  confidence: number;
  marketSentiment: number;
  quantumFactors: string[];
  aiInsights: string;
  riskLevel: "low" | "medium" | "high";
}

interface MarketInfluence {
  id: string;
  factor: string;
  impact: number;
  direction: "positive" | "negative";
  confidence: number;
  quantumCorrelation: number;
  description: string;
}

interface CashFlowScenario {
  id: string;
  name: string;
  probability: number;
  netImpact: number;
  description: string;
  keyTriggers: string[];
  aiRecommendation: string;
}

export function AICashFlowProphet() {
  const [predictions] = useState<CashFlowPrediction[]>([
    {
      id: "1",
      period: "Next 30 Days",
      predictedInflow: 245000,
      predictedOutflow: 189000,
      netFlow: 56000,
      confidence: 94,
      marketSentiment: 72,
      quantumFactors: ["Q-Wave Pattern", "Seasonal Variance", "Market Resonance"],
      aiInsights: "Strong positive momentum detected with quantum-enhanced accuracy",
      riskLevel: "low"
    },
    {
      id: "2",
      period: "Next 60 Days",
      predictedInflow: 478000,
      predictedOutflow: 412000,
      netFlow: 66000,
      confidence: 89,
      marketSentiment: 68,
      quantumFactors: ["Economic Cycles", "Industry Harmonics", "Competitor Effects"],
      aiInsights: "Moderate growth with seasonal adjustments via quantum modeling",
      riskLevel: "medium"
    },
    {
      id: "3",
      period: "Next 90 Days",
      predictedInflow: 723000,
      predictedOutflow: 634000,
      netFlow: 89000,
      confidence: 82,
      marketSentiment: 65,
      quantumFactors: ["Market Volatility", "Supply Chain Quantum", "Macro Economic"],
      aiInsights: "Sustained growth trajectory with quantum uncertainty factored",
      riskLevel: "medium"
    }
  ]);

  const [marketInfluences] = useState<MarketInfluence[]>([
    {
      id: "1",
      factor: "Industry Sentiment Shift",
      impact: 15,
      direction: "positive",
      confidence: 91,
      quantumCorrelation: 87,
      description: "Positive industry sentiment creating quantum uplift in cash flow patterns"
    },
    {
      id: "2",
      factor: "Economic Policy Changes",
      impact: -8,
      direction: "negative",
      confidence: 78,
      quantumCorrelation: 73,
      description: "Recent policy shifts creating minor quantum turbulence in projections"
    },
    {
      id: "3",
      factor: "Seasonal Consumer Behavior",
      impact: 22,
      direction: "positive",
      confidence: 96,
      quantumCorrelation: 94,
      description: "Strong seasonal patterns amplified by quantum behavioral analysis"
    },
    {
      id: "4",
      factor: "Competitor Market Actions",
      impact: -12,
      direction: "negative",
      confidence: 84,
      quantumCorrelation: 79,
      description: "Competitor strategies creating quantum interference in market dynamics"
    }
  ]);

  const [scenarios] = useState<CashFlowScenario[]>([
    {
      id: "1",
      name: "Quantum Optimistic",
      probability: 35,
      netImpact: 145000,
      description: "All quantum factors align for maximum cash flow optimization",
      keyTriggers: ["Market surge", "Perfect timing", "Competitor weakness"],
      aiRecommendation: "Prepare for aggressive growth investment opportunities"
    },
    {
      id: "2",
      name: "Baseline Quantum",
      probability: 45,
      netImpact: 89000,
      description: "Standard quantum patterns with moderate market resonance",
      keyTriggers: ["Normal seasonality", "Steady growth", "Market stability"],
      aiRecommendation: "Maintain current strategy with minor optimizations"
    },
    {
      id: "3",
      name: "Quantum Stress Test",
      probability: 20,
      netImpact: 23000,
      description: "Market turbulence creating quantum cash flow disruption",
      keyTriggers: ["Economic downturn", "Supply disruption", "Credit tightening"],
      aiRecommendation: "Activate quantum defense protocols and preserve liquidity"
    }
  ]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "text-red-500";
      case "medium": return "text-yellow-500";
      case "low": return "text-green-500";
      default: return "text-muted-foreground";
    }
  };

  const getDirectionColor = (direction: string) => {
    return direction === "positive" ? "text-green-500" : "text-red-500";
  };

  const totalNetFlow = predictions.reduce((acc, pred) => acc + pred.netFlow, 0);
  const avgConfidence = Math.round(predictions.reduce((acc, pred) => acc + pred.confidence, 0) / predictions.length);
  const avgMarketSentiment = Math.round(predictions.reduce((acc, pred) => acc + pred.marketSentiment, 0) / predictions.length);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Cash Flow Prophet
          </h2>
          <p className="text-muted-foreground">Quantum-powered cash flow prediction with market sentiment analysis</p>
        </div>
        <Badge variant="outline" className="px-4 py-2 border-blue-200">
          <Gem className="h-4 w-4 mr-2 text-blue-500" />
          Quantum Oracle Active
        </Badge>
      </div>

      {/* Prophet Overview */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-blue-700">
              <Waves className="h-5 w-5 mr-2" />
              Net Flow Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">${totalNetFlow.toLocaleString()}</div>
            <p className="text-sm text-blue-600 mt-1">90-Day Quantum Prediction</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-green-700">
              <Brain className="h-5 w-5 mr-2" />
              AI Confidence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{avgConfidence}%</div>
            <Progress value={avgConfidence} className="mt-2" />
            <p className="text-sm text-green-600 mt-1">Neural Certainty Level</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-purple-700">
              <TrendingUp className="h-5 w-5 mr-2" />
              Market Sentiment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">{avgMarketSentiment}%</div>
            <Progress value={avgMarketSentiment} className="mt-2" />
            <p className="text-sm text-purple-600 mt-1">Quantum Sentiment Index</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-orange-700">
            <Gem className="h-5 w-5 mr-2" />
            Quantum Factors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">12</div>
            <p className="text-sm text-orange-600 mt-1">Active Quantum Models</p>
          </CardContent>
        </Card>
      </div>

      {/* Cash Flow Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Gem className="h-5 w-5 mr-2" />
            Quantum Cash Flow Predictions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {predictions.map((prediction) => (
            <div key={prediction.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{prediction.period}</h4>
                  <p className="text-sm text-muted-foreground">{prediction.aiInsights}</p>
                </div>
                <div className="text-right">
                  <div className={`text-xl font-bold ${prediction.netFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${prediction.netFlow.toLocaleString()}
                  </div>
                  <Badge variant="outline" className={getRiskColor(prediction.riskLevel)}>
                    {prediction.riskLevel.toUpperCase()} RISK
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Predicted Inflow:</span>
                  <p className="font-medium text-green-600">${prediction.predictedInflow.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Predicted Outflow:</span>
                  <p className="font-medium text-red-600">${prediction.predictedOutflow.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">AI Confidence:</span>
                  <div className="flex items-center mt-1">
                    <Progress value={prediction.confidence} className="flex-1 mr-2" />
                    <span className="font-medium">{prediction.confidence}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded p-3 text-xs">
                <div className="mb-2"><strong>Quantum Factors:</strong></div>
                <div className="flex flex-wrap gap-1">
                  {prediction.quantumFactors.map((factor, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {factor}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Market Influences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Market Influence Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {marketInfluences.map((influence) => (
            <div key={influence.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-semibold">{influence.factor}</h4>
                  <p className="text-sm text-muted-foreground">{influence.description}</p>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${getDirectionColor(influence.direction)}`}>
                    {influence.direction === "positive" ? "+" : ""}{influence.impact}%
                  </div>
                  <p className="text-sm text-muted-foreground">Impact</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">AI Confidence:</span>
                  <div className="flex items-center mt-1">
                    <Progress value={influence.confidence} className="flex-1 mr-2" />
                    <span className="font-medium">{influence.confidence}%</span>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Quantum Correlation:</span>
                  <div className="flex items-center mt-1">
                    <Progress value={influence.quantumCorrelation} className="flex-1 mr-2" />
                    <span className="font-medium">{influence.quantumCorrelation}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Scenario Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Eye className="h-5 w-5 mr-2" />
            Quantum Scenario Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {scenarios.map((scenario) => (
            <div key={scenario.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{scenario.name}</h4>
                  <p className="text-sm text-muted-foreground">{scenario.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">
                    {scenario.probability}%
                  </div>
                  <p className="text-sm text-muted-foreground">Probability</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Net Impact:</span>
                  <p className="font-medium text-green-600">${scenario.netImpact.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Key Triggers:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {scenario.keyTriggers.map((trigger, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {trigger}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <Alert>
                <Brain className="h-4 w-4" />
                <AlertDescription>
                  <strong>AI Recommendation:</strong> {scenario.aiRecommendation}
                </AlertDescription>
              </Alert>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AI Actions */}
      <div className="flex gap-4">
        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
          <Gem className="h-4 w-4 mr-2" />
          Activate Quantum Prophet
        </Button>
        <Button variant="outline" className="flex-1">
          <Waves className="h-4 w-4 mr-2" />
          Generate Flow Report
        </Button>
        <Button variant="outline" className="flex-1">
          <Zap className="h-4 w-4 mr-2" />
          Optimize Cash Position
        </Button>
      </div>
    </div>
  );
}