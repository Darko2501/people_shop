'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { useAuth } from '@/context/AuthContext';
import ProductList from './ProductList';
import AddProduct from './AddProduct';

const ProductsPage = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'products'));
            const productsList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProducts(productsList);
        } catch (error) {
            console.error("Error fetching products: ", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleProductAdded = () => {
        fetchProducts();
    };

    return (
        <div>
            <h1 className="text-4xl font-black mb-4 text-center">People strore</h1>

            {user && <AddProduct onProductAdded={handleProductAdded}/>}
            <h2 className="text-2xl font-bold mb-4">Products List</h2>
            <ProductList products={products} user={user}/>
        </div>
    );
};

export default ProductsPage;

