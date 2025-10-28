# caiosystems - Frontend

Esta documentação fornece uma visão geral essencial da aplicação frontend caiosystems, focando em seus recursos, estrutura e como interage com o backend.

## Sumário
1. [Visão Geral](#1-visão-geral)
2. [Tecnologias Principais](#2-tecnologias-principais)
3. [Estrutura da Aplicação](#3-estrutura-da-aplicação)
4. [Componentes Principais](#4-componentes-principais)
5. [Integração com a API Backend](#5-integração-com-a-api-backend)
6. [Gerenciamento de Estado](#6-gerenciamento-de-estado)
7. [Variáveis de Ambiente](#7-variáveis-de-ambiente)
8. [Scripts Disponíveis](#8-scripts-disponíveis)

---

### 1. Visão Geral

A aplicação caiosystems é o frontend desenvolvido com Next.js, React e TypeScript. Ele serve como interface de usuário para o sistema de autenticação e gerenciamento de usuários do backend. Inclui páginas para login/registro e uma área protegida após a autenticação, demonstrando um portfólio.

### 2. Tecnologias Principais

*   **Framework**: Next.js 15.x
*   **Biblioteca**: React 19.x
*   **Linguagem**: TypeScript 5.x
*   **Estilização**: CSS Modules (`.module.css`) e CSS Global (`styles.css`)
*   **Ícones**: Font Awesome (via `@fortawesome/react-fontawesome`)
*   **Gerenciamento de Estado**: React Context API

### 3. Estrutura da Aplicação

A aplicação segue a estrutura padrão de projetos Next.js, com as principais pastas sendo:

*   `app/`: Contém as rotas da aplicação (p.ex., `layout.tsx`, `page.tsx` para a página inicial, `login/page.tsx` para a página de login).
*   `components/`: Armazena os componentes React reutilizáveis da aplicação.
*   `context/`: Contém a implementação do Context API para gerenciamento de estado global.
*   `server/`: Contém módulos para conexão com o backend (p.ex., `connection/conn.ts`).
*   `styles/`: Arquivos CSS globais.

### 4. Componentes Principais

*   **`app/page.tsx` (Página Inicial)**:
    *   Exibe `Header`, `Main` e `Footer`.
*   **`app/login/page.tsx` (Página de Login)**:
    *   Contém o componente `Login`, que gerencia a interface de login e registro.
*   **`app/layout.tsx`**:
    *   Define a estrutura HTML básica, metadados e o `ContextProvider` para o estado global.
*   **`components/main/Main.tsx`**:
    *   Exibe o conteúdo principal da aplicação e é protegido por `Protected`.
*   **`components/login/Login.tsx`**:
    *   Gerencia o fluxo de login, registro, mensagens de erro e carregamento.
*   **`components/util/Protected.tsx`**:
    *   Componente HOC (Higher-Order Component) que verifica a autenticação do usuário antes de renderizar seus `children`. Redireciona para `/login` se não autenticado.
*   **`server/connection/conn.ts`**:
    *   Módulo contendo funções para interação com o backend (login, registro, checagem de autenticação, logout).

### 5. Integração com a API Backend

A comunicação com o backend é realizada através de funções assíncronas no módulo `server/connection/conn.ts`, utilizando `fetch` para os seguintes endpoints:

*   `POST /user/login`: Autentica o usuário.
*   `POST /user/register`: Registra um novo usuário.
*   `GET /user/auth`: Verifica se o usuário está autenticado.
*   `POST /logout`: Realiza o logout do usuário.

**Observação:** Todas as requisições de autenticação utilizam `credentials: 'include'` para garantir o envio e recebimento de cookies de sessão, que são essenciais para a manutenção da sessão de usuário. O backend é acessado através da variável de ambiente `NEXT_PUBLIC_SERVER_URL`.

### 6. Gerenciamento de Estado

A aplicação utiliza o **React Context API** (`context/ContextProvider.tsx` e `context/ContextMaster.ts`) para gerenciar o estado global, incluindo:

*   `endPreview`: Controla a exibição inicial de boas-vindas.
*   `errMsg`: Armazena mensagens de erro para exibição ao usuário.
*   `loading`: Indica se uma operação assíncrona está em andamento.
*   `createAccount`: Controla a exibição do formulário de registro.
*   `username`: Armazena o nome de usuário (e-mail) atual.
*   `succesAssign`: Indica se uma nova conta foi criada com sucesso.

### 7. Variáveis de Ambiente

A URL base do backend é configurada através da variável de ambiente:

*   `NEXT_PUBLIC_SERVER_URL`: A URL onde o backend está rodando (ex: `http://localhost:8080`).

É crucial definir esta variável no seu ambiente de desenvolvimento e produção para que o frontend possa se comunicar corretamente com o backend.

### 8. Scripts Disponíveis

Na raiz do projeto, você pode executar os seguintes comandos:

*   `npm run dev` ou `yarn dev`: Inicia o servidor de desenvolvimento do Next.js.
*   `npm run build` ou `yarn build`: Cria uma versão otimizada para produção da sua aplicação.
*   `npm run start` ou `yarn start`: Inicia o servidor Next.js em modo de produção (após um `build`).
*   `npm run lint` ou `yarn lint`: Executa o linter para verificar e aplicar regras de estilo de código.