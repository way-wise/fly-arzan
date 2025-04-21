import { useState, useEffect } from "react";
import { BaseUrl } from "../baseUrl";


// ✅ Generate Access Token
export const generateAccessToken = async () => {
  try {
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", "dvAdXU97xKoLAbb1X2mV1exKDlcZeYmw");
    params.append("client_secret", "GFbGYrPjg48umb4r");

    const response = await fetch(
      `${BaseUrl}/v1/security/oauth2/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params, // URL-encoded data
      }
    );
    const data = await response.json();
    return data.access_token; // necessary to return the token
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw new Error(error);
  }
};

// ✅ Request api function for all hooks
const apiRequest = async (endpoint, method = "GET", body = null, baseUrl = BaseUrl,tokenToGenerate) => {
  try {
    const token = tokenToGenerate ?  await generateAccessToken(): null;

    const options = {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (method !== "GET" && body) {
      // Check if it's FormData
      if (body instanceof FormData) {
        options.body = body;
      } else {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(body);
      }
    }

    const response = await fetch(`${baseUrl}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "API request failed");
    }

    return data;
  } catch (error) {
    console.error("API Request Error:", error.message);
    throw error;
  }
};


// ✅ GET Hook
export const useGet = (endpoint, autoFetch = false, baseUrl = BaseUrl,tokenToGenerate=true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!endpoint) return;
    setLoading(true);
    setError(null);
    try {
      const result = await apiRequest(endpoint, "GET", null, baseUrl,tokenToGenerate);
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [endpoint, autoFetch, baseUrl]);

  return { data, loading, error, refetch: fetchData };
};


// ✅ POST Hook
export const usePost = (endpoint, baseUrl = BaseUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (body) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiRequest(endpoint, "POST", body, baseUrl);
      return response;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { postData, loading, error };
};

// ✅ PUT Hook
export const usePut = (endpoint) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const putData = async (body) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiRequest(endpoint, "PUT", body);
      return response;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { putData, loading, error };
};

// ✅ DELETE Hook
export const useDelete = (endpoint) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiRequest(endpoint, "DELETE");
      return response;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, loading, error };
};