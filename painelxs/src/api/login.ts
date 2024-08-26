import type { NextApiRequest, NextApiResponse } from 'next';
import api from '@/lib/axiosConfig';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, senha } = req.body;

    try {
      const response = await api.post('/usuarios/login', { email, senha });
      
      // Sucesso no login
      res.status(200).json(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Erro na solicitação
        res.status(error.response?.status || 500).json({ message: error.response?.data?.message || 'Erro ao fazer login' });
      } else {
        // Outro tipo de erro
        res.status(500).json({ message: 'Erro inesperado' });
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
