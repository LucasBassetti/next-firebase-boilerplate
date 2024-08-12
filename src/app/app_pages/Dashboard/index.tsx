'use client';

import { Card } from '@/components/Card';
import { useAuth } from '@/hooks/useAuth';
import { useData } from '@/hooks/useData';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const router = useRouter();
  const { userEmail } = useAuth();
  const { subscribeToData } = useData();

  useEffect(() => {
    if (userEmail) {
      subscribeToData();
    } else {
      router.replace('/');
    }
  }, [subscribeToData, userEmail, router]);

  return <Card>Dashboard</Card>;
}
