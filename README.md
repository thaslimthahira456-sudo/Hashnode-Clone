# Hashnode Clone MVP
A MERN developer blogging app: JWT auth, publish/draft posts, feed search/tag filtering, Markdown preview, dashboard, edit/delete.

## Run it
1. Install Node.js.
2. Backend: `cd server`, copy `.env.example` to `.env`, fill in your MongoDB Atlas URI and a strong JWT_SECRET, then run `npm install` and `npm run dev`.
3. Frontend: in another terminal, `cd client`, run `npm install` and `npm run dev`.
4. Open http://localhost:5173.

Atlas: allow your current IP in Security → Network Access. Use the connection string from Database → Connect → Drivers. URL-encode special characters in the database password. Never share `.env`.

API: POST /api/auth/register, POST /api/auth/login, GET /api/posts, GET /api/posts/mine, GET /api/posts/:id, POST /api/posts, PUT /api/posts/:id, DELETE /api/posts/:id.
