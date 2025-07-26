import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { usePayroll, PayrollRecord } from "@/hooks/usePayroll";
import { 
  Search, 
  Download, 
  Eye, 
  Calendar,
  DollarSign,
  FileText,
  Filter
} from "lucide-react";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function PayrollRecords() {
  const { payrollRecords, employees } = usePayroll();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [filteredRecords, setFilteredRecords] = useState<PayrollRecord[]>([]);

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
    let filtered = payrollRecords;

    // Apply search filter
    if (search) {
      filtered = filtered.filter(record => {
        const employee = employees.find(emp => emp.id === record.employee_id);
        const employeeName = employee ? `${employee.first_name} ${employee.last_name}` : '';
        return employeeName.toLowerCase().includes(search.toLowerCase()) ||
               record.record_id.toLowerCase().includes(search.toLowerCase()) ||
               record.id.toLowerCase().includes(search.toLowerCase());
      });
    }

    // Apply status filter
    if (status !== "all") {
      filtered = filtered.filter(record => record.status === status);
    }

    // Apply type filter
    if (type !== "all") {
      filtered = filtered.filter(record => record.payroll_type === type);
    }

    setFilteredRecords(filtered);
  };

  // Update filtered records when payroll records or employees change
  useEffect(() => {
    if (searchTerm || statusFilter !== "all" || typeFilter !== "all") {
      applyFilters(searchTerm, statusFilter, typeFilter);
    } else {
      setFilteredRecords(payrollRecords);
    }
  }, [payrollRecords, employees, searchTerm, statusFilter, typeFilter]);

  const totalGrossPay = filteredRecords.reduce((sum, record) => sum + record.gross_pay, 0);
  const totalNetPay = filteredRecords.reduce((sum, record) => sum + record.net_pay, 0);
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
              {filteredRecords.map((record) => {
                const employee = employees.find(emp => emp.id === record.employee_id);
                const employeeName = employee ? `${employee.first_name} ${employee.last_name}` : 'Unknown Employee';
                const employeeId = employee ? employee.employee_id : 'Unknown';
                
                return (
                  <TableRow key={record.id}>
                    <TableCell className="font-mono text-sm">{record.record_id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{employeeName}</div>
                        <div className="text-sm text-muted-foreground">{employeeId}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3" />
                        {new Date(record.pay_period_start).toLocaleDateString()} - {new Date(record.pay_period_end).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Paid: {new Date(record.pay_date).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(record.payroll_type)}</TableCell>
                    <TableCell>
                      {record.hours_worked && (
                        <div className="text-sm">
                          <div>{record.hours_worked}h regular</div>
                          {record.overtime_hours && record.overtime_hours > 0 && (
                            <div className="text-xs text-muted-foreground">+{record.overtime_hours}h OT</div>
                          )}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>${record.gross_pay.toFixed(2)}</TableCell>
                    <TableCell>${record.deductions.toFixed(2)}</TableCell>
                    <TableCell className="font-medium">${record.net_pay.toFixed(2)}</TableCell>
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
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}