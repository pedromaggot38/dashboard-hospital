import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import LoginPage from './Login.jsx';
import RegisterRootPage from './RegisterRoot.jsx';

const checkRootStatus = async () => {
  const { data } = await api.get('/auth/check-root');
  return data;
};

const AuthPage = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['rootStatus'],
    queryFn: checkRootStatus,
    retry: 1,
  });

  if (isLoading) {
    return <div>A verificar o sistema...</div>;
  }

  if (isError) {
    return (
      <div style={{ color: 'red' }}>
        <h2>Erro de Conexão</h2>
        <p>
          Não foi possível conectar ao servidor. Verifique se o back-end está a
          ser executado.
        </p>
        <pre>{error.message}</pre>
      </div>
    );
  }

  return data?.data?.exists ? <LoginPage /> : <RegisterRootPage />;
};

export default AuthPage;
