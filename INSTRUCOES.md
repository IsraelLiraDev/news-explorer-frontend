# News Explorer — Front-end (Fase 1) — Instruções

Requisito: Node 20+ e Git instalados.

## 1. Preparar a pasta
1. Apague qualquer versão anterior (a pasta `news-explorer-frontend` antiga).
2. Descompacte este zip. Entre na pasta: `cd news-explorer-frontend`

## 2. Chave da News API
1. Crie conta grátis em https://newsapi.org e copie a API key.
2. `cp .env.example .env`
3. Abra `.env` e coloque: `VITE_NEWS_API_KEY=SUA_CHAVE`
   (a chave grátis só funciona em localhost; em produção o app usa o proxy da TripleTen automaticamente)

## 3. Rodar
```
npm install
npm run dev
```
Abra http://localhost:5173 e teste a busca.

## 4. Verificar antes de entregar
```
npm run lint
npm run build
```

## 5. GitHub
1. No GitHub, crie o repositório `news-explorer-frontend` (SEM README e SEM .gitignore).
2. No terminal, dentro da pasta:
```
git init
git checkout -b stage-react-api
git add .
git commit -m "Fase 1: front-end News Explorer"
git remote add origin https://github.com/SEU_USUARIO/news-explorer-frontend.git
git push -u origin stage-react-api
```
3. Na TripleTen, aba "Revisar": envie o link do Pull Request da branch `stage-react-api`.

## Observações
- Login e artigos salvos são dados de exemplo (Fase 1); a Fase 3 troca por autenticação real.
- Nunca suba o arquivo `.env` (já está no .gitignore).
