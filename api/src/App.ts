import createExpressInstance, { Express } from 'express';
import http from 'http';

import rootRouter from './routes/root-router';

/**
 * App
 *
 * A wrapper class for managing services used across the application.
 */
class App {
  public express: Express = createExpressInstance();
  public server: http.Server = http.createServer(this.express);

  public init() {
    this.setupRouting();
    this.beginListening();
  }

  private setupRouting() {
    this.express.use(rootRouter);
  }

  private beginListening() {
    const port = process.env.PORT || '3006';
    this.server.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  }
}

export default App;
