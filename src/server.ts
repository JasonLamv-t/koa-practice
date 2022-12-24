import app from './app';
import config from './config';

const SERVER_PORT = config.server.port || 3000;

app.listen(SERVER_PORT, () => {
  console.info('Server listening on port: ' + SERVER_PORT);
});
