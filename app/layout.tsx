import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sekashoes - Layanan Cuci Sepatu Premium",
  description: "Pesan layanan cuci sepatu terbaik di Sekashoes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Menambahkan scroll-smooth agar klik menu di landing page meluncur mulus
    <html lang="id" className="scroll-smooth"> 
      <body className="bg-gray-50 text-gray-900 font-sans antialiased">
        {/* Konten Halaman - Navbar lama sudah dihapus agar tidak bentrok */}
        {children}
      </body>
    </html>
  );
}