// src/pages/Users.jsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import api from '@/services/api';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { columns } from '@/components/data-tables/users-columns.jsx';
import { DataTable } from '@/components/data-tables/data-table.js';

// Definição da função de busca de dados
async function getUsers() {
  const { data } = await api.get('/users');
  // Ajuste o caminho para a sua resposta da API se necessário
  return data.data.users;
}

export default function UsersPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  if (isLoading) {
    return (
      <div className='flex items-center justify-center'>
        <LoaderCircle className='h-8 w-8 animate-spin' />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='rounded-lg bg-destructive/10 p-4 text-center text-destructive'>
        <p>Erro ao carregar os dados.</p>
      </div>
    );
  }

  return (
    <div className='flex flex-1 flex-col'>
      <Card className='flex-1'>
        <CardHeader>
          <CardTitle>Usuários</CardTitle>
          <CardDescription>
            Gerencie os usuários do seu painel de administração.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {data && <DataTable columns={columns} data={data} />}
        </CardContent>
      </Card>
    </div>
  );
}
