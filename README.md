
# PainelXS - Frontend

## Descrição

O **PainelXS** é uma aplicação frontend moderna que fornece um painel de controle interativo para visualizar gráficos e estatísticas. Desenvolvido com Next.js, TypeScript, Tailwind CSS e Shadcn UI, o PainelXS é ideal para análise de dados e monitoramento de métricas importantes em tempo real.

## Tecnologias Utilizadas

- **Next.js**: Framework React para criação de aplicativos web.
- **TypeScript**: Superset de JavaScript com tipagem estática.
- **Tailwind CSS**: Framework de utilitários CSS para design responsivo.
- **Shadcn UI**: Biblioteca de componentes UI.

## Estrutura do Projeto

- `src/`: Contém a estrutura principal do projeto.
  - `app/`: Contém os arquivos de configuração do layout e página.
  - `components/`: Contém os componentes reutilizáveis.
  - `styles/`: Contém os arquivos de estilo.
- `public/`: Contém os arquivos estáticos, como imagens e fontes.
- `package.json`: Contém as dependências e scripts do projeto.
- `tsconfig.json`: Configurações do TypeScript.
- `tailwind.config.js`: Configurações do Tailwind CSS.

## Instalação

1. Clone o repositório:

  ```bash
   git clone https://github.com/Gabrielcafens/dashboard.git
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

4. Crie um arquivo `.env` na raiz do projeto frontend e adicione:

```
# URL base para a API
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001

# Outras variáveis de ambiente, se necessário
NEXT_PUBLIC_SOME_OTHER_ENV_VARIABLE=value
```

5. Acesse a aplicação no navegador em [http://localhost:3000](http://localhost:3000).

# PainelXS Backend

## Descrição

O **PainelXS Backend** é um serviço de backend desenvolvido com Node.js e Express, utilizando SQLite como banco de dados. Este backend fornece uma API RESTful para gerenciar dados do painel, bem como funcionalidades de autenticação, incluindo redefinição de senha.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express**: Framework para criação de APIs e servidores web.
- **SQLite**: Banco de dados leve e embutido.
- **Nodemailer**: Biblioteca para envio de e-mails.
- **Bcrypt**: Biblioteca para hashing de senhas.

## Estrutura do Projeto

- `src/`: Contém a lógica principal do backend.
  - `server.js`: Arquivo principal que configura o servidor Express.
  - `db.js`: Configurações e funções para interagir com o banco de dados SQLite.
  - `populate-db.js`: Script para popular o banco de dados com dados aleatórios.
  - `controllers/usuariosController.js`: Lógica para gerenciamento de usuários, incluindo redefinição de senha.
- `data.db`: Banco de dados SQLite.
- `package.json`: Contém as dependências e scripts do projeto.

## Instalação

1. Clone o repositório:

  ```bash
   git clone https://github.com/Gabrielcafens/dashboard.git
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

## Funcionalidade de Redefinição de Senha

O backend inclui um fluxo completo de redefinição de senha, que utiliza o Mailtrap para teste de envio de e-mails. 

### Requisitos

- **Mailtrap**: Usado para capturar e-mails enviados durante o desenvolvimento e testes.

### Configuração do Mailtrap

1. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente de seu mailtrap:

    ```bash
    MAILTRAP_HOST=xxxxxx
    MAILTRAP_PORT=xxxx
    MAILTRAP_USER=xxxx
    MAILTRAP_PASS=XXXX
    ```

2. O envio de e-mails é configurado em `src/controllers/usuariosController.js` usando Nodemailer com as credenciais do Mailtrap.

### Fluxo de Redefinição de Senha

1. **Solicitação de Redefinição de Senha**: O usuário envia uma solicitação para redefinir a senha com seu e-mail.

    Endpoint: `POST /usuarios/forgot-password`

    **Exemplo de solicitação:**
    ```json
    {
      "email": "gabrielcafens@gmail.com"
    }
    ```

2. **Envio de E-mail**: Um e-mail é enviado para o usuário com um link para redefinir a senha.

3. **Redefinição de Senha**: O usuário acessa o link e fornece uma nova senha.

    Endpoint: `POST /usuarios/reset-password`

    **Exemplo de solicitação:**
    ```json
    {
      "token": "token-gerado",
      "password": "nova-senha"
    }
    ```

## Testes com Postman

1. **Solicitar Redefinição de Senha**:

    - Endpoint: `POST /usuarios/forgot-password`
    - Corpo da requisição: `{ "email": "seu-email@example.com" }`

2. **Redefinir Senha**:

    - Endpoint: `POST /usuarios/reset-password`
    - Corpo da requisição: `{ "token": "token-gerado", "password": "nova-senha" }`

3. **Verifique os E-mails Recebidos**: Use a interface do Mailtrap para verificar os e-mails enviados durante os testes.

## Prints de Testes

1. **Print 1**: 
    ![image](https://github.com/user-attachments/assets/e9ae01cb-f978-4f3c-a25c-fdb917961719)

    Inbox do Mailtrap com o e-mail de redefinição recebido.
2. **Print 2**:
    ![image](https://github.com/user-attachments/assets/7375b9dd-0d91-4d42-aaca-b2678de43cc1)

     E-mail de redefinição de senha com o token.
3. **Print 3**: 
    ![image](https://github.com/user-attachments/assets/8a7c1b89-b475-49f3-a203-2dc64b13a768)

    Postman realizando com sucesso a alteração de senha.

## Desenvolvimento e Testes

### Executar Testes

Para garantir que tudo está funcionando corretamente, você pode executar os testes automatizados. Adicione scripts de teste ao seu `package.json` e forneça instruções para executá-los.

```bash
npm test
```

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature ou correção.
3. Envie um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE). Veja o arquivo LICENSE para mais detalhes.

## Observações

- Este projeto está em constante desenvolvimento e novas funcionalidades serão adicionadas futuramente.

```                         ___

                          ___
                      .-'   `'.
                     /         \
                     |         ;
                     |         |           ___.--,
            _.._     |0) = (0) |    _.---'`__.-( (_.
     __.--'`_.. '.__.\    '--. \_.-' ,.--'`     `""`
    ( ,.--'`   ',__ /./;   ;, '.__.'`    __
    _`) )  .---.__.' / |   |\   \__..--""  """--.,_
   `---' .'.''-._.-'`_./  /\ '.  \ _.--''````'''--._`-.__.'
         | |  .' _.-' |  |  \  \  '.               `----`
          \ \/ .'     \  \   '. '-._)
           \/ /        \  \    `=.__`'-.
           / /\         `) )    / / `"".`\
     , _.-'.'\ \        / /    ( (     / /
      `--'`   ) )    .-'.'      '.'.  | (
             (/`    ( (`          ) )  '-;    
            
  ( (                ( (                 ( (                
   ) )                ) )                 ) )               
.........           .........         .........           
|       |]         |       |]         |       |]                
\       /           \       /         \       /              
 `-----'             `-----'           `-----'  
