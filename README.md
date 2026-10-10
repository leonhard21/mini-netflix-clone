# Mini Netflix Clone

Plataforma de streaming inspirada na Netflix, em evolução de um protótipo estático para uma aplicação completa com conta de usuário, catálogo real e persistência de dados.

> Em construção seguindo um roadmap de 10 semanas. A versão estática original está preservada em [`legacy/`](legacy/).

## Stack

- **Frontend:** React + Vite (`client/`)
- **Backend:** Node.js + Express (`server/`)
- **Banco de dados:** MongoDB + Mongoose
- **Autenticação:** JWT + bcrypt
- **Catálogo:** API do [TMDB](https://www.themoviedb.org/documentation/api)

## Funcionalidades planejadas

- Cadastro e login de usuário
- Catálogo de filmes/séries com dados reais (TMDB)
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

## Estrutura

```
client/   # aplicação React (interface)
server/   # API Express (autenticação, proxy do TMDB, dados do usuário)
legacy/   # versão estática original (HTML/CSS/JS), mantida como referência
```
