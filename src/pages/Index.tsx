import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { QuickActions } from "@/components/dashboard/QuickActions";
// import { AIBusinessAdvisor } from "@/components/dashboard/AIBusinessAdvisor";
import { POSInterface } from "@/components/pos/POSInterface";
import { InventoryInterface } from "@/components/inventory/InventoryInterface";
import { PayrollInterface } from "@/components/payroll/PayrollInterface";
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleModuleChange = (module: string) => {
    setActiveModule(module);
  };

  const handleQuickAction = (action: string) => {
    setActiveModule(action);
  };

  const handleAuthenticated = (userType: string) => {
    setIsAuthenticated(true);
  };

  const renderContent = () => {
    switch (activeModule) {
      case "dashboard":
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold tracking-tight bg-gradient-hero bg-clip-text text-transparent">
                  Business Dashboard
                </h1>
                <p className="text-lg text-muted-foreground mt-2">
                  Welcome back! Here's what's happening with your business today.
                </p>
              </div>
            </div>
            <DashboardStats />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <QuickActions onActionClick={handleQuickAction} />
                <RecentActivity />
              </div>
              <div>
                {/* <AIBusinessAdvisor /> */}
                <div className="card-enhanced p-6">
                  <h3 className="text-lg font-semibold mb-4">AI Business Advisor</h3>
                  <p className="text-muted-foreground">AI-powered business insights coming soon...</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "pos":
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
              <h1 className="text-3xl font-bold text-foreground">Inventory Management</h1>
              <p className="text-muted-foreground mt-2">
                AI-powered inventory management with smart reorders and demand forecasting.
              </p>
            </div>
            <InventoryInterface />
          </div>
        );
      case "payroll":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Payroll Management</h1>
              <p className="text-muted-foreground mt-2">
                Comprehensive payroll processing with employee management and tax calculations.
              </p>
            </div>
            <PayrollInterface />
          </div>
        );
      case "accounting":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Accounting</h1>
              <p className="text-muted-foreground mt-2">
                Complete financial management with invoicing, expenses, and reporting.
              </p>
            </div>
            <AccountingInterface />
          </div>
        );
      case "analytics":
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
              <h1 className="text-3xl font-bold text-foreground">AI Reports</h1>
              <p className="text-muted-foreground mt-2">
                Comprehensive AI-powered business reports with automated insights and scheduling.
              </p>
            </div>
            <ReportsInterface />
          </div>
        );
      case "forms":
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
              <h1 className="text-3xl font-bold text-foreground">AI Settings</h1>
              <p className="text-muted-foreground mt-2">
                Advanced AI configuration and optimization settings for your business.
              </p>
            </div>
            <SettingsInterface />
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
    <AppLayout currentModule={activeModule} onModuleChange={handleModuleChange}>
      {renderContent()}
    </AppLayout>
  );
};

export default Index;
