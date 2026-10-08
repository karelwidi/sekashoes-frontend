'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id; 

  const [order, setOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // State untuk efek tombol Salin (Copy)
  const [copied, setCopied] = useState(false);

  // Nomor WA Admin (Awali dengan 62)
  const adminWhatsApp = "6281234567890"; 

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      try {
        const res = await fetch(`http://sekashoes-backend.test/api/orders/${id}`, {
          headers: { "Accept": "application/json" }
        });
        const data = await res.json();

        if (data.status === 'success' && data.data) {
          setOrder(data.data);
        } else {
          setError('Pesanan tidak ditemukan.');
        }
      } catch (err) {
        setError('Terjadi kesalahan saat memuat data pesanan.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleConfirmWA = () => {
    if (!order) return;
    const pesan = `Halo Admin Sekashoes, saya ingin konfirmasi pembayaran untuk pesanan saya:\n\n*ID Pesanan:* #${order.id}\n*Sepatu:* ${order.shoe_brand} (${order.shoe_color})\n*Total Pembayaran:* Rp ${Number(order.total_price).toLocaleString('id-ID')}\n\nBerikut saya lampirkan bukti transfernya.`;
    const url = `https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(pesan)}`;
    window.open(url, '_blank');
  };

  // Fungsi untuk menyalin ID ke Clipboard
  const handleCopyId = () => {
    if (!order) return;
    navigator.clipboard.writeText(order.id.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Kembali normal setelah 2 detik
  };

  if (loading) {
    return <div className="min-h-screen bg-[#1e1e24] flex items-center justify-center text-sky-500 font-bold animate-pulse">Memuat halaman pembayaran...</div>;
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#1e1e24] flex flex-col items-center justify-center text-white p-6 text-center">
        <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </div>
        <h1 className="text-2xl font-bold mb-2">Waduh, Pesanan Tidak Ditemukan</h1>
        <p className="text-gray-400 mb-6">{error}</p>
        <button onClick={() => router.push('/')} className="bg-sky-500 hover:bg-sky-600 px-6 py-2 rounded-xl font-bold transition-colors">Kembali ke Beranda</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-12 selection:bg-sky-500 selection:text-white">
      {/* NAVBAR */}
      <nav className="bg-[#1e1e24] shadow-md border-b border-gray-800 shrink-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link href="/#beranda" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center font-black text-white transition-transform group-hover:scale-110 shadow-lg shadow-sky-500/20">S</div>
            <span className="font-extrabold text-xl tracking-tight text-white">Sekashoes<span className="text-sky-500">.</span></span>
          </Link>
          <div className="text-gray-300 text-sm font-semibold">Detail & Pembayaran</div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">Selesaikan Pembayaran Anda</h1>
          <p className="text-gray-500">Segera lakukan pembayaran agar sepatu kesayangan Anda bisa langsung kami proses.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* KOLOM KIRI: RINGKASAN PESANAN */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
              <svg className="w-6 h-6 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              Ringkasan Pesanan
            </h2>
            
            <div className="space-y-5">
              
              {/* KOTAK ID PESANAN YANG DIPERJELAS & ADA TOMBOL COPY */}
              <div className="bg-sky-50/50 border border-sky-100 p-4 rounded-2xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 font-semibold text-sm">ID Pesanan Anda</span>
                  <button 
                    onClick={handleCopyId}
                    className="flex items-center gap-1.5 text-xs font-bold bg-white border border-sky-200 text-sky-600 px-3 py-1.5 rounded-lg hover:bg-sky-100 transition-colors shadow-sm"
                  >
                    {copied ? (
                      <><svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg> Disalin!</>
                    ) : (
                      <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> Salin ID</>
                    )}
                  </button>
                </div>
                <div className="text-3xl font-black text-sky-700">#{order.id}</div>
              </div>

              {/* KOTAK PERINGATAN PENTING */}
              <div className="flex gap-3 bg-yellow-50 border border-yellow-200 p-3.5 rounded-xl text-yellow-800 text-sm">
                <svg className="w-6 h-6 text-yellow-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <p>
                  <strong className="font-bold block mb-0.5">Penting!</strong>
                  Harap salin atau <i>screenshot</i> ID Pesanan di atas. Anda membutuhkannya untuk mengecek status pengerjaan sepatu Anda nanti.
                </p>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-gray-500">Sepatu</span>
                <span className="font-semibold text-gray-900 text-right">{order.shoe_brand} <br/><span className="text-xs text-gray-400">({order.shoe_color})</span></span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Layanan</span>
                <span className="font-semibold text-gray-900">{order.service?.name || 'Paket Treatment'}</span>
              </div>
              
              <div className="pt-6 mt-2 border-t border-dashed border-gray-200">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-gray-500 font-medium">Total Tagihan</span>
                  <span className="text-3xl font-black text-sky-600">
                    Rp {Number(order.total_price).toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Status Pembayaran</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    order.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600 animate-pulse'
                  }`}>
                    {order.payment_status === 'paid' ? 'LUNAS' : 'MENUNGGU PEMBAYARAN'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: METODE PEMBAYARAN */}
          <div className="lg:col-span-7 bg-[#1e1e24] rounded-3xl p-8 shadow-xl text-white relative">
            <h2 className="text-xl font-bold mb-8 text-white border-b border-gray-700 pb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              Metode Pembayaran
            </h2>

            {order.payment_status === 'paid' ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Pembayaran Berhasil!</h3>
                <p className="text-gray-400 mb-6">Terima kasih, pesanan Anda sedang kami proses.</p>
                <Link href="/cek-status" className="inline-block bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-sky-500/20">
                  Lacak Pesanan Saya
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8 items-start">
                
                {/* QRIS Container */}
                <div className="bg-white p-4 rounded-2xl flex flex-col items-center text-center overflow-hidden h-full">
                  <div className="w-full bg-blue-900 text-white font-bold text-sm py-2 rounded-t-lg mb-4">
                    QRIS All Payment
                  </div>
                  <img 
                    src="/qris-sekashoes.jpeg" 
                    alt="QRIS Sekashoes" 
                    className="w-full h-auto object-cover rounded-md mb-2 shadow-sm"
                  />
                  <p className="text-xs text-gray-500 font-semibold mt-2">
                    Scan dari aplikasi M-Banking atau E-Wallet
                  </p>
                </div>

                {/* Transfer Manual & Konfirmasi */}
                <div className="space-y-6 h-full flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Atau Transfer Manual ke:</p>
                    <div className="bg-[#2a2a32] p-4 rounded-xl border border-gray-700">
                      <div className="font-bold text-sky-400 text-lg">BCA - 1234567890</div>
                      <div className="text-sm text-gray-300">a.n. Sekashoes Official</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <p className="text-sm text-gray-400 mb-3">Sudah melakukan pembayaran?</p>
                    <button 
                      onClick={handleConfirmWA}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 group"
                    >
                      <svg className="w-6 h-6 transform group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z"/></svg>
                      Konfirmasi via WhatsApp
                    </button>
                    <p className="text-xs text-center text-gray-500 mt-3">
                      Langkah ini sekaligus mencatat ID Pesanan di WhatsApp Anda.
                    </p>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}