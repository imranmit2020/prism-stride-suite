import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Globe, Brain, Zap, Shield, TrendingUp } from "lucide-react";

interface TaxJurisdiction {
  id: string;
  country: string;
  region: string;
  taxRate: number;
  complexity: number;
  complianceScore: number;
  aiOptimizationPotential: number;
  quantumAdvantage: number;
  regulations: string[];
  aiInsights: string;
  optimizationStrategies: string[];
}

interface TaxOptimization {
  id: string;
  strategy: string;
  jurisdictions: string[];
  potentialSavings: number;
  riskLevel: "low" | "medium" | "high";
  legalCompliance: number;
  implementationComplexity: number;
  timeToImplement: string;
  aiConfidence: number;
  quantumScore: number;
  description: string;
}

interface ComplianceMonitor {
  id: string;
  jurisdiction: string;
  regulation: string;
  status: "compliant" | "warning" | "critical" | "optimized";
  complianceScore: number;
  aiVerification: number;
  lastUpdated: string;
  nextDeadline: string;
  aiRecommendation: string;
  automationLevel: number;
}

export function AITaxQuantumEngine() {
  const [selectedJurisdiction, setSelectedJurisdiction] = useState("global");
  
  const [taxJurisdictions] = useState<TaxJurisdiction[]>([
    {
      id: "1",
      country: "United States",
      region: "North America",
      taxRate: 21,
      complexity: 89,
      complianceScore: 94,
      aiOptimizationPotential: 23,
      quantumAdvantage: 87,
      regulations: ["IRC Section 199A", "GILTI", "FDII", "R&D Capitalization"],
      aiInsights: "Quantum analysis reveals 23% optimization potential through strategic entity structuring",
      optimizationStrategies: ["Quantum IP Migration", "R&D Credit Maximization", "State Tax Arbitrage"]
    },
    {
      id: "2",
      country: "Ireland",
      region: "Europe",
      taxRate: 12.5,
      complexity: 45,
      complianceScore: 97,
      aiOptimizationPotential: 34,
      quantumAdvantage: 92,
      regulations: ["IP Box Regime", "OECD BEPS", "Digital Services Tax"],
      aiInsights: "Quantum modeling identifies IP optimization opportunities with 92% efficiency gain",
      optimizationStrategies: ["Quantum IP Centralization", "BEPS-Compliant Structures", "Digital Tax Shields"]
    },
    {
      id: "3",
      country: "Singapore",
      region: "Asia Pacific",
      taxRate: 17,
      complexity: 38,
      complianceScore: 96,
      aiOptimizationPotential: 28,
      quantumAdvantage: 89,
      regulations: ["Pioneer Certificate", "Development and Expansion Incentive", "Withholding Tax"],
      aiInsights: "Quantum analysis reveals regional hub optimization with substantial incentive capture",
      optimizationStrategies: ["Quantum Hub Structuring", "Incentive Stacking", "Cross-Border Flow Optimization"]
    }
  ]);

  const [taxOptimizations] = useState<TaxOptimization[]>([
    {
      id: "1",
      strategy: "Quantum IP Migration Matrix",
      jurisdictions: ["Ireland", "Netherlands", "Singapore"],
      potentialSavings: 3.4,
      riskLevel: "low",
      legalCompliance: 98,
      implementationComplexity: 67,
      timeToImplement: "3-6 months",
      aiConfidence: 94,
      quantumScore: 923,
      description: "AI-orchestrated intellectual property migration with quantum tax efficiency optimization"
    },
    {
      id: "2",
      strategy: "Multi-Jurisdictional Quantum Arbitrage",
      jurisdictions: ["US", "Ireland", "Singapore", "Switzerland"],
      potentialSavings: 5.7,
      riskLevel: "medium",
      legalCompliance: 89,
      implementationComplexity: 84,
      timeToImplement: "6-12 months",
      aiConfidence: 87,
      quantumScore: 856,
      description: "Advanced quantum modeling for cross-border tax optimization with BEPS compliance"
    },
    {
      id: "3",
      strategy: "AI-Powered Credit Maximization",
      jurisdictions: ["US", "Canada", "UK"],
      potentialSavings: 2.1,
      riskLevel: "low",
      legalCompliance: 97,
      implementationComplexity: 23,
      timeToImplement: "1-3 months",
      aiConfidence: 96,
      quantumScore: 734,
      description: "Quantum analysis of R&D credits, investment incentives, and regional tax benefits"
    }
  ]);

  const [complianceMonitors] = useState<ComplianceMonitor[]>([
    {
      id: "1",
      jurisdiction: "United States - Federal",
      regulation: "Form 1120 Corporate Tax Return",
      status: "compliant",
      complianceScore: 98,
      aiVerification: 99,
      lastUpdated: "2 hours ago",
      nextDeadline: "March 15, 2024",
      aiRecommendation: "Quantum optimization suggests early filing for maximum credit capture",
      automationLevel: 87
    },
    {
      id: "2",
      jurisdiction: "Ireland - Revenue",
      regulation: "CT1 Corporation Tax Return",
      status: "optimized",
      complianceScore: 99,
      aiVerification: 97,
      lastUpdated: "45 minutes ago",
      nextDeadline: "September 21, 2024",
      aiRecommendation: "AI-enhanced filing submitted with quantum tax optimization protocols",
      automationLevel: 94
    },
    {
      id: "3",
      jurisdiction: "Singapore - IRAS",
      regulation: "Corporate Income Tax",
      status: "warning",
      complianceScore: 76,
      aiVerification: 82,
      lastUpdated: "3 hours ago",
      nextDeadline: "November 30, 2024",
      aiRecommendation: "Quantum analysis detects optimization opportunity - implement incentive restructuring",
      automationLevel: 71
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant": return "text-green-500";
      case "optimized": return "text-blue-500";
      case "warning": return "text-yellow-500";
      case "critical": return "text-red-500";
      default: return "text-muted-foreground";
    }
  };

  const totalPotentialSavings = taxOptimizations.reduce((acc, opt) => acc + opt.potentialSavings, 0);
  const avgOptimizationPotential = Math.round(taxJurisdictions.reduce((acc, jur) => acc + jur.aiOptimizationPotential, 0) / taxJurisdictions.length);
  const activeJurisdictions = taxJurisdictions.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            AI Tax Quantum Engine
          </h2>
          <p className="text-muted-foreground">Multi-jurisdictional tax optimization with quantum compliance intelligence</p>
        </div>
        <Badge variant="outline" className="px-4 py-2 border-indigo-200">
          <Calculator className="h-4 w-4 mr-2 text-indigo-500" />
          Quantum Tax Oracle Active
        </Badge>
      </div>

      {/* Tax Engine Overview */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-indigo-200 bg-indigo-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-indigo-700">
              <TrendingUp className="h-5 w-5 mr-2" />
              Potential Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-700">{totalPotentialSavings.toFixed(1)}M</div>
            <p className="text-sm text-indigo-600 mt-1">Annual Tax Savings</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-purple-700">
              <Brain className="h-5 w-5 mr-2" />
              AI Optimization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">{avgOptimizationPotential}%</div>
            <Progress value={avgOptimizationPotential} className="mt-2" />
            <p className="text-sm text-purple-600 mt-1">Average Potential</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-green-700">
              <Globe className="h-5 w-5 mr-2" />
              Jurisdictions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{activeJurisdictions}</div>
            <p className="text-sm text-green-600 mt-1">Quantum Monitored</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-blue-700">
              <Shield className="h-5 w-5 mr-2" />
              Compliance Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">96%</div>
            <Progress value={96} className="mt-2" />
            <p className="text-sm text-blue-600 mt-1">Global Average</p>
          </CardContent>
        </Card>
      </div>

      {/* Jurisdiction Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            Tax Jurisdiction Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select value={selectedJurisdiction} onValueChange={setSelectedJurisdiction}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select jurisdiction focus" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="global">Global Overview</SelectItem>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="eu">European Union</SelectItem>
                <SelectItem value="apac">Asia Pacific</SelectItem>
                <SelectItem value="emerging">Emerging Markets</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-4">
            {taxJurisdictions.map((jurisdiction) => (
              <div key={jurisdiction.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{jurisdiction.country}</h4>
                    <p className="text-sm text-muted-foreground">{jurisdiction.region} • {jurisdiction.taxRate}% Corporate Tax Rate</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      {jurisdiction.aiOptimizationPotential}%
                    </div>
                    <p className="text-sm text-muted-foreground">Optimization Potential</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Complexity Score:</span>
                    <div className="flex items-center mt-1">
                      <Progress value={jurisdiction.complexity} className="flex-1 mr-2" />
                      <span className="font-medium">{jurisdiction.complexity}%</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Compliance Score:</span>
                    <div className="flex items-center mt-1">
                      <Progress value={jurisdiction.complianceScore} className="flex-1 mr-2" />
                      <span className="font-medium">{jurisdiction.complianceScore}%</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Quantum Advantage:</span>
                    <div className="flex items-center mt-1">
                      <Progress value={jurisdiction.quantumAdvantage} className="flex-1 mr-2" />
                      <span className="font-medium">{jurisdiction.quantumAdvantage}%</span>
                    </div>
                  </div>
                </div>

                <Alert>
                  <Brain className="h-4 w-4" />
                  <AlertDescription>
                    <strong>AI Insights:</strong> {jurisdiction.aiInsights}
                  </AlertDescription>
                </Alert>

                <div className="bg-gray-50 rounded p-3 text-xs space-y-2">
                  <div>
                    <strong>Key Regulations:</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {jurisdiction.regulations.map((reg, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {reg}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <strong>Optimization Strategies:</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {jurisdiction.optimizationStrategies.map((strategy, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-green-50">
                          {strategy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tax Optimization Strategies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            Quantum Tax Optimization Strategies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {taxOptimizations.map((optimization) => (
            <div key={optimization.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{optimization.strategy}</h4>
                  <p className="text-sm text-muted-foreground">{optimization.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">
                    ${optimization.potentialSavings}M
                  </div>
                  <Badge variant="outline" className={getRiskColor(optimization.riskLevel)}>
                    {optimization.riskLevel.toUpperCase()} RISK
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Legal Compliance:</span>
                  <div className="flex items-center mt-1">
                    <Progress value={optimization.legalCompliance} className="flex-1 mr-2" />
                    <span className="font-medium">{optimization.legalCompliance}%</span>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">AI Confidence:</span>
                  <div className="flex items-center mt-1">
                    <Progress value={optimization.aiConfidence} className="flex-1 mr-2" />
                    <span className="font-medium">{optimization.aiConfidence}%</span>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Implementation:</span>
                  <p className="font-medium">{optimization.timeToImplement}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Quantum Score:</span>
                  <p className="font-medium">{optimization.quantumScore}</p>
                </div>
              </div>

              <div className="bg-blue-50 rounded p-3 text-xs">
                <div className="mb-2"><strong>Target Jurisdictions:</strong></div>
                <div className="flex flex-wrap gap-1">
                  {optimization.jurisdictions.map((jurisdiction, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {jurisdiction}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Compliance Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Real-time Compliance Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {complianceMonitors.map((monitor) => (
            <div key={monitor.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{monitor.jurisdiction}</h4>
                  <p className="text-sm text-muted-foreground">{monitor.regulation}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className={getStatusColor(monitor.status)}>
                    {monitor.status.toUpperCase()}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    Updated {monitor.lastUpdated}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Compliance Score:</span>
                  <div className="flex items-center mt-1">
                    <Progress value={monitor.complianceScore} className="flex-1 mr-2" />
                    <span className="font-medium">{monitor.complianceScore}%</span>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">AI Verification:</span>
                  <div className="flex items-center mt-1">
                    <Progress value={monitor.aiVerification} className="flex-1 mr-2" />
                    <span className="font-medium">{monitor.aiVerification}%</span>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Next Deadline:</span>
                  <p className="font-medium">{monitor.nextDeadline}</p>
                </div>
              </div>

              <Alert>
                <Zap className="h-4 w-4" />
                <AlertDescription>
                  <strong>AI Recommendation:</strong> {monitor.aiRecommendation}
                </AlertDescription>
              </Alert>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AI Actions */}
      <div className="flex gap-4">
        <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700">
          <Calculator className="h-4 w-4 mr-2" />
          Activate Quantum Engine
        </Button>
        <Button variant="outline" className="flex-1">
          <TrendingUp className="h-4 w-4 mr-2" />
          Execute Top Strategy
        </Button>
        <Button variant="outline" className="flex-1">
          <Zap className="h-4 w-4 mr-2" />
          Auto-Optimize All Jurisdictions
        </Button>
      </div>
    </div>
  );
}