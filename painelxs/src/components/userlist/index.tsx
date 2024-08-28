'use client'
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import api from '@/lib/axiosConfig';
import { EditUserModal } from '@/components/editUserModal';
import { DeleteUserModal } from '@/components/deleteUserModal';
import { Button } from '../ui/button';

interface User {
  id: number;
  nome: string;
  email: string;
  senha?: string;
  dataCriacao?: string;
  status: "Ativo" | "Inativo";
}

const UserList = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/usuarios');
        setData(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  const handleEdit = async (updatedData: Partial<User>) => {
    if (selectedUser) {
      try {
        await api.put(`/usuarios/${selectedUser.id}`, { ...selectedUser, ...updatedData });
        console.log(`Usuário ${selectedUser.id} atualizado com sucesso.`);
        
        // Atualizar a lista de usuários após edição
        const response = await api.get('/usuarios');
        console.log('Dados atualizados da API:', response.data);
        setData(response.data); // Atualiza com os dados mais recentes da API
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
      } finally {
        setShowEditModal(false);
      }
    }
  };
  
  const handleDelete = async () => {
    if (selectedUser) {
      try {
        await api.delete(`/usuarios/${selectedUser.id}`);
        console.log(`Usuário ${selectedUser.id} excluído com sucesso.`);
        
        // Atualizar a lista de usuários após exclusão
        const response = await api.get('/usuarios');
        setData(response.data); // Atualiza com os dados mais recentes da API
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
      } finally {
        setShowDeleteModal(false);
      }
    }
  };

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
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.nome}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'Ativo' ? 'outline' : 'default'}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => { setSelectedUser(user); setShowEditModal(true); }}>Editar</Button>
                    <Button onClick={() => { setSelectedUser(user); setShowDeleteModal(true); }} className="text-red-500">Excluir</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {showEditModal && selectedUser && (
        <EditUserModal
          user={selectedUser}
          onSave={handleEdit}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {showDeleteModal && selectedUser && (
        <DeleteUserModal
          userName={selectedUser.nome}
          onConfirm={handleDelete}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default UserList;
