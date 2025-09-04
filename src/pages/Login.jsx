import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { loginSchema } from '@/models/userZodSchema.js'; //
import api from '../services/api.js'; //
import toast from 'react-hot-toast';

// 1. Importar os componentes e ícones necessários
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
import { User, Lock, LogIn, LoaderCircle } from 'lucide-react';

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
      // setTimeout(() => {
      //   window.location.href = '/dashboard';
      // }, 1000);
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
    <Card className='w-full max-w-md shadow-lg'>
      <CardHeader className='text-center'>
        <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10'>
          <LogIn className='h-8 w-8 text-primary' />
        </div>
        <CardTitle className='text-2xl'>Aceder ao Painel</CardTitle>
        <CardDescription>
          Use as suas credenciais para entrar no sistema.
        </CardDescription>
      </CardHeader>
      <CardContent className=''>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome de Usuário</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <User className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                      <Input
                        placeholder='o_seu_usuario'
                        {...field}
                        className='pl-10'
                      />
                    </div>
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
                    <div className='relative'>
                      <Lock className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                      <Input
                        type='password'
                        placeholder='********'
                        {...field}
                        className='pl-10'
                      />
                    </div>
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
              {mutation.isLoading ? (
                <LoaderCircle className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                <LogIn className='mr-2 h-4 w-4' />
              )}
              {mutation.isLoading ? 'A entrar...' : 'Entrar'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
