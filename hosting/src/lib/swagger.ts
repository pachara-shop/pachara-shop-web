// lib/swagger.js
import { createSwaggerSpec } from 'next-swagger-doc';

export const getApiDocs = () => {
  const spec = createSwaggerSpec({
    apiFolder: 'src/app/api',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Pachara Boutique API Documentation',
        version: '1.0.0',
        description: 'API documentation for Pachara Boutique',
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [],
    },
  });
  return spec;
};
