import { useQuery } from '@tanstack/react-query';
import { Outlet, useNavigate } from 'react-router-dom';
import api from '@/services/api.js';
import { LoaderCircle } from 'lucide-react';
import { AppSidebar } from '@/components/dashboard-sidebar.jsx';
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar.jsx';

const fetchUser = async () => {
  try {
    const { data } = await api.get('/users/me');
    if (!data?.data?.user) {
      throw new Error('Nenhum usuário encontrado na sessão.');
    }
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Usuário não autenticado');
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

  if (isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <LoaderCircle className='h-8 w-8 animate-spin' />
      </div>
    );
  }

  if (isError) {
    navigate('/', { replace: true });
    return null;
  }

  if (user) {
    return (
      <SidebarProvider
        style={{
          '--sidebar-width': '16rem',
          '--sidebar-width-mobile': '20rem',
        }}
      >
        <Sidebar variant='inset'>
          <AppSidebar user={user.data.user} />
        </Sidebar>
        <SidebarInset className='p-4'>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return null;
};

export default AuthenticatedLayout;
