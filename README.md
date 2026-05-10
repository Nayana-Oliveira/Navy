# Navy

Navy é um blog pessoal fullstack com estética outono, MPB, praia e calmaria. O projeto permite criar posts com imagens, links de vídeos, músicas e podcasts, cadastrar reviews com notas e textos pessoais, além de manter um mural de post-its com frases curtas.

## Tecnologias

### Frontend
- Angular
- TypeScript
- CSS
- ngx-markdown

### Backend
- Node.js
- Express
- MySQL
- JWT
- Multer

### Banco de dados
- MySQL

## Funcionalidades

- Listagem de posts
- Detalhe de post
- Markdown nos posts
- Embed automático de YouTube
- Embed automático de Spotify
- Reviews com modal
- Post-its dinâmicos
- Busca e filtros
- Dark mode
- Responsividade
- Loading skeleton
- Página 404 personalizada
- Compartilhamento de posts
- Login admin com JWT
- Dashboard protegido
- CRUD de posts
- CRUD de reviews
- CRUD de post-its
- Upload de imagens
- Analytics simples no dashboard
- SEO base com Open Graph

## Estrutura

```txt
navy/
├── backend/
├── navy-frontend/
├── .gitignore
└── README.md
````

## Como rodar o backend

Entre na pasta do backend:

```bash
cd backend
npm install
npm start
```

Crie um arquivo `.env` dentro da pasta `backend`:

```env
PORTA=5010
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PWD=sua_senha
MYSQL_DB=navy
JWT_SECRET=sua_chave_secreta
```

## Como rodar o frontend

Entre na pasta do frontend:

```bash
cd navy-frontend
npm install
ng serve
```

Acesse:

```txt
http://localhost:4200
```

## Rotas principais

### Públicas

```txt
/              Home
/posts         Posts
/posts/:id     Detalhe do post
/reviews       Reviews
/postits       Post-its
/sobre         Sobre
```

### Admin

```txt
/admin             Login admin
/admin/dashboard   Painel administrativo
```

## Deploy recomendado

```txt
Frontend: Vercel
Backend: Render
Banco MySQL: Railway
```

## Variáveis de ambiente do backend

No Render, configure:

```env
PORTA=5010
MYSQL_HOST=
MYSQL_USER=
MYSQL_PWD=
MYSQL_DB=
JWT_SECRET=
```

## Observação sobre imagens

Atualmente as imagens são salvas localmente na pasta `public/storage`. Para produção, o ideal é futuramente usar um serviço como Cloudinary, pois plataformas como Render podem não manter arquivos enviados localmente de forma permanente.

## Autora

Desenvolvido por Nayana Oliveira.
