'use client';
import { useContext, useMemo } from "react";
import { UserContext } from "../contexts/UserContext";
import { supabase } from "../services/supabaseClient";

export default function useAuth() {
  const context = useContext(UserContext);
  
  if (!context) {
    console.error("useAuth must be used within a UserProvider");
    return {
      user: null,
      accessToken: null,
      isAuthenticated: false,
      request: {},
      login: () => Promise.resolve({ error: new Error('Context not available') }),
      logout: () => Promise.resolve({ error: new Error('Context not available') })
    };
  }
  
  const { accessToken, user, userLoginHandler, userLogoutHandler } = context;
  
  const requestWrapper = async (method, url, data = null) => {
    const headers = {
      'Authorization': `Bearer ${accessToken}`, 
      'Content-Type': 'application/json'
    };
    
    const res = await fetch(url, {
      method,
      headers,
      body: data ? JSON.stringify(data) : null,
    });
    
    const result = await res.json();
    return result;
  };
  
  const requestObject = useMemo(() => ({
    get: (url) => requestWrapper('GET', url),
    post: (url, data) => requestWrapper('POST', url, data),
    put: (url, data) => requestWrapper('PUT', url, data),
    delete: (url) => requestWrapper('DELETE', url),
  }), [accessToken]);
  
  return {
    user,
    accessToken,
    isAuthenticated: !!accessToken, 
    request: requestObject, 
    login: async (credentials) => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword(credentials);
        
        if (error) {
          return { error };
        }
        
        if (data?.session) {
          userLoginHandler && userLoginHandler(data.session);
        }
        
        return { data, error: null };
      } catch (err) {
        return { data: null, error: err };
      }
    },
    logout: async () => {
      try {
        if (userLogoutHandler) {
          return await userLogoutHandler();
        } else {
          const { error } = await supabase.auth.signOut();
          return { error };
        }
      } catch (err) {
        return { error: err };
      }
    }
  };
}