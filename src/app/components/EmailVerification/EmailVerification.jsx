'use client'
import styles from './EmailVerification.module.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '@/app/services/supabaseClient';

export default function EmailVerification() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [resendMessage, setResendMessage] = useState('');
  

  
  useEffect(() => {
    const storedEmail = localStorage.getItem('verificationEmail');
    
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      setEmail('your email address');
    }
    
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          setResendDisabled(false);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const handleResendEmail = async () => {
    setResendMessage('');
    setCountdown(60);
    setResendDisabled(true);
    
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email
      });
      
      if (error) {
        setResendMessage(`Error: ${error.message}`);
      } else {
        setResendMessage('Verification email resent successfully!');
      }
    } catch (err) {
      setResendMessage(`An unexpected error occurred: ${err.message}`);
    }
    
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          setResendDisabled(false);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
  };

  return (
    <section className={styles.registerSection}>
      <div className="container">
        <div className={styles.authContainer}>
          <div className={styles.registerContent}>
            <div className={styles.emailIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </div>
            <h1>Check Your Inbox</h1>
            <p className={styles.registerSubtitle}>
              We've sent a verification email to <strong>{email}</strong>
            </p>
            <div className={styles.inboxInstructions}>
              <p>Please check your email and click on the verification link to activate your account.</p>
              <p>If you don't see the email, check your spam folder or request a new verification link.</p>
            </div>
            
            {resendMessage && (
              <div className={resendMessage.includes('Error') 
                ? styles.errorMessage 
                : styles.successMessage}>
                {resendMessage}
              </div>
            )}
            
            <div className={styles.inboxActions}>
              <button 
                onClick={handleResendEmail} 
                className={`${styles.secondaryBtn} ${resendDisabled ? styles.disabled : ''}`}
                disabled={resendDisabled}
              >
                {resendDisabled ? `Resend email (${countdown}s)` : 'Resend email'}
              </button>
              
              <button onClick={() => router.push('/login')} className={styles.primaryBtn}>
                Return to login
              </button>
            </div>
            
            <p className={styles.loginLink}>
              Need help? <Link href="/contact">Contact Support</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}