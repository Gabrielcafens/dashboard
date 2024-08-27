'use client'
import { useState } from 'react';
import { ProfileForm } from '@/components/profileForm';
import { RegisterForm } from '@/components/registerForm';
import { ForgotPasswordForm } from '@/components/forgotPasswordForm';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const LoginPage = () => {
  const [selectedTab, setSelectedTab] = useState("login");

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
            <ProfileForm />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
          <TabsContent value="forgot-password">
            <ForgotPasswordForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginPage;
