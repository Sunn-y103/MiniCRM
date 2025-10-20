import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, STORAGE_KEYS } from '../constants';
import { ApiResponse } from '../types';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle errors
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Token expired, clear storage
          await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
          await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
          // Redirect to login (handled by auth slice)
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.get(endpoint, config);
      return {
        data: response.data.data,
        message: response.data.message,
        success: true,
      };
    } catch (error: any) {
      return {
        data: null as any,
        message: error.response?.data?.message || error.message,
        success: false,
      };
    }
  }

  async post<T>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.post(endpoint, data, config);
      return {
        data: response.data.data,
        message: response.data.message,
        success: true,
      };
    } catch (error: any) {
      return {
        data: null as any,
        message: error.response?.data?.message || error.message,
        success: false,
      };
    }
  }

  async put<T>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.put(endpoint, data, config);
      return {
        data: response.data.data,
        message: response.data.message,
        success: true,
      };
    } catch (error: any) {
      return {
        data: null as any,
        message: error.response?.data?.message || error.message,
        success: false,
      };
    }
  }

  async delete<T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.delete(endpoint, config);
      return {
        data: response.data.data,
        message: response.data.message,
        success: true,
      };
    } catch (error: any) {
      return {
        data: null as any,
        message: error.response?.data?.message || error.message,
        success: false,
      };
    }
  }
}

export const apiService = new ApiService();