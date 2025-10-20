import { apiService } from './api';
import { 
  Lead, 
  CreateLeadData, 
  LeadStatus, 
  ApiResponse,
  DashboardStats 
} from '../types';

// Mock data for development
const mockLeads: Lead[] = [
  {
    id: '1',
    title: 'Website Redesign Project',
    description: 'Complete website overhaul with modern design',
    status: 'New',
    value: 15000,
    customerId: '1',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    title: 'CRM Implementation',
    description: 'Custom CRM system development',
    status: 'Contacted',
    value: 25000,
    customerId: '1',
    createdAt: '2024-01-16T09:00:00Z',
    updatedAt: '2024-01-18T14:20:00Z',
  },
  {
    id: '3',
    title: 'Mobile App Development',
    description: 'iOS and Android app for business',
    status: 'Converted',
    value: 40000,
    customerId: '2',
    createdAt: '2024-01-17T11:15:00Z',
    updatedAt: '2024-01-19T16:45:00Z',
  },
  {
    id: '4',
    title: 'Data Migration',
    description: 'Legacy system data migration',
    status: 'Lost',
    value: 8000,
    customerId: '3',
    createdAt: '2024-01-18T13:20:00Z',
    updatedAt: '2024-01-20T10:10:00Z',
  },
  {
    id: '5',
    title: 'Cloud Infrastructure',
    description: 'AWS cloud setup and management',
    status: 'Contacted',
    value: 12000,
    customerId: '4',
    createdAt: '2024-01-19T08:45:00Z',
    updatedAt: '2024-01-19T15:30:00Z',
  },
  {
    id: '6',
    title: 'E-commerce Platform',
    description: 'Custom e-commerce solution',
    status: 'New',
    value: 35000,
    customerId: '5',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z',
  },
];

export const leadService = {
  async getLeads(statusFilter?: LeadStatus | 'All'): Promise<ApiResponse<Lead[]>> {
    // Replace with actual API call: return apiService.get(`/leads?status=${statusFilter}`);
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredLeads = mockLeads;
        
        if (statusFilter && statusFilter !== 'All') {
          filteredLeads = mockLeads.filter(lead => lead.status === statusFilter);
        }
        
        resolve({
          data: filteredLeads,
          message: 'Leads retrieved successfully',
          success: true,
        });
      }, 500);
    });
  },

  async getLeadsByCustomer(customerId: string): Promise<ApiResponse<Lead[]>> {
    // Replace with actual API call: return apiService.get(`/customers/${customerId}/leads`);
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const customerLeads = mockLeads.filter(lead => lead.customerId === customerId);
        resolve({
          data: customerLeads,
          message: 'Customer leads retrieved successfully',
          success: true,
        });
      }, 300);
    });
  },

  async getLeadById(id: string): Promise<ApiResponse<Lead>> {
    // Replace with actual API call: return apiService.get(`/leads/${id}`);
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const lead = mockLeads.find(l => l.id === id);
        if (lead) {
          resolve({
            data: lead,
            message: 'Lead retrieved successfully',
            success: true,
          });
        } else {
          resolve({
            data: null as any,
            message: 'Lead not found',
            success: false,
          });
        }
      }, 300);
    });
  },

  async createLead(leadData: CreateLeadData): Promise<ApiResponse<Lead>> {
    // Replace with actual API call: return apiService.post('/leads', leadData);
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const newLead: Lead = {
          id: Date.now().toString(),
          ...leadData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        mockLeads.unshift(newLead);
        
        resolve({
          data: newLead,
          message: 'Lead created successfully',
          success: true,
        });
      }, 800);
    });
  },

  async updateLead(id: string, leadData: Partial<CreateLeadData>): Promise<ApiResponse<Lead>> {
    // Replace with actual API call: return apiService.put(`/leads/${id}`, leadData);
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const leadIndex = mockLeads.findIndex(l => l.id === id);
        if (leadIndex !== -1) {
          const updatedLead = {
            ...mockLeads[leadIndex],
            ...leadData,
            updatedAt: new Date().toISOString(),
          };
          
          mockLeads[leadIndex] = updatedLead;
          
          resolve({
            data: updatedLead,
            message: 'Lead updated successfully',
            success: true,
          });
        } else {
          resolve({
            data: null as any,
            message: 'Lead not found',
            success: false,
          });
        }
      }, 800);
    });
  },

  async deleteLead(id: string): Promise<ApiResponse<null>> {
    // Replace with actual API call: return apiService.delete(`/leads/${id}`);
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const leadIndex = mockLeads.findIndex(l => l.id === id);
        if (leadIndex !== -1) {
          mockLeads.splice(leadIndex, 1);
          resolve({
            data: null,
            message: 'Lead deleted successfully',
            success: true,
          });
        } else {
          resolve({
            data: null,
            message: 'Lead not found',
            success: false,
          });
        }
      }, 600);
    });
  },

  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    // Replace with actual API call: return apiService.get('/dashboard/stats');
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const leadsByStatus = mockLeads.reduce((acc, lead) => {
          acc[lead.status] = (acc[lead.status] || 0) + 1;
          return acc;
        }, { New: 0, Contacted: 0, Converted: 0, Lost: 0 });

        const totalValue = mockLeads.reduce((sum, lead) => sum + lead.value, 0);
        const convertedValue = mockLeads
          .filter(lead => lead.status === 'Converted')
          .reduce((sum, lead) => sum + lead.value, 0);

        const conversionRate = totalValue > 0 ? (convertedValue / totalValue) * 100 : 0;

        resolve({
          data: {
            totalLeads: mockLeads.length,
            totalValue,
            leadsByStatus,
            conversionRate: Math.round(conversionRate * 100) / 100,
          },
          message: 'Dashboard stats retrieved successfully',
          success: true,
        });
      }, 400);
    });
  },
};