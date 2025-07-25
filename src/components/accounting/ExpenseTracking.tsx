import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGlobalization } from "@/contexts/GlobalizationContext";
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Plus, 
  Search,
  Receipt,
  Calendar,
  DollarSign,
  Upload,
  Filter
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface Expense {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  paymentMethod: "cash" | "credit_card" | "bank_transfer" | "check";
  vendor: string;
  receiptUrl?: string;
  isRecurring: boolean;
  status: "pending" | "approved" | "rejected";
  submittedBy: string;
  approvedBy?: string;
  notes?: string;
  taxDeductible: boolean;
  account: string;
}

// Mock expense data
const mockExpenses: Expense[] = [
  {
    id: "1",
    date: "2024-01-30",
    description: "Office Supplies - Printer Paper & Ink",
    category: "Office Expenses",
    amount: 450.00,
    paymentMethod: "credit_card",
    vendor: "Office Depot",
    receiptUrl: "/receipt-001.pdf",
    isRecurring: false,
    status: "approved",
    submittedBy: "John Smith",
    approvedBy: "Sarah Johnson",
    taxDeductible: true,
    account: "Business Checking",
    notes: "Monthly office supply restock"
  },
  {
    id: "2",
    date: "2024-01-29",
    description: "Utility Bill - Electricity",
    category: "Utilities",
    amount: 340.00,
    paymentMethod: "bank_transfer",
    vendor: "Pacific Gas & Electric",
    isRecurring: true,
    status: "approved",
    submittedBy: "System Auto",
    approvedBy: "Sarah Johnson",
    taxDeductible: true,
    account: "Business Checking"
  },
  {
    id: "3",
    date: "2024-01-28",
    description: "Team Lunch - Client Meeting",
    category: "Meals & Entertainment",
    amount: 185.50,
    paymentMethod: "credit_card",
    vendor: "The Restaurant",
    receiptUrl: "/receipt-003.pdf",
    isRecurring: false,
    status: "pending",
    submittedBy: "Mike Wilson",
    taxDeductible: true,
    account: "Business Credit Card",
    notes: "Business meeting with Acme Corp clients"
  },
  {
    id: "4",
    date: "2024-01-27",
    description: "Software Subscription - Slack Pro",
    category: "Software & Tools",
    amount: 150.00,
    paymentMethod: "credit_card",
    vendor: "Slack Technologies",
    isRecurring: true,
    status: "approved",
    submittedBy: "System Auto",
    approvedBy: "John Smith",
    taxDeductible: true,
    account: "Business Credit Card"
  },
  {
    id: "5",
    date: "2024-01-26",
    description: "Travel Expenses - Conference",
    category: "Travel",
    amount: 850.00,
    paymentMethod: "credit_card",
    vendor: "American Airlines",
    receiptUrl: "/receipt-005.pdf",
    isRecurring: false,
    status: "rejected",
    submittedBy: "Lisa Chen",
    notes: "Missing required documentation",
    taxDeductible: false,
    account: "Business Credit Card"
  }
];

const expenseCategories = [
  "Office Expenses",
  "Utilities", 
  "Meals & Entertainment",
  "Software & Tools",
  "Travel",
  "Marketing",
  "Professional Services",
  "Equipment",
  "Insurance",
  "Other"
];

interface ExpenseTrackingProps {
  onAddExpense: () => void;
  onEditExpense: (expense: Expense) => void;
}

export function ExpenseTracking({ onAddExpense, onEditExpense }: ExpenseTrackingProps) {
  const { formatCurrency } = useGlobalization();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [filteredExpenses, setFilteredExpenses] = useState(mockExpenses);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge variant="secondary" className="bg-success text-success-foreground">Approved</Badge>;
      case "pending":
        return <Badge variant="outline" className="border-warning text-warning">Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getPaymentMethodBadge = (method: string) => {
    const methods = {
      cash: "Cash",
      credit_card: "Credit Card",
      bank_transfer: "Bank Transfer",
      check: "Check"
    };
    return <Badge variant="outline">{methods[method as keyof typeof methods]}</Badge>;
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applyFilters(term, statusFilter, categoryFilter);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    applyFilters(searchTerm, status, categoryFilter);
  };

  const handleCategoryFilter = (category: string) => {
    setCategoryFilter(category);
    applyFilters(searchTerm, statusFilter, category);
  };

  const applyFilters = (search: string, status: string, category: string) => {
    let filtered = mockExpenses;

    if (search) {
      filtered = filtered.filter(expense =>
        expense.description.toLowerCase().includes(search.toLowerCase()) ||
        expense.vendor.toLowerCase().includes(search.toLowerCase()) ||
        expense.submittedBy.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== "all") {
      filtered = filtered.filter(expense => expense.status === status);
    }

    if (category !== "all") {
      filtered = filtered.filter(expense => expense.category === category);
    }

    setFilteredExpenses(filtered);
  };

  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const pendingExpenses = filteredExpenses.filter(exp => exp.status === "pending").length;
  const taxDeductibleAmount = filteredExpenses
    .filter(exp => exp.taxDeductible && exp.status === "approved")
    .reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-destructive" />
              <div>
                <p className="text-sm text-muted-foreground">Total Expenses</p>
                <p className="text-xl font-bold">{formatCurrency(totalExpenses)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Receipt className="h-4 w-4 text-warning" />
              <div>
                <p className="text-sm text-muted-foreground">Pending Approval</p>
                <p className="text-xl font-bold">{pendingExpenses}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Tax Deductible</p>
                <p className="text-xl font-bold">{formatCurrency(taxDeductibleAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Receipt className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Records</p>
                <p className="text-xl font-bold">{filteredExpenses.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expense Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              Expense Tracking
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button onClick={onAddExpense}>
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex gap-4 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={handleStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={handleCategoryFilter}>
              <SelectTrigger className="w-[160px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {expenseCategories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted By</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3" />
                      {new Date(expense.date).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[200px]">
                      <div className="font-medium truncate">{expense.description}</div>
                      {expense.notes && (
                        <div className="text-xs text-muted-foreground truncate">{expense.notes}</div>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        {expense.isRecurring && (
                          <Badge variant="outline" className="text-xs">Recurring</Badge>
                        )}
                        {expense.taxDeductible && (
                          <Badge variant="outline" className="text-xs bg-success/10 text-success">Tax Deductible</Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{expense.category}</Badge>
                  </TableCell>
                  <TableCell>{expense.vendor}</TableCell>
                  <TableCell className="font-medium">{formatCurrency(expense.amount)}</TableCell>
                  <TableCell>{getPaymentMethodBadge(expense.paymentMethod)}</TableCell>
                  <TableCell>{getStatusBadge(expense.status)}</TableCell>
                  <TableCell className="text-sm">{expense.submittedBy}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-background">
                        <DropdownMenuItem onClick={() => onEditExpense(expense)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        {expense.receiptUrl && (
                          <DropdownMenuItem>
                            <Receipt className="h-4 w-4 mr-2" />
                            View Receipt
                          </DropdownMenuItem>
                        )}
                        {expense.status === "pending" && (
                          <>
                            <DropdownMenuItem className="text-success">
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}