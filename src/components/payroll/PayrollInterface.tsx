import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PayrollOverview } from "./PayrollOverview";
import { SimplePayrollOverview } from "./SimplePayrollOverview";
import { EmployeeManagement } from "./EmployeeManagement";
import { PayrollProcessing } from "./PayrollProcessing";
import { PayrollRecords } from "./PayrollRecords";
import { AIPayrollInsights } from "./AIPayrollInsights";
import { AIEmployeePerformancePredictor } from "./AIEmployeePerformancePredictor";
import { AISalaryOptimizationEngine } from "./AISalaryOptimizationEngine";
import { AITimeTheftDetective } from "./AITimeTheftDetective";
import { EmployeeOnboardingDialog } from "./EmployeeOnboardingDialog";
import { SmartSchedulingDialog } from "./SmartSchedulingDialog";
import { useToast } from "@/hooks/use-toast";
import { usePayroll } from "@/hooks/usePayroll";
import { UserPlus, Calendar } from "lucide-react";

export function PayrollInterface() {
  console.log("👥 PayrollInterface rendering");
  
  const [activeTab, setActiveTab] = useState("overview");
  const [showOnboardingDialog, setShowOnboardingDialog] = useState(false);
  const [showSchedulingDialog, setShowSchedulingDialog] = useState(false);
  const { toast } = useToast();
  const { createEmployee } = usePayroll();

  const handleSaveEmployee = async (employeeData: any) => {
    try {
      // Convert the form data to the database format
      const employeeToSave = {
        employee_id: employeeData.employment.employeeId || `EMP-${Date.now()}`,
        first_name: employeeData.personalInfo.firstName,
        last_name: employeeData.personalInfo.lastName,
        email: employeeData.personalInfo.email,
        phone: employeeData.personalInfo.phone || null,
        position: employeeData.employment.position,
        department: employeeData.employment.department,
        hire_date: employeeData.employment.startDate || new Date().toISOString().split('T')[0], // Use today's date if empty
        employment_type: employeeData.employment.employmentType,
        salary_type: employeeData.compensation.payType || 'hourly',
        base_salary: employeeData.compensation.baseSalary || 0,
        status: 'active' as const,
        street_address: employeeData.personalInfo.address?.street || null,
        city: employeeData.personalInfo.address?.city || null,
        state: employeeData.personalInfo.address?.state || null,
        zip_code: employeeData.personalInfo.address?.zipCode || null,
        ssn: employeeData.taxInfo?.ssn || null,
        filing_status: employeeData.taxInfo?.filingStatus || null,
        allowances: employeeData.taxInfo?.allowances || 0,
        account_number: employeeData.bankInfo?.accountNumber || null,
        routing_number: employeeData.bankInfo?.routingNumber || null,
        bank_name: employeeData.bankInfo?.bankName || null,
      };

      await createEmployee(employeeToSave);
      
      toast({
        title: "Employee Onboarded",
        description: `${employeeData.personalInfo.firstName} ${employeeData.personalInfo.lastName} has been successfully added to the system`
      });
    } catch (error) {
      console.error('Error saving employee:', error);
      toast({
        title: "Error",
        description: "Failed to save employee to database",
        variant: "destructive"
      });
    }
  };

  const handleAddEmployee = () => {
    setShowOnboardingDialog(true);
  };

  const handleEditEmployee = (employee: any) => {
    toast({
      title: "Edit Employee",
      description: `Editing ${employee.name}`
    });
  };

  const handleGenerateSchedule = (optimization: any) => {
    toast({
      title: "Schedule Generated",
      description: "AI-optimized schedule has been created successfully"
    });
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex flex-wrap h-auto items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-full gap-1">
          <TabsTrigger value="overview" className="px-3 py-2 text-xs font-medium">Overview</TabsTrigger>
          <TabsTrigger value="ai-performance" className="px-3 py-2 text-xs font-medium">AI Performance</TabsTrigger>
          <TabsTrigger value="ai-salary" className="px-3 py-2 text-xs font-medium">AI Salary</TabsTrigger>
          <TabsTrigger value="ai-theft" className="px-3 py-2 text-xs font-medium">AI Time Theft</TabsTrigger>
          <TabsTrigger value="employees" className="px-3 py-2 text-xs font-medium">Employees</TabsTrigger>
          <TabsTrigger value="onboarding" className="px-3 py-2 text-xs font-medium">Onboarding</TabsTrigger>
          <TabsTrigger value="scheduling" className="px-3 py-2 text-xs font-medium">Scheduling</TabsTrigger>
          <TabsTrigger value="processing" className="px-3 py-2 text-xs font-medium">Processing</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <SimplePayrollOverview />
        </TabsContent>

        <TabsContent value="ai-performance" className="space-y-6">
          <AIEmployeePerformancePredictor />
        </TabsContent>

        <TabsContent value="ai-salary" className="space-y-6">
          <AISalaryOptimizationEngine />
        </TabsContent>

        <TabsContent value="ai-theft" className="space-y-6">
          <AITimeTheftDetective />
        </TabsContent>

        <TabsContent value="employees" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Employee Management</h2>
            <Button onClick={() => setShowOnboardingDialog(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </div>
          <EmployeeManagement onAddEmployee={handleAddEmployee} onEditEmployee={handleEditEmployee} />
          <AIPayrollInsights />
        </TabsContent>

        <TabsContent value="onboarding" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Employee Onboarding</h2>
            <Button onClick={() => setShowOnboardingDialog(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              Onboard New Employee
            </Button>
          </div>
          <div className="text-center text-muted-foreground py-8">
            Advanced AI-powered employee onboarding with market analysis and performance prediction
          </div>
        </TabsContent>

        <TabsContent value="scheduling" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Smart Scheduling</h2>
            <Button onClick={() => setShowSchedulingDialog(true)}>
              <Calendar className="h-4 w-4 mr-2" />
              Create AI Schedule
            </Button>
          </div>
          <div className="text-center text-muted-foreground py-8">
            AI-optimized scheduling with demand prediction and workload balancing
          </div>
        </TabsContent>

        <TabsContent value="processing" className="space-y-6">
          <PayrollProcessing />
          <PayrollRecords />
        </TabsContent>
      </Tabs>

      <EmployeeOnboardingDialog
        open={showOnboardingDialog}
        onOpenChange={setShowOnboardingDialog}
        onSaveEmployee={handleSaveEmployee}
      />

      <SmartSchedulingDialog
        open={showSchedulingDialog}
        onOpenChange={setShowSchedulingDialog}
        onGenerateSchedule={handleGenerateSchedule}
      />
    </div>
  );
}