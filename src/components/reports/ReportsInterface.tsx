import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AIReportsOverview } from "./AIReportsOverview";
import { SmartReportBuilder } from "./SmartReportBuilder";
import { AutomatedReporting } from "./AutomatedReporting";
import { DetailedReportView } from "./DetailedReportView";
import { AIReportGenerator } from "./AIReportGenerator";
import { AIStorytellingReports } from "./AIStorytellingReports";
import { AIBehaviorPrediction } from "./AIBehaviorPrediction";
import { useToast } from "@/hooks/use-toast";

export function ReportsInterface() {
  console.log("📋 ReportsInterface rendering");
  
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const { toast } = useToast();

  const handleViewReport = (reportId: string) => {
    setSelectedReport(reportId);
    setActiveTab("detailed");
    toast({
      title: "Loading Report",
      description: "Opening detailed AI report view..."
    });
  };

  const handleGenerateReport = (templateOrReportId: string, parameters?: Record<string, string>) => {
    toast({
      title: "Generating AI Report",
      description: "Your AI-powered report is being generated. This may take a few minutes."
    });
    
    // Simulate report generation
    setTimeout(() => {
      toast({
        title: "Report Generated",
        description: "Your AI report has been successfully generated and is ready for download."
      });
    }, 3000);
  };

  const handleCreateSchedule = () => {
    toast({
      title: "Create Schedule",
      description: "Report scheduling form would open here (to be implemented)"
    });
  };

  const handleEditSchedule = (scheduleId: string) => {
    toast({
      title: "Edit Schedule",
      description: `Editing schedule ${scheduleId} (to be implemented)`
    });
  };

  const handleCloseDetailedView = () => {
    setSelectedReport(null);
    setActiveTab("overview");
  };

  if (selectedReport && activeTab === "detailed") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Detailed Report View</h1>
            <p className="text-muted-foreground mt-2">
              Comprehensive AI-generated business report with insights and recommendations.
            </p>
          </div>
        </div>
        <DetailedReportView 
          reportId={selectedReport} 
          onClose={handleCloseDetailedView}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 text-xs">
          <TabsTrigger value="ai-generator">AI Generator</TabsTrigger>
          <TabsTrigger value="storytelling">AI Stories</TabsTrigger>
          <TabsTrigger value="behavior">AI Behavior</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="builder">Builder</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
        </TabsList>

        <TabsContent value="ai-generator" className="space-y-6">
          <AIReportGenerator />
        </TabsContent>

        <TabsContent value="storytelling" className="space-y-6">
          <AIStorytellingReports />
        </TabsContent>

        <TabsContent value="behavior" className="space-y-6">
          <AIBehaviorPrediction />
        </TabsContent>

        <TabsContent value="overview" className="space-y-6">
          <AIReportsOverview 
            onViewReport={handleViewReport}
            onGenerateReport={handleGenerateReport}
          />
        </TabsContent>

        <TabsContent value="builder" className="space-y-6">
          <SmartReportBuilder onGenerateReport={handleGenerateReport} />
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <AutomatedReporting 
            onCreateSchedule={handleCreateSchedule}
            onEditSchedule={handleEditSchedule}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}