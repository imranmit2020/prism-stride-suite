import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface PayrollEmployee {
  id: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  position: string;
  department: string;
  hire_date: string;
  employment_type: 'full-time' | 'part-time' | 'contract';
  salary_type: 'hourly' | 'monthly' | 'yearly';
  base_salary: number;
  status: 'active' | 'inactive' | 'terminated';
  street_address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  ssn?: string;
  filing_status?: string;
  allowances?: number;
  account_number?: string;
  routing_number?: string;
  bank_name?: string;
  created_at: string;
  updated_at: string;
}

export interface PayrollRecord {
  id: string;
  record_id: string;
  employee_id: string;
  pay_period_start: string;
  pay_period_end: string;
  pay_date: string;
  gross_pay: number;
  deductions: number;
  net_pay: number;
  hours_worked?: number;
  overtime_hours?: number;
  status: 'paid' | 'pending' | 'cancelled';
  payroll_type: 'regular' | 'bonus' | 'overtime';
  created_at: string;
  updated_at: string;
}

export interface PayrollDepartment {
  id: string;
  name: string;
  description?: string;
  manager?: string;
  budget_allocated?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export function usePayroll() {
  const [employees, setEmployees] = useState<PayrollEmployee[]>([]);
  const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>([]);
  const [departments, setDepartments] = useState<PayrollDepartment[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch all employees
  const fetchEmployees = async () => {
    try {
      const { data, error } = await supabase
        .from('bm_payroll_employees')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEmployees((data || []) as PayrollEmployee[]);
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast({
        title: "Error",
        description: "Failed to fetch employees",
        variant: "destructive"
      });
    }
  };

  // Fetch all payroll records
  const fetchPayrollRecords = async () => {
    try {
      const { data, error } = await supabase
        .from('bm_payroll_records')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPayrollRecords((data || []) as PayrollRecord[]);
    } catch (error) {
      console.error('Error fetching payroll records:', error);
      toast({
        title: "Error",
        description: "Failed to fetch payroll records",
        variant: "destructive"
      });
    }
  };

  // Fetch all departments
  const fetchDepartments = async () => {
    try {
      const { data, error } = await supabase
        .from('bm_payroll_departments')
        .select('*')
        .order('name');

      if (error) throw error;
      setDepartments(data || []);
    } catch (error) {
      console.error('Error fetching departments:', error);
      toast({
        title: "Error",
        description: "Failed to fetch departments",
        variant: "destructive"
      });
    }
  };

  // Create a new employee
  const createEmployee = async (employee: Omit<PayrollEmployee, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('bm_payroll_employees')
        .insert([{ ...employee, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      setEmployees(prev => [data as PayrollEmployee, ...prev]);
      toast({
        title: "Success",
        description: "Employee created successfully"
      });
      return data;
    } catch (error) {
      console.error('Error creating employee:', error);
      toast({
        title: "Error",
        description: "Failed to create employee",
        variant: "destructive"
      });
      throw error;
    }
  };

  // Update an employee
  const updateEmployee = async (id: string, updates: Partial<PayrollEmployee>) => {
    try {
      const { data, error } = await supabase
        .from('bm_payroll_employees')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setEmployees(prev => prev.map(emp => emp.id === id ? data as PayrollEmployee : emp));
      toast({
        title: "Success",
        description: "Employee updated successfully"
      });
      return data;
    } catch (error) {
      console.error('Error updating employee:', error);
      toast({
        title: "Error",
        description: "Failed to update employee",
        variant: "destructive"
      });
      throw error;
    }
  };

  // Delete an employee
  const deleteEmployee = async (id: string) => {
    try {
      const { error } = await supabase
        .from('bm_payroll_employees')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setEmployees(prev => prev.filter(emp => emp.id !== id));
      toast({
        title: "Success",
        description: "Employee deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting employee:', error);
      toast({
        title: "Error",
        description: "Failed to delete employee",
        variant: "destructive"
      });
      throw error;
    }
  };

  // Create a payroll record
  const createPayrollRecord = async (record: Omit<PayrollRecord, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('bm_payroll_records')
        .insert([{ ...record, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      setPayrollRecords(prev => [data as PayrollRecord, ...prev]);
      toast({
        title: "Success",
        description: "Payroll record created successfully"
      });
      return data;
    } catch (error) {
      console.error('Error creating payroll record:', error);
      toast({
        title: "Error",
        description: "Failed to create payroll record",
        variant: "destructive"
      });
      throw error;
    }
  };

  // Create a department
  const createDepartment = async (department: Omit<PayrollDepartment, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('bm_payroll_departments')
        .insert([{ ...department, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      setDepartments(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Department created successfully"
      });
      return data;
    } catch (error) {
      console.error('Error creating department:', error);
      toast({
        title: "Error",
        description: "Failed to create department",
        variant: "destructive"
      });
      throw error;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchEmployees(),
        fetchPayrollRecords(),
        fetchDepartments()
      ]);
      setLoading(false);
    };

    loadData();
  }, []);

  return {
    employees,
    payrollRecords,
    departments,
    loading,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    createPayrollRecord,
    createDepartment,
    refetch: async () => {
      await Promise.all([
        fetchEmployees(),
        fetchPayrollRecords(),
        fetchDepartments()
      ]);
    }
  };
}