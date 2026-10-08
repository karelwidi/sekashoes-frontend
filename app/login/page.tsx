'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('http://sekashoes-backend.test/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok && data.token) {
                // Berhasil login! Simpan kunci (token) di dalam Local Storage browser
                localStorage.setItem('admin_token', data.token);
                
                // Lempar admin masuk ke dalam dasbor
                router.push('/admin/orders');
            } else {
                setError(data.message || 'Email atau password salah!');
            }
        } catch (err) {
            setError('Gagal terhubung ke server backend.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900">Admin Login</h1>
                    <p className="text-gray-500 mt-2">Masuk untuk mengelola pesanan Sekashoes</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-6 text-center font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="flex flex-col gap-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-blue-600"
                            placeholder="admin@sekashoes.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-blue-600"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gray-900 text-white py-3 mt-2 rounded-xl font-bold hover:bg-blue-600 transition-colors disabled:bg-gray-400"
                    >
                        {loading ? 'Memeriksa...' : 'Masuk ke Dasbor'}
                    </button>
                </form>
            </div>
        </div>
    );
}