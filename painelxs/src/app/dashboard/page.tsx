// src/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axiosConfig';
import { ChartOverview } from "@/components/chart";
import Sales from "@/components/sales";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeDollarSign, DollarSign, Percent, Users } from "lucide-react";

// Define the type for the data returned by the API
interface DashboardData {
  totalSales: number;
  newCustomers: number;
  ordersToday: number;
  totalOrders: number;
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData>({
    totalSales: 0,
    newCustomers: 0,
    ordersToday: 0,
    totalOrders: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the API request
        const response = await api.get<DashboardData>('/dashboard'); // Adjust the endpoint as needed
        // Update the state with the response data
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="sm:ml-14 p-4">
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">Total de vendas</CardTitle>
              <DollarSign className="ml-auto w-4 h-4" />
            </div>
            <CardDescription>
              Total de vendas em 90 dias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-base sm:text-lg font-bold">R$ {data.totalSales}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">Novos clientes</CardTitle>
              <Users className="ml-auto w-4 h-4" />
            </div>
            <CardDescription>
              Novos clientes em 30 dias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-base sm:text-lg font-bold">{data.newCustomers}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">Pedidos hoje</CardTitle>
              <Percent className="ml-auto w-4 h-4" />
            </div>
            <CardDescription>
              Total de pedidos hoje
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-base sm:text-lg font-bold">{data.ordersToday}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">Total pedidos</CardTitle>
              <BadgeDollarSign className="ml-auto w-4 h-4" />
            </div>
            <CardDescription>
              Total de pedidos em 30 dias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-base sm:text-lg font-bold">{data.totalOrders}</p>
          </CardContent>
        </Card>
      </section>
      <section className="mt-4 flex flex-col md:flex-row gap-4">
        <ChartOverview />
        <Sales />
      </section>
    </main>
  );
}
