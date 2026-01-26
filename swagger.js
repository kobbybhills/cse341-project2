const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Professional Library API',
    description: 'API for managing books and authors in a professional library system',
  },
  host: 'cse341-project2-68q3.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);