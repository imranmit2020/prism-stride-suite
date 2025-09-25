import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { PersonalHomeDashboard } from "@/components/dashboard/PersonalHomeDashboard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Wand2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useHomeMode } from "@/contexts/HomeModeContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { isHomeMode } = useHomeMode();

  const handleQuickAction = (action: string) => {
    navigate(`/${action}`);
  };

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
}