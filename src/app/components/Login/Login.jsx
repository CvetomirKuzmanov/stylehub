'use client';

import styles from './Login.module.css';
import { useState } from 'react';
import { signInUser } from '../../services/authService';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';

export default function Login() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const loginAction = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { data, error } = await signInUser(email, password);

      if (error) {
        setError(error.message);
        toast.error(error.message);
      } else {
        toast.success('Login successful!');
        router.push('/'); // Redirect after successful login
      } 
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.loginSection}>
      <div className="container">
        <div className={styles.authContainer}>
          <div className={styles.authTabs}>
            <div onClick={() => router.push("/login")} className={`${styles.authTab} ${styles.active}`}>
              Sign In
            </div>
            <div onClick={() => router.push("/register")} className={styles.authTab}>
              Create Account
            </div>
          </div>
          <div className={styles.loginContent}>
            <h1>Sign In</h1>
            <p className={styles.loginSubtitle}>Welcome back to your StyleHub account</p>
            <form onSubmit={loginAction} className={styles.loginForm}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
              <button 
                type="submit" 
                className={styles.primaryBtn} 
                
              >
                {isSubmitting ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
            <p className={styles.registerLink}>
              Don't have an account? <Link href="/register">Create Account</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
