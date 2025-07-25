import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserList } from "./UserList";
import { RoleManagement } from "./RoleManagement";
import { PermissionSettings } from "./PermissionSettings";
import { UserAnalytics } from "./UserAnalytics";

export function UserManagementInterface() {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="space-y-6">

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto p-1">
          <TabsTrigger 
            value="users" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Users
          </TabsTrigger>
          <TabsTrigger 
            value="roles" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Roles
          </TabsTrigger>
          <TabsTrigger 
            value="permissions" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Permissions
          </TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6 mt-6">
          <UserList />
        </TabsContent>

        <TabsContent value="roles" className="space-y-6 mt-6">
          <RoleManagement />
        </TabsContent>

        <TabsContent value="permissions" className="space-y-6 mt-6">
          <PermissionSettings />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6 mt-6">
          <UserAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
}