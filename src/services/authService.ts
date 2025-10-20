import { apiService } from './api';
import { 
  User, 
  LoginCredentials, 
  RegisterData, 
  ApiResponse 
} from '../types';

export interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    // For development/demo purposes, we'll use mock data
    // Replace with actual API call: return apiService.post('/auth/login', credentials);
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        if (credentials.email === 'admin@example.com' && credentials.password === 'password123') {
          resolve({
            data: {
              user: {
                id: '1',
                email: 'admin@example.com',
                name: 'Admin User',
                role: 'admin',
                createdAt: new Date().toISOString(),
              },
              token: 'mock-jwt-token-admin',
            },
            message: 'Login successful',
            success: true,
          });
        } else if (credentials.email === 'user@example.com' && credentials.password === 'password123') {
          resolve({
            data: {
              user: {
                id: '2',
                email: 'user@example.com',
                name: 'Regular User',
                role: 'user',
                createdAt: new Date().toISOString(),
              },
              token: 'mock-jwt-token-user',
            },
            message: 'Login successful',
            success: true,
          });
        } else {
          resolve({
            data: null as any,
            message: 'Invalid email or password',
            success: false,
          });
        }
      }, 1000);
    });
  },

  async register(userData: RegisterData): Promise<ApiResponse<AuthResponse>> {
    // For development/demo purposes, we'll use mock data
    // Replace with actual API call: return apiService.post('/auth/register', userData);
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        if (userData.password !== userData.confirmPassword) {
          resolve({
            data: null as any,
            message: 'Passwords do not match',
            success: false,
          });
          return;
        }

        resolve({
          data: {
            user: {
              id: Date.now().toString(),
              email: userData.email,
              name: userData.name,
              role: 'user',
              createdAt: new Date().toISOString(),
            },
            token: `mock-jwt-token-${Date.now()}`,
          },
          message: 'Registration successful',
          success: true,
        });
      }, 1000);
    });
  },

  async logout(): Promise<ApiResponse<null>> {
    // Replace with actual API call: return apiService.post('/auth/logout');
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: null,
          message: 'Logout successful',
          success: true,
        });
      }, 500);
    });
  },

  async refreshToken(token: string): Promise<ApiResponse<AuthResponse>> {
    // Replace with actual API call: return apiService.post('/auth/refresh', { token });
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            user: {
              id: '1',
              email: 'admin@example.com',
              name: 'Admin User',
              role: 'admin',
              createdAt: new Date().toISOString(),
            },
            token: `refreshed-token-${Date.now()}`,
          },
          message: 'Token refreshed',
          success: true,
        });
      }, 500);
    });
  },
};