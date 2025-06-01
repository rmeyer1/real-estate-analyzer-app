import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../lib/AuthContext';

export default function SignOutPage() {
  const { signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    signOut().then(() => {
      router.replace('/');
    });
  }, [signOut, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="text-lg">Signing out...</div>
    </main>
  );
} 