import { useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { TenantBranding } from "./TenantBranding";

interface Tenant {
  id: string;
  name: string;
  plan: 'standard' | 'premium' | 'enterprise';
  branding: {
    theme: 'standard' | 'premium' | 'enterprise';
  };
}

interface AppLayoutProps {
  children: React.ReactNode;
  currentModule?: string;
  onModuleChange?: (module: string) => void;
  isHomeMode?: boolean;
  onHomeModeChange?: (isHome: boolean) => void;
}

export function AppLayout({ 
  children, 
  currentModule, 
  onModuleChange, 
  isHomeMode = false, 
  onHomeModeChange 
}: AppLayoutProps) {
  const [currentTenant, setCurrentTenant] = useState<Tenant>({
    id: "acme",
    name: "Acme Corporation",
    plan: "enterprise",
    branding: {
      theme: "enterprise",
    }
  });

  const handleTenantChange = (tenantId: string) => {
    // In a real app, this would fetch tenant data and update the state
    const tenantMap: Record<string, Tenant> = {
      acme: { id: "acme", name: "Acme Corporation", plan: "enterprise", branding: { theme: "enterprise" } },
      tech: { id: "tech", name: "Tech Innovations", plan: "premium", branding: { theme: "premium" } },
      retail: { id: "retail", name: "Retail Plus", plan: "standard", branding: { theme: "standard" } }
    };
    
    const tenant = tenantMap[tenantId];
    if (tenant) {
      setCurrentTenant(tenant);
    }
  };

  return (
    <>
      <TenantBranding tenant={currentTenant} />
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <Sidebar 
            onModuleChange={onModuleChange} 
            activeModule={currentModule}
            isHomeMode={isHomeMode}
            onHomeModeChange={onHomeModeChange}
          />
          <SidebarInset className="flex-1 flex flex-col">
            <Header 
              onTenantChange={handleTenantChange}
              currentUser={{
                name: "John Smith",
                email: "john@company.com",
                role: "Administrator",
                tenant: currentTenant.name
              }}
            />
            <main className="flex-1 overflow-auto">
              <div className="container mx-auto py-6 px-6">
                {children}
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </>
  );
}