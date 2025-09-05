import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api.js';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

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

import { LoaderCircle, User, Lock, Mail, UserPlus } from 'lucide-react';
import { createRootSchema } from '@/models/userZodSchema.js';

const createUser = async (data) => {
  const response = await api.post('/auth/create-root', data);
  return response.data;
};

export function CreateRootForm({ className, ...props }) {
  const queryClient = useQueryClient();
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(createRootSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success('Conta root criada com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['rootStatus'] });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || 'Erro ao criar a conta.';
      toast.error(errorMessage);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Card className={cn('w-full max-w-md', className)} {...props}>
      <CardHeader>
        <CardTitle className='text-2xl'>Crie o usuário root</CardTitle>
        <CardDescription>
          Preencha os campos abaixo para se registrar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            {/* Campo Name */}
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <User className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                      <Input
                        placeholder='Seu Nome Completo'
                        {...field}
                        className='pl-10'
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Campo Username */}
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
            {/* Campo Email */}
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Mail className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                      <Input
                        type='email'
                        placeholder='seu@email.com'
                        {...field}
                        className='pl-10'
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Campos de Senha */}
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
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
            <FormField
              control={form.control}
              name='passwordConfirm'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Senha</FormLabel>
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
                <UserPlus className='mr-2 h-4 w-4' />
              )}
              {mutation.isLoading ? 'A criar conta...' : 'Criar Conta'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
