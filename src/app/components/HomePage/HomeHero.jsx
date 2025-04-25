'use client'

import Link from 'next/link';
import styles from './Home.module.css';

export default function HomeHero() {
    return (
        <>
            <section className={styles.hero}>
                <div className={styles.container}>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>Summer Collection 2025</h1>
                        <p className={styles.heroDescription}>
                            Discover the latest trends in fashion and explore our new collection of clothing that defines style and comfort.
                        </p>
                        <Link href="/catalog" className={styles.heroBtn}>
                            Shop Now
                        </Link>
                    </div>
                </div>
            </section>
        </>

    )
}
