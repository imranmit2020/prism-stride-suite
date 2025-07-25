import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useGlobalization } from "@/contexts/GlobalizationContext";
import { 
  Truck, 
  Factory, 
  MapPin, 
  AlertTriangle, 
  Zap, 
  Brain,
  Globe,
  Clock,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Shield,
  Target,
  Network,
  Radar
} from "lucide-react";

interface SupplyNode {
  id: string;
  name: string;
  type: "supplier" | "manufacturer" | "warehouse" | "distributor" | "retailer";
  location: string;
  country: string;
  status: "operational" | "at_risk" | "disrupted" | "optimizing";
  riskScore: number;
  capacity: number;
  utilization: number;
  leadTime: number;
  cost: number;
  aiPredictions: {
    disruptionProbability: number;
    optimalCapacity: number;
    riskFactors: string[];
    recommendations: string;
  };
  dependencies: string[];
  alternativeNodes: string[];
}

interface DisruptionAlert {
  id: string;
  type: "weather" | "political" | "economic" | "logistics" | "quality" | "cyber";
  severity: "low" | "medium" | "high" | "critical";
  location: string;
  impact: {
    affectedNodes: string[];
    estimatedDelay: number;
    costImpact: number;
    confidenceLevel: number;
  };
  aiMitigation: {
    alternativeRoutes: string[];
    bufferRecommendation: number;
    urgency: "immediate" | "within_24h" | "within_week";
  };
  timeline: string;
  description: string;
}

interface OptimizationOpportunity {
  id: string;
  title: string;
  type: "cost" | "speed" | "quality" | "resilience";
  currentMetric: number;
  optimizedMetric: number;
  improvement: number;
  cost: number;
  timeToImplement: string;
  aiAnalysis: string;
  riskLevel: "low" | "medium" | "high";
  dependencies: string[];
}

interface GeopoliticalRisk {
  region: string;
  riskLevel: number;
  factors: string[];
  impact: string;
  mitigation: string;
  timeline: string;
}

export function SupplyChainOracle() {
  const { formatCurrency } = useGlobalization();

  const [supplyNodes] = useState<SupplyNode[]>([
    {
      id: "supplier_1",
      name: "TechComponents Ltd",
      type: "supplier",
      location: "Shenzhen, China",
      country: "China",
      status: "operational",
      riskScore: 34,
      capacity: 10000,
      utilization: 78,
      leadTime: 14,
      cost: 2.5,
      aiPredictions: {
        disruptionProbability: 15,
        optimalCapacity: 11500,
        riskFactors: ["Seasonal demand fluctuation", "Port congestion risk"],
        recommendations: "Increase capacity by 15% to handle peak demand"
      },
      dependencies: ["raw_materials_asia", "shipping_pacific"],
      alternativeNodes: ["supplier_2", "supplier_backup_eu"]
    },
    {
      id: "manufacturer_1",
      name: "SmartTech Manufacturing",
      type: "manufacturer",
      location: "Austin, Texas",
      country: "USA",
      status: "optimizing",
      riskScore: 12,
      capacity: 5000,
      utilization: 92,
      leadTime: 7,
      cost: 15.8,
      aiPredictions: {
        disruptionProbability: 8,
        optimalCapacity: 5500,
        riskFactors: ["High utilization", "Single point of failure"],
        recommendations: "Add secondary production line to reduce bottleneck risk"
      },
      dependencies: ["supplier_1", "local_labor", "power_grid_texas"],
      alternativeNodes: ["manufacturer_backup_mexico"]
    },
    {
      id: "warehouse_1",
      name: "Global Distribution Hub",
      type: "warehouse",
      location: "Memphis, Tennessee",
      country: "USA",
      status: "at_risk",
      riskScore: 67,
      capacity: 50000,
      utilization: 89,
      leadTime: 2,
      cost: 0.8,
      aiPredictions: {
        disruptionProbability: 45,
        optimalCapacity: 60000,
        riskFactors: ["Weather vulnerability", "High utilization", "Labor shortage"],
        recommendations: "Urgent: Establish backup warehouse in Atlanta within 30 days"
      },
      dependencies: ["manufacturer_1", "transportation_network"],
      alternativeNodes: ["warehouse_atlanta", "warehouse_dallas"]
    }
  ]);

  const [disruptionAlerts] = useState<DisruptionAlert[]>([
    {
      id: "1",
      type: "weather",
      severity: "high",
      location: "South China Sea",
      impact: {
        affectedNodes: ["supplier_1", "shipping_pacific"],
        estimatedDelay: 5,
        costImpact: 125000,
        confidenceLevel: 87
      },
      aiMitigation: {
        alternativeRoutes: ["Via Singapore Hub", "Air freight acceleration"],
        bufferRecommendation: 30,
        urgency: "within_24h"
      },
      timeline: "Typhoon expected in 48-72 hours",
      description: "Category 3 typhoon approaching major shipping lanes, 87% probability of 5-day port closure"
    },
    {
      id: "2",
      type: "cyber",
      severity: "medium",
      location: "Global",
      impact: {
        affectedNodes: ["all_digital_systems"],
        estimatedDelay: 2,
        costImpact: 45000,
        confidenceLevel: 73
      },
      aiMitigation: {
        alternativeRoutes: ["Manual backup processes", "Isolated network segments"],
        bufferRecommendation: 14,
        urgency: "immediate"
      },
      timeline: "Ransomware campaign targeting logistics industry",
      description: "AI detects 73% increase in supply chain cyber attacks this week"
    },
    {
      id: "3",
      type: "economic",
      severity: "medium",
      location: "European Union",
      impact: {
        affectedNodes: ["supplier_backup_eu"],
        estimatedDelay: 0,
        costImpact: 89000,
        confidenceLevel: 91
      },
      aiMitigation: {
        alternativeRoutes: ["Increase Asia supplier allocation"],
        bufferRecommendation: 21,
        urgency: "within_week"
      },
      timeline: "Trade regulation changes effective next month",
      description: "New EU regulations will increase component costs by 15-20%"
    }
  ]);

  const [optimizationOpportunities] = useState<OptimizationOpportunity[]>([
    {
      id: "1",
      title: "AI-Powered Demand Forecasting",
      type: "cost",
      currentMetric: 23,
      optimizedMetric: 8,
      improvement: 65,
      cost: 180000,
      timeToImplement: "3 months",
      aiAnalysis: "Machine learning models can reduce inventory holding costs by predicting demand with 94% accuracy",
      riskLevel: "low",
      dependencies: ["data_integration", "ml_platform"]
    },
    {
      id: "2", 
      title: "Quantum Route Optimization",
      type: "speed",
      currentMetric: 14,
      optimizedMetric: 9,
      improvement: 36,
      cost: 320000,
      timeToImplement: "6 months",
      aiAnalysis: "Quantum computing algorithms can optimize delivery routes in real-time, reducing lead times",
      riskLevel: "medium",
      dependencies: ["quantum_cloud_access", "api_integration"]
    },
    {
      id: "3",
      title: "Predictive Quality Control",
      type: "quality",
      currentMetric: 96.2,
      optimizedMetric: 99.1,
      improvement: 3,
      cost: 95000,
      timeToImplement: "2 months",
      aiAnalysis: "Computer vision and IoT sensors can predict quality issues before they occur",
      riskLevel: "low",
      dependencies: ["iot_sensors", "computer_vision_platform"]
    }
  ]);

  const [geopoliticalRisks] = useState<GeopoliticalRisk[]>([
    {
      region: "Asia-Pacific",
      riskLevel: 42,
      factors: ["Trade tensions", "Currency fluctuation", "Regional disputes"],
      impact: "Potential 15-30% cost increase on electronic components",
      mitigation: "Diversify supplier base across multiple countries",
      timeline: "Elevated risk for next 6-12 months"
    },
    {
      region: "Eastern Europe",
      riskLevel: 68,
      factors: ["Ongoing conflict", "Energy crisis", "Supply disruptions"],
      impact: "Complete disruption of alternative supplier routes",
      mitigation: "Eliminate dependency on region, activate backup suppliers",
      timeline: "Immediate risk - ongoing indefinitely"
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational": return <Shield className="h-4 w-4 text-green-500" />;
      case "at_risk": return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "disrupted": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "optimizing": return <Zap className="h-4 w-4 text-blue-500" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational": return "text-green-600 bg-green-50";
      case "at_risk": return "text-yellow-600 bg-yellow-50";
      case "disrupted": return "text-red-600 bg-red-50";
      case "optimizing": return "text-blue-600 bg-blue-50";
      default: return "text-gray-600 bg-gray-50";
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

  const getRiskColor = (risk: number) => {
    if (risk < 25) return "text-green-600";
    if (risk < 50) return "text-yellow-600";
    if (risk < 75) return "text-orange-600";
    return "text-red-600";
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "supplier": return <Factory className="h-4 w-4" />;
      case "manufacturer": return <Factory className="h-4 w-4" />;
      case "warehouse": return <Truck className="h-4 w-4" />;
      case "distributor": return <Network className="h-4 w-4" />;
      case "retailer": return <MapPin className="h-4 w-4" />;
      default: return <Globe className="h-4 w-4" />;
    }
  };

  const avgRiskScore = Math.round(supplyNodes.reduce((acc, node) => acc + node.riskScore, 0) / supplyNodes.length);
  const criticalAlerts = disruptionAlerts.filter(alert => alert.severity === "critical" || alert.severity === "high").length;
  const totalCostImpact = disruptionAlerts.reduce((acc, alert) => acc + alert.impact.costImpact, 0);

  return (
    <div className="space-y-6">
      {/* Supply Chain Overview */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-blue-700">
              <Network className="h-5 w-5 mr-2" />
              Network Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{100 - avgRiskScore}%</div>
            <Progress value={100 - avgRiskScore} className="mt-2" />
            <p className="text-sm text-blue-600 mt-1">Overall Stability</p>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-red-700">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">{criticalAlerts}</div>
            <p className="text-sm text-red-600 mt-1">Critical/High Priority</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-purple-700">
              <DollarSign className="h-5 w-5 mr-2" />
              Risk Exposure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">{formatCurrency(totalCostImpact)}</div>
            <p className="text-sm text-purple-600 mt-1">Potential Cost Impact</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-green-700">
              <Target className="h-5 w-5 mr-2" />
              Optimizations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{optimizationOpportunities.length}</div>
            <p className="text-sm text-green-600 mt-1">AI Opportunities</p>
          </CardContent>
        </Card>
      </div>

      {/* Supply Chain Network */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            AI Supply Chain Network Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {supplyNodes.map((node) => (
            <div key={node.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    {getTypeIcon(node.type)}
                  </div>
                  <div>
                    <h4 className="font-semibold">{node.name}</h4>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {node.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(node.status)}>
                    {getStatusIcon(node.status)}
                    <span className="ml-1">{node.status.replace("_", " ").toUpperCase()}</span>
                  </Badge>
                  <Badge variant="outline" className={getRiskColor(node.riskScore)}>
                    Risk: {node.riskScore}%
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Capacity Utilization:</span>
                  <div className="flex items-center mt-1">
                    <Progress value={node.utilization} className="flex-1 mr-2" />
                    <span className="font-medium">{node.utilization}%</span>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Lead Time:</span>
                  <p className="font-medium">{node.leadTime} days</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Unit Cost:</span>
                  <p className="font-medium">{formatCurrency(node.cost)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Disruption Risk:</span>
                  <p className={`font-medium ${getRiskColor(node.aiPredictions.disruptionProbability)}`}>
                    {node.aiPredictions.disruptionProbability}%
                  </p>
                </div>
              </div>

              <Alert className="bg-blue-50 border-blue-200">
                <Brain className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-1">
                    <div><strong>AI Recommendation:</strong> {node.aiPredictions.recommendations}</div>
                    <div><strong>Risk Factors:</strong> {node.aiPredictions.riskFactors.join(", ")}</div>
                  </div>
                </AlertDescription>
              </Alert>

              <div className="bg-gray-50 rounded p-3 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <strong>Dependencies:</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {node.dependencies.map((dep, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {dep.replace("_", " ")}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <strong>Alternative Nodes:</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {node.alternativeNodes.map((alt, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-green-50">
                          {alt.replace("_", " ")}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Disruption Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            AI Disruption Early Warning System
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {disruptionAlerts.map((alert) => (
            <div key={alert.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{alert.type.replace("_", " ").toUpperCase()} Alert</h4>
                  <p className="text-sm text-muted-foreground">{alert.location}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getSeverityColor(alert.severity)}>
                    {alert.severity.toUpperCase()}
                  </Badge>
                  <Badge variant="outline" className="text-red-600">
                    {alert.aiMitigation.urgency.replace("_", " ").toUpperCase()}
                  </Badge>
                </div>
              </div>

              <p className="text-sm">{alert.description}</p>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Estimated Delay:</span>
                  <p className="font-medium">{alert.impact.estimatedDelay} days</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Cost Impact:</span>
                  <p className="font-medium text-red-600">{formatCurrency(alert.impact.costImpact)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">AI Confidence:</span>
                  <p className="font-medium">{alert.impact.confidenceLevel}%</p>
                </div>
              </div>

              <Alert className="bg-yellow-50 border-yellow-200">
                <Radar className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-2">
                    <div><strong>AI Mitigation Strategy:</strong></div>
                    <div><strong>Alternative Routes:</strong> {alert.aiMitigation.alternativeRoutes.join(", ")}</div>
                    <div><strong>Buffer Recommendation:</strong> Increase inventory by {alert.aiMitigation.bufferRecommendation} days</div>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Optimization Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            AI Optimization Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {optimizationOpportunities.map((opp) => (
            <div key={opp.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{opp.title}</h4>
                  <p className="text-sm text-muted-foreground capitalize">{opp.type} optimization</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">
                    {opp.improvement}% improvement
                  </div>
                  <p className="text-sm text-muted-foreground">{opp.timeToImplement}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Current:</span>
                  <p className="font-medium">{opp.currentMetric}{opp.type === "cost" || opp.type === "speed" ? " days" : "%"}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Optimized:</span>
                  <p className="font-medium text-green-600">{opp.optimizedMetric}{opp.type === "cost" || opp.type === "speed" ? " days" : "%"}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Investment:</span>
                  <p className="font-medium">{formatCurrency(opp.cost)}</p>
                </div>
              </div>

              <Alert className="bg-purple-50 border-purple-200">
                <Brain className="h-4 w-4" />
                <AlertDescription>
                  <strong>AI Analysis:</strong> {opp.aiAnalysis}
                </AlertDescription>
              </Alert>

              <div className="bg-gray-50 rounded p-3 text-xs">
                <strong>Dependencies:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                  {opp.dependencies.map((dep, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {dep.replace("_", " ")}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Geopolitical Risk Monitor */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            AI Geopolitical Risk Monitor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {geopoliticalRisks.map((risk, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{risk.region}</h4>
                <Badge 
                  variant="outline" 
                  className={getRiskColor(risk.riskLevel)}
                >
                  Risk: {risk.riskLevel}%
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Risk Factors:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {risk.factors.map((factor, factorIndex) => (
                      <Badge key={factorIndex} variant="outline" className="text-xs">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Timeline:</span>
                  <p className="font-medium">{risk.timeline}</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div><strong>Impact:</strong> {risk.impact}</div>
                <div><strong>AI Mitigation:</strong> {risk.mitigation}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AI Actions */}
      <div className="flex gap-4">
        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
          <Brain className="h-4 w-4 mr-2" />
          Activate AI Oracle
        </Button>
        <Button variant="outline" className="flex-1">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Emergency Protocols
        </Button>
        <Button variant="outline" className="flex-1">
          <Zap className="h-4 w-4 mr-2" />
          Optimize Network
        </Button>
      </div>
    </div>
  );
}