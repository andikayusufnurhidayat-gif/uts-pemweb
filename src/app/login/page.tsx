import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="container">
      <h1>Login</h1>
      <form className="form">
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="button" className="btn">Login</button>
      </form>
      <p>Belum punya akun? <Link href="/register">Register</Link></p>
      <p><Link href="/">← Kembali</Link></p>
    </div>
  );
}