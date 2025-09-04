import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import api from '../services/api.js';
import { createRootSchema } from '@/models/userZodSchema.js';
import toast from 'react-hot-toast';

const createRootUser = async (data) => {
  console.log('Dados a serem enviados:', data);
  const response = await api.post('/auth/create-root', data);
  return response.data;
};

const RegisterRootPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createRootSchema),
  });

  const mutation = useMutation({
    mutationFn: createRootUser,
    onSuccess: () => {
      toast.success('Usuário root criado com sucesso!');
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || 'Ocorreu um erro inesperado.';
      toast.error(errorMessage);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nome de Usuário</label>
        <input {...register('username')} />
        {errors.username && <p>{errors.username.message}</p>}
      </div>

      <div>
        <label>Nome Completo</label>
        <input {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label>Email</label>
        <input {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label>Senha</label>
        <input type='password' {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <div>
        <label>Confirmar Senha</label>
        <input type='passwordConfirm' {...register('passwordConfirm')} />
        {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
      </div>

      <button type='submit' disabled={mutation.isLoading}>
        {mutation.isLoading ? 'Criando...' : 'Criar Usuário Root'}
      </button>
    </form>
  );
};

export default RegisterRootPage;
