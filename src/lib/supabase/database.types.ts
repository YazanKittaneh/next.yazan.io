
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      business_formations: {
        Row: {
          created_at: string | null
          entity_address: string
          entity_name: string
          entity_type: Database["public"]["Enums"]["entity_type"]
          expedite: Database["public"]["Enums"]["expedite_option"]
          id: string
          owners: Json
          service_product_offered: string
          signatures: Json | null
          status: Database["public"]["Enums"]["business_status"] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          entity_address: string
          entity_name: string
          entity_type: Database["public"]["Enums"]["entity_type"]
          expedite: Database["public"]["Enums"]["expedite_option"]
          id?: string
          owners: Json
          service_product_offered: string
          signatures?: Json | null
          status?: Database["public"]["Enums"]["business_status"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          entity_address?: string
          entity_name?: string
          entity_type?: Database["public"]["Enums"]["entity_type"]
          expedite?: Database["public"]["Enums"]["expedite_option"]
          id?: string
          owners?: Json
          service_product_offered?: string
          signatures?: Json | null
          status?: Database["public"]["Enums"]["business_status"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          subject: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          subject: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          subject?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          full_name: string | null
          id: number
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          full_name?: string | null
          id?: never
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          full_name?: string | null
          id?: never
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          created_at: string | null
          current_period_end: string | null
          id: string
          price_id: string | null
          status: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: string | null
          id?: string
          price_id?: string | null
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: string | null
          id?: string
          price_id?: string | null
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          created_at: string
          has_completed_onboarding: boolean | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          has_completed_onboarding?: boolean | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          has_completed_onboarding?: boolean | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_trials: {
        Row: {
          id: string
          is_trial_used: boolean | null
          trial_end_time: string
          trial_start_time: string | null
          user_id: string
        }
        Insert: {
          id?: string
          is_trial_used?: boolean | null
          trial_end_time: string
          trial_start_time?: string | null
          user_id: string
        }
        Update: {
          id?: string
          is_trial_used?: boolean | null
          trial_end_time?: string
          trial_start_time?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_trials_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          invited_by: string | null
          is_admin: boolean
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          invited_by?: string | null
          is_admin?: boolean
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          invited_by?: string | null
          is_admin?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      yk_education: {
        Row: {
          created_at: string | null
          degree: string
          graduation_date: string
          id: number
          institution: string
          location: string
        }
        Insert: {
          created_at?: string | null
          degree: string
          graduation_date: string
          id?: number
          institution: string
          location: string
        }
        Update: {
          created_at?: string | null
          degree?: string
          graduation_date?: string
          id?: number
          institution?: string
          location?: string
        }
        Relationships: []
      }
      yk_experiences: {
        Row: {
          achievements: string[]
          company: string
          company_url: string | null
          created_at: string | null
          id: number
          location: string
          period: string
          title: string
        }
        Insert: {
          achievements: string[]
          company: string
          company_url?: string | null
          created_at?: string | null
          id?: number
          location: string
          period: string
          title: string
        }
        Update: {
          achievements?: string[]
          company?: string
          company_url?: string | null
          created_at?: string | null
          id?: number
          location?: string
          period?: string
          title?: string
        }
        Relationships: []
      }
      yk_projects: {
        Row: {
          approach: string
          category: string[]
          challenge: string
          created_at: string | null
          description: string
          id: number
          images: string[]
          result: string
          technologies: Database["public"]["Enums"]["yk_technologies"][] | null
          title: string
          url: string | null
          year: string
        }
        Insert: {
          approach: string
          category: string[]
          challenge: string
          created_at?: string | null
          description: string
          id?: number
          images: string[]
          result: string
          technologies?: Database["public"]["Enums"]["yk_technologies"][] | null
          title: string
          url?: string | null
          year: string
        }
        Update: {
          approach?: string
          category?: string[]
          challenge?: string
          created_at?: string | null
          description?: string
          id?: number
          images?: string[]
          result?: string
          technologies?: Database["public"]["Enums"]["yk_technologies"][] | null
          title?: string
          url?: string | null
          year?: string
        }
        Relationships: []
      }
      yk_resume: {
        Row: {
          contact: Json
          created_at: string | null
          id: number
          location: string | null
          name: string
        }
        Insert: {
          contact: Json
          created_at?: string | null
          id?: number
          location?: string | null
          name: string
        }
        Update: {
          contact?: Json
          created_at?: string | null
          id?: number
          location?: string | null
          name?: string
        }
        Relationships: []
      }
      yk_technology_categories: {
        Row: {
          category: string
          created_at: string | null
          id: number
          skills: string[]
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: number
          skills: string[]
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: number
          skills?: string[]
        }
        Relationships: []
      }
    }
    Views: {
      user_profiles: {
        Row: {
          email: string | null
          id: string | null
          is_admin: boolean | null
          roles: Database["public"]["Enums"]["app_role"][] | null
          user_created_at: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      business_status: "pending" | "processing" | "completed" | "rejected"
      entity_type: "LLC" | "S-CORP" | "C-CORP"
      expedite_option: "YES" | "NO"
      SubscriptionStatus:
        | "TRIALING"
        | "ACTIVE"
        | "PAUSED"
        | "CANCELED"
        | "PAST_DUE"
        | "UNPAID"
        | "INCOMPLETE"
        | "EXPIRED"
      TeamMemberRole: "MEMBER" | "OWNER"
      UserOneTimePasswordType: "SIGNUP" | "LOGIN" | "PASSWORD_RESET"
      UserRole: "USER" | "ADMIN"
      yk_technologies:
        | "React"
        | "Next.js"
        | "Nest.js"
        | "Node.js"
        | "REST"
        | "GraphQL"
        | "RabbitMQ"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      app_role: ["admin", "user"],
      business_status: ["pending", "processing", "completed", "rejected"],
      entity_type: ["LLC", "S-CORP", "C-CORP"],
      expedite_option: ["YES", "NO"],
      SubscriptionStatus: [
        "TRIALING",
        "ACTIVE",
        "PAUSED",
        "CANCELED",
        "PAST_DUE",
        "UNPAID",
        "INCOMPLETE",
        "EXPIRED",
      ],
      TeamMemberRole: ["MEMBER", "OWNER"],
      UserOneTimePasswordType: ["SIGNUP", "LOGIN", "PASSWORD_RESET"],
      UserRole: ["USER", "ADMIN"],
      yk_technologies: [
        "React",
        "Next.js",
        "Nest.js",
        "Node.js",
        "REST",
        "GraphQL",
        "RabbitMQ",
      ],
    },
  },
} as const