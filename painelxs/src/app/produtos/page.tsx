// src/app/userlist/page.tsx

import Produtos from "../../components/produtos";

export default function UserListPage() {
  return (
    <div className="flex flex-col p-4 pl-64">
      <h1 className="text-2xl font-bold mb-4">Produtos</h1>
      <Produtos />
    </div>
  );
}
