import { ENVIRONMENT } from './main/config/env';
import { setupApp } from './main/config/app';


const runServer = async () => {
  const app = await setupApp();

  app.listen(ENVIRONMENT.server.port, () => {
    console.log(`Server running at PORT ${ENVIRONMENT.server.port}!`);
  });
};

runServer();
