import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useGlobalization } from "@/contexts/GlobalizationContext";
import { 
  Lightbulb, 
  Palette, 
  Factory, 
  TestTube, 
  Package, 
  Truck, 
  Store, 
  Users, 
  RefreshCw, 
  Archive,
  Brain,
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  ShoppingCart,
  Target
} from "lucide-react";

interface LifecyclePhase {
  id: string;
  name: string;
  icon: any;
  status: "completed" | "in-progress" | "pending" | "at-risk";
  progress: number;
  startDate: string;
  estimatedCompletion: string;
  actualCompletion?: string;
  aiPredictions: {
    riskScore: number;
    successProbability: number;
    resourceOptimization: string;
    timelinePrediction: string;
  };
  tasks: {
    id: string;
    name: string;
    status: "completed" | "in-progress" | "pending";
    aiRecommendation: string;
  }[];
  budget: {
    allocated: number;
    spent: number;
    predicted: number;
  };
  kpis: {
    name: string;
    current: number;
    target: number;
    aiInsight: string;
  }[];
}

export function ProductLifecycleTracker() {
  const { formatCurrency } = useGlobalization();
  
  const [product] = useState({
    name: "EcoSmart Water Bottle",
    version: "Pro Series",
    category: "Consumer Goods",
    launchTarget: "Q2 2024"
  });

  const [lifecyclePhases] = useState<LifecyclePhase[]>([
    {
      id: "concept",
      name: "Market Research & Concept",
      icon: Lightbulb,
      status: "completed",
      progress: 100,
      startDate: "2023-01-15",
      estimatedCompletion: "2023-02-28",
      actualCompletion: "2023-02-25",
      aiPredictions: {
        riskScore: 15,
        successProbability: 92,
        resourceOptimization: "Market research shows 92% consumer interest in sustainable drinkware",
        timelinePrediction: "Completed 3 days ahead of schedule"
      },
      tasks: [
        { id: "1", name: "Consumer Survey & Focus Groups", status: "completed", aiRecommendation: "92% positive response to sustainable features" },
        { id: "2", name: "Competitive Market Analysis", status: "completed", aiRecommendation: "Premium pricing strategy validated for eco-friendly segment" },
        { id: "3", name: "Product Feature Definition", status: "completed", aiRecommendation: "Temperature retention and leak-proof design prioritized" }
      ],
      budget: { allocated: 50000, spent: 47500, predicted: 47500 },
      kpis: [
        { name: "Market Validation Score", current: 92, target: 80, aiInsight: "Strong consumer demand in eco-conscious segment" },
        { name: "Concept Approval Rating", current: 94, target: 85, aiInsight: "Exceeded stakeholder expectations" }
      ]
    },
    {
      id: "design",
      name: "Product Design & Development",
      icon: Palette,
      status: "completed",
      progress: 100,
      startDate: "2023-03-01",
      estimatedCompletion: "2023-05-15",
      actualCompletion: "2023-05-10",
      aiPredictions: {
        riskScore: 20,
        successProbability: 89,
        resourceOptimization: "Material selection optimized for sustainability and durability",
        timelinePrediction: "Design iterations completed efficiently with AI-assisted modeling"
      },
      tasks: [
        { id: "4", name: "Industrial Design", status: "completed", aiRecommendation: "Ergonomic design rated 91% user satisfaction" },
        { id: "5", name: "Material Selection", status: "completed", aiRecommendation: "Recycled stainless steel reduces costs by 15%" },
        { id: "6", name: "Prototype Development", status: "completed", aiRecommendation: "3D printing reduced prototype costs by 40%" }
      ],
      budget: { allocated: 120000, spent: 115000, predicted: 115000 },
      kpis: [
        { name: "Design Satisfaction", current: 91, target: 85, aiInsight: "Aesthetic appeal exceeds market standards" },
        { name: "Material Cost Optimization", current: 15, target: 10, aiInsight: "Sustainable materials within budget" }
      ]
    },
    {
      id: "manufacturing",
      name: "Manufacturing Setup & Production",
      icon: Factory,
      status: "in-progress",
      progress: 75,
      startDate: "2023-05-16",
      estimatedCompletion: "2023-09-30",
      aiPredictions: {
        riskScore: 35,
        successProbability: 82,
        resourceOptimization: "AI suggests optimizing assembly line for 20% efficiency gain",
        timelinePrediction: "On track for production start with current resources"
      },
      tasks: [
        { id: "7", name: "Supplier Partnership", status: "completed", aiRecommendation: "Sustainable material suppliers secured" },
        { id: "8", name: "Production Line Setup", status: "in-progress", aiRecommendation: "Lean manufacturing principles implemented" },
        { id: "9", name: "Quality Control Systems", status: "in-progress", aiRecommendation: "Automated inspection reduces defects by 85%" },
        { id: "10", name: "Initial Production Run", status: "pending", aiRecommendation: "Pilot batch of 1000 units recommended" }
      ],
      budget: { allocated: 350000, spent: 245000, predicted: 365000 },
      kpis: [
        { name: "Production Efficiency", current: 78, target: 80, aiInsight: "Close to target efficiency rating" },
        { name: "Quality Score", current: 92, target: 95, aiInsight: "Quality metrics on track for target" }
      ]
    },
    {
      id: "testing",
      name: "Quality Testing & Certification",
      icon: TestTube,
      status: "pending",
      progress: 0,
      startDate: "2023-10-01",
      estimatedCompletion: "2023-11-30",
      aiPredictions: {
        riskScore: 25,
        successProbability: 87,
        resourceOptimization: "FDA compliance testing scheduled with 95% approval probability",
        timelinePrediction: "Parallel testing will maintain launch timeline"
      },
      tasks: [
        { id: "11", name: "Safety & Durability Testing", status: "pending", aiRecommendation: "Drop tests and stress tests scheduled" },
        { id: "12", name: "FDA Food Contact Approval", status: "pending", aiRecommendation: "All materials pre-approved for food contact" },
        { id: "13", name: "Consumer Beta Testing", status: "pending", aiRecommendation: "500 beta testers recruited for feedback" }
      ],
      budget: { allocated: 80000, spent: 0, predicted: 75000 },
      kpis: [
        { name: "Safety Compliance", current: 0, target: 100, aiInsight: "Materials exceed FDA safety standards" },
        { name: "Durability Score", current: 0, target: 95, aiInsight: "Predicted 98% durability rating" }
      ]
    },
    {
      id: "launch",
      name: "Market Launch & Distribution",
      icon: Store,
      status: "pending",
      progress: 0,
      startDate: "2023-12-01",
      estimatedCompletion: "2024-02-15",
      aiPredictions: {
        riskScore: 30,
        successProbability: 85,
        resourceOptimization: "Multi-channel launch strategy optimized for 85% market penetration",
        timelinePrediction: "Holiday season launch timing optimal for sales"
      },
      tasks: [
        { id: "14", name: "Retail Partnership", status: "pending", aiRecommendation: "Target stores with eco-conscious customer base" },
        { id: "15", name: "Marketing Campaign", status: "pending", aiRecommendation: "Sustainability messaging resonates with 92% of audience" },
        { id: "16", name: "E-commerce Setup", status: "pending", aiRecommendation: "Direct-to-consumer channel predicted 40% of sales" }
      ],
      budget: { allocated: 500000, spent: 0, predicted: 440000 },
      kpis: [
        { name: "Market Penetration", current: 0, target: 15, aiInsight: "Premium eco-segment shows 18% potential" },
        { name: "Customer Acquisition", current: 0, target: 10000, aiInsight: "Launch campaign targets 12,000 customers" }
      ]
    },
    {
      id: "growth",
      name: "Post-Launch Growth & Optimization",
      icon: TrendingUp,
      status: "pending",
      progress: 0,
      startDate: "2024-03-01",
      estimatedCompletion: "2024-08-31",
      aiPredictions: {
        riskScore: 20,
        successProbability: 88,
        resourceOptimization: "Customer feedback loop enables 25% faster product improvements",
        timelinePrediction: "Steady growth trajectory with seasonal peaks"
      },
      tasks: [
        { id: "17", name: "Customer Feedback Analysis", status: "pending", aiRecommendation: "AI sentiment analysis for continuous improvement" },
        { id: "18", name: "Product Line Extension", status: "pending", aiRecommendation: "Accessories and variants based on usage data" },
        { id: "19", name: "International Expansion", status: "pending", aiRecommendation: "European market shows 78% interest rate" }
      ],
      budget: { allocated: 300000, spent: 0, predicted: 280000 },
      kpis: [
        { name: "Customer Retention", current: 0, target: 85, aiInsight: "Loyalty program can increase retention to 90%" },
        { name: "Revenue Growth", current: 0, target: 150, aiInsight: "Premium positioning supports 175% target" }
      ]
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in-progress": return <Clock className="h-4 w-4 text-blue-500" />;
      case "at-risk": return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-600 bg-green-50";
      case "in-progress": return "text-blue-600 bg-blue-50";
      case "at-risk": return "text-yellow-600 bg-yellow-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getRiskColor = (risk: number) => {
    if (risk < 25) return "text-green-600";
    if (risk < 50) return "text-yellow-600";
    return "text-red-600";
  };

  const totalBudget = lifecyclePhases.reduce((acc, phase) => acc + phase.budget.allocated, 0);
  const totalSpent = lifecyclePhases.reduce((acc, phase) => acc + phase.budget.spent, 0);
  const totalPredicted = lifecyclePhases.reduce((acc, phase) => acc + phase.budget.predicted, 0);
  const overallProgress = Math.round(lifecyclePhases.reduce((acc, phase) => acc + phase.progress, 0) / lifecyclePhases.length);

  return (
    <div className="space-y-6">
      {/* Product Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Inventory Lifecycle: {product.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{overallProgress}%</div>
              <p className="text-sm text-muted-foreground">Overall Progress</p>
              <Progress value={overallProgress} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{formatCurrency(totalSpent)}</div>
              <p className="text-sm text-muted-foreground">Spent / {formatCurrency(totalBudget)}</p>
              <Progress value={(totalSpent / totalBudget) * 100} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{product.launchTarget}</div>
              <p className="text-sm text-muted-foreground">Target Launch</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{formatCurrency(totalPredicted - totalBudget)}</div>
              <p className="text-sm text-muted-foreground">Budget Variance</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lifecycle Phases */}
      <div className="space-y-6">
        {lifecyclePhases.map((phase, index) => {
          const PhaseIcon = phase.icon;
          return (
            <Card key={phase.id} className="relative">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <PhaseIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {phase.name}
                        {getStatusIcon(phase.status)}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {phase.startDate} → {phase.actualCompletion || phase.estimatedCompletion}
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(phase.status)}>
                    {phase.status.replace("-", " ").toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Progress and AI Predictions */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Phase Progress</span>
                      <span className="text-sm text-muted-foreground">{phase.progress}%</span>
                    </div>
                    <Progress value={phase.progress} className="mb-4" />
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Risk Score:</span>
                        <span className={`text-sm font-medium ${getRiskColor(phase.aiPredictions.riskScore)}`}>
                          {phase.aiPredictions.riskScore}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Success Probability:</span>
                        <span className="text-sm font-medium text-green-600">
                          {phase.aiPredictions.successProbability}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">AI Resource Optimization</span>
                      </div>
                      <p className="text-xs text-blue-800">{phase.aiPredictions.resourceOptimization}</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-900">Timeline Prediction</span>
                      </div>
                      <p className="text-xs text-purple-800">{phase.aiPredictions.timelinePrediction}</p>
                    </div>
                  </div>
                </div>

                {/* Budget Tracking */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold">{formatCurrency(phase.budget.allocated)}</div>
                    <p className="text-xs text-muted-foreground">Allocated</p>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{formatCurrency(phase.budget.spent)}</div>
                    <p className="text-xs text-muted-foreground">Spent</p>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{formatCurrency(phase.budget.predicted)}</div>
                    <p className="text-xs text-muted-foreground">Predicted</p>
                  </div>
                </div>

                {/* Tasks */}
                <div>
                  <h4 className="font-medium mb-3">Phase Tasks</h4>
                  <div className="space-y-2">
                    {phase.tasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(task.status)}
                          <span className="text-sm">{task.name}</span>
                        </div>
                        <div className="text-xs text-muted-foreground max-w-xs">
                          {task.aiRecommendation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* KPIs */}
                <div>
                  <h4 className="font-medium mb-3">Key Performance Indicators</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {phase.kpis.map((kpi, kpiIndex) => (
                      <div key={kpiIndex} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{kpi.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {kpi.current}/{kpi.target}
                          </span>
                        </div>
                        <Progress value={(kpi.current / kpi.target) * 100} className="mb-2" />
                        <p className="text-xs text-muted-foreground">{kpi.aiInsight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}