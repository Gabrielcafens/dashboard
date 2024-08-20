// src/app/dashboard/page.tsx
'use client'
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card'; // Verifique o caminho e a disponibilidade desses componentes

interface DashboardData {
  id: number;
  totalVendas: number;
  novosClientes: number;
  totalPedidosHoje: number;
  totalPedidos30Dias: number;
  data: string;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/dashboard');
        console.log('Status da resposta:', response.status); // Adicionado para depuração
        if (!response.ok) {
          throw new Error('Erro ao buscar os dados do dashboard');
        }
        const result = await response.json();
        console.log('Dados recebidos:', result); // Adicionado para depuração
        setData(result);
      } catch (err) {
        console.error('Erro ao buscar dados:', err); // Adicionado para depuração
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {data.length > 0 ? (
        data.map((item) => (
          <Card key={item.id} className="mb-4">
            <CardHeader>
              <h2 className="text-xl font-semibold">ID: {item.id}</h2>
            </CardHeader>
            <CardContent>
              <div><strong>Total de Vendas:</strong> {item.totalVendas}</div>
              <div><strong>Novos Clientes:</strong> {item.novosClientes}</div>
              <div><strong>Total de Pedidos Hoje:</strong> {item.totalPedidosHoje}</div>
              <div><strong>Total de Pedidos nos Últimos 30 Dias:</strong> {item.totalPedidos30Dias}</div>
              <div><strong>Data:</strong> {new Date(item.data).toLocaleDateString()}</div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p>Nenhum dado disponível.</p>
      )}
    </div>
  );
}
