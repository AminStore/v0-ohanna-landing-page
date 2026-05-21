/**
 * API Client Service
 * Centralized API communication for the frontend
 */

import { customFetch, setBaseUrl } from "@/api";
import type {
  Product,
  ProductsResponse,
  CheckoutRequest,
  CheckoutResponse,
  ContactRequest,
  ContactResponse,
  TrackOrderRequest,
  TrackOrderResponse,
  HealthResponse,
} from "@/types";

// Set the base URL for API calls
// In production, this should point to your deployed backend API
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? "https://ohanna-api.vercel.app" : "http://localhost:3001");

// Only set base URL if it's not the same origin (for development)
if (API_BASE_URL && !API_BASE_URL.includes(window.location.origin)) {
  setBaseUrl(API_BASE_URL);
}

/**
 * API Client
 */
export const apiClient = {
  /**
   * Health check endpoints
   */
  health: {
    check: async (): Promise<HealthResponse> => {
      return customFetch("/health");
    },
    apiCheck: async (): Promise<{ status: string }> => {
      return customFetch("/api/healthz");
    },
  },

  /**
   * Products endpoints
   */
  products: {
    list: async (): Promise<Product[]> => {
      try {
        const response = await customFetch("/api/products") as ProductsResponse;
        return response.products || [];
      } catch (err) {
        console.error("Failed to fetch products:", err);
        return [];
      }
    },

    getById: async (id: string): Promise<Product | null> => {
      try {
        return await customFetch(`/api/products/${id}`) as Product;
      } catch (err) {
        console.error(`Failed to fetch product ${id}:`, err);
        return null;
      }
    },

    search: async (query: string): Promise<Product[]> => {
      try {
        const response = await customFetch(`/api/products/search/${encodeURIComponent(query)}`) as ProductsResponse;
        return response.products || [];
      } catch (err) {
        console.error("Failed to search products:", err);
        return [];
      }
    },

    getByCategory: async (category: string): Promise<Product[]> => {
      try {
        const response = await customFetch(`/api/products/category/${encodeURIComponent(category)}`) as ProductsResponse;
        return response.products || [];
      } catch (err) {
        console.error(`Failed to fetch products for category ${category}:`, err);
        return [];
      }
    },
  },

  /**
   * Checkout endpoints
   */
  checkout: {
    create: async (data: CheckoutRequest): Promise<CheckoutResponse> => {
      return customFetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }) as Promise<CheckoutResponse>;
    },
  },

  /**
   * Contact endpoints
   */
  contact: {
    send: async (data: ContactRequest): Promise<ContactResponse> => {
      return customFetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }) as Promise<ContactResponse>;
    },
  },

  /**
   * Order tracking endpoints
   */
  orders: {
    track: async (params: TrackOrderRequest): Promise<TrackOrderResponse> => {
      const searchParams = new URLSearchParams({
        id: params.id,
        email: params.email,
      });
      return customFetch(`/api/track-order?${searchParams}`) as Promise<TrackOrderResponse>;
    },
  },

  /**
   * Setup endpoints
   */
  setup: {
    status: async (): Promise<{ status: string; message: string }> => {
      return customFetch("/api/setup") as Promise<{ status: string; message: string }>;
    },
  },
};

export default apiClient;
