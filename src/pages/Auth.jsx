import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { LoginForm } from '@/components/login-form.jsx';
import { CreateRootForm } from '@/components/create-root-form.jsx';

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

  return data?.data?.exists ? <LoginForm /> : <CreateRootForm />;
};

export default AuthPage;
