import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Invoice {
  id?: string;
  user_id?: string;
  invoice_number: string;
  customer_id?: string;
  issue_date: string;
  due_date: string;
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  currency: string;
  notes?: string;
  payment_instructions?: string;
  terms?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Customer {
  id?: string;
  user_id?: string;
  customer_code: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  tax_id?: string;
  notes?: string;
  is_active: boolean;
  credit_limit?: number;
  payment_terms?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Vendor {
  id?: string;
  user_id?: string;
  vendor_code: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  tax_id?: string;
  notes?: string;
  is_active: boolean;
  payment_terms?: number;
  created_at?: string;
  updated_at?: string;
}

export function useAccounting() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const saveInvoice = async (invoiceData: any) => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("User not authenticated");
      }

      // First, check if vendor exists or create one
      let vendorId = null;
      if (invoiceData.vendor?.name) {
        const { data: existingVendor } = await supabase
          .from('bm_acc_vendors')
          .select('id')
          .eq('user_id', user.id)
          .eq('name', invoiceData.vendor.name)
          .single();

        if (existingVendor) {
          vendorId = existingVendor.id;
        } else {
          // Create new vendor
          const { data: newVendor, error: vendorError } = await supabase
            .from('bm_acc_vendors')
            .insert([{
              user_id: user.id,
              vendor_code: `V-${Date.now()}`,
              name: invoiceData.vendor.name,
              email: invoiceData.vendor.email,
              phone: invoiceData.vendor.phone,
              address: invoiceData.vendor.address,
              tax_id: invoiceData.vendor.taxId,
              is_active: true,
              payment_terms: 30
            }])
            .select('id')
            .single();

          if (vendorError) throw vendorError;
          vendorId = newVendor.id;
        }
      }

      // Check if customer exists or create one
      let customerId = null;
      if (invoiceData.customer?.name) {
        const { data: existingCustomer } = await supabase
          .from('bm_acc_customers')
          .select('id')
          .eq('user_id', user.id)
          .eq('name', invoiceData.customer.name)
          .single();

        if (existingCustomer) {
          customerId = existingCustomer.id;
        } else {
          // Create new customer
          const { data: newCustomer, error: customerError } = await supabase
            .from('bm_acc_customers')
            .insert([{
              user_id: user.id,
              customer_code: `C-${Date.now()}`,
              name: invoiceData.customer.name,
              email: invoiceData.customer.email,
              address: invoiceData.customer.address,
              is_active: true,
              credit_limit: 0,
              payment_terms: 30
            }])
            .select('id')
            .single();

          if (customerError) throw customerError;
          customerId = newCustomer.id;
        }
      }

      // Create invoice
      const { data: invoice, error: invoiceError } = await supabase
        .from('bm_acc_invoices')
        .insert([{
          user_id: user.id,
          invoice_number: invoiceData.invoiceNumber,
          customer_id: customerId,
          issue_date: invoiceData.details.issueDate,
          due_date: invoiceData.details.dueDate,
          subtotal: invoiceData.details.subtotal,
          tax_rate: invoiceData.details.taxRate,
          tax_amount: invoiceData.details.taxAmount,
          total: invoiceData.details.totalAmount,
          status: invoiceData.status,
          currency: invoiceData.details.currency,
          notes: invoiceData.details.notes,
          terms: invoiceData.paymentTerms
        }])
        .select('id')
        .single();

      if (invoiceError) throw invoiceError;

      // Create invoice line items
      if (invoiceData.lineItems && invoiceData.lineItems.length > 0) {
        const lineItems = invoiceData.lineItems.map((item: any, index: number) => ({
          invoice_id: invoice.id,
          line_number: index + 1,
          description: item.description,
          quantity: item.quantity,
          unit_price: item.unitPrice,
          line_total: item.amount,
          discount_percentage: 0
        }));

        const { error: lineItemsError } = await supabase
          .from('bm_acc_invoice_items')
          .insert(lineItems);

        if (lineItemsError) throw lineItemsError;
      }

      toast({
        title: "Invoice Saved",
        description: `Invoice ${invoiceData.invoiceNumber} has been saved successfully`
      });

      return { success: true, invoice };
    } catch (error: any) {
      console.error('Error saving invoice:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save invoice",
        variant: "destructive"
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  return {
    saveInvoice,
    loading
  };
}