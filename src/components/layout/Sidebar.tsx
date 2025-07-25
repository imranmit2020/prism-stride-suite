import { 
  BarChart3, 
  Package, 
  Users, 
  Calculator, 
  ShoppingCart, 
  TrendingUp,
  Settings,
  Home,
  FileText,
  Route
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "pos", label: "Point of Sale", icon: ShoppingCart },
  { id: "inventory", label: "Inventory", icon: Package },
  { id: "product-tracking", label: "Inventory Tracking", icon: Route },
  { id: "payroll", label: "Payroll", icon: Users },
  { id: "accounting", label: "Accounting", icon: Calculator },
  { id: "marketing", label: "AI Marketing", icon: TrendingUp },
  { id: "crm", label: "AI CRM", icon: Users },
  { id: "saas", label: "AI SaaS", icon: BarChart3 },
  { id: "analytics", label: "Analytics", icon: TrendingUp },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "forms", label: "AI Forms", icon: FileText },
  { id: "settings", label: "AI Settings", icon: Settings },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="h-screen w-64 bg-background border-r border-border flex flex-col shadow-sm">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-border bg-card">
        <h1 className="text-xl font-bold text-foreground">
          Prism Stride Suite
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Business Management Platform
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-12 text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90" 
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50 hover:shadow-sm"
              )}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </Button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border bg-card">
        <div className="text-xs text-muted-foreground text-center">
          <div className="font-medium">Prism Stride Suite</div>
          <div className="mt-1">Version 1.0.0</div>
        </div>
      </div>
    </div>
  );
}