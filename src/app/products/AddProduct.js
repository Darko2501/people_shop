import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { useAuth } from '@/context/AuthContext';

const AddProduct = ({ onProductAdded }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { user } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const newProduct = {
            name,
            price: parseFloat(price),
            description,
            userName: user.displayName || user.email,
            phone,
        };

        try {
            await addDoc(collection(db, 'products'), newProduct);
            onProductAdded();
            setName('');
            setPrice('');
            setDescription('');
            setPhone('');
        } catch (error) {
            console.error("Error adding product: ", error);
            setError('Failed to add product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg bg-white shadow-md">
            <h3 className="text-2xl font-bold text-center mb-4">Add New Product</h3>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="productName" className="block font-medium mb-1">Product Name</label>
                    <input
                        id="productName"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter product name"
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="productPrice" className="block font-medium mb-1">Price</label>
                    <input
                        id="productPrice"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter product price"
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="productDescription" className="block font-medium mb-1">Description</label>
                    <textarea
                        id="productDescription"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter product description"
                        required
                        rows="4"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="productPhone" className="block font-medium mb-1">Phone</label>
                    <input
                        id="productPhone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your phone number"
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full p-2 ${loading ? 'bg-gray-400' : 'bg-blue-500'} text-white font-bold rounded-md hover:bg-blue-600 transition-colors`}
                >
                    {loading ? 'Adding...' : 'Add Product'}
                </button>
            </form>
        </div>
    );
};

export default AddProduct;

