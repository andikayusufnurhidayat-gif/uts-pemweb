import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="container">
      <h1>Register</h1>
      <form className="form">
        <input type="text" placeholder="Nama lengkap" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="button" className="btn">Daftar</button>
      </form>
      <p>Sudah punya akun? <Link href="/login">Login</Link></p>
      <p><Link href="/">← Kembali</Link></p>
    </div>
  );
}