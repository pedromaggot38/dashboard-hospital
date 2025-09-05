import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Outlet, useNavigate } from 'react-router-dom';
import api from '@/services/api.js';
import { LoaderCircle } from 'lucide-react';

const fetchUser = async () => {
  try {
    const { data } = await api.get('/users/me');
    return data;
  } catch (error) {
    throw new Error('Utilizador não autenticado');
  }
};

const AuthenticatedLayout = () => {
  const navigate = useNavigate();
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchUser,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!isLoading && isError) {
      navigate('/', { replace: true });
    }
  }, [isLoading, isError, navigate]);

  if (isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <LoaderCircle className='h-8 w-8 animate-spin' />
      </div>
    );
  }

  if (user) {
    return (
      <div className='flex min-h-screen'>
        <aside className='w-64 bg-gray-800 p-4 text-white'>
          <h2 className='text-xl font-bold'>Sidebar</h2>
          <p>Utilizador: {user.data.user.email}</p>
        </aside>
        <main className='flex-1 p-6'>
          <Outlet />
        </main>
      </div>
    );
  }

  return null;
};

export default AuthenticatedLayout;
