const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface RequestOptions extends RequestInit {
  useAuth?: boolean;
}

export interface ApiError {
  message: string;
}

export const getStoredTokens = () => {
  return { accessToken: null, refreshToken: null };
};
export const storeTokens = (accessToken: string, refreshToken: string) => {};
export const clearTokens = () => {};

async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { useAuth = true, headers: customHeaders, ...restOptions } = options;
  const url = `${BASE_URL}${path}`;

  const headers = new Headers(customHeaders);
  
  const isMultipart = restOptions.body instanceof FormData;
  if (!isMultipart && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  let response = await fetch(url, {
    ...restOptions,
    headers,
    credentials: "include", 
  });

  if (response.status === 401 && useAuth && path !== "/api/auth/me") {
    try {
      const refreshResponse = await fetch(`${BASE_URL}/api/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (refreshResponse.ok) {
        response = await fetch(url, {
          ...restOptions,
          headers,
          credentials: "include",
        });
      } else {
        if (typeof window !== "undefined") {
          window.location.href = "/signin";
        }
      }
    } catch (e) {
      console.error("Token refresh failed", e);
    }
  }

  if (response.status === 401 && path === "/api/auth/me") {
    return { result: null } as any;
  }

  if (!response.ok) {
    let errorMessage = "An error occurred";
    try {
      const errData = await response.json();
      errorMessage = errData.message || errorMessage;
    } catch {
      errorMessage = response.statusText || errorMessage;
    }
    throw new Error(errorMessage);
  }

  return response.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(path: string, options?: RequestOptions) => 
    apiFetch<T>(path, { ...options, method: "GET" }),
  
  post: <T>(path: string, body?: any, options?: RequestOptions) => 
    apiFetch<T>(path, { 
      ...options, 
      method: "POST", 
      body: body instanceof FormData ? body : JSON.stringify(body) 
    }),
  
  patch: <T>(path: string, body?: any, options?: RequestOptions) => 
    apiFetch<T>(path, { 
      ...options, 
      method: "PATCH", 
      body: body instanceof FormData ? body : JSON.stringify(body) 
    }),
  
  put: <T>(path: string, body?: any, options?: RequestOptions) => 
    apiFetch<T>(path, { 
      ...options, 
      method: "PUT", 
      body: body instanceof FormData ? body : JSON.stringify(body) 
    }),
  
  delete: <T>(path: string, options?: RequestOptions) => 
    apiFetch<T>(path, { ...options, method: "DELETE" }),
};
