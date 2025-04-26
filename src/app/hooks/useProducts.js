"use client";

import { useState, useCallback } from "react";

export function useProducts(initialProducts = []) {
    const [products, setProducts] = useState(initialProducts);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProducts = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/products");
            
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }

            const data = await response.json();
            setProducts(data);
        } catch (err) {
            setError(err.message);
            console.error("Error fetching products", err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const createProduct = useCallback(async (productData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch ('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error (errorData.error || 'Failed to create product' )
            }

            const newProduct = await response.json()
            setProducts (prevproducts => [newProduct, ...prevproducts])
            return newProduct
        } catch (err) {
            setError(err.message)
            console.error('Error creating product', err)
            throw err
        } finally {
            setIsLoading(false);
        }
    }, []);

    const deleteProduct = useCallback(async (id)=> {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch (`/api/products/${id}`, {
                method: 'DELETE'
            })

            if (!response.ok) {
                throw new Error ('Failed to delete product')
            }

            setProducts(prevproducts => prevproducts.filter(product => product.id !== id))
        } catch (err) {
            setError (err.message)
            console.error('Error deleting product', err)
        }finally{ 
            setIsLoading (false)
        }
    }, [])

    return {
        products,
        isLoading,
        error,
        fetchProducts,
        createProduct,
        deleteProduct
    }
}

