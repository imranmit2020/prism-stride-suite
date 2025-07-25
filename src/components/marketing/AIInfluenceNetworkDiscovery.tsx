import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Network, Users, Star, TrendingUp, Zap } from "lucide-react";

export function AIInfluenceNetworkDiscovery() {
  const [discoveryData, setDiscoveryData] = useState({
    industry: "",
    targetAudience: "",
    budget: "",
    campaign: "",
    aiEnabled: false
  });
  const [isDiscovering, setIsDiscovering] = useState(false);

  const influenceNetwork = {
    networkStrength: 94,
    totalInfluencers: 847,
    hiddenGems: 23,
    microInfluencers: [
      { name: "TechGuru_Sarah", followers: "15.2K", engagement: 8.7, niche: "Enterprise Software", influence: 89 },
      { name: "StartupSteve", followers: "22.1K", engagement: 7.3, niche: "Business Growth", influence: 82 },
      { name: "DataDriven_Dana", followers: "18.9K", engagement: 9.1, niche: "Analytics", influence: 86 }
    ],
    macroInfluencers: [
      { name: "IndustryLeader_John", followers: "124K", engagement: 5.2, niche: "Tech Leadership", influence: 94 },
      { name: "BusinessMaven_Lisa", followers: "89K", engagement: 6.1, niche: "Strategy", influence: 88 }
    ],
    hiddenInfluencers: [
      { name: "Employee_Advocate_Mike", type: "Internal Champion", reach: "2.3K", influence: 91, secret: "CEO's trusted advisor" },
      { name: "Customer_Champion_Amy", type: "Customer Evangelist", reach: "8.7K", influence: 87, secret: "Industry conference speaker" },
      { name: "Silent_Authority_Dr_Kim", type: "Academic Expert", reach: "45K", influence: 93, secret: "Peer-reviewed research citations" }
    ],
    networkConnections: [
      { from: "TechGuru_Sarah", to: "IndustryLeader_John", strength: 76, type: "Professional" },
      { from: "StartupSteve", to: "BusinessMaven_Lisa", strength: 82, type: "Collaboration" },
      { from: "Employee_Advocate_Mike", to: "Customer_Champion_Amy", strength: 69, type: "Cross-reference" }
    ],
    amplificationPaths: [
      { path: "Micro → Macro → Mainstream", multiplier: 8.4, reach: "1.2M+", cost: "$2,400" },
      { path: "Hidden → Industry → Viral", multiplier: 12.7, reach: "2.8M+", cost: "$1,800" },
      { path: "Customer → Employee → External", multiplier: 6.2, reach: "890K+", cost: "$950" }
    ]
  };

  const handleDiscovery = () => {
    setIsDiscovering(true);
    setTimeout(() => setIsDiscovering(false), 3000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Influence Network Discovery
            <Badge variant="secondary" className="ml-auto">Revolutionary AI</Badge>
          </CardTitle>
          <CardDescription>
            Discovers hidden influencers and maps influence networks for maximum marketing impact and viral potential
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="industry">Industry/Niche</Label>
              <Input
                id="industry"
                value={discoveryData.industry}
                onChange={(e) => setDiscoveryData({...discoveryData, industry: e.target.value})}
                placeholder="e.g., SaaS, Fintech, Healthcare"
              />
            </div>
            <div>
              <Label htmlFor="audience">Target Audience</Label>
              <Input
                id="audience"
                value={discoveryData.targetAudience}
                onChange={(e) => setDiscoveryData({...discoveryData, targetAudience: e.target.value})}
                placeholder="e.g., CTOs, Marketers, Founders"
              />
            </div>
            <div>
              <Label htmlFor="budget">Campaign Budget</Label>
              <Input
                id="budget"
                value={discoveryData.budget}
                onChange={(e) => setDiscoveryData({...discoveryData, budget: e.target.value})}
                placeholder="e.g., $10,000"
              />
            </div>
            <div>
              <Label htmlFor="campaign">Campaign Type</Label>
              <Input
                id="campaign"
                value={discoveryData.campaign}
                onChange={(e) => setDiscoveryData({...discoveryData, campaign: e.target.value})}
                placeholder="e.g., Product Launch, Brand Awareness"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-enabled">Enable Deep Network Discovery</Label>
            <Switch
              id="ai-enabled"
              checked={discoveryData.aiEnabled}
              onCheckedChange={(checked) => setDiscoveryData({...discoveryData, aiEnabled: checked})}
            />
          </div>

          <Button 
            onClick={handleDiscovery} 
            disabled={isDiscovering}
            className="w-full"
          >
            {isDiscovering ? "Discovering Influence Networks..." : "Discover Influence Networks"}
          </Button>
        </CardContent>
      </Card>

      {discoveryData.aiEnabled && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="h-5 w-5 text-primary" />
                Network Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{influenceNetwork.networkStrength}%</div>
                  <div className="text-sm text-muted-foreground">Network Strength</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{influenceNetwork.totalInfluencers}</div>
                  <div className="text-sm text-muted-foreground">Total Influencers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{influenceNetwork.hiddenGems}</div>
                  <div className="text-sm text-muted-foreground">Hidden Gems</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">12.7x</div>
                  <div className="text-sm text-muted-foreground">Max Amplification</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Micro-Influencers (High ROI)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {influenceNetwork.microInfluencers.map((influencer, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{influencer.name}</div>
                      <div className="text-sm text-muted-foreground">{influencer.niche}</div>
                    </div>
                    <Badge variant="secondary">{influencer.followers} followers</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Engagement: {influencer.engagement}%</div>
                    <div>Influence Score: {influencer.influence}</div>
                  </div>
                  <Progress value={influencer.influence} className="h-2 mt-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                Hidden Influencers (Secret Weapons)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {influenceNetwork.hiddenInfluencers.map((influencer, index) => (
                <div key={index} className="border rounded-lg p-3 bg-gradient-to-r from-primary/5 to-secondary/5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{influencer.name}</div>
                      <div className="text-sm text-muted-foreground">{influencer.type}</div>
                    </div>
                    <Badge variant="destructive">Hidden Gem</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                    <div>Reach: {influencer.reach}</div>
                    <div>Influence: {influencer.influence}%</div>
                  </div>
                  <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
                    🔍 Secret: {influencer.secret}
                  </div>
                  <Progress value={influencer.influence} className="h-2 mt-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Amplification Paths
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {influenceNetwork.amplificationPaths.map((path, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium">{path.path}</div>
                    <Badge variant="secondary">{path.multiplier}x multiplier</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Expected Reach: {path.reach}</div>
                    <div>Estimated Cost: {path.cost}</div>
                  </div>
                  <Progress value={path.multiplier * 8} className="h-2 mt-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Network Connections
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {influenceNetwork.networkConnections.map((connection, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm">
                      <span className="font-medium">{connection.from}</span>
                      <span className="mx-2">→</span>
                      <span className="font-medium">{connection.to}</span>
                    </div>
                    <Badge variant="outline">{connection.type}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Connection Strength: {connection.strength}%</span>
                  </div>
                  <Progress value={connection.strength} className="h-2 mt-1" />
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}