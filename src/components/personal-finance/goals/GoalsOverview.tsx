import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, DollarSign, Calendar, Plus, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useGlobalization } from "@/contexts/GlobalizationContext";
import { useToast } from "@/hooks/use-toast";

interface Goal {
  id: string;
  title: string;
  description: string | null;
  category: string;
  target_value: number;
  current_value: number | null;
  target_date: string;
  completion_date: string | null;
  is_active: boolean;
  priority: string;
  milestones: any;
}

interface SavingsAccount {
  id: string;
  account_name: string;
  account_type: string;
  current_balance: number | null;
  bank_name: string | null;
  interest_rate: number | null;
}

export function GoalsOverview() {
  const { user } = useAuth();
  const { formatCurrency } = useGlobalization();
  const { toast } = useToast();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [savingsAccounts, setSavingsAccounts] = useState<SavingsAccount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchGoalsAndSavings();
    }
  }, [user]);

  const fetchGoalsAndSavings = async () => {
    try {
      // Fetch goals
      const { data: goalsData, error: goalsError } = await supabase
        .from('pm_goals_general')
        .select('*')
        .eq('user_id', user?.id)
        .eq('is_active', true)
        .order('priority', { ascending: true });

      if (goalsError) throw goalsError;

      // Fetch savings accounts
      const { data: savingsData, error: savingsError } = await supabase
        .from('pm_savings_accounts')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (savingsError) throw savingsError;

      setGoals(goalsData || []);
      setSavingsAccounts(savingsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load goals and savings data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getProgress = (goal: Goal) => {
    if (!goal.current_value || goal.target_value === 0) return 0;
    return Math.min((goal.current_value / goal.target_value) * 100, 100);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'emergency fund': return <Target className="h-4 w-4" />;
      case 'vacation': return <Calendar className="h-4 w-4" />;
      case 'house': return <Star className="h-4 w-4" />;
      default: return <DollarSign className="h-4 w-4" />;
    }
  };

  const totalSavings = savingsAccounts.reduce((sum, account) => sum + (account.current_balance || 0), 0);
  const totalGoalsTarget = goals.reduce((sum, goal) => sum + goal.target_value, 0);
  const totalGoalsCurrent = goals.reduce((sum, goal) => sum + (goal.current_value || 0), 0);
  const overallProgress = totalGoalsTarget > 0 ? (totalGoalsCurrent / totalGoalsTarget) * 100 : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="card-glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{goals.length}</div>
          </CardContent>
        </Card>

        <Card className="card-glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalSavings)}</div>
          </CardContent>
        </Card>

        <Card className="card-glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goals Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallProgress.toFixed(1)}%</div>
          </CardContent>
        </Card>

        <Card className="card-glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings Accounts</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{savingsAccounts.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Active Goals */}
      <Card className="card-enhanced">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Active Goals</CardTitle>
              <CardDescription>Track progress on your financial goals</CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Goal
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {goals.length === 0 ? (
            <div className="text-center py-8">
              <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground">No goals yet</h3>
              <p className="text-sm text-muted-foreground">Create your first financial goal to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {goals.slice(0, 3).map((goal) => (
                <div key={goal.id} className="p-4 border border-border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {getCategoryIcon(goal.category)}
                      </div>
                      <div>
                        <h4 className="font-medium">{goal.title}</h4>
                        <p className="text-sm text-muted-foreground">{goal.category}</p>
                      </div>
                    </div>
                    <Badge variant={getPriorityColor(goal.priority)}>{goal.priority}</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{formatCurrency(goal.current_value || 0)} of {formatCurrency(goal.target_value)}</span>
                      <span>{getProgress(goal).toFixed(1)}%</span>
                    </div>
                    <Progress value={getProgress(goal)} className="h-2" />
                  </div>
                  
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Target: {new Date(goal.target_date).toLocaleDateString()}</span>
                    <span>{Math.ceil((new Date(goal.target_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top Savings Accounts */}
      <Card className="card-enhanced">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Savings Accounts</CardTitle>
              <CardDescription>Your savings account balances</CardDescription>
            </div>
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Account
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {savingsAccounts.length === 0 ? (
            <div className="text-center py-8">
              <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground">No savings accounts</h3>
              <p className="text-sm text-muted-foreground">Add your first savings account to track balances</p>
            </div>
          ) : (
            <div className="space-y-3">
              {savingsAccounts.slice(0, 3).map((account) => (
                <div key={account.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium">{account.account_name}</h4>
                    <p className="text-sm text-muted-foreground">{account.bank_name} • {account.account_type}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(account.current_balance || 0)}</div>
                    {account.interest_rate && (
                      <div className="text-sm text-muted-foreground">{account.interest_rate}% APY</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}