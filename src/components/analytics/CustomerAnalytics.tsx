import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  TrendingUp, 
  TrendingDown, 
  Heart, 
  DollarSign,
  Clock,
  Target,
  Gift,
  Award,
  ChevronRight
} from "lucide-react";

const customerSegments = [
  {
    name: "VIP Customers",
    count: 1247,
    percentage: 8.2,
    revenue: 420000,
    avgOrder: 175,
    frequency: 3.2,
    retention: 94,
    growth: "+12%",
    color: "text-yellow-600"
  },
  {
    name: "Loyal Customers",
    count: 4521,
    percentage: 29.8,
    revenue: 890000,
    avgOrder: 85,
    frequency: 2.1,
    retention: 87,
    growth: "+8%",
    color: "text-blue-600"
  },
  {
    name: "Regular Customers",
    count: 6834,
    percentage: 45.1,
    revenue: 680000,
    avgOrder: 45,
    frequency: 1.3,
    retention: 62,
    growth: "+3%",
    color: "text-green-600"
  },
  {
    name: "New Customers",
    count: 2567,
    percentage: 16.9,
    revenue: 180000,
    avgOrder: 32,
    frequency: 1.0,
    retention: 45,
    growth: "+24%",
    color: "text-purple-600"
  }
];

const customerJourney = [
  { stage: "Awareness", count: 15000, conversion: 35, avgTime: "2 days" },
  { stage: "Interest", count: 5250, conversion: 45, avgTime: "4 days" },
  { stage: "Consideration", count: 2362, conversion: 60, avgTime: "7 days" },
  { stage: "Purchase", count: 1417, conversion: 85, avgTime: "1 day" },
  { stage: "Retention", count: 1204, conversion: 78, avgTime: "ongoing" },
  { stage: "Advocacy", count: 939, conversion: 92, avgTime: "3 months" }
];

const loyaltyMetrics = [
  {
    title: "Average Customer Lifetime",
    value: "2.3 years",
    change: "+15%",
    trend: "up",
    icon: Clock
  },
  {
    title: "Customer Lifetime Value",
    value: "$1,847",
    change: "+22%",
    trend: "up",
    icon: DollarSign
  },
  {
    title: "Net Promoter Score",
    value: "73",
    change: "+8 points",
    trend: "up",
    icon: Award
  },
  {
    title: "Repeat Purchase Rate",
    value: "68%",
    change: "+5%",
    trend: "up",
    icon: Target
  }
];

export function CustomerAnalytics() {
  const [timeRange, setTimeRange] = useState("3months");
  const [selectedSegment, setSelectedSegment] = useState("all");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Customer Analytics</h2>
          <p className="text-muted-foreground">Deep insights into customer behavior and value</p>
        </div>
        <div className="flex gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">1 Month</SelectItem>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Button>Export Report</Button>
        </div>
      </div>

      <Tabs defaultValue="segments" className="w-full">
        <TabsList className="flex flex-wrap h-auto items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-full gap-1">
          <TabsTrigger value="segments">Segments</TabsTrigger>
          <TabsTrigger value="journey">Journey</TabsTrigger>
          <TabsTrigger value="loyalty">Loyalty</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="segments" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {loyaltyMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <Card key={metric.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <div className={`text-xs flex items-center ${
                      metric.trend === "up" ? "text-success" : "text-destructive"
                    }`}>
                      {metric.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {metric.change} from last period
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Customer Segments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Customer Segments Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {customerSegments.map((segment) => (
                  <div key={segment.name} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className={`font-semibold text-lg ${segment.color}`}>
                          {segment.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {segment.count.toLocaleString()} customers ({segment.percentage}% of total)
                        </p>
                      </div>
                      <Badge variant="secondary">{segment.growth}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Revenue</p>
                        <p className="font-medium">${segment.revenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Avg Order</p>
                        <p className="font-medium">${segment.avgOrder}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Frequency</p>
                        <p className="font-medium">{segment.frequency}x/month</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Retention</p>
                        <div className="flex items-center gap-2">
                          <Progress value={segment.retention} className="w-16" />
                          <span className="text-sm font-medium">{segment.retention}%</span>
                        </div>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">
                          <ChevronRight className="h-4 w-4" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="journey" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Journey Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customerJourney.map((stage, index) => (
                  <div key={stage.stage} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{stage.stage}</h3>
                      <p className="text-sm text-muted-foreground">
                        {stage.count.toLocaleString()} customers • Avg time: {stage.avgTime}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-lg">{stage.conversion}%</div>
                      <div className="text-xs text-muted-foreground">Conversion</div>
                    </div>
                    <Progress value={stage.conversion} className="w-24" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loyalty" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Customer Satisfaction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Very Satisfied</span>
                    <div className="flex items-center gap-2">
                      <Progress value={78} className="w-24" />
                      <span className="font-medium">78%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Satisfied</span>
                    <div className="flex items-center gap-2">
                      <Progress value={16} className="w-24" />
                      <span className="font-medium">16%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Neutral</span>
                    <div className="flex items-center gap-2">
                      <Progress value={4} className="w-24" />
                      <span className="font-medium">4%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Dissatisfied</span>
                    <div className="flex items-center gap-2">
                      <Progress value={2} className="w-24" />
                      <span className="font-medium">2%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-purple-500" />
                  Loyalty Program Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Active Members</span>
                    <span className="font-medium">8,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Enrollment Rate</span>
                    <span className="font-medium">67%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Points Redeemed</span>
                    <span className="font-medium">245K</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Points/Customer</span>
                    <span className="font-medium">1,247</span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex justify-between">
                      <span className="font-medium">Program ROI</span>
                      <span className="font-bold text-success">+340%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Churn Risk Prediction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-destructive">High Risk</span>
                      <Badge variant="destructive">156 customers</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Likely to churn in next 30 days
                    </p>
                  </div>
                  <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-warning">Medium Risk</span>
                      <Badge variant="secondary">342 customers</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Showing early warning signs
                    </p>
                  </div>
                  <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-success">Low Risk</span>
                      <Badge variant="secondary">7,249 customers</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Stable and engaged customers
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Growth Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Upsell Potential</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      1,847 customers likely to upgrade premium services
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">Potential Revenue</span>
                      <span className="font-medium text-success">+$127K</span>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Cross-sell Opportunities</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      2,345 customers interested in complementary products
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">Potential Revenue</span>
                      <span className="font-medium text-success">+$89K</span>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Win-back Campaign</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      567 lapsed customers with high reactivation probability
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">Potential Revenue</span>
                      <span className="font-medium text-success">+$43K</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}