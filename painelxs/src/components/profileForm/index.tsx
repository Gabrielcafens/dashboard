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
import api from '@/lib/axiosConfig';

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  senha: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type FormData = z.infer<typeof formSchema>;

export function ProfileForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Configurando o formulário
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  // Função de submissão
  const onSubmit = async (data: FormData) => {
    try {
      const response = await api.post('/usuarios/login', data);

      if (response.status !== 200) {
        setErrorMessage(response.data.message || 'Algo deu errado');
      } else {
        console.log(response.data.token); 
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Ocorreu um erro inesperado');
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
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <Button type="submit" className="w-full">Submit</Button> {/* Botão de largura total */}
        </form>
      </Form>
    </div>
  );
}
