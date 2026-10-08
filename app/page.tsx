'use client';

import Link from 'next/link';
import ServiceList from './ServiceList'; 
import { useEffect } from 'react';

export default function Home() {
  // Fungsi untuk smooth scrolling saat menu navbar diklik
  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', handleSmoothScroll as EventListener);
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll as EventListener);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-sky-500 selection:text-white">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 w-full z-40 bg-[#1a1f2b]/95 backdrop-blur-md border-b border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              {/* Ikon Logo diganti warna Biru */}
          
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Sekashoes<span className="text-sky-500">.</span>
              </span>
            </div>
            
            {/* MENU TENGAH */}
            <div className="hidden md:flex gap-8 text-sm font-semibold text-gray-300">
              <a href="#beranda" className="hover:text-sky-400 transition-colors">Beranda</a>
              <a href="#informasi" className="hover:text-sky-400 transition-colors">Tentang Kami</a>
              <a href="#edukasi" className="hover:text-sky-400 transition-colors">Edukasi</a>
              <a href="#katalog" className="hover:text-sky-400 transition-colors">Layanan</a>
              <a href="#kontak" className="hover:text-sky-400 transition-colors">Kontak</a>
            </div>

            <div className="flex gap-4">
              <Link 
                href="/cek-status" 
                className="hidden sm:flex text-gray-300 hover:text-sky-400 font-semibold px-4 py-2 transition-colors text-sm items-center"
              >
                Lacak Pesanan
              </Link>
              <a 
                href="#katalog" 
                className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-full font-bold transition-all shadow-md text-sm flex items-center"
              >
                Pesan Sekarang
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION - Background Biru Gelap (#1a1f2b) */}
      <section id="beranda" className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 bg-[#1a1f2b] overflow-hidden">
        {/* Latar Belakang Gradien Biru */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-sky-400 via-transparent to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Bagian Teks Kiri */}
            <div className="text-center lg:text-left pt-10 lg:pt-20">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                Perawatan Kelas Premium,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
                  Langkah Lebih Percaya Diri.
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Sistem pencucian sepatu profesional dengan teknik khusus untuk berbagai jenis material. Kembali bersih, segar, dan siap menemani setiap langkah Anda.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <a 
                  href="#katalog"
                  className="bg-sky-500 hover:bg-sky-600 text-white text-lg font-bold px-8 py-4 rounded-full transition-transform hover:scale-105 shadow-lg shadow-sky-500/25 w-full sm:w-auto text-center"
                >
                  Lihat Katalog Layanan
                </a>
                <div className="flex items-center gap-3 text-sm font-semibold text-gray-400 mt-4 sm:mt-0">
                  <div className="flex -space-x-3">
                    <div className="w-10 h-10 rounded-full border-2 border-[#1a1f2b] bg-gray-600"></div>
                    <div className="w-10 h-10 rounded-full border-2 border-[#1a1f2b] bg-gray-500"></div>
                    <div className="w-10 h-10 rounded-full border-2 border-[#1a1f2b] bg-gray-400"></div>
                  </div>
                  <div>
                    <span className="text-sky-400">⭐⭐⭐⭐⭐</span><br/>
                    Dipercaya 500+ pelanggan
                  </div>
                </div>
              </div>
            </div>

            {/* Bagian Gambar Kanan (Logo) */}
            <div className="relative group perspective w-full h-[400px] lg:h-[500px] flex items-center justify-center">
              {/* Efek Cahaya Biru di belakang logo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/20 to-blue-400/20 rounded-full blur-3xl transform group-hover:scale-110 transition-transform duration-700"></div>
              
              {/* Gambar Logo */}
              <img 
                src="/logo-seka.png" 
                alt="Logo Sekashoes" 
                className="relative z-10 w-4/5 max-w-sm object-contain transform transition-all duration-500 hover:-translate-y-4 hover:rotate-2 drop-shadow-2xl"
              />
              
              {/* Lencana #1 Layanan yang melayang di bawah logo */}
              <div className="absolute bottom-4 right-0 lg:bottom-12 lg:-left-4 z-20 inline-flex items-center gap-3 px-5 py-3 rounded-full bg-[#1a1f2b]/90 backdrop-blur-md text-sky-400 font-bold text-sm border border-sky-500/30 shadow-2xl shadow-sky-500/20 transform -rotate-2 hover:rotate-0 transition-transform">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                </span>
                #1 Layanan Cuci Sepatu Premium
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* INFORMASI SECTION */}
      <section id="informasi" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-blue-50 rounded-full text-blue-600 font-bold text-sm mb-4">
                Mengenal Sekashoes
              </div>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Bukan Sekadar Dicuci, Kami Merawatnya.</h2>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                Sekashoes lahir dari dedikasi untuk menjaga kualitas alas kaki Anda. Berbeda dengan mencuci sendiri di rumah yang berisiko merusak lem atau membuat material kaku, kami menggunakan cairan pembersih khusus (chemical) yang diimpor dan disesuaikan dengan jenis bahan sepatu Anda—baik itu canvas, suede, leather, maupun mesh.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                Sistem pesanan kami juga sudah terintegrasi secara digital. Anda cukup memilih layanan, membayar via QRIS Xendit, dan memantau status pengerjaannya langsung dari *smartphone* Anda.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <h3 className="text-4xl font-black text-sky-500 mb-2">100%</h3>
                <p className="font-semibold text-gray-800">Aman untuk Material Suede & Kulit</p>
              </div>
              <div className="bg-[#1a1f2b] p-6 rounded-3xl text-white mt-8 shadow-xl border border-blue-900/30">
                <h3 className="text-4xl font-black text-sky-400 mb-2">24/7</h3>
                <p className="font-semibold text-gray-300">Tracking Status Sepatu Real-time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDUKASI SECTION */}
      <section id="edukasi" className="py-24 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Mengapa Perawatan Sepatu Itu Penting?</h2>
            <p className="text-gray-500 text-lg">Jangan biarkan investasi sepatu kesayangan Anda hancur hanya karena metode pembersihan yang salah.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Menjaga Performa Midsole</h3>
              <p className="text-gray-600 leading-relaxed">
                Kotoran jalanan aspal, debu, dan lumpur sisa *trail run* yang mengeras bisa masuk ke pori-pori *midsole* busa. Jika dibiarkan, bantalan akan cepat keras dan mati (kehilangan daya pantulnya).
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Mencegah Yellowing</h3>
              <p className="text-gray-600 leading-relaxed">
                Mencuci sepatu putih dengan deterjen baju biasa dan menjemurnya di bawah matahari langsung adalah penyebab utama sol sepatu Anda menguning (*yellowing*) dan lem terkelupas.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-cyan-50 text-cyan-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Membunuh Bakteri & Jamur</h3>
              <p className="text-gray-600 leading-relaxed">
                Keringat yang terperangkap di dalam sepatu (*insole*) adalah sarang bakteri penyebab bau tidak sedap. Kami menyertakan proses *anti-bacterial spray* dalam setiap paket pencucian.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* KATALOG SECTION */}
      <section id="katalog" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Pilih Layanan Anda</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Siap memanjakan sepatu Anda? Pilih katalog treatment di bawah ini, lengkapi data, dan selesaikan pembayaran.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <ServiceList />
          </div>

        </div>
      </section>

      {/* LOKASI & INSTAGRAM SECTION */}
      <section id="kontak" className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            
            {/* KOTAK KIRI: LOKASI WORKSHOP */}
            <div className="bg-white p-10 rounded-3xl border border-gray-200 flex flex-col justify-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-[#1a1f2b] text-white rounded-2xl flex items-center justify-center mb-6 shadow-md">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <h3 className="text-3xl font-extrabold text-gray-900 mb-4">Mampir ke Workshop Kami</h3>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Lebih suka mengantar langsung? Datang ke tempat kami dan konsultasikan kondisi sepatu Anda langsung dengan ahlinya.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-sky-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  <div>
                    <h4 className="font-bold text-gray-900">Alamat Sekashoes</h4>
                    <p className="text-gray-600">Jalan Raya Utama No. 123, Salatiga, Jawa Tengah</p> 
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-sky-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <div>
                    <h4 className="font-bold text-gray-900">Jam Operasional</h4>
                    <p className="text-gray-600">Setiap Hari: 09.00 - 20.00 WIB</p>
                  </div>
                </div>
              </div>

              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#1a1f2b] hover:bg-sky-500 text-white px-6 py-3 rounded-xl font-bold transition-colors w-fit shadow-md"
              >
                Buka di Google Maps
              </a>
            </div>

            {/* KOTAK KANAN: INSTAGRAM */}
            <div className="relative p-10 rounded-3xl overflow-hidden flex flex-col justify-center items-start group shadow-md">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 via-blue-500 to-indigo-600 opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 text-white w-full">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 border border-white/30">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </div>
                
                <h3 className="text-3xl font-extrabold mb-4">Lihat Portofolio Kami</h3>
                <p className="text-white/90 text-lg mb-8 leading-relaxed max-w-sm">
                  Ribuan sepatu telah kembali bersih seperti baru. Intip hasil cuci *before-after*, tips perawatan harian, dan promo terbaru di Instagram kami.
                </p>
                
                <div className="flex flex-wrap items-center gap-4">
                  <a 
                    href="https://instagram.com/sekashoes" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-[#1a1f2b] px-8 py-3 rounded-full font-extrabold hover:bg-gray-100 transition-colors shadow-lg shadow-black/20"
                  >
                    Follow @sekashoes
                  </a>
                  <div className="text-white/80 font-medium text-sm mt-2 sm:mt-0">
                    Bergabung bersama <span className="font-bold text-white">10k+</span> followers!
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1a1f2b] py-12 border-t border-gray-800 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center font-black text-white shadow-lg">S</div>
          <span className="font-extrabold text-xl text-white">Sekashoes<span className="text-sky-500">.</span></span>
        </div>
        <p className="text-gray-400 font-medium text-sm">© {new Date().getFullYear()} Sekashoes. Perawatan Sepatu Profesional.</p>
      </footer>

    </div>
  );
}