import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { 
  FileText, 
  Download, 
  TrendingUp, 
  PieChart, 
  Receipt, 
  Calendar as CalendarIcon,
  DollarSign,
  Home,
  CreditCard,
  Target,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface PersonalReport {
  id: string;
  title: string;
  description: string;
  type: "financial" | "budget" | "tax" | "inventory" | "goals";
  status: "ready" | "generating" | "scheduled";
  lastGenerated?: string;
  frequency: "monthly" | "quarterly" | "yearly" | "on-demand";
  icon: any;
}

export function PersonalReportsInterface() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [activeTab, setActiveTab] = useState("overview");

  const personalReports: PersonalReport[] = [
    {
      id: "monthly-budget",
      title: "Monthly Budget Report",
      description: "Income vs expenses breakdown with category analysis",
      type: "budget",
      status: "ready",
      lastGenerated: "2024-03-15",
      frequency: "monthly",
      icon: PieChart
    },
    {
      id: "expense-summary",
      title: "Expense Summary",
      description: "Detailed spending analysis with trends and patterns",
      type: "financial",
      status: "ready",
      lastGenerated: "2024-03-10",
      frequency: "monthly",
      icon: Receipt
    },
    {
      id: "income-analysis",
      title: "Income Analysis",
      description: "Income sources tracking and growth analysis",
      type: "financial",
      status: "generating",
      frequency: "monthly",
      icon: TrendingUp
    },
    {
      id: "tax-preparation",
      title: "Tax Preparation Report",
      description: "Annual summary for tax filing with deductible expenses",
      type: "tax",
      status: "ready",
      lastGenerated: "2024-01-15",
      frequency: "yearly",
      icon: FileText
    },
    {
      id: "net-worth",
      title: "Net Worth Statement",
      description: "Assets vs liabilities with growth tracking",
      type: "financial",
      status: "ready",
      lastGenerated: "2024-03-01",
      frequency: "quarterly",
      icon: DollarSign
    },
    {
      id: "savings-goals",
      title: "Savings Goals Report",
      description: "Progress tracking for financial goals and targets",
      type: "goals",
      status: "scheduled",
      frequency: "monthly",
      icon: Target
    },
    {
      id: "household-inventory",
      title: "Household Inventory",
      description: "Home items valuation for insurance purposes",
      type: "inventory",
      status: "ready",
      lastGenerated: "2024-02-20",
      frequency: "yearly",
      icon: Home
    },
    {
      id: "credit-report",
      title: "Credit Health Summary",
      description: "Credit score tracking and financial health overview",
      type: "financial",
      status: "ready",
      lastGenerated: "2024-03-12",
      frequency: "monthly",
      icon: CreditCard
    }
  ];

  const reportStats = {
    total: personalReports.length,
    ready: personalReports.filter(r => r.status === "ready").length,
    generating: personalReports.filter(r => r.status === "generating").length,
    scheduled: personalReports.filter(r => r.status === "scheduled").length
  };

  const handleGenerateReport = (reportId: string) => {
    console.log(`Generating report: ${reportId}`);
    // Implementation for report generation
  };

  const handleDownloadReport = (reportId: string) => {
    console.log(`Downloading report: ${reportId}`);
    // Implementation for report download
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready":
        return <Badge variant="default" className="text-green-700 bg-green-100"><CheckCircle className="w-3 h-3 mr-1" />Ready</Badge>;
      case "generating":
        return <Badge variant="secondary"><AlertCircle className="w-3 h-3 mr-1" />Generating</Badge>;
      case "scheduled":
        return <Badge variant="outline"><CalendarIcon className="w-3 h-3 mr-1" />Scheduled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
          <TabsTrigger value="financial" className="text-sm">Financial</TabsTrigger>
          <TabsTrigger value="household" className="text-sm">Household</TabsTrigger>
          <TabsTrigger value="custom" className="text-sm">Custom Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-blue-600" />
                  Total Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{reportStats.total}</div>
                <div className="text-xs text-muted-foreground">Available reports</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Ready
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{reportStats.ready}</div>
                <div className="text-xs text-muted-foreground">Ready to download</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  Processing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{reportStats.generating}</div>
                <div className="text-xs text-muted-foreground">Currently generating</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <CalendarIcon className="h-4 w-4 text-purple-600" />
                  Scheduled
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{reportStats.scheduled}</div>
                <div className="text-xs text-muted-foreground">Auto-generated</div>
              </CardContent>
            </Card>
          </div>

          {/* All Reports Grid */}
          <Card>
            <CardHeader>
              <CardTitle>Available Reports</CardTitle>
              <CardDescription>Generate and download personal financial and household reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {personalReports.map((report) => (
                  <div key={report.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <report.icon className="h-5 w-5 text-primary" />
                        <div>
                          <h3 className="font-medium text-sm">{report.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{report.description}</p>
                        </div>
                      </div>
                      {getStatusBadge(report.status)}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Frequency: {report.frequency}</span>
                      {report.lastGenerated && (
                        <span>Last: {format(new Date(report.lastGenerated), "MMM dd")}</span>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      {report.status === "ready" ? (
                        <Button 
                          size="sm" 
                          onClick={() => handleDownloadReport(report.id)}
                          className="flex-1"
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleGenerateReport(report.id)}
                          className="flex-1"
                          disabled={report.status === "generating"}
                        >
                          {report.status === "generating" ? "Generating..." : "Generate"}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Financial Reports</CardTitle>
                  <CardDescription>Income, expenses, budgets, and financial health reports</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {selectedPeriod === "custom" && (
                    <div className="flex gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className={cn("w-28", !dateFrom && "text-muted-foreground")}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dateFrom ? format(dateFrom, "MMM dd") : "From"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 z-[9999]" align="start">
                          <Calendar
                            mode="single"
                            selected={dateFrom}
                            onSelect={setDateFrom}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className={cn("w-28", !dateTo && "text-muted-foreground")}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dateTo ? format(dateTo, "MMM dd") : "To"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 z-[9999]" align="start">
                          <Calendar
                            mode="single"
                            selected={dateTo}
                            onSelect={setDateTo}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                            disabled={(date) => dateFrom ? date < dateFrom : false}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {personalReports.filter(r => r.type === "financial" || r.type === "budget").map((report) => (
                  <div key={report.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <report.icon className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">{report.title}</h3>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      {getStatusBadge(report.status)}
                      <Button size="sm" variant="outline">
                        {report.status === "ready" ? "Download" : "Generate"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="household" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Household Reports</CardTitle>
              <CardDescription>Home inventory, insurance documentation, and household analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {personalReports.filter(r => r.type === "inventory").map((report) => (
                  <div key={report.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <report.icon className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">{report.title}</h3>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      {getStatusBadge(report.status)}
                      <Button size="sm" variant="outline">
                        {report.status === "ready" ? "Download" : "Generate"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Custom Report Builder</CardTitle>
              <CardDescription>Create personalized reports with specific data ranges and filters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Custom Report Builder</h3>
                  <p className="text-muted-foreground mb-4">
                    Build personalized reports by selecting specific data sources, date ranges, and formatting options.
                  </p>
                  <Button>Start Building Report</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}