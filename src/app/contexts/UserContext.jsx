'use client';
import { createContext, useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { useRouter } from 'next/navigation';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          setUser(session.user || null);
          setAccessToken(session.access_token || null);
        } else {
          setUser(null);
          setAccessToken(null);
        }
      } catch (error) {
        console.error("Error getting session:", error);
        setUser(null);
        setAccessToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          setUser(session.user || null);
          setAccessToken(session.access_token || null);
        } else {
          setUser(null);
          setAccessToken(null);
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const userLoginHandler = async (credentials) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword(credentials);
      
      if (error) {
        return { data: null, error };
      }
      
      if (data?.session) {
        setUser(data.session.user || null);
        setAccessToken(data.session.access_token || null);
      }
      
      return { data, error: null };
    } catch (err) {
      console.error("Login error:", err);
      return { data: null, error: { message: "An unexpected error occurred" } };
    }
  };

  const userLogoutHandler = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        return { error };
      }
      
      setUser(null);
      setAccessToken(null);
      router.push('/');
      
      return { error: null };
    } catch (err) {
      console.error("Logout error:", err);
      return { error: { message: "An unexpected error occurred" } };
    }
  };

  const isAuthenticated = () => {
    return !!accessToken && !!user;
  };

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        accessToken, 
        isLoading, 
        isAuthenticated, 
        userLoginHandler, 
        userLogoutHandler 
      }}
    >
      {children}
    </UserContext.Provider>
  );
};