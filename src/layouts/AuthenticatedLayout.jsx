import { useQuery } from '@tanstack/react-query';
import { Outlet, useNavigate } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';
import { AppSidebar } from '@/components/dashboard-sidebar.jsx';
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar.jsx';
import { useEffect } from 'react';
import { fetchUser } from '@/services/authService.js';

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
    if (isError) {
      navigate('/', { replace: true });
    }
  }, [isError, navigate]);

  if (isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <LoaderCircle className='h-8 w-8 animate-spin' />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <SidebarProvider
      style={{
        '--sidebar-width': '16rem',
        '--sidebar-width-mobile': '20rem',
      }}
    >
      <Sidebar variant='inset'>
        <AppSidebar user={user} />
      </Sidebar>
      <SidebarInset className='p-4'>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AuthenticatedLayout;
