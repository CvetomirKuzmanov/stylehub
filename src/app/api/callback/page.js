'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../services/supabaseClient';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      console.log('Auth callback session data:', data);
      
      if (error) {
        console.error('Error in auth callback:', error);
        router.push('/login?error=Authentication%20failed');
        return;
      }
      
      if (data?.session) {
        router.push('/'); 
      } else {
        router.push('/login');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh' 
    }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Completing authentication...</h2>
        <p>Please wait while we verify your login.</p>
      </div>
    </div>
  );
}