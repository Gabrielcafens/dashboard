'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {produtos.map((produto) => (
          <Card key={produto.id} className="shadow-lg">
            <CardHeader>
              <h2 className="text-lg font-semibold">
                {produto.nome}
              </h2>
            </CardHeader>
            <CardContent>
              <p className="mb-2">
                {produto.descricao}
              </p>
              <p className="mb-2">
                Preço: R${produto.preco.toFixed(2)}
              </p>
              <p className="mb-2">
                Quantidade em estoque: {produto.quantidadeEstoque}
              </p>
              <p className="mb-2">
                Data de criação: {produto.dataCriacao}
              </p>
              <Button variant="default">
                Comprar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProdutosPage;
