import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Users, Package } from "lucide-react";

const quickActions = [
  {
    title: "New Sale",
    description: "Process a new transaction",
    icon: Plus,
    variant: "default" as const,
    action: "pos"
  },
  {
    title: "Add Product",
    description: "Add item to inventory",
    icon: Package,
    variant: "secondary" as const,
    action: "inventory"
  },
  {
    title: "Create Invoice",
    description: "Generate customer invoice",
    icon: FileText,
    variant: "secondary" as const,
    action: "accounting"
  },
  {
    title: "Add Employee",
    description: "Register new staff member",
    icon: Users,
    variant: "secondary" as const,
    action: "payroll"
  }
];

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

export function QuickActions({ onActionClick }: QuickActionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.title}
              variant={action.variant}
              className="h-auto p-4 justify-start gap-3"
              onClick={() => onActionClick(action.action)}
            >
              <Icon className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">{action.title}</div>
                <div className="text-xs text-muted-foreground">
                  {action.description}
                </div>
              </div>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}