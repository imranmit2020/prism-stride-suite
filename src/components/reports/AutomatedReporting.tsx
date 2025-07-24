import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar, 
  Clock, 
  Mail, 
  Settings, 
  Play, 
  Pause,
  Edit,
  Trash2,
  Plus,
  Brain,
  FileText,
  Users,
  DollarSign
} from "lucide-react";
import { useState } from "react";

const scheduledReports = [
  {
    id: "daily_summary",
    name: "Daily AI Business Summary",
    description: "Automated daily insights with AI recommendations",
    frequency: "Daily",
    time: "09:00 AM",
    recipients: ["admin@company.com", "manager@company.com"],
    lastRun: "2024-01-30 09:00 AM",
    nextRun: "2024-01-31 09:00 AM",
    status: "active",
    aiFeatures: ["Trend Analysis", "Anomaly Detection", "Recommendations"],
    reportType: "Executive Summary",
    confidence: 94,
    icon: Brain
  },
  {
    id: "weekly_performance",
    name: "Weekly Performance Analysis", 
    description: "Comprehensive weekly business performance review",
    frequency: "Weekly",
    time: "Monday 08:00 AM",
    recipients: ["ceo@company.com", "cfo@company.com"],
    lastRun: "2024-01-29 08:00 AM",
    nextRun: "2024-02-05 08:00 AM",
    status: "active",
    aiFeatures: ["Predictive Analytics", "Performance Optimization", "Strategic Insights"],
    reportType: "Performance Review",
    confidence: 91,
    icon: FileText
  },
  {
    id: "monthly_customer",
    name: "Monthly Customer Intelligence",
    description: "Deep customer behavior analysis and segmentation",
    frequency: "Monthly",
    time: "1st of month 10:00 AM",
    recipients: ["marketing@company.com", "sales@company.com"],
    lastRun: "2024-01-01 10:00 AM",
    nextRun: "2024-02-01 10:00 AM", 
    status: "paused",
    aiFeatures: ["Customer Segmentation", "Churn Prediction", "Lifetime Value"],
    reportType: "Customer Analytics",
    confidence: 88,
    icon: Users
  },
  {
    id: "quarterly_financial",
    name: "Quarterly Financial Forecast",
    description: "AI-powered financial projections and analysis",
    frequency: "Quarterly",
    time: "1st day of quarter 07:00 AM",
    recipients: ["finance@company.com", "board@company.com"],
    lastRun: "2024-01-01 07:00 AM",
    nextRun: "2024-04-01 07:00 AM",
    status: "active",
    aiFeatures: ["Revenue Forecasting", "Risk Analysis", "Investment Recommendations"],
    reportType: "Financial Forecast",
    confidence: 96,
    icon: DollarSign
  }
];

interface AutomatedReportingProps {
  onCreateSchedule: () => void;
  onEditSchedule: (scheduleId: string) => void;
}

export function AutomatedReporting({ onCreateSchedule, onEditSchedule }: AutomatedReportingProps) {
  const [selectedReports, setSelectedReports] = useState<string[]>([]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="secondary" className="bg-success text-success-foreground">Active</Badge>;
      case "paused":
        return <Badge variant="outline" className="border-warning text-warning">Paused</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case "Daily": return "text-primary";
      case "Weekly": return "text-success";
      case "Monthly": return "text-warning";
      case "Quarterly": return "text-accent";
      default: return "text-muted-foreground";
    }
  };

  const toggleReportSelection = (reportId: string) => {
    setSelectedReports(prev => 
      prev.includes(reportId) 
        ? prev.filter(id => id !== reportId)
        : [...prev, reportId]
    );
  };

  const toggleReportStatus = (reportId: string) => {
    // In a real app, this would update the backend
    console.log(`Toggling status for report: ${reportId}`);
  };

  return (
    <div className="space-y-6">
      {/* Automation Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Automated AI Reporting
            </CardTitle>
            <Button onClick={onCreateSchedule}>
              <Plus className="h-4 w-4 mr-2" />
              New Schedule
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{scheduledReports.length}</div>
              <div className="text-sm text-muted-foreground">Scheduled Reports</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">
                {scheduledReports.filter(r => r.status === "active").length}
              </div>
              <div className="text-sm text-muted-foreground">Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">
                {scheduledReports.filter(r => r.status === "paused").length}
              </div>
              <div className="text-sm text-muted-foreground">Paused</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">24/7</div>
              <div className="text-sm text-muted-foreground">AI Monitoring</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Reports List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Scheduled AI Reports
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {scheduledReports.map((report) => {
            const IconComponent = report.icon;
            
            return (
              <div key={report.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{report.name}</h3>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(report.status)}
                    <Badge variant="outline">{report.reportType}</Badge>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <div className="text-sm font-medium mb-1">Schedule</div>
                    <div className={`text-sm ${getFrequencyColor(report.frequency)}`}>
                      {report.frequency} at {report.time}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">Next Run</div>
                    <div className="text-sm text-muted-foreground">{report.nextRun}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">AI Confidence</div>
                    <div className="text-sm font-bold">{report.confidence}%</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">AI Features:</div>
                  <div className="flex flex-wrap gap-1">
                    {report.aiFeatures.map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Recipients:</div>
                  <div className="flex flex-wrap gap-1">
                    {report.recipients.map((email) => (
                      <Badge key={email} variant="outline" className="text-xs">
                        <Mail className="h-3 w-3 mr-1" />
                        {email}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={report.status === "active"}
                        onCheckedChange={() => toggleReportStatus(report.id)}
                      />
                      <span className="text-sm">
                        {report.status === "active" ? "Active" : "Paused"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onEditSchedule(report.id)}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-3 w-3 mr-1" />
                      Config
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Quick Setup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Quick Setup
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-auto p-4 justify-start">
              <div className="flex items-center gap-3">
                <Brain className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <div className="font-medium">Daily AI Insights</div>
                  <div className="text-xs text-muted-foreground">Get daily business insights</div>
                </div>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 justify-start">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-success" />
                <div className="text-left">
                  <div className="font-medium">Weekly Reports</div>
                  <div className="text-xs text-muted-foreground">Comprehensive weekly analysis</div>
                </div>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 justify-start">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent" />
                <div className="text-left">
                  <div className="font-medium">Alert Reports</div>
                  <div className="text-xs text-muted-foreground">AI-triggered alerts</div>
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}