import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Target, TrendingUp, DollarSign, Phone, Mail, Calendar, Plus } from "lucide-react";
import { useGlobalization } from "@/contexts/GlobalizationContext";

export function CRMOverview() {
  const { formatCurrency } = useGlobalization();

  // Mock data - in real implementation, this would come from API
  const stats = {
    totalLeads: 234,
    qualifiedLeads: 89,
    customers: 156,
    conversionRate: 38,
    totalPipelineValue: 485000,
    monthlyRevenue: 125000,
    dealsClosedThisMonth: 23,
    averageDealSize: 5435
  };

  const recentLeads = [
    {
      id: '1',
      name: 'Sarah Johnson',
      company: 'Tech Solutions Inc',
      email: 'sarah@techsolutions.com',
      phone: '+1-555-0123',
      status: 'qualified',
      value: 25000,
      source: 'website',
      lastContact: '2024-01-15'
    },
    {
      id: '2',
      name: 'Michael Chen',
      company: 'Digital Marketing Pro',
      email: 'michael@digitalmp.com',
      phone: '+1-555-0456',
      status: 'proposal',
      value: 15000,
      source: 'referral',
      lastContact: '2024-01-14'
    },
    {
      id: '3',
      name: 'Emma Rodriguez',
      company: 'Global Enterprises',
      email: 'emma@globalent.com',
      phone: '+1-555-0789',
      status: 'negotiation',
      value: 45000,
      source: 'social_media',
      lastContact: '2024-01-13'
    }
  ];

  const upcomingTasks = [
    {
      id: '1',
      type: 'call',
      description: 'Follow up with Sarah Johnson',
      dueDate: '2024-01-16',
      priority: 'high'
    },
    {
      id: '2',
      type: 'email',
      description: 'Send proposal to Michael Chen',
      dueDate: '2024-01-16',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'meeting',
      description: 'Demo call with Emma Rodriguez',
      dueDate: '2024-01-17',
      priority: 'high'
    }
  ];

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'new': return 'secondary';
      case 'contacted': return 'outline';
      case 'qualified': return 'default';
      case 'proposal': return 'secondary';
      case 'negotiation': return 'default';
      case 'closed_won': return 'default';
      case 'closed_lost': return 'destructive';
      default: return 'secondary';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLeads}</div>
            <p className="text-xs text-muted-foreground">
              {stats.qualifiedLeads} qualified
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.conversionRate}%</div>
            <Progress value={stats.conversionRate} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalPipelineValue)}</div>
            <p className="text-xs text-muted-foreground">
              {stats.dealsClosedThisMonth} deals this month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Deal Size</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.averageDealSize)}</div>
            <p className="text-xs text-muted-foreground">
              Monthly revenue: {formatCurrency(stats.monthlyRevenue)}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Leads</CardTitle>
                <CardDescription>Latest prospects in your pipeline</CardDescription>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Lead
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{lead.name}</h4>
                      <Badge variant={getStatusBadgeVariant(lead.status)}>
                        {lead.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{lead.company}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {lead.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {lead.phone}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{formatCurrency(lead.value)}</div>
                    <div className="text-xs text-muted-foreground">
                      Source: {lead.source.replace('_', ' ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Upcoming Tasks</CardTitle>
                <CardDescription>Your scheduled follow-ups and activities</CardDescription>
              </div>
              <Button size="sm" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      {task.type === 'call' && <Phone className="h-4 w-4 text-primary" />}
                      {task.type === 'email' && <Mail className="h-4 w-4 text-primary" />}
                      {task.type === 'meeting' && <Calendar className="h-4 w-4 text-primary" />}
                    </div>
                    <div>
                      <p className="font-medium">{task.description}</p>
                      <p className="text-sm text-muted-foreground">Due: {task.dueDate}</p>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={getPriorityColor(task.priority)}
                  >
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}