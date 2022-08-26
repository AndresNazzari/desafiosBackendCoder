import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'API Documentation', description: 'Simple CRUD API', version: '1.0.0' },
    servers: [{ url: '/api/v1/' }],
  },
  apis: ['./src/routes/api/v1/*.js'],
};

export default swaggerJSDoc(options);
