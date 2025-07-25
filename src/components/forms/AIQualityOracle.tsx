import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Eye, Shield, TrendingUp, AlertTriangle, CheckCircle, Zap, Brain, Target, Settings } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AIQualityOracle() {
  const [qualityData, setQualityData] = useState({
    product: "",
    batchNumber: "",
    productionDate: "",
    department: "",
    inspector: "",
    specifications: "",
    testResults: "",
    enableAI: true
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const qualityAnalysis = {
    overallQuality: 94,
    defectProbability: 3.2,
    reliabilityScore: 97,
    confidence: 98,
    qualityMetrics: [
      { metric: "Dimensional Accuracy", score: 98, status: "Excellent", trend: "stable" },
      { metric: "Material Integrity", score: 96, status: "Excellent", trend: "improving" },
      { metric: "Surface Finish", score: 89, status: "Good", trend: "stable" },
      { metric: "Performance Specs", score: 97, status: "Excellent", trend: "improving" },
      { metric: "Durability Testing", score: 93, status: "Very Good", trend: "stable" }
    ],
    defectPrediction: [
      { defect: "Surface Scratches", probability: 5.2, severity: "Minor", prevention: "Improve handling protocols" },
      { defect: "Dimensional Variance", probability: 2.8, severity: "Major", prevention: "Calibrate measurement tools" },
      { defect: "Material Fatigue", probability: 1.4, severity: "Critical", prevention: "Stress testing enhancement" }
    ],
    processOptimization: {
      currentEfficiency: 87,
      optimizedEfficiency: 94,
      improvementAreas: [
        { area: "Temperature Control", impact: "+3% quality", effort: "Low" },
        { area: "Timing Precision", impact: "+2% quality", effort: "Medium" },
        { area: "Material Handling", impact: "+4% quality", effort: "High" }
      ],
      costSavings: "$23,400",
      timeReduction: "12%"
    },
    predictiveMaintenance: {
      nextMaintenance: "14 days",
      equipmentHealth: 91,
      criticalComponents: [
        { component: "Pressure Sensor", health: 76, replacement: "30 days" },
        { component: "Temperature Probe", health: 89, replacement: "60 days" },
        { component: "Motor Assembly", health: 94, replacement: "120 days" }
      ]
    },
    aiInsights: [
      {
        type: "Quality Trend",
        insight: "Consistent quality improvement over last 30 days with 12% defect reduction",
        severity: "positive",
        confidence: 96
      },
      {
        type: "Process Alert",
        insight: "Temperature variance detected in Zone 3 - monitor closely for next 48 hours",
        severity: "warning",
        confidence: 89
      },
      {
        type: "Optimization",
        insight: "Implementing suggested timing adjustments could improve quality by 8%",
        severity: "positive",
        confidence: 94
      }
    ]
  };

  const handleQualityAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 4000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            AI Quality Oracle
          </CardTitle>
          <CardDescription>
            Omniscient AI that predicts defects, optimizes processes, and ensures perfect quality before production
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quality Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Quality Assessment Data</CardTitle>
            <div className="flex items-center space-x-2">
              <Switch 
                id="ai-quality" 
                checked={qualityData.enableAI}
                onCheckedChange={(checked) => setQualityData({...qualityData, enableAI: checked})}
              />
              <Label htmlFor="ai-quality">Enable AI Quality Oracle</Label>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="product">Product Name</Label>
                <Input 
                  id="product" 
                  value={qualityData.product}
                  onChange={(e) => setQualityData({...qualityData, product: e.target.value})}
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <Label htmlFor="batch">Batch Number</Label>
                <Input 
                  id="batch"
                  value={qualityData.batchNumber}
                  onChange={(e) => setQualityData({...qualityData, batchNumber: e.target.value})}
                  placeholder="BATCH-2024-001"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="production-date">Production Date</Label>
                <Input 
                  id="production-date"
                  type="date"
                  value={qualityData.productionDate}
                  onChange={(e) => setQualityData({...qualityData, productionDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Select value={qualityData.department} onValueChange={(value) => setQualityData({...qualityData, department: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="assembly">Assembly</SelectItem>
                    <SelectItem value="packaging">Packaging</SelectItem>
                    <SelectItem value="testing">Testing</SelectItem>
                    <SelectItem value="finishing">Finishing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="inspector">Quality Inspector</Label>
              <Input 
                id="inspector"
                value={qualityData.inspector}
                onChange={(e) => setQualityData({...qualityData, inspector: e.target.value})}
                placeholder="Inspector name"
              />
            </div>

            <div>
              <Label htmlFor="specifications">Product Specifications</Label>
              <Textarea 
                id="specifications"
                value={qualityData.specifications}
                onChange={(e) => setQualityData({...qualityData, specifications: e.target.value})}
                placeholder="Enter product specifications and requirements..."
                className="h-20"
              />
            </div>

            <div>
              <Label htmlFor="test-results">Test Results Data</Label>
              <Textarea 
                id="test-results"
                value={qualityData.testResults}
                onChange={(e) => setQualityData({...qualityData, testResults: e.target.value})}
                placeholder="Enter test results, measurements, and observations..."
                className="h-24"
              />
            </div>

            <Button 
              onClick={handleQualityAnalysis} 
              disabled={isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <Brain className="mr-2 h-4 w-4 animate-pulse" />
                  AI Analyzing Quality Patterns...
                </>
              ) : (
                <>
                  <Eye className="mr-2 h-4 w-4" />
                  Run AI Quality Analysis
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Quality Score Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Quality Score Overview
              <Badge variant="secondary" className="ml-auto">
                {qualityAnalysis.confidence}% Confidence
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-green-600">{qualityAnalysis.overallQuality}%</div>
                <p className="text-sm text-muted-foreground">Overall Quality Score</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-lg font-bold text-red-600">{qualityAnalysis.defectProbability}%</div>
                  <div className="text-sm text-muted-foreground">Defect Probability</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">{qualityAnalysis.reliabilityScore}%</div>
                  <div className="text-sm text-muted-foreground">Reliability Score</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Quality Metrics</h4>
                {qualityAnalysis.qualityMetrics.slice(0, 3).map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{metric.metric}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant={metric.status === 'Excellent' ? 'default' : 'secondary'}>
                          {metric.status}
                        </Badge>
                        <span className="text-sm">{metric.score}%</span>
                      </div>
                    </div>
                    <Progress value={metric.score} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Defect Prediction */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              AI Defect Prediction
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {qualityAnalysis.defectPrediction.map((defect, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm">{defect.defect}</h4>
                  <Badge 
                    variant={defect.severity === 'Minor' ? 'secondary' : defect.severity === 'Major' ? 'outline' : 'destructive'}
                  >
                    {defect.severity}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Probability</span>
                    <span>{defect.probability}%</span>
                  </div>
                  <Progress value={defect.probability} className="h-2" />
                </div>
                <p className="text-sm text-muted-foreground">{defect.prevention}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Process Optimization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Process Optimization
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-lg font-bold text-orange-600">{qualityAnalysis.processOptimization.currentEfficiency}%</div>
                <div className="text-sm text-muted-foreground">Current Efficiency</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-600">{qualityAnalysis.processOptimization.optimizedEfficiency}%</div>
                <div className="text-sm text-muted-foreground">Optimized Efficiency</div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Improvement Areas</h4>
              {qualityAnalysis.processOptimization.improvementAreas.map((area, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{area.area}</span>
                    <Badge variant="outline">{area.effort}</Badge>
                  </div>
                  <p className="text-sm text-green-600 font-semibold">{area.impact}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">{qualityAnalysis.processOptimization.costSavings}</div>
                <div className="text-sm text-muted-foreground">Annual Savings</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">{qualityAnalysis.processOptimization.timeReduction}</div>
                <div className="text-sm text-muted-foreground">Time Reduction</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Predictive Maintenance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            AI Predictive Maintenance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{qualityAnalysis.predictiveMaintenance.nextMaintenance}</div>
              <p className="text-sm text-muted-foreground">Next Maintenance</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{qualityAnalysis.predictiveMaintenance.equipmentHealth}%</div>
              <p className="text-sm text-muted-foreground">Equipment Health</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Critical Components</h4>
              {qualityAnalysis.predictiveMaintenance.criticalComponents.map((component, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span>{component.component}</span>
                  <Badge variant={component.health > 80 ? 'secondary' : 'outline'}>
                    {component.health}%
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            AI Quality Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {qualityAnalysis.aiInsights.map((insight, index) => (
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

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold">AI Recommendation</h4>
                <p className="text-sm text-muted-foreground">Overall Quality Status</p>
              </div>
              <Button className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve for Production
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}