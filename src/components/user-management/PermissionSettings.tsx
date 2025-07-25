import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Lock, 
  Eye, 
  Edit, 
  Trash2, 
  Settings, 
  Users,
  FileText,
  BarChart3,
  Package,
  ShoppingCart,
  Calculator
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const permissionModules = [
  {
    id: "user_management",
    name: "User Management",
    icon: Users,
    description: "Manage users, roles, and access control",
    permissions: [
      { id: "users.view", name: "View Users", description: "View user profiles and information" },
      { id: "users.create", name: "Create Users", description: "Add new users to the system" },
      { id: "users.edit", name: "Edit Users", description: "Modify user profiles and settings" },
      { id: "users.delete", name: "Delete Users", description: "Remove users from the system" },
      { id: "roles.manage", name: "Manage Roles", description: "Create and modify user roles" },
      { id: "permissions.assign", name: "Assign Permissions", description: "Grant or revoke user permissions" }
    ]
  },
  {
    id: "pos",
    name: "Point of Sale",
    icon: ShoppingCart,
    description: "POS system operations and management",
    permissions: [
      { id: "pos.use", name: "Use POS", description: "Access the point of sale interface" },
      { id: "pos.refund", name: "Process Refunds", description: "Handle return and refund transactions" },
      { id: "pos.discount", name: "Apply Discounts", description: "Apply discounts to transactions" },
      { id: "pos.void", name: "Void Transactions", description: "Cancel or void sales transactions" },
      { id: "pos.reports", name: "POS Reports", description: "View point of sale reports and analytics" }
    ]
  },
  {
    id: "inventory",
    name: "Inventory Management",
    icon: Package,
    description: "Product and stock management",
    permissions: [
      { id: "inventory.view", name: "View Inventory", description: "View product listings and stock levels" },
      { id: "inventory.add", name: "Add Products", description: "Add new products to inventory" },
      { id: "inventory.edit", name: "Edit Products", description: "Modify product information and pricing" },
      { id: "inventory.delete", name: "Delete Products", description: "Remove products from inventory" },
      { id: "inventory.adjust", name: "Stock Adjustments", description: "Adjust stock levels and quantities" },
      { id: "inventory.transfer", name: "Transfer Stock", description: "Move inventory between locations" }
    ]
  },
  {
    id: "reports",
    name: "Reports & Analytics",
    icon: BarChart3,
    description: "Business intelligence and reporting",
    permissions: [
      { id: "reports.view", name: "View Reports", description: "Access standard business reports" },
      { id: "reports.create", name: "Create Reports", description: "Generate custom reports" },
      { id: "reports.export", name: "Export Reports", description: "Download reports in various formats" },
      { id: "analytics.view", name: "View Analytics", description: "Access analytics dashboards" },
      { id: "analytics.advanced", name: "Advanced Analytics", description: "Access detailed analytics and insights" }
    ]
  },
  {
    id: "accounting",
    name: "Accounting & Finance",
    icon: Calculator,
    description: "Financial management and accounting",
    permissions: [
      { id: "accounting.view", name: "View Financial Data", description: "Access financial reports and data" },
      { id: "accounting.edit", name: "Edit Transactions", description: "Modify financial transactions" },
      { id: "invoices.manage", name: "Manage Invoices", description: "Create and manage customer invoices" },
      { id: "expenses.manage", name: "Manage Expenses", description: "Record and track business expenses" },
      { id: "payroll.view", name: "View Payroll", description: "Access payroll information" },
      { id: "payroll.process", name: "Process Payroll", description: "Execute payroll operations" }
    ]
  },
  {
    id: "system",
    name: "System Administration",
    icon: Settings,
    description: "System settings and configuration",
    permissions: [
      { id: "system.settings", name: "System Settings", description: "Modify system-wide settings" },
      { id: "system.backup", name: "Backup & Restore", description: "Manage system backups" },
      { id: "system.logs", name: "View System Logs", description: "Access system activity logs" },
      { id: "system.maintenance", name: "System Maintenance", description: "Perform system maintenance tasks" },
      { id: "integrations.manage", name: "Manage Integrations", description: "Configure third-party integrations" }
    ]
  }
];

export function PermissionSettings() {
  const [expandedModules, setExpandedModules] = useState<string[]>(["user_management"]);
  const [permissionStates, setPermissionStates] = useState<{ [key: string]: boolean }>({});

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const togglePermission = (permissionId: string) => {
    setPermissionStates(prev => ({
      ...prev,
      [permissionId]: !prev[permissionId]
    }));
  };

  const getPermissionIcon = (permissionId: string) => {
    if (permissionId.includes('view')) return Eye;
    if (permissionId.includes('edit') || permissionId.includes('create')) return Edit;
    if (permissionId.includes('delete')) return Trash2;
    if (permissionId.includes('manage')) return Settings;
    return Shield;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Permission Settings</h2>
          <p className="text-sm text-muted-foreground">
            Configure fine-grained permissions for different system modules
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            Import Permissions
          </Button>
          <Button>
            Save Changes
          </Button>
        </div>
      </div>

      {/* Global Permission Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Global Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Two-Factor Authentication</div>
              <div className="text-sm text-muted-foreground">
                Require 2FA for all administrative accounts
              </div>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Session Timeout</div>
              <div className="text-sm text-muted-foreground">
                Automatically log out inactive users after 30 minutes
              </div>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Audit Logging</div>
              <div className="text-sm text-muted-foreground">
                Log all user actions for security auditing
              </div>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Module Permissions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Module Permissions</h3>
        
        {permissionModules.map((module) => {
          const ModuleIcon = module.icon;
          const isExpanded = expandedModules.includes(module.id);
          
          return (
            <Card key={module.id}>
              <CardHeader 
                className="cursor-pointer"
                onClick={() => toggleModule(module.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ModuleIcon className="h-5 w-5" />
                    <div>
                      <CardTitle className="text-base">{module.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {module.permissions.length} permissions
                    </Badge>
                    <Button variant="ghost" size="sm">
                      {isExpanded ? "Collapse" : "Expand"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              {isExpanded && (
                <CardContent className="pt-0">
                  <div className="grid gap-4">
                    {module.permissions.map((permission) => {
                      const PermissionIcon = getPermissionIcon(permission.id);
                      const isEnabled = permissionStates[permission.id] || false;
                      
                      return (
                        <div key={permission.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <PermissionIcon className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium text-sm">{permission.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {permission.description}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch 
                              checked={isEnabled}
                              onCheckedChange={() => togglePermission(permission.id)}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}