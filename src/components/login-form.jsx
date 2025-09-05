import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { loginSchema } from '@/models/userZodSchema.js';
import api from '@/services/api.js';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

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

import { LoaderCircle, User, Lock, LogIn } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';

const loginUser = async (data) => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

export function LoginForm({ className, ...props }) {
  const navigate = useNavigate();

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
      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
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
    <Card className={cn('w-full max-w-sm', className)} {...props}>
      <CardHeader>
        <CardTitle className='text-2xl'>Acesse sua conta</CardTitle>
        <CardDescription>
          Insira o seu nome de usuário e senha para entrar.
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
                  <FormLabel>Nome de usuário</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <User className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                      <Input {...field} className='pl-10' />
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
                  <div className='flex items-center'>
                    <FormLabel>Senha</FormLabel>
                  </div>
                  <FormControl>
                    <div className='relative'>
                      <Lock className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                      <Input type='password' {...field} className='pl-10' />
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
          <div className='mt-4 text-center text-sm'>
            Esqueceu sua senha?{' '}
            <a href='/forgot-password' className='underline underline-offset-4'>
              Recupere aqui
            </a>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
