import path from 'path';
import { Express } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { getServerPort } from '../helpers/env.helper';

const pathToRoutes = path.resolve(__dirname, '..', 'routes', '**', '*.ts');
const pathToYML = path.resolve(__dirname, '..', 'routes', '**', '*.yml');

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.2', // Specification (optional, defaults to swagger: '2.0')
    info: {
      title: 'Sfera Warehouse Backend',
      version: '0.0.1',
    },
    servers: [
      {
        url: `http://localhost:${getServerPort()}/api`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'user_id',
        },
        /*bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },*/
      },
    },
    security: [
      {
        ApiKeyAuth: [],
        // bearerAuth: [],
      },
    ],
  },

  // Path to the API docs
  apis: [
    //
    pathToYML,
    pathToRoutes,
  ],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);

export const addSwaggerRoute = (app: Express): void => {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      // explorer: true,
    }),
  );
  app.get('/swagger-json', (req, res) => {
    res.send(JSON.stringify(swaggerSpec));
  });
};
