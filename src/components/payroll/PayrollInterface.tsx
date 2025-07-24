import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PayrollOverview } from "./PayrollOverview";
import { EmployeeManagement, Employee } from "./EmployeeManagement";
import { PayrollProcessing } from "./PayrollProcessing";
import { PayrollRecords } from "./PayrollRecords";
import { AIPayrollInsights } from "./AIPayrollInsights";
import { useToast } from "@/hooks/use-toast";

export function PayrollInterface() {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  const handleAddEmployee = () => {
    toast({
      title: "Add Employee",
      description: "Employee onboarding form would open here (to be implemented)"
    });
  };

  const handleEditEmployee = (employee: Employee) => {
    toast({
      title: "Edit Employee",
      description: `Editing ${employee.firstName} ${employee.lastName} (${employee.employeeId})`
    });
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="records">Records</TabsTrigger>
          <TabsTrigger value="ai">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <PayrollOverview />
        </TabsContent>

        <TabsContent value="employees" className="space-y-6">
          <EmployeeManagement 
            onAddEmployee={handleAddEmployee}
            onEditEmployee={handleEditEmployee}
          />
        </TabsContent>

        <TabsContent value="processing" className="space-y-6">
          <PayrollProcessing />
        </TabsContent>

        <TabsContent value="records" className="space-y-6">
          <PayrollRecords />
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          <AIPayrollInsights />
        </TabsContent>
      </Tabs>
    </div>
  );
}