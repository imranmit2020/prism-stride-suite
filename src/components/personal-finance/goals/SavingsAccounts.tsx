import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Banknote, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useGlobalization } from "@/contexts/GlobalizationContext";
import { useToast } from "@/hooks/use-toast";

interface SavingsAccount {
  id: string;
  account_name: string;
  account_type: string;
  bank_name: string | null;
  account_number_last4: string | null;
  current_balance: number | null;
  interest_rate: number | null;
  minimum_balance: number | null;
  monthly_fee: number | null;
  is_primary: boolean | null;
  goal_id: string | null;
  notes: string | null;
}

interface Goal {
  id: string;
  title: string;
}

export function SavingsAccounts() {
  const { user } = useAuth();
  const { formatCurrency } = useGlobalization();
  const { toast } = useToast();
  const [accounts, setAccounts] = useState<SavingsAccount[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingAccount, setEditingAccount] = useState<SavingsAccount | null>(null);
  const [formData, setFormData] = useState({
    account_name: '',
    account_type: '',
    bank_name: '',
    account_number_last4: '',
    current_balance: '',
    interest_rate: '',
    minimum_balance: '',
    monthly_fee: '',
    is_primary: false,
    goal_id: '',
    notes: ''
  });

  useEffect(() => {
    if (user) {
      fetchAccountsAndGoals();
    }
  }, [user]);

  const fetchAccountsAndGoals = async () => {
    try {
      // Fetch savings accounts
      const { data: accountsData, error: accountsError } = await supabase
        .from('pm_savings_accounts')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (accountsError) throw accountsError;

      // Fetch goals for linking
      const { data: goalsData, error: goalsError } = await supabase
        .from('pm_goals_general')
        .select('id, title')
        .eq('user_id', user?.id)
        .eq('is_active', true);

      if (goalsError) throw goalsError;

      setAccounts(accountsData || []);
      setGoals(goalsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load savings accounts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const accountData = {
        account_name: formData.account_name,
        account_type: formData.account_type,
        bank_name: formData.bank_name || null,
        account_number_last4: formData.account_number_last4 || null,
        current_balance: formData.current_balance ? parseFloat(formData.current_balance) : null,
        interest_rate: formData.interest_rate ? parseFloat(formData.interest_rate) : null,
        minimum_balance: formData.minimum_balance ? parseFloat(formData.minimum_balance) : null,
        monthly_fee: formData.monthly_fee ? parseFloat(formData.monthly_fee) : null,
        is_primary: formData.is_primary,
        goal_id: formData.goal_id || null,
        notes: formData.notes || null,
        user_id: user?.id
      };

      if (editingAccount) {
        const { error } = await supabase
          .from('pm_savings_accounts')
          .update(accountData)
          .eq('id', editingAccount.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Savings account updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('pm_savings_accounts')
          .insert(accountData);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Savings account created successfully",
        });
      }

      setShowCreateDialog(false);
      setEditingAccount(null);
      resetForm();
      fetchAccountsAndGoals();
    } catch (error) {
      console.error('Error saving account:', error);
      toast({
        title: "Error",
        description: "Failed to save savings account",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (accountId: string) => {
    try {
      const { error } = await supabase
        .from('pm_savings_accounts')
        .delete()
        .eq('id', accountId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Savings account deleted successfully",
      });
      
      fetchAccountsAndGoals();
    } catch (error) {
      console.error('Error deleting account:', error);
      toast({
        title: "Error",
        description: "Failed to delete savings account",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (account: SavingsAccount) => {
    setEditingAccount(account);
    setFormData({
      account_name: account.account_name,
      account_type: account.account_type,
      bank_name: account.bank_name || '',
      account_number_last4: account.account_number_last4 || '',
      current_balance: (account.current_balance || 0).toString(),
      interest_rate: (account.interest_rate || 0).toString(),
      minimum_balance: (account.minimum_balance || 0).toString(),
      monthly_fee: (account.monthly_fee || 0).toString(),
      is_primary: account.is_primary || false,
      goal_id: account.goal_id || '',
      notes: account.notes || ''
    });
    setShowCreateDialog(true);
  };

  const resetForm = () => {
    setFormData({
      account_name: '',
      account_type: '',
      bank_name: '',
      account_number_last4: '',
      current_balance: '',
      interest_rate: '',
      minimum_balance: '',
      monthly_fee: '',
      is_primary: false,
      goal_id: '',
      notes: ''
    });
  };

  const totalBalance = accounts.reduce((sum, account) => sum + (account.current_balance || 0), 0);
  const averageInterest = accounts.length > 0 
    ? accounts.reduce((sum, account) => sum + (account.interest_rate || 0), 0) / accounts.length 
    : 0;

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="card-glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalBalance)}</div>
          </CardContent>
        </Card>

        <Card className="card-glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accounts</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accounts.length}</div>
          </CardContent>
        </Card>

        <Card className="card-glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Interest</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageInterest.toFixed(2)}%</div>
          </CardContent>
        </Card>
      </div>

      <Card className="card-enhanced">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Savings Accounts</CardTitle>
              <CardDescription>Manage your savings accounts and track balances</CardDescription>
            </div>
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button onClick={() => { setEditingAccount(null); resetForm(); }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Account
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>{editingAccount ? 'Edit Account' : 'Add Savings Account'}</DialogTitle>
                  <DialogDescription>
                    {editingAccount ? 'Update your savings account details.' : 'Add a new savings account to track your balances.'}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="account_name">Account Name</Label>
                      <Input
                        id="account_name"
                        value={formData.account_name}
                        onChange={(e) => setFormData({ ...formData, account_name: e.target.value })}
                        placeholder="My Emergency Fund"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="account_type">Account Type</Label>
                      <Select value={formData.account_type} onValueChange={(value) => setFormData({ ...formData, account_type: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="savings">Savings</SelectItem>
                          <SelectItem value="checking">Checking</SelectItem>
                          <SelectItem value="money market">Money Market</SelectItem>
                          <SelectItem value="cd">Certificate of Deposit</SelectItem>
                          <SelectItem value="high yield">High Yield Savings</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bank_name">Bank Name</Label>
                      <Input
                        id="bank_name"
                        value={formData.bank_name}
                        onChange={(e) => setFormData({ ...formData, bank_name: e.target.value })}
                        placeholder="Chase Bank"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="account_number_last4">Last 4 Digits</Label>
                      <Input
                        id="account_number_last4"
                        value={formData.account_number_last4}
                        onChange={(e) => setFormData({ ...formData, account_number_last4: e.target.value })}
                        placeholder="1234"
                        maxLength={4}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current_balance">Current Balance</Label>
                      <Input
                        id="current_balance"
                        type="number"
                        step="0.01"
                        value={formData.current_balance}
                        onChange={(e) => setFormData({ ...formData, current_balance: e.target.value })}
                        placeholder="5000.00"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="interest_rate">Interest Rate (%)</Label>
                      <Input
                        id="interest_rate"
                        type="number"
                        step="0.01"
                        value={formData.interest_rate}
                        onChange={(e) => setFormData({ ...formData, interest_rate: e.target.value })}
                        placeholder="2.50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="minimum_balance">Minimum Balance</Label>
                      <Input
                        id="minimum_balance"
                        type="number"
                        step="0.01"
                        value={formData.minimum_balance}
                        onChange={(e) => setFormData({ ...formData, minimum_balance: e.target.value })}
                        placeholder="100.00"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="monthly_fee">Monthly Fee</Label>
                      <Input
                        id="monthly_fee"
                        type="number"
                        step="0.01"
                        value={formData.monthly_fee}
                        onChange={(e) => setFormData({ ...formData, monthly_fee: e.target.value })}
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="goal_id">Link to Goal (Optional)</Label>
                    <Select value={formData.goal_id} onValueChange={(value) => setFormData({ ...formData, goal_id: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a goal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">No goal</SelectItem>
                        {goals.map((goal) => (
                          <SelectItem key={goal.id} value={goal.id}>{goal.title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <DialogFooter>
                    <Button type="submit">
                      {editingAccount ? 'Update Account' : 'Add Account'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {accounts.length === 0 ? (
            <div className="text-center py-8">
              <Banknote className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground">No savings accounts</h3>
              <p className="text-sm text-muted-foreground">Add your first savings account to track balances</p>
            </div>
          ) : (
            <div className="space-y-4">
              {accounts.map((account) => (
                <div key={account.id} className="p-4 border border-border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h4 className="font-medium">{account.account_name}</h4>
                        {account.is_primary && <Badge>Primary</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {account.bank_name} • {account.account_type}
                        {account.account_number_last4 && ` • ****${account.account_number_last4}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(account)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(account.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Balance:</span>
                      <div className="font-medium">{formatCurrency(account.current_balance || 0)}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Interest:</span>
                      <div className="font-medium">{account.interest_rate?.toFixed(2) || 0}%</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Min Balance:</span>
                      <div className="font-medium">{formatCurrency(account.minimum_balance || 0)}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Monthly Fee:</span>
                      <div className="font-medium">{formatCurrency(account.monthly_fee || 0)}</div>
                    </div>
                  </div>

                  {account.notes && (
                    <p className="text-sm text-muted-foreground border-t pt-2">{account.notes}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}