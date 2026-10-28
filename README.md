# Mini Netflix Clone

Plataforma de streaming inspirada na Netflix, em evolução de um protótipo estático para uma aplicação completa com conta de usuário, catálogo real e persistência de dados.

> A versão estática original está preservada em [`legacy/`](legacy/).

## Demo

- **Aplicação completa:** https://mini-netflix-clone-five.vercel.app
- **Versão estática original:** https://leonhard21.github.io/mini-netflix-clone/

> O backend roda no plano gratuito do Render, que "dorme" após um tempo sem uso — a primeira requisição depois de um tempo parado pode demorar até ~50s para responder.

## Stack

- **Frontend:** React + Vite (`client/`)
- **Backend:** Node.js + Express (`server/`)
- **Banco de dados:** MongoDB + Mongoose
- **Autenticação:** JWT + bcrypt
- **Catálogo:** API do [TMDB](https://www.themoviedb.org/documentation/api)

## Funcionalidades

- Cadastro e login de usuário (JWT)
- Catálogo de filmes com dados reais (TMDB), organizado por categoria/gênero
- Detalhes do título com trailer
- Lista de favoritos por usuário ("Minha Lista")
- Busca

## Como executar

### Backend

```bash
cd server
cp .env.example .env   # preencha MONGODB_URI, JWT_SECRET e TMDB_API_KEY
npm install
npm run dev
```

### Frontend

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

## Deploy

O projeto é dividido em dois serviços: o backend (API) e o frontend (interface). Cada um é hospedado separadamente.

### 1. Banco de dados (MongoDB Atlas)

1. Crie uma conta gratuita em [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) e um cluster M0 (gratuito).
2. Em **Database Access**, crie um usuário com senha.
3. Em **Network Access**, libere o acesso (`0.0.0.0/0` é o mais simples para começar).
4. Em **Database → Connect → Drivers**, copie a connection string (algo como `mongodb+srv://usuario:senha@cluster.mongodb.net/mini-netflix`).

### 2. Chave do TMDB

1. Crie uma conta em [themoviedb.org](https://www.themoviedb.org/) e gere uma API Key em **Configurações → API**.

### 3. Backend (Render)

1. Crie uma conta em [render.com](https://render.com) e conecte ao repositório no GitHub.
2. **New → Web Service**, apontando para este repositório.
3. Configure:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Em **Environment**, adicione as variáveis de `server/.env.example`: `MONGODB_URI`, `JWT_SECRET` (qualquer string longa e aleatória), `TMDB_API_KEY`. Não defina `PORT` — o Render injeta a dele automaticamente.
5. Depois do deploy, anote a URL gerada (ex: `https://mini-netflix-api.onrender.com`).

### 4. Frontend (Vercel)

1. Crie uma conta em [vercel.com](https://vercel.com) e importe o mesmo repositório.
2. Configure:
   - **Root Directory:** `client`
   - **Framework Preset:** Vite (detectado automaticamente)
3. Em **Environment Variables**, adicione `VITE_API_URL` com a URL do backend (passo anterior).
4. Depois do deploy, anote a URL gerada (ex: `https://mini-netflix-clone.vercel.app`).

### 5. Fechar o CORS (opcional, recomendado)

Volte ao Render e adicione a variável `FRONTEND_URL` com a URL do Vercel (passo 4). Isso restringe a API para aceitar requisições só do seu frontend, em vez de qualquer origem. Sem essa variável, a API aceita qualquer origem — o que é conveniente durante o desenvolvimento, mas não ideal em produção.

## Estrutura

```
client/   # aplicação React (interface)
server/   # API Express (autenticação, proxy do TMDB, dados do usuário)
legacy/   # versão estática original (HTML/CSS/JS), mantida como referência
```
