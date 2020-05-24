export const swaggerOptions = {
  swaggerDefinition: {
    info: {
      description: 'Project description',
      title: 'PROJECT_NAME_API',
      version: '1.0.0',
    },
    basePath: '/api',
    produces: ['application/json'],
    schemes: ['http', 'https'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: '',
      },
    },
  },
  basedir: __dirname,
  files: ['../routes/**/*.{ts,js}'],
};
