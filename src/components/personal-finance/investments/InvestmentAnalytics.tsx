import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from "recharts";
import { TrendingUp, TrendingDown, AlertTriangle, Target, Calculator, Brain, DollarSign, PieChart } from "lucide-react";
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

export function InvestmentAnalytics() {
  const { user } = useAuth();
  const { formatCurrency } = useGlobalization();
  const { toast } = useToast();
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('all');

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
        .order('purchase_date', { ascending: true });

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

  const calculatePortfolioMetrics = () => {
    let totalValue = 0;
    let totalCost = 0;
    let diversificationScore = 0;
    const typeDistribution = new Map<string, number>();
    const riskLevels = new Map<string, number>();

    investments.forEach(investment => {
      if (investment.quantity && investment.purchase_price && investment.current_price) {
        const costBasis = investment.quantity * investment.purchase_price;
        const currentValue = investment.quantity * investment.current_price;
        
        totalCost += costBasis;
        totalValue += currentValue;

        // Track type distribution
        const currentTypeValue = typeDistribution.get(investment.investment_type) || 0;
        typeDistribution.set(investment.investment_type, currentTypeValue + currentValue);

        // Assign risk levels (simplified)
        const riskLevel = getRiskLevel(investment.investment_type);
        const currentRiskValue = riskLevels.get(riskLevel) || 0;
        riskLevels.set(riskLevel, currentRiskValue + currentValue);
      }
    });

    // Calculate diversification score (simplified)
    const numTypes = typeDistribution.size;
    const maxTypes = 8; // Maximum reasonable asset types
    diversificationScore = Math.min((numTypes / maxTypes) * 100, 100);

    // Calculate Sharpe ratio (simplified)
    const totalReturn = totalCost > 0 ? ((totalValue - totalCost) / totalCost) * 100 : 0;
    const sharpeRatio = totalReturn / Math.max(getPortfolioVolatility(), 1); // Simplified

    return {
      totalValue,
      totalCost,
      totalReturn,
      diversificationScore,
      sharpeRatio,
      typeDistribution: Array.from(typeDistribution.entries()),
      riskDistribution: Array.from(riskLevels.entries())
    };
  };

  const getRiskLevel = (investmentType: string): string => {
    const riskMap: { [key: string]: string } = {
      'stock': 'High',
      'etf': 'Medium',
      'mutual fund': 'Medium',
      'bond': 'Low',
      'crypto': 'Very High',
      'reit': 'Medium',
      'commodity': 'High'
    };
    return riskMap[investmentType.toLowerCase()] || 'Medium';
  };

  const getPortfolioVolatility = (): number => {
    // Simplified volatility calculation
    const returns = investments.map(inv => {
      if (inv.quantity && inv.purchase_price && inv.current_price) {
        return ((inv.current_price - inv.purchase_price) / inv.purchase_price) * 100;
      }
      return 0;
    });

    if (returns.length === 0) return 0;

    const mean = returns.reduce((sum, ret) => sum + ret, 0) / returns.length;
    const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - mean, 2), 0) / returns.length;
    return Math.sqrt(variance);
  };

  const generateInvestmentTimeline = () => {
    const timeline = investments
      .filter(inv => inv.purchase_date && inv.quantity && inv.purchase_price && inv.current_price)
      .map(inv => ({
        date: inv.purchase_date!,
        investment: inv.investment_name,
        invested: inv.quantity! * inv.purchase_price!,
        currentValue: inv.quantity! * inv.current_price!,
        type: inv.investment_type
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Aggregate by month
    const monthlyData = new Map<string, { invested: number; currentValue: number; count: number }>();
    
    timeline.forEach(item => {
      const monthKey = item.date.substring(0, 7); // YYYY-MM
      const existing = monthlyData.get(monthKey) || { invested: 0, currentValue: 0, count: 0 };
      monthlyData.set(monthKey, {
        invested: existing.invested + item.invested,
        currentValue: existing.currentValue + item.currentValue,
        count: existing.count + 1
      });
    });

    return Array.from(monthlyData.entries()).map(([month, data]) => ({
      month,
      invested: data.invested,
      currentValue: data.currentValue,
      return: ((data.currentValue - data.invested) / data.invested) * 100,
      investments: data.count
    }));
  };

  const getAIInsights = () => {
    const metrics = calculatePortfolioMetrics();
    const insights = [];

    // Diversification insight
    if (metrics.diversificationScore < 40) {
      insights.push({
        type: 'warning',
        title: 'Low Diversification',
        message: `Your portfolio diversification score is ${metrics.diversificationScore.toFixed(1)}%. Consider adding different asset types to reduce risk.`,
        icon: AlertTriangle
      });
    } else if (metrics.diversificationScore > 80) {
      insights.push({
        type: 'success',
        title: 'Well Diversified',
        message: `Excellent diversification score of ${metrics.diversificationScore.toFixed(1)}%. Your portfolio is well-balanced across asset types.`,
        icon: Target
      });
    }

    // Performance insight
    if (metrics.totalReturn > 10) {
      insights.push({
        type: 'success',
        title: 'Strong Performance',
        message: `Your portfolio is up ${metrics.totalReturn.toFixed(2)}%. Great job on your investment choices!`,
        icon: TrendingUp
      });
    } else if (metrics.totalReturn < -10) {
      insights.push({
        type: 'warning',
        title: 'Underperforming',
        message: `Your portfolio is down ${Math.abs(metrics.totalReturn).toFixed(2)}%. Consider reviewing your investment strategy.`,
        icon: TrendingDown
      });
    }

    // Risk insight
    const highRiskPercentage = metrics.riskDistribution
      .filter(([risk]) => risk === 'High' || risk === 'Very High')
      .reduce((sum, [, value]) => sum + value, 0) / metrics.totalValue * 100;

    if (highRiskPercentage > 60) {
      insights.push({
        type: 'warning',
        title: 'High Risk Exposure',
        message: `${highRiskPercentage.toFixed(1)}% of your portfolio is in high-risk assets. Consider rebalancing for better stability.`,
        icon: AlertTriangle
      });
    }

    return insights;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const metrics = calculatePortfolioMetrics();
  const timelineData = generateInvestmentTimeline();
  const aiInsights = getAIInsights();

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="card-glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Return</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${metrics.totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {metrics.totalReturn >= 0 ? '+' : ''}{metrics.totalReturn.toFixed(2)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(metrics.totalValue - metrics.totalCost)} gain/loss
            </p>
          </CardContent>
        </Card>

        <Card className="card-glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Diversification</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.diversificationScore.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {metrics.typeDistribution.length} asset types
            </p>
          </CardContent>
        </Card>

        <Card className="card-glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sharpe Ratio</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.sharpeRatio.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Risk-adjusted return
            </p>
          </CardContent>
        </Card>

        <Card className="card-glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(metrics.totalValue)}</div>
            <p className="text-xs text-muted-foreground">
              Cost: {formatCurrency(metrics.totalCost)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      {aiInsights.length > 0 && (
        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Portfolio Insights
            </CardTitle>
            <CardDescription>Personalized recommendations based on your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiInsights.map((insight, index) => (
                <div key={index} className={`p-4 rounded-lg border ${
                  insight.type === 'warning' 
                    ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800' 
                    : 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                }`}>
                  <div className="flex items-start gap-3">
                    <insight.icon className={`h-5 w-5 mt-0.5 ${
                      insight.type === 'warning' ? 'text-yellow-600' : 'text-green-600'
                    }`} />
                    <div>
                      <h4 className={`font-medium ${
                        insight.type === 'warning' ? 'text-yellow-800 dark:text-yellow-400' : 'text-green-800 dark:text-green-400'
                      }`}>
                        {insight.title}
                      </h4>
                      <p className={`text-sm ${
                        insight.type === 'warning' ? 'text-yellow-700 dark:text-yellow-300' : 'text-green-700 dark:text-green-300'
                      }`}>
                        {insight.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Investment Timeline */}
      {timelineData.length > 0 && (
        <Card className="card-enhanced">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Investment Timeline</CardTitle>
                <CardDescription>Portfolio growth over time</CardDescription>
              </div>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="1y">1 Year</SelectItem>
                  <SelectItem value="6m">6 Months</SelectItem>
                  <SelectItem value="3m">3 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  tickFormatter={(value) => new Date(value + '-01').toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
                />
                <YAxis tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip 
                  formatter={(value: number, name: string) => [formatCurrency(value), name === 'invested' ? 'Invested' : 'Current Value']}
                  labelFormatter={(label) => new Date(label + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                />
                <Area type="monotone" dataKey="invested" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Area type="monotone" dataKey="currentValue" stackId="2" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asset Type Distribution */}
        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle>Asset Type Distribution</CardTitle>
            <CardDescription>Portfolio allocation by investment type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics.typeDistribution.map(([type, value]) => {
                const percentage = (value / metrics.totalValue) * 100;
                return (
                  <div key={type} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize">{type}</span>
                      <span>{percentage.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatCurrency(value)}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Risk Distribution */}
        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle>Risk Distribution</CardTitle>
            <CardDescription>Portfolio allocation by risk level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics.riskDistribution.map(([risk, value]) => {
                const percentage = (value / metrics.totalValue) * 100;
                const riskColor = {
                  'Low': 'bg-green-500',
                  'Medium': 'bg-yellow-500', 
                  'High': 'bg-orange-500',
                  'Very High': 'bg-red-500'
                }[risk] || 'bg-gray-500';

                return (
                  <div key={risk} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Badge variant={risk === 'Low' ? 'default' : risk === 'Medium' ? 'secondary' : 'destructive'}>
                          {risk}
                        </Badge>
                      </div>
                      <span>{percentage.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${riskColor}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatCurrency(value)}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}