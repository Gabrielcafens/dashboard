import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import api from '@/lib/axiosConfig';

const formSchema = z.object({
  nome: z.string().min(1, { message: "Nome é obrigatório." }),
  email: z.string().email({ message: "Endereço de email inválido." }),
  senha: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
});

type FormData = z.infer<typeof formSchema>;

export function RegisterForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await api.post('/usuarios', data);

      if (response.status === 201) {
        console.log('Usuário criado:', response.data);
        // Redirecionar ou mostrar mensagem de sucesso
      } else {
        setErrorMessage(response.data.message || 'Algo deu errado');
      }
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      setErrorMessage('Ocorreu um erro inesperado');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome" {...field} />
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
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Sua senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <Button type="submit" className="w-full">Criar Conta</Button>
      </form>
    </Form>
  );
}
