
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger-config';
import app from './app';

const server = express();

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
server.use('/', app);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API Docs are available on http://localhost:${PORT}/api-docs`);
});
