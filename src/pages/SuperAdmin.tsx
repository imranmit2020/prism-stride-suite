import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Crown, 
  Database, 
  Server, 
  Shield, 
  Users, 
  Settings2,
  AlertTriangle,
  Zap,
  Lock,
  Globe,
  Trash2
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function SuperAdmin() {
  const { user } = useAuth();
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [systemInfo, setSystemInfo] = useState({
    databaseSize: "15.2 GB",
    serverUptime: "45 days",
    totalTenants: 23,
    systemVersion: "2.1.4"
  });

  useEffect(() => {
    // For now, allow super admin access - implement proper role checking later
    setIsSuperAdmin(true);
    fetchSystemInfo();
    setLoading(false);
  }, [user]);

  const checkSuperAdminRole = async () => {
    // TODO: Implement proper role checking with user_roles table
    // For now, allow access for demonstration
    setIsSuperAdmin(true);
  };

  const fetchSystemInfo = async () => {
    try {
      // In a real app, these would be actual system API calls
      setSystemInfo({
        databaseSize: "15.2 GB",
        serverUptime: "45 days",
        totalTenants: 23,
        systemVersion: "2.1.4"
      });
    } catch (error) {
      console.error('Error fetching system info:', error);
    }
  };

  const handleCriticalAction = (action: string) => {
    toast.warning(`${action} requires additional confirmation in production`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verifying super admin access...</p>
        </div>
      </div>
    );
  }

  if (!isSuperAdmin) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <Lock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Super Admin Access Required</h1>
          <p className="text-muted-foreground">You don't have super admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Super Admin Control Panel</h1>
          <p className="text-muted-foreground mt-2">
            Advanced system administration and global configuration.
          </p>
        </div>
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
          <Crown className="h-3 w-3 mr-1" />
          Super Admin
        </Badge>
      </div>

      <Alert className="border-yellow-200 bg-yellow-50">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="text-yellow-800">
          <strong>Warning:</strong> Super admin actions can affect the entire system. Use with extreme caution.
        </AlertDescription>
      </Alert>

      {/* System Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Database Size</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemInfo.databaseSize}</div>
            <p className="text-xs text-muted-foreground">
              Total storage used
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Server Uptime</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemInfo.serverUptime}</div>
            <p className="text-xs text-muted-foreground">
              Continuous operation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tenants</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemInfo.totalTenants}</div>
            <p className="text-xs text-muted-foreground">
              Active organizations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Version</CardTitle>
            <Settings2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemInfo.systemVersion}</div>
            <p className="text-xs text-muted-foreground">
              Latest stable
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Super Admin Tools */}
      <Tabs defaultValue="system" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="system">System Control</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="tenants">Tenants</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Control</CardTitle>
              <CardDescription>
                Global system operations and maintenance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  variant="destructive" 
                  onClick={() => handleCriticalAction("System restart")}
                  className="w-full"
                >
                  <Server className="h-4 w-4 mr-2" />
                  Restart System
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleCriticalAction("Maintenance mode")}
                  className="w-full"
                >
                  <Settings2 className="h-4 w-4 mr-2" />
                  Toggle Maintenance
                </Button>
                <Button 
                  onClick={() => handleCriticalAction("Performance optimization")}
                  className="w-full"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Optimize Performance
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleCriticalAction("System backup")}
                  className="w-full"
                >
                  <Database className="h-4 w-4 mr-2" />
                  Create Full Backup
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Database Administration</CardTitle>
              <CardDescription>
                Direct database management and optimization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={() => handleCriticalAction("Database vacuum")}
                  className="w-full"
                >
                  <Database className="h-4 w-4 mr-2" />
                  Vacuum Database
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleCriticalAction("Index rebuild")}
                  className="w-full"
                >
                  <Settings2 className="h-4 w-4 mr-2" />
                  Rebuild Indexes
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => handleCriticalAction("Database reset")}
                  className="w-full"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Reset Database
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleCriticalAction("Migration rollback")}
                  className="w-full"
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Rollback Migration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Management</CardTitle>
              <CardDescription>
                Global security settings and access control
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={() => handleCriticalAction("Security audit")}
                  className="w-full"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Run Security Audit
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleCriticalAction("Access log review")}
                  className="w-full"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Review Access Logs
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => handleCriticalAction("Force logout all")}
                  className="w-full"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Force Logout All
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleCriticalAction("Password policy update")}
                  className="w-full"
                >
                  <Settings2 className="h-4 w-4 mr-2" />
                  Update Policies
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tenants" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tenant Management</CardTitle>
              <CardDescription>
                Manage all tenant organizations and their settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={() => handleCriticalAction("Tenant creation")}
                  className="w-full"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Create Tenant
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleCriticalAction("Tenant migration")}
                  className="w-full"
                >
                  <Server className="h-4 w-4 mr-2" />
                  Migrate Tenant
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => handleCriticalAction("Tenant suspension")}
                  className="w-full"
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Suspend Tenant
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleCriticalAction("Tenant backup")}
                  className="w-full"
                >
                  <Database className="h-4 w-4 mr-2" />
                  Backup Tenant
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Operations</CardTitle>
              <CardDescription>
                Low-level system operations and debugging tools
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-red-800">
                  <strong>Danger Zone:</strong> These operations can cause irreversible system damage.
                </AlertDescription>
              </Alert>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  variant="destructive" 
                  onClick={() => handleCriticalAction("System wipe")}
                  className="w-full"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Wipe System Data
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => handleCriticalAction("Factory reset")}
                  className="w-full"
                >
                  <Settings2 className="h-4 w-4 mr-2" />
                  Factory Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}