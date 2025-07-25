import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { QuickActions } from "@/components/dashboard/QuickActions";
// import { AIBusinessAdvisor } from "@/components/dashboard/AIBusinessAdvisor";
import { POSInterface } from "@/components/pos/POSInterface";
import { InventoryInterface } from "@/components/inventory/InventoryInterface";
import { PayrollInterface } from "@/components/payroll/PayrollInterface";
import { PersonalIncomeInterface } from "@/components/payroll/PersonalIncomeInterface";
import { AccountingInterface } from "@/components/accounting/AccountingInterface";
import { AnalyticsInterface } from "@/components/analytics/AnalyticsInterface";
import { ReportsInterface } from "@/components/reports/ReportsInterface";
import { SettingsInterface } from "@/components/settings/SettingsInterface";
import { FormsInterface } from "@/components/forms/FormsInterface";
import { MarketingInterface } from "@/components/marketing/MarketingInterface";
import { CRMInterface } from "@/components/crm/CRMInterface";
import { SaaSInterface } from "@/components/saas/SaaSInterface";
import { ProductTrackingInterface } from "@/components/product-tracking/ProductTrackingInterface";
import { UserManagementInterface } from "@/components/user-management/UserManagementInterface";
import { AuthContainer } from "@/components/auth/AuthContainer";

const Index = () => {
  const [activeModule, setActiveModule] = useState("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Auto-login for demo
  const [isHomeMode, setIsHomeMode] = useState(false);

  const handleModuleChange = (module: string) => {
    console.log(`📍 Navigating to module: ${module} (${isHomeMode ? 'personal' : 'business'} mode)`);
    setActiveModule(module);
  };

  const handleQuickAction = (action: string) => {
    setActiveModule(action);
  };

  const handleAuthenticated = (userType: string) => {
    setIsAuthenticated(true);
  };

  const handleHomeModeChange = (isHome: boolean) => {
    setIsHomeMode(isHome);
    // Reset to dashboard when switching modes
    setActiveModule("dashboard");
  };

  const renderContent = () => {
    switch (activeModule) {
      case "dashboard":
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold tracking-tight bg-gradient-hero bg-clip-text text-transparent">
                  {isHomeMode ? "Home Dashboard" : "Business Dashboard"}
                </h1>
                <p className="text-lg text-muted-foreground mt-2">
                  {isHomeMode 
                    ? "Welcome home! Here's your personal management overview."
                    : "Welcome back! Here's what's happening with your business today."
                  }
                </p>
              </div>
            </div>
            <DashboardStats />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
              <div className="xl:col-span-2 space-y-6 lg:space-y-8">
                <QuickActions onActionClick={handleQuickAction} />
                <RecentActivity />
              </div>
              <div className="space-y-6">
                <div className="card-glass p-6 lg:p-8">
                  <h3 className="text-lg lg:text-xl font-semibold mb-4 bg-gradient-hero bg-clip-text text-transparent">AI Business Advisor</h3>
                  <p className="text-muted-foreground text-sm lg:text-base">AI-powered business insights coming soon...</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "pos":
        if (isHomeMode) {
          // For home mode, redirect to inventory with a useEffect
          return (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Redirecting to Home Inventory...</h1>
                <p className="text-muted-foreground mt-2">Point of Sale is not available in Personal Mode.</p>
              </div>
            </div>
          );
        }
        return (
          <div className="space-y-6 h-full">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Point of Sale</h1>
              <p className="text-muted-foreground mt-2">
                Process transactions, manage cart, and handle payments.
              </p>
            </div>
            <div className="h-[calc(100vh-200px)]">
              <POSInterface />
            </div>
          </div>
        );
      case "inventory":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {isHomeMode ? "Home Inventory" : "Inventory Management"}
              </h1>
              <p className="text-muted-foreground mt-2">
                {isHomeMode 
                  ? "Track household items, pantry stock, and personal belongings."
                  : "AI-powered inventory management with smart reorders and demand forecasting."
                }
              </p>
            </div>
            <InventoryInterface />
          </div>
        );
      case "payroll":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {isHomeMode ? "Income Tracking" : "Payroll Management"}
              </h1>
              <p className="text-muted-foreground mt-2">
                {isHomeMode 
                  ? "Track multiple income sources, freelance payments, and tax withholdings."
                  : "Comprehensive payroll processing with employee management and tax calculations."
                }
              </p>
            </div>
            {isHomeMode ? <PersonalIncomeInterface /> : <PayrollInterface />}
          </div>
        );
      case "accounting":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {isHomeMode ? "Personal Finance" : "Accounting"}
              </h1>
              <p className="text-muted-foreground mt-2">
                {isHomeMode 
                  ? "Personal budget tracking, bill management, and expense categorization."
                  : "Complete financial management with invoicing, expenses, and reporting."
                }
              </p>
            </div>
            <AccountingInterface />
          </div>
        );
      case "analytics":
        if (isHomeMode) {
          return (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Personal Analytics</h1>
                <p className="text-muted-foreground mt-2">
                  Track your personal spending patterns, income trends, and household metrics.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="card-enhanced p-6">
                  <h3 className="text-lg font-semibold mb-4">Monthly Spending Analysis</h3>
                  <p className="text-muted-foreground">Coming soon - Personal expense analytics</p>
                </div>
                <div className="card-enhanced p-6">
                  <h3 className="text-lg font-semibold mb-4">Income Trends</h3>
                  <p className="text-muted-foreground">Coming soon - Personal income tracking</p>
                </div>
              </div>
            </div>
          );
        }
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">AI Analytics</h1>
              <p className="text-muted-foreground mt-2">
                Advanced AI-powered business intelligence and predictive analytics.
              </p>
            </div>
            <AnalyticsInterface />
          </div>
        );
      case "marketing":
        if (isHomeMode) {
          return (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Personal Finance</h1>
                <p className="text-muted-foreground mt-2">
                  Marketing tools are not available in Personal Mode. Use Personal Finance instead.
                </p>
              </div>
              <div className="card-enhanced p-6">
                <h3 className="text-lg font-semibold mb-4">Personal Finance Management</h3>
                <p className="text-muted-foreground">Switch to Accounting module for personal finance tools.</p>
              </div>
            </div>
          );
        }
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">AI Marketing Suite</h1>
              <p className="text-muted-foreground mt-2">
                Revolutionary AI-powered marketing tools that predict viral content and optimize campaigns.
              </p>
            </div>
            <MarketingInterface />
          </div>
        );
      case "crm":
        if (isHomeMode) {
          return (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Personal Contacts</h1>
                <p className="text-muted-foreground mt-2">
                  CRM tools are not available in Personal Mode. Use Personal Finance for expense tracking.
                </p>
              </div>
              <div className="card-enhanced p-6">
                <h3 className="text-lg font-semibold mb-4">Contact Management</h3>
                <p className="text-muted-foreground">Basic contact management for personal use coming soon.</p>
              </div>
            </div>
          );
        }
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">AI CRM Intelligence</h1>
              <p className="text-muted-foreground mt-2">
                Advanced AI that predicts relationships, prevents churn, and maximizes customer lifetime value.
              </p>
            </div>
            <CRMInterface />
          </div>
        );
      case "product-tracking":
        if (isHomeMode) {
          return (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Home Inventory Tracking</h1>
                <p className="text-muted-foreground mt-2">
                  Advanced product tracking is not available in Personal Mode. Use basic Home Inventory instead.
                </p>
              </div>
              <div className="card-enhanced p-6">
                <h3 className="text-lg font-semibold mb-4">Simple Home Tracking</h3>
                <p className="text-muted-foreground">Use the Home Inventory module for household item tracking.</p>
              </div>
            </div>
          );
        }
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">AI Inventory Tracking System</h1>
              <p className="text-muted-foreground mt-2">
                Comprehensive inventory lifecycle management with intelligent AI insights.
              </p>
            </div>
            <ProductTrackingInterface />
          </div>
        );
      case "user-management":
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
      case "saas":
        if (isHomeMode) {
          return (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Personal Analytics</h1>
                <p className="text-muted-foreground mt-2">
                  SaaS tools are not available in Personal Mode. Use Personal Analytics for insights.
                </p>
              </div>
              <div className="card-enhanced p-6">
                <h3 className="text-lg font-semibold mb-4">Personal Insights</h3>
                <p className="text-muted-foreground">View your personal financial and usage analytics.</p>
              </div>
            </div>
          );
        }
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">AI SaaS Optimization</h1>
              <p className="text-muted-foreground mt-2">
                Intelligent SaaS tools that predict user behavior, optimize pricing, and ensure product-market fit.
              </p>
            </div>
            <SaaSInterface />
          </div>
        );
      case "reports":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {isHomeMode ? "Personal Reports" : "AI Reports"}
              </h1>
              <p className="text-muted-foreground mt-2">
                {isHomeMode 
                  ? "Generate personal financial reports and household analytics."
                  : "Comprehensive AI-powered business reports with automated insights and scheduling."
                }
              </p>
            </div>
            {isHomeMode ? (
              <div className="grid gap-6 md:grid-cols-2">
                <div className="card-enhanced p-6">
                  <h3 className="text-lg font-semibold mb-4">Monthly Budget Report</h3>
                  <p className="text-muted-foreground">Track your monthly income vs expenses</p>
                </div>
                <div className="card-enhanced p-6">
                  <h3 className="text-lg font-semibold mb-4">Tax Summary</h3>
                  <p className="text-muted-foreground">Annual tax document preparation</p>
                </div>
              </div>
            ) : (
              <ReportsInterface />
            )}
          </div>
        );
      case "forms":
        if (isHomeMode) {
          return (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Personal Forms</h1>
                <p className="text-muted-foreground mt-2">
                  AI Forms are not available in Personal Mode. Use Settings for personal preferences.
                </p>
              </div>
              <div className="card-enhanced p-6">
                <h3 className="text-lg font-semibold mb-4">Personal Forms</h3>
                <p className="text-muted-foreground">Basic forms for personal use coming soon.</p>
              </div>
            </div>
          );
        }
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">AI Forms Suite</h1>
              <p className="text-muted-foreground mt-2">
                Revolutionary AI-powered forms that predict, optimize, and transform your business processes.
              </p>
            </div>
            <FormsInterface />
          </div>
        );
      case "settings":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {isHomeMode ? "Personal Settings" : "AI Settings"}
              </h1>
              <p className="text-muted-foreground mt-2">
                {isHomeMode 
                  ? "Configure your personal preferences and account settings."
                  : "Advanced AI configuration and optimization settings for your business."
                }
              </p>
            </div>
            {isHomeMode ? (
              <div className="grid gap-6 md:grid-cols-2">
                <div className="card-enhanced p-6">
                  <h3 className="text-lg font-semibold mb-4">Profile Settings</h3>
                  <p className="text-muted-foreground">Update your personal information</p>
                </div>
                <div className="card-enhanced p-6">
                  <h3 className="text-lg font-semibold mb-4">Notifications</h3>
                  <p className="text-muted-foreground">Manage alert preferences</p>
                </div>
              </div>
            ) : (
              <SettingsInterface />
            )}
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <DashboardStats />
          </div>
        );
    }
  };

  // Show authentication screens if not authenticated
  if (!isAuthenticated) {
    return <AuthContainer onAuthenticated={handleAuthenticated} />;
  }

  return (
    <AppLayout 
      currentModule={activeModule} 
      onModuleChange={handleModuleChange}
      isHomeMode={isHomeMode}
      onHomeModeChange={handleHomeModeChange}
    >
      {renderContent()}
    </AppLayout>
  );
};

export default Index;
