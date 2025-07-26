export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      bm_acc_budget_items: {
        Row: {
          account_id: string
          actual_amount: number | null
          budget_id: string
          budgeted_amount: number
          created_at: string
          id: string
          period: string
          period_number: number
          updated_at: string
          variance: number | null
        }
        Insert: {
          account_id: string
          actual_amount?: number | null
          budget_id: string
          budgeted_amount?: number
          created_at?: string
          id?: string
          period: string
          period_number: number
          updated_at?: string
          variance?: number | null
        }
        Update: {
          account_id?: string
          actual_amount?: number | null
          budget_id?: string
          budgeted_amount?: number
          created_at?: string
          id?: string
          period?: string
          period_number?: number
          updated_at?: string
          variance?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bm_acc_budget_items_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "bm_acc_chart_of_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bm_acc_budget_items_budget_id_fkey"
            columns: ["budget_id"]
            isOneToOne: false
            referencedRelation: "bm_acc_budgets"
            referencedColumns: ["id"]
          },
        ]
      }
      bm_acc_budgets: {
        Row: {
          created_at: string
          end_date: string
          fiscal_year: number
          id: string
          name: string
          start_date: string
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          end_date: string
          fiscal_year: number
          id?: string
          name: string
          start_date: string
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          end_date?: string
          fiscal_year?: number
          id?: string
          name?: string
          start_date?: string
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      bm_acc_chart_of_accounts: {
        Row: {
          account_code: string
          account_name: string
          account_type: string
          balance: number | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          parent_account_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          account_code: string
          account_name: string
          account_type: string
          balance?: number | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          parent_account_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          account_code?: string
          account_name?: string
          account_type?: string
          balance?: number | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          parent_account_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bm_acc_chart_of_accounts_parent_account_id_fkey"
            columns: ["parent_account_id"]
            isOneToOne: false
            referencedRelation: "bm_acc_chart_of_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      bm_acc_customers: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          created_at: string
          credit_limit: number | null
          customer_code: string
          email: string | null
          id: string
          is_active: boolean
          name: string
          notes: string | null
          payment_terms: number | null
          phone: string | null
          postal_code: string | null
          state: string | null
          tax_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          credit_limit?: number | null
          customer_code: string
          email?: string | null
          id?: string
          is_active?: boolean
          name: string
          notes?: string | null
          payment_terms?: number | null
          phone?: string | null
          postal_code?: string | null
          state?: string | null
          tax_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          credit_limit?: number | null
          customer_code?: string
          email?: string | null
          id?: string
          is_active?: boolean
          name?: string
          notes?: string | null
          payment_terms?: number | null
          phone?: string | null
          postal_code?: string | null
          state?: string | null
          tax_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      bm_acc_expenses: {
        Row: {
          account_id: string | null
          amount: number
          approved_by: string | null
          approved_date: string | null
          category: string
          created_at: string
          date: string
          description: string
          expense_number: string | null
          id: string
          is_recurring: boolean | null
          is_tax_deductible: boolean | null
          notes: string | null
          paid_date: string | null
          payment_method: string | null
          receipt_url: string | null
          recurrence_pattern: string | null
          reference_number: string | null
          status: string | null
          submitted_by: string | null
          tax_amount: number | null
          total_amount: number
          updated_at: string
          user_id: string
          vendor_id: string | null
          vendor_name: string | null
        }
        Insert: {
          account_id?: string | null
          amount: number
          approved_by?: string | null
          approved_date?: string | null
          category: string
          created_at?: string
          date: string
          description: string
          expense_number?: string | null
          id?: string
          is_recurring?: boolean | null
          is_tax_deductible?: boolean | null
          notes?: string | null
          paid_date?: string | null
          payment_method?: string | null
          receipt_url?: string | null
          recurrence_pattern?: string | null
          reference_number?: string | null
          status?: string | null
          submitted_by?: string | null
          tax_amount?: number | null
          total_amount: number
          updated_at?: string
          user_id: string
          vendor_id?: string | null
          vendor_name?: string | null
        }
        Update: {
          account_id?: string | null
          amount?: number
          approved_by?: string | null
          approved_date?: string | null
          category?: string
          created_at?: string
          date?: string
          description?: string
          expense_number?: string | null
          id?: string
          is_recurring?: boolean | null
          is_tax_deductible?: boolean | null
          notes?: string | null
          paid_date?: string | null
          payment_method?: string | null
          receipt_url?: string | null
          recurrence_pattern?: string | null
          reference_number?: string | null
          status?: string | null
          submitted_by?: string | null
          tax_amount?: number | null
          total_amount?: number
          updated_at?: string
          user_id?: string
          vendor_id?: string | null
          vendor_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bm_acc_expenses_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "bm_acc_chart_of_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bm_acc_expenses_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "bm_acc_vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      bm_acc_invoice_items: {
        Row: {
          account_id: string | null
          created_at: string
          description: string
          discount_percentage: number | null
          id: string
          invoice_id: string
          line_number: number
          line_total: number
          quantity: number
          tax_code: string | null
          unit_price: number
        }
        Insert: {
          account_id?: string | null
          created_at?: string
          description: string
          discount_percentage?: number | null
          id?: string
          invoice_id: string
          line_number: number
          line_total?: number
          quantity?: number
          tax_code?: string | null
          unit_price?: number
        }
        Update: {
          account_id?: string | null
          created_at?: string
          description?: string
          discount_percentage?: number | null
          id?: string
          invoice_id?: string
          line_number?: number
          line_total?: number
          quantity?: number
          tax_code?: string | null
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "bm_acc_invoice_items_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "bm_acc_chart_of_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bm_acc_invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "bm_acc_invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      bm_acc_invoices: {
        Row: {
          balance_due: number | null
          created_at: string
          currency: string | null
          customer_id: string
          discount_amount: number | null
          due_date: string
          id: string
          invoice_number: string
          issue_date: string
          notes: string | null
          paid_amount: number | null
          paid_date: string | null
          payment_instructions: string | null
          sent_date: string | null
          status: string
          subtotal: number
          tax_amount: number | null
          tax_rate: number | null
          terms: string | null
          total: number
          updated_at: string
          user_id: string
        }
        Insert: {
          balance_due?: number | null
          created_at?: string
          currency?: string | null
          customer_id: string
          discount_amount?: number | null
          due_date: string
          id?: string
          invoice_number: string
          issue_date: string
          notes?: string | null
          paid_amount?: number | null
          paid_date?: string | null
          payment_instructions?: string | null
          sent_date?: string | null
          status?: string
          subtotal?: number
          tax_amount?: number | null
          tax_rate?: number | null
          terms?: string | null
          total?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          balance_due?: number | null
          created_at?: string
          currency?: string | null
          customer_id?: string
          discount_amount?: number | null
          due_date?: string
          id?: string
          invoice_number?: string
          issue_date?: string
          notes?: string | null
          paid_amount?: number | null
          paid_date?: string | null
          payment_instructions?: string | null
          sent_date?: string | null
          status?: string
          subtotal?: number
          tax_amount?: number | null
          tax_rate?: number | null
          terms?: string | null
          total?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bm_acc_invoices_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "bm_acc_customers"
            referencedColumns: ["id"]
          },
        ]
      }
      bm_acc_journal_entries: {
        Row: {
          approved_by: string | null
          created_at: string
          created_by: string | null
          date: string
          description: string
          entry_number: string
          id: string
          reference: string | null
          source_id: string | null
          source_type: string | null
          status: string | null
          total_credit: number
          total_debit: number
          updated_at: string
          user_id: string
        }
        Insert: {
          approved_by?: string | null
          created_at?: string
          created_by?: string | null
          date: string
          description: string
          entry_number: string
          id?: string
          reference?: string | null
          source_id?: string | null
          source_type?: string | null
          status?: string | null
          total_credit?: number
          total_debit?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          approved_by?: string | null
          created_at?: string
          created_by?: string | null
          date?: string
          description?: string
          entry_number?: string
          id?: string
          reference?: string | null
          source_id?: string | null
          source_type?: string | null
          status?: string | null
          total_credit?: number
          total_debit?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      bm_acc_journal_entry_lines: {
        Row: {
          account_id: string
          created_at: string
          credit_amount: number | null
          debit_amount: number | null
          description: string | null
          id: string
          journal_entry_id: string
          line_number: number
        }
        Insert: {
          account_id: string
          created_at?: string
          credit_amount?: number | null
          debit_amount?: number | null
          description?: string | null
          id?: string
          journal_entry_id: string
          line_number: number
        }
        Update: {
          account_id?: string
          created_at?: string
          credit_amount?: number | null
          debit_amount?: number | null
          description?: string | null
          id?: string
          journal_entry_id?: string
          line_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "bm_acc_journal_entry_lines_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "bm_acc_chart_of_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bm_acc_journal_entry_lines_journal_entry_id_fkey"
            columns: ["journal_entry_id"]
            isOneToOne: false
            referencedRelation: "bm_acc_journal_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      bm_acc_payments: {
        Row: {
          account_id: string
          amount: number
          created_at: string
          customer_id: string | null
          date: string
          description: string | null
          expense_id: string | null
          id: string
          invoice_id: string | null
          notes: string | null
          payment_method: string
          payment_number: string
          reference_number: string | null
          status: string | null
          updated_at: string
          user_id: string
          vendor_id: string | null
        }
        Insert: {
          account_id: string
          amount: number
          created_at?: string
          customer_id?: string | null
          date: string
          description?: string | null
          expense_id?: string | null
          id?: string
          invoice_id?: string | null
          notes?: string | null
          payment_method: string
          payment_number: string
          reference_number?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
          vendor_id?: string | null
        }
        Update: {
          account_id?: string
          amount?: number
          created_at?: string
          customer_id?: string | null
          date?: string
          description?: string | null
          expense_id?: string | null
          id?: string
          invoice_id?: string | null
          notes?: string | null
          payment_method?: string
          payment_number?: string
          reference_number?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bm_acc_payments_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "bm_acc_chart_of_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bm_acc_payments_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "bm_acc_customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bm_acc_payments_expense_id_fkey"
            columns: ["expense_id"]
            isOneToOne: false
            referencedRelation: "bm_acc_expenses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bm_acc_payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "bm_acc_invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bm_acc_payments_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "bm_acc_vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      bm_acc_tax_rates: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          rate: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          rate: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          rate?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      bm_acc_vendors: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          created_at: string
          email: string | null
          id: string
          is_active: boolean
          name: string
          notes: string | null
          payment_terms: number | null
          phone: string | null
          postal_code: string | null
          state: string | null
          tax_id: string | null
          updated_at: string
          user_id: string
          vendor_code: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean
          name: string
          notes?: string | null
          payment_terms?: number | null
          phone?: string | null
          postal_code?: string | null
          state?: string | null
          tax_id?: string | null
          updated_at?: string
          user_id: string
          vendor_code: string
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean
          name?: string
          notes?: string | null
          payment_terms?: number | null
          phone?: string | null
          postal_code?: string | null
          state?: string | null
          tax_id?: string | null
          updated_at?: string
          user_id?: string
          vendor_code?: string
        }
        Relationships: []
      }
      bm_inv_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      bm_inv_products: {
        Row: {
          barcode: string | null
          category_id: string | null
          cost_price: number | null
          created_at: string
          description: string | null
          dimensions: string | null
          id: string
          name: string
          sku: string
          supplier_id: string | null
          unit_price: number | null
          updated_at: string
          user_id: string | null
          weight: number | null
        }
        Insert: {
          barcode?: string | null
          category_id?: string | null
          cost_price?: number | null
          created_at?: string
          description?: string | null
          dimensions?: string | null
          id?: string
          name: string
          sku: string
          supplier_id?: string | null
          unit_price?: number | null
          updated_at?: string
          user_id?: string | null
          weight?: number | null
        }
        Update: {
          barcode?: string | null
          category_id?: string | null
          cost_price?: number | null
          created_at?: string
          description?: string | null
          dimensions?: string | null
          id?: string
          name?: string
          sku?: string
          supplier_id?: string | null
          unit_price?: number | null
          updated_at?: string
          user_id?: string | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bm_inv_products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "bm_inv_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bm_inv_products_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "bm_inv_suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      bm_inv_purchase_order_items: {
        Row: {
          created_at: string
          id: string
          order_id: string
          product_id: string
          quantity: number
          received_quantity: number | null
          total_cost: number | null
          unit_cost: number
        }
        Insert: {
          created_at?: string
          id?: string
          order_id: string
          product_id: string
          quantity: number
          received_quantity?: number | null
          total_cost?: number | null
          unit_cost: number
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          received_quantity?: number | null
          total_cost?: number | null
          unit_cost?: number
        }
        Relationships: [
          {
            foreignKeyName: "bm_inv_purchase_order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "bm_inv_purchase_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bm_inv_purchase_order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "bm_inv_products"
            referencedColumns: ["id"]
          },
        ]
      }
      bm_inv_purchase_orders: {
        Row: {
          created_at: string
          expected_date: string | null
          id: string
          notes: string | null
          order_date: string | null
          order_number: string
          status: string | null
          supplier_id: string
          total_amount: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          expected_date?: string | null
          id?: string
          notes?: string | null
          order_date?: string | null
          order_number: string
          status?: string | null
          supplier_id: string
          total_amount?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          expected_date?: string | null
          id?: string
          notes?: string | null
          order_date?: string | null
          order_number?: string
          status?: string | null
          supplier_id?: string
          total_amount?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bm_inv_purchase_orders_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "bm_inv_suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      bm_inv_stock: {
        Row: {
          created_at: string
          id: string
          max_stock: number | null
          min_stock: number | null
          product_id: string
          quantity: number
          reorder_point: number | null
          updated_at: string
          warehouse_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          max_stock?: number | null
          min_stock?: number | null
          product_id: string
          quantity?: number
          reorder_point?: number | null
          updated_at?: string
          warehouse_id: string
        }
        Update: {
          created_at?: string
          id?: string
          max_stock?: number | null
          min_stock?: number | null
          product_id?: string
          quantity?: number
          reorder_point?: number | null
          updated_at?: string
          warehouse_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bm_inv_stock_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "bm_inv_products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bm_inv_stock_warehouse_id_fkey"
            columns: ["warehouse_id"]
            isOneToOne: false
            referencedRelation: "bm_inv_warehouses"
            referencedColumns: ["id"]
          },
        ]
      }
      bm_inv_suppliers: {
        Row: {
          address: string | null
          contact_person: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          phone: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          address?: string | null
          contact_person?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          address?: string | null
          contact_person?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      bm_inv_transactions: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          product_id: string
          quantity: number
          reference_number: string | null
          transaction_type: string
          unit_cost: number | null
          user_id: string | null
          warehouse_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          product_id: string
          quantity: number
          reference_number?: string | null
          transaction_type: string
          unit_cost?: number | null
          user_id?: string | null
          warehouse_id: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          product_id?: string
          quantity?: number
          reference_number?: string | null
          transaction_type?: string
          unit_cost?: number | null
          user_id?: string | null
          warehouse_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bm_inv_transactions_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "bm_inv_products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bm_inv_transactions_warehouse_id_fkey"
            columns: ["warehouse_id"]
            isOneToOne: false
            referencedRelation: "bm_inv_warehouses"
            referencedColumns: ["id"]
          },
        ]
      }
      bm_inv_warehouses: {
        Row: {
          capacity: number | null
          created_at: string
          id: string
          location: string | null
          manager: string | null
          name: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          capacity?: number | null
          created_at?: string
          id?: string
          location?: string | null
          manager?: string | null
          name: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          capacity?: number | null
          created_at?: string
          id?: string
          location?: string | null
          manager?: string | null
          name?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      bm_payroll_benefits: {
        Row: {
          benefit_name: string
          benefit_type: string
          coverage_end_date: string | null
          coverage_start_date: string | null
          created_at: string
          employee_contribution: number | null
          employee_id: string
          employer_contribution: number | null
          id: string
          is_active: boolean | null
          provider: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          benefit_name: string
          benefit_type: string
          coverage_end_date?: string | null
          coverage_start_date?: string | null
          created_at?: string
          employee_contribution?: number | null
          employee_id: string
          employer_contribution?: number | null
          id?: string
          is_active?: boolean | null
          provider?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          benefit_name?: string
          benefit_type?: string
          coverage_end_date?: string | null
          coverage_start_date?: string | null
          created_at?: string
          employee_contribution?: number | null
          employee_id?: string
          employer_contribution?: number | null
          id?: string
          is_active?: boolean | null
          provider?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      bm_payroll_deductions: {
        Row: {
          amount: number
          created_at: string
          deduction_name: string
          deduction_type: string
          effective_date: string | null
          employee_id: string
          end_date: string | null
          id: string
          is_active: boolean | null
          is_percentage: boolean | null
          is_pre_tax: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount?: number
          created_at?: string
          deduction_name: string
          deduction_type: string
          effective_date?: string | null
          employee_id: string
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          is_percentage?: boolean | null
          is_pre_tax?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          deduction_name?: string
          deduction_type?: string
          effective_date?: string | null
          employee_id?: string
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          is_percentage?: boolean | null
          is_pre_tax?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      bm_payroll_departments: {
        Row: {
          budget_allocated: number | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          manager: string | null
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          budget_allocated?: number | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          manager?: string | null
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          budget_allocated?: number | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          manager?: string | null
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      bm_payroll_employees: {
        Row: {
          account_number: string | null
          allowances: number | null
          bank_name: string | null
          base_salary: number
          city: string | null
          created_at: string
          department: string
          email: string | null
          employee_id: string
          employment_type: string
          filing_status: string | null
          first_name: string
          hire_date: string
          id: string
          last_name: string
          phone: string | null
          position: string
          routing_number: string | null
          salary_type: string
          ssn: string | null
          state: string | null
          status: string
          street_address: string | null
          updated_at: string
          user_id: string
          zip_code: string | null
        }
        Insert: {
          account_number?: string | null
          allowances?: number | null
          bank_name?: string | null
          base_salary?: number
          city?: string | null
          created_at?: string
          department: string
          email?: string | null
          employee_id: string
          employment_type?: string
          filing_status?: string | null
          first_name: string
          hire_date: string
          id?: string
          last_name: string
          phone?: string | null
          position: string
          routing_number?: string | null
          salary_type?: string
          ssn?: string | null
          state?: string | null
          status?: string
          street_address?: string | null
          updated_at?: string
          user_id: string
          zip_code?: string | null
        }
        Update: {
          account_number?: string | null
          allowances?: number | null
          bank_name?: string | null
          base_salary?: number
          city?: string | null
          created_at?: string
          department?: string
          email?: string | null
          employee_id?: string
          employment_type?: string
          filing_status?: string | null
          first_name?: string
          hire_date?: string
          id?: string
          last_name?: string
          phone?: string | null
          position?: string
          routing_number?: string | null
          salary_type?: string
          ssn?: string | null
          state?: string | null
          status?: string
          street_address?: string | null
          updated_at?: string
          user_id?: string
          zip_code?: string | null
        }
        Relationships: []
      }
      bm_payroll_records: {
        Row: {
          created_at: string
          deductions: number
          employee_id: string
          gross_pay: number
          hours_worked: number | null
          id: string
          net_pay: number
          overtime_hours: number | null
          pay_date: string
          pay_period_end: string
          pay_period_start: string
          payroll_type: string
          record_id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          deductions?: number
          employee_id: string
          gross_pay?: number
          hours_worked?: number | null
          id?: string
          net_pay?: number
          overtime_hours?: number | null
          pay_date: string
          pay_period_end: string
          pay_period_start: string
          payroll_type?: string
          record_id: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          deductions?: number
          employee_id?: string
          gross_pay?: number
          hours_worked?: number | null
          id?: string
          net_pay?: number
          overtime_hours?: number | null
          pay_date?: string
          pay_period_end?: string
          pay_period_start?: string
          payroll_type?: string
          record_id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      bm_payroll_runs: {
        Row: {
          created_at: string
          employee_count: number | null
          id: string
          pay_date: string
          pay_period_end: string
          pay_period_start: string
          processed_at: string | null
          processed_by: string | null
          run_number: string
          status: string | null
          total_deductions: number | null
          total_gross_pay: number | null
          total_net_pay: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          employee_count?: number | null
          id?: string
          pay_date: string
          pay_period_end: string
          pay_period_start: string
          processed_at?: string | null
          processed_by?: string | null
          run_number: string
          status?: string | null
          total_deductions?: number | null
          total_gross_pay?: number | null
          total_net_pay?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          employee_count?: number | null
          id?: string
          pay_date?: string
          pay_period_end?: string
          pay_period_start?: string
          processed_at?: string | null
          processed_by?: string | null
          run_number?: string
          status?: string | null
          total_deductions?: number | null
          total_gross_pay?: number | null
          total_net_pay?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      bm_payroll_time_entries: {
        Row: {
          break_duration: number | null
          clock_in: string | null
          clock_out: string | null
          created_at: string
          date: string
          employee_id: string
          id: string
          notes: string | null
          overtime_hours: number | null
          status: string | null
          total_hours: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          break_duration?: number | null
          clock_in?: string | null
          clock_out?: string | null
          created_at?: string
          date: string
          employee_id: string
          id?: string
          notes?: string | null
          overtime_hours?: number | null
          status?: string | null
          total_hours?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          break_duration?: number | null
          clock_in?: string | null
          clock_out?: string | null
          created_at?: string
          date?: string
          employee_id?: string
          id?: string
          notes?: string | null
          overtime_hours?: number | null
          status?: string | null
          total_hours?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      bm_pos_categories: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      bm_pos_customers: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          created_at: string
          customer_code: string
          date_of_birth: string | null
          email: string | null
          id: string
          is_active: boolean | null
          last_visit: string | null
          loyalty_points: number | null
          name: string
          notes: string | null
          phone: string | null
          postal_code: string | null
          state: string | null
          total_spent: number | null
          updated_at: string
          user_id: string
          visit_count: number | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          customer_code: string
          date_of_birth?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          last_visit?: string | null
          loyalty_points?: number | null
          name: string
          notes?: string | null
          phone?: string | null
          postal_code?: string | null
          state?: string | null
          total_spent?: number | null
          updated_at?: string
          user_id: string
          visit_count?: number | null
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          customer_code?: string
          date_of_birth?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          last_visit?: string | null
          loyalty_points?: number | null
          name?: string
          notes?: string | null
          phone?: string | null
          postal_code?: string | null
          state?: string | null
          total_spent?: number | null
          updated_at?: string
          user_id?: string
          visit_count?: number | null
        }
        Relationships: []
      }
      bm_pos_discounts: {
        Row: {
          applicable_categories: Json | null
          applicable_products: Json | null
          created_at: string
          current_uses: number | null
          description: string | null
          discount_type: string
          discount_value: number
          end_date: string | null
          id: string
          is_active: boolean | null
          max_uses: number | null
          maximum_discount: number | null
          minimum_purchase: number | null
          name: string
          start_date: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          applicable_categories?: Json | null
          applicable_products?: Json | null
          created_at?: string
          current_uses?: number | null
          description?: string | null
          discount_type: string
          discount_value?: number
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          maximum_discount?: number | null
          minimum_purchase?: number | null
          name: string
          start_date?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          applicable_categories?: Json | null
          applicable_products?: Json | null
          created_at?: string
          current_uses?: number | null
          description?: string | null
          discount_type?: string
          discount_value?: number
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          maximum_discount?: number | null
          minimum_purchase?: number | null
          name?: string
          start_date?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      bm_pos_loyalty_programs: {
        Row: {
          created_at: string
          description: string | null
          dollar_per_point: number | null
          end_date: string | null
          expiry_months: number | null
          id: string
          is_active: boolean | null
          minimum_points_to_redeem: number | null
          name: string
          points_per_dollar: number | null
          start_date: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          dollar_per_point?: number | null
          end_date?: string | null
          expiry_months?: number | null
          id?: string
          is_active?: boolean | null
          minimum_points_to_redeem?: number | null
          name: string
          points_per_dollar?: number | null
          start_date?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          dollar_per_point?: number | null
          end_date?: string | null
          expiry_months?: number | null
          id?: string
          is_active?: boolean | null
          minimum_points_to_redeem?: number | null
          name?: string
          points_per_dollar?: number | null
          start_date?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      bm_pos_products: {
        Row: {
          barcode: string | null
          category: string
          cost_price: number | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          price: number
          product_code: string
          stock_quantity: number
          tax_rate: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          barcode?: string | null
          category: string
          cost_price?: number | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          price?: number
          product_code: string
          stock_quantity?: number
          tax_rate?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          barcode?: string | null
          category?: string
          cost_price?: number | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          price?: number
          product_code?: string
          stock_quantity?: number
          tax_rate?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      bm_pos_shifts: {
        Row: {
          cash_difference: number | null
          cashier_id: string
          closing_cash: number | null
          created_at: string
          end_time: string | null
          expected_cash: number | null
          id: string
          notes: string | null
          opening_cash: number | null
          shift_number: string
          start_time: string
          status: string | null
          total_sales: number | null
          transaction_count: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          cash_difference?: number | null
          cashier_id: string
          closing_cash?: number | null
          created_at?: string
          end_time?: string | null
          expected_cash?: number | null
          id?: string
          notes?: string | null
          opening_cash?: number | null
          shift_number: string
          start_time?: string
          status?: string | null
          total_sales?: number | null
          transaction_count?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          cash_difference?: number | null
          cashier_id?: string
          closing_cash?: number | null
          created_at?: string
          end_time?: string | null
          expected_cash?: number | null
          id?: string
          notes?: string | null
          opening_cash?: number | null
          shift_number?: string
          start_time?: string
          status?: string | null
          total_sales?: number | null
          transaction_count?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      bm_pos_transaction_items: {
        Row: {
          created_at: string
          discount_amount: number | null
          id: string
          line_total: number
          product_id: string
          quantity: number
          tax_amount: number | null
          transaction_id: string
          unit_price: number
        }
        Insert: {
          created_at?: string
          discount_amount?: number | null
          id?: string
          line_total?: number
          product_id: string
          quantity?: number
          tax_amount?: number | null
          transaction_id: string
          unit_price?: number
        }
        Update: {
          created_at?: string
          discount_amount?: number | null
          id?: string
          line_total?: number
          product_id?: string
          quantity?: number
          tax_amount?: number | null
          transaction_id?: string
          unit_price?: number
        }
        Relationships: []
      }
      bm_pos_transactions: {
        Row: {
          cash_received: number | null
          cashier_id: string | null
          change_given: number | null
          created_at: string
          customer_id: string | null
          discount_amount: number | null
          id: string
          notes: string | null
          payment_method: string
          payment_status: string | null
          receipt_number: string | null
          subtotal: number
          tax_amount: number
          total_amount: number
          transaction_number: string
          updated_at: string
          user_id: string
        }
        Insert: {
          cash_received?: number | null
          cashier_id?: string | null
          change_given?: number | null
          created_at?: string
          customer_id?: string | null
          discount_amount?: number | null
          id?: string
          notes?: string | null
          payment_method: string
          payment_status?: string | null
          receipt_number?: string | null
          subtotal?: number
          tax_amount?: number
          total_amount?: number
          transaction_number: string
          updated_at?: string
          user_id: string
        }
        Update: {
          cash_received?: number | null
          cashier_id?: string | null
          change_given?: number | null
          created_at?: string
          customer_id?: string | null
          discount_amount?: number | null
          id?: string
          notes?: string | null
          payment_method?: string
          payment_status?: string | null
          receipt_number?: string | null
          subtotal?: number
          tax_amount?: number
          total_amount?: number
          transaction_number?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      pm_inv_categories: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      pm_inv_items: {
        Row: {
          brand: string | null
          category_id: string | null
          condition: string | null
          created_at: string
          current_value: number | null
          depreciation_rate: number | null
          description: string | null
          id: string
          image_url: string | null
          insurance_policy: string | null
          is_active: boolean | null
          is_insured: boolean | null
          location: string | null
          model: string | null
          name: string
          notes: string | null
          purchase_date: string | null
          purchase_price: number | null
          replacement_cost: number | null
          room: string | null
          serial_number: string | null
          tags: string[] | null
          updated_at: string
          user_id: string
          warranty_expiry: string | null
        }
        Insert: {
          brand?: string | null
          category_id?: string | null
          condition?: string | null
          created_at?: string
          current_value?: number | null
          depreciation_rate?: number | null
          description?: string | null
          id?: string
          image_url?: string | null
          insurance_policy?: string | null
          is_active?: boolean | null
          is_insured?: boolean | null
          location?: string | null
          model?: string | null
          name: string
          notes?: string | null
          purchase_date?: string | null
          purchase_price?: number | null
          replacement_cost?: number | null
          room?: string | null
          serial_number?: string | null
          tags?: string[] | null
          updated_at?: string
          user_id: string
          warranty_expiry?: string | null
        }
        Update: {
          brand?: string | null
          category_id?: string | null
          condition?: string | null
          created_at?: string
          current_value?: number | null
          depreciation_rate?: number | null
          description?: string | null
          id?: string
          image_url?: string | null
          insurance_policy?: string | null
          is_active?: boolean | null
          is_insured?: boolean | null
          location?: string | null
          model?: string | null
          name?: string
          notes?: string | null
          purchase_date?: string | null
          purchase_price?: number | null
          replacement_cost?: number | null
          room?: string | null
          serial_number?: string | null
          tags?: string[] | null
          updated_at?: string
          user_id?: string
          warranty_expiry?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pm_inv_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "pm_inv_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      pm_inv_locations: {
        Row: {
          created_at: string
          description: string | null
          floor_level: number | null
          id: string
          is_active: boolean | null
          name: string
          room_type: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          floor_level?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          room_type?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          floor_level?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          room_type?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      pm_inv_maintenance: {
        Row: {
          cost: number | null
          created_at: string
          date: string
          description: string
          id: string
          item_id: string
          maintenance_type: string
          next_maintenance_date: string | null
          notes: string | null
          service_provider: string | null
          updated_at: string
          user_id: string
          warranty_impact: string | null
        }
        Insert: {
          cost?: number | null
          created_at?: string
          date: string
          description: string
          id?: string
          item_id: string
          maintenance_type: string
          next_maintenance_date?: string | null
          notes?: string | null
          service_provider?: string | null
          updated_at?: string
          user_id: string
          warranty_impact?: string | null
        }
        Update: {
          cost?: number | null
          created_at?: string
          date?: string
          description?: string
          id?: string
          item_id?: string
          maintenance_type?: string
          next_maintenance_date?: string | null
          notes?: string | null
          service_provider?: string | null
          updated_at?: string
          user_id?: string
          warranty_impact?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pm_inv_maintenance_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "pm_inv_items"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company_name: string | null
          created_at: string | null
          department: string | null
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
