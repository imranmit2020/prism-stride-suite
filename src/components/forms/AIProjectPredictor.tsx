import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Target, Brain, Calendar, Users, DollarSign, AlertTriangle, CheckCircle, TrendingUp, Zap } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AIProjectPredictor() {
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    budget: "",
    timeline: "",
    teamSize: "",
    complexity: "",
    priority: "",
    enableAI: true
  });
  const [isPredicting, setIsPredicting] = useState(false);

  const predictions = {
    successProbability: 87,
    completionConfidence: 92,
    budgetAccuracy: 89,
    timelineReliability: 85,
    predictions: {
      actualBudget: "$143,200",
      actualTimeline: "4.2 months",
      teamOptimal: "6-8 people",
      deliveryDate: "March 15, 2024",
      riskFactors: 3
    },
    riskAnalysis: [
      { risk: "Resource Conflicts", probability: 34, impact: "Medium", mitigation: "Implement resource allocation matrix" },
      { risk: "Scope Creep", probability: 67, impact: "High", mitigation: "Define strict change control process" },
      { risk: "Technical Debt", probability: 23, impact: "Low", mitigation: "Regular code reviews and refactoring" }
    ],
    recommendations: [
      {
        category: "Team Structure",
        suggestion: "Add senior developer with domain expertise",
        impact: "+15% success rate",
        urgency: "High"
      },
      {
        category: "Timeline",
        suggestion: "Buffer 2 weeks for integration testing",
        impact: "+12% on-time delivery",
        urgency: "Medium"
      },
      {
        category: "Budget",
        suggestion: "Allocate 15% contingency for unexpected requirements",
        impact: "-23% budget overrun risk",
        urgency: "High"
      }
    ],
    milestones: [
      { name: "Requirements Analysis", completion: 100, date: "Dec 15", status: "completed" },
      { name: "Design Phase", completion: 80, date: "Jan 10", status: "in-progress" },
      { name: "Development Sprint 1", completion: 0, date: "Jan 25", status: "upcoming" },
      { name: "Testing & QA", completion: 0, date: "Feb 20", status: "upcoming" },
      { name: "Deployment", completion: 0, date: "Mar 15", status: "upcoming" }
    ]
  };

  const handlePrediction = () => {
    setIsPredicting(true);
    setTimeout(() => setIsPredicting(false), 3500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            AI Project Success Predictor
          </CardTitle>
          <CardDescription>
            AI that predicts project outcomes, optimizes resources, and prevents failures before they happen
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <div className="flex items-center space-x-2">
              <Switch 
                id="ai-prediction" 
                checked={projectData.enableAI}
                onCheckedChange={(checked) => setProjectData({...projectData, enableAI: checked})}
              />
              <Label htmlFor="ai-prediction">Enable AI Prediction</Label>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="project-name">Project Name</Label>
              <Input 
                id="project-name" 
                value={projectData.name}
                onChange={(e) => setProjectData({...projectData, name: e.target.value})}
                placeholder="Enter project name"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Project Description</Label>
              <Textarea 
                id="description"
                value={projectData.description}
                onChange={(e) => setProjectData({...projectData, description: e.target.value})}
                placeholder="Describe the project scope and objectives..."
                className="h-20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="budget">Budget</Label>
                <Input 
                  id="budget"
                  value={projectData.budget}
                  onChange={(e) => setProjectData({...projectData, budget: e.target.value})}
                  placeholder="$100,000"
                />
              </div>
              <div>
                <Label htmlFor="timeline">Timeline</Label>
                <Input 
                  id="timeline"
                  value={projectData.timeline}
                  onChange={(e) => setProjectData({...projectData, timeline: e.target.value})}
                  placeholder="3 months"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="team-size">Team Size</Label>
                <Input 
                  id="team-size"
                  value={projectData.teamSize}
                  onChange={(e) => setProjectData({...projectData, teamSize: e.target.value})}
                  placeholder="5 people"
                />
              </div>
              <div>
                <Label htmlFor="complexity">Complexity</Label>
                <Select value={projectData.complexity} onValueChange={(value) => setProjectData({...projectData, complexity: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select complexity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="priority">Priority Level</Label>
              <Select value={projectData.priority} onValueChange={(value) => setProjectData({...projectData, priority: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handlePrediction} 
              disabled={isPredicting}
              className="w-full"
            >
              {isPredicting ? (
                <>
                  <Brain className="mr-2 h-4 w-4 animate-pulse" />
                  AI Predicting Project Outcome...
                </>
              ) : (
                <>
                  <Target className="mr-2 h-4 w-4" />
                  Generate AI Predictions
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Success Predictions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Success Predictions
              <Badge variant="secondary" className="ml-auto">
                {predictions.completionConfidence}% Confidence
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-green-600">{predictions.successProbability}%</div>
                <p className="text-sm text-muted-foreground">Success Probability</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">{predictions.budgetAccuracy}%</div>
                  <div className="text-sm text-muted-foreground">Budget Accuracy</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">{predictions.timelineReliability}%</div>
                  <div className="text-sm text-muted-foreground">Timeline Reliability</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">AI Predictions</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Actual Budget:</span>
                    <span className="font-semibold">{predictions.predictions.actualBudget}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Actual Timeline:</span>
                    <span className="font-semibold">{predictions.predictions.actualTimeline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Optimal Team Size:</span>
                    <span className="font-semibold">{predictions.predictions.teamOptimal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Date:</span>
                    <span className="font-semibold">{predictions.predictions.deliveryDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              AI Risk Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {predictions.riskAnalysis.map((risk, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm">{risk.risk}</h4>
                  <Badge 
                    variant={risk.impact === 'High' ? 'destructive' : risk.impact === 'Medium' ? 'outline' : 'secondary'}
                  >
                    {risk.impact}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Probability</span>
                    <span>{risk.probability}%</span>
                  </div>
                  <Progress value={risk.probability} className="h-2" />
                </div>
                <p className="text-sm text-muted-foreground">{risk.mitigation}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {predictions.recommendations.map((rec, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{rec.category}</Badge>
                  <Badge 
                    variant={rec.urgency === 'High' ? 'destructive' : rec.urgency === 'Medium' ? 'outline' : 'secondary'}
                  >
                    {rec.urgency}
                  </Badge>
                </div>
                <p className="text-sm font-medium">{rec.suggestion}</p>
                <p className="text-sm text-green-600 font-semibold">{rec.impact}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Project Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            AI-Optimized Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {predictions.milestones.map((milestone, index) => (
              <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="flex-shrink-0">
                  {milestone.status === 'completed' ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : milestone.status === 'in-progress' ? (
                    <div className="h-5 w-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-semibold text-sm">{milestone.name}</h4>
                    <span className="text-sm text-muted-foreground">{milestone.date}</span>
                  </div>
                  <Progress value={milestone.completion} className="h-2" />
                </div>
                <Badge 
                  variant={
                    milestone.status === 'completed' ? 'default' : 
                    milestone.status === 'in-progress' ? 'outline' : 'secondary'
                  }
                  className="capitalize"
                >
                  {milestone.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}