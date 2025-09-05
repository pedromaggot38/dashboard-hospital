import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPasswordSchema } from '@/models/userZodSchema.js';
import api from '@/services/api.js';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

// Componentes do Shadcn UI
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

// Ícones do Lucide
import { LoaderCircle, Lock, KeyRound, Hash } from 'lucide-react';

// A função de API agora espera o 'username' para a URL e o 'token' no corpo
const resetPasswordRequest = async ({
  token,
  password,
  passwordConfirm,
  username,
}) => {
  const response = await api.patch(`/auth/reset-password/${username}`, {
    token,
    password,
    passwordConfirm,
  });
  return response.data;
};

export function ResetPasswordForm({ className, ...props }) {
  const { username } = useParams();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const mutation = useMutation({
    mutationFn: resetPasswordRequest,
    onSuccess: () => {
      toast.success('Senha redefinida com sucesso! Pode agora fazer o login.');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || 'Token inválido ou expirado.';
      toast.error(errorMessage);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate({ ...data, username });
  };

  return (
    <Card className={cn('w-full max-w-sm', className)} {...props}>
      <CardHeader>
        <CardTitle className='text-2xl'>Redefinir a sua Senha</CardTitle>
        <CardDescription>
          Para o utilizador <span className='font-bold'>{username}</span>,
          insira o token e a nova senha.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            {/* 4. Novo campo para o Token */}
            <FormField
              control={form.control}
              name='token'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código Token</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Hash className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                      <Input
                        placeholder='_ _ _ _ _ _'
                        {...field}
                        className='pl-10'
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Campos de senha existentes */}
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nova Senha</FormLabel>
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
            <FormField
              control={form.control}
              name='passwordConfirm'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Nova Senha</FormLabel>
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
                <KeyRound className='mr-2 h-4 w-4' />
              )}
              {mutation.isLoading ? 'A redefinir...' : 'Redefinir Senha'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
