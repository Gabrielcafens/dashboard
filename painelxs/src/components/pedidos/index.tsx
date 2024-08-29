'use client'

import { useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Cross2Icon, PlusIcon } from '@radix-ui/react-icons';
import { Input } from '../ui/input';

interface PedidoData {
  id: number;
  produto_id: number;
  cliente_id: number;
  usuario_id: number | null;
  quantidade: number;
  dataPedido: string;
}

const PedidosPage = () => {
  const [pedidos, setPedidos] = useState<PedidoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pedido, setPedido] = useState<Partial<PedidoData>>({});
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/pedidos');
        setPedidos(response.data);
      } catch (err) {
        setError('Erro ao carregar os pedidos.');
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  const handleSavePedido = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      if (isEditing && pedido.id) {
        await axios.put(`http://localhost:3001/pedidos/${pedido.id}`, pedido);
      } else {
        await axios.post('http://localhost:3001/pedidos', pedido);
      }
      const response = await axios.get<PedidoData[]>('http://localhost:3001/pedidos');
      setPedidos(response.data);
      setPedido({});
      setDialogOpen(false);
      setIsEditing(false);
    } catch (err) {
      setError(isEditing ? 'Erro ao atualizar pedido.' : 'Erro ao adicionar pedido.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditPedido = (pedido: PedidoData) => {
    setPedido(pedido);
    setIsEditing(true);
    setDialogOpen(true);
  };

  const handleDeletePedido = async (id: number) => {
    try {
      setIsSubmitting(true);
      await axios.delete(`http://localhost:3001/pedidos/${id}`);
      const response = await axios.get<PedidoData[]>('http://localhost:3001/pedidos');
      setPedidos(response.data);
    } catch (err) {
      setError('Erro ao excluir pedido.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPedido(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <PlusIcon className="animate-spin text-gray-500 text-3xl" />
      <p className="ml-2 text-xl">Carregando...</p>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen">
      <Cross2Icon className="text-red-500 text-3xl" />
      <p className="ml-2 text-xl">{error}</p>
    </div>
  );

  return (
    <div className="p-4">
      <h1 className="text-4xl font-extrabold mb-4">Pedidos</h1>

      {/* Add/Edit Pedido Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button>
            <PlusIcon className="mr-2" />
            Adicionar Novo Pedido
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Editar Pedido' : 'Adicionar Novo Pedido'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); handleSavePedido(); }} className="space-y-4">
            <div>
              <label htmlFor="produto_id" className="block text-sm font-medium text-gray-700">ID do Produto</label>
              <Input
                type="number"
                name="produto_id"
                placeholder="ID do Produto"
                value={pedido.produto_id || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="cliente_id" className="block text-sm font-medium text-gray-700">ID do Cliente</label>
              <Input
                type="number"
                name="cliente_id"
                placeholder="ID do Cliente"
                value={pedido.cliente_id || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="usuario_id" className="block text-sm font-medium text-gray-700">ID do Usuário</label>
              <Input
                type="number"
                name="usuario_id"
                placeholder="ID do Usuário (opcional)"
                value={pedido.usuario_id || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="quantidade" className="block text-sm font-medium text-gray-700">Quantidade</label>
              <Input
                type="number"
                name="quantidade"
                placeholder="Quantidade"
                value={pedido.quantidade || ''}
                onChange={handleInputChange}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (isEditing ? 'Atualizando...' : 'Adicionando...') : (isEditing ? 'Atualizar Pedido' : 'Adicionar Pedido')}
              </Button>
              <DialogClose asChild>
                <Button variant="secondary">Cancelar</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Order List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {pedidos.map(pedido => (
          <Card key={pedido.id} className="border p-4">
            <CardHeader>
              <h2 className="text-xl font-bold">Pedido #{pedido.id}</h2>
            </CardHeader>
            <CardContent>
              <p><strong>ID do Produto:</strong> {pedido.produto_id}</p>
              <p><strong>ID do Cliente:</strong> {pedido.cliente_id}</p>
              <p><strong>ID do Usuário:</strong> {pedido.usuario_id ?? 'Não atribuído'}</p>
              <p><strong>Quantidade:</strong> {pedido.quantidade}</p>
              <p><strong>Data do Pedido:</strong> {new Date(pedido.dataPedido).toLocaleDateString()}</p>
              <div className="mt-4 flex gap-2">
                <Button onClick={() => handleEditPedido(pedido)} variant="default">Editar</Button>
                <Button onClick={() => handleDeletePedido(pedido.id)} variant="destructive">Excluir</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PedidosPage;
