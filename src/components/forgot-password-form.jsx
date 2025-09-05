import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { forgotPasswordSchema } from '@/models/userZodSchema.js';
import api from '@/services/api.js';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

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

import { LoaderCircle, User, MailQuestion } from 'lucide-react';

const forgotPasswordRequest = async (data) => {
  const response = await api.post('/auth/forgot-password', data);
  return response.data;
};

export function ForgotPasswordForm({ className, ...props }) {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      username: '',
    },
  });

  const mutation = useMutation({
    mutationFn: forgotPasswordRequest,
    onSuccess: (_data, variables) => {
      toast.success(
        'Pedido enviado! Redirecionando para a redefinição de senha.'
      );
      navigate(`/reset-password/${variables.username}`);
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || 'Ocorreu um erro. Tente novamente.';
      toast.error(errorMessage);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Card className={cn('w-full max-w-sm', className)} {...props}>
      <CardHeader>
        <CardTitle className='text-2xl'>Recuperar Senha</CardTitle>
        <CardDescription>
          Insira o seu nome de usuário para recuperar.
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
            <Button
              type='submit'
              className='w-full'
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? (
                <LoaderCircle className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                <MailQuestion className='mr-2 h-4 w-4' />
              )}
              {mutation.isLoading ? 'A enviar...' : 'Enviar Email'}
            </Button>
          </form>
          <div className='mt-4 text-center text-sm'>
            Lembrou-se da senha?{' '}
            <a href='/' className='underline underline-offset-4'>
              Voltar ao Login
            </a>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
