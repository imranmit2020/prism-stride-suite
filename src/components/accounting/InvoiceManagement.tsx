import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Plus, 
  Search,
  FileText,
  Send,
  Eye,
  Download,
  Calendar
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  issueDate: string;
  dueDate: string;
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  items: {
    description: string;
    quantity: number;
    rate: number;
    amount: number;
  }[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  notes?: string;
  terms?: string;
}

// Mock invoice data
const mockInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-2024-001",
    customerId: "CUST-001",
    customerName: "Acme Corporation",
    customerEmail: "billing@acme.com",
    issueDate: "2024-01-15",
    dueDate: "2024-02-15",
    status: "overdue",
    items: [
      { description: "Web Development Services", quantity: 40, rate: 125.00, amount: 5000.00 },
      { description: "SEO Optimization", quantity: 1, rate: 2500.00, amount: 2500.00 }
    ],
    subtotal: 7500.00,
    taxRate: 8.5,
    taxAmount: 637.50,
    total: 8137.50,
    notes: "Thank you for your business!",
    terms: "Payment due within 30 days"
  },
  {
    id: "2", 
    invoiceNumber: "INV-2024-002",
    customerId: "CUST-002",
    customerName: "TechStart Inc",
    customerEmail: "accounts@techstart.com",
    issueDate: "2024-01-20",
    dueDate: "2024-02-20",
    status: "sent",
    items: [
      { description: "Mobile App Development", quantity: 60, rate: 150.00, amount: 9000.00 }
    ],
    subtotal: 9000.00,
    taxRate: 8.5,
    taxAmount: 765.00,
    total: 9765.00,
    notes: "Milestone 1 payment",
    terms: "Net 30 days"
  },
  {
    id: "3",
    invoiceNumber: "INV-2024-003", 
    customerId: "CUST-003",
    customerName: "Global Solutions LLC",
    customerEmail: "finance@globalsolutions.com",
    issueDate: "2024-01-25",
    dueDate: "2024-02-25",
    status: "draft",
    items: [
      { description: "Consulting Services", quantity: 20, rate: 200.00, amount: 4000.00 },
      { description: "Training Session", quantity: 1, rate: 1500.00, amount: 1500.00 }
    ],
    subtotal: 5500.00,
    taxRate: 8.5,
    taxAmount: 467.50,
    total: 5967.50,
    terms: "Payment due upon receipt"
  }
];

interface InvoiceManagementProps {
  onCreateInvoice: () => void;
  onEditInvoice: (invoice: Invoice) => void;
}

export function InvoiceManagement({ onCreateInvoice, onEditInvoice }: InvoiceManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [filteredInvoices, setFilteredInvoices] = useState(mockInvoices);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="secondary">Draft</Badge>;
      case "sent":
        return <Badge variant="outline" className="border-primary text-primary">Sent</Badge>;
      case "paid":
        return <Badge variant="secondary" className="bg-success text-success-foreground">Paid</Badge>;
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>;
      case "cancelled":
        return <Badge variant="outline">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applyFilters(term, statusFilter);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    applyFilters(searchTerm, status);
  };

  const applyFilters = (search: string, status: string) => {
    let filtered = mockInvoices;

    if (search) {
      filtered = filtered.filter(invoice =>
        invoice.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
        invoice.customerName.toLowerCase().includes(search.toLowerCase()) ||
        invoice.customerEmail.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== "all") {
      filtered = filtered.filter(invoice => invoice.status === status);
    }

    setFilteredInvoices(filtered);
  };

  const getDaysOverdue = (dueDate: string, status: string) => {
    if (status !== "overdue") return 0;
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = today.getTime() - due.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const totalOutstanding = filteredInvoices
    .filter(inv => inv.status === "sent" || inv.status === "overdue")
    .reduce((sum, inv) => sum + inv.total, 0);

  const totalOverdue = filteredInvoices
    .filter(inv => inv.status === "overdue")
    .reduce((sum, inv) => sum + inv.total, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Outstanding</p>
              <p className="text-2xl font-bold">${totalOutstanding.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Overdue Amount</p>
              <p className="text-2xl font-bold text-destructive">${totalOverdue.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Invoices</p>
              <p className="text-2xl font-bold">{filteredInvoices.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoice Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Invoice Management
            </CardTitle>
            <Button onClick={onCreateInvoice}>
              <Plus className="h-4 w-4 mr-2" />
              Create Invoice
            </Button>
          </div>
          
          {/* Filters */}
          <div className="flex gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={handleStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => {
                const daysOverdue = getDaysOverdue(invoice.dueDate, invoice.status);
                return (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-mono text-sm">{invoice.invoiceNumber}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{invoice.customerName}</div>
                        <div className="text-sm text-muted-foreground">{invoice.customerEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3" />
                        {new Date(invoice.issueDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3" />
                        {new Date(invoice.dueDate).toLocaleDateString()}
                      </div>
                      {daysOverdue > 0 && (
                        <div className="text-xs text-destructive">
                          {daysOverdue} days overdue
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">${invoice.total.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-background">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onEditInvoice(invoice)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          {invoice.status === "draft" && (
                            <DropdownMenuItem>
                              <Send className="h-4 w-4 mr-2" />
                              Send
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}