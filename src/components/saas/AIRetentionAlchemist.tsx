import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Heart, Users, TrendingUp, Zap, Target } from "lucide-react";

export function AIRetentionAlchemist() {
  const [retentionData, setRetentionData] = useState({
    customerSegment: "",
    currentRetention: "",
    churnRate: "",
    aiEnabled: false
  });
  const [isTransforming, setIsTransforming] = useState(false);

  const retentionAlchemy = {
    transformedRetention: 94,
    currentRetention: 67,
    improvement: "+40%",
    advocacyRate: 78,
    confidence: 96,
    alchemyStrategies: [
      { 
        strategy: "Emotional Bonding Catalyst", 
        impact: "+23% retention", 
        mechanism: "Deep relationship building",
        timeline: "30 days",
        effectiveness: 91
      },
      { 
        strategy: "Value Addiction Formula", 
        impact: "+31% retention", 
        mechanism: "Habit-forming value delivery",
        timeline: "45 days",
        effectiveness: 88
      },
      { 
        strategy: "Community Transformation", 
        impact: "+18% retention", 
        mechanism: "Peer-to-peer loyalty networks",
        timeline: "60 days",
        effectiveness: 85
      }
    ],
    loyaltyLevels: [
      { level: "Satisfied Users", current: 45, transformed: 78, change: "+73%" },
      { level: "Engaged Advocates", current: 23, transformed: 67, change: "+191%" },
      { level: "Loyal Champions", current: 12, transformed: 43, change: "+258%" },
      { level: "Brand Evangelists", current: 3, transformed: 18, change: "+500%" }
    ],
    retentionMagic: [
      { spell: "Predictive Intervention", power: 94, effect: "Prevents churn before it happens" },
      { spell: "Value Amplification", power: 87, effect: "Increases perceived product value" },
      { spell: "Emotional Anchoring", power: 91, effect: "Creates deep emotional connections" },
      { spell: "Success Addiction", power: 89, effect: "Makes users dependent on success" }
    ],
    advocacyPipeline: [
      { stage: "User → Satisfied", probability: 89, timeframe: "Week 2", actions: "Onboarding excellence" },
      { stage: "Satisfied → Engaged", probability: 76, timeframe: "Month 1", actions: "Value demonstration" },
      { stage: "Engaged → Advocate", probability: 68, timeframe: "Month 3", actions: "Community integration" },
      { stage: "Advocate → Evangelist", probability: 45, timeframe: "Month 6", actions: "Co-creation opportunities" }
    ],
    retentionMetrics: [
      { metric: "90-day retention", before: 67, after: 94, improvement: "+40%" },
      { metric: "Annual retention", before: 45, after: 89, improvement: "+98%" },
      { metric: "Advocacy rate", before: 12, after: 78, improvement: "+550%" },
      { metric: "Referral generation", before: 8, after: 67, improvement: "+738%" }
    ]
  };

  const handleTransformation = () => {
    setIsTransforming(true);
    setTimeout(() => setIsTransforming(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Retention Alchemist
            <Badge variant="secondary" className="ml-auto">Revolutionary AI</Badge>
          </CardTitle>
          <CardDescription>
            Transforms users into loyal advocates through AI-powered retention alchemy with 96% transformation success
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customer-segment">Customer Segment</Label>
              <Input
                id="customer-segment"
                value={retentionData.customerSegment}
                onChange={(e) => setRetentionData({...retentionData, customerSegment: e.target.value})}
                placeholder="e.g., Enterprise, SMB, Individual"
              />
            </div>
            <div>
              <Label htmlFor="current-retention">Current Retention Rate</Label>
              <Input
                id="current-retention"
                value={retentionData.currentRetention}
                onChange={(e) => setRetentionData({...retentionData, currentRetention: e.target.value})}
                placeholder="e.g., 67%"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-enabled">Enable Retention Alchemy</Label>
            <Switch
              id="ai-enabled"
              checked={retentionData.aiEnabled}
              onCheckedChange={(checked) => setRetentionData({...retentionData, aiEnabled: checked})}
            />
          </div>

          <Button 
            onClick={handleTransformation} 
            disabled={isTransforming}
            className="w-full"
          >
            {isTransforming ? "Transforming Users..." : "Transform Into Advocates"}
          </Button>
        </CardContent>
      </Card>

      {retentionData.aiEnabled && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Alchemy Transformation Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary">{retentionAlchemy.transformedRetention}%</div>
                  <div className="text-sm text-muted-foreground">Transformed Retention</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-muted-foreground">{retentionAlchemy.currentRetention}%</div>
                  <div className="text-sm text-muted-foreground">Current Retention</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{retentionAlchemy.improvement}</div>
                  <div className="text-sm text-muted-foreground">Improvement</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{retentionAlchemy.advocacyRate}%</div>
                  <div className="text-sm text-muted-foreground">Advocacy Rate</div>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Transformation Progress</span>
                  <span className="text-sm text-muted-foreground">{retentionAlchemy.confidence}% confidence</span>
                </div>
                <Progress value={retentionAlchemy.confidence} className="h-3" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Alchemy Strategies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {retentionAlchemy.alchemyStrategies.map((strategy, index) => (
                <div key={index} className="border rounded-lg p-3 bg-gradient-to-r from-purple-50 to-pink-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{strategy.strategy}</div>
                      <div className="text-sm text-muted-foreground">{strategy.mechanism}</div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">{strategy.timeline}</Badge>
                      <div className="text-sm text-green-600 mt-1">{strategy.impact}</div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Effectiveness: {strategy.effectiveness}%</span>
                  </div>
                  <Progress value={strategy.effectiveness} className="h-2 mb-2" />
                  <Button size="sm" className="w-full">Activate Alchemy</Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Loyalty Level Transformation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {retentionAlchemy.loyaltyLevels.map((level, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium">{level.level}</div>
                    <Badge variant="destructive">{level.change}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                    <div>Current: {level.current}%</div>
                    <div>Transformed: {level.transformed}%</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Before</span>
                      <span>After</span>
                    </div>
                    <Progress value={level.current} className="h-2" />
                    <Progress value={level.transformed} className="h-2" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Retention Magic Spells
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {retentionAlchemy.retentionMagic.map((spell, index) => (
                <div key={index} className="border rounded-lg p-3 bg-gradient-to-r from-indigo-50 to-purple-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">✨ {spell.spell}</div>
                      <div className="text-sm text-muted-foreground">{spell.effect}</div>
                    </div>
                    <Badge variant="secondary">{spell.power}% power</Badge>
                  </div>
                  <Progress value={spell.power} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Advocacy Pipeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {retentionAlchemy.advocacyPipeline.map((stage, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{stage.stage}</div>
                      <div className="text-sm text-muted-foreground">{stage.actions}</div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">{stage.timeframe}</Badge>
                      <div className="text-sm text-green-600 mt-1">{stage.probability}% conversion</div>
                    </div>
                  </div>
                  <Progress value={stage.probability} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Retention Metrics Transformation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {retentionAlchemy.retentionMetrics.map((metric, index) => (
                <div key={index} className="border rounded-lg p-3 bg-gradient-to-r from-green-50 to-blue-50">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium">{metric.metric}</div>
                    <Badge variant="destructive">{metric.improvement}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>Before: {metric.before}%</div>
                    <div>After: {metric.after}%</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}