import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, Flag, Brain, Zap, Shield, Clock } from "lucide-react";

interface CountryProfile {
  id: string;
  country: string;
  region: string;
  flag: string;
  businessComplexity: number;
  aiAdaptationScore: number;
  marketOpportunity: number;
  complianceScore: number;
  localIntelligence: number;
  timeZone: string;
  businessCulture: string[];
  keyRegulations: string[];
  paymentMethods: string[];
  aiInsights: string;
  recommendations: string[];
}

interface RegionalCompliance {
  id: string;
  region: string;
  regulation: string;
  countries: string[];
  complexity: number;
  aiAutomation: number;
  riskLevel: "low" | "medium" | "high" | "critical";
  deadline: string;
  status: "compliant" | "warning" | "action_required" | "optimized";
  aiRecommendation: string;
}

interface LocalizationStrategy {
  id: string;
  country: string;
  strategy: string;
  marketImpact: number;
  implementationTime: string;
  investmentRequired: number;
  expectedROI: number;
  aiConfidence: number;
  culturalFactors: string[];
  businessAdaptations: string[];
}

export function AICountryIntelligence() {
  const [selectedRegion, setSelectedRegion] = useState("global");
  
  const [countryProfiles] = useState<CountryProfile[]>([
    {
      id: "1",
      country: "Germany",
      region: "Europe",
      flag: "🇩🇪",
      businessComplexity: 78,
      aiAdaptationScore: 94,
      marketOpportunity: 89,
      complianceScore: 96,
      localIntelligence: 92,
      timeZone: "CET (UTC+1)",
      businessCulture: ["Precision-oriented", "Formal communication", "Long-term planning", "Quality focus"],
      keyRegulations: ["GDPR", "HGB", "Datenschutz-Grundverordnung", "Arbeitsschutzgesetz"],
      paymentMethods: ["SEPA Direct Debit", "Giropay", "Klarna", "PayPal"],
      aiInsights: "German market values precision, compliance, and engineering excellence. AI optimization shows 94% cultural adaptation potential.",
      recommendations: ["Emphasize quality certifications", "Implement GDPR-first data handling", "Focus on technical specifications"]
    },
    {
      id: "2",
      country: "Japan",
      region: "Asia Pacific",
      flag: "🇯🇵",
      businessComplexity: 92,
      aiAdaptationScore: 89,
      marketOpportunity: 95,
      complianceScore: 98,
      localIntelligence: 96,
      timeZone: "JST (UTC+9)",
      businessCulture: ["Relationship-first", "Consensus building", "Respect hierarchy", "Long-term commitment"],
      keyRegulations: ["Personal Information Protection Law", "Labor Standards Act", "Companies Act", "Invoice System"],
      paymentMethods: ["Bank Transfer", "Credit Card", "PayPay", "Line Pay"],
      aiInsights: "Japanese market requires relationship building and consensus-driven approach. Quantum cultural modeling shows 96% local intelligence.",
      recommendations: ["Build long-term partnerships", "Implement consensus protocols", "Emphasize quality and reliability"]
    },
    {
      id: "3",
      country: "Brazil",
      region: "Latin America",
      flag: "🇧🇷",
      businessComplexity: 86,
      aiAdaptationScore: 87,
      marketOpportunity: 91,
      complianceScore: 82,
      localIntelligence: 88,
      timeZone: "BRT (UTC-3)",
      businessCulture: ["Relationship-oriented", "Flexible timing", "Personal connections", "Family business values"],
      keyRegulations: ["Lei Geral de Proteção de Dados", "CLT", "Marco Civil da Internet", "Código Tributário"],
      paymentMethods: ["PIX", "Boleto Bancário", "Credit Card", "Digital Wallets"],
      aiInsights: "Brazilian market emphasizes personal relationships and flexibility. AI cultural adaptation optimized for 87% efficiency.",
      recommendations: ["Invest in relationship building", "Implement flexible payment terms", "Focus on local partnerships"]
    }
  ]);

  const [regionalCompliance] = useState<RegionalCompliance[]>([
    {
      id: "1",
      region: "European Union",
      regulation: "GDPR Compliance Framework",
      countries: ["Germany", "France", "Netherlands", "Spain", "Italy"],
      complexity: 94,
      aiAutomation: 89,
      riskLevel: "critical",
      deadline: "Ongoing",
      status: "optimized",
      aiRecommendation: "AI-powered data governance system maintaining 99.2% GDPR compliance across all EU operations"
    },
    {
      id: "2",
      region: "Asia Pacific",
      regulation: "Data Localization Requirements",
      countries: ["China", "India", "Singapore", "South Korea"],
      complexity: 87,
      aiAutomation: 76,
      riskLevel: "high",
      deadline: "December 2024",
      status: "action_required",
      aiRecommendation: "Implement quantum data residency protocols with regional server architecture optimization"
    },
    {
      id: "3",
      region: "North America",
      regulation: "Tax Reporting Harmonization",
      countries: ["United States", "Canada", "Mexico"],
      complexity: 73,
      aiAutomation: 94,
      riskLevel: "medium",
      deadline: "March 2024",
      status: "compliant",
      aiRecommendation: "Cross-border tax optimization achieving 23% efficiency improvement through AI harmonization"
    }
  ]);

  const [localizationStrategies] = useState<LocalizationStrategy[]>([
    {
      id: "1",
      country: "India",
      strategy: "Digital-First Market Entry",
      marketImpact: 156,
      implementationTime: "6-9 months",
      investmentRequired: 2.3,
      expectedROI: 340,
      aiConfidence: 92,
      culturalFactors: ["Mobile-first adoption", "Price sensitivity", "Local language preference", "Relationship importance"],
      businessAdaptations: ["UPI payment integration", "Regional language support", "Tiered pricing model", "Local partnership network"]
    },
    {
      id: "2",
      country: "Nigeria",
      strategy: "Fintech-Enabled Business Growth",
      marketImpact: 234,
      implementationTime: "4-6 months",
      investmentRequired: 1.8,
      expectedROI: 420,
      aiConfidence: 88,
      culturalFactors: ["Mobile banking dominance", "Cash-based traditions", "English proficiency", "Youth demographic"],
      businessAdaptations: ["Mobile money integration", "Offline capability", "Micro-payment options", "Local agent network"]
    },
    {
      id: "3",
      country: "Mexico",
      strategy: "Cross-Border Commerce Optimization",
      marketImpact: 189,
      implementationTime: "3-5 months",
      investmentRequired: 1.5,
      expectedROI: 280,
      aiConfidence: 91,
      culturalFactors: ["Family business focus", "Spanish language preference", "US trade integration", "Regional variations"],
      businessAdaptations: ["USMCA compliance tools", "Spanish-first interface", "Family account management", "Regional customization"]
    }
  ]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "critical": return "text-red-600";
      case "high": return "text-orange-500";
      case "medium": return "text-yellow-500";
      case "low": return "text-green-500";
      default: return "text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimized": return "text-blue-500";
      case "compliant": return "text-green-500";
      case "warning": return "text-yellow-500";
      case "action_required": return "text-red-500";
      default: return "text-muted-foreground";
    }
  };

  const totalCountries = 47;
  const avgMarketOpportunity = Math.round(countryProfiles.reduce((acc, country) => acc + country.marketOpportunity, 0) / countryProfiles.length);
  const avgComplianceScore = Math.round(countryProfiles.reduce((acc, country) => acc + country.complianceScore, 0) / countryProfiles.length);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            AI Country Intelligence
          </h2>
          <p className="text-muted-foreground">Global business optimization with country-specific AI adaptation</p>
        </div>
        <Badge variant="outline" className="px-4 py-2 border-blue-200">
          <Globe className="h-4 w-4 mr-2 text-blue-500" />
          Global AI Active
        </Badge>
      </div>

      {/* Global Overview */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-blue-700">
              <Globe className="h-5 w-5 mr-2" />
              Countries Supported
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{totalCountries}</div>
            <p className="text-sm text-blue-600 mt-1">AI-Optimized Markets</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-green-700">
              <Flag className="h-5 w-5 mr-2" />
              Market Opportunity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{avgMarketOpportunity}%</div>
            <Progress value={avgMarketOpportunity} className="mt-2" />
            <p className="text-sm text-green-600 mt-1">Average Score</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-purple-700">
              <Shield className="h-5 w-5 mr-2" />
              Compliance Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">{avgComplianceScore}%</div>
            <Progress value={avgComplianceScore} className="mt-2" />
            <p className="text-sm text-purple-600 mt-1">Global Average</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-orange-700">
              <Clock className="h-5 w-5 mr-2" />
              Time Zones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">24</div>
            <p className="text-sm text-orange-600 mt-1">Active Coverage</p>
          </CardContent>
        </Card>
      </div>

      {/* Region Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            Regional Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="global">Global Overview</SelectItem>
                <SelectItem value="europe">Europe</SelectItem>
                <SelectItem value="asia-pacific">Asia Pacific</SelectItem>
                <SelectItem value="north-america">North America</SelectItem>
                <SelectItem value="latin-america">Latin America</SelectItem>
                <SelectItem value="africa">Africa</SelectItem>
                <SelectItem value="middle-east">Middle East</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Country Profiles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Flag className="h-5 w-5 mr-2" />
            Country Intelligence Profiles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {countryProfiles.map((country) => (
            <div key={country.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{country.flag}</span>
                  <div>
                    <h4 className="font-semibold">{country.country}</h4>
                    <p className="text-sm text-muted-foreground">{country.region} • {country.timeZone}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">
                    {country.marketOpportunity}%
                  </div>
                  <p className="text-sm text-muted-foreground">Market Opportunity</p>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">AI Adaptation:</span>
                  <div className="flex items-center mt-1">
                    <Progress value={country.aiAdaptationScore} className="flex-1 mr-2" />
                    <span className="font-medium">{country.aiAdaptationScore}%</span>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Compliance:</span>
                  <div className="flex items-center mt-1">
                    <Progress value={country.complianceScore} className="flex-1 mr-2" />
                    <span className="font-medium">{country.complianceScore}%</span>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Local Intelligence:</span>
                  <div className="flex items-center mt-1">
                    <Progress value={country.localIntelligence} className="flex-1 mr-2" />
                    <span className="font-medium">{country.localIntelligence}%</span>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Business Complexity:</span>
                  <div className="flex items-center mt-1">
                    <Progress value={country.businessComplexity} className="flex-1 mr-2" />
                    <span className="font-medium">{country.businessComplexity}%</span>
                  </div>
                </div>
              </div>

              <Alert>
                <Brain className="h-4 w-4" />
                <AlertDescription>
                  <strong>AI Insights:</strong> {country.aiInsights}
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="bg-gray-50 rounded p-3">
                  <div className="mb-2"><strong>Business Culture:</strong></div>
                  <div className="flex flex-wrap gap-1">
                    {country.businessCulture.map((culture, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {culture}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 rounded p-3">
                  <div className="mb-2"><strong>Payment Methods:</strong></div>
                  <div className="flex flex-wrap gap-1">
                    {country.paymentMethods.map((method, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-green-50">
                        {method}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Regional Compliance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Regional Compliance Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {regionalCompliance.map((compliance) => (
            <div key={compliance.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{compliance.region}</h4>
                  <p className="text-sm text-muted-foreground">{compliance.regulation}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className={`${getStatusColor(compliance.status)} ${getRiskColor(compliance.riskLevel)}`}>
                    {compliance.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    Deadline: {compliance.deadline}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Complexity:</span>
                  <div className="flex items-center mt-1">
                    <Progress value={compliance.complexity} className="flex-1 mr-2" />
                    <span className="font-medium">{compliance.complexity}%</span>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">AI Automation:</span>
                  <div className="flex items-center mt-1">
                    <Progress value={compliance.aiAutomation} className="flex-1 mr-2" />
                    <span className="font-medium">{compliance.aiAutomation}%</span>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Countries:</span>
                  <p className="font-medium">{compliance.countries.length} markets</p>
                </div>
              </div>

              <Alert>
                <Zap className="h-4 w-4" />
                <AlertDescription>
                  <strong>AI Recommendation:</strong> {compliance.aiRecommendation}
                </AlertDescription>
              </Alert>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Localization Strategies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            AI Localization Strategies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {localizationStrategies.map((strategy) => (
            <div key={strategy.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{strategy.country} • {strategy.strategy}</h4>
                  <p className="text-sm text-muted-foreground">
                    Implementation: {strategy.implementationTime} • Investment: ${strategy.investmentRequired}M
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">
                    {strategy.expectedROI}% ROI
                  </div>
                  <p className="text-sm text-muted-foreground">+{strategy.marketImpact}% Impact</p>
                </div>
              </div>
              
              <div className="flex items-center mb-2">
                <span className="text-sm text-muted-foreground mr-2">AI Confidence:</span>
                <Progress value={strategy.aiConfidence} className="flex-1 mr-2" />
                <span className="text-sm font-medium">{strategy.aiConfidence}%</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="bg-blue-50 rounded p-3">
                  <div className="mb-2"><strong>Cultural Factors:</strong></div>
                  <div className="flex flex-wrap gap-1">
                    {strategy.culturalFactors.map((factor, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="bg-green-50 rounded p-3">
                  <div className="mb-2"><strong>Business Adaptations:</strong></div>
                  <div className="flex flex-wrap gap-1">
                    {strategy.businessAdaptations.map((adaptation, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-green-100">
                        {adaptation}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AI Actions */}
      <div className="flex gap-4">
        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
          <Globe className="h-4 w-4 mr-2" />
          Activate Global Intelligence
        </Button>
        <Button variant="outline" className="flex-1">
          <Flag className="h-4 w-4 mr-2" />
          Deploy Country Strategies
        </Button>
        <Button variant="outline" className="flex-1">
          <Zap className="h-4 w-4 mr-2" />
          Auto-Optimize All Markets
        </Button>
      </div>
    </div>
  );
}