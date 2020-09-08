const path = require('path');
const env = process.env;

require('dotenv').config({
  path: path.join(__dirname,".env")
});

const development ={
  host: env.DEV_HOST,
  username: env.DEV_USER,
  password: env.DEV_PASS,
  port: env.DEV_PORT,
  database: env.DEV_DB,
  dialect: env.DEV_DIALECT,
  logQueryParameters: true
};

const test = {
  host: env.TEST_HOST,
  username: env.TEST_USER,
  password: env.TEST_PASS,
  port: env.TEST_PORT,
  database: env.TEST_DB,
  dialect: env.TEST_DIALECT
};

const production = {
  host: env.PROD_HOST,
  username: env.PROD_USER,
  password: env.PROD_PASS,
  port: env.PROD_PORT,
  database: env.PROD_DB,
  dialect: env.PROD_DIALECT
}

module.exports = {development, production, test};
