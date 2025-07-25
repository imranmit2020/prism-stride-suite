import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, TrendingUp, Zap, Brain, Shield, AlertTriangle } from "lucide-react";

interface CurrencyPrediction {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  currentRate: number;
  predictedRate: number;
  timeframe: string;
  confidence: number;
  volatility: number;
  profitOpportunity: number;
  quantumFactors: string[];
  aiInsight: string;
  hedgeRecommendation: string;
}

interface CurrencyStrategy {
  id: string;
  strategy: string;
  targetCurrency: string;
  expectedReturn: number;
  riskLevel: "low" | "medium" | "high";
  timeHorizon: string;
  quantumScore: number;
  aiReasoning: string;
  implementation: string[];
}

interface RealTimeOpportunity {
  id: string;
  opportunity: string;
  currencies: string;
  potentialGain: number;
  timeWindow: string;
  urgency: "low" | "medium" | "high" | "critical";
  aiConfidence: number;
  actionRequired: string;
}

export function AICurrencyProphet() {
  const [selectedBaseCurrency, setSelectedBaseCurrency] = useState("USD");
  
  const [currencyPredictions] = useState<CurrencyPrediction[]>([
    {
      id: "1",
      fromCurrency: "USD",
      toCurrency: "EUR",
      currentRate: 0.85,
      predictedRate: 0.88,
      timeframe: "7 days",
      confidence: 94,
      volatility: 23,
      profitOpportunity: 3.5,
      quantumFactors: ["Fed Rate Quantum", "ECB Policy Wave", "Inflation Resonance"],
      aiInsight: "Strong EUR momentum detected via quantum economic modeling with 94% certainty",
      hedgeRecommendation: "Implement 70% EUR hedge with quantum timing optimization"
    },
    {
      id: "2",
      fromCurrency: "USD",
      toCurrency: "JPY",
      currentRate: 150.25,
      predictedRate: 147.80,
      timeframe: "14 days",
      confidence: 89,
      volatility: 18,
      profitOpportunity: 1.6,
      quantumFactors: ["BoJ Intervention Signals", "Carry Trade Quantum", "Risk Sentiment Wave"],
      aiInsight: "JPY strengthening pattern identified through quantum intervention probability modeling",
      hedgeRecommendation: "Strategic JPY accumulation with quantum entry point optimization"
    },
    {
      id: "3",
      fromCurrency: "USD",
      toCurrency: "GBP",
      currentRate: 0.79,
      predictedRate: 0.82,
      timeframe: "21 days",
      confidence: 86,
      volatility: 31,
      profitOpportunity: 3.8,
      quantumFactors: ["Brexit Quantum Effects", "BoE Policy Harmonics", "Political Stability Waves"],
      aiInsight: "GBP recovery momentum via quantum political stability analysis and economic indicators",
      hedgeRecommendation: "Gradual GBP exposure increase with quantum volatility protection"
    }
  ]);

  const [currencyStrategies] = useState<CurrencyStrategy[]>([
    {
      id: "1",
      strategy: "Quantum Carry Optimization",
      targetCurrency: "AUD/NZD",
      expectedReturn: 8.7,
      riskLevel: "medium",
      timeHorizon: "3-6 months",
      quantumScore: 923,
      aiReasoning: "High-yield quantum opportunities with commodity correlation protection",
      implementation: ["Phase entry over 2 weeks", "Quantum stop-loss at -2.5%", "Auto-rebalancing every 48h"]
    },
    {
      id: "2",
      strategy: "AI Arbitrage Matrix",
      targetCurrency: "Multi-pair",
      expectedReturn: 12.3,
      riskLevel: "high",
      timeHorizon: "1-3 months",
      quantumScore: 847,
      aiReasoning: "Cross-currency quantum arbitrage with millisecond execution advantage",
      implementation: ["Real-time quantum scanning", "Automated execution", "Risk-adjusted position sizing"]
    },
    {
      id: "3",
      strategy: "Defensive Quantum Hedge",
      targetCurrency: "CHF/Gold",
      expectedReturn: 4.2,
      riskLevel: "low",
      timeHorizon: "6-12 months",
      quantumScore: 756,
      aiReasoning: "Safe-haven quantum protection against market volatility with preserved liquidity",
      implementation: ["25% CHF allocation", "Digital gold integration", "Quantum rebalancing triggers"]
    }
  ]);

  const [realTimeOpportunities] = useState<RealTimeOpportunity[]>([
    {
      id: "1",
      opportunity: "EUR Flash Spike Detected",
      currencies: "USD/EUR",
      potentialGain: 0.85,
      timeWindow: "Next 4 hours",
      urgency: "critical",
      aiConfidence: 96,
      actionRequired: "Execute immediate EUR purchase with quantum timing"
    },
    {
      id: "2",
      opportunity: "Asian Session Volatility Pattern",
      currencies: "JPY/AUD",
      potentialGain: 1.2,
      timeWindow: "Next 8 hours",
      urgency: "high",
      aiConfidence: 89,
      actionRequired: "Position for volatility expansion with protective stops"
    },
    {
      id: "3",
      opportunity: "Crypto-FX Correlation Divergence",
      currencies: "Multiple",
      potentialGain: 2.1,
      timeWindow: "Next 24 hours",
      urgency: "medium",
      aiConfidence: 82,
      actionRequired: "Deploy correlation trading strategy with quantum risk management"
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

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical": return "text-red-600";
      case "high": return "text-orange-500";
      case "medium": return "text-yellow-500";
      case "low": return "text-green-500";
      default: return "text-muted-foreground";
    }
  };

  const totalProfitOpportunity = currencyPredictions.reduce((acc, pred) => acc + pred.profitOpportunity, 0);
  const avgConfidence = Math.round(currencyPredictions.reduce((acc, pred) => acc + pred.confidence, 0) / currencyPredictions.length);
  const activePairs = 24;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            AI Currency Prophet
          </h2>
          <p className="text-muted-foreground">Quantum-powered currency prediction with real-time arbitrage opportunities</p>
        </div>
        <Badge variant="outline" className="px-4 py-2 border-green-200">
          <DollarSign className="h-4 w-4 mr-2 text-green-500" />
          Quantum FX Oracle Active
        </Badge>
      </div>

      {/* Currency Prophet Overview */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-green-700">
              <TrendingUp className="h-5 w-5 mr-2" />
              Profit Opportunity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{totalProfitOpportunity.toFixed(1)}%</div>
            <p className="text-sm text-green-600 mt-1">7-Day Quantum Prediction</p>
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
            <div className="text-2xl font-bold text-blue-700">{avgConfidence}%</div>
            <Progress value={avgConfidence} className="mt-2" />
            <p className="text-sm text-blue-600 mt-1">Neural Certainty</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-purple-700">
              <DollarSign className="h-5 w-5 mr-2" />
              Active Pairs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">{activePairs}</div>
            <p className="text-sm text-purple-600 mt-1">Quantum Monitored</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-orange-700">
              <Zap className="h-5 w-5 mr-2" />
              Live Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">{realTimeOpportunities.length}</div>
            <p className="text-sm text-orange-600 mt-1">Real-time Alerts</p>
          </CardContent>
        </Card>
      </div>

      {/* Base Currency Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="h-5 w-5 mr-2" />
            Base Currency Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select value={selectedBaseCurrency} onValueChange={setSelectedBaseCurrency}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select base currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD - US Dollar</SelectItem>
                <SelectItem value="EUR">EUR - Euro</SelectItem>
                <SelectItem value="GBP">GBP - British Pound</SelectItem>
                <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                <SelectItem value="CHF">CHF - Swiss Franc</SelectItem>
                <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Currency Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            Quantum Currency Predictions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currencyPredictions.map((prediction) => (
            <div key={prediction.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">
                    {prediction.fromCurrency}/{prediction.toCurrency}
                  </h4>
                  <p className="text-sm text-muted-foreground">{prediction.aiInsight}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">
                    +{prediction.profitOpportunity}%
                  </div>
                  <p className="text-sm text-muted-foreground">Profit Opportunity</p>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Current Rate:</span>
                  <p className="font-medium">{prediction.currentRate}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Predicted Rate:</span>
                  <p className="font-medium text-green-600">{prediction.predictedRate}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Timeframe:</span>
                  <p className="font-medium">{prediction.timeframe}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Confidence:</span>
                  <div className="flex items-center mt-1">
                    <Progress value={prediction.confidence} className="flex-1 mr-2" />
                    <span className="font-medium">{prediction.confidence}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded p-3 text-xs space-y-2">
                <div>
                  <strong>Quantum Factors:</strong>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {prediction.quantumFactors.map((factor, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div><strong>Hedge Recommendation:</strong> {prediction.hedgeRecommendation}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Currency Strategies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            AI Currency Strategies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currencyStrategies.map((strategy) => (
            <div key={strategy.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{strategy.strategy}</h4>
                  <p className="text-sm text-muted-foreground">Target: {strategy.targetCurrency}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">
                    {strategy.expectedReturn}%
                  </div>
                  <Badge variant="outline" className={getRiskColor(strategy.riskLevel)}>
                    {strategy.riskLevel.toUpperCase()} RISK
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Time Horizon:</span>
                  <p className="font-medium">{strategy.timeHorizon}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Quantum Score:</span>
                  <p className="font-medium">{strategy.quantumScore}</p>
                </div>
              </div>

              <Alert>
                <Brain className="h-4 w-4" />
                <AlertDescription>
                  <strong>AI Reasoning:</strong> {strategy.aiReasoning}
                </AlertDescription>
              </Alert>

              <div className="bg-blue-50 rounded p-3 text-xs">
                <div className="mb-2"><strong>Implementation Strategy:</strong></div>
                <ul className="space-y-1">
                  {strategy.implementation.map((step, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-4 h-4 bg-blue-200 rounded-full flex items-center justify-center text-xs mr-2">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Real-time Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Real-time Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {realTimeOpportunities.map((opportunity) => (
            <div key={opportunity.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{opportunity.opportunity}</h4>
                  <p className="text-sm text-muted-foreground">{opportunity.currencies}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">
                    +{opportunity.potentialGain}%
                  </div>
                  <Badge variant="outline" className={getUrgencyColor(opportunity.urgency)}>
                    {opportunity.urgency.toUpperCase()}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Time Window:</span>
                  <p className="font-medium">{opportunity.timeWindow}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">AI Confidence:</span>
                  <div className="flex items-center mt-1">
                    <Progress value={opportunity.aiConfidence} className="flex-1 mr-2" />
                    <span className="font-medium">{opportunity.aiConfidence}%</span>
                  </div>
                </div>
              </div>

              <Alert className="border-orange-200 bg-orange-50">
                <Zap className="h-4 w-4" />
                <AlertDescription>
                  <strong>Action Required:</strong> {opportunity.actionRequired}
                </AlertDescription>
              </Alert>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AI Actions */}
      <div className="flex gap-4">
        <Button className="flex-1 bg-green-600 hover:bg-green-700">
          <DollarSign className="h-4 w-4 mr-2" />
          Activate Currency Prophet
        </Button>
        <Button variant="outline" className="flex-1">
          <TrendingUp className="h-4 w-4 mr-2" />
          Execute Top Strategy
        </Button>
        <Button variant="outline" className="flex-1">
          <Zap className="h-4 w-4 mr-2" />
          Auto-Trade Opportunities
        </Button>
      </div>
    </div>
  );
}