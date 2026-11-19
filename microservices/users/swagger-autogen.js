const swaggerAutogen = require('swagger-autogen');

const serverPort = 3001
const APIPATH = '/api/v1/users'

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
    definitions: {
        AddUser: {
            $firstname: "Armel",
            $lastname : "Cloarec",
            $password : "motdepasse",
            $mail : "ABCDEFG@test.fr",
            phone : 4512,
        },
        Login: {
            $mail: "ABCDEFG@test.fr",
            $password: "motdepasse",
        }
    }
};

swaggerAutogen(outputFile, endpointsFiles, config);
