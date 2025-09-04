import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { loginSchema } from '@/models/userZodSchema.js';
import api from '../services/api.js';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const loginUser = async (data) => {
  console.log('A tentar fazer login com:', data);
  const response = await api.post('/auth/login', data);
  return response.data;
};

const LoginPage = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      toast.success('Login realizado com sucesso! A redirecionar...');
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || 'Credenciais inválidas.';
      toast.error(errorMessage);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle className='text-2xl'>Aceder ao Painel</CardTitle>
        <CardDescription>
          Use as suas credenciais para entrar no sistema.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome de Usuário</FormLabel>
                  <FormControl>
                    <Input placeholder='o_seu_usuario' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              className='w-full'
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? 'A entrar...' : 'Entrar'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
