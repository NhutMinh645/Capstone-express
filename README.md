# Express Pinterest-like API (Prisma + MySQL + JWT + Multer + Joi)

## Quick Start

```bash
npm i
npx prisma generate
npx prisma migrate dev --name init

npm run dev   # or: npm start
```

- DB: set in `.env` (already set for Docker Desktop: `mysql://root:1234@127.0.0.1:3307/baitap-mysql`).
- Static uploads served at `/images/*` from `public/images`.

### Scripts
- `dev` runs with nodemon
- `start` runs node

### Postman
Import the file: `postman/Express-Pinterest-API.postman_collection.json`.
Collection variables:
- `baseUrl` — default `http://localhost:3069`
- `token` — put JWT after login.

### Folder layout

See `/src/common` for all initializations (env, prisma, jwt/bcrypt, middlewares). Services & controllers are split for clarity and reuse.
