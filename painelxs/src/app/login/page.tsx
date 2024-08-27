'use client'
import { useState, useEffect } from 'react';
import { ProfileForm } from '@/components/profileForm';
import { RegisterForm } from '@/components/registerForm';
import { ForgotPasswordForm } from '@/components/forgotPasswordForm';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useSearchParams } from 'next/navigation';

const LoginPage = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'login';
  const message = searchParams.get('message');

  const [selectedTab, setSelectedTab] = useState(tab);

  useEffect(() => {
    setSelectedTab(tab);
  }, [tab]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md min-h-[490px] p-8 bg-white shadow-md rounded-lg">
        <Tabs defaultValue="login" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="flex justify-between mb-4">
            <TabsTrigger value="login" className="w-full">Login</TabsTrigger>
            <TabsTrigger value="register" className="w-full">Criar Conta</TabsTrigger>
            <TabsTrigger value="forgot-password" className="w-full">Esqueci Senha</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            {message && <p className="text-green-500">{message}</p>}
            <ProfileForm />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
          <TabsContent value="forgot-password">
            <ForgotPasswordForm onTabChange={setSelectedTab} />
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
};

export default LoginPage;
