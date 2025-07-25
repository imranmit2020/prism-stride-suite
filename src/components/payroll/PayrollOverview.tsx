import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useGlobalization } from "@/contexts/GlobalizationContext";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Clock,
  AlertTriangle
} from "lucide-react";

const payrollStatsRaw = [
  {
    title: "Total Employees",
    value: "156",
    change: "+8",
    trend: "up",
    icon: Users,
    description: "active employees",
    type: "number"
  },
  {
    title: "Monthly Payroll",
    value: 284560,
    change: "+12.3%",
    trend: "up", 
    icon: DollarSign,
    description: "total monthly cost",
    type: "currency"
  },
  {
    title: "Avg. Salary",
    value: 4250,
    change: "+5.2%",
    trend: "up",
    icon: TrendingUp,
    description: "per employee/month",
    type: "currency"
  },
  {
    title: "Next Payroll",
    value: "3 days",
    change: "On schedule",
    trend: "neutral",
    icon: Calendar,
    description: "until processing",
    type: "number"
  }
];

const departmentPayroll = [
  {
    department: "Operations",
    employees: 45,
    totalCost: 126750,
    avgSalary: 2817,
    percentage: 44.5
  },
  {
    department: "Food Service", 
    employees: 38,
    totalCost: 89640,
    avgSalary: 2359,
    percentage: 31.5
  },
  {
    department: "Management",
    employees: 12,
    totalCost: 42000,
    avgSalary: 3500,
    percentage: 14.8
  },
  {
    department: "Support",
    employees: 8,
    totalCost: 26170,
    avgSalary: 3271,
    percentage: 9.2
  }
];

const upcomingPayroll = [
  {
    type: "Regular Payroll",
    date: "2024-01-31",
    employees: 145,
    amount: 267840,
    status: "scheduled"
  },
  {
    type: "Overtime Pay",
    date: "2024-01-31", 
    employees: 23,
    amount: 12650,
    status: "pending_approval"
  },
  {
    type: "Bonus Payments",
    date: "2024-02-01",
    employees: 8,
    amount: 15000,
    status: "draft"
  }
];

export function PayrollOverview() {
  console.log("👥 PayrollOverview rendering");
  
  try {
    const { formatCurrency } = useGlobalization();
    console.log("✅ Globalization context loaded in PayrollOverview");
    
    // Convert raw payroll data to formatted data
    const payrollStats = payrollStatsRaw.map(stat => ({
      ...stat,
      value: stat.type === "currency" ? formatCurrency(stat.value as number) : stat.value
    }));
    console.log("✅ Payroll stats formatted:", payrollStats);
  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "bg-success text-success-foreground";
      case "pending_approval": return "bg-warning text-warning-foreground";
      case "draft": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {payrollStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  </div>
                  <Icon className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="mt-2">
                  <span className={`text-xs font-medium ${
                    stat.trend === "up" ? "text-success" : 
                    stat.trend === "down" ? "text-destructive" : 
                    "text-muted-foreground"
                  }`}>
                    {stat.change} from last month
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Department Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Payroll by Department</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {departmentPayroll.map((dept) => (
              <div key={dept.department} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium">{dept.department}</h4>
                    <span className="text-sm text-muted-foreground">
                      {dept.employees} employees
                    </span>
                  </div>
                   <div className="text-right">
                     <div className="font-medium">{formatCurrency(dept.totalCost)}</div>
                     <div className="text-sm text-muted-foreground">
                       Avg: {formatCurrency(dept.avgSalary)}
                     </div>
                   </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>% of Total Payroll</span>
                    <span>{dept.percentage}%</span>
                  </div>
                  <Progress value={dept.percentage} className="h-2" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Payroll */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Upcoming Payroll
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingPayroll.map((payroll, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{payroll.type}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payroll.status)}`}>
                      {payroll.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {payroll.employees} employees • {new Date(payroll.date).toLocaleDateString()}
                  </div>
                </div>
                 <div className="text-right">
                   <div className="font-bold text-lg">{formatCurrency(payroll.amount)}</div>
                  {payroll.status === "pending_approval" && (
                    <div className="flex items-center gap-1 text-xs text-warning">
                      <AlertTriangle className="h-3 w-3" />
                      Needs approval
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
  } catch (error) {
    console.error("❌ PayrollOverview error:", error);
    return (
      <div className="p-6 border rounded-lg">
        <h3 className="text-lg font-semibold text-destructive mb-2">Error Loading Payroll Overview</h3>
        <p className="text-muted-foreground">There was an error loading the payroll data. Please refresh the page.</p>
        <pre className="mt-2 text-xs bg-muted p-2 rounded">{error?.toString()}</pre>
      </div>
    );
  }
}