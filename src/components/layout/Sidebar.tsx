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
  Receipt,
  Shield,
  Crown,
  ChevronDown,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  activeModule?: string;
  onModuleChange?: (module: string) => void;
  isHomeMode?: boolean;
  onHomeModeChange?: (isHome: boolean) => void;
  currentUser?: {
    name: string;
    email: string;
    avatar?: string;
    role: string;
    tenant: string;
  };
  onSignOut?: () => void;
  // Legacy props for backward compatibility
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const businessMenuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "pos", label: "Point of Sale", icon: ShoppingCart },
  { id: "inventory", label: "Inventory", icon: Package },
  { id: "product-tracking", label: "Inventory Tracking", icon: Route },
  { id: "accounting", label: "Accounting", icon: Calculator },
  { id: "payroll", label: "Payroll", icon: Users },
  { id: "user-management", label: "User Management", icon: Users },
  { id: "analytics", label: "Analytics", icon: TrendingUp },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "marketing", label: "AI Marketing", icon: TrendingUp },
  { id: "crm", label: "AI CRM", icon: Users },
  { id: "saas", label: "AI SaaS", icon: BarChart3 },
  { id: "forms", label: "AI Forms", icon: FileText },
  { id: "settings", label: "AI Settings", icon: Settings },
];

const homeMenuItems = [
  { id: "dashboard", label: "Home Dashboard", icon: Home },
  { id: "inventory", label: "Home Inventory", icon: Package },
  { id: "accounting", label: "Personal Finance", icon: Wallet },
  { id: "payroll", label: "Income Tracking", icon: Calculator },
  { id: "analytics", label: "Personal Analytics", icon: BarChart3 },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

export function Sidebar({ 
  isHomeMode = false, 
  onHomeModeChange,
  currentUser,
  onSignOut
}: SidebarProps) {
  const location = useLocation();
  const currentPath = location.pathname;
  const menuItems = isHomeMode ? homeMenuItems : businessMenuItems;

  const mockUser = {
    name: "John Smith",
    email: "john@company.com",
    avatar: "/placeholder.svg",
    role: "Administrator",
    tenant: "Acme Corporation"
  };

  const user = currentUser || mockUser;
  
  const getPath = (itemId: string) => {
    if (itemId === "dashboard") return "/";
    return `/${itemId}`;
  };
  
  const isActive = (itemId: string) => {
    const itemPath = getPath(itemId);
    return currentPath === itemPath;
  };
  return (
    <aside className="h-screen w-64 bg-background border-l border-border flex flex-col shadow-sm fixed right-0 top-0 z-40 overflow-hidden">
      {/* User Profile - Top Left */}
      <div className="p-4 border-b border-border bg-card flex-shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full flex items-center justify-start space-x-3 p-3 h-auto">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-left flex-1">
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground">{user.role}</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Building className="mr-2 h-4 w-4" />
              Organization Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Globe className="mr-2 h-4 w-4" />
              Switch Tenant
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-destructive"
              onClick={onSignOut}
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Logo/Brand */}
      <div className="p-4 border-b border-border bg-card flex-shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary">
            {isHomeMode ? <Home className="h-5 w-5 text-white" /> : <Building className="h-5 w-5 text-white" />}
          </div>
          <h1 className="text-xl font-bold text-foreground">
            {isHomeMode ? "Personal Manager" : "BizStack"}
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
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const itemIsActive = isActive(item.id);
          const itemPath = getPath(item.id);
          
          return (
            <Button
              key={item.id}
              variant={itemIsActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-12 text-sm font-medium transition-all duration-200",
                itemIsActive 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
              asChild
            >
              <Link to={itemPath}>
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            </Button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border bg-card flex-shrink-0">
        <div className="text-xs text-muted-foreground text-center">
          <div className="font-medium">
            {isHomeMode ? "Personal Manager" : "BizStack"}
          </div>
          <div className="mt-1">Version 1.0.0</div>
        </div>
      </div>
    </aside>
  );
}