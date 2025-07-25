import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Brain, Zap, TrendingUp, Heart, DollarSign, AlertTriangle, User, MessageSquare, Target, Sparkles } from "lucide-react";

export function AICustomerIntelligence() {
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    notes: "",
    enableAI: true
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const aiInsights = {
    personalityProfile: {
      traits: [
        { name: "Decision Speed", score: 78, trend: "up" },
        { name: "Price Sensitivity", score: 45, trend: "down" },
        { name: "Loyalty Potential", score: 89, trend: "up" },
        { name: "Communication Style", score: 67, trend: "stable" }
      ],
      type: "Analytical Buyer",
      confidence: 94
    },
    predictiveMetrics: {
      lifetimeValue: "$45,670",
      churnRisk: "Low (12%)",
      nextPurchase: "14 days",
      upsellProbability: "High (76%)"
    },
    emotionalIntelligence: {
      currentMood: "Optimistic",
      stressLevel: "Low",
      satisfaction: 92,
      engagement: 87
    },
    aiRecommendations: [
      {
        type: "Communication",
        suggestion: "Send detailed technical specifications - this customer values thorough information",
        confidence: 94,
        impact: "High"
      },
      {
        type: "Timing",
        suggestion: "Best contact time: Tuesday 2-4 PM based on response patterns",
        confidence: 87,
        impact: "Medium"
      },
      {
        type: "Pricing",
        suggestion: "Offer premium package - 89% loyalty indicates price flexibility",
        confidence: 91,
        impact: "High"
      }
    ]
  };

  const handleAIAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 3000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Customer Intelligence Engine
          </CardTitle>
          <CardDescription>
            Revolutionary AI that reads customer psychology, predicts behavior, and optimizes every interaction
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
            <div className="flex items-center space-x-2">
              <Switch 
                id="ai-mode" 
                checked={customerData.enableAI}
                onCheckedChange={(checked) => setCustomerData({...customerData, enableAI: checked})}
              />
              <Label htmlFor="ai-mode">Enable AI Deep Analysis</Label>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  value={customerData.name}
                  onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                  placeholder="Enter customer name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={customerData.email}
                  onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                  placeholder="customer@company.com"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone"
                  value={customerData.phone}
                  onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input 
                  id="company"
                  value={customerData.company}
                  onChange={(e) => setCustomerData({...customerData, company: e.target.value})}
                  placeholder="Company name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Customer Notes</Label>
              <Textarea 
                id="notes"
                value={customerData.notes}
                onChange={(e) => setCustomerData({...customerData, notes: e.target.value})}
                placeholder="Any additional information about the customer..."
                className="h-24"
              />
            </div>

            <Button 
              onClick={handleAIAnalysis} 
              disabled={isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                  AI Analyzing Customer Psychology...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-4 w-4" />
                  Run AI Deep Analysis
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* AI Personality Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              AI Personality Profile
              <Badge variant="secondary" className="ml-auto">
                {aiInsights.personalityProfile.confidence}% Confidence
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <h3 className="font-semibold text-lg">{aiInsights.personalityProfile.type}</h3>
                <p className="text-sm text-muted-foreground">Primary Customer Archetype</p>
              </div>

              {aiInsights.personalityProfile.traits.map((trait, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{trait.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{trait.score}%</span>
                      <TrendingUp 
                        className={`h-4 w-4 ${
                          trait.trend === 'up' ? 'text-green-500' : 
                          trait.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                        }`} 
                      />
                    </div>
                  </div>
                  <Progress value={trait.score} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Predictive Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Predictive Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Lifetime Value</span>
              <span className="font-semibold text-green-600">{aiInsights.predictiveMetrics.lifetimeValue}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Churn Risk</span>
              <Badge variant="outline" className="text-green-600">{aiInsights.predictiveMetrics.churnRisk}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Next Purchase</span>
              <span className="font-semibold">{aiInsights.predictiveMetrics.nextPurchase}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Upsell Probability</span>
              <Badge className="bg-blue-100 text-blue-800">{aiInsights.predictiveMetrics.upsellProbability}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Emotional Intelligence */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Emotional Intelligence
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-lg font-semibold">{aiInsights.emotionalIntelligence.currentMood}</div>
              <div className="text-sm text-muted-foreground">Current Mood</div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Satisfaction</span>
                <span className="font-semibold">{aiInsights.emotionalIntelligence.satisfaction}%</span>
              </div>
              <Progress value={aiInsights.emotionalIntelligence.satisfaction} className="h-2" />
              
              <div className="flex justify-between">
                <span className="text-sm">Engagement</span>
                <span className="font-semibold">{aiInsights.emotionalIntelligence.engagement}%</span>
              </div>
              <Progress value={aiInsights.emotionalIntelligence.engagement} className="h-2" />
            </div>
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
            {aiInsights.aiRecommendations.map((rec, index) => (
              <div key={index} className="p-3 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{rec.type}</Badge>
                  <span className="text-xs text-muted-foreground">{rec.confidence}% confidence</span>
                </div>
                <p className="text-sm">{rec.suggestion}</p>
                <Badge 
                  variant={rec.impact === 'High' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {rec.impact} Impact
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}