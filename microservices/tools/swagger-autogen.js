const swaggerAutogen = require('swagger-autogen');

const serverPort = 3001
const APIPATH = '/api/v1/tools'

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

const config = {
    info: {
        title: 'User API Documentation',
        description: '',
    },
    tags: [],
    host: 'localhost:' + serverPort + APIPATH,
    schemes: ['http', 'https'],
};

swaggerAutogen(outputFile, endpointsFiles, config);
