import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const activities = [
  {
    id: 1,
    type: "sale",
    description: "New sale completed",
    amount: "$285.50",
    user: "John Smith",
    time: "2 minutes ago",
    status: "completed"
  },
  {
    id: 2,
    type: "inventory",
    description: "Low stock alert: Coffee Beans",
    amount: "12 units left",
    user: "System",
    time: "15 minutes ago",
    status: "warning"
  },
  {
    id: 3,
    type: "payroll",
    description: "Payroll processed for March",
    amount: "$45,230.00",
    user: "Sarah Johnson",
    time: "1 hour ago",
    status: "completed"
  },
  {
    id: 4,
    type: "invoice",
    description: "Invoice #INV-2024-003 sent",
    amount: "$1,250.00",
    user: "Mike Wilson",
    time: "2 hours ago",
    status: "pending"
  },
  {
    id: 5,
    type: "expense",
    description: "Office supplies expense",
    amount: "$124.99",
    user: "Lisa Chen",
    time: "3 hours ago",
    status: "completed"
  }
];

export function RecentActivity() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success text-success-foreground";
      case "warning":
        return "bg-warning text-warning-foreground";
      case "pending":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg border border-border">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">
                {activity.user.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">
                {activity.description}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground">
                  by {activity.user}
                </span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">
                  {activity.time}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">
                {activity.amount}
              </span>
              <Badge 
                variant="secondary"
                className={getStatusColor(activity.status)}
              >
                {activity.status}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}