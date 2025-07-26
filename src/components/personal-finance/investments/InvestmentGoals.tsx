import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, DollarSign, Calendar, Award, Calculator } from "lucide-react";
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
}

interface Investment {
  id: string;
  investment_name: string;
  investment_type: string;
  symbol: string | null;
  quantity: number | null;
  purchase_price: number | null;
  current_price: number | null;
  goal_id: string | null;
}

export function InvestmentGoals() {
  const { user } = useAuth();
  const { formatCurrency } = useGlobalization();
  const { toast } = useToast();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      // Fetch investment-related goals
      const { data: goalsData, error: goalsError } = await supabase
        .from('pm_goals_general')
        .select('*')
        .eq('user_id', user?.id)
        .eq('is_active', true)
        .in('category', ['retirement', 'investment', 'wealth building'])
        .order('target_date', { ascending: true });

      if (goalsError) throw goalsError;

      // Fetch investments linked to goals
      const { data: investmentsData, error: investmentsError } = await supabase
        .from('pm_investments')
        .select('*')
        .eq('user_id', user?.id)
        .not('goal_id', 'is', null);

      if (investmentsError) throw investmentsError;

      setGoals(goalsData || []);
      setInvestments(investmentsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load investment goals",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getInvestmentsForGoal = (goalId: string) => {
    return investments.filter(inv => inv.goal_id === goalId);
  };

  const calculateGoalProgress = (goal: Goal) => {
    const linkedInvestments = getInvestmentsForGoal(goal.id);
    const investmentValue = linkedInvestments.reduce((total, inv) => {
      if (inv.quantity && inv.current_price) {
        return total + (inv.quantity * inv.current_price);
      }
      return total;
    }, 0);

    const totalProgress = (goal.current_value || 0) + investmentValue;
    const progressPercentage = goal.target_value > 0 ? (totalProgress / goal.target_value) * 100 : 0;

    return {
      totalProgress,
      investmentValue,
      progressPercentage: Math.min(progressPercentage, 100),
      linkedInvestments
    };
  };

  const calculateRequiredMonthlyInvestment = (goal: Goal) => {
    const progress = calculateGoalProgress(goal);
    const remaining = goal.target_value - progress.totalProgress;
    const today = new Date();
    const targetDate = new Date(goal.target_date);
    const monthsRemaining = Math.max(1, (targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30));
    
    return remaining > 0 ? remaining / monthsRemaining : 0;
  };

  const getProjectedValue = (goal: Goal, monthlyInvestment: number, annualReturn: number = 7) => {
    const today = new Date();
    const targetDate = new Date(goal.target_date);
    const monthsRemaining = Math.max(1, (targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30));
    const monthlyRate = annualReturn / 100 / 12;
    
    const progress = calculateGoalProgress(goal);
    const currentValue = progress.totalProgress;
    
    // Future value of current investments
    const futureCurrentValue = currentValue * Math.pow(1 + monthlyRate, monthsRemaining);
    
    // Future value of monthly investments (annuity)
    const futureMonthlyValue = monthlyInvestment * 
      ((Math.pow(1 + monthlyRate, monthsRemaining) - 1) / monthlyRate);
    
    return futureCurrentValue + futureMonthlyValue;
  };

  const getDaysToTarget = (targetDate: string) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const totalInvestmentValue = investments.reduce((total, inv) => {
    if (inv.quantity && inv.current_price) {
      return total + (inv.quantity * inv.current_price);
    }
    return total;
  }, 0);

  const totalTargetValue = goals.reduce((total, goal) => total + goal.target_value, 0);
  const totalCurrentValue = goals.reduce((total, goal) => {
    const progress = calculateGoalProgress(goal);
    return total + progress.totalProgress;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="card-glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investment Goals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{goals.length}</div>
          </CardContent>
        </Card>

        <Card className="card-glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Target</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalTargetValue)}</div>
          </CardContent>
        </Card>

        <Card className="card-glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalCurrentValue)}</div>
            <p className="text-xs text-muted-foreground">
              {totalTargetValue > 0 ? ((totalCurrentValue / totalTargetValue) * 100).toFixed(1) : 0}% complete
            </p>
          </CardContent>
        </Card>

        <Card className="card-glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investment Value</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalInvestmentValue)}</div>
            <p className="text-xs text-muted-foreground">
              From {investments.length} investments
            </p>
          </CardContent>
        </Card>
      </div>

      {goals.length === 0 ? (
        <Card className="card-enhanced">
          <CardContent className="text-center py-8">
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">No investment goals</h3>
            <p className="text-sm text-muted-foreground">Create investment-related goals to track your progress</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {goals.map((goal) => {
            const progress = calculateGoalProgress(goal);
            const requiredMonthly = calculateRequiredMonthlyInvestment(goal);
            const projectedValue = getProjectedValue(goal, requiredMonthly);
            const daysToTarget = getDaysToTarget(goal.target_date);
            const onTrack = projectedValue >= goal.target_value;

            return (
              <Card key={goal.id} className="card-enhanced">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle>{goal.title}</CardTitle>
                        <Badge variant={getPriorityColor(goal.priority)}>{goal.priority}</Badge>
                        <Badge variant="outline">{goal.category}</Badge>
                      </div>
                      <CardDescription>
                        {goal.description && <div className="mb-2">{goal.description}</div>}
                        Target: {formatCurrency(goal.target_value)} by {new Date(goal.target_date).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{progress.progressPercentage.toFixed(1)}%</div>
                      <div className="text-sm text-muted-foreground">{daysToTarget} days left</div>
                    </div>
                  </div>
                  <Progress value={progress.progressPercentage} className="h-2" />
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Current Progress */}
                    <div className="space-y-4">
                      <h4 className="font-medium flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Current Progress
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Savings:</span>
                          <span className="font-medium">{formatCurrency(goal.current_value || 0)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Investments:</span>
                          <span className="font-medium">{formatCurrency(progress.investmentValue)}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-medium">Total:</span>
                          <span className="font-bold">{formatCurrency(progress.totalProgress)}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>Remaining:</span>
                          <span>{formatCurrency(Math.max(0, goal.target_value - progress.totalProgress))}</span>
                        </div>
                      </div>
                    </div>

                    {/* Investment Strategy */}
                    <div className="space-y-4">
                      <h4 className="font-medium flex items-center gap-2">
                        <Calculator className="h-4 w-4" />
                        Investment Strategy
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Required Monthly:</span>
                          <span className="font-medium">{formatCurrency(requiredMonthly)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Projected Value:</span>
                          <span className={`font-medium ${onTrack ? 'text-green-600' : 'text-red-600'}`}>
                            {formatCurrency(projectedValue)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Status:</span>
                          <Badge variant={onTrack ? "default" : "destructive"}>
                            {onTrack ? "On Track" : "Behind"}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground pt-2">
                          Assumes 7% annual return
                        </div>
                      </div>
                    </div>

                    {/* Linked Investments */}
                    <div className="space-y-4">
                      <h4 className="font-medium flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        Linked Investments
                      </h4>
                      {progress.linkedInvestments.length === 0 ? (
                        <div className="text-sm text-muted-foreground">
                          No investments linked to this goal yet.
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {progress.linkedInvestments.slice(0, 3).map((investment) => (
                            <div key={investment.id} className="flex justify-between text-sm">
                              <span className="truncate mr-2">{investment.symbol || investment.investment_name}</span>
                              <span className="font-medium">
                                {formatCurrency((investment.quantity || 0) * (investment.current_price || 0))}
                              </span>
                            </div>
                          ))}
                          {progress.linkedInvestments.length > 3 && (
                            <div className="text-xs text-muted-foreground">
                              +{progress.linkedInvestments.length - 3} more investments
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Items */}
                  {!onTrack && requiredMonthly > 0 && (
                    <div className="mt-6 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Calculator className="h-4 w-4 text-orange-600 mt-0.5" />
                        <div>
                          <h5 className="font-medium text-orange-800 dark:text-orange-400">Recommendation</h5>
                          <p className="text-sm text-orange-700 dark:text-orange-300">
                            To reach your goal, consider investing an additional {formatCurrency(requiredMonthly)} per month. 
                            This could help you achieve your target of {formatCurrency(goal.target_value)} by {new Date(goal.target_date).toLocaleDateString()}.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {onTrack && (
                    <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Award className="h-4 w-4 text-green-600 mt-0.5" />
                        <div>
                          <h5 className="font-medium text-green-800 dark:text-green-400">Great Progress!</h5>
                          <p className="text-sm text-green-700 dark:text-green-300">
                            You're on track to exceed your goal! Keep up the great work with your current investment strategy.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}