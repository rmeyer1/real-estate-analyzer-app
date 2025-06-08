"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../lib/AuthContext';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

interface Model {
  id: string;
  name: string;
  createdAt: string;
}

export default function ModelsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [models, setModels] = useState<Model[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/signin');
    }
    if (user) {
      const fetchModels = async () => {
        setFetching(true);
        const q = query(collection(db, 'models'), where('userId', '==', user.uid));
        const snapshot = await getDocs(q);
        setModels(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Model)));
        setFetching(false);
      };
      fetchModels();
    }
  }, [user, loading, router]);

  if (loading || fetching) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-4">My Models</h1>
      {models.length === 0 ? (
        <div>No models found. <a href="/models/create" className="text-blue-600 underline">Create one</a>.</div>
      ) : (
        <ul className="w-full max-w-md flex flex-col gap-2">
          {models.map(model => (
            <li key={model.id} className="border rounded p-2 flex justify-between items-center">
              <span>{model.name}</span>
              <span className="text-xs text-gray-500">{new Date(model.createdAt).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
} 