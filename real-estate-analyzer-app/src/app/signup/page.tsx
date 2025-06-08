"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../lib/AuthContext';

export default function SignUpPage() {
  const { user, loading, signInWithGoogle, signUpWithEmail } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace('/');
    }
  }, [loading, user, router]);

  const handleGoogle = async () => {
    setError('');
    setSubmitting(true);
    try {
      await signInWithGoogle();
      router.replace('/');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await signUpWithEmail(email, password);
      router.replace('/');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-sm bg-white rounded shadow p-6 flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-2">Sign Up</h1>
        <button
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          onClick={handleGoogle}
          disabled={submitting}
        >
          Sign up with Google
        </button>
        <form onSubmit={handleEmail} className="flex flex-col gap-2">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border p-2 rounded"
            required
            disabled={submitting}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border p-2 rounded"
            required
            disabled={submitting}
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
            disabled={submitting}
          >
            {submitting ? 'Signing Up...' : 'Sign Up with Email'}
          </button>
        </form>
        <Link href="/signin" className="text-blue-600 underline mt-2 text-center">
          Already have an account? Sign In
        </Link>
        {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
      </div>
    </main>
  );
} 