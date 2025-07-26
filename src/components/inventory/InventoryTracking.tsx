import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Activity, 
  Search, 
  Filter,
  ArrowUpDown,
  Package,
  Warehouse,
  Calendar,
  TrendingUp,
  TrendingDown,
  RotateCcw,
  Plus,
  Minus,
  ArrowRightLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useInventory } from "@/hooks/useInventory";
import { useWarehouses } from "@/hooks/useWarehouses";

interface InventoryTransaction {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  warehouseName: string;
  transactionType: 'in' | 'out' | 'transfer' | 'adjustment';
  quantity: number;
  unitCost?: number;
  referenceNumber?: string;
  notes?: string;
  createdAt: string;
  userId?: string;
}

interface TrackingStats {
  totalTransactions: number;
  totalIn: number;
  totalOut: number;
  totalValue: number;
  recentActivity: number;
}

export function InventoryTracking() {
  const { toast } = useToast();
  const { inventory } = useInventory();
  const { warehouses } = useWarehouses();
  const [transactions, setTransactions] = useState<InventoryTransaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<InventoryTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [stats, setStats] = useState<TrackingStats>({
    totalTransactions: 0,
    totalIn: 0,
    totalOut: 0,
    totalValue: 0,
    recentActivity: 0
  });

  // Load transactions with product and warehouse details
  const loadTransactions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bm_inv_transactions')
        .select(`
          *,
          bm_inv_products(name, sku),
          bm_inv_warehouses(name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const transformedTransactions: InventoryTransaction[] = (data || []).map(tx => ({
        id: tx.id,
        productId: tx.product_id,
        productName: tx.bm_inv_products?.name || 'Unknown Product',
        sku: tx.bm_inv_products?.sku || 'N/A',
        warehouseName: tx.bm_inv_warehouses?.name || 'Unknown Warehouse',
        transactionType: mapTransactionType(tx.transaction_type),
        quantity: tx.quantity,
        unitCost: tx.unit_cost,
        referenceNumber: tx.reference_number,
        notes: tx.notes,
        createdAt: tx.created_at,
        userId: tx.user_id
      }));

      setTransactions(transformedTransactions);
      calculateStats(transformedTransactions);
    } catch (error) {
      console.error('Error loading transactions:', error);
      toast({
        title: "Error Loading Transactions",
        description: "Failed to load inventory tracking data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const mapTransactionType = (type: string): 'in' | 'out' | 'transfer' | 'adjustment' => {
    switch (type.toLowerCase()) {
      case 'stock_in':
      case 'purchase':
      case 'return':
        return 'in';
      case 'stock_out':
      case 'sale':
      case 'waste':
        return 'out';
      case 'transfer':
        return 'transfer';
      case 'adjustment':
        return 'adjustment';
      default:
        return 'adjustment';
    }
  };

  const calculateStats = (txList: InventoryTransaction[]) => {
    const now = new Date();
    const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    const stats: TrackingStats = {
      totalTransactions: txList.length,
      totalIn: txList.filter(tx => tx.transactionType === 'in').reduce((sum, tx) => sum + tx.quantity, 0),
      totalOut: txList.filter(tx => tx.transactionType === 'out').reduce((sum, tx) => sum + Math.abs(tx.quantity), 0),
      totalValue: txList.reduce((sum, tx) => sum + (tx.quantity * (tx.unitCost || 0)), 0),
      recentActivity: txList.filter(tx => new Date(tx.createdAt) >= last24h).length
    };
    
    setStats(stats);
  };

  // Apply filters
  useEffect(() => {
    let filtered = transactions;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(tx =>
        tx.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.warehouseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.referenceNumber?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter(tx => tx.transactionType === typeFilter);
    }

    // Date filter
    if (dateFilter !== "all") {
      const now = new Date();
      let cutoffDate: Date;
      
      switch (dateFilter) {
        case "today":
          cutoffDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case "week":
          cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case "month":
          cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        default:
          cutoffDate = new Date(0);
      }
      
      filtered = filtered.filter(tx => new Date(tx.createdAt) >= cutoffDate);
    }

    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, typeFilter, dateFilter]);

  useEffect(() => {
    loadTransactions();
  }, []);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'in': return <Plus className="h-4 w-4 text-green-500" />;
      case 'out': return <Minus className="h-4 w-4 text-red-500" />;
      case 'transfer': return <ArrowRightLeft className="h-4 w-4 text-blue-500" />;
      case 'adjustment': return <RotateCcw className="h-4 w-4 text-yellow-500" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getTransactionBadgeVariant = (type: string) => {
    switch (type) {
      case 'in': return "default";
      case 'out': return "destructive";
      case 'transfer': return "secondary";
      case 'adjustment': return "outline";
      default: return "secondary";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div>Loading inventory tracking data...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Inventory Tracking
          </h2>
          <p className="text-muted-foreground">Complete audit trail of all inventory movements</p>
        </div>
        <Button onClick={loadTransactions}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Activity className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalTransactions}</p>
                <p className="text-sm text-muted-foreground">Total Transactions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalIn}</p>
                <p className="text-sm text-muted-foreground">Items In</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <TrendingDown className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalOut}</p>
                <p className="text-sm text-muted-foreground">Items Out</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <Package className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">${stats.totalValue.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Total Value</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.recentActivity}</p>
                <p className="text-sm text-muted-foreground">Last 24h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by product, SKU, warehouse, or reference..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Transaction Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="in">Stock In</SelectItem>
                <SelectItem value="out">Stock Out</SelectItem>
                <SelectItem value="transfer">Transfers</SelectItem>
                <SelectItem value="adjustment">Adjustments</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No transactions found matching your filters
              </div>
            ) : (
              filteredTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    {getTransactionIcon(transaction.transactionType)}
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{transaction.productName}</h4>
                        <Badge variant={getTransactionBadgeVariant(transaction.transactionType)}>
                          {transaction.transactionType.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <span>SKU: {transaction.sku}</span>
                        <span className="mx-2">•</span>
                        <span>Warehouse: {transaction.warehouseName}</span>
                        {transaction.referenceNumber && (
                          <>
                            <span className="mx-2">•</span>
                            <span>Ref: {transaction.referenceNumber}</span>
                          </>
                        )}
                      </div>
                      {transaction.notes && (
                        <p className="text-sm text-muted-foreground mt-1">{transaction.notes}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      {transaction.transactionType === 'out' ? '-' : '+'}
                      {Math.abs(transaction.quantity)} units
                    </div>
                    {transaction.unitCost && (
                      <div className="text-sm text-muted-foreground">
                        ${(Math.abs(transaction.quantity) * transaction.unitCost).toFixed(2)}
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground">
                      {formatDate(transaction.createdAt)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}