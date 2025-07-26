import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { PiggyBank, Target, Calendar } from "lucide-react";
import { usePersonalFinance } from "@/hooks/usePersonalFinance";

export function PersonalBudgetInput() {
  const { addBudget, categories, loading } = usePersonalFinance();
  const [budgetData, setBudgetData] = useState({
    name: "",
    budgeted_amount: "",
    period: "monthly",
    start_date: new Date().toISOString().split('T')[0],
    end_date: "",
    category_id: "",
    alert_threshold: [80],
    is_active: true,
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateEndDate = (startDate: string, period: string) => {
    const start = new Date(startDate);
    const end = new Date(start);

    switch (period) {
      case 'weekly':
        end.setDate(start.getDate() + 7);
        break;
      case 'monthly':
        end.setMonth(start.getMonth() + 1);
        break;
      case 'quarterly':
        end.setMonth(start.getMonth() + 3);
        break;
      case 'yearly':
        end.setFullYear(start.getFullYear() + 1);
        break;
      default:
        end.setMonth(start.getMonth() + 1);
    }

    return end.toISOString().split('T')[0];
  };

  const handlePeriodChange = (period: string) => {
    setBudgetData(prev => ({
      ...prev,
      period,
      end_date: calculateEndDate(prev.start_date, period)
    }));
  };

  const handleStartDateChange = (startDate: string) => {
    setBudgetData(prev => ({
      ...prev,
      start_date: startDate,
      end_date: calculateEndDate(startDate, prev.period)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!budgetData.name || !budgetData.budgeted_amount) {
      return;
    }

    setIsSubmitting(true);
    try {
      await addBudget({
        name: budgetData.name,
        budgeted_amount: parseFloat(budgetData.budgeted_amount),
        period: budgetData.period as 'weekly' | 'monthly' | 'quarterly' | 'yearly',
        start_date: budgetData.start_date,
        end_date: budgetData.end_date,
        category_id: budgetData.category_id || undefined,
        alert_threshold: budgetData.alert_threshold[0],
        is_active: budgetData.is_active,
        notes: budgetData.notes || undefined
      });

      // Reset form
      setBudgetData({
        name: "",
        budgeted_amount: "",
        period: "monthly",
        start_date: new Date().toISOString().split('T')[0],
        end_date: "",
        category_id: "",
        alert_threshold: [80],
        is_active: true,
        notes: ""
      });
    } catch (error) {
      console.error('Error adding budget:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const budgetCategories = categories.filter(cat => cat.category_type === 'budget');
  const expenseCategories = categories.filter(cat => cat.category_type === 'expense');
  const allBudgetCategories = [...budgetCategories, ...expenseCategories];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PiggyBank className="h-5 w-5 text-primary" />
          Create Personal Budget
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Budget Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Monthly Groceries, Entertainment Budget"
              value={budgetData.name}
              onChange={(e) => setBudgetData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budgeted_amount">Budget Amount *</Label>
              <div className="relative">
                <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="budgeted_amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="pl-10"
                  value={budgetData.budgeted_amount}
                  onChange={(e) => setBudgetData(prev => ({ ...prev, budgeted_amount: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="period">Budget Period *</Label>
              <Select value={budgetData.period} onValueChange={handlePeriodChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_date">Start Date *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="start_date"
                  type="date"
                  className="pl-10"
                  value={budgetData.start_date}
                  onChange={(e) => handleStartDateChange(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="end_date">End Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="end_date"
                  type="date"
                  className="pl-10"
                  value={budgetData.end_date}
                  onChange={(e) => setBudgetData(prev => ({ ...prev, end_date: e.target.value }))}
                  readOnly
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Automatically calculated based on period
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={budgetData.category_id} onValueChange={(value) => setBudgetData(prev => ({ ...prev, category_id: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select category (optional)" />
              </SelectTrigger>
              <SelectContent>
                {allBudgetCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: category.color || '#3B82F6' }}
                      />
                      {category.name}
                      <span className="text-xs text-muted-foreground">
                        ({category.category_type})
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Alert Threshold: {budgetData.alert_threshold[0]}%</Label>
            <p className="text-sm text-muted-foreground">
              Get notified when spending reaches this percentage of your budget
            </p>
            <Slider
              value={budgetData.alert_threshold}
              onValueChange={(value) => setBudgetData(prev => ({ ...prev, alert_threshold: value }))}
              min={10}
              max={100}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>10%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="is_active">Active Budget</Label>
              <p className="text-sm text-muted-foreground">
                Track expenses against this budget
              </p>
            </div>
            <Switch
              id="is_active"
              checked={budgetData.is_active}
              onCheckedChange={(checked) => setBudgetData(prev => ({ ...prev, is_active: checked }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Budget goals, specific rules, or additional details"
              value={budgetData.notes}
              onChange={(e) => setBudgetData(prev => ({ ...prev, notes: e.target.value }))}
            />
          </div>

          <div className="pt-4 border-t">
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <h4 className="font-medium">Budget Summary</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="ml-2 font-medium">
                    ${budgetData.budgeted_amount || '0.00'}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Period:</span>
                  <span className="ml-2 font-medium capitalize">
                    {budgetData.period}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Alert at:</span>
                  <span className="ml-2 font-medium">
                    ${((parseFloat(budgetData.budgeted_amount) || 0) * budgetData.alert_threshold[0] / 100).toFixed(2)}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="ml-2 font-medium">
                    {budgetData.start_date && budgetData.end_date 
                      ? `${Math.ceil((new Date(budgetData.end_date).getTime() - new Date(budgetData.start_date).getTime()) / (1000 * 60 * 60 * 24))} days`
                      : 'N/A'
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting || loading} className="w-full">
            {isSubmitting ? "Creating Budget..." : "Create Budget"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}