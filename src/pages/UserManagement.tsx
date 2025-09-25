import { UserManagementInterface } from "@/components/user-management/UserManagementInterface";

interface UserManagementProps {
  isHomeMode?: boolean;
}

export default function UserManagement({ isHomeMode = false }: UserManagementProps) {
  if (isHomeMode) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Account Settings</h1>
          <p className="text-muted-foreground mt-2">
            User management is not available in Personal Mode. Use Settings for account preferences.
          </p>
        </div>
        <div className="card-enhanced p-6">
          <h3 className="text-lg font-semibold mb-4">Personal Account</h3>
          <p className="text-muted-foreground">Manage your personal account settings and preferences.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">User Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage users, roles, and permissions across your organization.
        </p>
      </div>
      <UserManagementInterface />
    </div>
  );
}