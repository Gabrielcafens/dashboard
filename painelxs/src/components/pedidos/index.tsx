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
  id?: number;
  produto_id: number;
  cliente_id: number;
  quantidade: number;
  dataPedido?: string;
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
        console.log('Fetching pedidos...');
        const response = await axios.get('http://localhost:3001/pedidos');
        console.log('Pedidos fetched:', response.data);
        setPedidos(response.data);
      } catch (err) {
        console.error('Error fetching pedidos:', err);
        setError('Erro ao carregar os pedidos.');
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  const handleSavePedido = async () => {
    if (isSubmitting) return;

    const updatedPedido = {
      ...pedido,
      quantidade: Number(pedido.quantidade),
      dataPedido: pedido.dataPedido || new Date().toISOString(),
    };

    console.log('Preparing to save pedido:', updatedPedido);

    // Validations
    if (!updatedPedido.produto_id || !updatedPedido.cliente_id || !updatedPedido.quantidade) {
      console.error('Validation failed: Missing required fields');
      setError('Todos os campos obrigatórios devem ser preenchidos.');
      return;
    }

    try {
      setIsSubmitting(true);

      if (isEditing && pedido.id) {
        console.log('Updating pedido:', updatedPedido);
        await axios.put(`http://localhost:3001/pedidos/${pedido.id}`, updatedPedido);
      } else {
        console.log('Creating pedido:', updatedPedido);
        const response = await axios.post('http://localhost:3001/pedidos', updatedPedido);
        console.log('Pedido created with ID:', response.data.id);
      }

      const response = await axios.get('http://localhost:3001/pedidos');
      console.log('Pedidos updated:', response.data);
      setPedidos(response.data);
      setPedido({});
      setDialogOpen(false);
      setIsEditing(false);
    } catch (err) {
      console.error('Error saving pedido:', err);
      setError(isEditing ? 'Erro ao atualizar pedido.' : 'Erro ao adicionar pedido.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditPedido = (pedido: PedidoData) => {
    console.log('Editing pedido:', pedido);
    setPedido(pedido);
    setIsEditing(true);
    setDialogOpen(true);
  };

  const handleDeletePedido = async (id: number) => {
    try {
      setIsSubmitting(true);
      console.log('Deleting pedido ID:', id);
      await axios.delete(`http://localhost:3001/pedidos/${id}`);
      console.log('Pedido deleted.');
      const response = await axios.get<PedidoData[]>('http://localhost:3001/pedidos');
      console.log('Pedidos updated:', response.data);
      setPedidos(response.data);
    } catch (err) {
      console.error('Error deleting pedido:', err);
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {pedidos.map(pedido => (
          <Card key={pedido.id} className="border p-4">
            <CardHeader>
              <h2 className="text-xl font-bold">Pedido #{pedido.id}</h2>
            </CardHeader>
            <CardContent>
              <p><strong>ID do Produto:</strong> {pedido.produto_id}</p>
              <p><strong>ID do Cliente:</strong> {pedido.cliente_id}</p>
              <p><strong>Quantidade:</strong> {pedido.quantidade}</p>
              <p><strong>Data do Pedido:</strong> {pedido.dataPedido ? new Date(pedido.dataPedido).toLocaleDateString() : 'Não disponível'}</p>
              <div className="mt-4 flex gap-2">
                <Button onClick={() => handleEditPedido(pedido)} variant="default">Editar</Button>
                <Button onClick={() => handleDeletePedido(pedido.id!)} variant="destructive">Excluir</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PedidosPage;
