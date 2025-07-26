import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Target, BarChart3, PieChart } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell } from "recharts";
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
}

export function InvestmentPerformance() {
  const { user } = useAuth();
  const { formatCurrency } = useGlobalization();
  const { toast } = useToast();
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchInvestments();
    }
  }, [user]);

  const fetchInvestments = async () => {
    try {
      const { data, error } = await supabase
        .from('pm_investments')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInvestments(data || []);
    } catch (error) {
      console.error('Error fetching investments:', error);
      toast({
        title: "Error",
        description: "Failed to load investments",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateGainLoss = (investment: Investment) => {
    if (!investment.quantity || !investment.purchase_price || !investment.current_price) return null;
    
    const purchaseValue = investment.quantity * investment.purchase_price;
    const currentValue = investment.quantity * investment.current_price;
    const gainLoss = currentValue - purchaseValue;
    const percentage = (gainLoss / purchaseValue) * 100;
    
    return { amount: gainLoss, percentage, currentValue, purchaseValue };
  };

  const getPerformanceData = () => {
    return investments
      .map(investment => {
        const performance = calculateGainLoss(investment);
        if (!performance) return null;
        
        return {
          name: investment.symbol || investment.investment_name,
          gain_loss: performance.amount,
          percentage: performance.percentage,
          current_value: performance.currentValue,
          type: investment.investment_type
        };
      })
      .filter(Boolean)
      .sort((a, b) => b!.percentage - a!.percentage);
  };

  const getAllocationData = () => {
    const typeMap = new Map<string, number>();
    
    investments.forEach(investment => {
      if (investment.quantity && investment.current_price) {
        const value = investment.quantity * investment.current_price;
        const currentValue = typeMap.get(investment.investment_type) || 0;
        typeMap.set(investment.investment_type, currentValue + value);
      }
    });

    return Array.from(typeMap.entries()).map(([type, value]) => ({
      name: type,
      value,
      percentage: 0 // Will be calculated after getting total
    }));
  };

  const getTotals = () => {
    let totalValue = 0;
    let totalCost = 0;
    let totalGainLoss = 0;

    investments.forEach(investment => {
      const performance = calculateGainLoss(investment);
      if (performance) {
        totalValue += performance.currentValue;
        totalCost += performance.purchaseValue;
        totalGainLoss += performance.amount;
      }
    });

    const totalPercentage = totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0;

    return { totalValue, totalCost, totalGainLoss, totalPercentage };
  };

  const getTopPerformers = () => {
    const performanceData = getPerformanceData();
    return performanceData.slice(0, 5);
  };

  const getWorstPerformers = () => {
    const performanceData = getPerformanceData();
    return performanceData.slice(-3).reverse();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const totals = getTotals();
  const allocationData = getAllocationData();
  const totalAllocation = allocationData.reduce((sum, item) => sum + item.value, 0);
  
  // Calculate percentages for allocation
  allocationData.forEach(item => {
    item.percentage = totalAllocation > 0 ? (item.value / totalAllocation) * 100 : 0;
  });

  const performanceData = getPerformanceData();
  const topPerformers = getTopPerformers();
  const worstPerformers = getWorstPerformers();

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  return (
    <div className="space-y-6">
      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="card-glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totals.totalValue)}</div>
            <p className="text-xs text-muted-foreground">
              Cost basis: {formatCurrency(totals.totalCost)}
            </p>
          </CardContent>
        </Card>

        <Card className="card-glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Return</CardTitle>
            {totals.totalGainLoss >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totals.totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totals.totalGainLoss >= 0 ? '+' : ''}{formatCurrency(totals.totalGainLoss)}
            </div>
            <p className={`text-xs ${totals.totalPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totals.totalPercentage >= 0 ? '+' : ''}{totals.totalPercentage.toFixed(2)}%
            </p>
          </CardContent>
        </Card>

        <Card className="card-glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Performer</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            {topPerformers.length > 0 ? (
              <>
                <div className="text-lg font-bold">{topPerformers[0].name}</div>
                <p className="text-xs text-green-600">
                  +{topPerformers[0].percentage.toFixed(2)}%
                </p>
              </>
            ) : (
              <div className="text-sm text-muted-foreground">No data</div>
            )}
          </CardContent>
        </Card>

        <Card className="card-glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Holdings</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{investments.length}</div>
            <p className="text-xs text-muted-foreground">
              {allocationData.length} asset types
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      {performanceData.length > 0 && (
        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Individual Performance
            </CardTitle>
            <CardDescription>Gain/loss percentage by holding</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={60}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [`${value.toFixed(2)}%`, 'Return']}
                  labelFormatter={(label) => `Asset: ${label}`}
                />
                <Bar 
                  dataKey="percentage" 
                  fill="#3B82F6"
                  name="Return %"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asset Allocation */}
        {allocationData.length > 0 && (
          <Card className="card-enhanced">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Asset Allocation
              </CardTitle>
              <CardDescription>Portfolio distribution by asset type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <RechartsPieChart>
                  <RechartsPieChart data={allocationData}>
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </RechartsPieChart>
                  <Tooltip 
                    formatter={(value: number) => [formatCurrency(value), 'Value']}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {allocationData.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="capitalize">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{formatCurrency(item.value)}</div>
                      <div className="text-xs text-muted-foreground">{item.percentage.toFixed(1)}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Top & Worst Performers */}
        <div className="space-y-4">
          {/* Top Performers */}
          {topPerformers.length > 0 && (
            <Card className="card-enhanced">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <TrendingUp className="h-5 w-5" />
                  Top Performers
                </CardTitle>
                <CardDescription>Best performing investments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topPerformers.map((performer, index) => (
                    <div key={performer.name} className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium text-green-800 dark:text-green-400">
                          #{index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{performer.name}</div>
                          <div className="text-xs text-muted-foreground capitalize">{performer.type}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-600">
                          +{performer.percentage.toFixed(2)}%
                        </div>
                        <div className="text-xs text-green-600">
                          +{formatCurrency(performer.gain_loss)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Worst Performers */}
          {worstPerformers.length > 0 && worstPerformers[0].percentage < 0 && (
            <Card className="card-enhanced">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <TrendingDown className="h-5 w-5" />
                  Needs Attention
                </CardTitle>
                <CardDescription>Underperforming investments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {worstPerformers.filter(p => p.percentage < 0).map((performer) => (
                    <div key={performer.name} className="flex items-center justify-between p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div>
                        <div className="font-medium">{performer.name}</div>
                        <div className="text-xs text-muted-foreground capitalize">{performer.type}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-red-600">
                          {performer.percentage.toFixed(2)}%
                        </div>
                        <div className="text-xs text-red-600">
                          {formatCurrency(performer.gain_loss)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}