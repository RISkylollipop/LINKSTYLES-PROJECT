import React, { useState, useEffect } from 'react';
import styles from './productlist.module.css'

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const BASE_URL = import.meta.env.VITE_APP_URL;
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${BASE_URL}/api/v1/products`);
            if (!response.ok) throw new Error('Failed to fetch products');
            const data = await response.json();
            setProducts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setProducts(products.filter(p => p.id !== productId));
        }
    };

    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.error}>Error: {error}</div>;

    return (
        <div className={styles.productListContainer}>
            <h2>Product Management</h2>
            <table className={styles.productTable}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, idx) => (
                        <tr key={product.product_id}>
                            <td>{`${idx + 1}`}</td>
                            <td>{product.productName}</td>
                            <td>₦{product.price}</td>
                            <td>{product.stock}</td>
                            <td>{product.category}</td>
                            <td>
                                <button className={styles.btnEdit}>Edit</button>
                                <button className={styles.btnDelete} onClick={() => handleDelete(product.product_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;