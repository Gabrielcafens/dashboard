// src/app/login/page.tsx
import { ProfileForm } from '@/components/profileForm'; // Certifique-se de que o caminho está correto

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ProfileForm />
    </div>
  );
};

export default LoginPage;
