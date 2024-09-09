import swaggerJSDoc from 'swagger-jsdoc';
import fs from 'fs';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NeuraNet API',
      version: '1.0.0',
      description: 'A simple API built with TypeScript and Express',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

// Write the OpenAPI spec to a JSON file
fs.writeFileSync('./openapi-spec.json', JSON.stringify(swaggerSpec, null, 2));

export default swaggerSpec;
