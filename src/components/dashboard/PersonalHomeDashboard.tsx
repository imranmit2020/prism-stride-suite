import { 
  Home, 
  Heart,
  Calendar,
  ShoppingCart,
  Users,
  CheckCircle,
  Clock,
  Star,
  Gift,
  Coffee,
  Car,
  Utensils,
  Lightbulb,
  Sun
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const familyStats = [
  {
    title: "Family Budget",
    value: "$1,847",
    remaining: "of $3,000 spent",
    icon: Home,
    description: "this month",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    note: "Doing great!",
    progress: 62
  },
  {
    title: "Vacation Fund",
    value: "$2,450",
    remaining: "of $5,000 goal",
    icon: Gift,
    description: "saved so far",
    color: "text-green-600", 
    bgColor: "bg-green-50",
    note: "Almost halfway there!",
    progress: 49
  },
  {
    title: "Family Tasks",
    value: "8",
    remaining: "of 12 completed",
    icon: CheckCircle,
    description: "this week",
    color: "text-purple-600",
    bgColor: "bg-purple-50", 
    note: "Kids are helping more",
    progress: 67
  }
];

const todaySchedule = [
  { time: "8:00 AM", task: "School Drop-off", person: "Mom", icon: Car },
  { time: "10:30 AM", task: "Grocery Shopping", person: "Dad", icon: ShoppingCart },
  { time: "3:00 PM", task: "Soccer Practice", person: "Emma", icon: Star },
  { time: "6:00 PM", task: "Family Dinner", person: "Everyone", icon: Utensils }
];

const familyActions = [
  { title: "Add Chore", icon: CheckCircle },
  { title: "Plan Meal", icon: Utensils },
  { title: "Family Event", icon: Calendar },
  { title: "Shopping List", icon: ShoppingCart }
];

const weeklyGoals = [
  { goal: "Eat dinner together 5 times", current: 3, target: 5, icon: Utensils },
  { goal: "Kids complete homework", current: 4, target: 5, icon: Star },
  { goal: "Family exercise time", current: 2, target: 3, icon: Heart }
];

export function PersonalHomeDashboard() {
  return (
    <div className="space-y-6">
      {/* Family Home Header */}
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-xl">
                <Home className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <CardTitle className="text-xl text-orange-800">Welcome Home, Johnson Family! 👋</CardTitle>
                <p className="text-sm text-orange-600">Today is a beautiful {new Date().toLocaleDateString('en-US', { weekday: 'long' })}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-orange-500" />
              <span className="text-sm text-orange-700">72°F</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Family Overview */}
      <div className="grid gap-6 md:grid-cols-3">
        {familyStats.map((stat, index) => {
          const Icon = stat.icon;
          
          return (
            <Card key={stat.title} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-xl ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="text-2xl font-bold">{stat.value}</div>
                
                <div className="text-sm text-muted-foreground">{stat.remaining}</div>

                {stat.progress && (
                  <div className="space-y-1">
                    <Progress value={stat.progress} className="h-2" />
                    <div className="text-xs text-muted-foreground">{stat.progress}% complete</div>
                  </div>
                )}

                <div className="text-xs text-blue-600 italic">{stat.note}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Today's Schedule & Quick Family Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Today's Family Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Today's Family Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todaySchedule.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                  <div className="text-sm font-medium text-blue-600 w-16">{item.time}</div>
                  <div className="p-2 bg-blue-50 rounded-full">
                    <item.icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{item.task}</div>
                    <div className="text-sm text-muted-foreground">{item.person}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Family Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-pink-600" />
              Family Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {familyActions.map((action, index) => (
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
      </div>

      {/* This Week's Family Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-600" />
            This Week's Family Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyGoals.map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <goal.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{goal.goal}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{goal.current}/{goal.target}</span>
                </div>
                <Progress value={(goal.current / goal.target) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}