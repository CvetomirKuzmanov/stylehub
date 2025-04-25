'use client';

import Link from 'next/link';
import Image from 'next/image';
// import { toast } from 'react-toastify';
// import { useStore } from '@/contexts/StoreContext';
// import useAuth from '@/hooks/useAuth';
import styles from './Product.module.css';

export default function Product({ product }) {

  //   const { addToCart } = useStore();
  //   const { isAuthenticated } = useAuth();

  //   const handleAddToCart = () => {
  //     if (!isAuthenticated) {
  //       toast.error('Please login to add items to cart');
  //       return;
  //     }
  //     addToCart(_id);
  //   };
  console.log('product works', product)
  return (
    <div className={styles.productCard} key={product.id}>
      <div className={styles.productImg}>
        <Link href={`/products/${product.name}/details`}>
          <div className={styles.imageWrapper}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ objectFit: 'contain' }}
            />
          </div>
        </Link>
        <div className={styles.productActions}>
          <Link href={`/products/${product.id}/details`}>
            <div className={styles.productActionBtn}>👁️</div>
          </Link>
          {/* <div className={styles.productActionBtn} onClick={handleAddToCart}>❤️</div> */}
        </div>
      </div>
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{product.name}</h3>
        <div className={styles.productPrice}>
          <span className={styles.currentPrice}>${product.price}</span>
        </div>
      </div>
    </div>
  );
}