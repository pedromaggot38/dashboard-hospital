import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { LoginForm } from '@/components/login-form.jsx';
import { CreateRootForm } from '@/components/create-root-form.jsx';
import { LoaderCircle } from 'lucide-react';

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

const checkRootStatus = async () => {
  const { data } = await api.get('/auth/check-root');
  return data;
};

const AuthPage = () => {
  const navigate = useNavigate();

  const { isSuccess: isAuth, isLoading: isAuthLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchUser,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const {
    data: rootStatus,
    isLoading: isRootLoading,
    isError: isRootError,
    error: rootError,
  } = useQuery({
    queryKey: ['rootStatus'],
    queryFn: checkRootStatus,
    enabled: !isAuth && !isAuthLoading,
  });

  useEffect(() => {
    if (isAuth) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuth, navigate]);

  if (isAuthLoading || isRootLoading) {
    return (
      <div className='flex items-center justify-center'>
        <LoaderCircle className='h-8 w-8 animate-spin' />
      </div>
    );
  }

  if (isRootError) {
    return (
      <div className='rounded-lg bg-white p-8 text-center shadow-md'>
        <h2 className='mb-2 text-xl font-bold text-red-600'>Erro de Conexão</h2>
        <p className='text-gray-600'>Não foi possível conectar ao servidor.</p>
        <pre className='mt-4 rounded bg-gray-200 p-2 text-left text-sm text-red-700'>
          {rootError.message}
        </pre>
      </div>
    );
  }

  if (!isAuth) {
    if (rootStatus?.data?.exists) {
      return <LoginForm />;
    } else {
      return <CreateRootForm />;
    }
  }

  return (
    <div className='flex items-center justify-center'>
      <LoaderCircle className='h-8 w-8 animate-spin' />
    </div>
  );
};

export default AuthPage;
