const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

interface RequestOptions extends RequestInit {
  useAuth?: boolean;
}

export interface ApiError {
  message: string;
}

export interface StoredTokens {
  accessToken: string | null;
  refreshToken: string | null;
}

export const getStoredTokens = (): StoredTokens => {
  if (typeof window === "undefined") {
    return { accessToken: null, refreshToken: null };
  }
  try {
    const accessToken = localStorage.getItem("accessToken") || localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refreshToken") || localStorage.getItem("refresh_token");
    return { accessToken, refreshToken };
  } catch {
    return { accessToken: null, refreshToken: null };
  }
};

export const storeTokens = (accessToken: string, refreshToken: string): void => {
  if (typeof window === "undefined") return;
  try {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("access_token", accessToken);
    }
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("refresh_token", refreshToken);
    }
  } catch {
    // ignore storage exceptions
  }
};

export const clearTokens = (): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("refresh_token");
  } catch {
    // ignore storage exceptions
  }
};

async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { useAuth = true, headers: customHeaders, ...restOptions } = options;
  const url = path.startsWith("http://") || path.startsWith("https://") ? path : `${BASE_URL}${path}`;

  const headers = new Headers(customHeaders);
  
  const isMultipart = restOptions.body instanceof FormData;
  if (!isMultipart && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  // Dual-mode transmission: attach Authorization Bearer header if token exists
  if (useAuth && !headers.has("Authorization")) {
    const { accessToken } = getStoredTokens();
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
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
      const { refreshToken } = getStoredTokens();
      const refreshResponse = await fetch(`${BASE_URL}/api/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: refreshToken ? JSON.stringify({ refreshToken }) : undefined,
        credentials: "include",
      });

      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json().catch(() => null);
        if (refreshData?.result?.tokens) {
          storeTokens(
            refreshData.result.tokens.accessToken,
            refreshData.result.tokens.refreshToken
          );
          headers.set("Authorization", `Bearer ${refreshData.result.tokens.accessToken}`);
        }
        response = await fetch(url, {
          ...restOptions,
          headers,
          credentials: "include",
        });
      } else if (!isMeCheck && typeof window !== "undefined") {
        clearTokens();
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
    return { result: null } as unknown as T;
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

export const fetchClient = apiFetch;

export const apiClient = {
  get: <T>(path: string, options?: RequestOptions) => 
    apiFetch<T>(path, { ...options, method: "GET" }),
  
  post: <T>(path: string, body?: unknown, options?: RequestOptions) => 
    apiFetch<T>(path, { 
      ...options, 
      method: "POST", 
      body: body instanceof FormData ? body : JSON.stringify(body) 
    }),
  
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) => 
    apiFetch<T>(path, { 
      ...options, 
      method: "PATCH", 
      body: body instanceof FormData ? body : JSON.stringify(body) 
    }),
  
  put: <T>(path: string, body?: unknown, options?: RequestOptions) => 
    apiFetch<T>(path, { 
      ...options, 
      method: "PUT", 
      body: body instanceof FormData ? body : JSON.stringify(body) 
    }),
  
  delete: <T>(path: string, options?: RequestOptions) => 
    apiFetch<T>(path, { ...options, method: "DELETE" }),
};
