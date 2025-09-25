import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { TenantBranding } from "./TenantBranding";
import { useAuth } from "@/contexts/AuthContext";
import { useHomeMode } from "@/contexts/HomeModeContext";
import { supabase } from "@/integrations/supabase/client";

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
  isHomeMode?: boolean;
  onHomeModeChange?: (isHome: boolean) => void;
}

export function AppLayout({ 
  children
}: AppLayoutProps) {
  const { isHomeMode, setIsHomeMode } = useHomeMode();
  const { user, signOut } = useAuth();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [currentTenant, setCurrentTenant] = useState<Tenant>({
    id: "acme",
    name: "Acme Corporation",
    plan: "enterprise",
    branding: {
      theme: "enterprise",
    }
  });

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        setUserProfile(profile);
      }
    };

    fetchUserProfile();
  }, [user]);

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
      <div className="min-h-screen bg-background">
        <Sidebar 
          isHomeMode={isHomeMode}
          onHomeModeChange={setIsHomeMode}
          currentUser={userProfile ? {
            name: userProfile.full_name || user?.email || "User",
            email: userProfile.email || user?.email || "",
            role: userProfile.role || "User",
            tenant: currentTenant.name,
            avatar: userProfile.avatar_url
          } : undefined}
          onSignOut={signOut}
        />
        <div className="mr-64">
          <Header 
            onTenantChange={handleTenantChange}
            currentUser={userProfile ? {
              name: userProfile.full_name || user?.email || "User",
              email: userProfile.email || user?.email || "",
              role: userProfile.role || "User",
              tenant: currentTenant.name,
              avatar: userProfile.avatar_url
            } : undefined}
            onSignOut={signOut}
          />
          <main className="min-h-screen">
            <div className="container mx-auto py-6 px-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}