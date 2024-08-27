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
});

type FormData = z.infer<typeof formSchema>;

export function ForgotPasswordForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log("Forgot password data submitted:", data);
    try {
      const response = await api.post('/usuarios/forgot-password', data);
      console.log("Forgot password response:", response.data);

      if (response.status !== 200) {
        setErrorMessage(response.data.message || 'Something went wrong');
      } else {
        console.log("Password reset email sent."); 
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      setErrorMessage('Unexpected error occurred');
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
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <Button type="submit">Request Password Reset</Button>
      </form>
    </Form>
  );
}
