import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export interface Lead {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  position?: string;
  leadSource: 'website' | 'social_media' | 'referral' | 'advertisement' | 'cold_call' | 'event' | 'other';
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
  estimatedValue?: number;
  expectedCloseDate?: string;
  notes?: string;
  tags?: string[];
  createdAt: string;
  lastContact?: string;
  assignedTo?: string;
}

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  address?: {
    street: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
  };
  totalSpent: number;
  lifetimeValue: number;
  acquisitionDate: string;
  lastPurchase?: string;
  status: 'active' | 'inactive' | 'churned';
  segment?: string;
  loyaltyTier?: string;
  notes?: string;
  tags?: string[];
}

export interface Deal {
  id: string;
  title: string;
  leadId?: string;
  customerId?: string;
  value: number;
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
  probability: number;
  expectedCloseDate: string;
  actualCloseDate?: string;
  products?: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export function useCRM() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  // In a real implementation, these would be database operations
  // For now, using local state as demo

  const loadLeads = async () => {
    try {
      setLoading(true);
      // Mock data for demonstration
      const mockLeads: Lead[] = [
        {
          id: '1',
          name: 'Sarah Johnson',
          email: 'sarah@techsolutions.com',
          phone: '+1-555-0123',
          company: 'Tech Solutions Inc',
          position: 'CTO',
          leadSource: 'website',
          status: 'qualified',
          estimatedValue: 25000,
          expectedCloseDate: '2024-02-15',
          notes: 'Interested in enterprise solution',
          createdAt: '2024-01-10',
          lastContact: '2024-01-15',
          tags: ['enterprise', 'high-value']
        },
        {
          id: '2',
          name: 'Michael Chen',
          email: 'michael@digitalmp.com',
          phone: '+1-555-0456',
          company: 'Digital Marketing Pro',
          position: 'CEO',
          leadSource: 'referral',
          status: 'proposal',
          estimatedValue: 15000,
          expectedCloseDate: '2024-02-20',
          notes: 'Referred by existing client',
          createdAt: '2024-01-12',
          lastContact: '2024-01-14',
          tags: ['referral', 'marketing']
        }
      ];
      setLeads(mockLeads);
    } catch (error) {
      console.error('Error loading leads:', error);
      toast({
        title: "Error Loading Leads",
        description: "Failed to load leads from database",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadCustomers = async () => {
    try {
      // Mock customer data
      const mockCustomers: Customer[] = [
        {
          id: '1',
          name: 'Acme Corporation',
          email: 'contact@acme.com',
          phone: '+1-555-9999',
          company: 'Acme Corporation',
          totalSpent: 125000,
          lifetimeValue: 180000,
          acquisitionDate: '2023-06-15',
          lastPurchase: '2024-01-10',
          status: 'active',
          segment: 'enterprise',
          loyaltyTier: 'platinum',
          tags: ['high-value', 'long-term']
        }
      ];
      setCustomers(mockCustomers);
    } catch (error) {
      console.error('Error loading customers:', error);
      toast({
        title: "Error Loading Customers",
        description: "Failed to load customers from database",
        variant: "destructive"
      });
    }
  };

  const loadDeals = async () => {
    try {
      // Mock deal data
      const mockDeals: Deal[] = [
        {
          id: '1',
          title: 'Enterprise Software License',
          leadId: '1',
          value: 25000,
          stage: 'proposal',
          probability: 75,
          expectedCloseDate: '2024-02-15',
          products: ['Enterprise License', 'Support Package'],
          notes: 'Positive response to proposal',
          createdAt: '2024-01-10',
          updatedAt: '2024-01-15'
        }
      ];
      setDeals(mockDeals);
    } catch (error) {
      console.error('Error loading deals:', error);
      toast({
        title: "Error Loading Deals",
        description: "Failed to load deals from database",
        variant: "destructive"
      });
    }
  };

  const createLead = async (leadData: Omit<Lead, 'id' | 'createdAt'>) => {
    try {
      const newLead: Lead = {
        ...leadData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setLeads(prev => [...prev, newLead]);
      
      toast({
        title: "Lead Created",
        description: `${leadData.name} has been added to your pipeline`
      });
      
      return { success: true, data: newLead };
    } catch (error) {
      console.error('Error creating lead:', error);
      toast({
        title: "Failed to Create Lead",
        description: "There was an error creating the lead",
        variant: "destructive"
      });
      return { success: false, error };
    }
  };

  const updateLead = async (leadId: string, updates: Partial<Lead>) => {
    try {
      setLeads(prev => prev.map(lead => 
        lead.id === leadId ? { ...lead, ...updates } : lead
      ));
      
      toast({
        title: "Lead Updated",
        description: "Lead information has been updated"
      });
      
      return { success: true };
    } catch (error) {
      console.error('Error updating lead:', error);
      toast({
        title: "Failed to Update Lead",
        description: "There was an error updating the lead",
        variant: "destructive"
      });
      return { success: false, error };
    }
  };

  const deleteLead = async (leadId: string) => {
    try {
      setLeads(prev => prev.filter(lead => lead.id !== leadId));
      
      toast({
        title: "Lead Deleted",
        description: "Lead has been removed from your pipeline"
      });
      
      return { success: true };
    } catch (error) {
      console.error('Error deleting lead:', error);
      toast({
        title: "Failed to Delete Lead",
        description: "There was an error deleting the lead",
        variant: "destructive"
      });
      return { success: false, error };
    }
  };

  const convertLeadToCustomer = async (leadId: string) => {
    try {
      const lead = leads.find(l => l.id === leadId);
      if (!lead) throw new Error('Lead not found');

      const newCustomer: Customer = {
        id: Date.now().toString(),
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        company: lead.company,
        totalSpent: lead.estimatedValue || 0,
        lifetimeValue: (lead.estimatedValue || 0) * 1.5, // Estimated LTV
        acquisitionDate: new Date().toISOString().split('T')[0],
        status: 'active',
        segment: lead.estimatedValue && lead.estimatedValue > 10000 ? 'enterprise' : 'standard',
        tags: lead.tags
      };

      setCustomers(prev => [...prev, newCustomer]);
      
      // Update lead status to closed_won
      await updateLead(leadId, { status: 'closed_won' });
      
      toast({
        title: "Lead Converted",
        description: `${lead.name} has been converted to a customer`
      });
      
      return { success: true, data: newCustomer };
    } catch (error) {
      console.error('Error converting lead:', error);
      toast({
        title: "Failed to Convert Lead",
        description: "There was an error converting the lead to customer",
        variant: "destructive"
      });
      return { success: false, error };
    }
  };

  const getCRMStats = () => {
    const totalLeads = leads.length;
    const qualifiedLeads = leads.filter(l => l.status === 'qualified' || l.status === 'proposal' || l.status === 'negotiation').length;
    const totalCustomers = customers.length;
    const activeCustomers = customers.filter(c => c.status === 'active').length;
    const totalPipelineValue = leads.reduce((sum, lead) => sum + (lead.estimatedValue || 0), 0);
    const totalCustomerValue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0);
    const conversionRate = totalLeads > 0 ? (leads.filter(l => l.status === 'closed_won').length / totalLeads) * 100 : 0;

    return {
      totalLeads,
      qualifiedLeads,
      totalCustomers,
      activeCustomers,
      totalPipelineValue,
      totalCustomerValue,
      conversionRate: Math.round(conversionRate * 10) / 10
    };
  };

  useEffect(() => {
    if (user) {
      loadLeads();
      loadCustomers();
      loadDeals();
    }
  }, [user]);

  return {
    leads,
    customers,
    deals,
    loading,
    createLead,
    updateLead,
    deleteLead,
    convertLeadToCustomer,
    getCRMStats,
    refetch: () => {
      loadLeads();
      loadCustomers();
      loadDeals();
    }
  };
}