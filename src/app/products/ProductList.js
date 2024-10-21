import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import ProductItem from './ProductItem';

const ProductList = ({ user }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true); // Start loading
            setError(null); // Reset error state
            try {
                const querySnapshot = await getDocs(collection(db, 'products'));
                const productsList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProducts(productsList);
            } catch (error) {
                console.error("Error fetching products: ", error);
                setError("Failed to fetch products.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts().catch(error => {
            console.error('Failed to fetch products:', error);
        });
    }, []);

    return (
        <div>
            {loading ? (
                <p>Loading products...</p>
            ) : error ? (
                <p>{error}</p>
            ) : products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <ul>
                    {products.map((product) => (
                        <ProductItem key={product.id} product={product} user={user} setProducts={setProducts} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProductList;
