import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Calendar, Clock, CheckCircle, Package, FileText, CreditCard, Shield } from "lucide-react";

export function PersonalExpiryMatrix() {
  // Calculate dates relative to today
  const today = new Date();
  const formatDate = (daysFromNow: number) => {
    const date = new Date(today);
    date.setDate(date.getDate() + daysFromNow);
    return date.toISOString().split('T')[0];
  };

  const expiringItems = [
    { 
      item: "Milk", 
      category: "Food", 
      expiryDate: formatDate(3), 
      daysLeft: 3, 
      status: "urgent",
      location: "Refrigerator",
      icon: Package
    },
    { 
      item: "Car Insurance", 
      category: "Insurance", 
      expiryDate: formatDate(49), 
      daysLeft: 49, 
      status: "warning",
      location: "Documents",
      icon: Shield
    },
    { 
      item: "Passport", 
      category: "Documents", 
      expiryDate: formatDate(508), 
      daysLeft: 508, 
      status: "good",
      location: "Safe",
      icon: FileText
    },
    { 
      item: "Credit Card", 
      category: "Financial", 
      expiryDate: formatDate(95), 
      daysLeft: 95, 
      status: "warning",
      location: "Wallet",
      icon: CreditCard
    },
    { 
      item: "Bread", 
      category: "Food", 
      expiryDate: formatDate(1), 
      daysLeft: 1, 
      status: "critical",
      location: "Kitchen Counter",
      icon: Package
    },
    { 
      item: "Yogurt", 
      category: "Food", 
      expiryDate: formatDate(5), 
      daysLeft: 5, 
      status: "urgent",
      location: "Refrigerator",
      icon: Package
    },
    { 
      item: "Vitamins", 
      category: "Health", 
      expiryDate: formatDate(201), 
      daysLeft: 201, 
      status: "good",
      location: "Medicine Cabinet",
      icon: Package
    },
    { 
      item: "Netflix Subscription", 
      category: "Subscription", 
      expiryDate: formatDate(16), 
      daysLeft: 16, 
      status: "warning",
      location: "Digital",
      icon: CreditCard
    },
    { 
      item: "Laptop Warranty", 
      category: "Warranty", 
      expiryDate: formatDate(310), 
      daysLeft: 310, 
      status: "good",
      location: "Electronics",
      icon: Shield
    },
    { 
      item: "Driver's License", 
      category: "Documents", 
      expiryDate: formatDate(180), 
      daysLeft: 180, 
      status: "good",
      location: "Wallet",
      icon: FileText
    },
    { 
      item: "Cheese", 
      category: "Food", 
      expiryDate: formatDate(8), 
      daysLeft: 8, 
      status: "warning",
      location: "Refrigerator",
      icon: Package
    },
    { 
      item: "Spotify Premium", 
      category: "Subscription", 
      expiryDate: formatDate(22), 
      daysLeft: 22, 
      status: "warning",
      location: "Digital",
      icon: CreditCard
    }
  ];

  const categoryStats = [
    { category: "Food", total: 4, expiring: 3, urgent: 2 },
    { category: "Documents", total: 2, expiring: 0, urgent: 0 },
    { category: "Insurance", total: 1, expiring: 1, urgent: 0 },
    { category: "Subscriptions", total: 2, expiring: 2, urgent: 0 },
    { category: "Warranties", total: 1, expiring: 0, urgent: 0 },
    { category: "Health", total: 1, expiring: 0, urgent: 0 },
    { category: "Financial", total: 1, expiring: 1, urgent: 0 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "destructive";
      case "urgent": return "destructive";
      case "warning": return "secondary";
      case "good": return "default";
      default: return "outline";
    }
  };

  const getStatusIcon = (daysLeft: number) => {
    if (daysLeft <= 3) return <AlertTriangle className="h-4 w-4 text-red-500" />;
    if (daysLeft <= 30) return <Clock className="h-4 w-4 text-orange-500" />;
    return <CheckCircle className="h-4 w-4 text-green-500" />;
  };

  const urgentItems = expiringItems.filter(item => item.daysLeft <= 7);
  const warningItems = expiringItems.filter(item => item.daysLeft > 7 && item.daysLeft <= 30);
  const criticalItems = expiringItems.filter(item => item.daysLeft <= 3);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              Critical (≤3 days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{criticalItems.length}</div>
            <div className="text-xs text-muted-foreground">Items need immediate attention</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-orange-500" />
              Urgent (≤7 days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{urgentItems.length}</div>
            <div className="text-xs text-muted-foreground">Items expiring soon</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-yellow-500" />
              Warning (≤30 days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">{warningItems.length}</div>
            <div className="text-xs text-muted-foreground">Items to monitor</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Total Tracked
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{expiringItems.length}</div>
            <div className="text-xs text-muted-foreground">All monitored items</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Expiry Matrix - All Items
          </CardTitle>
          <CardDescription>
            Track expiration dates for food, documents, subscriptions, and warranties
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {expiringItems
              .sort((a, b) => a.daysLeft - b.daysLeft)
              .map((item, index) => (
                <div key={index} className="p-4 border rounded-lg bg-card hover:bg-muted/50 transition-colors shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {getStatusIcon(item.daysLeft)}
                      <item.icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-medium text-foreground truncate">{item.item}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="truncate">{item.location}</span>
                          <span>•</span>
                          <span className="truncate">Expires: {item.expiryDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge variant="outline" className="text-xs whitespace-nowrap">
                        {item.category}
                      </Badge>
                      <Badge variant={getStatusColor(item.status)} className="whitespace-nowrap">
                        {item.daysLeft === 0 ? "Today" : 
                         item.daysLeft === 1 ? "1 day" : 
                         `${item.daysLeft} days`}
                      </Badge>
                      <Button size="sm" variant="outline" className="whitespace-nowrap">
                        {item.daysLeft <= 3 ? "Replace" : "Extend"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Category Overview
          </CardTitle>
          <CardDescription>
            Expiration tracking by item category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryStats.map((category, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{category.category}</h3>
                  <Badge variant="outline">{category.total} items</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Expiring Soon:</span>
                    <span className="font-medium">{category.expiring}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Urgent:</span>
                    <span className="font-medium text-red-500">{category.urgent}</span>
                  </div>
                  <Progress 
                    value={(category.expiring / category.total) * 100} 
                    className="h-2"
                  />
                </div>
                <Button size="sm" variant="outline" className="w-full">
                  View {category.category}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            Smart Expiry Insights
          </CardTitle>
          <CardDescription>
            AI-powered recommendations for managing expiring items
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4 space-y-3 border-red-200 bg-red-50 dark:bg-red-950/20">
              <div className="flex items-center justify-between">
                <Badge variant="destructive">Critical Alert</Badge>
                <span className="text-sm text-muted-foreground">Food Items</span>
              </div>
              <div>
                <h4 className="font-medium mb-2">Immediate Action Required</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  2 food items expire within 3 days. Consider using them today or donating if still good.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-red-600">
                    Items: Milk (3 days), Bread (1 day)
                  </span>
                  <Button size="sm">Create Meal Plan</Button>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 space-y-3 border-orange-200 bg-orange-50 dark:bg-orange-950/20">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">Subscription Alert</Badge>
                <span className="text-sm text-muted-foreground">Netflix</span>
              </div>
              <div>
                <h4 className="font-medium mb-2">Subscription Renewal Due</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Netflix subscription expires in 16 days. Review usage to decide on renewal.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-orange-600">
                    Monthly cost: $15.99 • Usage: 12 hours last month
                  </span>
                  <Button size="sm" variant="outline">Review Usage</Button>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 space-y-3 border-blue-200 bg-blue-50 dark:bg-blue-950/20">
              <div className="flex items-center justify-between">
                <Badge variant="default">Optimization Tip</Badge>
                <span className="text-sm text-muted-foreground">Shopping Pattern</span>
              </div>
              <div>
                <h4 className="font-medium mb-2">Smart Shopping Schedule</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Based on your consumption patterns, you typically buy milk every 5 days. Next purchase recommended: Jan 30th.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-600">
                    Potential waste reduction: 15% with optimized timing
                  </span>
                  <Button size="sm" variant="outline">Set Reminder</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}