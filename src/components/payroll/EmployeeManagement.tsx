import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGlobalization } from "@/contexts/GlobalizationContext";
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Plus, 
  Search,
  Users,
  DollarSign,
  Calendar,
  Phone,
  Mail
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export interface Employee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  hireDate: string;
  employmentType: "full-time" | "part-time" | "contract";
  salaryType: "hourly" | "monthly" | "yearly";
  baseSalary: number;
  status: "active" | "inactive" | "terminated";
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  taxInfo: {
    ssn: string;
    filingStatus: string;
    allowances: number;
  };
  bankInfo: {
    accountNumber: string;
    routingNumber: string;
    bankName: string;
  };
}

// Mock employee data
const mockEmployees: Employee[] = [
  {
    id: "1",
    employeeId: "EMP-001",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@company.com",
    phone: "(555) 123-4567",
    position: "Store Manager",
    department: "Operations",
    hireDate: "2022-03-15",
    employmentType: "full-time",
    salaryType: "yearly",
    baseSalary: 55000,
    status: "active",
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zipCode: "12345"
    },
    taxInfo: {
      ssn: "***-**-1234",
      filingStatus: "Single",
      allowances: 1
    },
    bankInfo: {
      accountNumber: "****1234",
      routingNumber: "123456789",
      bankName: "First National Bank"
    }
  },
  {
    id: "2",
    employeeId: "EMP-002",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@company.com",
    phone: "(555) 234-5678",
    position: "Barista",
    department: "Operations",
    hireDate: "2023-01-10",
    employmentType: "part-time",
    salaryType: "hourly",
    baseSalary: 18.50,
    status: "active",
    address: {
      street: "456 Oak Ave",
      city: "Anytown",
      state: "CA",
      zipCode: "12345"
    },
    taxInfo: {
      ssn: "***-**-5678",
      filingStatus: "Single",
      allowances: 0
    },
    bankInfo: {
      accountNumber: "****5678",
      routingNumber: "123456789",
      bankName: "Community Bank"
    }
  },
  {
    id: "3",
    employeeId: "EMP-003",
    firstName: "Mike",
    lastName: "Wilson",
    email: "mike.wilson@company.com",
    phone: "(555) 345-6789",
    position: "Kitchen Staff",
    department: "Food Service",
    hireDate: "2023-06-20",
    employmentType: "full-time",
    salaryType: "hourly",
    baseSalary: 16.75,
    status: "active",
    address: {
      street: "789 Pine St",
      city: "Anytown",
      state: "CA",
      zipCode: "12345"
    },
    taxInfo: {
      ssn: "***-**-9012",
      filingStatus: "Married",
      allowances: 2
    },
    bankInfo: {
      accountNumber: "****9012",
      routingNumber: "123456789",
      bankName: "First National Bank"
    }
  }
];

interface EmployeeManagementProps {
  onAddEmployee: () => void;
  onEditEmployee: (employee: Employee) => void;
}

export function EmployeeManagement({ onAddEmployee, onEditEmployee }: EmployeeManagementProps) {
  const { formatCurrency } = useGlobalization();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState(mockEmployees);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="secondary" className="bg-success text-success-foreground">Active</Badge>;
      case "inactive":
        return <Badge variant="outline">Inactive</Badge>;
      case "terminated":
        return <Badge variant="destructive">Terminated</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getEmploymentTypeBadge = (type: string) => {
    switch (type) {
      case "full-time":
        return <Badge variant="default">Full-time</Badge>;
      case "part-time":
        return <Badge variant="outline">Part-time</Badge>;
      case "contract":
        return <Badge variant="secondary">Contract</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = mockEmployees.filter(employee =>
      `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(term.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(term.toLowerCase()) ||
      employee.email.toLowerCase().includes(term.toLowerCase()) ||
      employee.position.toLowerCase().includes(term.toLowerCase()) ||
      employee.department.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  const formatSalary = (employee: Employee) => {
    console.log('Formatting salary:', employee.baseSalary, 'Currency format result:', formatCurrency(employee.baseSalary));
    if (employee.salaryType === "hourly") {
      return `${formatCurrency(employee.baseSalary)}/hr`;
    } else if (employee.salaryType === "monthly") {
      return `${formatCurrency(employee.baseSalary)}/mo`;
    } else {
      return `${formatCurrency(employee.baseSalary)}/yr`;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Employee Management
          </CardTitle>
          <Button onClick={onAddEmployee}>
            <Plus className="h-4 w-4 mr-2" />
            Add Employee
          </Button>
        </div>
        <div className="flex gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Employment</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {employee.firstName[0]}{employee.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {employee.firstName} {employee.lastName}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {employee.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {employee.phone}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm">{employee.employeeId}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {getEmploymentTypeBadge(employee.employmentType)}
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      Hired: {new Date(employee.hireDate).toLocaleDateString()}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-success" />
                    <span className="font-medium">{formatSalary(employee)}</span>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(employee.status)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-background">
                      <DropdownMenuItem onClick={() => onEditEmployee(employee)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Terminate
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
  );
}