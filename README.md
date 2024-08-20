# PainelXS - Frontend

## Descrição

O **PainelXS** é uma aplicação frontend moderna que fornece um painel de controle interativo para visualizar gráficos e estatísticas. Desenvolvido com Next.js, TypeScript, Tailwind CSS e Shadcn UI, o PainelXS é ideal para análise de dados e monitoramento de métricas importantes em tempo real.

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
   cd painelxs
  ```

2. Instale as dependências:

  ```bash
   npm install
  ```

3. Inicie o servidor de desenvolvimento:

  ```bash
   npm run dev
  ```
4.Crie um arquivo \`.env\` na raiz do projeto frontend e adicione:

```
# URL base para a API
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001


# Outras variáveis de ambiente, se necessário
NEXT_PUBLIC_SOME_OTHER_ENV_VARIABLE=value

```
5. Acesse a aplicação no navegador em [http://localhost:3000](http://localhost:3000).

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

3. **Primeiros Comandos**: Se você está configurando o projeto pela primeira vez e as tabelas ainda não foram criadas, você precisa inicializar o banco de dados e criar as tabelas necessárias. Execute:

  ```bash
   node init-db.js
  ```

   Este comando criará as tabelas necessárias no banco de dados. Após a execução, você pode popular o banco com dados iniciais.

4. Popule o banco de dados com dados iniciais:

  ```bash
   node populate-db.js
  ```

5. Inicie o servidor:

  ```bash
   node server.js
  ```

6. A API estará disponível em [http://localhost:3001](http://localhost:3001).

## Endpoints

- **GET** \`/dashboard\` - Retorna todos os registros do dashboard.
- **GET** \`/dashboard/:id\` - Retorna um registro específico do dashboard.
- **POST** \`/dashboard\` - Cria um novo registro no dashboard.
- **PUT** \`/dashboard/:id\` - Atualiza um registro existente no dashboard.
- **DELETE** \`/dashboard/:id\` - Exclui um registro do dashboard.

- **GET** \`/usuarios\` - Retorna todos os usuários.
- **GET** \`/usuarios/:id\` - Retorna um usuário específico.
- **POST** \`/usuarios\` - Cria um novo usuário.
- **PUT** \`/usuarios/:id\` - Atualiza um usuário existente.
- **DELETE** \`/usuarios/:id\` - Exclui um usuário.

## Configuração do Ambiente

Para o backend, você precisa definir as seguintes variáveis de ambiente:

- \`PORT\`: Porta onde o servidor Express será executado (opcional, padrão é \`3001\`).
- \`DATABASE_URL\`: URL do banco de dados SQLite (se não estiver usando o padrão \`./data.db\`).

Crie um arquivo \`.env\` na raiz do projeto backend e adicione:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_API_KEY=your_api_key_here
NEXT_PUBLIC_AUTH_TOKEN=your_auth_token_here
NEXT_PUBLIC_ENVIRONMENT=development
NEXT_PUBLIC_API_TIMEOUT=5000
PORT=3001
DATABASE_URL=./data.db
```
# Uso do Postman

# 1. Importar Coleção
# Importe a coleção de endpoints para o Postman. Você pode criar uma nova coleção manualmente ou usar um arquivo JSON de coleção existente.

# 2. Configurar Ambiente
# Crie um ambiente no Postman para definir variáveis como a URL base da API. Adicione uma variável `baseUrl` com o valor `http://localhost:3001`.

# 3. Testar Endpoints
# - **GET** `/dashboard`: Teste obtendo todos os registros do dashboard.
# - **GET** `/dashboard/:id`: Teste obtendo um registro específico.
# - **POST** `/dashboard`: Teste criando um novo registro. No corpo da requisição, inclua os dados do novo registro.
# - **PUT** `/dashboard/:id`: Teste atualizando um registro existente. No corpo da requisição, inclua os dados atualizados.
# - **DELETE** `/dashboard/:id`: Teste excluindo um registro.

# - **GET** `/usuarios`: Teste obtendo todos os usuários.
# - **GET** `/usuarios/:id`: Teste obtendo um usuário específico.
# - **POST** `/usuarios`: Teste criando um novo usuário. No corpo da requisição, inclua os dados do novo usuário.
# - **PUT** `/usuarios/:id`: Teste atualizando um usuário existente. No corpo da requisição, inclua os dados atualizados.
# - **DELETE** `/usuarios/:id`: Teste excluindo um usuário.

# 4. Verificar Respostas
# Verifique as respostas da API no Postman para garantir que os dados estão sendo retornados e manipulados corretamente. Confirme que os códigos de status e os corpos das respostas estão de acordo com o esperado.

## Desenvolvimento e Testes

### Executar Testes

Para garantir que tudo está funcionando corretamente, você pode executar os testes automatizados. Adicione scripts de teste ao seu \`package.json\` e forneça instruções para executá-los.

```bash
npm test
```

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature ou correção.
3. Envie um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE). Veja o arquivo LICENSE para mais detalhes.

