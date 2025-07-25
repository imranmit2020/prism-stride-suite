import { useEffect } from "react";

interface TenantBrandingProps {
  tenant: {
    id: string;
    name: string;
    plan: 'standard' | 'premium' | 'enterprise';
    branding?: {
      primaryColor?: string;
      logo?: string;
      theme?: 'standard' | 'premium' | 'enterprise';
    };
  };
}

export function TenantBranding({ tenant }: TenantBrandingProps) {
  useEffect(() => {
    // Apply tenant-specific theming
    const root = document.documentElement;
    
    // Remove existing tenant classes
    root.classList.remove('tenant-standard', 'tenant-premium', 'tenant-enterprise');
    
    // Apply new tenant theme
    const themeClass = `tenant-${tenant.branding?.theme || tenant.plan}`;
    root.classList.add(themeClass);

    // Apply custom primary color if provided
    if (tenant.branding?.primaryColor) {
      root.style.setProperty('--primary', tenant.branding.primaryColor);
    }

    return () => {
      // Cleanup on unmount
      root.classList.remove('tenant-standard', 'tenant-premium', 'tenant-enterprise');
    };
  }, [tenant]);

  return null; // This component doesn't render anything visible
}