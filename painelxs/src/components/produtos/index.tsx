'use client'

import { useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

interface ProdutoData {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidadeEstoque: number;
  dataCriacao: string;
}

const ProdutosPage = () => {
  const [produtos, setProdutos] = useState<ProdutoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [produto, setProduto] = useState<Partial<ProdutoData>>({});
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/produtos');
        setProdutos(response.data);
      } catch (err) {
        setError('Erro ao carregar os produtos.');
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  const handleSaveProduto = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      if (isEditing && produto.id) {
        console.log('Atualizando produto:', produto); // Log para atualizar
        await axios.put(`http://localhost:3001/produtos/${produto.id}`, produto);
      } else {
        console.log('Adicionando produto:', produto); // Log para adicionar
        await axios.post('http://localhost:3001/produtos', produto);
      }
      const response = await axios.get<ProdutoData[]>('http://localhost:3001/produtos');
      setProdutos(response.data);
      setProduto({});
      setDialogOpen(false);
      setIsEditing(false);
    } catch (err) {
      setError(isEditing ? 'Erro ao atualizar produto.' : 'Erro ao adicionar produto.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditProduto = (produto: ProdutoData) => {
    console.log('Editando produto:', produto); // Log para editar
    setProduto(produto);
    setIsEditing(true);
    setDialogOpen(true);
  };

  const handleDeleteProduto = async (id: number) => {
    try {
      setIsSubmitting(true);
      console.log('Deletando produto com ID:', id); // Log para deletar
      await axios.delete(`http://localhost:3001/produtos/${id}`);
      const response = await axios.get<ProdutoData[]>('http://localhost:3001/produtos');
      setProdutos(response.data);
    } catch (err) {
      setError('Erro ao excluir produto.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProduto(prev => ({
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
      <h1 className="text-4xl font-extrabold mb-4">Produtos</h1>

      {/* Add/Edit Product Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button>
            <PlusIcon className="mr-2" />
            Adicionar Novo Produto
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Editar Produto' : 'Adicionar Novo Produto'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); handleSaveProduto(); }} className="space-y-4">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
              <Input
                type="text"
                name="nome"
                placeholder="Nome"
                value={produto.nome || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição</label>
              <Input
                type="text"
                name="descricao"
                placeholder="Descrição"
                value={produto.descricao || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="preco" className="block text-sm font-medium text-gray-700">Preço</label>
              <Input
                type="number"
                name="preco"
                placeholder="Preço"
                value={produto.preco || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="quantidadeEstoque" className="block text-sm font-medium text-gray-700">Quantidade em Estoque</label>
              <Input
                type="number"
                name="quantidadeEstoque"
                placeholder="Quantidade em Estoque"
                value={produto.quantidadeEstoque || ''}
                onChange={handleInputChange}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (isEditing ? 'Atualizando...' : 'Adicionando...') : (isEditing ? 'Atualizar Produto' : 'Adicionar Produto')}
              </Button>
              <DialogClose asChild>
                <Button variant="secondary">Cancelar</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {produtos.map(produto => (
          <Card key={produto.id} className="border p-4">
            <CardHeader>
              <h2 className="text-xl font-bold">{produto.nome}</h2>
            </CardHeader>
            <CardContent>
              <p><strong>Descrição:</strong> {produto.descricao}</p>
              <p><strong>Preço:</strong> R${produto.preco.toFixed(2)}</p>
              <p><strong>Quantidade em Estoque:</strong> {produto.quantidadeEstoque}</p>
              <p><strong>Data de Criação:</strong> {new Date(produto.dataCriacao).toLocaleDateString()}</p>
              <div className="mt-4 flex gap-2">
                <Button onClick={() => handleEditProduto(produto)} variant="default">Editar</Button>
                <Button onClick={() => handleDeleteProduto(produto.id)} variant="destructive">Excluir</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProdutosPage;
