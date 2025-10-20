import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { leadService } from '../services/leadService';
import { LeadState, Lead, CreateLeadData, LeadStatus, DashboardStats } from '../types';

const initialState: LeadState = {
  leads: [],
  customerLeads: [],
  isLoading: false,
  error: null,
  statusFilter: 'All',
};

// Async thunks
export const fetchLeads = createAsyncThunk(
  'leads/fetchLeads',
  async (statusFilter?: LeadStatus | 'All', { rejectWithValue }) => {
    try {
      const response = await leadService.getLeads(statusFilter);
      
      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return { leads: response.data, statusFilter };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch leads');
    }
  }
);

export const fetchLeadsByCustomer = createAsyncThunk(
  'leads/fetchLeadsByCustomer',
  async (customerId: string, { rejectWithValue }) => {
    try {
      const response = await leadService.getLeadsByCustomer(customerId);
      
      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch customer leads');
    }
  }
);

export const fetchLeadById = createAsyncThunk(
  'leads/fetchLeadById',
  async (leadId: string, { rejectWithValue }) => {
    try {
      const response = await leadService.getLeadById(leadId);
      
      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch lead');
    }
  }
);

export const createLead = createAsyncThunk(
  'leads/createLead',
  async (leadData: CreateLeadData, { rejectWithValue }) => {
    try {
      const response = await leadService.createLead(leadData);
      
      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create lead');
    }
  }
);

export const updateLead = createAsyncThunk(
  'leads/updateLead',
  async (
    { id, leadData }: { id: string; leadData: Partial<CreateLeadData> },
    { rejectWithValue }
  ) => {
    try {
      const response = await leadService.updateLead(id, leadData);
      
      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update lead');
    }
  }
);

export const deleteLead = createAsyncThunk(
  'leads/deleteLead',
  async (leadId: string, { rejectWithValue }) => {
    try {
      const response = await leadService.deleteLead(leadId);
      
      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return leadId;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete lead');
    }
  }
);

export const fetchDashboardStats = createAsyncThunk(
  'leads/fetchDashboardStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await leadService.getDashboardStats();
      
      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch dashboard stats');
    }
  }
);

// Lead slice
const leadSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setStatusFilter: (state, action: PayloadAction<LeadStatus | 'All'>) => {
      state.statusFilter = action.payload;
    },
    clearCustomerLeads: (state) => {
      state.customerLeads = [];
    },
    resetLeads: (state) => {
      state.leads = [];
      state.customerLeads = [];
      state.statusFilter = 'All';
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch leads cases
      .addCase(fetchLeads.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchLeads.fulfilled, 
        (state, action: PayloadAction<{ leads: Lead[]; statusFilter?: LeadStatus | 'All' }>) => {
          state.isLoading = false;
          state.leads = action.payload.leads;
          state.statusFilter = action.payload.statusFilter || 'All';
          state.error = null;
        }
      )
      .addCase(fetchLeads.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Fetch leads by customer cases
      .addCase(fetchLeadsByCustomer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLeadsByCustomer.fulfilled, (state, action: PayloadAction<Lead[]>) => {
        state.isLoading = false;
        state.customerLeads = action.payload;
        state.error = null;
      })
      .addCase(fetchLeadsByCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Create lead cases
      .addCase(createLead.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createLead.fulfilled, (state, action: PayloadAction<Lead>) => {
        state.isLoading = false;
        state.leads.unshift(action.payload);
        // Also add to customer leads if it matches current customer
        if (state.customerLeads.length > 0 && 
            state.customerLeads[0]?.customerId === action.payload.customerId) {
          state.customerLeads.unshift(action.payload);
        }
        state.error = null;
      })
      .addCase(createLead.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Update lead cases
      .addCase(updateLead.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateLead.fulfilled, (state, action: PayloadAction<Lead>) => {
        state.isLoading = false;
        
        // Update in leads array
        const leadIndex = state.leads.findIndex(l => l.id === action.payload.id);
        if (leadIndex !== -1) {
          state.leads[leadIndex] = action.payload;
        }
        
        // Update in customer leads array
        const customerLeadIndex = state.customerLeads.findIndex(l => l.id === action.payload.id);
        if (customerLeadIndex !== -1) {
          state.customerLeads[customerLeadIndex] = action.payload;
        }
        
        state.error = null;
      })
      .addCase(updateLead.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Delete lead cases
      .addCase(deleteLead.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteLead.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.leads = state.leads.filter(l => l.id !== action.payload);
        state.customerLeads = state.customerLeads.filter(l => l.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteLead.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  clearError, 
  setStatusFilter, 
  clearCustomerLeads, 
  resetLeads 
} = leadSlice.actions;

export default leadSlice.reducer;