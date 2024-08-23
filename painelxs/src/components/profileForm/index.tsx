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

// Definindo o schema do formulário com Zod
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

type FormData = z.infer<typeof formSchema>

export function ProfileForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Configurando o formulário
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  // Função de submissão
  const onSubmit = async (data: FormData) => {
    try {
      // Enviar dados para o backend
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        // Exibir mensagem de erro
        const errorData = await response.json()
        setErrorMessage(errorData.error || 'Something went wrong')
      } else {
        // Sucesso
        const result = await response.json()
        console.log(result.message)
        // Redirecionar ou mostrar mensagem de sucesso
      }
    } catch (error) {
      console.error('Error:', error)
      setErrorMessage('An unexpected error occurred')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
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
