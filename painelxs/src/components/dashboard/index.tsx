// src/components/Dashboard.tsx
import { useEffect, useState } from 'react';
import api from '@/lib/axiosConfig';

interface DashboardData {
  totalVendas: number;
  novosClientes: number;
  totalPedidosHoje: number;
  totalPedidos30Dias: number;
  data: string;
}

const Dashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/dashboard');
        // Aqui assumimos que a resposta é um array e pegamos o primeiro item
        if (response.data.length > 0) {
            setData(response.data[0]);
          }
          
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  if (!data) return <div>Carregando...</div>;

  return (
    <div>
      <p>Total de Vendas: {data.totalVendas}</p>
      <p>Novos Clientes: {data.novosClientes}</p>
      <p>Total de Pedidos Hoje: {data.totalPedidosHoje}</p>
      <p>Total de Pedidos em 30 Dias: {data.totalPedidos30Dias}</p>
      <p>Data: {data.data}</p>
    </div>
  );
};

export default Dashboard;
