"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import api from '@/lib/axiosConfig';

const formSchema = z.object({
  email: z.string().email({ message: "Endereço de email inválido." }),
});

type FormData = z.infer<typeof formSchema>;

export function ForgotPasswordForm() {
  const [message, setMessage] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await api.post('/usuarios/forgot-password', data);
      setMessage('E-mail de redefinição de senha enviado com sucesso.');
    } catch (error) {
      console.error('Erro ao solicitar redefinição de senha:', error);
      setMessage('Erro ao solicitar redefinição de senha.');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        {message && <p className="text-red-500">{message}</p>}
        <Button type="submit">Solicitar Redefinição de Senha</Button>
      </form>
    </Form>
  );
}
