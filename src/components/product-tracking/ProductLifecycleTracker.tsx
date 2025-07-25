import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useGlobalization } from "@/contexts/GlobalizationContext";
import { 
  Lightbulb, 
  Palette, 
  Code, 
  TestTube, 
  Factory, 
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
  Clock
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
    name: "Smart Home Hub Pro",
    version: "2.0",
    category: "IoT Device",
    launchTarget: "Q2 2024"
  });

  const [lifecyclePhases] = useState<LifecyclePhase[]>([
    {
      id: "concept",
      name: "Concept & Ideation",
      icon: Lightbulb,
      status: "completed",
      progress: 100,
      startDate: "2023-01-15",
      estimatedCompletion: "2023-02-28",
      actualCompletion: "2023-02-25",
      aiPredictions: {
        riskScore: 15,
        successProbability: 92,
        resourceOptimization: "Excellent market research phase with 92% validation score",
        timelinePrediction: "Completed 3 days ahead of schedule"
      },
      tasks: [
        { id: "1", name: "Market Research", status: "completed", aiRecommendation: "Market demand validated at 87% confidence" },
        { id: "2", name: "Competitive Analysis", status: "completed", aiRecommendation: "Identified 3 key differentiators" },
        { id: "3", name: "Feature Definition", status: "completed", aiRecommendation: "AI suggests focusing on voice integration" }
      ],
      budget: { allocated: 50000, spent: 47500, predicted: 47500 },
      kpis: [
        { name: "Market Validation Score", current: 87, target: 80, aiInsight: "Exceeded target by 7%" },
        { name: "Concept Approval Rating", current: 94, target: 85, aiInsight: "Strong stakeholder buy-in" }
      ]
    },
    {
      id: "design",
      name: "Design & Prototyping",
      icon: Palette,
      status: "completed",
      progress: 100,
      startDate: "2023-03-01",
      estimatedCompletion: "2023-05-15",
      actualCompletion: "2023-05-10",
      aiPredictions: {
        riskScore: 20,
        successProbability: 89,
        resourceOptimization: "Design iterations optimal, user testing exceeded expectations",
        timelinePrediction: "Completed 5 days early due to AI-optimized prototyping"
      },
      tasks: [
        { id: "4", name: "UI/UX Design", status: "completed", aiRecommendation: "User satisfaction score: 91%" },
        { id: "5", name: "Hardware Design", status: "completed", aiRecommendation: "Cost optimization achieved 15% savings" },
        { id: "6", name: "Prototype Testing", status: "completed", aiRecommendation: "3 iterations led to optimal design" }
      ],
      budget: { allocated: 120000, spent: 115000, predicted: 115000 },
      kpis: [
        { name: "User Satisfaction", current: 91, target: 85, aiInsight: "Design resonates well with target audience" },
        { name: "Cost Optimization", current: 15, target: 10, aiInsight: "Exceeded cost reduction target" }
      ]
    },
    {
      id: "development",
      name: "Development & Engineering",
      icon: Code,
      status: "in-progress",
      progress: 75,
      startDate: "2023-05-16",
      estimatedCompletion: "2023-09-30",
      aiPredictions: {
        riskScore: 35,
        successProbability: 82,
        resourceOptimization: "AI suggests adding 2 senior developers to maintain timeline",
        timelinePrediction: "May delay by 2 weeks without resource adjustment"
      },
      tasks: [
        { id: "7", name: "Frontend Development", status: "completed", aiRecommendation: "Performance optimization completed" },
        { id: "8", name: "Backend API", status: "in-progress", aiRecommendation: "Consider microservices architecture" },
        { id: "9", name: "Mobile App", status: "in-progress", aiRecommendation: "Cross-platform development recommended" },
        { id: "10", name: "IoT Integration", status: "pending", aiRecommendation: "Security protocols need early implementation" }
      ],
      budget: { allocated: 350000, spent: 245000, predicted: 365000 },
      kpis: [
        { name: "Code Quality Score", current: 88, target: 90, aiInsight: "Close to target, implement automated testing" },
        { name: "Feature Completion", current: 75, target: 80, aiInsight: "On track with current velocity" }
      ]
    },
    {
      id: "testing",
      name: "Testing & QA",
      icon: TestTube,
      status: "pending",
      progress: 0,
      startDate: "2023-10-01",
      estimatedCompletion: "2023-11-30",
      aiPredictions: {
        riskScore: 25,
        successProbability: 87,
        resourceOptimization: "AI-powered testing will reduce QA cycle by 40%",
        timelinePrediction: "Parallel testing approach will maintain timeline"
      },
      tasks: [
        { id: "11", name: "Unit Testing", status: "pending", aiRecommendation: "Automated test coverage target: 95%" },
        { id: "12", name: "Integration Testing", status: "pending", aiRecommendation: "Focus on IoT device compatibility" },
        { id: "13", name: "User Acceptance Testing", status: "pending", aiRecommendation: "Beta program with 500 users recommended" }
      ],
      budget: { allocated: 80000, spent: 0, predicted: 75000 },
      kpis: [
        { name: "Bug Detection Rate", current: 0, target: 95, aiInsight: "AI testing will exceed industry standards" },
        { name: "Performance Score", current: 0, target: 90, aiInsight: "Predictive modeling shows 92% achievement" }
      ]
    },
    {
      id: "production",
      name: "Production & Manufacturing",
      icon: Factory,
      status: "pending",
      progress: 0,
      startDate: "2023-12-01",
      estimatedCompletion: "2024-02-15",
      aiPredictions: {
        riskScore: 30,
        successProbability: 85,
        resourceOptimization: "AI supply chain optimization will reduce costs by 12%",
        timelinePrediction: "Manufacturing capacity sufficient for launch demand"
      },
      tasks: [
        { id: "14", name: "Supplier Selection", status: "pending", aiRecommendation: "AI vendor scoring identifies optimal partners" },
        { id: "15", name: "Production Setup", status: "pending", aiRecommendation: "Lean manufacturing principles recommended" },
        { id: "16", name: "Quality Control", status: "pending", aiRecommendation: "Computer vision QC will ensure 99.8% quality" }
      ],
      budget: { allocated: 500000, spent: 0, predicted: 440000 },
      kpis: [
        { name: "Production Efficiency", current: 0, target: 85, aiInsight: "AI optimization predicts 89% efficiency" },
        { name: "Quality Rate", current: 0, target: 98, aiInsight: "Computer vision will achieve 99.8%" }
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
            Product Overview: {product.name}
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