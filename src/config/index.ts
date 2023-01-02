import dotenv from 'dotenv';
dotenv.config();

const { DB_HOST } = process.env;
const { MONGO_PORT, MONGO_USER, MONGO_PASSWORD, MONGO_DB_NAME } = process.env;
const { SECERT } = process.env;
const { DEBUG } = process.env;

const config = {
  server: {
    port: process.env.SERVER_PORT || 3000
  },
  db: {
    mongo: {
      url: `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${DB_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}`,
      options: { authSource: 'admin' }
    }
  },
  jwtSecret: SECERT as string,
  debug: DEBUG === 'true'
};

export default config;
