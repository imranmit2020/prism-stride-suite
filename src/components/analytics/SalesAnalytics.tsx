import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Target,
  Calendar,
  Users,
  Package,
  Zap,
  BarChart3,
  PieChart,
  LineChart
} from "lucide-react";

const salesMetrics = [
  {
    title: "Total Revenue",
    value: "$847,235",
    change: "+18.3%",
    trend: "up",
    target: "850K",
    progress: 99.7,
    icon: DollarSign
  },
  {
    title: "Sales Growth",
    value: "+23.5%",
    change: "+5.2% vs target",
    trend: "up",
    target: "18%",
    progress: 130.6,
    icon: TrendingUp
  },
  {
    title: "Conversion Rate",
    value: "3.8%",
    change: "+0.7%",
    trend: "up",
    target: "3.5%",
    progress: 108.6,
    icon: Target
  },
  {
    title: "Avg Order Value",
    value: "$127",
    change: "+$12",
    trend: "up",
    target: "$120",
    progress: 105.8,
    icon: Package
  }
];

const salesChannels = [
  { name: "Online Store", revenue: 425000, percentage: 50.2, growth: "+25%", orders: 3420 },
  { name: "Retail Stores", revenue: 298000, percentage: 35.2, growth: "+12%", orders: 1890 },
  { name: "Mobile App", revenue: 89000, percentage: 10.5, growth: "+45%", orders: 967 },
  { name: "Social Commerce", revenue: 35235, percentage: 4.1, growth: "+78%", orders: 234 }
];

const topProducts = [
  { name: "Premium Coffee Blend", revenue: 127000, units: 2340, growth: "+32%" },
  { name: "Artisan Pastries", revenue: 89000, units: 4560, growth: "+18%" },
  { name: "Specialty Teas", revenue: 67000, units: 1890, growth: "+25%" },
  { name: "Cold Brew", revenue: 54000, units: 2100, growth: "+67%" },
  { name: "Breakfast Items", revenue: 43000, units: 1560, growth: "+15%" }
];

const salesTeamPerformance = [
  { name: "Sarah Johnson", target: 50000, achieved: 62000, percentage: 124, deals: 24 },
  { name: "Mike Chen", target: 45000, achieved: 51000, percentage: 113, deals: 19 },
  { name: "Emily Davis", target: 48000, achieved: 52000, percentage: 108, deals: 21 },
  { name: "David Wilson", target: 42000, achieved: 44000, percentage: 105, deals: 17 },
  { name: "Lisa Park", target: 47000, achieved: 46000, percentage: 98, deals: 18 }
];

const salesForecast = [
  { period: "Current Month", predicted: 89000, confidence: 94, trend: "up" },
  { period: "Next Month", predicted: 95000, confidence: 87, trend: "up" },
  { period: "Next Quarter", predicted: 280000, confidence: 82, trend: "up" },
  { period: "Next Year", predicted: 1200000, confidence: 76, trend: "up" }
];

export function SalesAnalytics() {
  const [timeRange, setTimeRange] = useState("3months");
  const [selectedMetric, setSelectedMetric] = useState("revenue");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Sales Analytics</h2>
          <p className="text-muted-foreground">Comprehensive sales performance and forecasting</p>
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
          <Button>Export Dashboard</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="flex flex-wrap h-auto items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-full gap-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="forecast">Forecast</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {salesMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <Card key={metric.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-2">{metric.value}</div>
                    <div className={`text-xs flex items-center mb-3 ${
                      metric.trend === "up" ? "text-success" : "text-destructive"
                    }`}>
                      {metric.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {metric.change} from last period
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Target: {metric.target}</span>
                        <span>{metric.progress.toFixed(1)}%</span>
                      </div>
                      <Progress value={Math.min(metric.progress, 100)} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Sales Trend Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5" />
                Sales Trend Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Interactive sales trend chart</p>
                  <p className="text-sm text-muted-foreground">Showing revenue, orders, and growth over time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales Channel Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {salesChannels.map((channel) => (
                  <div key={channel.name} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{channel.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {channel.orders.toLocaleString()} orders • {channel.percentage}% of total revenue
                        </p>
                      </div>
                      <Badge variant="secondary">{channel.growth}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Revenue</p>
                        <p className="text-2xl font-bold">${channel.revenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Market Share</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={channel.percentage} className="flex-1" />
                          <span className="text-sm font-medium">{channel.percentage}%</span>
                        </div>
                      </div>
                      <div className="flex items-end">
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {product.units.toLocaleString()} units sold
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">${product.revenue.toLocaleString()}</div>
                      <Badge variant="secondary">{product.growth}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Sales Team Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {salesTeamPerformance.map((member) => (
                  <div key={member.name} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {member.deals} deals closed this period
                      </p>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Target: ${member.target.toLocaleString()}</span>
                        <span>Achieved: ${member.achieved.toLocaleString()}</span>
                      </div>
                      <Progress value={Math.min(member.percentage, 100)} className="h-2" />
                    </div>
                    <div className="text-right">
                      <div className={`font-bold text-lg ${
                        member.percentage >= 100 ? "text-success" : "text-warning"
                      }`}>
                        {member.percentage}%
                      </div>
                      <Badge variant={member.percentage >= 100 ? "default" : "secondary"}>
                        {member.percentage >= 100 ? "Target Met" : "In Progress"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecast" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  AI Sales Forecast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {salesForecast.map((forecast) => (
                    <div key={forecast.period} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{forecast.period}</h4>
                        <Badge variant="secondary">{forecast.confidence}% confidence</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">
                          ${forecast.predicted.toLocaleString()}
                        </span>
                        <div className={`flex items-center ${
                          forecast.trend === "up" ? "text-success" : "text-destructive"
                        }`}>
                          {forecast.trend === "up" ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Growth Drivers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Seasonal Trends</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Holiday season expected to boost sales by 35%
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">Impact</span>
                      <span className="font-medium text-success">+$85K</span>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">New Product Launch</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Premium line launching next quarter
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">Impact</span>
                      <span className="font-medium text-success">+$67K</span>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Market Expansion</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Entering 3 new geographic markets
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">Impact</span>
                      <span className="font-medium text-success">+$124K</span>
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