import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface AddRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

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

export function AddRoleDialog({ open, onOpenChange }: AddRoleDialogProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: [] as string[]
  });
  const [loading, setLoading] = useState(false);

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

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissions: checked 
        ? [...prev.permissions, permissionId]
        : prev.permissions.filter(p => p !== permissionId)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // TODO: Implement actual role creation logic with Supabase
      console.log("Creating role:", formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Role Created",
        description: `${formData.name} role has been created successfully.`,
      });
      
      // Reset form
      setFormData({
        name: "",
        description: "",
        permissions: []
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create role. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Role</DialogTitle>
          <DialogDescription>
            Create a new role and assign permissions
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Role Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter role name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the role and its responsibilities"
                rows={3}
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label>Permissions</Label>
            <div className="space-y-6 border rounded-lg p-4">
              {Object.entries(getPermissionsByCategory()).map(([category, permissions]) => (
                <div key={category} className="space-y-3">
                  <h4 className="font-medium text-sm text-primary">{category}</h4>
                  <div className="space-y-2 pl-4">
                    {permissions.map((permission) => (
                      <div key={permission.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={permission.id}
                          checked={formData.permissions.includes(permission.id)}
                          onCheckedChange={(checked) => 
                            handlePermissionChange(permission.id, checked as boolean)
                          }
                        />
                        <label 
                          htmlFor={permission.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {permission.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Role"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}