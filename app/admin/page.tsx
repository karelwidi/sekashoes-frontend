import { redirect } from 'next/navigation';

export default function AdminIndex() {
    // Otomatis mengarahkan (redirect) pengguna ke halaman orders
    redirect('/admin/orders');
}