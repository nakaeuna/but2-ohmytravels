import swaggerAutogen from 'swagger-autogen';

const serverPort = 3001
const APIPATH = '/api/v1/travels'

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.mjs'];

const config = {
    info: {
        title: 'User API Documentation',
        description: '',
    },
    tags: [],
    host: 'localhost:' + serverPort + APIPATH,
    schemes: ['http', 'https'],
    securityDefinitions: {
        apiKeyAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'X-API-KEY',
        }
    },
    definitions: {
        Travel: {
            $id: 40,
            $countryName: "String",
            $city:{
                $cityName: "String",
                $activities: [{
                    $activityName: "String",
                    $description: "String"
                }],
                $suggestedHotel: "String",
            },
            $overview: "String",
            $links: ["String"],
            $start_date : "String",
            $end_date : "String",
            $estimatedPrice: 47
        }
    }
};

swaggerAutogen(outputFile, endpointsFiles, config);
