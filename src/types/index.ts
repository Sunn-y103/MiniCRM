// User and Authentication types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Customer types
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerState {
  customers: Customer[];
  currentCustomer: Customer | null;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  currentPage: number;
  totalPages: number;
}

export interface CreateCustomerData {
  name: string;
  email: string;
  phone: string;
  company: string;
}

// Lead types
export type LeadStatus = 'New' | 'Contacted' | 'Converted' | 'Lost';

export interface Lead {
  id: string;
  title: string;
  description: string;
  status: LeadStatus;
  value: number;
  customerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadState {
  leads: Lead[];
  customerLeads: Lead[];
  isLoading: boolean;
  error: string | null;
  statusFilter: LeadStatus | 'All';
}

export interface CreateLeadData {
  title: string;
  description: string;
  status: LeadStatus;
  value: number;
  customerId: string;
}

// Dashboard types
export interface DashboardStats {
  totalLeads: number;
  totalValue: number;
  leadsByStatus: {
    New: number;
    Contacted: number;
    Converted: number;
    Lost: number;
  };
  conversionRate: number;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

// Navigation types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainStackParamList = {
  Dashboard: undefined;
  Customers: undefined;
  CustomerDetails: { customerId: string };
  AddCustomer: undefined;
  EditCustomer: { customer: Customer };
  AddLead: { customerId: string };
  EditLead: { lead: Lead };
};

// Theme types
export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  error: string;
  success: string;
  warning: string;
}

export interface AppTheme {
  colors: ThemeColors;
  dark: boolean;
}