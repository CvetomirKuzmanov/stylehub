'use client';


import styles from './Home.module.css';
import Product from '../Products/Product/Product';

export default function HomeList({ products, isLoading, error }) {
	console.log (products)
	if (isLoading) {
		return (
			<div className={styles.noProductsMessage}>
				<p>Loading products available at the moment.</p>
			</div>
		)
	}
	if (error) {
		return (
			<div className={styles.noProductsMessage}>
				<p>There was an error!</p>
				<p>{error}</p>
			</div>
		)
	}
	if (products.length === 0) {
		return (
			<div className={styles.noProductsMessage}>
				<p>No products available at the moment.</p>
				<p>Please check back later for our latest arrivals.</p>
			</div>
		)
	}
	return (

		<div className={styles.productGrid}>
			{products.map((product) => (
				<Product
					product={product}
					key={product.id}
				/>
			))}

		</div>

	);
}