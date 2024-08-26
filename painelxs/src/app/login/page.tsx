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
      <Tabs defaultValue="login" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Criar Conta</TabsTrigger>
          <TabsTrigger value="forgot-password">Esqueci Senha</TabsTrigger>
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
  );
};

export default LoginPage;
