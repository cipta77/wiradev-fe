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

  const isMeCheck = path === "/api/auth/me";

  // On 401, transparently refresh the (15-minute) access token once and retry.
  // This also covers the initial /api/auth/me bootstrap call: previously /me
  // skipped the refresh and immediately returned null, logging the user out as
  // soon as the access token expired even though the refresh token was valid.
  if (response.status === 401 && useAuth && path !== "/api/auth/refresh") {
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
      } else if (!isMeCheck && typeof window !== "undefined") {
        // Refresh genuinely failed (expired/invalid session): send the user to
        // sign-in. For the /me bootstrap we stay silent and fall through to the
        // null result below so the public/landing pages still render.
        window.location.href = "/signin";
      }
    } catch (e) {
      console.error("Token refresh failed", e);
    }
  }

  if (response.status === 401 && isMeCheck) {
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
