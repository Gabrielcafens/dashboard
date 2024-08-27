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
  nome: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  senha: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type FormData = z.infer<typeof formSchema>;

export function RegisterForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log("Register data submitted:", data);  // Log dos dados
    try {
      const response = await api.post('/usuarios', data);
      console.log("Register response:", response.data);  // Log da resposta

      if (response.status === 201) {
        console.log("User created:", response.data);
        setSuccessMessage('User created successfully');
        setErrorMessage(null);  // Limpar mensagem de erro, se houver

        // Redirecionar para a aba de login após alguns segundos
        setTimeout(() => {
          setSuccessMessage('Faça seu primeiro login agora'); // Mensagem após o redirecionamento
          window.location.href = '/login?tab=login&message=Faça seu primeiro login agora'; // Atualizar a URL para o estado correto
        }, 2000); // Tempo de espera em milissegundos (2 segundos)
      } else {
        setErrorMessage(response.data.message || 'Something went wrong');
        setSuccessMessage(null);  // Limpar mensagem de sucesso, se houver
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Register error:', error.response?.data || error.message);
        setErrorMessage('Unexpected error occurred');
        setSuccessMessage(null);  // Limpar mensagem de sucesso, se houver
      } else {
        console.error('Register error:', error);
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
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <Button type="submit" className="w-full">Register</Button>
        </form>
      </Form>
    </div>
  );
}
