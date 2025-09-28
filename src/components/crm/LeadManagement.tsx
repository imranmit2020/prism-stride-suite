import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, Plus, Edit, Trash2, Phone, Mail, Calendar, Filter } from "lucide-react";
import { useGlobalization } from "@/contexts/GlobalizationContext";
import { useToast } from "@/hooks/use-toast";
import { useValidatedForm } from "@/hooks/useValidatedForm";
import { leadSchema, type LeadFormData } from "@/lib/validation";

export function LeadManagement() {
  const { formatCurrency } = useGlobalization();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);

  // Mock data - in real implementation, this would come from API/database
  const [leads, setLeads] = useState([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@techsolutions.com',
      phone: '+1-555-0123',
      company: 'Tech Solutions Inc',
      position: 'CTO',
      leadSource: 'website' as const,
      status: 'qualified' as const,
      estimatedValue: 25000,
      expectedCloseDate: '2024-02-15',
      notes: 'Interested in enterprise solution',
      createdAt: '2024-01-10',
      lastContact: '2024-01-15'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael@digitalmp.com',
      phone: '+1-555-0456',
      company: 'Digital Marketing Pro',
      position: 'CEO',
      leadSource: 'referral' as const,
      status: 'proposal' as const,
      estimatedValue: 15000,
      expectedCloseDate: '2024-02-20',
      notes: 'Referred by existing client',
      createdAt: '2024-01-12',
      lastContact: '2024-01-14'
    },
    {
      id: '3',
      name: 'Emma Rodriguez',
      email: 'emma@globalent.com',
      phone: '+1-555-0789',
      company: 'Global Enterprises',
      position: 'VP Marketing',
      leadSource: 'social_media' as const,
      status: 'negotiation' as const,
      estimatedValue: 45000,
      expectedCloseDate: '2024-02-10',
      notes: 'Large enterprise deal',
      createdAt: '2024-01-08',
      lastContact: '2024-01-13'
    }
  ]);

  const defaultValues: LeadFormData = {
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    leadSource: 'website',
    status: 'new',
    estimatedValue: 0,
    expectedCloseDate: '',
    notes: ''
  };

  const { form, handleSubmit, isValid } = useValidatedForm(
    leadSchema,
    defaultValues,
    (data: LeadFormData) => {
      const newLead = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email || '',
        phone: data.phone || '',
        company: data.company || '',
        position: data.position || '',
        leadSource: data.leadSource,
        status: data.status,
        estimatedValue: data.estimatedValue || 0,
        expectedCloseDate: data.expectedCloseDate || '',
        notes: data.notes || '',
        createdAt: new Date().toISOString().split('T')[0],
        lastContact: new Date().toISOString().split('T')[0]
      };
      
      setLeads(prev => [...prev, newLead]);
      setShowAddDialog(false);
      form.reset();
      
      toast({
        title: "Lead Added",
        description: `${data.name} has been added to your pipeline`
      });
    }
  );

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    const matchesSource = sourceFilter === "all" || lead.leadSource === sourceFilter;
    
    return matchesSearch && matchesStatus && matchesSource;
  });

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

  const handleDeleteLead = (leadId: string) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      setLeads(prev => prev.filter(lead => lead.id !== leadId));
      toast({
        title: "Lead Deleted",
        description: "Lead has been removed from your pipeline"
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lead Management</CardTitle>
              <CardDescription>Manage your sales prospects and pipeline</CardDescription>
            </div>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Lead
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Lead</DialogTitle>
                  <DialogDescription>
                    Add a new prospect to your sales pipeline
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input 
                        id="name"
                        {...form.register('name')}
                        placeholder="Lead name"
                      />
                      {form.formState.errors.name && (
                        <p className="text-sm text-red-600">{form.formState.errors.name.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email"
                        type="email"
                        {...form.register('email')}
                        placeholder="email@example.com"
                      />
                      {form.formState.errors.email && (
                        <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone"
                        {...form.register('phone')}
                        placeholder="+1-555-0123"
                      />
                      {form.formState.errors.phone && (
                        <p className="text-sm text-red-600">{form.formState.errors.phone.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input 
                        id="company"
                        {...form.register('company')}
                        placeholder="Company name"
                      />
                      {form.formState.errors.company && (
                        <p className="text-sm text-red-600">{form.formState.errors.company.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="position">Position</Label>
                      <Input 
                        id="position"
                        {...form.register('position')}
                        placeholder="Job title"
                      />
                      {form.formState.errors.position && (
                        <p className="text-sm text-red-600">{form.formState.errors.position.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="leadSource">Lead Source *</Label>
                      <Select onValueChange={(value) => form.setValue('leadSource', value as any)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select source" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="website">Website</SelectItem>
                          <SelectItem value="social_media">Social Media</SelectItem>
                          <SelectItem value="referral">Referral</SelectItem>
                          <SelectItem value="advertisement">Advertisement</SelectItem>
                          <SelectItem value="cold_call">Cold Call</SelectItem>
                          <SelectItem value="event">Event</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.leadSource && (
                        <p className="text-sm text-red-600">{form.formState.errors.leadSource.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="estimatedValue">Estimated Value</Label>
                      <Input 
                        id="estimatedValue"
                        type="number"
                        {...form.register('estimatedValue', { valueAsNumber: true })}
                        placeholder="0"
                      />
                      {form.formState.errors.estimatedValue && (
                        <p className="text-sm text-red-600">{form.formState.errors.estimatedValue.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expectedCloseDate">Expected Close Date</Label>
                      <Input 
                        id="expectedCloseDate"
                        type="date"
                        {...form.register('expectedCloseDate')}
                      />
                      {form.formState.errors.expectedCloseDate && (
                        <p className="text-sm text-red-600">{form.formState.errors.expectedCloseDate.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea 
                      id="notes"
                      {...form.register('notes')}
                      placeholder="Additional notes about this lead"
                      rows={3}
                    />
                    {form.formState.errors.notes && (
                      <p className="text-sm text-red-600">{form.formState.errors.notes.message}</p>
                    )}
                  </div>

                  <DialogFooter>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowAddDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={!isValid}>
                      Add Lead
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="proposal">Proposal</SelectItem>
                <SelectItem value="negotiation">Negotiation</SelectItem>
                <SelectItem value="closed_won">Closed Won</SelectItem>
                <SelectItem value="closed_lost">Closed Lost</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="website">Website</SelectItem>
                <SelectItem value="social_media">Social Media</SelectItem>
                <SelectItem value="referral">Referral</SelectItem>
                <SelectItem value="advertisement">Advertisement</SelectItem>
                <SelectItem value="cold_call">Cold Call</SelectItem>
                <SelectItem value="event">Event</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Leads Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lead</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Expected Close</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{lead.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {lead.position} at {lead.company}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3" />
                          {lead.email}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="h-3 w-3" />
                          {lead.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(lead.status)}>
                        {lead.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="capitalize">
                        {lead.leadSource.replace('_', ' ')}
                      </span>
                    </TableCell>
                    <TableCell>
                      {lead.estimatedValue ? formatCurrency(lead.estimatedValue) : '-'}
                    </TableCell>
                    <TableCell>
                      {lead.expectedCloseDate || '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleDeleteLead(lead.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredLeads.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No leads found matching your criteria
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}