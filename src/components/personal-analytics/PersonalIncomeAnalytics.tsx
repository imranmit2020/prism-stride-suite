import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { TrendingUp, DollarSign, Calendar as CalendarIcon, Target, BriefcaseIcon, PiggyBank, ChartBar } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export function PersonalIncomeAnalytics() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("6months");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();

  const incomeStreams = [
    { source: "Primary Job", amount: 4500, target: 4500, change: 5.2, trend: "up", type: "Salary" },
    { source: "Freelancing", amount: 650, target: 800, change: -18.8, trend: "down", type: "Variable" },
    { source: "Investments", amount: 150, target: 200, change: 25.0, trend: "up", type: "Passive" },
    { source: "Side Business", amount: 320, target: 400, change: 12.3, trend: "up", type: "Business" },
    { source: "Rental Income", amount: 280, target: 300, change: -6.7, trend: "down", type: "Passive" },
    { source: "Dividends", amount: 95, target: 100, change: 8.0, trend: "up", type: "Passive" }
  ];

  const incomeInsights = [
    {
      title: "Monthly Income",
      value: "$5,995",
      detail: "Total across all sources",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Best Performing Source",
      value: "Investments",
      detail: "+25% growth this month",
      icon: TrendingUp,
      color: "text-emerald-600"
    },
    {
      title: "Target Achievement",
      value: "88.2%",
      detail: "Of monthly income goal",
      icon: Target,
      color: "text-blue-600"
    },
    {
      title: "Income Stability",
      value: "High",
      detail: "85% from stable sources",
      icon: ChartBar,
      color: "text-teal-600"
    }
  ];

  const incomeTrendsData = {
    "1month": [
      { month: "Week 1", amount: 1456 },
      { month: "Week 2", amount: 1623 },
      { month: "Week 3", amount: 1384 },
      { month: "Week 4", amount: 1532 }
    ],
    "3months": [
      { month: "Jan", amount: 5834 },
      { month: "Feb", amount: 6156 },
      { month: "Mar", amount: 5995 }
    ],
    "6months": [
      { month: "Oct", amount: 5294 },
      { month: "Nov", amount: 5656 },
      { month: "Dec", amount: 6087 },
      { month: "Jan", amount: 5834 },
      { month: "Feb", amount: 6156 },
      { month: "Mar", amount: 5995 }
    ],
    "12months": [
      { month: "Apr", amount: 4989 },
      { month: "May", amount: 5234 },
      { month: "Jun", amount: 5456 },
      { month: "Jul", amount: 5187 },
      { month: "Aug", amount: 5334 },
      { month: "Sep", amount: 5445 },
      { month: "Oct", amount: 5294 },
      { month: "Nov", amount: 5656 },
      { month: "Dec", amount: 6087 },
      { month: "Jan", amount: 5834 },
      { month: "Feb", amount: 6156 },
      { month: "Mar", amount: 5995 }
    ],
    "daterange": dateFrom && dateTo ? [
      { month: "Custom", amount: 5845 },
      { month: "Range", amount: 6178 },
      { month: "Data", amount: 5723 }
    ] : []
  };

  const incomeTrends = incomeTrendsData[selectedTimeRange as keyof typeof incomeTrendsData];
  
  const getTimeRangeLabel = () => {
    switch (selectedTimeRange) {
      case "1month": return "1-Month";
      case "3months": return "3-Month";
      case "6months": return "6-Month";
      case "12months": return "12-Month";
      case "daterange": return dateFrom && dateTo 
        ? `${format(dateFrom, "MMM dd")} - ${format(dateTo, "MMM dd")}` 
        : "Date Range";
      default: return "6-Month";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {incomeInsights.map((insight, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <insight.icon className="h-4 w-4 text-green-600" />
                {insight.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${insight.color}`}>{insight.value}</div>
              <div className="text-xs text-muted-foreground">{insight.detail}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BriefcaseIcon className="h-5 w-5" />
            Income Sources Breakdown
          </CardTitle>
          <CardDescription>
            Track performance against targets and analyze income diversification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {incomeStreams.map((stream, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{stream.source}</span>
                    <Badge variant="outline">{stream.type}</Badge>
                    <Badge variant={stream.trend === "up" ? "default" : "destructive"}>
                      {stream.trend === "up" ? "+" : ""}{stream.change.toFixed(1)}%
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${stream.amount.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">
                      Target: ${stream.target.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <Progress value={(stream.amount / stream.target) * 100} className="h-2" />
                  {stream.amount > stream.target && (
                    <div 
                      className="absolute top-0 h-2 bg-green-500 rounded-full"
                      style={{ 
                        left: "100%", 
                        width: `${((stream.amount - stream.target) / stream.target) * 100}%`,
                        maxWidth: "50%"
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-visible">
        <CardHeader className="overflow-visible">
          <div className="flex items-center justify-between overflow-visible">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                {getTimeRangeLabel()} Income Trend
              </CardTitle>
              <CardDescription>
                Track your total income growth over time
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">1 Month</SelectItem>
                  <SelectItem value="3months">3 Months</SelectItem>
                  <SelectItem value="6months">6 Months</SelectItem>
                  <SelectItem value="12months">12 Months</SelectItem>
                  <SelectItem value="daterange">Date Range</SelectItem>
                </SelectContent>
              </Select>
              
              {selectedTimeRange === "daterange" && (
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-28 justify-start text-left font-normal",
                          !dateFrom && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateFrom ? format(dateFrom, "MMM dd") : "From"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent 
                      className="w-auto p-0 z-[9999]" 
                      align="end" 
                      side="bottom"
                      sideOffset={5}
                      avoidCollisions={true}
                      style={{ position: 'fixed' }}
                    >
                      <Calendar
                        mode="single"
                        selected={dateFrom}
                        onSelect={setDateFrom}
                        initialFocus
                        className={cn("p-3 pointer-events-auto bg-background border rounded-md shadow-lg")}
                      />
                    </PopoverContent>
                  </Popover>
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-28 justify-start text-left font-normal",
                          !dateTo && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateTo ? format(dateTo, "MMM dd") : "To"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent 
                      className="w-auto p-0 z-[9999]" 
                      align="end" 
                      side="bottom"
                      sideOffset={5}
                      avoidCollisions={true}
                      style={{ position: 'fixed' }}
                    >
                      <Calendar
                        mode="single"
                        selected={dateTo}
                        onSelect={setDateTo}
                        initialFocus
                        className={cn("p-3 pointer-events-auto bg-background border rounded-md shadow-lg")}
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
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span>Average {selectedTimeRange === "1month" ? "Weekly" : "Monthly"} Income:</span>
              <span className="font-medium">
                ${incomeTrends.length > 0 ? Math.round(incomeTrends.reduce((sum, trend) => sum + trend.amount, 0) / incomeTrends.length).toLocaleString() : "0"}
              </span>
            </div>
            <div className={`grid gap-2 ${incomeTrends.length <= 4 ? 'grid-cols-4' : incomeTrends.length <= 6 ? 'grid-cols-6' : 'grid-cols-12'}`}>
              {incomeTrends.map((trend, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="text-xs text-muted-foreground">{trend.month}</div>
                  <div 
                    className="bg-green-500 rounded w-full"
                    style={{ 
                      height: `${incomeTrends.length > 0 ? (trend.amount / Math.max(...incomeTrends.map(t => t.amount))) * 100 : 20}px`,
                      minHeight: "20px"
                    }}
                  />
                  <div className="text-xs font-medium">
                    ${selectedTimeRange === "1month" ? (trend.amount / 1000).toFixed(1) + "k" : (trend.amount / 1000).toFixed(1) + "k"}
                  </div>
                </div>
              ))}
            </div>
            {selectedTimeRange === "daterange" && (!dateFrom || !dateTo) && (
              <div className="text-center py-4 text-muted-foreground">
                Please select both start and end dates to view income data
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PiggyBank className="h-5 w-5" />
            AI Income Insights & Recommendations
          </CardTitle>
          <CardDescription>
            Personalized insights to optimize and grow your income
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="default">Opportunity</Badge>
                <span className="text-sm text-muted-foreground">Freelancing</span>
              </div>
              <div>
                <h4 className="font-medium mb-2">Income Source Underperforming</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Your freelancing income is 18.8% below target. Consider raising rates or seeking new clients.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-600">
                    Potential Monthly Increase: $150
                  </span>
                  <Button size="sm" variant="outline">Optimize</Button>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">Growth</Badge>
                <span className="text-sm text-muted-foreground">Investments</span>
              </div>
              <div>
                <h4 className="font-medium mb-2">Strong Investment Performance</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Your investment income grew 25% this month. Consider increasing your investment allocation.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-600">
                    Recommendation: Increase monthly investment by $200
                  </span>
                  <Button size="sm" variant="outline">Learn More</Button>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline">Stability</Badge>
                <span className="text-sm text-muted-foreground">Income Mix</span>
              </div>
              <div>
                <h4 className="font-medium mb-2">Diversification Score: Excellent</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Your income is well-diversified across 6 sources. Consider adding one more passive income stream.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-purple-600">
                    Target: Add $100/month passive income
                  </span>
                  <Button size="sm" variant="outline">Explore Options</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}