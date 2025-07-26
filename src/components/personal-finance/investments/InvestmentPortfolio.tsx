import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useGlobalization } from "@/contexts/GlobalizationContext";
import { useToast } from "@/hooks/use-toast";

interface Investment {
  id: string;
  investment_name: string;
  investment_type: string;
  symbol: string | null;
  quantity: number | null;
  purchase_price: number | null;
  current_price: number | null;
  purchase_date: string | null;
  broker_name: string | null;
  account_type: string | null;
  goal_id: string | null;
}

interface Goal {
  id: string;
  title: string;
}

export function InvestmentPortfolio() {
  const { user } = useAuth();
  const { formatCurrency } = useGlobalization();
  const { toast } = useToast();
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingInvestment, setEditingInvestment] = useState<Investment | null>(null);
  const [formData, setFormData] = useState({
    investment_name: '',
    investment_type: '',
    symbol: '',
    quantity: '',
    purchase_price: '',
    current_price: '',
    purchase_date: '',
    broker_name: '',
    account_type: '',
    goal_id: ''
  });

  useEffect(() => {
    if (user) {
      fetchInvestmentsAndGoals();
    }
  }, [user]);

  const fetchInvestmentsAndGoals = async () => {
    try {
      // Fetch investments
      const { data: investmentsData, error: investmentsError } = await supabase
        .from('pm_investments')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (investmentsError) throw investmentsError;

      // Fetch goals for linking
      const { data: goalsData, error: goalsError } = await supabase
        .from('pm_goals_general')
        .select('id, title')
        .eq('user_id', user?.id)
        .eq('is_active', true);

      if (goalsError) throw goalsError;

      setInvestments(investmentsData || []);
      setGoals(goalsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load investments",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const investmentData = {
        investment_name: formData.investment_name,
        investment_type: formData.investment_type,
        symbol: formData.symbol || null,
        quantity: formData.quantity ? parseFloat(formData.quantity) : null,
        purchase_price: formData.purchase_price ? parseFloat(formData.purchase_price) : null,
        current_price: formData.current_price ? parseFloat(formData.current_price) : null,
        purchase_date: formData.purchase_date || null,
        broker_name: formData.broker_name || null,
        account_type: formData.account_type || null,
        goal_id: formData.goal_id || null,
        user_id: user?.id
      };

      if (editingInvestment) {
        const { error } = await supabase
          .from('pm_investments')
          .update(investmentData)
          .eq('id', editingInvestment.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Investment updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('pm_investments')
          .insert(investmentData);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Investment added successfully",
        });
      }

      setShowCreateDialog(false);
      setEditingInvestment(null);
      resetForm();
      fetchInvestmentsAndGoals();
    } catch (error) {
      console.error('Error saving investment:', error);
      toast({
        title: "Error",
        description: "Failed to save investment",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (investmentId: string) => {
    try {
      const { error } = await supabase
        .from('pm_investments')
        .delete()
        .eq('id', investmentId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Investment deleted successfully",
      });
      
      fetchInvestmentsAndGoals();
    } catch (error) {
      console.error('Error deleting investment:', error);
      toast({
        title: "Error",
        description: "Failed to delete investment",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (investment: Investment) => {
    setEditingInvestment(investment);
    setFormData({
      investment_name: investment.investment_name,
      investment_type: investment.investment_type,
      symbol: investment.symbol || '',
      quantity: (investment.quantity || 0).toString(),
      purchase_price: (investment.purchase_price || 0).toString(),
      current_price: (investment.current_price || 0).toString(),
      purchase_date: investment.purchase_date || '',
      broker_name: investment.broker_name || '',
      account_type: investment.account_type || '',
      goal_id: investment.goal_id || ''
    });
    setShowCreateDialog(true);
  };

  const resetForm = () => {
    setFormData({
      investment_name: '',
      investment_type: '',
      symbol: '',
      quantity: '',
      purchase_price: '',
      current_price: '',
      purchase_date: '',
      broker_name: '',
      account_type: '',
      goal_id: ''
    });
  };

  const calculateGainLoss = (investment: Investment) => {
    if (!investment.quantity || !investment.purchase_price || !investment.current_price) return null;
    
    const purchaseValue = investment.quantity * investment.purchase_price;
    const currentValue = investment.quantity * investment.current_price;
    const gainLoss = currentValue - purchaseValue;
    const percentage = (gainLoss / purchaseValue) * 100;
    
    return { amount: gainLoss, percentage };
  };

  const getTotalValue = () => {
    return investments.reduce((total, investment) => {
      if (investment.quantity && investment.current_price) {
        return total + (investment.quantity * investment.current_price);
      }
      return total;
    }, 0);
  };

  const getTotalGainLoss = () => {
    return investments.reduce((total, investment) => {
      const gainLoss = calculateGainLoss(investment);
      return total + (gainLoss?.amount || 0);
    }, 0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const totalValue = getTotalValue();
  const totalGainLoss = getTotalGainLoss();

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="card-glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalValue)}</div>
          </CardContent>
        </Card>

        <Card className="card-glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Gain/Loss</CardTitle>
            {totalGainLoss >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalGainLoss >= 0 ? '+' : ''}{formatCurrency(totalGainLoss)}
            </div>
          </CardContent>
        </Card>

        <Card className="card-glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Holdings</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{investments.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="card-enhanced">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Investment Portfolio</CardTitle>
              <CardDescription>Track your investment holdings and performance</CardDescription>
            </div>
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button onClick={() => { setEditingInvestment(null); resetForm(); }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Investment
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>{editingInvestment ? 'Edit Investment' : 'Add Investment'}</DialogTitle>
                  <DialogDescription>
                    {editingInvestment ? 'Update your investment details.' : 'Add a new investment to your portfolio.'}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="investment_name">Investment Name</Label>
                      <Input
                        id="investment_name"
                        value={formData.investment_name}
                        onChange={(e) => setFormData({ ...formData, investment_name: e.target.value })}
                        placeholder="Apple Inc."
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="symbol">Symbol</Label>
                      <Input
                        id="symbol"
                        value={formData.symbol}
                        onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
                        placeholder="AAPL"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="investment_type">Investment Type</Label>
                      <Select value={formData.investment_type} onValueChange={(value) => setFormData({ ...formData, investment_type: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="stock">Stock</SelectItem>
                          <SelectItem value="etf">ETF</SelectItem>
                          <SelectItem value="mutual fund">Mutual Fund</SelectItem>
                          <SelectItem value="bond">Bond</SelectItem>
                          <SelectItem value="crypto">Cryptocurrency</SelectItem>
                          <SelectItem value="reit">REIT</SelectItem>
                          <SelectItem value="commodity">Commodity</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="account_type">Account Type</Label>
                      <Select value={formData.account_type} onValueChange={(value) => setFormData({ ...formData, account_type: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select account" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="taxable">Taxable</SelectItem>
                          <SelectItem value="ira">IRA</SelectItem>
                          <SelectItem value="roth ira">Roth IRA</SelectItem>
                          <SelectItem value="401k">401(k)</SelectItem>
                          <SelectItem value="hsa">HSA</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        step="0.001"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        placeholder="10"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="purchase_price">Purchase Price</Label>
                      <Input
                        id="purchase_price"
                        type="number"
                        step="0.01"
                        value={formData.purchase_price}
                        onChange={(e) => setFormData({ ...formData, purchase_price: e.target.value })}
                        placeholder="150.00"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="current_price">Current Price</Label>
                      <Input
                        id="current_price"
                        type="number"
                        step="0.01"
                        value={formData.current_price}
                        onChange={(e) => setFormData({ ...formData, current_price: e.target.value })}
                        placeholder="175.00"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="purchase_date">Purchase Date</Label>
                      <Input
                        id="purchase_date"
                        type="date"
                        value={formData.purchase_date}
                        onChange={(e) => setFormData({ ...formData, purchase_date: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="broker_name">Broker</Label>
                      <Input
                        id="broker_name"
                        value={formData.broker_name}
                        onChange={(e) => setFormData({ ...formData, broker_name: e.target.value })}
                        placeholder="Fidelity"
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
                      {editingInvestment ? 'Update Investment' : 'Add Investment'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {investments.length === 0 ? (
            <div className="text-center py-8">
              <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground">No investments yet</h3>
              <p className="text-sm text-muted-foreground">Add your first investment to track your portfolio</p>
            </div>
          ) : (
            <div className="space-y-4">
              {investments.map((investment) => {
                const gainLoss = calculateGainLoss(investment);
                const currentValue = investment.quantity && investment.current_price 
                  ? investment.quantity * investment.current_price 
                  : 0;

                return (
                  <div key={investment.id} className="p-4 border border-border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h4 className="font-medium">{investment.investment_name}</h4>
                          {investment.symbol && <Badge variant="outline">{investment.symbol}</Badge>}
                          <Badge>{investment.investment_type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {investment.broker_name} • {investment.account_type}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(investment)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(investment.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Quantity:</span>
                        <div className="font-medium">{investment.quantity || 0}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Current Value:</span>
                        <div className="font-medium">{formatCurrency(currentValue)}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Current Price:</span>
                        <div className="font-medium">{formatCurrency(investment.current_price || 0)}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Gain/Loss:</span>
                        <div className={`font-medium ${gainLoss && gainLoss.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {gainLoss ? (
                            <>
                              {gainLoss.amount >= 0 ? '+' : ''}{formatCurrency(gainLoss.amount)}
                              <br />
                              <span className="text-xs">({gainLoss.percentage >= 0 ? '+' : ''}{gainLoss.percentage.toFixed(2)}%)</span>
                            </>
                          ) : (
                            'N/A'
                          )}
                        </div>
                      </div>
                    </div>

                    {investment.purchase_date && (
                      <div className="text-xs text-muted-foreground border-t pt-2">
                        Purchased: {new Date(investment.purchase_date).toLocaleDateString()} at {formatCurrency(investment.purchase_price || 0)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}