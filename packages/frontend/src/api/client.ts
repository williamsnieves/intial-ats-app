import axios, { AxiosInstance, AxiosError } from "axios";
import { toast } from "react-hot-toast";

// Error response interface
interface ErrorResponse {
  message?: string;
  error?: string;
}

// API response wrapper interface
interface ApiResponseWrapper<T> {
  success: boolean;
  data: T;
  message?: string;
}

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001/api",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem("authToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ErrorResponse>) => {
        this.handleError(error);
        return Promise.reject(error);
      }
    );
  }

  private handleError(error: AxiosError<ErrorResponse>) {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      switch (status) {
        case 400:
          toast.error(data?.message || "Bad request");
          break;
        case 401:
          toast.error("Unauthorized access");
          // Redirect to login or clear auth
          localStorage.removeItem("authToken");
          break;
        case 403:
          toast.error("Access forbidden");
          break;
        case 404:
          toast.error(data?.message || "Resource not found");
          break;
        case 409:
          toast.error(data?.message || "Conflict occurred");
          break;
        case 500:
          toast.error("Server error occurred");
          break;
        default:
          toast.error(data?.message || "An error occurred");
      }
      return;
    } else if (error.request) {
      toast.error("Network error - please check your connection");
    } else {
      toast.error("An unexpected error occurred");
    }
  }

  // HTTP methods
  async get<T>(url: string, params?: any): Promise<T> {
    const response = await this.client.get<ApiResponseWrapper<T>>(url, {
      params,
    });
    return response.data.data;
  }

  async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.post<ApiResponseWrapper<T>>(url, data);
    return response.data.data;
  }

  async put<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.put<ApiResponseWrapper<T>>(url, data);
    return response.data.data;
  }

  async patch<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.patch<ApiResponseWrapper<T>>(url, data);
    return response.data.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete<ApiResponseWrapper<T>>(url);
    return response.data.data;
  }
}

export const apiClient = new ApiClient();
