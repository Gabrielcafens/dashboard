# PainelXS - Frontend

## Descrição

O **PainelXS** é uma aplicação frontend desenvolvida com Next.js, TypeScript, Tailwind CSS e Shadcn UI. Este projeto exibe um painel de controle interativo, com gráficos e estatísticas.

## Tecnologias Utilizadas

- **Next.js**: Framework React para criação de aplicativos web.
- **TypeScript**: Superset de JavaScript com tipagem estática.
- **Tailwind CSS**: Framework de utilitários CSS para design responsivo.
- **Shadcn UI**: Biblioteca de componentes UI.

## Estrutura do Projeto

- \`src/\`: Contém a estrutura principal do projeto.
  - \`app/\`: Contém os arquivos de configuração do layout e página.
  - \`components/\`: Contém os componentes reutilizáveis.
  - \`styles/\`: Contém os arquivos de estilo.
- \`public/\`: Contém os arquivos estáticos, como imagens e fontes.
- \`package.json\`: Contém as dependências e scripts do projeto.
- \`tsconfig.json\`: Configurações do TypeScript.
- \`tailwind.config.js\`: Configurações do Tailwind CSS.

## Instalação

1. Clone o repositório:

  ```bash
   git clone https://github.com/seu-usuario/painelxs.git
```
   cd painelxs


2. Instale as dependências:

  ```bash
   npm install
  ```

3. Inicie o servidor de desenvolvimento:

  ```bash
   npm run dev
  ```

4. Acesse a aplicação no navegador em [http://localhost:3000](http://localhost:3000).

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature ou correção.
3. Envie um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
EOL

# Criar README para o Backend (painelxs-backend)
cat <<EOL > painelxs-backend/README.md
# PainelXS Backend

## Descrição

O **PainelXS Backend** é um serviço de backend desenvolvido com Node.js e Express, utilizando SQLite como banco de dados. Este backend fornece uma API RESTful para gerenciar dados do painel.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express**: Framework para criação de APIs e servidores web.
- **SQLite**: Banco de dados leve e embutido.

## Estrutura do Projeto

- \`src/\`: Contém a lógica principal do backend.
  - \`server.js\`: Arquivo principal que configura o servidor Express.
  - \`db.js\`: Configurações e funções para interagir com o banco de dados SQLite.
  - \`populate-db.js\`: Script para popular o banco de dados com dados aleatórios.
- \`data.db\`: Banco de dados SQLite.
- \`package.json\`: Contém as dependências e scripts do projeto.

## Instalação

1. Clone o repositório:

  ```bash
   git clone https://github.com/seu-usuario/painelxs-backend.git
   cd painelxs-backend
  ```

2. Instale as dependências:

  ```bash
   npm install
  ```

3. Crie o banco de dados e popula com dados iniciais:

  ```bash
   node init-db.js
   node populate-db.js
  ```

4. Inicie o servidor:

  ```bash
   node server.js
  ```

5. A API estará disponível em [http://localhost:3001](http://localhost:3001).

## Endpoints

- **GET** \`/dashboard\` - Retorna todos os registros.
- **GET** \`/dashboard/:id\` - Retorna um registro específico.
- **POST** \`/dashboard\` - Cria um novo registro.
- **PUT** \`/dashboard/:id\` - Atualiza um registro existente.
- **DELETE** \`/dashboard/:id\` - Exclui um registro.

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature ou correção.
3. Envie um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

