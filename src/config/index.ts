import dotenv from 'dotenv';
dotenv.config();

const config = {
  server: {
    port: process.env.SERVER_PORT || 3000
  }
};

export default config;
