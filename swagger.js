const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Professional Library API',
    description: 'API for managing books and authors in a professional library system',
  },
  host: 'localhost:8080',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);