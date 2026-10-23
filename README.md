# NewsExplorer — Front-end

Projeto final TripleTen. Interface React (Vite) do NewsExplorer: busca notícias por palavra-chave (a API própria consulta a News API no servidor) e permite salvar artigos no perfil.

## Rodar localmente

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — servidor de desenvolvimento
- `npm run build` — build de produção
- `npm run lint` — lint

## Estrutura

```
src/
  components/   # um diretório por componente (JSX + CSS)
  utils/        # constantes, NewsApi.js, helpers
  images/
  vendor/       # normalize.css e fontes (@font-face)
```

## Deploy

_(adicionar o link do projeto publicado)_

## Integração com a API (Fase 3)

- Back-end: repositório `news-explorer-api` (rodar antes, com `NEWS_API_KEY` no `.env` dele). Em desenvolvimento o front usa `http://localhost:3000`; no build de produção usa o domínio público da API (constante `MAIN_API_PROD_URL` em `src/utils/constants.js`).
- Autenticação por JWT guardado no `localStorage` e validado no servidor (`GET /users/me`) ao abrir o app.
- Rota `/saved-news` protegida (`ProtectedRoute`); sem login o usuário volta para `/` e o modal de login abre.
