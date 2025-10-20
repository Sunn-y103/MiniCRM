import { apiService } from './api';
import { 
  Customer, 
  CreateCustomerData, 
  ApiResponse, 
  PaginatedResponse 
} from '../types';

// Mock data for development
const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1-555-0123',
    company: 'Tech Solutions Inc',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@business.com',
    phone: '+1-555-0124',
    company: 'Business Corp',
    createdAt: '2024-01-16T10:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z',
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'mbrown@startup.io',
    phone: '+1-555-0125',
    company: 'Startup Labs',
    createdAt: '2024-01-17T10:00:00Z',
    updatedAt: '2024-01-17T10:00:00Z',
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@enterprise.com',
    phone: '+1-555-0126',
    company: 'Enterprise Solutions',
    createdAt: '2024-01-18T10:00:00Z',
    updatedAt: '2024-01-18T10:00:00Z',
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'dwilson@consulting.com',
    phone: '+1-555-0127',
    company: 'Wilson Consulting',
    createdAt: '2024-01-19T10:00:00Z',
    updatedAt: '2024-01-19T10:00:00Z',
  },
];

export const customerService = {
  async getCustomers(
    page: number = 1, 
    pageSize: number = 10, 
    searchQuery?: string
  ): Promise<ApiResponse<PaginatedResponse<Customer>>> {
    // Replace with actual API call: return apiService.get(`/customers?page=${page}&pageSize=${pageSize}&search=${searchQuery}`);
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredCustomers = mockCustomers;
        
        if (searchQuery) {
          filteredCustomers = mockCustomers.filter(customer =>
            customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.company.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);
        
        resolve({
          data: {
            data: paginatedCustomers,
            currentPage: page,
            totalPages: Math.ceil(filteredCustomers.length / pageSize),
            totalItems: filteredCustomers.length,
          },
          message: 'Customers retrieved successfully',
          success: true,
        });
      }, 500);
    });
  },

  async getCustomerById(id: string): Promise<ApiResponse<Customer>> {
    // Replace with actual API call: return apiService.get(`/customers/${id}`);
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const customer = mockCustomers.find(c => c.id === id);
        if (customer) {
          resolve({
            data: customer,
            message: 'Customer retrieved successfully',
            success: true,
          });
        } else {
          resolve({
            data: null as any,
            message: 'Customer not found',
            success: false,
          });
        }
      }, 300);
    });
  },

  async createCustomer(customerData: CreateCustomerData): Promise<ApiResponse<Customer>> {
    // Replace with actual API call: return apiService.post('/customers', customerData);
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const newCustomer: Customer = {
          id: Date.now().toString(),
          ...customerData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        mockCustomers.unshift(newCustomer);
        
        resolve({
          data: newCustomer,
          message: 'Customer created successfully',
          success: true,
        });
      }, 800);
    });
  },

  async updateCustomer(id: string, customerData: Partial<CreateCustomerData>): Promise<ApiResponse<Customer>> {
    // Replace with actual API call: return apiService.put(`/customers/${id}`, customerData);
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const customerIndex = mockCustomers.findIndex(c => c.id === id);
        if (customerIndex !== -1) {
          const updatedCustomer = {
            ...mockCustomers[customerIndex],
            ...customerData,
            updatedAt: new Date().toISOString(),
          };
          
          mockCustomers[customerIndex] = updatedCustomer;
          
          resolve({
            data: updatedCustomer,
            message: 'Customer updated successfully',
            success: true,
          });
        } else {
          resolve({
            data: null as any,
            message: 'Customer not found',
            success: false,
          });
        }
      }, 800);
    });
  },

  async deleteCustomer(id: string): Promise<ApiResponse<null>> {
    // Replace with actual API call: return apiService.delete(`/customers/${id}`);
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const customerIndex = mockCustomers.findIndex(c => c.id === id);
        if (customerIndex !== -1) {
          mockCustomers.splice(customerIndex, 1);
          resolve({
            data: null,
            message: 'Customer deleted successfully',
            success: true,
          });
        } else {
          resolve({
            data: null,
            message: 'Customer not found',
            success: false,
          });
        }
      }, 600);
    });
  },
};