import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { prisma } from '../../../../lib/prisma';

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // di Next.js 16, params harus di-await
  const item = await prisma.travel.findUnique({ where: { id: Number(id) } });

  if (!item) notFound(); // id nggak ada → halaman 404

  async function update(formData: FormData) {
    'use server';
    await prisma.travel.update({
      where: { id: Number(id) },
      data: {
        destination: String(formData.get('destination')),
        country: String(formData.get('country')),
        budget: Number(formData.get('budget')),
        status: String(formData.get('status')),
        notes: String(formData.get('notes')),
      },
    });
    revalidatePath('/');
    redirect('/');
  }

  return (
    <div className="container">
      <h1>Edit Tempat</h1>
      <form action={update} className="form">
        <input name="destination" defaultValue={item.destination} required />
        <input name="country" defaultValue={item.country} required />
        <input name="budget" type="number" min="0" defaultValue={item.budget} required />
        <select name="status" defaultValue={item.status}>
          <option value="Planned">Planned</option>
          <option value="Visited">Visited</option>
        </select>
        <input name="notes" defaultValue={item.notes ?? ''} />
        <button className="btn">Update</button>
      </form>
      <p><Link href="/">← Kembali</Link></p>
    </div>
  );
}