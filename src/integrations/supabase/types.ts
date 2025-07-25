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
      bm_inv_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
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
        }
        Insert: {
          capacity?: number | null
          created_at?: string
          id?: string
          location?: string | null
          manager?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          capacity?: number | null
          created_at?: string
          id?: string
          location?: string | null
          manager?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
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
