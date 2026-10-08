"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ServiceList() {
  const router = useRouter();
  
  const [services, setServices] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    shoe_brand: "",
    shoe_color: "",
    phone_number: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("http://sekashoes-backend.test/api/services", {
          headers: {
            "Accept": "application/json",
          }
        });
        const response = await res.json();
        
        if (response.status === 'success' && response.data) {
          setServices(response.data);
        } else if (Array.isArray(response)) {
          setServices(response);
        }
      } catch (error) {
        console.error("Gagal memuat katalog layanan:", error);
      }
    };

    fetchServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://sekashoes-backend.test/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          user_id: 2, 
          service_id: selectedService.id,
          shoe_brand: formData.shoe_brand,
          shoe_color: formData.shoe_color,
          phone_number: formData.phone_number,
          notes: formData.notes,
        }),
      });

      const data = await res.json();
      if (data.status === "success") {
        const newOrderId = data.data.id;
        router.push(`/payment/${newOrderId}`);
      } else {
        alert("Gagal membuat pesanan, periksa koneksi Anda.");
      }
    } catch (error) {
      alert("Terjadi kesalahan pada sistem.");
    } finally {
      setLoading(false);
    }
  };

  // Tautan gambar telah diperbarui untuk memperbaiki gambar Unyellowing yang rusak
  const getServiceImage = (serviceName: string) => {
    const name = serviceName.toLowerCase();
    if (name.includes('deep')) return 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800&auto=format&fit=crop';
    if (name.includes('fast')) return 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop';
    if (name.includes('unyellowing')) return 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=800&auto=format&fit=crop';
    if (name.includes('repaint') || name.includes('recolor')) return 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=800&auto=format&fit=crop';
    
    return 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop';
  };

  return (
    <>
      {/* Grid Katalog Layanan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services?.map((service) => (
          <div
            key={service.id}
            onClick={() => setSelectedService(service)} // Membuat seluruh kartu bisa diklik
            className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group cursor-pointer"
          >
            {/* AREA GAMBAR THUMBNAIL */}
            <div className="h-48 relative overflow-hidden bg-sky-50 shrink-0">
              <img 
                src={service.image_url || getServiceImage(service.name)} 
                alt={service.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-90"></div>
            </div>

            {/* AREA TEKS */}
            <div className="p-6 flex flex-col flex-grow relative z-10 -mt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {service.name}
              </h2>
              {/* Teks sengaja dipotong di kartu luar agar tetap rapi */}
              <p className="text-gray-600 text-sm mb-6 flex-grow line-clamp-2">
                {service.description}
              </p>
              <div className="mb-4">
                <span className="text-xl font-black text-gray-900">
                  Rp {Number(service.price).toLocaleString("id-ID")}
                </span>
              </div>
              <button
                className="w-full bg-sky-50 text-sky-600 py-3 rounded-xl font-bold group-hover:bg-sky-500 group-hover:text-white transition-colors shadow-sm"
              >
                Detail & Pesan
              </button>
            </div>
          </div>
        ))}
        
        {services.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-10">
            Memuat katalog layanan...
          </div>
        )}
      </div>

      {/* JENDELA POP-UP (MODAL) DETAIL & CHECKOUT */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[95vh] animate-fade-in-up">
            
            {/* Header Modal (Gambar Melintang) */}
            <div className="relative h-48 shrink-0">
              <img 
                src={selectedService.image_url || getServiceImage(selectedService.name)} 
                alt={selectedService.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-black/20 to-transparent"></div>
              
              <button 
                onClick={() => setSelectedService(null)} 
                className="absolute top-4 right-4 bg-white/70 backdrop-blur-md text-gray-900 p-2 rounded-full hover:bg-white hover:text-red-600 transition-colors shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Konten Scrollable */}
            <div className="p-6 md:p-8 overflow-y-auto flex-grow">
              
              {/* DESKRIPSI LENGKAP MUNCUL DI SINI */}
              <div className="mb-8">
                <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
                  {selectedService.name}
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
                  {selectedService.description}
                </p>
                <div className="inline-block bg-sky-50 border border-sky-100 text-sky-700 px-4 py-2 rounded-xl">
                  <span className="text-sm font-semibold">Tarif Layanan: </span>
                  <span className="text-xl font-black">Rp {Number(selectedService.price).toLocaleString("id-ID")}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  Formulir Pemesanan
                </h4>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">
                      Merek & Tipe Sepatu
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full border border-gray-200 bg-gray-50 rounded-xl p-3 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-gray-900 transition-all"
                      placeholder="Contoh: Nike Air Force 1"
                      value={formData.shoe_brand}
                      onChange={(e) => setFormData({ ...formData, shoe_brand: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">
                      Warna
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full border border-gray-200 bg-gray-50 rounded-xl p-3 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-gray-900 transition-all"
                      placeholder="Contoh: Putih"
                      value={formData.shoe_color}
                      onChange={(e) => setFormData({ ...formData, shoe_color: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">
                      Nomor WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full border border-gray-200 bg-gray-50 rounded-xl p-3 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-gray-900 transition-all"
                      placeholder="Contoh: 081234567890"
                      value={formData.phone_number}
                      onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">
                      Catatan (Opsional)
                    </label>
                    <textarea
                      className="w-full border border-gray-200 bg-gray-50 rounded-xl p-3 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-gray-900 transition-all"
                      placeholder="Contoh: Bagian insole tolong dibersihkan ekstra..."
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-sky-500 text-white py-4 rounded-xl font-bold hover:bg-sky-600 transition-all disabled:bg-sky-300 shadow-lg shadow-sky-500/30 hover:-translate-y-0.5 text-lg"
                    >
                      {loading ? "Memproses..." : "Lanjut ke Pembayaran"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
          </div>
        </div>
      )}

      {/* Custom Styles untuk Animasi */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </>
  );
}