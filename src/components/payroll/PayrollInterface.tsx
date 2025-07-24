import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PayrollOverview } from "./PayrollOverview";
import { EmployeeManagement } from "./EmployeeManagement";
import { PayrollProcessing } from "./PayrollProcessing";
import { PayrollRecords } from "./PayrollRecords";
import { AIPayrollInsights } from "./AIPayrollInsights";
import { EmployeeOnboardingDialog } from "./EmployeeOnboardingDialog";
import { SmartSchedulingDialog } from "./SmartSchedulingDialog";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Calendar } from "lucide-react";

export function PayrollInterface() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showOnboardingDialog, setShowOnboardingDialog] = useState(false);
  const [showSchedulingDialog, setShowSchedulingDialog] = useState(false);
  const { toast } = useToast();

  const handleSaveEmployee = (employee: any) => {
    toast({
      title: "Employee Onboarded",
      description: `${employee.personalInfo.firstName} ${employee.personalInfo.lastName} has been successfully added to the system`
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
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
          <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <PayrollOverview />
        </TabsContent>

        <TabsContent value="employees" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Employee Management</h2>
            <Button onClick={() => setShowOnboardingDialog(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </div>
          <div className="text-center text-muted-foreground py-8">
            Employee management interface with existing staff overview
          </div>
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
        </TabsContent>

        <TabsContent value="ai-insights" className="space-y-6">
          <AIPayrollInsights />
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