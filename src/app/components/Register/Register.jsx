'use client'
import styles from './Register.module.css';
import { signUpUser, signInWithGoogle } from '../../services/authService';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setIsSubmitting(true);
    const { error } = await signUpUser(email, password);
    if (error) {
      setError(error.message);
    } else {
      localStorage.setItem('verificationEmail', email);
      router.push('/emailverification');
    }
    setIsSubmitting(false);
  }

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsGoogleSubmitting(true);
    try {
      const { data, error } = await signInWithGoogle();
      if (error) {
        setError(error.message);
      }
n
    } catch (err) {
      setError(err.message || 'An error occurred with Google sign in');
    } finally {
      setIsGoogleSubmitting(false);
    }
  }

  return (
    <section className={styles.registerSection}>
      <div className="container">
        <div className={styles.authContainer}>
          <div className={styles.authTabs}>
            <div onClick={() => router.push("/login")} className={styles.authTab}>Sign In</div>
            <div onClick={() => router.push("/register")} className={`${styles.authTab} ${styles.active}`}>Create Account</div>
          </div>
          <div className={styles.registerContent}>
            <h1>Create Your Account</h1>
            <p className={styles.registerSubtitle}>Join StyleHub for a personalized shopping experience</p>
            
            <div className={styles.socialAuth}>
              <button 
                type="button" 
                className={styles.googleBtn} 
                onClick={handleGoogleSignIn}
                disabled={isGoogleSubmitting}
              >
                {isGoogleSubmitting ? 'Connecting...' : 'Continue with Google'}
              </button>
            </div>
            
            <div className={styles.orDivider}>
              <span>OR</span>
            </div>
            
            <form className={styles.registerForm} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <span className={styles.passwordHint}>Password must be at least 8 characters</span>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  name="confirm-password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
              <button type="submit" className={styles.primaryBtn} disabled={isSubmitting}>
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
            <p className={styles.loginLink}>
              Already have an account? <Link href="/login">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}