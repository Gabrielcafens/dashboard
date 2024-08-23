import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, senha } = req.body;

    try {
      const response = await axios.post(`${API_BASE_URL}/usuarios/login`, {
        email,
        senha
      });

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
