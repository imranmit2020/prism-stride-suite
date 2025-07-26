import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Calendar, Calculator, Users, DollarSign, FileText } from "lucide-react";
import { PayrollEmployee } from "@/hooks/usePayroll";
import { useToast } from "@/hooks/use-toast";

interface PayrollCalculation {
  employee: PayrollEmployee;
  period: {
    start: string;
    end: string;
  };
  hoursWorked: number;
  overtimeHours: number;
  grossPay: number;
  deductions: {
    federalTax: number;
    stateTax: number;
    socialSecurity: number;
    medicare: number;
    healthInsurance: number;
    retirement401k: number;
    other: number;
  };
  netPay: number;
}

// Mock employee data for payroll processing
const mockEmployeesForPayroll = [
  {
    id: "1",
    employeeId: "EMP-001", 
    firstName: "John",
    lastName: "Smith",
    position: "Store Manager",
    salaryType: "yearly" as const,
    baseSalary: 55000,
    exemptions: 1,
    department: "Operations"
  },
  {
    id: "2", 
    employeeId: "EMP-002",
    firstName: "Sarah",
    lastName: "Johnson", 
    position: "Barista",
    salaryType: "hourly" as const,
    baseSalary: 18.50,
    exemptions: 0,
    department: "Operations"
  },
  {
    id: "3",
    employeeId: "EMP-003",
    firstName: "Mike", 
    lastName: "Wilson",
    position: "Kitchen Staff",
    salaryType: "hourly" as const,
    baseSalary: 16.75,
    exemptions: 2,
    department: "Food Service"
  }
];

export function PayrollProcessing() {
  const [selectedPeriod, setSelectedPeriod] = useState("current");
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [payrollCalculations, setPayrollCalculations] = useState<PayrollCalculation[]>([]);
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  const calculatePayroll = () => {
    setProcessing(true);
    
    // Simulate payroll calculation
    setTimeout(() => {
      const calculations: PayrollCalculation[] = mockEmployeesForPayroll.map(employee => {
        let grossPay = 0;
        let hoursWorked = 0;
        let overtimeHours = 0;

        if (employee.salaryType === "hourly") {
          hoursWorked = 40; // Regular hours
          overtimeHours = Math.floor(Math.random() * 10); // Random overtime
          grossPay = (hoursWorked * employee.baseSalary) + (overtimeHours * employee.baseSalary * 1.5);
        } else {
          grossPay = employee.baseSalary / 26; // Bi-weekly for yearly salary
        }

        // Calculate deductions (simplified)
        const federalTax = grossPay * 0.12; // 12% federal tax
        const stateTax = grossPay * 0.05; // 5% state tax  
        const socialSecurity = grossPay * 0.062; // 6.2% social security
        const medicare = grossPay * 0.0145; // 1.45% medicare
        const healthInsurance = 125; // Fixed health insurance
        const retirement401k = grossPay * 0.05; // 5% 401k contribution
        
        const totalDeductions = federalTax + stateTax + socialSecurity + medicare + healthInsurance + retirement401k;
        const netPay = grossPay - totalDeductions;

        return {
          employee: employee as any,
          period: {
            start: "2024-01-15",
            end: "2024-01-31"
          },
          hoursWorked,
          overtimeHours,
          grossPay,
          deductions: {
            federalTax,
            stateTax, 
            socialSecurity,
            medicare,
            healthInsurance,
            retirement401k,
            other: 0
          },
          netPay
        };
      });

      setPayrollCalculations(calculations);
      setProcessing(false);
      
      toast({
        title: "Payroll Calculated",
        description: `Processed payroll for ${calculations.length} employees.`
      });
    }, 2000);
  };

  const processPayroll = () => {
    toast({
      title: "Payroll Processed",
      description: "Direct deposits initiated and paystubs generated.",
    });
  };

  const totalGrossPay = payrollCalculations.reduce((sum, calc) => sum + calc.grossPay, 0);
  const totalNetPay = payrollCalculations.reduce((sum, calc) => sum + calc.netPay, 0);
  const totalDeductions = totalGrossPay - totalNetPay;

  return (
    <div className="space-y-6">
      {/* Payroll Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Payroll Processing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Pay Period</Label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Period (Jan 15-31)</SelectItem>
                  <SelectItem value="previous">Previous Period (Jan 1-14)</SelectItem>
                  <SelectItem value="custom">Custom Period</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Pay Date</Label>
              <Input type="date" defaultValue="2024-01-31" />
            </div>

            <div className="space-y-2">
              <Label>Employees</Label>
              <Select value="all" onValueChange={() => {}}>
                <SelectTrigger>
                  <SelectValue placeholder="Select employees" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Active Employees (156)</SelectItem>
                  <SelectItem value="operations">Operations Dept (45)</SelectItem>
                  <SelectItem value="food">Food Service Dept (38)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={calculatePayroll}
              disabled={processing}
              className="flex-1"
            >
              <Calculator className="h-4 w-4 mr-2" />
              {processing ? "Calculating..." : "Calculate Payroll"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payroll Results */}
      {payrollCalculations.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Payroll Summary
              </CardTitle>
              <Button onClick={processPayroll}>
                <DollarSign className="h-4 w-4 mr-2" />
                Process Payroll
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">${totalGrossPay.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Gross Pay</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-destructive">${totalDeductions.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Deductions</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-success">${totalNetPay.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Net Pay</div>
              </div>
            </div>

            <Separator />

            {/* Individual Employee Calculations */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Employee Breakdown</h3>
              {payrollCalculations.map((calc) => (
                <div key={calc.employee.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">
                        {calc.employee.first_name} {calc.employee.last_name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {calc.employee.employee_id} • {calc.employee.position}
                      </p>
                    </div>
                    <Badge variant="outline">
                      {calc.employee.salary_type}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    {calc.employee.salary_type === "hourly" && (
                      <>
                        <div>
                          <div className="text-muted-foreground">Hours Worked</div>
                          <div className="font-medium">{calc.hoursWorked}h</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Overtime</div>
                          <div className="font-medium">{calc.overtimeHours}h</div>
                        </div>
                      </>
                    )}
                    <div>
                      <div className="text-muted-foreground">Gross Pay</div>
                      <div className="font-medium">${calc.grossPay.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Net Pay</div>
                      <div className="font-medium text-success">${calc.netPay.toFixed(2)}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                    <div>
                      <div className="text-muted-foreground">Federal Tax</div>
                      <div>${calc.deductions.federalTax.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">State Tax</div>
                      <div>${calc.deductions.stateTax.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Social Security</div>
                      <div>${calc.deductions.socialSecurity.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Medicare</div>
                      <div>${calc.deductions.medicare.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Health Insurance</div>
                      <div>${calc.deductions.healthInsurance.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">401(k)</div>
                      <div>${calc.deductions.retirement401k.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}