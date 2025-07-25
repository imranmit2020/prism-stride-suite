import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2,
  Shield,
  Users,
  Settings
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

// Mock data - replace with real data from your backend
const mockRoles = [
  {
    id: "1",
    name: "Super Admin",
    description: "Full system access with all permissions",
    userCount: 1,
    permissions: ["all"],
    color: "bg-red-100 text-red-800"
  },
  {
    id: "2",
    name: "Admin",
    description: "Administrative access to most features",
    userCount: 2,
    permissions: ["user_management", "system_settings", "reports", "analytics"],
    color: "bg-purple-100 text-purple-800"
  },
  {
    id: "3",
    name: "Manager",
    description: "Management level access with team oversight",
    userCount: 5,
    permissions: ["team_management", "reports", "pos", "inventory"],
    color: "bg-blue-100 text-blue-800"
  },
  {
    id: "4",
    name: "Employee",
    description: "Standard employee access to daily operations",
    userCount: 15,
    permissions: ["pos", "inventory_view", "basic_reports"],
    color: "bg-gray-100 text-gray-800"
  },
  {
    id: "5",
    name: "Viewer",
    description: "Read-only access to reports and analytics",
    userCount: 3,
    permissions: ["reports_view", "analytics_view"],
    color: "bg-green-100 text-green-800"
  }
];

const allPermissions = [
  { id: "user_management", label: "User Management", category: "Admin" },
  { id: "system_settings", label: "System Settings", category: "Admin" },
  { id: "team_management", label: "Team Management", category: "Management" },
  { id: "pos", label: "Point of Sale", category: "Operations" },
  { id: "inventory", label: "Inventory Management", category: "Operations" },
  { id: "inventory_view", label: "Inventory View", category: "Operations" },
  { id: "reports", label: "Full Reports", category: "Analytics" },
  { id: "reports_view", label: "View Reports", category: "Analytics" },
  { id: "analytics", label: "Analytics", category: "Analytics" },
  { id: "analytics_view", label: "View Analytics", category: "Analytics" },
  { id: "accounting", label: "Accounting", category: "Finance" },
  { id: "payroll", label: "Payroll", category: "HR" }
];

export function RoleManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roles] = useState(mockRoles);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPermissionsByCategory = () => {
    const categories: { [key: string]: typeof allPermissions } = {};
    allPermissions.forEach(permission => {
      if (!categories[permission.category]) {
        categories[permission.category] = [];
      }
      categories[permission.category].push(permission);
    });
    return categories;
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Role
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Roles List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Roles</h3>
          
          {filteredRoles.map((role) => (
            <Card 
              key={role.id} 
              className={`cursor-pointer transition-all ${
                selectedRole === role.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedRole(role.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className={role.color}>
                      {role.name}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="h-3 w-3" />
                      {role.userCount} users
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="h-4 w-4 mr-2" />
                        Permissions
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">{role.description}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {role.permissions.slice(0, 3).map((permission) => (
                    <Badge key={permission} variant="outline" className="text-xs">
                      {permission === "all" ? "All Permissions" : 
                       allPermissions.find(p => p.id === permission)?.label || permission}
                    </Badge>
                  ))}
                  {role.permissions.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{role.permissions.length - 3} more
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Role Permissions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Permissions</h3>
          
          {selectedRole ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  {roles.find(r => r.id === selectedRole)?.name} Permissions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(getPermissionsByCategory()).map(([category, permissions]) => (
                  <div key={category} className="space-y-3">
                    <h4 className="font-medium text-sm">{category}</h4>
                    <div className="space-y-2 pl-4">
                      {permissions.map((permission) => {
                        const selectedRoleData = roles.find(r => r.id === selectedRole);
                        const isChecked = selectedRoleData?.permissions.includes("all") || 
                                         selectedRoleData?.permissions.includes(permission.id);
                        
                        return (
                          <div key={permission.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={permission.id}
                              checked={isChecked}
                              disabled={selectedRoleData?.permissions.includes("all")}
                            />
                            <label 
                              htmlFor={permission.id}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {permission.label}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
                
                <div className="pt-4 border-t">
                  <Button className="w-full">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a role to view and edit permissions</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}