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
  Route,
  Building,
  User,
  Wallet,
  Receipt
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeModule?: string;
  onModuleChange?: (module: string) => void;
  isHomeMode?: boolean;
  onHomeModeChange?: (isHome: boolean) => void;
  // Legacy props for backward compatibility
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const businessMenuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "pos", label: "Point of Sale", icon: ShoppingCart },
  { id: "inventory", label: "Inventory", icon: Package },
  { id: "product-tracking", label: "Inventory Tracking", icon: Route },
  { id: "payroll", label: "Payroll", icon: Users },
  { id: "accounting", label: "Accounting", icon: Calculator },
  { id: "user-management", label: "User Management", icon: Users },
  { id: "marketing", label: "AI Marketing", icon: TrendingUp },
  { id: "crm", label: "AI CRM", icon: Users },
  { id: "saas", label: "AI SaaS", icon: BarChart3 },
  { id: "analytics", label: "Analytics", icon: TrendingUp },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "forms", label: "AI Forms", icon: FileText },
  { id: "settings", label: "AI Settings", icon: Settings },
];

const homeMenuItems = [
  { id: "dashboard", label: "Home Dashboard", icon: Home },
  { id: "inventory", label: "Home Inventory", icon: Package },
  { id: "accounting", label: "Personal Finance", icon: Wallet },
  { id: "payroll", label: "Income Tracking", icon: Calculator },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

export function Sidebar({ 
  activeModule, 
  onModuleChange, 
  isHomeMode = false, 
  onHomeModeChange,
  activeTab, 
  onTabChange 
}: SidebarProps) {
  // Use new prop names or fall back to legacy ones
  const currentActive = activeModule || activeTab || "dashboard";
  const handleChange = onModuleChange || onTabChange || (() => {});
  const menuItems = isHomeMode ? homeMenuItems : businessMenuItems;
  return (
    <div className="h-screen w-64 bg-background border-r border-border flex flex-col shadow-sm fixed left-0 top-0 z-40">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-border bg-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary">
            {isHomeMode ? <Home className="h-5 w-5 text-white" /> : <Building className="h-5 w-5 text-white" />}
          </div>
          <h1 className="text-xl font-bold text-foreground">
            {isHomeMode ? "Home Manager" : "Prism Stride Suite"}
          </h1>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          {isHomeMode ? "Personal Management Platform" : "Business Management Platform"}
        </p>
        
        {/* Mode Toggle */}
        <div className="flex items-center justify-between text-sm p-3 bg-muted rounded-lg">
          <span className="text-foreground font-medium">
            {isHomeMode ? "Personal Mode" : "Business Mode"}
          </span>
          <Switch 
            checked={!isHomeMode} 
            onCheckedChange={(checked) => onHomeModeChange?.(!checked)}
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = currentActive === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-12 text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
              onClick={() => handleChange(item.id)}
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
          <div className="font-medium">
            {isHomeMode ? "Home Manager" : "Prism Stride Suite"}
          </div>
          <div className="mt-1">Version 1.0.0</div>
        </div>
      </div>
    </div>
  );
}