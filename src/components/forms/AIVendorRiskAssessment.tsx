import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { AlertTriangle, Shield, TrendingDown, Eye, Globe, Lock, DollarSign, Clock, Zap } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AIVendorRiskAssessment() {
  const [vendorData, setVendorData] = useState({
    name: "",
    website: "",
    contact: "",
    industry: "",
    services: "",
    contractValue: "",
    enableAI: true
  });
  const [isAssessing, setIsAssessing] = useState(false);

  const riskAssessment = {
    overallRisk: 23,
    riskLevel: "Low",
    confidence: 96,
    riskFactors: [
      { category: "Financial Stability", score: 89, risk: "Low", trend: "stable" },
      { category: "Cybersecurity", score: 94, risk: "Very Low", trend: "improving" },
      { category: "Compliance", score: 87, risk: "Low", trend: "stable" },
      { category: "Operational Risk", score: 76, risk: "Medium", trend: "improving" },
      { category: "Reputation", score: 92, risk: "Very Low", trend: "stable" },
      { category: "Supply Chain", score: 81, risk: "Low", trend: "declining" }
    ],
    aiInsights: [
      {
        type: "Financial",
        insight: "Strong revenue growth (+23%) with low debt-to-equity ratio. Excellent financial health.",
        severity: "positive",
        confidence: 94
      },
      {
        type: "Security",
        insight: "Recent SOC 2 certification and zero security incidents in past 24 months.",
        severity: "positive",
        confidence: 98
      },
      {
        type: "Warning",
        insight: "Supply chain dependency on single region detected. Recommend diversification.",
        severity: "warning",
        confidence: 87
      }
    ],
    recommendations: [
      "Implement quarterly financial reviews",
      "Request annual security audit reports",
      "Establish backup supplier relationships",
      "Set up automated compliance monitoring"
    ],
    contractOptimization: {
      suggestedTerms: [
        "Add force majeure clause with specific risk scenarios",
        "Include data breach liability caps",
        "Implement performance-based pricing structure"
      ],
      potentialSavings: "$12,400",
      riskReduction: "34%"
    }
  };

  const handleRiskAssessment = () => {
    setIsAssessing(true);
    setTimeout(() => setIsAssessing(false), 4000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            AI Vendor Risk Assessment Engine
          </CardTitle>
          <CardDescription>
            Advanced AI that analyzes vendor stability, security, compliance, and predicts future risks
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vendor Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Vendor Information</CardTitle>
            <div className="flex items-center space-x-2">
              <Switch 
                id="ai-assessment" 
                checked={vendorData.enableAI}
                onCheckedChange={(checked) => setVendorData({...vendorData, enableAI: checked})}
              />
              <Label htmlFor="ai-assessment">Enable AI Risk Analysis</Label>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="vendor-name">Vendor Name</Label>
                <Input 
                  id="vendor-name" 
                  value={vendorData.name}
                  onChange={(e) => setVendorData({...vendorData, name: e.target.value})}
                  placeholder="Enter vendor name"
                />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input 
                  id="website"
                  value={vendorData.website}
                  onChange={(e) => setVendorData({...vendorData, website: e.target.value})}
                  placeholder="https://vendor.com"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact">Primary Contact</Label>
                <Input 
                  id="contact"
                  value={vendorData.contact}
                  onChange={(e) => setVendorData({...vendorData, contact: e.target.value})}
                  placeholder="contact@vendor.com"
                />
              </div>
              <div>
                <Label htmlFor="industry">Industry</Label>
                <Select value={vendorData.industry} onValueChange={(value) => setVendorData({...vendorData, industry: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="logistics">Logistics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="services">Services Provided</Label>
              <Textarea 
                id="services"
                value={vendorData.services}
                onChange={(e) => setVendorData({...vendorData, services: e.target.value})}
                placeholder="Describe the services this vendor provides..."
                className="h-20"
              />
            </div>

            <div>
              <Label htmlFor="contract-value">Annual Contract Value</Label>
              <Input 
                id="contract-value"
                value={vendorData.contractValue}
                onChange={(e) => setVendorData({...vendorData, contractValue: e.target.value})}
                placeholder="$50,000"
              />
            </div>

            <Button 
              onClick={handleRiskAssessment} 
              disabled={isAssessing}
              className="w-full"
            >
              {isAssessing ? (
                <>
                  <Eye className="mr-2 h-4 w-4 animate-pulse" />
                  AI Analyzing Risk Factors...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  Run AI Risk Assessment
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Risk Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Risk Overview
              <Badge variant="secondary" className="ml-auto">
                {riskAssessment.confidence}% Confidence
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-green-600">{riskAssessment.overallRisk}%</div>
                <div className="text-lg font-semibold">{riskAssessment.riskLevel} Risk</div>
                <p className="text-sm text-muted-foreground">Overall Risk Score</p>
              </div>

              {riskAssessment.riskFactors.map((factor, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{factor.category}</span>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={factor.risk === 'Very Low' ? 'default' : factor.risk === 'Low' ? 'secondary' : 'destructive'}
                        className="text-xs"
                      >
                        {factor.risk}
                      </Badge>
                      <span className="text-sm">{factor.score}%</span>
                    </div>
                  </div>
                  <Progress value={factor.score} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {riskAssessment.aiInsights.map((insight, index) => (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${
                insight.severity === 'positive' ? 'border-green-500 bg-green-50' :
                insight.severity === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                'border-red-500 bg-red-50'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{insight.type}</Badge>
                  <span className="text-xs text-muted-foreground">{insight.confidence}% confidence</span>
                </div>
                <p className="text-sm">{insight.insight}</p>
              </div>
            ))}

            <div className="pt-4">
              <h4 className="font-semibold mb-3">AI Recommendations</h4>
              <ul className="space-y-2">
                {riskAssessment.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Zap className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Contract Optimization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              AI Contract Optimization
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-600">{riskAssessment.contractOptimization.potentialSavings}</div>
                <div className="text-sm text-muted-foreground">Potential Savings</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-lg font-bold text-blue-600">{riskAssessment.contractOptimization.riskReduction}</div>
                <div className="text-sm text-muted-foreground">Risk Reduction</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Suggested Contract Terms</h4>
              <ul className="space-y-2">
                {riskAssessment.contractOptimization.suggestedTerms.map((term, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Lock className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    {term}
                  </li>
                ))}
              </ul>
            </div>

            <Button className="w-full">
              <Clock className="mr-2 h-4 w-4" />
              Generate AI-Optimized Contract
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}