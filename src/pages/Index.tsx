import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { PersonalHomeDashboard } from "@/components/dashboard/PersonalHomeDashboard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { QuickActions } from "@/components/dashboard/QuickActions";
// import { AIBusinessAdvisor } from "@/components/dashboard/AIBusinessAdvisor";
import { POSInterface } from "@/components/pos/POSInterface";
import { InventoryInterface } from "@/components/inventory/InventoryInterface";
import { PersonalInventoryInterface } from "@/components/inventory/PersonalInventoryInterface";
import { PayrollInterface } from "@/components/payroll/PayrollInterface";
import { PersonalIncomeInterface } from "@/components/payroll/PersonalIncomeInterface";
import { AccountingInterface } from "@/components/accounting/AccountingInterface";
import { PersonalFinanceAnalyticsInterface } from "@/components/personal-analytics/PersonalFinanceAnalyticsInterface";
import { PersonalGoalsInterface } from "@/components/personal-finance/PersonalGoalsInterface";
import { ReportsInterface } from "@/components/reports/ReportsInterface";
import { PersonalReportsInterface } from "@/components/reports/PersonalReportsInterface";
import { SettingsInterface } from "@/components/settings/SettingsInterface";
import { HomeManagerSettings } from "@/components/settings/HomeManagerSettings";
import { FormsInterface } from "@/components/forms/FormsInterface";
import { MarketingInterface } from "@/components/marketing/MarketingInterface";
import { CRMInterface } from "@/components/crm/CRMInterface";
import { SaaSInterface } from "@/components/saas/SaaSInterface";
import { ProductTrackingInterface } from "@/components/product-tracking/ProductTrackingInterface";
import { UserManagementInterface } from "@/components/user-management/UserManagementInterface";
import { AuthContainer } from "@/components/auth/AuthContainer";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Wand2, LogIn } from "lucide-react";

const AuthenticatedApp = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect to auth page if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to auth
  }

  return <MainApp />;
};

const MainApp = () => {
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
            {isHomeMode ? <PersonalHomeDashboard /> : <DashboardStats />}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
              <div className="xl:col-span-2 space-y-6 lg:space-y-8">
                <QuickActions onActionClick={handleQuickAction} isHomeMode={isHomeMode} />
                <RecentActivity isHomeMode={isHomeMode} />
                {isHomeMode && (
                  <Card className="card-glass">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                          <MessageSquare className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle>Ask AI About Home</CardTitle>
                          <CardDescription>Your personal home assistant</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200/50">
                          <p className="text-sm text-blue-800 dark:text-blue-300 font-medium mb-2">💡 Try asking:</p>
                          <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1">
                            <li>• "How can I save money this month?"</li>
                            <li>• "What groceries do I need to buy?"</li>
                            <li>• "When should I pay my bills?"</li>
                          </ul>
                        </div>
                        
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="Ask your personal AI helper..."
                            className="flex-1 px-3 py-2 border border-border rounded-lg text-sm bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                          />
                          <Button size="sm" className="bg-gradient-primary hover:shadow-lg transition-all duration-300">
                            <Wand2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
              {!isHomeMode && (
                <div className="card-glass p-6 lg:p-8">
                  <h3 className="text-lg lg:text-xl font-semibold mb-4 bg-gradient-hero bg-clip-text text-transparent">Business AI Helper</h3>
                  <p className="text-muted-foreground text-sm lg:text-base">Your business AI advisor for strategic insights...</p>
                </div>
              )}
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
            {isHomeMode ? <PersonalInventoryInterface /> : <InventoryInterface />}
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
            <AccountingInterface isHomeMode={isHomeMode} />
          </div>
        );
      case "analytics":
        if (isHomeMode) {
          return <PersonalFinanceAnalyticsInterface />;
        }
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">AI Analytics</h1>
              <p className="text-muted-foreground mt-2">
                Advanced AI-powered business intelligence and predictive analytics.
              </p>
            </div>
            <PersonalFinanceAnalyticsInterface />
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
              <h1 className="text-3xl font-bold text-foreground">Goals & Investments</h1>
              <p className="text-muted-foreground mt-2">
                Manage your financial goals, savings accounts, and investment portfolio.
              </p>
            </div>
            <PersonalGoalsInterface />
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
              <PersonalReportsInterface />
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
              <HomeManagerSettings />
            ) : (
              <SettingsInterface />
            )}
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground">
              {isHomeMode ? "Personal Home Dashboard" : "Business Dashboard"}
            </h1>
            {isHomeMode ? <PersonalHomeDashboard /> : <DashboardStats />}
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

const Index = () => {
  return (
    <AuthProvider>
      <AuthenticatedApp />
    </AuthProvider>
  );
};

export default Index;
