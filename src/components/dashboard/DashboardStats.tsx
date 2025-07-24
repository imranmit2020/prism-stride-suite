import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Package, Users, ShoppingCart } from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "$124,586",
    change: "+12.5%",
    trend: "up" as const,
    icon: DollarSign,
    description: "vs last month"
  },
  {
    title: "Active Inventory",
    value: "2,847",
    change: "-3.2%",
    trend: "down" as const,
    icon: Package,
    description: "items in stock"
  },
  {
    title: "Employees",
    value: "156",
    change: "+8.1%",
    trend: "up" as const,
    icon: Users,
    description: "active staff"
  },
  {
    title: "Daily Sales",
    value: "89",
    change: "+23.4%",
    trend: "up" as const,
    icon: ShoppingCart,
    description: "transactions today"
  }
];

export function DashboardStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
        
        return (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="flex items-center gap-1 text-xs mt-1">
                <TrendIcon 
                  className={`h-3 w-3 ${
                    stat.trend === "up" ? "text-success" : "text-destructive"
                  }`} 
                />
                <span 
                  className={`font-medium ${
                    stat.trend === "up" ? "text-success" : "text-destructive"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-muted-foreground">
                  {stat.description}
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}