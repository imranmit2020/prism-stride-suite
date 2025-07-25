import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { DollarSign, TrendingUp, Calendar, FileText, Plus } from "lucide-react";

export function PersonalIncomeInterface() {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  const handleAddIncome = () => {
    toast({
      title: "Income Added",
      description: "New income source has been tracked successfully"
    });
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex flex-wrap h-auto items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-full gap-1">
          <TabsTrigger value="overview" className="px-3 py-2 text-xs font-medium">Overview</TabsTrigger>
          <TabsTrigger value="sources" className="px-3 py-2 text-xs font-medium">Income Sources</TabsTrigger>
          <TabsTrigger value="taxes" className="px-3 py-2 text-xs font-medium">Tax Tracking</TabsTrigger>
          <TabsTrigger value="reports" className="px-3 py-2 text-xs font-medium">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Month</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$4,250</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Year</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$48,300</div>
                <p className="text-xs text-muted-foreground">+8% from last year</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tax Withheld</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,075</div>
                <p className="text-xs text-muted-foreground">25% effective rate</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Income</CardTitle>
              <CardDescription>Your latest income entries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Freelance Project</div>
                    <div className="text-sm text-muted-foreground">Client: ABC Corp</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">$1,200</div>
                    <div className="text-sm text-muted-foreground">Jan 15, 2024</div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Salary</div>
                    <div className="text-sm text-muted-foreground">Monthly Salary</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">$3,000</div>
                    <div className="text-sm text-muted-foreground">Jan 1, 2024</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Income Sources</h2>
            <Button onClick={handleAddIncome}>
              <Plus className="h-4 w-4 mr-2" />
              Add Income
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Add New Income</CardTitle>
              <CardDescription>Track your various income sources</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="source">Income Source</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select source type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salary">Salary</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="passive">Passive Income</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" placeholder="$0.00" type="number" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="once">One-time</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="annually">Annually</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date Received</Label>
                  <Input id="date" type="date" />
                </div>
              </div>
              <Button onClick={handleAddIncome} className="w-full">
                Add Income Entry
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="taxes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tax Tracking</CardTitle>
              <CardDescription>Monitor your tax obligations and withholdings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Federal Taxes</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Gross Income YTD</span>
                      <span>$48,300</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Federal Withheld</span>
                      <span>$8,694</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Tax Rate</span>
                      <span>18%</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">State & Local</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>State Withheld</span>
                      <span>$2,415</span>
                    </div>
                    <div className="flex justify-between">
                      <span>FICA/Medicare</span>
                      <span>$3,695</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Tax Rate</span>
                      <span>25%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Income Reports</CardTitle>
              <CardDescription>Generate reports for tax filing and budgeting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <Calendar className="h-6 w-6 mb-2" />
                  Monthly Summary
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <FileText className="h-6 w-6 mb-2" />
                  Tax Year Report
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <TrendingUp className="h-6 w-6 mb-2" />
                  Income Trends
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <DollarSign className="h-6 w-6 mb-2" />
                  1099 Summary
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}