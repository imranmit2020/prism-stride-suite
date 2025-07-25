import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Monitor, Smartphone, Tablet, Globe, Users, Eye, Clock, TrendingUp, Activity, MousePointer } from "lucide-react";

export function AIBehaviorPrediction() {
  const [selectedUser, setSelectedUser] = useState(null);

  // Revolutionary real-time behavior prediction
  const liveUsers = [
    {
      id: "user_001",
      location: "New York, NY",
      device: "iPhone 15",
      currentPage: "/pricing",
      timeOnSite: "4m 23s",
      predictedAction: "Purchase Premium Plan",
      confidence: 87,
      churnRisk: 12,
      sessionValue: "$2,450",
      behaviorPattern: "Power User",
      nextClickPrediction: "Sign Up Button",
      exitProbability: 15,
      conversionScore: 94
    },
    {
      id: "user_002", 
      location: "London, UK",
      device: "MacBook Pro",
      currentPage: "/features/analytics",
      timeOnSite: "12m 45s",
      predictedAction: "Download Trial",
      confidence: 76,
      churnRisk: 34,
      sessionValue: "$890",
      behaviorPattern: "Researcher",
      nextClickPrediction: "Demo Request",
      exitProbability: 23,
      conversionScore: 71
    },
    {
      id: "user_003",
      location: "Tokyo, Japan", 
      device: "Samsung Galaxy",
      currentPage: "/dashboard",
      timeOnSite: "2m 12s",
      predictedAction: "Bounce",
      confidence: 91,
      churnRisk: 78,
      sessionValue: "$0",
      behaviorPattern: "Quick Browser",
      nextClickPrediction: "Back Button",
      exitProbability: 89,
      conversionScore: 23
    }
  ];

  const behaviorInsights = {
    activeUsers: 1247,
    avgSessionTime: "8m 34s",
    predictedConversions: 23,
    preventedChurns: 8,
    realTimeRevenue: "$12,450",
    behaviorAccuracy: 94
  };

  const predictivePatterns = [
    {
      pattern: "Pricing Page Lingering",
      description: "Users spending 3+ minutes on pricing",
      frequency: 156,
      conversionRate: 67,
      predictedOutcome: "Premium plan purchase",
      confidenceScore: 89,
      trend: "increasing"
    },
    {
      pattern: "Feature Comparison",
      description: "Multiple feature page visits",
      frequency: 234,
      conversionRate: 42,
      predictedOutcome: "Trial signup",
      confidenceScore: 76,
      trend: "stable"
    },
    {
      pattern: "Support Documentation",
      description: "Extensive help section browsing",
      frequency: 89,
      conversionRate: 23,
      predictedOutcome: "Churn risk",
      confidenceScore: 84,
      trend: "concerning"
    },
    {
      pattern: "Mobile Speed Browsing",
      description: "Rapid page transitions on mobile",
      frequency: 345,
      conversionRate: 12,
      predictedOutcome: "Bounce",
      confidenceScore: 92,
      trend: "increasing"
    }
  ];

  const interventionOpportunities = [
    {
      userId: "user_002",
      trigger: "Extended research behavior detected",
      recommendation: "Offer personalized demo with sales expert",
      expectedImpact: "+45% conversion probability",
      timing: "Next 2 minutes",
      priority: "high"
    },
    {
      userId: "user_003",
      trigger: "High exit probability detected",
      recommendation: "Display exit-intent popup with discount",
      expectedImpact: "+23% retention",
      timing: "Immediate",
      priority: "urgent"
    },
    {
      userId: "user_001",
      trigger: "High purchase intent identified",
      recommendation: "Highlight limited-time premium offer",
      expectedImpact: "+67% upgrade probability",
      timing: "Within 30 seconds",
      priority: "medium"
    }
  ];

  const deviceInsights = [
    { device: "Mobile", users: 657, avgTime: "3m 12s", conversionRate: 23, revenue: "$4,230" },
    { device: "Desktop", users: 423, avgTime: "12m 45s", conversionRate: 45, revenue: "$6,780" },
    { device: "Tablet", users: 167, avgTime: "7m 23s", conversionRate: 31, revenue: "$1,440" }
  ];

  return (
    <div className="space-y-6">
      {/* AI Behavior Prediction Header */}
      <Card className="border-2 border-cyan-200 bg-gradient-to-r from-cyan-50 to-blue-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Activity className="h-6 w-6 text-cyan-600" />
                AI Behavior Prediction Engine
              </CardTitle>
              <CardDescription>
                Revolutionary real-time user behavior analysis with predictive intervention capabilities
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-green-50 border-green-500 text-green-700">
                Live Tracking: {behaviorInsights.activeUsers} users
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Live Behavior Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cyan-600">{behaviorInsights.activeUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">Currently online</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Avg Session</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{behaviorInsights.avgSessionTime}</div>
            <p className="text-xs text-muted-foreground mt-1">Time on site</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Predicted Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{behaviorInsights.predictedConversions}</div>
            <p className="text-xs text-muted-foreground mt-1">Next hour</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Prevented Churns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{behaviorInsights.preventedChurns}</div>
            <p className="text-xs text-muted-foreground mt-1">AI interventions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Live Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{behaviorInsights.realTimeRevenue}</div>
            <p className="text-xs text-muted-foreground mt-1">Current session</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Prediction Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{behaviorInsights.behaviorAccuracy}%</div>
            <p className="text-xs text-muted-foreground mt-1">AI confidence</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="live" className="w-full">
        <TabsList className="flex flex-wrap h-auto items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-full gap-1">
          <TabsTrigger value="live">Live Users</TabsTrigger>
          <TabsTrigger value="patterns">Behavior Patterns</TabsTrigger>
          <TabsTrigger value="interventions">AI Interventions</TabsTrigger>
          <TabsTrigger value="insights">Device Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Real-time User Behavior Tracking
              </CardTitle>
              <CardDescription>
                Live prediction of user actions and intervention opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {liveUsers.map((user) => (
                  <div key={user.id} className="border rounded-lg p-4 space-y-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                        <div>
                          <span className="font-medium">{user.id}</span>
                          <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                            <Globe className="h-3 w-3" />
                            {user.location}
                            <div className="flex items-center gap-1">
                              {user.device.includes('iPhone') ? <Smartphone className="h-3 w-3" /> :
                               user.device.includes('MacBook') ? <Monitor className="h-3 w-3" /> :
                               <Tablet className="h-3 w-3" />}
                              {user.device}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={user.churnRisk > 50 ? 'destructive' : user.churnRisk > 25 ? 'secondary' : 'default'}>
                          {user.churnRisk}% churn risk
                        </Badge>
                        <Badge variant="outline">
                          Score: {user.conversionScore}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Current Activity</h4>
                        <div className="space-y-1 text-sm">
                          <div>Page: <span className="font-medium">{user.currentPage}</span></div>
                          <div>Time: <span className="font-medium">{user.timeOnSite}</span></div>
                          <div>Value: <span className="font-medium text-green-600">{user.sessionValue}</span></div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">AI Predictions</h4>
                        <div className="space-y-1 text-sm">
                          <div className="bg-blue-50 p-2 rounded">
                            <strong>Next Action:</strong> {user.predictedAction}
                          </div>
                          <div className="text-muted-foreground">
                            Confidence: {user.confidence}%
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Behavior Analysis</h4>
                        <div className="space-y-1 text-sm">
                          <Badge variant="outline" className="text-xs">
                            {user.behaviorPattern}
                          </Badge>
                          <div className="text-muted-foreground">
                            Next click: {user.nextClickPrediction}
                          </div>
                          <div className="text-muted-foreground">
                            Exit prob: {user.exitProbability}%
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Intervention</h4>
                        {user.churnRisk > 50 ? (
                          <Button size="sm" variant="destructive" className="w-full">
                            Emergency Intervention
                          </Button>
                        ) : user.conversionScore > 80 ? (
                          <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                            Conversion Assist
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" className="w-full">
                            Monitor
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <div className="flex items-center justify-between text-sm">
                        <span>Conversion Probability</span>
                        <span className="font-medium">{user.conversionScore}%</span>
                      </div>
                      <Progress value={user.conversionScore} className="mt-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                AI-Detected Behavior Patterns
              </CardTitle>
              <CardDescription>
                Machine learning identified patterns that predict user actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictivePatterns.map((pattern, idx) => (
                  <div key={idx} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{pattern.pattern}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant={pattern.trend === 'increasing' ? 'default' : pattern.trend === 'concerning' ? 'destructive' : 'secondary'}>
                          {pattern.trend}
                        </Badge>
                        <Badge variant="outline">
                          {pattern.confidenceScore}% confidence
                        </Badge>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">{pattern.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Frequency</div>
                        <div className="text-lg font-semibold">{pattern.frequency} occurrences</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Conversion Rate</div>
                        <div className="text-lg font-semibold text-green-600">{pattern.conversionRate}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Predicted Outcome</div>
                        <div className="text-sm font-medium">{pattern.predictedOutcome}</div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                      <div className="text-sm font-medium text-blue-700">AI Recommendation</div>
                      <div className="text-sm text-blue-600 mt-1">
                        {pattern.conversionRate > 50 ? 
                          "Optimize for this pattern - high conversion potential" :
                          pattern.trend === 'concerning' ?
                          "Implement intervention strategies to reduce churn" :
                          "Monitor pattern evolution and test improvements"
                        }
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interventions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MousePointer className="h-5 w-5" />
                AI-Powered Intervention Opportunities
              </CardTitle>
              <CardDescription>
                Real-time recommendations to influence user behavior and increase conversions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {interventionOpportunities.map((intervention, idx) => (
                  <div key={idx} className={`border rounded-lg p-4 space-y-3 ${
                    intervention.priority === 'urgent' ? 'border-red-200 bg-red-50' :
                    intervention.priority === 'high' ? 'border-orange-200 bg-orange-50' :
                    'border-blue-200 bg-blue-50'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">User: {intervention.userId}</h3>
                        <p className="text-sm text-muted-foreground">{intervention.trigger}</p>
                      </div>
                      <Badge variant={
                        intervention.priority === 'urgent' ? 'destructive' :
                        intervention.priority === 'high' ? 'default' :
                        'secondary'
                      }>
                        {intervention.priority} priority
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Recommended Action</h4>
                        <p className="text-sm bg-white p-3 rounded border-l-4 border-green-500">
                          {intervention.recommendation}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Expected Impact</h4>
                        <div className="space-y-2">
                          <div className="text-lg font-semibold text-green-600">
                            {intervention.expectedImpact}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Timing: {intervention.timing}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className={
                        intervention.priority === 'urgent' ? 'bg-red-600 hover:bg-red-700' :
                        intervention.priority === 'high' ? 'bg-orange-600 hover:bg-orange-700' :
                        'bg-blue-600 hover:bg-blue-700'
                      }>
                        Execute Intervention
                      </Button>
                      <Button size="sm" variant="outline">
                        Schedule Later
                      </Button>
                      <Button size="sm" variant="outline">
                        A/B Test First
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Device Behavior Intelligence
              </CardTitle>
              <CardDescription>
                AI analysis of user behavior patterns across different devices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {deviceInsights.map((device, idx) => (
                    <div key={idx} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold flex items-center gap-2">
                          {device.device === 'Mobile' ? <Smartphone className="h-4 w-4" /> :
                           device.device === 'Desktop' ? <Monitor className="h-4 w-4" /> :
                           <Tablet className="h-4 w-4" />}
                          {device.device}
                        </h3>
                        <Badge variant="outline">{device.users} users</Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Avg Session Time</span>
                          <span className="font-medium">{device.avgTime}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Conversion Rate</span>
                          <span className="font-medium text-green-600">{device.conversionRate}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Revenue</span>
                          <span className="font-medium text-blue-600">{device.revenue}</span>
                        </div>
                      </div>

                      <Progress value={device.conversionRate} className="h-2" />
                    </div>
                  ))}
                </div>

                <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-purple-700 mb-3">Cross-Device AI Insights</h4>
                  <ul className="text-sm text-purple-600 space-y-2">
                    <li>• Mobile users have 67% shorter attention spans but higher impulse purchase rates</li>
                    <li>• Desktop users research 3x longer but have 2x higher average order values</li>
                    <li>• Tablet users show highest engagement with visual content and demos</li>
                    <li>• Cross-device journeys have 45% higher conversion rates than single-device</li>
                    <li>• AI predicts 23% of mobile browsers will return on desktop within 24 hours</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}