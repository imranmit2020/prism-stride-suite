import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function SimplePayrollOverview() {
  console.log("👥 SimplePayrollOverview rendering as fallback");
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+8 new this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Payroll</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$284,560</div>
            <p className="text-xs text-muted-foreground">+12.3% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Salary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,250</div>
            <p className="text-xs text-muted-foreground">per employee/month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Payroll</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 days</div>
            <p className="text-xs text-muted-foreground">until processing</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Department Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Engineering</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">35 employees</span>
                  <Badge variant="secondary">$145K</Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Sales</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">28 employees</span>
                  <Badge variant="secondary">$98K</Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Marketing</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">12 employees</span>
                  <Badge variant="secondary">$42K</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Payroll</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Regular Payroll</div>
                  <div className="text-sm text-muted-foreground">145 employees</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">$267,840</div>
                  <Badge variant="default">Scheduled</Badge>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Overtime Pay</div>
                  <div className="text-sm text-muted-foreground">23 employees</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">$12,650</div>
                  <Badge variant="secondary">Pending</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}