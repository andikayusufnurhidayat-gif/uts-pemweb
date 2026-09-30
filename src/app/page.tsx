import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { prisma } from '../../lib/prisma';

export default async function Home() {
  // ambil semua data, yang terbaru di atas
  const travels = await prisma.travel.findMany({ orderBy: { id: 'desc' } });

  // fungsi hapus, jalan di server
  async function handleDelete(formData: FormData) {
    'use server';
    const id = Number(formData.get('id'));
    await prisma.travel.delete({ where: { id } });
    revalidatePath('/'); // muat ulang data halaman utama
  }

  return (
    <div className="container">
  <div className="header">
  <h1>Travel list impiannn</h1>
  <p>Daftar destinasi impian dan rencana perjalanan.</p>
</div>

<div className="toolbar">
  <h2>Places & Experiences ({travels.length})</h2>
  <div className="tombol-kanan">
    <Link href="/login" className="btn btn-putih">Login</Link>
    <Link href="/register" className="btn btn-putih">Register</Link>
    <Link href="/tambah" className="btn">+ Tambah</Link>
  </div>
</div>

      {travels.length === 0 ? (
        <p className="kosong">Belum ada tempat yang dicatat.</p>
      ) : (
        <div className="grid">
          {travels.map((item) => (
            <div className="card" key={item.id}>
              <h3>{item.destination}</h3>
              <span className="badge">{item.country}</span>{' '}
              <span className="badge">{item.status}</span>
              <p>Budget: Rp {item.budget.toLocaleString('id-ID')}</p>
              {item.notes && <p>{item.notes}</p>}

              <div className="aksi">
                <Link href={`/edit/${item.id}`}>Edit</Link>
                <form action={handleDelete}>
                  <input type="hidden" name="id" value={item.id} />
                  <button className="btn-hapus">Hapus</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
