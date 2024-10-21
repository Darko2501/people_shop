import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

const ProductItem = ({ product, setProducts }) => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [updatedProduct, setUpdatedProduct] = useState({
        name: product.name,
        price: product.price,
        description: product.description,
        phone: product.phone,
    });
    const [loading, setLoading] = useState(false);


    const isUserOwner = user && user.email === product.userName;

    const handleDelete = async (id) => {
        if (!isUserOwner) {
            alert("You do not have permission to delete this product.");
            return;
        }
        if (loading) return;
        setLoading(true);
        try {
            await deleteDoc(doc(db, 'products', id));
            setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
        } catch (error) {
            console.error("Error deleting product: ", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (id) => {
        if (!isUserOwner) {
            alert("You do not have permission to update this product.");
            return;
        }
        if (loading) return; // Prevent multiple clicks
        if (!updatedProduct.name || !updatedProduct.price || !updatedProduct.description || !updatedProduct.phone) {
            alert("Please fill in all fields.");
            return;
        }

        setLoading(true);
        try {
            await updateDoc(doc(db, 'products', id), updatedProduct);
            setProducts(prevProducts =>
                prevProducts.map(p => (p.id === id ? { ...p, ...updatedProduct } : p))
            );
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating product: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <li className="p-4 border border-gray-300 rounded-lg my-2 bg-white shadow-sm">
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={updatedProduct.name}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                        className="border p-2 rounded-md w-full mb-2"
                        placeholder="Product Name"
                    />
                    <input
                        type="number"
                        value={updatedProduct.price}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: parseFloat(e.target.value) })}
                        className="border p-2 rounded-md w-full mb-2"
                        placeholder="Price"
                    />
                    <textarea
                        value={updatedProduct.description}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
                        className="border p-2 rounded-md w-full mb-2"
                        placeholder="Description"
                    />
                    <input
                        type="text"
                        value={updatedProduct.phone}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, phone: e.target.value })}
                        className="border p-2 rounded-md w-full mb-2"
                        placeholder="Phone Number"
                    />
                    <div className="mt-2">
                        <button
                            onClick={() => handleUpdate(product.id)}
                            disabled={loading}
                            className={`px-4 py-2 font-bold rounded-md transition-colors mr-2 ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                        >
                            {loading ? "Updating..." : "Update"}
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 bg-gray-400 text-white font-bold rounded-md hover:bg-gray-500 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <p className="text-gray-700">Price: ${product.price}</p>
                    <p className="text-gray-600">Description: {product.description}</p>
                    <p className="text-gray-600">Posted by: {product.userName}</p>
                    <p className="text-gray-600">Phone: {product.phone}</p>
                    {isUserOwner && (
                        <div className="mt-2">
                            <button
                                onClick={() => handleDelete(product.id)}
                                disabled={loading}
                                className={`px-4 py-2 font-bold rounded-md transition-colors mr-2 ${loading ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600 text-white'}`}
                            >
                                {loading ? "Deleting..." : "Delete"}
                            </button>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 bg-yellow-500 text-white font-bold rounded-md hover:bg-yellow-600 transition-colors"
                            >
                                Edit
                            </button>
                        </div>
                    )}
                </div>
            )}
        </li>
    );
};

export default ProductItem;

