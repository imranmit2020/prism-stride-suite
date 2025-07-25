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
        <TabsList className="flex flex-wrap h-auto items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-full gap-1">
          <TabsTrigger value="users" className="px-3 py-2 text-xs font-medium">Users</TabsTrigger>
          <TabsTrigger value="roles" className="px-3 py-2 text-xs font-medium">Roles</TabsTrigger>
          <TabsTrigger value="permissions" className="px-3 py-2 text-xs font-medium">Permissions</TabsTrigger>
          <TabsTrigger value="analytics" className="px-3 py-2 text-xs font-medium">Analytics</TabsTrigger>
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