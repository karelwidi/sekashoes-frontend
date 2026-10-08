'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Order = {
    id: number;
    shoe_brand: string;
    shoe_color: string;
    phone_number?: string;
    notes: string;
    status: string;
    payment_status: string;
    total_price: number;
    user?: { name: string };
};

export default function AdminDashboard() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false); 
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (!token) {
            router.push('/login');
        } else {
            setIsAuthorized(true);
        }
    }, [router]);

    const fetchOrders = async () => {
        try {
            const res = await fetch("http://sekashoes-backend.test/api/orders", {
                headers: {
                    "Accept": "application/json",
                }
            });
            
            const response = await res.json();
            
            if (response.status === 'success' && Array.isArray(response.data)) {
                setOrders(response.data);
            } else if (Array.isArray(response)) {
                setOrders(response);
            }
        } catch (error) {
            console.error("Gagal mengambil data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthorized) {
            fetchOrders();
        }
    }, [isAuthorized]);

    const updateStatus = async (id: number, newStatus: string) => {
        try {
            const res = await fetch(`http://sekashoes-backend.test/api/orders/${id}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({ status: newStatus }),
            });
            
            const data = await res.json();
            if (data.status === "success") {
                fetchOrders(); 
            } else {
                alert("Gagal memperbarui status pengerjaan");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Terjadi kesalahan jaringan");
        }
    };

    const updatePaymentStatus = async (id: number, newPaymentStatus: string) => {
        const confirmUpdate = window.confirm("Apakah Anda yakin dana sudah masuk dan pesanan ini LUNAS?");
        if (!confirmUpdate) return;

        try {
            const res = await fetch(`http://sekashoes-backend.test/api/orders/${id}/payment`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({ payment_status: newPaymentStatus }),
            });
            
            const data = await res.json();
            if (data.status === "success") {
                fetchOrders(); 
            } else {
                alert("Gagal memperbarui status pembayaran.");
            }
        } catch (error) {
            console.error("Error updating payment status:", error);
            alert("Terjadi kesalahan jaringan");
        }
    };

    // FUNGSI BARU: Menghapus Pesanan
    const deleteOrder = async (id: number) => {
        const confirmDelete = window.confirm("Peringatan: Apakah Anda yakin ingin menghapus pesanan ini secara permanen? Data yang dihapus tidak dapat dikembalikan.");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`http://sekashoes-backend.test/api/orders/${id}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                },
            });
            
            const data = await res.json();
            if (data.status === "success") {
                fetchOrders(); // Muat ulang tabel jika sukses dihapus
            } else {
                alert("Gagal menghapus pesanan.");
            }
        } catch (error) {
            console.error("Error deleting order:", error);
            alert("Terjadi kesalahan jaringan");
        }
    };

    const handleSendWhatsApp = (order: Order) => {
        if (!order.phone_number) {
            alert("Nomor WhatsApp pelanggan tidak tersedia pada pesanan ini!");
            return;
        }

        let phone = order.phone_number.trim();
        if (phone.startsWith('0')) {
            phone = '62' + phone.slice(1);
        }

        let statusText = "sedang diproses";
        if (order.status === 'washing') {
            statusText = "sedang dicuci oleh tim profesional kami";
        } else if (order.status === 'ready_for_pickup') {
            statusText = "sudah selesai dikerjakan dan siap untuk diambil";
        } else if (order.status === 'completed') {
            statusText = "telah selesai dan diserahkan. Terima kasih!";
        } else if (order.status === 'pending') {
            statusText = "sedang dalam antrean pengerjaan";
        }

        let promoText = "";
        if (order.status === 'completed') {
            promoText = "\n\nSebagai apresiasi kami, tunjukkan pesan ini pada kunjungan berikutnya untuk mendapatkan *Diskon 10%* perawatan selanjutnya!";
        }

        const pesan = `Halo! Update terbaru dari *Sekashoes*.\n\nSepatu *${order.shoe_brand}* (${order.shoe_color}) Anda saat ini *${statusText}*.\n\nTerima kasih sudah mempercayakan perawatan sepatu Anda kepada kami!${promoText}`;

        const url = `https://wa.me/${phone}?text=${encodeURIComponent(pesan)}`;
        window.open(url, '_blank');
    };

    if (!isAuthorized) return <div className="p-8 text-center text-white bg-[#1e1e24] min-h-screen flex items-center justify-center font-bold animate-pulse">Memeriksa akses masuk...</div>;

    if (loading) return <div className="p-8 text-center text-sky-500 bg-[#1e1e24] min-h-screen flex items-center justify-center font-bold animate-pulse">Memuat dasbor...</div>;

    return (
        <div className="min-h-screen bg-[#1e1e24] text-white p-4 sm:p-8 selection:bg-sky-500 selection:text-white">
            <div className="max-w-7xl mx-auto">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-gray-700 pb-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-100 flex items-center gap-3">
                            <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-white text-lg">S</div>
                            Dasbor Admin
                        </h1>
                        <p className="text-sm text-gray-400 mt-1">Kelola status pengerjaan cuci sepatu pelanggan.</p>
                    </div>
                    <div className="flex flex-wrap gap-3 w-full md:w-auto">
                        <button 
                            onClick={fetchOrders}
                            className="flex-1 md:flex-none bg-sky-500 hover:bg-sky-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-md shadow-sky-500/20"
                        >
                            Muat Ulang
                        </button>
                        <button 
                            onClick={() => {
                                localStorage.removeItem('admin_token');
                                router.push('/login');
                            }}
                            className="flex-1 md:flex-none bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors border border-red-500/20 hover:border-red-500"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                <div className="bg-[#2a2a32] rounded-2xl shadow-xl border border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto w-full">
                        <table className="w-full text-left border-collapse min-w-[950px]">
                            <thead>
                                <tr className="bg-[#1a1f2b] text-gray-400 text-xs uppercase tracking-wider border-b border-gray-700">
                                    <th className="p-4 sm:p-5 font-semibold">ID</th>
                                    <th className="p-4 sm:p-5 font-semibold">Sepatu & Kontak</th>
                                    <th className="p-4 sm:p-5 font-semibold">Catatan</th>
                                    <th className="p-4 sm:p-5 font-semibold">Pembayaran</th>
                                    <th className="p-4 sm:p-5 font-semibold">Status</th>
                                    <th className="p-4 sm:p-5 font-semibold text-center">Aksi / Ubah Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700/50 text-sm">
                                {orders.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="p-10 text-center text-gray-500 font-medium">
                                            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-600">
                                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                                            </div>
                                            Belum ada pesanan yang masuk.
                                        </td>
                                    </tr>
                                ) : (
                                    orders.map((order) => (
                                        <tr key={order.id} className="hover:bg-[#32323d] transition-colors">
                                            <td className="p-4 sm:p-5 font-black text-sky-400">#{order.id}</td>
                                            <td className="p-4 sm:p-5">
                                                <div className="font-bold text-gray-100">{order.shoe_brand}</div>
                                                <div className="text-xs text-gray-400 mt-0.5">Warna: {order.shoe_color}</div>
                                                {order.phone_number && (
                                                    <div className="text-xs font-semibold text-green-400 mt-1.5 flex items-center gap-1">
                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z"/></svg>
                                                        {order.phone_number}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="p-4 sm:p-5 text-gray-400 italic text-xs max-w-[200px] truncate" title={order.notes}>
                                                {order.notes || '-'}
                                            </td>
                                            
                                            <td className="p-4 sm:p-5">
                                                {order.payment_status === 'paid' ? (
                                                    <span className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase bg-green-500/10 text-green-400 border border-green-500/20">
                                                        LUNAS
                                                    </span>
                                                ) : (
                                                    <button 
                                                        onClick={() => updatePaymentStatus(order.id, 'paid')}
                                                        className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase bg-yellow-500 hover:bg-yellow-400 text-yellow-950 transition-colors shadow-sm whitespace-nowrap"
                                                        title="Tandai pembayaran telah diterima"
                                                    >
                                                        Tandai Lunas
                                                    </button>
                                                )}
                                            </td>

                                            <td className="p-4 sm:p-5">
                                                <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-800 text-gray-300 uppercase border border-gray-600">
                                                    {order.status.replace(/_/g, ' ')}
                                                </span>
                                            </td>
                                            <td className="p-4 sm:p-5 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <select
                                                        className="border border-gray-600 rounded-lg p-2 text-sm bg-[#1e1e24] text-gray-200 outline-none focus:border-sky-500 cursor-pointer font-medium"
                                                        value={order.status}
                                                        onChange={(e) => updateStatus(order.id, e.target.value)}
                                                    >
                                                        <option value="pending">Tertunda</option>
                                                        <option value="washing">Sedang Dicuci</option>
                                                        <option value="ready_for_pickup">Siap Diambil</option>
                                                        <option value="completed">Selesai</option>
                                                    </select>

                                                    <button
                                                        onClick={() => handleSendWhatsApp(order)}
                                                        className="bg-green-600 hover:bg-green-500 text-white p-2 rounded-lg transition-colors shadow-md flex items-center justify-center shrink-0"
                                                        title="Kirim pesan WhatsApp"
                                                    >
                                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z"/></svg>
                                                    </button>

                                                    {/* TOMBOL HAPUS BARU */}
                                                    <button
                                                        onClick={() => deleteOrder(order.id)}
                                                        className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-lg transition-colors border border-red-500/20 hover:border-red-500 flex items-center justify-center shrink-0"
                                                        title="Hapus Pesanan Permanen"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                    </button>

                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}