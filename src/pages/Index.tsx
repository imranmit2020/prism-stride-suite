import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { POSInterface } from "@/components/pos/POSInterface";
import { InventoryInterface } from "@/components/inventory/InventoryInterface";
import { PayrollInterface } from "@/components/payroll/PayrollInterface";
import { AccountingInterface } from "@/components/accounting/AccountingInterface";
import { AnalyticsInterface } from "@/components/analytics/AnalyticsInterface";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleQuickAction = (action: string) => {
    setActiveTab(action);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Welcome back! Here's an overview of your business performance.
              </p>
            </div>
            <DashboardStats />
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <RecentActivity />
              </div>
              <div>
                <QuickActions onActionClick={handleQuickAction} />
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
      case "reports":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Reports</h1>
            <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
              <p className="text-muted-foreground">Reports Module - Coming Soon</p>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
              <p className="text-muted-foreground">Settings Module - Coming Soon</p>
            </div>
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

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="flex-1 p-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
