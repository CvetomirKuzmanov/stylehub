'use client';
import { useEffect } from 'react';
import { useProducts } from '../../hooks/useProducts';
import HomeList from './HomeList';
import styles from './Home.module.css'
import HomeHero from './HomeHero';

export default function ProductsProvider({ initialProducts = [] }) {
  const {
    products,
    isLoading,
    error,
    fetchProducts,
  } = useProducts(initialProducts || []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <HomeHero />
      <section className={styles.products}>
        <div className={styles.container}>

          <h2 className={styles.sectionTitle}>Featured Products</h2>

          <HomeList
            products={products}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </section>
    </>


  );
}