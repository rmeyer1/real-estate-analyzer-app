"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../lib/AuthContext';
import { db } from '../../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function CreateModelPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  if (!loading && !user) {
    router.replace('/signin');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      await addDoc(collection(db, 'models'), {
        name,
        userId: user?.uid,
        createdAt: new Date().toISOString(),
      });
      router.replace('/models');
    } catch (e: any) {
      setError(e.message);
      setSaving(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-sm bg-white rounded shadow p-6 flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-2">Create New Model</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Model Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Create Model'}
          </button>
        </form>
        {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
      </div>
    </main>
  );
} 