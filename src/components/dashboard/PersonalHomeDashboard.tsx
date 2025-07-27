import { 
  Home, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Package,
  Receipt,
  PiggyBank,
  ShoppingCart,
  AlertTriangle,
  CheckCircle,
  Plus,
  Eye,
  Coffee,
  Heart
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const homeOverview = [
  {
    title: "Money Spent",
    value: "$1,247",
    note: "This month so far",
    icon: Receipt,
    color: "text-red-600",
    bgColor: "bg-red-50",
    detail: "Mostly groceries & gas"
  },
  {
    title: "Money Coming In",
    value: "$3,850",
    note: "This month",
    icon: DollarSign,
    color: "text-green-600", 
    bgColor: "bg-green-50",
    detail: "Salary & side work"
  },
  {
    title: "Savings Jar",
    value: "$2,450",
    note: "Emergency fund",
    icon: PiggyBank,
    color: "text-blue-600",
    bgColor: "bg-blue-50", 
    detail: "Getting there slowly!"
  }
];

const homeItems = [
  { item: "Milk", location: "Fridge", status: "Need more", icon: ShoppingCart },
  { item: "Bread", location: "Pantry", status: "All out", icon: AlertTriangle },
  { item: "Coffee", location: "Kitchen", status: "Running low", icon: Coffee },
  { item: "Apples", location: "Counter", status: "Fresh", icon: CheckCircle }
];

const recentPurchases = [
  { what: "Groceries at Walmart", cost: "$87.23", when: "Today" },
  { what: "Gas fill-up", cost: "$34.50", when: "Yesterday" },
  { what: "Electric bill", cost: "$76.45", when: "2 days ago" },
  { what: "Coffee & snacks", cost: "$12.80", when: "3 days ago" }
];

const homeActions = [
  { title: "Spent Money", icon: Receipt },
  { title: "Got Money", icon: DollarSign },
  { title: "Check Pantry", icon: Package },
  { title: "Need to Buy", icon: ShoppingCart }
];

export function PersonalHomeDashboard() {
  return (
    <div className="space-y-6">
      {/* Home Overview Header */}
      <Card className="card-accent">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                <Home className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl text-foreground">My Home 🏠</CardTitle>
                <p className="text-sm text-muted-foreground">Keep track of what you spend and what you have</p>
              </div>
            </div>
            <Badge className="bg-accent/10 text-accent border border-accent/20">
              <Heart className="h-3 w-3 mr-1" />
              Personal
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Simple Money Overview */}
      <div className="grid gap-6 md:grid-cols-3">
        {homeOverview.map((item, index) => {
          const Icon = item.icon;
          
          return (
            <Card key={item.title} className="card-floating group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {item.title}
                </CardTitle>
                <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/15 transition-colors duration-200">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              
              <CardContent className="space-y-2">
                <div className="text-2xl font-bold text-foreground">{item.value}</div>
                <div className="text-sm text-muted-foreground">{item.note}</div>
                <div className="text-xs text-primary/80 italic">{item.detail}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* What I Can Do */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-purple-600" />
            What I Can Do
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {homeActions.map((action, index) => (
              <Button
                key={action.title}
                variant="outline"
                className="h-16 flex flex-col items-center gap-1"
              >
                <action.icon className="h-5 w-5" />
                <span className="text-xs">{action.title}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* What I Have & What I Bought */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Things at Home */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-orange-600" />
              Things at Home
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {homeItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-full ${
                      item.status === 'All out' ? 'bg-red-100 text-red-600' :
                      item.status === 'Need more' || item.status === 'Running low' ? 'bg-orange-100 text-orange-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      <item.icon className="h-3 w-3" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{item.item}</div>
                      <div className="text-xs text-muted-foreground">{item.location}</div>
                    </div>
                  </div>
                  <Badge variant={
                    item.status === 'All out' ? 'destructive' :
                    item.status === 'Need more' || item.status === 'Running low' ? 'secondary' : 'outline'
                  } className="text-xs">
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* What I Bought Recently */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5 text-pink-600" />
              What I Bought Recently
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentPurchases.map((purchase, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                  <div>
                    <div className="font-medium text-sm">{purchase.what}</div>
                    <div className="text-xs text-muted-foreground">{purchase.when}</div>
                  </div>
                  <div className="font-semibold text-red-600">{purchase.cost}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}