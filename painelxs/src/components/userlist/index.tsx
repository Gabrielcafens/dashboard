'use client';
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import api from '@/lib/axiosConfig';

interface UserData {
  id: number;
  nome: string;
  email: string;
  senha: string;
  dataCriacao: string;
}

const UserList = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/usuarios');
        console.log('Usuários recebidos:', response.data); // Adicione este log
        setData(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-4xl p-6 bg-white shadow-md rounded-md">
        {loading ? (
          <Skeleton className="h-12 w-full" />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Data de Criação</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                        {data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.nome}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{new Date(user.dataCriacao).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge variant="outline">Ativo</Badge>
                </TableCell>
              </TableRow>
            ))}

            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default UserList;
