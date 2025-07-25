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
    <div className="h-screen w-64 bg-gradient-to-br from-background via-background/95 to-background/90 border-r border-border/30 flex flex-col shadow-2xl backdrop-blur-sm lg:block hidden">
      {/* Mobile overlay - shown on smaller screens */}
      <div className="lg:hidden fixed inset-0 z-50 bg-black/20 backdrop-blur-sm" />
      {/* Logo/Brand */}
      <div className="p-6 border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 rounded-xl bg-gradient-primary">
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
        <div className="flex items-center justify-between text-sm p-3 bg-muted/50 rounded-xl">
          <span className="text-muted-foreground font-medium">
            {isHomeMode ? "Personal Mode" : "Business Mode"}
          </span>
          <Switch 
            checked={!isHomeMode} 
            onCheckedChange={(checked) => onHomeModeChange?.(!checked)}
            className="data-[state=checked]:bg-primary"
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
                "w-full justify-start gap-3 h-12 text-sm font-medium transition-all duration-300 relative overflow-hidden group",
                isActive 
                  ? "bg-gradient-primary text-white shadow-lg hover:shadow-xl scale-[1.02] border-0" 
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/80 hover:scale-[1.01] hover:shadow-md"
              )}
              onClick={() => handleChange(item.id)}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Background gradient for active state */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-90" />
              )}
              
              <div className="relative flex items-center gap-3 w-full">
                <Icon className="h-5 w-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                <span className="truncate font-medium">{item.label}</span>
                
                {/* Active indicator */}
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                )}
              </div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="text-xs text-muted-foreground text-center p-3 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl">
          <div className="font-semibold text-foreground mb-1">
            {isHomeMode ? "Home Manager" : "Prism Stride Suite"}
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span>Version 1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}