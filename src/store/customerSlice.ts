import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { customerService } from '../services/customerService';
import { CustomerState, Customer, CreateCustomerData, PaginatedResponse } from '../types';
import { PAGINATION } from '../constants';

const initialState: CustomerState = {
  customers: [],
  currentCustomer: null,
  isLoading: false,
  error: null,
  searchQuery: '',
  currentPage: 1,
  totalPages: 1,
};

// Async thunks
export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
  async (
    { page = 1, pageSize = PAGINATION.DEFAULT_PAGE_SIZE, searchQuery }: 
    { page?: number; pageSize?: number; searchQuery?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await customerService.getCustomers(page, pageSize, searchQuery);
      
      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return { ...response.data, searchQuery };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch customers');
    }
  }
);

export const fetchCustomerById = createAsyncThunk(
  'customers/fetchCustomerById',
  async (customerId: string, { rejectWithValue }) => {
    try {
      const response = await customerService.getCustomerById(customerId);
      
      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch customer');
    }
  }
);

export const createCustomer = createAsyncThunk(
  'customers/createCustomer',
  async (customerData: CreateCustomerData, { rejectWithValue }) => {
    try {
      const response = await customerService.createCustomer(customerData);
      
      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create customer');
    }
  }
);

export const updateCustomer = createAsyncThunk(
  'customers/updateCustomer',
  async (
    { id, customerData }: { id: string; customerData: Partial<CreateCustomerData> },
    { rejectWithValue }
  ) => {
    try {
      const response = await customerService.updateCustomer(id, customerData);
      
      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update customer');
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  'customers/deleteCustomer',
  async (customerId: string, { rejectWithValue }) => {
    try {
      const response = await customerService.deleteCustomer(customerId);
      
      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return customerId;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete customer');
    }
  }
);

// Customer slice
const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearCurrentCustomer: (state) => {
      state.currentCustomer = null;
    },
    resetCustomers: (state) => {
      state.customers = [];
      state.currentPage = 1;
      state.totalPages = 1;
      state.searchQuery = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch customers cases
      .addCase(fetchCustomers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchCustomers.fulfilled, 
        (state, action: PayloadAction<PaginatedResponse<Customer> & { searchQuery?: string }>) => {
          state.isLoading = false;
          state.customers = action.payload.data;
          state.currentPage = action.payload.currentPage;
          state.totalPages = action.payload.totalPages;
          state.searchQuery = action.payload.searchQuery || '';
          state.error = null;
        }
      )
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Fetch customer by ID cases
      .addCase(fetchCustomerById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCustomerById.fulfilled, (state, action: PayloadAction<Customer>) => {
        state.isLoading = false;
        state.currentCustomer = action.payload;
        state.error = null;
      })
      .addCase(fetchCustomerById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Create customer cases
      .addCase(createCustomer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCustomer.fulfilled, (state, action: PayloadAction<Customer>) => {
        state.isLoading = false;
        state.customers.unshift(action.payload);
        state.error = null;
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Update customer cases
      .addCase(updateCustomer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCustomer.fulfilled, (state, action: PayloadAction<Customer>) => {
        state.isLoading = false;
        const index = state.customers.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.customers[index] = action.payload;
        }
        if (state.currentCustomer && state.currentCustomer.id === action.payload.id) {
          state.currentCustomer = action.payload;
        }
        state.error = null;
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Delete customer cases
      .addCase(deleteCustomer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCustomer.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.customers = state.customers.filter(c => c.id !== action.payload);
        if (state.currentCustomer && state.currentCustomer.id === action.payload) {
          state.currentCustomer = null;
        }
        state.error = null;
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  clearError, 
  setSearchQuery, 
  setCurrentPage, 
  clearCurrentCustomer, 
  resetCustomers 
} = customerSlice.actions;

export default customerSlice.reducer;