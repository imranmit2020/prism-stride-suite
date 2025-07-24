import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Download, 
  Eye, 
  Calendar,
  DollarSign,
  FileText,
  Filter
} from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  payPeriod: {
    start: string;
    end: string;
  };
  payDate: string;
  grossPay: number;
  deductions: number;
  netPay: number;
  hoursWorked?: number;
  overtimeHours?: number;
  status: "paid" | "pending" | "cancelled";
  payrollType: "regular" | "bonus" | "overtime";
}

// Mock payroll records
const mockPayrollRecords: PayrollRecord[] = [
  {
    id: "PAY-2024-001",
    employeeId: "EMP-001", 
    employeeName: "John Smith",
    payPeriod: { start: "2024-01-15", end: "2024-01-31" },
    payDate: "2024-01-31",
    grossPay: 2115.38,
    deductions: 467.39,
    netPay: 1647.99,
    status: "paid",
    payrollType: "regular"
  },
  {
    id: "PAY-2024-002",
    employeeId: "EMP-002",
    employeeName: "Sarah Johnson", 
    payPeriod: { start: "2024-01-15", end: "2024-01-31" },
    payDate: "2024-01-31",
    grossPay: 1184.00,
    deductions: 261.48,
    netPay: 922.52,
    hoursWorked: 64,
    overtimeHours: 4,
    status: "paid",
    payrollType: "regular"
  },
  {
    id: "PAY-2024-003",
    employeeId: "EMP-003",
    employeeName: "Mike Wilson",
    payPeriod: { start: "2024-01-15", end: "2024-01-31" },
    payDate: "2024-01-31", 
    grossPay: 1072.00,
    deductions: 236.64,
    netPay: 835.36,
    hoursWorked: 64,
    overtimeHours: 0,
    status: "paid",
    payrollType: "regular"
  },
  {
    id: "PAY-2024-004",
    employeeId: "EMP-001",
    employeeName: "John Smith",
    payPeriod: { start: "2024-01-01", end: "2024-01-14" },
    payDate: "2024-01-15",
    grossPay: 2115.38,
    deductions: 467.39, 
    netPay: 1647.99,
    status: "paid",
    payrollType: "regular"
  },
  {
    id: "PAY-2024-005",
    employeeId: "EMP-002",
    employeeName: "Sarah Johnson",
    payPeriod: { start: "2024-01-01", end: "2024-01-14" },
    payDate: "2024-01-15",
    grossPay: 1500.00,
    deductions: 0,
    netPay: 1500.00,
    status: "paid",
    payrollType: "bonus"
  }
];

export function PayrollRecords() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [filteredRecords, setFilteredRecords] = useState(mockPayrollRecords);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge variant="secondary" className="bg-success text-success-foreground">Paid</Badge>;
      case "pending":
        return <Badge variant="outline" className="border-warning text-warning">Pending</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "regular":
        return <Badge variant="default">Regular</Badge>;
      case "bonus":
        return <Badge variant="secondary" className="bg-primary text-primary-foreground">Bonus</Badge>;
      case "overtime":
        return <Badge variant="outline">Overtime</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applyFilters(term, statusFilter, typeFilter);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    applyFilters(searchTerm, status, typeFilter);
  };

  const handleTypeFilter = (type: string) => {
    setTypeFilter(type);
    applyFilters(searchTerm, statusFilter, type);
  };

  const applyFilters = (search: string, status: string, type: string) => {
    let filtered = mockPayrollRecords;

    // Apply search filter
    if (search) {
      filtered = filtered.filter(record =>
        record.employeeName.toLowerCase().includes(search.toLowerCase()) ||
        record.employeeId.toLowerCase().includes(search.toLowerCase()) ||
        record.id.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply status filter
    if (status !== "all") {
      filtered = filtered.filter(record => record.status === status);
    }

    // Apply type filter
    if (type !== "all") {
      filtered = filtered.filter(record => record.payrollType === type);
    }

    setFilteredRecords(filtered);
  };

  const totalGrossPay = filteredRecords.reduce((sum, record) => sum + record.grossPay, 0);
  const totalNetPay = filteredRecords.reduce((sum, record) => sum + record.netPay, 0);
  const totalDeductions = filteredRecords.reduce((sum, record) => sum + record.deductions, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Total Gross Pay</p>
                <p className="text-xl font-bold">${totalGrossPay.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-destructive" />
              <div>
                <p className="text-sm text-muted-foreground">Total Deductions</p>
                <p className="text-xl font-bold">${totalDeductions.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Net Pay</p>
                <p className="text-xl font-bold">${totalNetPay.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payroll Records Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Payroll Records
            </CardTitle>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          
          {/* Filters */}
          <div className="flex gap-4 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search records..."
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
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={handleTypeFilter}>
              <SelectTrigger className="w-[140px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="regular">Regular</SelectItem>
                <SelectItem value="bonus">Bonus</SelectItem>
                <SelectItem value="overtime">Overtime</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Record ID</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Pay Period</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Gross Pay</TableHead>
                <TableHead>Deductions</TableHead>
                <TableHead>Net Pay</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-mono text-sm">{record.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{record.employeeName}</div>
                      <div className="text-sm text-muted-foreground">{record.employeeId}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3" />
                      {new Date(record.payPeriod.start).toLocaleDateString()} - {new Date(record.payPeriod.end).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Paid: {new Date(record.payDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(record.payrollType)}</TableCell>
                  <TableCell>
                    {record.hoursWorked && (
                      <div className="text-sm">
                        <div>{record.hoursWorked}h regular</div>
                        {record.overtimeHours && record.overtimeHours > 0 && (
                          <div className="text-xs text-muted-foreground">+{record.overtimeHours}h OT</div>
                        )}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>${record.grossPay.toFixed(2)}</TableCell>
                  <TableCell>${record.deductions.toFixed(2)}</TableCell>
                  <TableCell className="font-medium">${record.netPay.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(record.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
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