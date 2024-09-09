
import swaggerJsdoc from 'swagger-jsdoc';
import fs from 'fs';

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Banbury API',
    version: '1.0.0',
    description: 'API for Banbury services',
  },
  servers: [
    {
      url: 'https://docs.banbury.io/v1',
      description: 'Production server',
    },
    {
      url: 'https://staging-api.banbury.io/v1',
      description: 'Staging server',
    },
  ],
};

// Swagger options
const options = {
  swaggerDefinition,
  apis: ['./src/**/*.ts'], // Path to the API docs in your code
};

// Generate Swagger spec
const swaggerSpec = swaggerJsdoc(options);

// Write the OpenAPI spec to a YAML file
fs.writeFileSync('./openapi.yaml', JSON.stringify(swaggerSpec, null, 2), 'utf8');

console.log('OpenAPI spec has been generated as openapi.yaml');
