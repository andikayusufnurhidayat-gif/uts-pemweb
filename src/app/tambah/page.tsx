import Link from 'next/link';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { prisma } from '../../../lib/prisma';

export default function TambahPage() {
  async function simpan(formData: FormData) {
    'use server';
    await prisma.travel.create({
      data: {
        destination: String(formData.get('destination')),
        country: String(formData.get('country')),
        budget: Number(formData.get('budget')),
        status: String(formData.get('status')),
        notes: String(formData.get('notes')),
      },
    });
    revalidatePath('/');
    redirect('/'); // balik ke halaman utama
  }

  return (
    <div className="container">
      <h1>Tambah Tempat</h1>
      <form action={simpan} className="form">
        <input name="destination" placeholder="Nama tempat (cth: Moraine Lake)" required />
        <input name="country" placeholder="Negara (cth: Canada)" required />
        <input name="budget" type="number" min="0" placeholder="Budget (Rp)" required />
        <select name="status">
          <option value="Planned">Planned</option>
          <option value="Visited">Visited</option>
        </select>
        <input name="notes" placeholder="Catatan (opsional)" />
        <button className="btn">Simpan</button>
      </form>
      <p><Link href="/">← Kembali</Link></p>
    </div>
  );
}