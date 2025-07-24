import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Star, 
  Gift, 
  TrendingUp, 
  Brain, 
  Sparkles,
  Users,
  Target,
  Calendar,
  DollarSign,
  Award,
  Zap,
  Heart,
  Crown,
  Diamond
} from "lucide-react";

interface LoyaltyProgram {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  type: 'points' | 'visits' | 'spending' | 'hybrid';
  tiers: LoyaltyTier[];
  rewards: LoyaltyReward[];
  rules: LoyaltyRule[];
  autoPromotions: boolean;
  personalizedOffers: boolean;
  birthdayRewards: boolean;
  referralProgram: boolean;
}

interface LoyaltyTier {
  id: string;
  name: string;
  icon: string;
  color: string;
  requirement: number;
  benefits: string[];
  multiplier: number;
}

interface LoyaltyReward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  type: 'discount' | 'freeItem' | 'upgrade' | 'special';
  value: number;
  isActive: boolean;
}

interface LoyaltyRule {
  id: string;
  condition: string;
  action: string;
  points: number;
}

interface LoyaltyProgramDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  program?: LoyaltyProgram | null;
  onSaveProgram: (program: Omit<LoyaltyProgram, 'id'>) => void;
}

// AI-powered loyalty program optimization
const generateLoyaltyInsights = (programData: any) => {
  const insights = [];
  
  // Tier optimization
  if (programData.tiers.length < 3) {
    insights.push({
      type: 'structure',
      severity: 'medium',
      title: 'Tier Optimization',
      description: 'Consider adding more tiers to increase customer engagement',
      suggestion: 'Research shows 4-5 tiers create optimal progression motivation'
    });
  }
  
  // Reward variety
  const rewardTypes = [...new Set(programData.rewards.map((r: any) => r.type))];
  if (rewardTypes.length < 3) {
    insights.push({
      type: 'rewards',
      severity: 'high',
      title: 'Reward Diversity',
      description: 'Limited reward types may reduce customer interest',
      suggestion: 'Add experiential rewards, early access, or exclusive products'
    });
  }
  
  // Points economics
  const avgPointsCost = programData.rewards.reduce((sum: number, r: any) => sum + r.pointsCost, 0) / programData.rewards.length;
  if (avgPointsCost > 1000) {
    insights.push({
      type: 'economics',
      severity: 'medium',
      title: 'Points Economy Balance',
      description: 'High points requirements may discourage redemption',
      suggestion: 'Consider lower-cost rewards to increase engagement frequency'
    });
  }
  
  return insights;
};

const defaultTiers: LoyaltyTier[] = [
  {
    id: '1',
    name: 'Bronze',
    icon: 'award',
    color: '#CD7F32',
    requirement: 0,
    benefits: ['1x points', 'Birthday reward', 'Member pricing'],
    multiplier: 1
  },
  {
    id: '2',
    name: 'Silver',
    icon: 'star',
    color: '#C0C0C0',
    requirement: 500,
    benefits: ['1.5x points', 'Birthday reward', 'Member pricing', 'Early access'],
    multiplier: 1.5
  },
  {
    id: '3',
    name: 'Gold',
    icon: 'crown',
    color: '#FFD700',
    requirement: 1500,
    benefits: ['2x points', 'Birthday reward', 'Member pricing', 'Early access', 'Free delivery'],
    multiplier: 2
  },
  {
    id: '4',
    name: 'Platinum',
    icon: 'diamond',
    color: '#E5E4E2',
    requirement: 3000,
    benefits: ['3x points', 'Birthday reward', 'Member pricing', 'Early access', 'Free delivery', 'Personal shopper'],
    multiplier: 3
  }
];

const defaultRewards: LoyaltyReward[] = [
  {
    id: '1',
    name: 'Free Coffee',
    description: 'Any size regular coffee',
    pointsCost: 100,
    type: 'freeItem',
    value: 3.50,
    isActive: true
  },
  {
    id: '2',
    name: '10% Off Purchase',
    description: 'Valid on any purchase',
    pointsCost: 150,
    type: 'discount',
    value: 10,
    isActive: true
  },
  {
    id: '3',
    name: 'Free Pastry',
    description: 'Any pastry from our selection',
    pointsCost: 80,
    type: 'freeItem',
    value: 2.25,
    isActive: true
  }
];

export function LoyaltyProgramDialog({ open, onOpenChange, program, onSaveProgram }: LoyaltyProgramDialogProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("basic");
  const [aiInsights, setAiInsights] = useState<any[]>([]);
  const [optimizationScore, setOptimizationScore] = useState(0);
  
  const [formData, setFormData] = useState<Omit<LoyaltyProgram, 'id'>>({
    name: '',
    description: '',
    isActive: true,
    type: 'points',
    tiers: defaultTiers,
    rewards: defaultRewards,
    rules: [
      {
        id: '1',
        condition: 'Purchase amount',
        action: 'Earn points',
        points: 1
      }
    ],
    autoPromotions: false,
    personalizedOffers: false,
    birthdayRewards: true,
    referralProgram: false
  });

  // AI analysis when program data changes
  useEffect(() => {
    if (formData.name && formData.tiers.length > 0 && formData.rewards.length > 0) {
      const insights = generateLoyaltyInsights(formData);
      setAiInsights(insights);
      
      // Calculate optimization score
      let score = 70; // Base score
      if (formData.tiers.length >= 4) score += 10;
      if (formData.rewards.length >= 5) score += 10;
      if (formData.autoPromotions) score += 5;
      if (formData.personalizedOffers) score += 5;
      
      setOptimizationScore(Math.min(100, score));
    }
  }, [formData]);

  const handleInputChange = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTierChange = (tierIndex: number, field: keyof LoyaltyTier, value: any) => {
    const updatedTiers = [...formData.tiers];
    updatedTiers[tierIndex] = { ...updatedTiers[tierIndex], [field]: value };
    setFormData(prev => ({ ...prev, tiers: updatedTiers }));
  };

  const handleRewardChange = (rewardIndex: number, field: keyof LoyaltyReward, value: any) => {
    const updatedRewards = [...formData.rewards];
    updatedRewards[rewardIndex] = { ...updatedRewards[rewardIndex], [field]: value };
    setFormData(prev => ({ ...prev, rewards: updatedRewards }));
  };

  const addNewTier = () => {
    const newTier: LoyaltyTier = {
      id: Date.now().toString(),
      name: `Tier ${formData.tiers.length + 1}`,
      icon: 'star',
      color: '#888888',
      requirement: (formData.tiers[formData.tiers.length - 1]?.requirement || 0) + 1000,
      benefits: ['Enhanced benefits'],
      multiplier: formData.tiers.length + 1
    };
    setFormData(prev => ({ ...prev, tiers: [...prev.tiers, newTier] }));
  };

  const addNewReward = () => {
    const newReward: LoyaltyReward = {
      id: Date.now().toString(),
      name: 'New Reward',
      description: 'Reward description',
      pointsCost: 100,
      type: 'discount',
      value: 5,
      isActive: true
    };
    setFormData(prev => ({ ...prev, rewards: [...prev.rewards, newReward] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      toast({
        title: "Validation Error",
        description: "Program name is required",
        variant: "destructive"
      });
      return;
    }

    onSaveProgram(formData);
    
    toast({
      title: "Loyalty Program Saved",
      description: `${formData.name} has been configured successfully`
    });

    onOpenChange(false);
  };

  const getIconComponent = (iconName: string) => {
    const icons: Record<string, any> = {
      award: Award,
      star: Star,
      crown: Crown,
      diamond: Diamond,
      heart: Heart
    };
    return icons[iconName] || Star;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            {program ? 'Edit Loyalty Program' : 'Create Loyalty Program'}
            <Sparkles className="h-4 w-4 text-primary ml-auto" />
          </DialogTitle>
          <DialogDescription>
            Design an AI-optimized loyalty program to boost customer retention and engagement.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Setup</TabsTrigger>
            <TabsTrigger value="tiers">Tiers</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="ai-features">AI Features</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit} className="space-y-6">
            <TabsContent value="basic" className="space-y-6">
              {/* Optimization Score */}
              {optimizationScore > 0 && (
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Brain className="h-4 w-4 text-primary" />
                      AI Optimization Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Program Effectiveness</span>
                        <span className="font-medium">{optimizationScore}%</span>
                      </div>
                      <Progress value={optimizationScore} className="w-full" />
                      <div className="text-xs text-muted-foreground">
                        Based on industry best practices and customer engagement data
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Program Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="e.g., Coffee Rewards Club"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Program Type</Label>
                  <Select value={formData.type} onValueChange={(value: any) => handleInputChange("type", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="points">Points-Based</SelectItem>
                      <SelectItem value="visits">Visit-Based</SelectItem>
                      <SelectItem value="spending">Spending-Based</SelectItem>
                      <SelectItem value="hybrid">Hybrid Model</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Program Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe your loyalty program benefits and how it works..."
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => handleInputChange("isActive", checked)}
                />
                <Label htmlFor="isActive">Program is active</Label>
              </div>
            </TabsContent>

            <TabsContent value="tiers" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Loyalty Tiers</h3>
                <Button type="button" onClick={addNewTier} size="sm">
                  <Star className="h-4 w-4 mr-2" />
                  Add Tier
                </Button>
              </div>

              <div className="space-y-4">
                {formData.tiers.map((tier, index) => {
                  const IconComponent = getIconComponent(tier.icon);
                  return (
                    <Card key={tier.id} className="p-4">
                      <div className="grid grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <Label>Tier Name</Label>
                          <Input
                            value={tier.name}
                            onChange={(e) => handleTierChange(index, "name", e.target.value)}
                            placeholder="Tier name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Requirement ({formData.type})</Label>
                          <Input
                            type="number"
                            value={tier.requirement}
                            onChange={(e) => handleTierChange(index, "requirement", parseInt(e.target.value))}
                            placeholder="0"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Points Multiplier</Label>
                          <Input
                            type="number"
                            step="0.1"
                            value={tier.multiplier}
                            onChange={(e) => handleTierChange(index, "multiplier", parseFloat(e.target.value))}
                            placeholder="1.0"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Icon</Label>
                          <Select value={tier.icon} onValueChange={(value) => handleTierChange(index, "icon", value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="award">Award</SelectItem>
                              <SelectItem value="star">Star</SelectItem>
                              <SelectItem value="crown">Crown</SelectItem>
                              <SelectItem value="diamond">Diamond</SelectItem>
                              <SelectItem value="heart">Heart</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Label>Benefits (comma-separated)</Label>
                        <Input
                          value={tier.benefits.join(', ')}
                          onChange={(e) => handleTierChange(index, "benefits", e.target.value.split(', '))}
                          placeholder="Benefit 1, Benefit 2, Benefit 3"
                        />
                      </div>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="rewards" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Available Rewards</h3>
                <Button type="button" onClick={addNewReward} size="sm">
                  <Gift className="h-4 w-4 mr-2" />
                  Add Reward
                </Button>
              </div>

              <div className="space-y-4">
                {formData.rewards.map((reward, index) => (
                  <Card key={reward.id} className="p-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Reward Name</Label>
                        <Input
                          value={reward.name}
                          onChange={(e) => handleRewardChange(index, "name", e.target.value)}
                          placeholder="Reward name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Points Cost</Label>
                        <Input
                          type="number"
                          value={reward.pointsCost}
                          onChange={(e) => handleRewardChange(index, "pointsCost", parseInt(e.target.value))}
                          placeholder="100"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Reward Type</Label>
                        <Select value={reward.type} onValueChange={(value: any) => handleRewardChange(index, "type", value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="discount">Discount</SelectItem>
                            <SelectItem value="freeItem">Free Item</SelectItem>
                            <SelectItem value="upgrade">Upgrade</SelectItem>
                            <SelectItem value="special">Special Offer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label>Value ($)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={reward.value}
                          onChange={(e) => handleRewardChange(index, "value", parseFloat(e.target.value))}
                          placeholder="0.00"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Input
                          value={reward.description}
                          onChange={(e) => handleRewardChange(index, "description", e.target.value)}
                          placeholder="Reward description"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ai-features" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    AI-Powered Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Automated Promotions</Label>
                        <p className="text-sm text-muted-foreground">
                          AI creates personalized promotions based on customer behavior
                        </p>
                      </div>
                      <Switch
                        checked={formData.autoPromotions}
                        onCheckedChange={(checked) => handleInputChange("autoPromotions", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Personalized Offers</Label>
                        <p className="text-sm text-muted-foreground">
                          Tailored rewards based on purchase history and preferences
                        </p>
                      </div>
                      <Switch
                        checked={formData.personalizedOffers}
                        onCheckedChange={(checked) => handleInputChange("personalizedOffers", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Birthday Rewards</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatic birthday offers and special celebrations
                        </p>
                      </div>
                      <Switch
                        checked={formData.birthdayRewards}
                        onCheckedChange={(checked) => handleInputChange("birthdayRewards", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Referral Program</Label>
                        <p className="text-sm text-muted-foreground">
                          AI-optimized referral tracking and rewards
                        </p>
                      </div>
                      <Switch
                        checked={formData.referralProgram}
                        onCheckedChange={(checked) => handleInputChange("referralProgram", checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Insights */}
              {aiInsights.length > 0 && (
                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Brain className="h-4 w-4 text-blue-600" />
                      AI Optimization Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {aiInsights.map((insight, index) => (
                        <div key={index} className="p-3 bg-white rounded-lg border">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-blue-900">{insight.title}</h4>
                            <Badge variant={insight.severity === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                              {insight.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-blue-800 mb-2">{insight.description}</p>
                          <p className="text-sm text-blue-600 font-medium">💡 {insight.suggestion}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {program ? 'Update Program' : 'Create Program'}
              </Button>
            </DialogFooter>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}