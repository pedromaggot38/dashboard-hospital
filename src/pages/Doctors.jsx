// src/pages/Doctors.jsx
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
import { columns } from '@/components/data-tables/doctors-columns.jsx';
import { DataTable } from '@/components/data-tables/data-table.js';

// Definição da função de busca de dados
async function getDoctors() {
  const { data } = await api.get('/doctors');
  return data.data.doctors;
}

export default function DoctorsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['doctors'],
    queryFn: getDoctors,
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
          <CardTitle>Médicos</CardTitle>
          <CardDescription>
            Gerencie os médicos do seu painel de administração.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {data && <DataTable columns={columns} data={data} />}
        </CardContent>
      </Card>
    </div>
  );
}
