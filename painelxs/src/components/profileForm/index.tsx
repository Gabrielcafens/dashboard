import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from 'axios';

// Configuração do axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  senha: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type FormData = z.infer<typeof formSchema>;

export function ProfileForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log("Login data submitted:", data);  // Log dos dados
    try {
      const response = await api.post('/usuarios/login', data);
      console.log("Login response:", response.data);  // Log da resposta

      if (response.status === 200) {
        console.log("Token:", response.data.token);
        setSuccessMessage('Login bem-sucedido');
        setErrorMessage(null);  // Limpar mensagem de erro, se houver

        // Redirecionar para o dashboard após alguns segundos
        setTimeout(() => {
          window.location.href = '/dashboard'; // Redirecionar para o dashboard
        }, 2000); // Tempo de espera em milissegundos (2 segundos)
      } else {
        setErrorMessage(response.data.message || 'Something went wrong');
        setSuccessMessage(null);  // Limpar mensagem de sucesso, se houver
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Login error:', error.response?.data || error.message);
        setErrorMessage('Unexpected error occurred');
        setSuccessMessage(null);  // Limpar mensagem de sucesso, se houver
      } else {
        console.error('Login error:', error);
        setErrorMessage('Unexpected error occurred');
        setSuccessMessage(null);  // Limpar mensagem de sucesso, se houver
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="senha"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <Button type="submit" className="w-full">Login</Button>
        </form>
      </Form>
    </div>
  );
}
