import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Outlet, useNavigate } from 'react-router-dom';
import api from '@/services/api.js';
import { LoaderCircle } from 'lucide-react';
import { AppSidebar } from '@/components/dashboard-sidebar.jsx';
import { SidebarProvider } from '@/components/ui/sidebar.jsx';

const fetchUser = async () => {
  try {
    const { data } = await api.get('/users/me');
    return data;
    // eslint-disable-next-line no-unused-vars
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
        <SidebarProvider>
          <aside className='w-48 p-4 text-white'>
            <AppSidebar />
            {/* <p>Utilizador: {user.data.user.email}</p> */}
          </aside>
          <main className='flex-1 p-6'>
            <Outlet />
          </main>
        </SidebarProvider>
      </div>
    );
  }

  return null;
};

export default AuthenticatedLayout;
