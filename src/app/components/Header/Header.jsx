'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useAuth from "../../hooks/useAuth";
import styles from './Header.module.css';

export default function Header() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();
  
  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className={styles.header}>
      <div className={`${styles.container} ${styles.headerContainer}`}>
        <Link href="/" className={styles.logo}>
          Style<span className={styles.logoAccent}>Hub</span>
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/products" className={styles.navLink}>Products</Link>
          <Link href="/about" className={styles.navLink}>About</Link>
        </nav>
        <div className={styles.navIcons}>
          <div className={styles.navIconsGroup}>
            {isAuthenticated ? (
              <>
                <button onClick={() => router.push('/create')} className={styles.navIcon}>
                  <span className={styles.iconText}>Create</span>
                </button>
                <button onClick={() => router.push('/checkout')} className={styles.navIcon}>
                  <span className={styles.iconText}>Favourites</span>
                </button>
                <button onClick={handleLogout} className={styles.navIcon}>
                  <span className={styles.iconText}>Logout</span>
                </button>
              </>
            ) : (
              <>
                <button onClick={() => router.push('/login')} className={styles.navIcon}>
                  <span className={styles.iconText}>Login</span>
                </button>
                <button onClick={() => router.push('/register')} className={styles.navIcon}>
                  <span className={styles.iconText}>Register</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}