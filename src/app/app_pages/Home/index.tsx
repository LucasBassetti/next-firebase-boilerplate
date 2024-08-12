'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const { userEmail, signInAnonymously } = useAuth();

  useEffect(() => {
    if (userEmail) {
      router.push('/dashboard');
    }
  }, [userEmail, router]);

  const onSignIn = () => {
    signInAnonymously(email);
  };

  return (
    <div className="flex min-h-[100vh] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="max-w-[500px] w-full mx-auto bg-white p-4 md:p-8 rounded-md shadow-[0_4px_10px_0px_rgba(0,0,0,0.1)]">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-2 text-center text-xl leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value?.includes('@')) {
                      onSignIn();
                    }
                  }}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>
            <div>
              <button
                disabled={!email}
                onClick={onSignIn}
                type="submit"
                className="mb-2 flex w-full justify-center rounded-md bg-[#DBFC01] px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-[#DBFC01] hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
