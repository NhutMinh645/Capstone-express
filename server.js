import http from 'http';
import app from './src/app.js';
import { env } from './src/common/env/env.js';

const server = http.createServer(app);
server.listen(env.PORT, () => {
  console.log(`Server listening at http://localhost:${env.PORT}`);
});
