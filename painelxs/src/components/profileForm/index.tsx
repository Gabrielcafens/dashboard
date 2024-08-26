"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  senha: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type FormData = z.infer<typeof formSchema>;


export function ProfileForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Configurando o formulário
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  })
  // Função de submissão
  const onSubmit = async (data: FormData) => {
        try {
          const response = await fetch('http://localhost:3001/usuarios/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
          
          
      
          if (!response.ok) {
            const errorData = await response.json();
            setErrorMessage(errorData.message || 'Something went wrong');
          } else {
            const result = await response.json();
            console.log(result.token); 
          }
        } catch (error) {
          console.error('Error:', error);
          setErrorMessage('An unexpected error occurred');
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
