import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  DollarSign, 
  Users, 
  ShoppingCart, 
  Package,
  Clock,
  MapPin,
  Star,
  Zap
} from "lucide-react";

const realtimeMetrics = [
  {
    title: "Live Sales",
    value: "$1,245",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    period: "Today",
    lastUpdate: "2 min ago"
  },
  {
    title: "Active Customers",
    value: "23",
    change: "+15%",
    trend: "up", 
    icon: Users,
    period: "Right Now",
    lastUpdate: "Live"
  },
  {
    title: "Orders/Hour",
    value: "47",
    change: "-8%",
    trend: "down",
    icon: ShoppingCart,
    period: "Current Hour",
    lastUpdate: "30 sec ago"
  },
  {
    title: "Avg Order Value",
    value: "$18.50",
    change: "+5.2%",
    trend: "up",
    icon: TrendingUp,
    period: "Today",
    lastUpdate: "1 min ago"
  }
];

const topProducts = [
  { name: "Espresso Coffee", sales: 156, revenue: 546, trend: "+12%", category: "Beverages" },
  { name: "Croissant Sandwich", sales: 89, revenue: 712, trend: "+8%", category: "Food" },
  { name: "Latte (Large)", sales: 134, revenue: 570, trend: "+15%", category: "Beverages" },
  { name: "Blueberry Muffin", sales: 67, revenue: 251, trend: "-3%", category: "Pastries" },
  { name: "Caesar Salad", sales: 45, revenue: 428, trend: "+22%", category: "Food" }
];

const hourlyActivity = [
  { hour: "9 AM", sales: 1200, orders: 45, traffic: 78 },
  { hour: "10 AM", sales: 1800, orders: 67, traffic: 92 },
  { hour: "11 AM", sales: 2400, orders: 89, traffic: 115 },
  { hour: "12 PM", sales: 3200, orders: 125, traffic: 156 },
  { hour: "1 PM", sales: 3800, orders: 142, traffic: 178 },
  { hour: "2 PM", sales: 2900, orders: 98, traffic: 134 },
  { hour: "3 PM", sales: 2100, orders: 76, traffic: 98 },
  { hour: "4 PM", sales: 1800, orders: 65, traffic: 87 }
];

const geographicData = [
  { location: "Downtown Area", customers: 487, revenue: 15620, percentage: 45.2 },
  { location: "Business District", customers: 298, revenue: 12450, percentage: 28.7 },
  { location: "Residential North", customers: 156, revenue: 7890, percentage: 18.3 },
  { location: "University Campus", customers: 89, revenue: 3240, percentage: 7.8 }
];

const customerBehavior = [
  {
    metric: "Avg Visit Duration",
    value: "23 min",
    change: "+2 min",
    insight: "Customers staying longer, indicates satisfaction"
  },
  {
    metric: "Return Rate",
    value: "68%",
    change: "+5%",
    insight: "Strong loyalty, repeat business growing"
  },
  {
    metric: "Peak Hours",
    value: "12-2 PM",
    change: "Stable",
    insight: "Lunch rush consistent, plan staffing accordingly"
  },
  {
    metric: "Mobile Orders",
    value: "34%",
    change: "+12%",
    insight: "Digital adoption increasing, invest in app features"
  }
];

export function RealTimeAnalytics() {
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  const getMaxHourlyValue = () => Math.max(...hourlyActivity.map(h => h.sales));

  return (
    <div className="space-y-6">
      {/* Real-time Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {realtimeMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{metric.title}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {metric.lastUpdate}
                  </Badge>
                </div>
                
                <div className="mt-2">
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="flex items-center gap-1 text-xs">
                    <span className={`font-medium ${
                      metric.trend === "up" ? "text-success" : "text-destructive"
                    }`}>
                      {metric.change}
                    </span>
                    <span className="text-muted-foreground">{metric.period}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Top Performing Products
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-xs text-muted-foreground">{product.category}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{formatCurrency(product.revenue)}</div>
                  <div className="text-xs text-muted-foreground">
                    {product.sales} sold
                  </div>
                  <div className={`text-xs font-medium ${
                    product.trend.startsWith('+') ? "text-success" : "text-destructive"
                  }`}>
                    {product.trend}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Geographic Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Customer Geographic Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {geographicData.map((location) => (
              <div key={location.location} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{location.location}</span>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(location.revenue)}</div>
                    <div className="text-xs text-muted-foreground">
                      {location.customers} customers
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Market Share</span>
                    <span>{location.percentage}%</span>
                  </div>
                  <Progress value={location.percentage} className="h-2" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Hourly Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Today's Hourly Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {hourlyActivity.map((hour) => {
              const salesPercentage = (hour.sales / getMaxHourlyValue()) * 100;
              return (
                <div key={hour.hour} className="flex items-center gap-4">
                  <div className="w-16 text-sm font-medium">{hour.hour}</div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Sales: {formatCurrency(hour.sales)}</span>
                      <span>{hour.orders} orders • {hour.traffic} visitors</span>
                    </div>
                    <Progress value={salesPercentage} className="h-2" />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Customer Behavior Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            AI Customer Behavior Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {customerBehavior.map((behavior) => (
              <div key={behavior.metric} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{behavior.metric}</h4>
                  <Badge variant="outline">{behavior.change}</Badge>
                </div>
                <div className="text-2xl font-bold mb-2">{behavior.value}</div>
                <p className="text-sm text-muted-foreground">{behavior.insight}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}