const dotenv = require('dotenv')

//get ENV VARIABEL
process.env.ENV = 'development'


const envFound = dotenv.config();
if(!envFound){
    throw new Error('Cannot find .env file')
}

module.exports = {
    server: {
      host: process.env.APP_SERVER_HOST,
      port: process.env.APP_SERVER_PORT,
    },
    jwtSecretKey: process.env.JWT_SECRET_KEY,
    database: {
      development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT
      }
    }
}