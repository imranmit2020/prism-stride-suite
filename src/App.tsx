import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { HomeModeProvider } from "@/contexts/HomeModeContext";
import { ProductTrackingInterface } from "./components/product-tracking/ProductTrackingInterface";
import { AuthPage } from "./components/auth/AuthPage";
import { AppLayout } from "./components/layout/AppLayout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Accounting from "./pages/Accounting";
import Payroll from "./pages/Payroll";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Marketing from "./pages/Marketing";
import CRM from "./pages/CRM";
import SaaS from "./pages/SaaS";
import Forms from "./pages/Forms";
import UserManagement from "./pages/UserManagement";
import Settings from "./pages/Settings";
import POS from "./pages/POS";
import Admin from "./pages/Admin";
import SuperAdmin from "./pages/SuperAdmin";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

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

  return <>{children}</>;
};

const App = () => {
  console.log("🚀 App component rendered");
  
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <HomeModeProvider>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<AuthPage />} />
                  
                  {/* Protected Business/Personal Routes */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <AppLayout>
                        <Dashboard />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/inventory" element={
                    <ProtectedRoute>
                      <AppLayout>
                        <Inventory />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/accounting" element={
                    <ProtectedRoute>
                      <AppLayout>
                        <Accounting />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/payroll" element={
                    <ProtectedRoute>
                      <AppLayout>
                        <Payroll />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/analytics" element={
                    <ProtectedRoute>
                      <AppLayout>
                        <Analytics />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/reports" element={
                    <ProtectedRoute>
                      <AppLayout>
                        <Reports />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/marketing" element={
                    <ProtectedRoute>
                      <AppLayout>
                        <Marketing />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/crm" element={
                    <ProtectedRoute>
                      <AppLayout>
                        <CRM />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/saas" element={
                    <ProtectedRoute>
                      <AppLayout>
                        <SaaS />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/forms" element={
                    <ProtectedRoute>
                      <AppLayout>
                        <Forms />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/user-management" element={
                    <ProtectedRoute>
                      <AppLayout>
                        <UserManagement />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/settings" element={
                    <ProtectedRoute>
                      <AppLayout>
                        <Settings />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/pos" element={
                    <ProtectedRoute>
                      <AppLayout>
                        <POS />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/product-tracking" element={
                    <ProtectedRoute>
                      <AppLayout>
                        <ProductTrackingInterface />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/admin" element={
                    <ProtectedRoute>
                      <AppLayout>
                        <Admin />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/super-admin" element={
                    <ProtectedRoute>
                      <AppLayout>
                        <SuperAdmin />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </HomeModeProvider>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;