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
import { useRouter } from 'next/navigation';

// Configuração do axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

type FormData = z.infer<typeof formSchema>;

export function ForgotPasswordForm({ onTabChange }: { onTabChange: (tab: string) => void }) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log("Forgot password data submitted:", data);
    setIsSubmitting(true);

    try {
      const response = await api.post('/usuarios/forgot-password', data);
      console.log("Forgot password response:", response.data);

      if (response.status === 200) {
        console.log("Password reset email sent.");
        setSuccessMessage(`E-mail de redefinição de senha enviado para ${data.email}`);
        setErrorMessage(null);

        // Redirecionar para a aba de login após 10 segundos
        setTimeout(() => {
          onTabChange("login"); // Mudar para a aba de login
        }, 8000); // Tempo de espera em milissegundos (10 segundos)
      } else {
        setErrorMessage(response.data.message || 'Something went wrong');
        setSuccessMessage(null);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Forgot password error:', error.response?.data || error.message);
        setErrorMessage('Unexpected error occurred');
        setSuccessMessage(null);
      } else {
        console.error('Forgot password error:', error);
        setErrorMessage('Unexpected error occurred');
        setSuccessMessage(null);
      }
    } finally {
      setIsSubmitting(false);
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
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting} // Desabilitar o botão enquanto está enviando
          >
            {isSubmitting ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
