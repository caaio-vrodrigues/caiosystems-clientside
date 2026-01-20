# caiosystems (frontend) - Sistema de Login

Esta documentação fornece uma visão do sistema 'caiosystems'.

## Sumário
1. [Visão Geral](#1-visão-geral)
2. [Estrutura Global e Configuração](#2-estrutura-global-e-configuração)
3. [Gerenciamento de Estado Global](#3-gerenciamento-de-estado-global)
4. [Páginas Principais](#4-páginas-principais)
    - [4.1 `LoginPage` (Página de Autenticação)](#41-loginpage-página-de-autenticação)
        - [4.1.1 `Wait` (em LoginPage)](#411-wait-em-loginpage)
        - [4.1.2 `TopSec`](#412-topsec)
            - [4.1.2.1 `FirstElement`](#4121-firstelement)
            - [4.1.2.2 `CenterElements`](#4122-centerelements)
            - [4.1.2.3 `LastElement`](#4123-lastelement)
        - [4.1.3 `Error` (em LoginPage)](#413-error-em-loginpage)
        - [4.1.4 `BottomSec`](#414-bottomsec)
        - [4.1.5 `NewAccount`](#415-newaccount)
        - [4.1.6 `Form`](#416-form)
        - [4.1.7 `Welcome`](#417-welcome)
            - [4.1.7.1 `Card` (Welcome Section)](#4171-card-welcome-section)
        - [4.1.8 `ModalSuccesAssign` (em LoginPage)](#418-modalsuccesassign-em-loginpage)
    - [4.2 `Home` (Página Interna Autenticada)](#42-home-página-interna-autenticada)
        - [4.2.1 `Header`](#421-header)
        - [4.2.2 `Main`](#422-main)
            - [4.2.2.1 `Description`](#4221-description)
                - [4.2.2.1.1 `Card` (Description Section)](#42211-card-description-section)
            - [4.2.2.2 `Specialties`](#4222-specialties)
            - [4.2.2.3 `Contact`](#4223-contact)
        - [4.2.3 `Footer`](#423-footer)
5. [Componentes de Autenticação e Proteção de Rotas](#5-componentes-de-autenticação-e-proteção-de-rotas)
    - [5.1 `Protected` Componente](#51-protected-componente)
    - [5.2 `Funções de Serviço de Autenticação`](#52-funções-de-serviço-de-autenticação)
6. [Componentes de Utilidade](#6-componentes-de-utilidade)
    - [6.1 `Wait`](#61-wait)
    - [6.2 `Spinner`](#62-spinner)
    - [6.3 `ModalSuccesAssign`](#63-modalsuccesassign)
    - [6.4 `Error`](#64-error)
7. [Estilização CSS](#7-estilização-css)
    - [7.1 CSS Modules](#71-css-modules)
    - [7.2 Recursos e Técnicas de Estilização](#72-recursos-e-técnicas-de-estilização)
8. [Tecnologias e Ferramentas](#8-tecnologias-e-ferramentas)
9. [Implantação e Hospedagem](#9-implantação-e-hospedagem)
10. [Configuração do Projeto e Dependências](#10-configuração-do-projeto-e-dependências)
    - [10.1 `package.json`](#101-packagejson)
    - [10.2 `tsconfig.json`](#102-tsconfigjson)

---

## 1. Visão Geral

Este projeto consiste em uma Aplicação de Página Única (SPA) que demonstra um sistema de login completo. O propósito central é a interação entre duas aplicações distintas — um frontend e um backend — conectadas por meio de recursos REST.

O **backend**, desenvolvido em Java com Spring Boot, é responsável pela verificação de sessão, armazenamento de dados (utilizando H2) e outras funcionalidades como CRUD, DTO, CORS, entre outros componentes. Ele expõe uma API REST que centraliza regras e comunicação de dados.

O **frontend**, construído com React.js e Next.js, consome a API do backend, garantindo um fluxo contínuo de dados entre cliente e servidor. O design da aplicação foi inteiramente desenvolvido com HTML e CSS puro, sem o uso de frameworks ou bibliotecas de UI, e a responsividade foi implementada utilizando exclusivamente propriedades de redimensionamento do CSS.

---

## 2. Estrutura Global e Configuração

A estrutura base da aplicação é definida no `RootLayout` (`layout.tsx`), que engloba todos os componentes filhos. Este layout é responsável por:

*   **Metadados Globais**: Configura metadados cruciais da aplicação, como `title` ("Caio Systems Portfólio") e `description` ("Demosntração de um sistema de login completo"), otimizando a experiência do usuário e a indexação em mecanismos de busca.
*   **Estilos Globais**: Importa e aplica estilos globais através de `@/styles/styles.css`, garantindo uma consistência visual em toda a aplicação.
*   **Provedor de Contexto**: Envolve toda a aplicação com o `ContextProvider`, tornando o estado global acessível a qualquer componente aninhado.
*   **Hidratação**: Utiliza `suppressHydrationWarning={true}` no elemento `<body>` para lidar com potenciais incompatibilidades de hidratação entre o lado do servidor e do cliente, um recurso comum em aplicações Next.js.

---

## 3. Gerenciamento de Estado Global

O projeto utiliza o React Context API para gerenciamento de estado global, encapsulado no `ContextProvider`. Este contexto centraliza diversos estados cruciais para o funcionamento da aplicação, como:

*   **`endPreview`**: Um booleano que controla o estado de finalização de alguma pré-visualização ou etapa.
*   **`currentPage`**: Um número inteiro que indica a página ou o passo atual em um fluxo multi-etapas.
*   **`errMsg`**: Uma string (ou `null`) para armazenar e exibir mensagens de erro para o usuário.
*   **`loading`**: Um booleano que sinaliza se alguma operação assíncrona ou de carregamento está em andamento.
*   **`createAccount`**: Um booleano que gerencia o estado relacionado à interface ou fluxo de criação de uma nova conta.
*   **`username`**: Uma string que armazena o nome de usuário (logado, em processo de login ou registro).
*   **`succesAssign`**: Um booleano que indica o sucesso de uma atribuição específica ou de uma operação importante.

O `ContextProvider` envolve os componentes filhos, tornando esses estados e suas funções de atualização (`Dispatch<SetStateAction<...>>`) disponíveis para qualquer parte da aplicação que consumir o `ContextMaster`, garantindo um fluxo de dados consistente e centralizado.

---

## 4. Páginas Principais

Esta seção detalha os componentes de página que compõem as rotas principais da aplicação, descrevendo suas responsabilidades e a integração com outros módulos, distinguindo a experiência para usuários não autenticados e autenticados.

### 4.1 `LoginPage` (Página de Autenticação)

A `LoginPage` é a página principal de acesso e registro no sistema, correspondendo à rota de autenticação (`/login`). Ela é encapsulada por um `div` com a classe `containerLogin` e renderiza o componente central `Login` (localizado em `@/components/login/Login`). Este componente `client-side` (`'use client'`) é o coração da experiência de autenticação para usuários não logados, controlando a apresentação dinâmica de diferentes elementos da interface do usuário com base no estado global da aplicação.

O componente `Login` orquestra o fluxo de autenticação e registro, utilizando diversos subcomponentes e interagindo com o `ContextMaster` para gerenciar estados como pré-carregamento, mensagens de erro, carregamento, sucesso de atribuição e o fluxo de boas-vindas. Ele integra a apresentação de informações do projeto (`TopSec`), a gestão de formulários de login/cadastro (`Form`, `NewAccount`), o fluxo interativo de boas-vindas (`Welcome`), e o feedback ao usuário (`Wait`, `Error`, `ModalSuccesAssign`), garantindo uma experiência de usuário fluida e informativa durante todo o processo de autenticação.

### 4.1.1 `Wait` (em LoginPage)

O componente `Wait` é um indicador visual de carregamento usado na `LoginPage` para simular pré-carregamento e indicar operações assíncronas. Para detalhes completos sobre sua funcionalidade e estrutura, consulte a seção [6.1 `Wait`](#61-wait).

### 4.1.2 `TopSec`

O componente `TopSec` define a seção superior da `LoginPage`, responsável por exibir informações de destaque sobre o projeto e o desenvolvedor. Ele é projetado para apresentar elementos visuais e textuais que reforçam a autoria e as tecnologias empregadas.

Sua estrutura interna inclui:

*   Uma `section` principal com a classe `secTop`.
*   Um `div` (`containerTopElements`) que agrupa os elementos internos.
*   Um `span` com o texto "Caio V. Rodrigues Systems".
*   Um `div` adicional (`wrapTopElements`) que contém os componentes especializados:
    *   `FirstElement`
    *   `CenterElements`
    *   `LastElement`

Estes subcomponentes trabalham juntos para destacar a autoria, as tecnologias principais (React/Next.js e Java/Spring Boot) e a abordagem de design puro (HTML5/CSS3).

#### 4.1.2.1 `FirstElement`

O componente `FirstElement` é parte do `TopSec` e é responsável por exibir a autoria do projeto.

Ele consiste em:

*   Um `div` com classes `wrapSpanIcon` e `wrapSpanIconFirst`.
*   Um `span` exibindo "Developed by Caio V. Rodrigues Systems".
*   Um `div` adicional (`wrapIcon`) que contém um ícone de copyright (`faCopyright`) da `FontAwesomeIcon` seguido do ano "2025".

#### 4.1.2.2 `CenterElements`

O componente `CenterElements` é parte do `TopSec` e é responsável por destacar as principais tecnologias utilizadas no desenvolvimento do frontend e backend da aplicação.

Ele consiste em dois `div`s, cada um contendo:

*   Um `span` descrevendo a tecnologia: "Frontend criado com React-js + Next-js" e "Backend programado com Java + Springboot".
*   Um `div` (`wrapIcon`) que exibe os ícones correspondentes: `faReact` para o frontend e `faJava` para o backend, ambos da `FontAwesomeIcon`.

#### 4.1.2.3 `LastElement`

O componente `LastElement` é parte do `TopSec` e tem como objetivo enfatizar a abordagem de design "pura" utilizada no desenvolvimento do layout.

Ele é composto por:

*   Um `div` com classes `wrapSpanIcon`, `wrapSpanIconLast` e `wrapSpanIconBlue`.
*   Um `span` com a mensagem "Layout desenvolvido de forma pura.".
*   Um `div` (`wrapIcon`) que apresenta os ícones `faHtml5` e `faCss3` da `FontAwesomeIcon`, simbolizando o uso de HTML5 e CSS3 nativos.

### 4.1.3 `Error` (em LoginPage)

O componente `Error` é utilizado na `LoginPage` para exibir mensagens de erro ao usuário, reagindo ao estado global `errMsg`. Para detalhes completos sobre sua funcionalidade e estrutura, consulte a seção [6.4 `Error`](#64-error).

### 4.1.4 `BottomSec`

O componente `BottomSec` atua como o rodapé da `LoginPage`, fornecendo informações adicionais e links úteis. Ele é projetado para incluir a atribuição da imagem de fundo utilizada na página e links para os contatos do desenvolvedor.

As principais características incluem:

*   Uma `section` principal com a classe `secBottom`.
*   Um link (`<a>`) para a fonte da imagem de fundo, com o texto "Background image by freepik". Este link abre em uma nova aba (`target='blank'`).
*   Um `div` (`wrapIcons`) que itera sobre os dados de `contacts` (importados de `@/data/contactData`).
*   Para cada contato, é renderizado um componente `Link` (do Next.js) que direciona para o link do contato e exibe um ícone correspondente (`FontAwesomeIcon`).

### 4.1.5 `NewAccount`

O componente `NewAccount` é um elemento `client-side` que oferece ao usuário a funcionalidade de alternar entre os modos de login e criação de nova conta. Sua principal responsabilidade é gerenciar o estado `createAccount` do `ContextMaster`.

As funcionalidades principais são:

*   Marcação `'use client'` indicando que é um componente do lado do cliente.
*   Utiliza o `ContextMaster` para acessar e manipular o estado booleano `createAccount` e a função `setCreateAccount`.
*   Renderiza um `div` com a classe `buttonBlock`.
*   Exibe um texto condicional ("Já possui cadastro? Crie uma nova conta abaixo." ou vazio) dependendo do valor de `createAccount`.
*   Um botão que, ao ser clicado, inverte o valor de `createAccount` através de `setCreateAccount(!createAccount)`. O texto e o ícone (`faArrowUpRightFromSquare`) do botão também mudam dinamicamente para "nova conta" ou "login", refletindo o modo atual.

### 4.1.6 `Form`

O componente `Form` é um componente `client-side` crucial para gerenciar as operações de login e registro de usuários. Ele lida com a coleta de credenciais, interação com o backend para autenticação ou criação de conta, e navegação do usuário.

Principais funcionalidades:

*   Marcação `'use client'`.
*   Gerencia os estados locais de `password` utilizando `useState`.
*   Utiliza `useContext` para interagir com o `ContextMaster`, acessando e atualizando estados globais como `setErrMsg`, `setLoading`, `createAccount`, `setCreateAccount`, `username`, `setUsername`, e `setSuccessAssign`.
*   Utiliza `useRouter` do Next.js para controle de navegação após as operações de autenticação.
*   A função `handleSubmit` é acionada ao submeter o formulário:
    *   Previne o comportamento padrão do formulário.
    *   Limpa mensagens de erro (`setErrMsg(null)`) e ativa o indicador de carregamento (`setLoading(true)`).
    *   Condicionalmente, chama `createUser` (para registro) ou `loginAcces` (para login) do serviço `connection/conn`.
    *   Em caso de sucesso no registro, define `createAccount` como `false`, redireciona para `/login` e exibe o modal de sucesso (`setSuccessAssign(true)`).
    *   Em caso de sucesso no login, redireciona para a página inicial (`/`).
    *   Captura e exibe erros potenciais através de `setErrMsg`.
    *   Finaliza o processo limpando a senha e desativando o carregamento.
*   Renderiza a interface do formulário:
    *   Um título `h1` que muda entre "LOGIN" e "CADASTRAR" baseado em `createAccount`.
    *   Campos de entrada para "E-mail" (`type="email"`, `autoComplete="username"`) e "Senha" (`type="password"`, `autoComplete="current-password"`), ambos controlados pelos estados `username` e `password` respectivamente.
    *   Um botão de submit que, além de submeter o formulário, também alterna seu texto ("enviar" ou "entrar") e ícone (`faShare` ou `faHouseUser`) baseado no modo (`createAccount`).

### 4.1.7 `Welcome`

O componente `Welcome` é responsável por orquestrar uma apresentação interativa de boas-vindas para novos usuários ou visitantes. Ele é exibido sob condições específicas (`endPreview` falso, `errMsg` nulo e `loading` falso) e guia o usuário por uma sequência de cards informativos.

Suas principais características incluem:

*   Gerencia o estado local `skipPresentation` para permitir que o usuário pule a apresentação.
*   Utiliza `ContextMaster` para acessar `currentPage`, que indica o card atual da apresentação.
*   Mapeia sobre os dados `allPages` (importados de `@/data/welcomeData`) para renderizar condicionalmente um `Card` para a `currentPage` atual, desde que `skipPresentation` seja falso.
    *   Cada `Card` é envolto em um `div` (`wrapSkipAndCard`) que também contém um botão "Pular apresentação" (`buttonSkipPresentation`). Este botão define `skipPresentation` como `true` ao ser clicado.
*   Se `skipPresentation` for `true`, ou se a apresentação tiver sido concluída (ou seja, `currentPage` atingiu o número total de páginas em `allPages`), o componente `EndWelcome` é renderizado.

#### 4.1.7.1 `Card` (Welcome Section)

O componente `Card` (utilizado na seção `Welcome`) é responsável por renderizar o conteúdo de cada etapa da apresentação de boas-vindas. Ele recebe como propriedade um array de objetos (`strs`) contendo texto ou links.

As principais funcionalidades incluem:

*   Recebe um array de objetos `strs` como propriedade, onde cada objeto representa um parágrafo ou um link.
*   Utiliza o `ContextMaster` para acessar e manipular `currentPage` (página atual) e `setCurrentPage` (função para alterar a página atual).
*   Mapeia sobre o array `strs` para renderizar o conteúdo:
    *   Se `p.id` for `100`, renderiza um componente `Link` (do Next.js) para recursos externos (e.g., o certificado Oracle), com o texto "certificado-caio-oracle-java-se8".
    *   Caso contrário, renderiza um parágrafo (`<p>`) com o texto (`p.str`).
*   Inclui botões de navegação (`faAnglesLeft`, `faAnglesRight` da `FontAwesomeIcon`) que permitem ao usuário avançar ou retroceder na apresentação, atualizando o `currentPage` via `setCurrentPage`. O botão de retroceder impede que a `currentPage` seja menor que 0.

### 4.1.8 `ModalSuccesAssign` (em LoginPage)

O componente `ModalSuccesAssign` é um modal que é exibido na `LoginPage` para notificar o usuário sobre o sucesso de operações importantes, como o registro de uma nova conta. Para detalhes completos sobre sua funcionalidade e estrutura, consulte a seção [6.3 `ModalSuccesAssign`](#63-modalsuccesassign).

### 4.2 `Home` (Página Interna Autenticada)

A `HomePage` (definida no arquivo `src/app/page.tsx` como o componente `Home`) é a página principal da aplicação para usuários autenticados. É um componente `client-side` (`'use client'`) que estrutura o layout geral da área interna do sistema, integrando o cabeçalho, conteúdo principal e rodapé.

Ela atua como um container de alto nível, compondo a interface do usuário através da renderização dos seguintes componentes principais: `Header`, `Main` e `Footer`.

### 4.2.1 `Header`

O componente `Header` é o cabeçalho da aplicação, visível na `HomePage`. Ele é um componente `client-side` (`'use client'`) responsável por exibir o logotipo/ícone do sistema, o título da aplicação e a funcionalidade de logout.

As principais funcionalidades incluem:

*   Exibição de um ícone (`faAppleAlt`) no lado esquerdo.
*   Exibição do título da aplicação ("Caio V. Rodrigues Systems") na parte central.
*   Um botão de logout no lado direito, representado por um ícone (`faClose`).
*   A função `handleLogout` é acionada ao clicar no botão de logout, que tenta realizar o logout do usuário através da função `logout()` (importada de `@/server/connection/conn`).
*   Em caso de sucesso ou falha no logout, o usuário é redirecionado para a `/login` page usando `useRouter`. Erros durante o logout são capturados e exibidos via `setErrMsg` do `ContextMaster`.

### 4.2.2 `Main`

O componente `Main` representa a área de conteúdo principal da `HomePage`. Ele é responsável por agrupar e exibir as diferentes seções de informações para o usuário autenticado.

Sua estrutura e funcionalidade incluem:

*   Um elemento `<main>` com a classe `main`.
*   Envolve todo o seu conteúdo interno com o componente `Protected`, garantindo que as informações só sejam acessíveis se o usuário estiver autenticado e autorizado.
*   Internamente, renderiza os seguintes sub-componentes, que representam seções distintas da página:
    *   `Welcome` (Boas-vindas ou informações iniciais).
    *   `Description` (Descrição detalhada de algo).
    *   `Specialties` (Habilidades ou áreas de especialização).
    *   `Contact` (Informações de contato).

#### 4.2.2.1 `Description`

O componente `Description` é uma seção da `HomePage` dedicada a fornecer informações detalhadas sobre o projeto e um breve resumo do trabalho do desenvolvedor.

As principais características incluem:

*   Uma `section` com a classe `secDescription` e um título `h1` "Descrição".
*   Um `div` (`cardsContainer`) que organiza o conteúdo em duas colunas:
    *   `leftWrapCards`: Mapeia sobre `cardInfos` (dados importados de `@/data/descriptionData`) para renderizar múltiplos componentes `Card` (desta seção `Description`). Cada `Card` recebe `text`, `link` e `linkTxt` como propriedades.
    *   `rightWrapCard`: Exibe um título `h2` "Breve resumo sobre meu trabalho" e um parágrafo (`p`) com o `workSummary` (também importado de `@/data/descriptionData`).

##### 4.2.2.1.1 `Card` (Description Section)

Este componente `Card` (utilizado na seção `Description`) é responsável por exibir uma informação específica, que pode incluir um texto e, opcionalmente, um link.

Suas funcionalidades são:

*   Recebe as propriedades `text` (string), `link` (string ou null), e `linkTxt` (string ou null).
*   Renderiza um `article` com a classe `card`.
*   Exibe o `text` dentro de um parágrafo (`p`).
*   Condicionalmente, se `link` for fornecido, renderiza um componente `Link` (do Next.js) com o `linkTxt` e que abre em uma nova aba (`target='blank'`).

#### 4.2.2.2 `Specialties`

O componente `Specialties` é uma seção da `HomePage` que apresenta as principais especialidades ou tecnologias do desenvolvedor de forma interativa.

Suas principais características incluem:

*   Gerencia um estado local `isJavaRight` (`boolean`) utilizando `useState` para controlar qual ícone de tecnologia aparece em cada lado.
*   Renderiza uma `section` com a classe `wrapSpecialties`.
*   Três `div`s com a classe `blockSpecialt`:
    *   Os `div`s laterais (`blockSpecialtTool`) exibem ícones (`faReact` ou `faJava` da `FontAwesomeIcon`) que alternam de posição com base no estado `isJavaRight`.
    *   O `div` central (`blockSpecialtCenter`) contém um botão. Ao clicar neste botão, o estado `isJavaRight` é alternado, invertendo a posição dos ícones de tecnologia e é representado por um ícone `faLeftRight` da `FontAwesomeIcon`.

#### 4.2.2.3 `Contact`

O componente `Contact` é uma seção da `HomePage` que oferece aos usuários formas de entrar em contato com o desenvolvedor e exibe informações sobre certificações.

As principais características incluem:

*   Uma `section` principal com a classe `contactContainer`.
*   Um `div` (`contact`) que mapeia sobre os dados de `contacts` (importados de `@/data/contactData`) para renderizar links de contato.
    *   Cada link (`Link` do Next.js) exibe um ícone (`link.icon` da `FontAwesomeIcon`) e abre em uma nova aba (`target='blank'`).
*   Um `div` (`certificateContainer`) que exibe informações sobre certificação:
    *   Contém um `div` (`wrapCertificate`) com um `Link` (do Next.js) que aponta para a URL do certificado Oracle (`oracle` importado de `@/data/contactData`).
    *   Dentro deste link, exibe um ícone (`iconJava` da `FontAwesomeIcon`) e um título `h2` "Certified by Oracle".

### 4.2.3 `Footer`

O componente `Footer` é o rodapé padrão da aplicação, exibido na `HomePage`. Ele é responsável por apresentar informações de autoria.

As principais características incluem:

*   Um elemento `<footer>` com a classe `foot`.
*   Um `div` (`footTitle`) que contém:
    *   Um `h2` com o texto "Developed by".
    *   Um `div` (`copy`) que exibe o nome do desenvolvedor ("Caio Vinicius Rodrigues") e um ícone de copyright (`faCopyright`) da `FontAwesomeIcon`.

---

## 5. Componentes de Autenticação e Proteção de Rotas

Para garantir a segurança e o acesso controlado às rotas da aplicação, utiliza-se o componente `Protected` e um conjunto de funções de serviço que interagem diretamente com a API de autenticação do backend.

### 5.1 `Protected` Componente

O componente `Protected` é um componente `client-side` (indicado por `'use client'`) responsável por atuar como um *route guard* para as páginas internas da aplicação. Ele é utilizado para envolver o conteúdo que requer autenticação, como o componente `Main` na `HomePage`.

*   **Verificação de Autenticação**: Ao ser montado (`useEffect`), ele executa a função assíncrona `checkAuth()` (importada de `@/server/connection/conn` e detalhada na seção 5.2) para validar a sessão do usuário.
*   **Redirecionamento**: Se o usuário não estiver autenticado (`!authenticated`), ele é redirecionado automaticamente para a página de login (`/login`) usando o `useRouter` do Next.js.
*   **Gerenciamento de Erros**: Em caso de falha na verificação de autenticação ou outros erros durante `checkAuth()`, uma mensagem de erro é armazenada no estado global (`errMsg` via `ContextMaster`).
*   **Controle de Acesso**: O conteúdo (`children`) envolto pelo componente `Protected` (ou seja, o `Main` da `HomePage`) só é renderizado se a autenticação for bem-sucedida (`isAuthenticated === true`), garantindo que apenas usuários autorizados acessem as seções restritas da aplicação. Enquanto a autenticação está sendo verificada (`isAuthenticated === null`), o componente não renderiza nada para evitar cintilação de conteúdo.

Este componente é essencial para proteger rotas sensíveis e manter a integridade do sistema, funcionando como um *gatekeeper* para seções restritas.

### 5.2 `Funções de Serviço de Autenticação`

As operações de autenticação e gerenciamento de usuários são centralizadas em um conjunto de funções de serviço assíncronas que interagem diretamente com a API REST do backend. O `SERVER_URL` é configurado através da variável de ambiente `NEXT_PUBLIC_SERVER_URL`. Todas as respostas são processadas por uma função `handleResponse` auxiliar que verifica o status da resposta e extrai dados ou mensagens de erro.

*   **`loginAcces({ username, password })`**:
    *   **Propósito**: Responsável por autenticar um usuário no sistema.
    *   **Endpoint**: `POST ${SERVER_URL}/user/login`.
    *   **Método**: `POST`.
    *   **`Content-Type`**: `application/x-www-form-urlencoded`.
    *   **Corpo da Requisição**: `username` e `password` enviados como parâmetros de formulário.
    *   **Credenciais**: Inclui credenciais (`credentials: 'include'`) para garantir o manuseio de sessões (cookies).

*   **`createUser({ username, password })`**:
    *   **Propósito**: Permite o registro de um novo usuário no sistema.
    *   **Endpoint**: `POST ${SERVER_URL}/user/register`.
    *   **Método**: `POST`.
    *   **`Content-Type`**: `application/json`.
    *   **Corpo da Requisição**: Objeto JSON contendo `username` e `password`.

*   **`checkAuth()`**:
    *   **Propósito**: Verifica o status de autenticação do usuário, validando a sessão existente.
    *   **Endpoint**: `GET ${SERVER_URL}/user/auth`.
    *   **Método**: `GET`.
    *   **Credenciais**: Inclui credenciais (`credentials: 'include'`) para verificar a sessão.

*   **`logout()`**:
    *   **Propósito**: Invalida a sessão do usuário, realizando o logout.
    *   **Endpoint**: `POST ${SERVER_URL}/logout`.
    *   **Método**: `POST`.
    *   **Credenciais**: Inclui credenciais (`credentials: 'include'`) para encerrar a sessão.

Essas funções garantem a comunicação segura e eficaz entre o frontend e o backend para todas as operações relacionadas à autenticação e gerenciamento de contas de usuário.

---

## 6. Componentes de Utilidade

Esta seção descreve os componentes genéricos e reutilizáveis localizados em `src/components/util`, que oferecem funcionalidades comuns como feedback de carregamento, mensagens de sucesso ou erro.

### 6.1 `Wait`

*   **Localização**: `src/components/util/wait/Wait.tsx`
*   **Propósito**: Exibe uma mensagem genérica de "Aguarde..." acompanhada de um `Spinner`, indicando que uma operação está em andamento. É utilizada para fornecer feedback visual ao usuário durante processos que levam tempo.
*   **Dependências**: Utiliza o componente `Spinner` internamente.
*   **Funcionalidade**: Simplesmente renderiza texto e o spinner, sem lógica de estado própria.

### 6.2 `Spinner`

*   **Localização**: `src/components/util/spinner/Spinner.tsx`
*   **Propósito**: Componente de carregamento visual (ícone giratório) utilizado para indicar o progresso de operações assíncronas.
*   **Props**:
    *   `login: boolean`: Um booleano que, quando `true`, aplica estilos específicos (`styles.spinnerLogin`) para o contexto de login, permitindo variações visuais no spinner.
*   **Acessibilidade**: Incorpora atributos ARIA (`role='status'`, `aria-label={'Carregando…'}`, `aria-live='polite'`, `title={'Carregando'}`) para garantir que usuários com tecnologias assistivas recebam feedback adequado sobre o estado de carregamento.
*   **Funcionalidade**: Renderiza um `<span>` que é estilizado via CSS para criar a animação de giro.

### 6.3 `ModalSuccesAssign`

*   **Localização**: `src/components/util/modal/ModalSuccesAssign.tsx`
*   **Propósito**: Exibe um modal de sucesso após, por exemplo, a criação bem-sucedida de uma conta, orientando o usuário para a próxima ação.
*   **Dependências**: Interage com o `ContextMaster` para acessar `setSuccessAssign`, que é utilizada para fechar o modal.
*   **Funcionalidade**:
    *   Exibe a mensagem "Sua conta foi criada com sucesso! Clique abaixo e faça login.".
    *   Contém um botão que, ao ser clicado, invoca `setSuccessAssign(false)`, o que geralmente remove o modal da interface.
    *   O botão é acompanhado pelo ícone `faRightToBracket`, sugerindo a ação de login.

### 6.4 `Error`

*   **Localização**: `src/components/util/error/Error.tsx`
*   **Propósito**: Exibe uma mensagem de erro ao usuário, fornecendo feedback sobre falhas ocorridas na aplicação.
*   **Dependências**: Interage com o `ContextMaster` para acessar e exibir `errMsg` e para limpar o erro com `setErrMsg`.
*   **Funcionalidade**:
    *   Mostra o texto do erro formatado como "Error: {errMsg}".
    *   Inclui um botão "voltar" com o ícone `faBackward`, que ao ser clicado, define `setErrMsg(null)`, limpando a mensagem de erro e removendo a exibição do componente.

Esses componentes são fundamentais para manter a interface do usuário responsiva e informativa, garantindo que o usuário esteja sempre ciente do estado atual da aplicação, seja aguardando uma operação, recebendo uma confirmação ou sendo notificado sobre um problema.

---

## 7. Estilização CSS

A aplicação adota uma abordagem de estilização moderna e modular, priorizando a manutenção, o escopo e a clareza do CSS.

### 7.1 CSS Modules

Para garantir o encapsulamento dos estilos e evitar conflitos globais, a aplicação faz uso extensivo de **CSS Modules**. Cada componente possui seu arquivo CSS (`.module.css`) correspondente, onde as classes são automaticamente *hashed* para gerar nomes únicos, como exemplificado por `styles.main` ou `styles.loginContainer`. Essa prática isola os estilos localmente, promovendo:

*   **Escopo Local**: Evita que estilos de um componente afetem inadvertidamente outros componentes.
*   **Reusabilidade**: Permite que nomes de classes comuns sejam usados em diferentes componentes sem colisão.
*   **Manutenibilidade**: Facilita a identificação e modificação de estilos específicos para um componente.

### 7.2 Recursos e Técnicas de Estilização

Os códigos de amostra revelam a aplicação de diversas técnicas e recursos modernos de CSS para construir a interface do usuário:

*   **Estilos Globais (`globals.css`)**: Um arquivo de estilos global define as bases para toda a aplicação:
    *   **Reset CSS**: `margin: 0; padding: 0; box-sizing: border-box;` garante uma consistência inicial entre navegadores.
    *   **Fontes**: Importação de fontes personalizadas do Google Fonts (`Arimo`, `Quicksand`, `Goldman`) para uma tipografia distinta.
    *   **Estrutura Base**: `html` e `body` configurados para ocupar a altura total da viewport (`min-height: 100vh`), prevenir rolagem horizontal indesejada (`overflow-x: hidden`) e centralizar o conteúdo principal (`margin-inline: auto; max-width: 100rem;`).
*   **Variáveis CSS (`:root`)**: Utilização de variáveis personalizadas para gerenciar cores (`--bgPrimary`, `--colorPrimary`, `--purpleBlue`), espaçamentos (`--paddingMain`), tamanhos de fonte (`--fontSizeText`, `--fontSizePrimary`), alturas de linha (`--lineHeight`), espaçamento de letras (`--letterSpacingText`), tamanhos de ícones (`--sizeIcon`) e durações de transição (`--transition`). Isso facilita a criação de temas e a manutenção global dos estilos.
*   **Layouts Flexbox**: O `display: flex` é amplamente utilizado para organizar elementos em linha ou coluna, controlando o alinhamento (`justify-content`, `align-items`) e a direção (`flex-direction`).
*   **Design Responsivo (`@media queries`)**: Emprego de media queries (`@media screen and (max-width: 600px)`) para adaptar o layout e os estilos a diferentes tamanhos de tela, garantindo uma experiência de usuário otimizada em dispositivos móveis e desktops.
*   **Imagens de Fundo**: Uso de propriedades como `background-image`, `background-size`, `background-repeat` e `background-position` para criar fundos visuais dinâmicos, como na `LoginPage`.
*   **Posicionamento**: Uso de `position: relative` e `position: absolute` para posicionar elementos de forma precisa, como modais (`.containerModal`) com `z-index` para controle de sobreposição.
*   **Interatividade e Transições**: Aplicação de `transition: var(--transition)` para criar animações suaves em estados de `hover` ou `focus` de elementos interativos como botões e links. O `cursor: pointer` é usado para indicar elementos clicáveis.
*   **Estilização de Tipografia**: Ajustes finos em `font-size`, `font-weight`, `line-height`, `letter-spacing` e `text-align` para melhorar a legibilidade e a estética do texto. A propriedade `hyphens: auto` é utilizada para melhorar a quebra de palavras em parágrafos.
*   **Estilização de Componentes Específicos**:
    *   **`iframe`**: Definição de `width`, `height` e `border-radius` para players de vídeo incorporados.
    *   **`input`**: Estilização para campos de formulário, incluindo o `autoComplete` para acessibilidade e usabilidade.
    *   **`Link`**: Estilização específica para links, incluindo `text-decoration: none` e alterações de cor em `hover` e `visited`.

A combinação dessas técnicas de CSS, juntamente com a modularidade oferecida pelos CSS Modules, contribui para uma base de código de estilos robusta, escalável e de fácil manutenção, garantindo uma experiência visual agradável e responsiva para o usuário.

---

## 8. Tecnologias e Ferramentas

O desenvolvimento deste projeto envolveu as seguintes tecnologias e conceitos:

*   **Frontend**: HTML, CSS, JavaScript, React-js, Next-js, SPA (Single Page Application), Responsividade, Client Side UI/UX.
*   **Backend**: Java, Spring Boot, API-REST, CRUD (Create, Read, Update, Delete), DTO (Data Transfer Object), DB-H2, CORS.
*   **Versionamento**: Git.
*   **Banco de Dados**: H2 (incorporado), SQL.
*   **Hospedagem**: Vercel (frontend), Render (backend).

---

## 9. Implantação e Hospedagem

Para garantir que as aplicações estejam acessíveis em tempo real, cada uma está hospedada em uma plataforma distinta:

*   O **frontend** está hospedado na plataforma [Vercel](https://vercel.com/).
*   O **backend** está hospedado na plataforma [Render](https://render.com/).

Essa arquitetura permite a comunicação eficiente entre as duas partes do sistema, que operam de forma independente mas interligada através da API REST.

---

## 10. Configuração do Projeto e Dependências

Esta seção apresenta as configurações fundamentais e as dependências do projeto, essenciais para o seu funcionamento e desenvolvimento.

### 10.1 `package.json`

Define os metadados do projeto, scripts e lista as dependências:

*   **Scripts**: `dev` (desenvolvimento), `build` (produção), `start` (servidor de produção) e `lint` (verificação de código).
*   **Dependências Principais**:
    *   **Next.js**, **React** e **React-DOM**: Para a construção da aplicação web.
    *   **Font Awesome**: Para ícones (`fontawesome-svg-core`, `free-brands-svg-icons`, `free-solid-svg-icons`, `react-fontawesome`).
*   **Dependências de Desenvolvimento**:
    *   **ESLint**: Para padronização e qualidade de código.
    *   **TypeScript**: Para tipagem estática e segurança do código.

### 10.2 `tsconfig.json`

Configura o compilador TypeScript:

*   **`target: "ES2017"`**: Versão ECMAScript de compilação.
*   **`strict: true`**: Ativa um conjunto rigoroso de verificações de tipo.
*   **`jsx: "react-jsx"`**: Suporte a JSX para React.
*   **`paths: { "@/*": ["./src/*"] }`**: Configura alias para importações (`@/`).
*   **`plugins: [{ "name": "next" }]`**: Integração com o Next.js.

Esta configuração estabelece um ambiente de desenvolvimento robusto com Next.js, React e TypeScript.