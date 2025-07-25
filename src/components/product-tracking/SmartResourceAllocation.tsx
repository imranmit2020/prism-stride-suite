import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useGlobalization } from "@/contexts/GlobalizationContext";
import { 
  Users, 
  Clock, 
  DollarSign, 
  Brain, 
  Target, 
  TrendingUp, 
  AlertTriangle,
  Zap,
  Cpu,
  Calendar,
  BarChart3,
  Lightbulb
} from "lucide-react";

interface ResourcePool {
  id: string;
  name: string;
  type: "human" | "equipment" | "budget" | "time";
  total: number;
  allocated: number;
  available: number;
  efficiency: number;
  cost: number;
  aiOptimization: {
    recommended: number;
    efficiency_gain: number;
    cost_savings: number;
    reasoning: string;
  };
  utilization: {
    current: number;
    optimal: number;
    bottlenecks: string[];
  };
  skills?: string[];
}

interface AllocationRecommendation {
  id: string;
  title: string;
  type: "reallocation" | "scaling" | "optimization" | "automation";
  priority: "high" | "medium" | "low";
  impact: {
    efficiency: number;
    cost: number;
    timeline: number;
  };
  description: string;
  implementation: {
    effort: number;
    duration: string;
    cost: number;
  };
  aiReasoning: string;
  expectedOutcome: string;
}

interface SkillGap {
  id: string;
  skill: string;
  currentLevel: number;
  requiredLevel: number;
  gap: number;
  impact: "high" | "medium" | "low";
  aiSuggestions: {
    training: string;
    hiring: string;
    outsourcing: string;
    automation: string;
  };
  cost: {
    training: number;
    hiring: number;
    outsourcing: number;
  };
}

export function SmartResourceAllocation() {
  const { formatCurrency } = useGlobalization();

  const [resourcePools] = useState<ResourcePool[]>([
    {
      id: "manufacturing",
      name: "Manufacturing Team",
      type: "human",
      total: 12,
      allocated: 9,
      available: 3,
      efficiency: 78,
      cost: 1200000,
      aiOptimization: {
        recommended: 14,
        efficiency_gain: 23,
        cost_savings: 180000,
        reasoning: "AI suggests adding 2 senior production engineers to reduce bottlenecks and enable parallel manufacturing"
      },
      utilization: {
        current: 75,
        optimal: 85,
        bottlenecks: ["Quality control delays", "Material sourcing", "Equipment maintenance"]
      },
      skills: ["Lean Manufacturing", "Quality Control", "Supply Chain", "Safety Protocols", "Process Optimization"]
    },
    {
      id: "designers",
      name: "Product Designers",
      type: "human",
      total: 4,
      allocated: 4,
      available: 0,
      efficiency: 92,
      cost: 400000,
      aiOptimization: {
        recommended: 5,
        efficiency_gain: 15,
        cost_savings: 50000,
        reasoning: "High efficiency team at capacity. Additional industrial designer would reduce product iteration time"
      },
      utilization: {
        current: 100,
        optimal: 80,
        bottlenecks: ["Consumer testing scheduling", "Stakeholder feedback cycles"]
      },
      skills: ["Industrial Design", "CAD Modeling", "Material Research", "Consumer Testing"]
    },
    {
      id: "testing_equipment",
      name: "Testing Equipment",
      type: "equipment",
      total: 25,
      allocated: 18,
      available: 7,
      efficiency: 65,
      cost: 350000,
      aiOptimization: {
        recommended: 30,
        efficiency_gain: 35,
        cost_savings: 120000,
        reasoning: "Automated testing equipment would increase throughput and reduce manual testing time"
      },
      utilization: {
        current: 72,
        optimal: 90,
        bottlenecks: ["Manual test setup", "Equipment maintenance", "Data collection inefficiencies"]
      }
    },
    {
      id: "production_budget",
      name: "Production Budget",
      type: "budget",
      total: 2000000,
      allocated: 1650000,
      available: 350000,
      efficiency: 84,
      cost: 2000000,
      aiOptimization: {
        recommended: 1900000,
        efficiency_gain: 18,
        cost_savings: 100000,
        reasoning: "Reallocate 100K from marketing to accelerate critical path production setup"
      },
      utilization: {
        current: 82.5,
        optimal: 95,
        bottlenecks: ["Vendor payment delays", "Budget approval processes"]
      }
    }
  ]);

  const [recommendations] = useState<AllocationRecommendation[]>([
    {
      id: "1",
      title: "Implement AI-Powered Quality Control",
      type: "automation",
      priority: "high",
      impact: {
        efficiency: 30,
        cost: -25,
        timeline: 15
      },
      description: "Deploy AI vision system for automated quality inspection to reduce manual inspection time and improve consistency",
      implementation: {
        effort: 2,
        duration: "4 weeks",
        cost: 45000
      },
      aiReasoning: "Analysis shows 40% of quality control time spent on visual inspection. AI automation can reduce this to 15%",
      expectedOutcome: "30% reduction in production cycle time, 25% cost savings, improved quality consistency"
    },
    {
      id: "2",
      title: "Cross-Train Manufacturing Team in Advanced Techniques",
      type: "optimization",
      priority: "high",
      impact: {
        efficiency: 45,
        cost: 10,
        timeline: 20
      },
      description: "Upskill 6 production workers in advanced manufacturing techniques to eliminate knowledge bottlenecks",
      implementation: {
        effort: 6,
        duration: "8 weeks",
        cost: 75000
      },
      aiReasoning: "Advanced manufacturing is critical path with only 2 qualified specialists. Training 6 more reduces project risk",
      expectedOutcome: "Eliminate manufacturing bottleneck, reduce production timeline by 3 weeks"
    },
    {
      id: "3",
      title: "Outsource Non-Critical Component Manufacturing",
      type: "reallocation",
      priority: "medium",
      impact: {
        efficiency: 20,
        cost: -15,
        timeline: 10
      },
      description: "Outsource standard component manufacturing to focus internal resources on core product assembly",
      implementation: {
        effort: 3,
        duration: "2 weeks",
        cost: 30000
      },
      aiReasoning: "Internal team spending 35% time on standard components. Outsourcing frees them for innovation",
      expectedOutcome: "Focus internal talent on high-value manufacturing work, 15% cost reduction"
    }
  ]);

  const [skillGaps] = useState<SkillGap[]>([
    {
      id: "1",
      skill: "Advanced Manufacturing Automation",
      currentLevel: 3,
      requiredLevel: 8,
      gap: 5,
      impact: "high",
      aiSuggestions: {
        training: "6-month automation engineering bootcamp for 3 senior manufacturing engineers",
        hiring: "Hire 2 automation engineers with 5+ years experience",
        outsourcing: "Partner with automation consulting firm for 6 months",
        automation: "Use AI-powered production monitoring systems"
      },
      cost: {
        training: 75000,
        hiring: 350000,
        outsourcing: 180000
      }
    },
    {
      id: "2",
      skill: "Sustainable Material Science",
      currentLevel: 2,
      requiredLevel: 7,
      gap: 5,
      impact: "high",
      aiSuggestions: {
        training: "Green materials certification for current product team",
        hiring: "Hire sustainable materials specialist",
        outsourcing: "Contract with eco-materials consulting agency",
        automation: "Use AI material property analysis tools"
      },
      cost: {
        training: 25000,
        hiring: 120000,
        outsourcing: 80000
      }
    },
    {
      id: "3",
      skill: "Quality Control Systems",
      currentLevel: 4,
      requiredLevel: 9,
      gap: 5,
      impact: "high",
      aiSuggestions: {
        training: "Advanced quality management certification",
        hiring: "Hire quality control specialist with manufacturing focus",
        outsourcing: "Quality audit and consulting services",
        automation: "Implement automated quality inspection systems"
      },
      cost: {
        training: 40000,
        hiring: 180000,
        outsourcing: 120000
      }
    }
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "human": return <Users className="h-4 w-4" />;
      case "equipment": return <Cpu className="h-4 w-4" />;
      case "budget": return <DollarSign className="h-4 w-4" />;
      case "time": return <Clock className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "text-red-600 bg-red-50";
      case "high": return "text-orange-600 bg-orange-50";
      case "medium": return "text-yellow-600 bg-yellow-50";
      case "low": return "text-green-600 bg-green-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "text-red-600";
      case "medium": return "text-yellow-600";
      case "low": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  const getUtilizationColor = (current: number, optimal: number) => {
    const ratio = current / optimal;
    if (ratio > 1.1) return "text-red-600";
    if (ratio < 0.8) return "text-yellow-600";
    return "text-green-600";
  };

  const totalBudget = resourcePools.reduce((acc, pool) => acc + pool.cost, 0);
  const avgEfficiency = Math.round(resourcePools.reduce((acc, pool) => acc + pool.efficiency, 0) / resourcePools.length);
  const criticalRecommendations = recommendations.filter(r => r.priority === "high").length;

  return (
    <div className="space-y-6">
      {/* Resource Overview */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-blue-700">
              <DollarSign className="h-5 w-5 mr-2" />
              Total Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{formatCurrency(totalBudget)}</div>
            <p className="text-sm text-blue-600 mt-1">Allocated Budget</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-green-700">
              <BarChart3 className="h-5 w-5 mr-2" />
              Avg Efficiency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{avgEfficiency}%</div>
            <Progress value={avgEfficiency} className="mt-2" />
            <p className="text-sm text-green-600 mt-1">Resource Utilization</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-orange-700">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Critical Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">{criticalRecommendations}</div>
            <p className="text-sm text-orange-600 mt-1">Requires Immediate Attention</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-purple-700">
              <Brain className="h-5 w-5 mr-2" />
              AI Optimizations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">
              {formatCurrency(resourcePools.reduce((acc, pool) => acc + pool.aiOptimization.cost_savings, 0))}
            </div>
            <p className="text-sm text-purple-600 mt-1">Potential Savings</p>
          </CardContent>
        </Card>
      </div>

      {/* Resource Pools */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Smart Resource Allocation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {resourcePools.map((pool) => (
            <div key={pool.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    {getTypeIcon(pool.type)}
                  </div>
                  <div>
                    <h4 className="font-semibold">{pool.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {pool.type === "budget" ? formatCurrency(pool.total) : `${pool.total} ${pool.type === "human" ? "people" : "units"}`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{pool.efficiency}%</div>
                  <p className="text-sm text-muted-foreground">Efficiency</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Current Allocation:</span>
                  <div className="flex items-center mt-1">
                    <Progress value={(pool.allocated / pool.total) * 100} className="flex-1 mr-2" />
                    <span className="text-sm font-medium">{pool.allocated}/{pool.total}</span>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Utilization:</span>
                  <div className="flex items-center mt-1">
                    <Progress value={pool.utilization.current} className="flex-1 mr-2" />
                    <span className={`text-sm font-medium ${getUtilizationColor(pool.utilization.current, pool.utilization.optimal)}`}>
                      {pool.utilization.current}%
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Cost:</span>
                  <p className="font-medium">{formatCurrency(pool.cost)}</p>
                </div>
              </div>

              <Alert className="bg-blue-50 border-blue-200">
                <Brain className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-2">
                    <div><strong>AI Optimization:</strong> {pool.aiOptimization.reasoning}</div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>Recommended: <strong>{pool.aiOptimization.recommended}</strong></div>
                      <div>Efficiency Gain: <strong className="text-green-600">+{pool.aiOptimization.efficiency_gain}%</strong></div>
                      <div>Cost Savings: <strong className="text-green-600">{formatCurrency(pool.aiOptimization.cost_savings)}</strong></div>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>

              {pool.utilization.bottlenecks.length > 0 && (
                <div className="bg-yellow-50 rounded p-3">
                  <strong className="text-yellow-900">Identified Bottlenecks:</strong>
                  <ul className="mt-1 space-y-1">
                    {pool.utilization.bottlenecks.map((bottleneck, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-yellow-800">
                        <AlertTriangle className="h-3 w-3" />
                        {bottleneck}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="h-5 w-5 mr-2" />
            AI Resource Optimization Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{rec.title}</h4>
                  <p className="text-sm text-muted-foreground">{rec.description}</p>
                </div>
                <Badge className={getPriorityColor(rec.priority)}>
                  {rec.priority.toUpperCase()}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Efficiency Impact:</span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    <span className="font-medium text-green-600">+{rec.impact.efficiency}%</span>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Cost Impact:</span>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    <span className={`font-medium ${rec.impact.cost < 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {rec.impact.cost > 0 ? '+' : ''}{rec.impact.cost}%
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Timeline Impact:</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-blue-600" />
                    <span className="font-medium text-blue-600">+{rec.impact.timeline}%</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded">
                <div>
                  <span className="text-sm text-muted-foreground">Implementation:</span>
                  <p className="text-sm font-medium">{rec.implementation.duration} • {formatCurrency(rec.implementation.cost)}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Effort Level:</span>
                  <div className="flex items-center gap-2">
                    <Progress value={rec.implementation.effort * 10} className="flex-1" />
                    <span className="text-sm">{rec.implementation.effort}/10</span>
                  </div>
                </div>
              </div>

              <Alert className="bg-purple-50 border-purple-200">
                <Brain className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-1">
                    <div><strong>AI Analysis:</strong> {rec.aiReasoning}</div>
                    <div><strong>Expected Outcome:</strong> {rec.expectedOutcome}</div>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Skill Gap Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            AI Skill Gap Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {skillGaps.map((gap) => (
            <div key={gap.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{gap.skill}</h4>
                  <p className="text-sm text-muted-foreground">Gap: {gap.gap} levels</p>
                </div>
                <Badge className={getImpactColor(gap.impact)}>
                  {gap.impact.toUpperCase()} IMPACT
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Current Level:</span>
                  <div className="flex items-center mt-1">
                    <Progress value={gap.currentLevel * 10} className="flex-1 mr-2" />
                    <span className="text-sm font-medium">{gap.currentLevel}/10</span>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Required Level:</span>
                  <div className="flex items-center mt-1">
                    <Progress value={gap.requiredLevel * 10} className="flex-1 mr-2" />
                    <span className="text-sm font-medium">{gap.requiredLevel}/10</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded p-3">
                <h5 className="font-medium text-blue-900 mb-2">AI Skill Development Options</h5>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Training:</strong> {gap.aiSuggestions.training}
                    <p className="text-blue-700">Cost: {formatCurrency(gap.cost.training)}</p>
                  </div>
                  <div>
                    <strong>Hiring:</strong> {gap.aiSuggestions.hiring}
                    <p className="text-blue-700">Cost: {formatCurrency(gap.cost.hiring)}</p>
                  </div>
                  <div>
                    <strong>Outsourcing:</strong> {gap.aiSuggestions.outsourcing}
                    <p className="text-blue-700">Cost: {formatCurrency(gap.cost.outsourcing)}</p>
                  </div>
                  <div>
                    <strong>Automation:</strong> {gap.aiSuggestions.automation}
                    <p className="text-blue-700">Reduces skill dependency</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
          <Zap className="h-4 w-4 mr-2" />
          Apply AI Recommendations
        </Button>
        <Button variant="outline" className="flex-1">
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Resource Review
        </Button>
        <Button variant="outline" className="flex-1">
          <Brain className="h-4 w-4 mr-2" />
          Generate Optimization Report
        </Button>
      </div>
    </div>
  );
}