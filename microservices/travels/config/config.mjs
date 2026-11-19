import dotenv from 'dotenv';
dotenv.config();

const config = {
    apiKey: process.env.API_KEY,
};

export { config };