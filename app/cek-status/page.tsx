'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CekStatus() {
  const [orderId, setOrderId] = useState('');
  const [orderData, setOrderData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Bersihkan input, barangkali user mengetik "#10" alih-alih "10"
    const cleanId = orderId.replace(/\D/g, ''); 
    
    if (!cleanId) {
      setError('Masukkan ID Pesanan yang valid (hanya angka).');
      return;
    }

    setLoading(true);
    setError('');
    setOrderData(null);

    try {
      const res = await fetch(`http://sekashoes-backend.test/api/orders/${cleanId}`, {
        headers: {
          "Accept": "application/json",
        }
      });
      const data = await res.json();

      if (data.status === 'success' && data.data) {
        setOrderData(data.data);
      } else {
        setError('Pesanan tidak ditemukan. Pastikan ID Pesanan Anda benar.');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat menghubungi server.');
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk menentukan tahapan status sepatu
  const getStatusStep = (status: string) => {
    switch (status) {
      case 'pending': return 1;
      case 'washing': return 2;
      case 'ready_for_pickup': return 3;
      case 'completed': return 4;
      default: return 0;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-sky-500 selection:text-white flex flex-col">
      
      {/* NAVBAR SIMPLE DENGAN LOGO BIRU */}
      <nav className="bg-[#1a1f2b] shadow-md border-b border-gray-800 shrink-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link href="/#beranda" className="flex items-center gap-2 group">
          
            <span className="font-extrabold text-xl tracking-tight text-white">
              Sekashoes<span className="text-sky-500">.</span>
            </span>
          </Link>
          <Link href="/#katalog" className="text-gray-300 hover:text-white text-sm font-semibold transition-colors">
            Pesan Lagi
          </Link>
        </div>
      </nav>

      {/* KONTEN UTAMA */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header Card (Latar Belakang Gelap) */}
          <div className="bg-[#1a1f2b] p-8 text-center sm:text-left relative overflow-hidden">
            
            {/* Watermark Logo Sekashoes - Tipis di kanan atas */}
            <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 opacity-10 pointer-events-none">
                <img src="/logo-seka.png" alt="Watermark" className="w-64 h-64 object-contain" />
            </div>

            {/* Aksen Cahaya Biru */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/10 blur-3xl rounded-full"></div>
            
            <h1 className="text-3xl font-extrabold text-white mb-2 relative z-10">Lacak Sepatumu</h1>
            <p className="text-gray-400 text-sm relative z-10">Masukkan ID Pesanan yang Anda dapatkan saat checkout.</p>
          </div>

          <div className="p-8">
            {/* Form Pencarian */}
            <form onSubmit={handleSearch} className="flex gap-3 mb-8">
              <div className="relative flex-grow">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 font-bold">#</span>
                <input
                  type="text"
                  placeholder="Contoh: 10"
                  className="w-full pl-8 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-900 font-semibold"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-md shadow-sky-500/20 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed shrink-0"
              >
                {loading ? 'Mencari...' : 'Cari'}
              </button>
            </form>

            {/* Pesan Error */}
            {error && (
              <div className="p-4 bg-red-50 text-red-600 border border-red-100 rounded-xl text-center font-medium text-sm mb-6 animate-pulse">
                {error}
              </div>
            )}

            {/* Hasil Pencarian (Kartu Detail Pesanan) */}
            {orderData && (
              <div className="animate-fade-in-up">
                
                {/* Visual Status Tracker dengan Warna Biru */}
                <div className="mb-10 relative">
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0 rounded-full"></div>
                  
                  {/* Garis Progres Berwarna Biru */}
                  <div 
                    className="absolute top-1/2 left-0 h-1 bg-sky-500 -translate-y-1/2 z-0 rounded-full transition-all duration-1000"
                    style={{ width: `${((getStatusStep(orderData.status) - 1) / 3) * 100}%` }}
                  ></div>

                  <div className="relative z-10 flex justify-between">
                    {[
                      { step: 1, label: 'Antre', key: 'pending' },
                      { step: 2, label: 'Dicuci', key: 'washing' },
                      { step: 3, label: 'Siap', key: 'ready_for_pickup' },
                      { step: 4, label: 'Selesai', key: 'completed' }
                    ].map((item) => {
                      const currentStep = getStatusStep(orderData.status);
                      const isPast = currentStep >= item.step;
                      const isCurrent = currentStep === item.step;
                      
                      return (
                        <div key={item.key} className="flex flex-col items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-500 ${
                            isPast ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/40' : 'bg-gray-200 text-gray-400'
                          } ${isCurrent ? 'ring-4 ring-sky-100' : ''}`}>
                            {isPast ? '✓' : item.step}
                          </div>
                          <span className={`text-xs font-semibold ${isPast ? 'text-gray-900' : 'text-gray-400'}`}>
                            {item.label}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Info Detail */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <div className="flex justify-between items-start mb-6 pb-6 border-b border-gray-200">
                    <div>
                      <p className="text-sm text-gray-500 font-medium mb-1">Nomor Pesanan</p>
                      <h3 className="text-2xl font-black text-gray-900">#{orderData.id}</h3>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        orderData.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {orderData.payment_status === 'paid' ? 'LUNAS' : 'BELUM BAYAR'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                    <div>
                      <p className="text-gray-500 mb-1">Merek Sepatu</p>
                      <p className="font-bold text-gray-900">{orderData.shoe_brand}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Warna</p>
                      <p className="font-bold text-gray-900">{orderData.shoe_color}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Layanan</p>
                      <p className="font-bold text-gray-900">{orderData.service?.name || 'Paket Reguler'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Total Biaya</p>
                      <p className="font-black text-sky-600">Rp {Number(orderData.total_price).toLocaleString('id-ID')}</p>
                    </div>
                    {orderData.notes && (
                      <div className="col-span-2 mt-2 p-3 bg-white rounded-lg border border-gray-100">
                        <p className="text-gray-500 text-xs mb-1">Catatan Pelanggan:</p>
                        <p className="font-medium text-gray-700 italic">"{orderData.notes}"</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </main>

      {/* Custom Styles untuk Animasi */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}} />
    </div>
  );
}