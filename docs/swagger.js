const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'API Documentation',
    },
  },
  apis: ['path/to/your/routes/*.js'], // Path to the API routes folder
};

const specs = swaggerJsdoc(options);

module.exports = specs;
