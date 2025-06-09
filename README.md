# Digital Catalog 📱

Um catálogo digital moderno e responsivo para exibir produtos online. Esta aplicação permite criar, gerenciar e exibir um catálogo de produtos com uma interface moderna e elegante.

![Digital Catalog Preview](https://via.placeholder.com/1200x630?text=Digital+Catalog+Preview)

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

- **Frontend**:
  - [Next.js 15](https://nextjs.org/) - Framework React com renderização híbrida
  - [React 19](https://reactjs.org/) - Biblioteca JavaScript para criação de interfaces
  - [TailwindCSS 4](https://tailwindcss.com/) - Framework CSS para design responsivo
  - [React Toastify](https://fkhadra.github.io/react-toastify/) - Biblioteca para notificações elegantes

- **Backend**:
  - [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) - Backend serverless
  - [Prisma](https://www.prisma.io/) - ORM para banco de dados
  - [PostgreSQL](https://www.postgresql.org/) - Banco de dados relacional
  - [MinIO](https://min.io/) - Armazenamento de objetos compatível com S3
  - [Zod](https://zod.dev/) - Validação de esquemas TypeScript-first

- **Infraestrutura**:
  - [Docker](https://www.docker.com/) - Containerização do ambiente de desenvolvimento
  - [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript tipado

## ✨ Funcionalidades

- 🖼️ Design moderno e responsivo
- 📱 Interface adaptável para dispositivos móveis
- 🔒 Autenticação segura
- 📝 CRUD completo para produtos
- 🖼️ Upload de imagens com conversão automática de HEIC para JPEG
- 📷 Suporte para captura de imagens via câmera em dispositivos móveis
- 🌓 Tema claro/escuro baseado nas preferências do sistema
- 🔔 Notificações elegantes com React Toastify
- 🔍 Validações de formulário

## 🛠️ Pré-requisitos

Para rodar este projeto localmente, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (v20 ou superior)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

## 🚦 Como executar

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/digital-catalog.git
cd digital-catalog
```

### 2. Configure as variáveis de ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

### 3. Inicie os contêineres Docker

```bash
docker-compose up -d
```

Isso iniciará o PostgreSQL e o MinIO necessários para o projeto.

### 4. Configure o bucket no MinIO

1. Acesse a interface web do MinIO em [http://localhost:9001](http://localhost:9001)
2. Faça login com as credenciais: 
   - Usuário: `admin`
   - Senha: `admin123`
3. Crie um novo bucket chamado `digital-catalog`

### 5. Instale as dependências

```bash
npm install
```

### 6. Execute as migrações do banco de dados

```bash
npx prisma migrate dev
```

### 7. Execute os seeds (dados de exemplo)

```bash
npm run prisma:seed
```

### 8. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) para visualizar o catálogo.

## 📁 Estrutura do Projeto

```
src/
  app/
    (back-end)/       # Rotas de API e backend
      api/
        _env/         # Configurações de ambiente
        _lib/         # Utilitários do servidor
        (routes)/     # Rotas de API
    (front-end)/      # Frontend da aplicação
      _components/    # Componentes React reutilizáveis
      _hooks/         # Hooks personalizados
      _types/         # Definições de tipos TypeScript
      _utils/         # Funções utilitárias
      admin/          # Painel administrativo
      login/          # Página de login
      globals.css     # Estilos globais
      layout.tsx      # Layout principal
      page.tsx        # Página inicial do catálogo
```

## 🔍 Rotas da API

- **GET /api/products** - Lista todos os produtos
- **POST /api/products** - Cria um novo produto
- **GET /api/products/:id** - Obtém detalhes de um produto
- **DELETE /api/products/:id** - Remove um produto
- **POST /api/auth/login** - Autenticação de usuário
- **POST /api/auth/logout** - Logout de usuário

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

Feito por [Edgar Barroso](https://github.com/edgarbarroso).

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
