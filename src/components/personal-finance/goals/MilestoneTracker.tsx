import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Target, Calendar, Award, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useGlobalization } from "@/contexts/GlobalizationContext";
import { useToast } from "@/hooks/use-toast";

interface Goal {
  id: string;
  title: string;
  category: string;
  target_value: number;
  current_value: number | null;
  target_date: string;
  milestones: any;
}

interface Milestone {
  id: string;
  title: string;
  target_amount: number;
  target_date: string;
  completed: boolean;
  completed_date?: string;
}

export function MilestoneTracker() {
  const { user } = useAuth();
  const { formatCurrency } = useGlobalization();
  const { toast } = useToast();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchGoals();
    }
  }, [user]);

  const fetchGoals = async () => {
    try {
      const { data, error } = await supabase
        .from('pm_goals_general')
        .select('*')
        .eq('user_id', user?.id)
        .eq('is_active', true)
        .order('target_date', { ascending: true });

      if (error) throw error;
      setGoals(data || []);
    } catch (error) {
      console.error('Error fetching goals:', error);
      toast({
        title: "Error",
        description: "Failed to load goals",
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

  const getMilestones = (goal: Goal): Milestone[] => {
    if (!goal.milestones || !Array.isArray(goal.milestones)) {
      // Generate default milestones based on goal target
      const quarterSteps = [0.25, 0.5, 0.75, 1.0];
      return quarterSteps.map((step, index) => ({
        id: `${goal.id}-${index}`,
        title: `${(step * 100)}% Complete`,
        target_amount: goal.target_value * step,
        target_date: goal.target_date,
        completed: (goal.current_value || 0) >= (goal.target_value * step)
      }));
    }
    return goal.milestones;
  };

  const getNextMilestone = (goal: Goal) => {
    const milestones = getMilestones(goal);
    return milestones.find(milestone => !milestone.completed);
  };

  const getCompletedMilestones = (goal: Goal) => {
    const milestones = getMilestones(goal);
    return milestones.filter(milestone => milestone.completed).length;
  };

  const getDaysToTarget = (targetDate: string) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const toggleMilestone = async (goalId: string, milestoneId: string, completed: boolean) => {
    try {
      // This would typically update the milestone in the database
      // For now, we'll just show a toast
      toast({
        title: completed ? "Milestone Completed!" : "Milestone Updated",
        description: completed ? "Congratulations on reaching your milestone!" : "Milestone status updated",
      });
      
      // Refresh goals to update the UI
      fetchGoals();
    } catch (error) {
      console.error('Error updating milestone:', error);
      toast({
        title: "Error",
        description: "Failed to update milestone",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <CardTitle className="text-sm font-medium">Total Milestones</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {goals.reduce((total, goal) => total + getMilestones(goal).length, 0)}
            </div>
          </CardContent>
        </Card>

        <Card className="card-glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {goals.reduce((total, goal) => total + getCompletedMilestones(goal), 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {goals.length === 0 ? (
        <Card className="card-enhanced">
          <CardContent className="text-center py-8">
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">No active goals</h3>
            <p className="text-sm text-muted-foreground">Create goals to track milestones</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {goals.map((goal) => {
            const milestones = getMilestones(goal);
            const nextMilestone = getNextMilestone(goal);
            const completedCount = getCompletedMilestones(goal);
            const daysToTarget = getDaysToTarget(goal.target_date);
            
            return (
              <Card key={goal.id} className="card-enhanced">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {goal.title}
                        <Badge variant="outline">{goal.category}</Badge>
                      </CardTitle>
                      <CardDescription>
                        {formatCurrency(goal.current_value || 0)} of {formatCurrency(goal.target_value)} • {daysToTarget} days left
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{getProgress(goal).toFixed(1)}%</div>
                      <div className="text-sm text-muted-foreground">
                        {completedCount}/{milestones.length} milestones
                      </div>
                    </div>
                  </div>
                  <Progress value={getProgress(goal)} className="h-2" />
                </CardHeader>
                <CardContent>
                  {nextMilestone && (
                    <div className="mb-6 p-4 bg-primary/5 border border-primary/10 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        <span className="font-medium text-primary">Next Milestone</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {nextMilestone.title} - {formatCurrency(nextMilestone.target_amount)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatCurrency((nextMilestone.target_amount - (goal.current_value || 0)))} remaining
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <h4 className="font-medium mb-3">Milestones</h4>
                    {milestones.map((milestone) => (
                      <div
                        key={milestone.id}
                        className={`flex items-center justify-between p-3 border rounded-lg transition-all ${
                          milestone.completed
                            ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                            : 'bg-background border-border hover:border-primary/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-0 h-auto"
                            onClick={() => toggleMilestone(goal.id, milestone.id, !milestone.completed)}
                          >
                            {milestone.completed ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <Circle className="h-5 w-5 text-muted-foreground" />
                            )}
                          </Button>
                          <div>
                            <div className={`font-medium ${milestone.completed ? 'line-through text-muted-foreground' : ''}`}>
                              {milestone.title}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Target: {formatCurrency(milestone.target_amount)}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          {milestone.completed && milestone.completed_date && (
                            <div className="text-xs text-green-600">
                              Completed {new Date(milestone.completed_date).toLocaleDateString()}
                            </div>
                          )}
                          <Badge variant={milestone.completed ? "default" : "secondary"}>
                            {milestone.completed ? "Complete" : "Pending"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}