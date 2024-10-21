'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsList);
      } catch (error) {
        setError("Error fetching products: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-black mb-4 text-center">People strore</h1>
        <h1 className="text-3xl font-bold mb-4">All Products</h1>
        {loading ? (
            <p>Loading products...</p>
        ) : error ? (
            <p className="text-red-500">{error}</p>
        ) : products.length === 0 ? (
            <p>No products found.</p>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.map(({id, name, price, description, phone, userName}) => (
                  <div key={id}
                       className="border rounded-lg shadow-md overflow-hidden bg-white transition-transform transform hover:scale-105">
                    <div className="p-4">
                      <h2 className="text-xl font-semibold">{name}</h2>
                      <p className="text-gray-700">Price: ${price}</p>
                      <p className="text-gray-600">Description: {description}</p>
                      <p className="text-gray-600">Posted by: {userName}</p>
                      <p className="text-gray-600">Phone: {phone}</p>

                    </div>
                  </div>
              ))}
            </div>
        )}
      </div>
  )
      ;
};

export default HomePage;
