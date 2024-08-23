// src/app/userlist/page.tsx

import UserList from "../../components/userlist";

export default function UserListPage() {
  return (
    <div className="flex flex-col p-4 pl-64"> {/* Ajuste o padding-left conforme a largura da sua barra lateral */}
      <h1 className="text-2xl font-bold mb-4">Usuarios</h1>
      <UserList />
    </div>
  );
}
