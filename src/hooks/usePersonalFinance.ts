import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface PersonalFinanceCategory {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  color?: string;
  category_type: 'income' | 'expense' | 'budget';
  is_active?: boolean;
  created_at: string;
  updated_at: string;
}

export interface PersonalExpense {
  id: string;
  user_id: string;
  category_id?: string;
  category?: PersonalFinanceCategory;
  amount: number;
  description: string;
  date: string;
  payment_method?: string;
  merchant?: string;
  receipt_url?: string;
  is_recurring?: boolean;
  recurrence_pattern?: string;
  tags?: string[];
  notes?: string;
  is_tax_deductible?: boolean;
  location?: string;
  created_at: string;
  updated_at: string;
}

export interface PersonalIncome {
  id: string;
  user_id: string;
  category_id?: string;
  category?: PersonalFinanceCategory;
  source: string;
  amount: number;
  target_amount?: number;
  description?: string;
  date: string;
  income_type: 'salary' | 'freelance' | 'investment' | 'business' | 'passive' | 'other';
  is_recurring?: boolean;
  recurrence_pattern?: string;
  tax_withheld?: number;
  net_amount?: number;
  payment_method?: string;
  employer_payer?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface PersonalBudget {
  id: string;
  user_id: string;
  category_id?: string;
  category?: PersonalFinanceCategory;
  name: string;
  budgeted_amount: number;
  spent_amount?: number;
  period: 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  start_date: string;
  end_date: string;
  alert_threshold?: number;
  is_active?: boolean;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface PersonalGoal {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  target_amount: number;
  current_amount?: number;
  target_date?: string;
  goal_type: 'savings' | 'debt_payoff' | 'purchase' | 'investment' | 'emergency_fund' | 'other';
  priority: 'low' | 'medium' | 'high';
  is_active?: boolean;
  is_completed?: boolean;
  completed_date?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export function usePersonalFinance() {
  const [categories, setCategories] = useState<PersonalFinanceCategory[]>([]);
  const [expenses, setExpenses] = useState<PersonalExpense[]>([]);
  const [income, setIncome] = useState<PersonalIncome[]>([]);
  const [budgets, setBudgets] = useState<PersonalBudget[]>([]);
  const [goals, setGoals] = useState<PersonalGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load all data
  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('pm_fnc_categories')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (categoriesError) throw categoriesError;
      setCategories((categoriesData || []) as PersonalFinanceCategory[]);

      // Load expenses with categories
      const { data: expensesData, error: expensesError } = await supabase
        .from('pm_fnc_expenses')
        .select(`
          *,
          category:pm_fnc_categories(*)
        `)
        .order('date', { ascending: false });

      if (expensesError) throw expensesError;
      setExpenses((expensesData || []) as PersonalExpense[]);

      // Load income with categories
      const { data: incomeData, error: incomeError } = await supabase
        .from('pm_fnc_income')
        .select(`
          *,
          category:pm_fnc_categories(*)
        `)
        .order('date', { ascending: false });

      if (incomeError) throw incomeError;
      setIncome((incomeData || []) as PersonalIncome[]);

      // Load budgets with categories
      const { data: budgetsData, error: budgetsError } = await supabase
        .from('pm_fnc_budgets')
        .select(`
          *,
          category:pm_fnc_categories(*)
        `)
        .eq('is_active', true)
        .order('name');

      if (budgetsError) throw budgetsError;
      setBudgets((budgetsData || []) as PersonalBudget[]);

      // Load goals
      const { data: goalsData, error: goalsError } = await supabase
        .from('pm_fnc_goals')
        .select('*')
        .eq('is_active', true)
        .order('target_date');

      if (goalsError) throw goalsError;
      setGoals((goalsData || []) as PersonalGoal[]);

    } catch (error) {
      console.error('Error loading personal finance data:', error);
      toast({
        title: "Error",
        description: "Failed to load finance data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Categories
  const addCategory = async (category: Omit<PersonalFinanceCategory, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('pm_fnc_categories')
        .insert([{
          ...category,
          user_id: (await supabase.auth.getUser()).data.user?.id,
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Category added successfully",
      });

      await loadData();
      return data;
    } catch (error) {
      console.error('Error adding category:', error);
      toast({
        title: "Error",
        description: "Failed to add category",
        variant: "destructive",
      });
    }
  };

  // Expenses
  const addExpense = async (expense: Omit<PersonalExpense, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('pm_fnc_expenses')
        .insert([{
          ...expense,
          user_id: (await supabase.auth.getUser()).data.user?.id,
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Expense added successfully",
      });

      await loadData();
      return data;
    } catch (error) {
      console.error('Error adding expense:', error);
      toast({
        title: "Error",
        description: "Failed to add expense",
        variant: "destructive",
      });
    }
  };

  const updateExpense = async (expenseId: string, updates: Partial<PersonalExpense>) => {
    try {
      const { error } = await supabase
        .from('pm_fnc_expenses')
        .update(updates)
        .eq('id', expenseId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Expense updated successfully",
      });

      await loadData();
    } catch (error) {
      console.error('Error updating expense:', error);
      toast({
        title: "Error",
        description: "Failed to update expense",
        variant: "destructive",
      });
    }
  };

  const deleteExpense = async (expenseId: string) => {
    try {
      const { error } = await supabase
        .from('pm_fnc_expenses')
        .delete()
        .eq('id', expenseId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Expense deleted successfully",
      });

      await loadData();
    } catch (error) {
      console.error('Error deleting expense:', error);
      toast({
        title: "Error",
        description: "Failed to delete expense",
        variant: "destructive",
      });
    }
  };

  // Income
  const addIncome = async (incomeData: Omit<PersonalIncome, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('pm_fnc_income')
        .insert([{
          ...incomeData,
          user_id: (await supabase.auth.getUser()).data.user?.id,
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Income added successfully",
      });

      await loadData();
      return data;
    } catch (error) {
      console.error('Error adding income:', error);
      toast({
        title: "Error",
        description: "Failed to add income",
        variant: "destructive",
      });
    }
  };

  // Budgets
  const addBudget = async (budget: Omit<PersonalBudget, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('pm_fnc_budgets')
        .insert([{
          ...budget,
          user_id: (await supabase.auth.getUser()).data.user?.id,
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Budget added successfully",
      });

      await loadData();
      return data;
    } catch (error) {
      console.error('Error adding budget:', error);
      toast({
        title: "Error",
        description: "Failed to add budget",
        variant: "destructive",
      });
    }
  };

  // Goals
  const addGoal = async (goal: Omit<PersonalGoal, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('pm_fnc_goals')
        .insert([{
          ...goal,
          user_id: (await supabase.auth.getUser()).data.user?.id,
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Goal added successfully",
      });

      await loadData();
      return data;
    } catch (error) {
      console.error('Error adding goal:', error);
      toast({
        title: "Error",
        description: "Failed to add goal",
        variant: "destructive",
      });
    }
  };

  // Analytics functions
  const getExpenseStats = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthlyExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    });

    const totalExpenses = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const categoryBreakdown = expenses.reduce((acc: any, expense) => {
      const categoryName = expense.category?.name || 'Uncategorized';
      if (!acc[categoryName]) {
        acc[categoryName] = { total: 0, count: 0, budget: 0 };
      }
      acc[categoryName].total += expense.amount;
      acc[categoryName].count += 1;
      return acc;
    }, {});

    return {
      totalExpenses,
      monthlyExpenses: monthlyExpenses.length,
      categoryBreakdown: Object.entries(categoryBreakdown).map(([category, data]: [string, any]) => ({
        category,
        amount: data.total,
        budget: data.budget,
        change: 0, // Calculate based on previous month
        trend: "up" as const
      }))
    };
  };

  const getIncomeStats = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthlyIncome = income.filter(incomeItem => {
      const incomeDate = new Date(incomeItem.date);
      return incomeDate.getMonth() === currentMonth && incomeDate.getFullYear() === currentYear;
    });

    const totalIncome = monthlyIncome.reduce((sum, incomeItem) => sum + incomeItem.amount, 0);
    const incomeBreakdown = income.reduce((acc: any, incomeItem) => {
      const source = incomeItem.source;
      if (!acc[source]) {
        acc[source] = { 
          total: 0, 
          target: incomeItem.target_amount || 0, 
          type: incomeItem.income_type,
          change: 0,
          trend: "up" as const
        };
      }
      acc[source].total += incomeItem.amount;
      return acc;
    }, {});

    return {
      totalIncome,
      monthlyIncome: monthlyIncome.length,
      incomeStreams: Object.entries(incomeBreakdown).map(([source, data]: [string, any]) => ({
        source,
        amount: data.total,
        target: data.target,
        type: data.type,
        change: data.change,
        trend: data.trend
      }))
    };
  };

  const getBudgetStats = () => {
    const budgetBreakdown = budgets.map(budget => ({
      name: budget.name,
      budget: budget.budgeted_amount,
      spent: budget.spent_amount || 0,
      percentage: budget.budgeted_amount > 0 ? Math.round((budget.spent_amount || 0) / budget.budgeted_amount * 100) : 0
    }));

    const totalBudget = budgets.reduce((sum, budget) => sum + budget.budgeted_amount, 0);
    const totalSpent = budgets.reduce((sum, budget) => sum + (budget.spent_amount || 0), 0);
    const overBudgetCount = budgetBreakdown.filter(b => b.percentage > 100).length;

    return {
      totalBudget,
      totalSpent,
      remaining: totalBudget - totalSpent,
      overBudgetCount,
      budgetCategories: budgetBreakdown
    };
  };

  return {
    // Data
    categories,
    expenses,
    income,
    budgets,
    goals,
    loading,
    
    // Category operations
    addCategory,
    
    // Expense operations
    addExpense,
    updateExpense,
    deleteExpense,
    
    // Income operations
    addIncome,
    
    // Budget operations
    addBudget,
    
    // Goal operations
    addGoal,
    
    // Analytics
    getExpenseStats,
    getIncomeStats,
    getBudgetStats,
    
    // Utility
    refreshData: loadData
  };
}