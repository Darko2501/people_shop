'use client'
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { user, logout, loading } = useAuth();

    if (loading) {
        return (
            <header className="bg-gray-800 text-white p-4">
                <h1 className="text-2xl font-bold text-center">PEOPLE STORE</h1>
                <p className="text-center">Loading...</p>
            </header>
        );
    }

    return (
        <header className="bg-gray-800 text-white p-4">
            <h1 className="text-2xl font-bold text-center">PEOPLE STORE</h1>
            <nav className="mt-2">
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    {user ? (
                        <>
                            <li>
                                <button onClick={logout} className="text-white">Logout</button>
                            </li>
                            <li>
                                <Link href="/products">Your Products</Link>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link href="/auth">Login/Register</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
