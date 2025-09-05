// src/pages/Users.jsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns"; // Importa as colunas ajustadas
import { DataTable } from "./data-table";
import { LoaderCircle } from "lucide-react";
import api from '@/services/api';

// Definição da função de busca de dados
async function getUsers() {
    const { data } = await api.get('/users');
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
        <div className="container mx-auto py-10">
            {/* Passa o array de colunas e os dados de usuários para o DataTable */}
            <DataTable columns={columns} data={data} />
        </div>
    );
}