import App from './App';

let app: App;

describe('App', () => {
  beforeEach(() => {
    app = new App();
  });

  test('should create an instance of Express', () => {
    expect(app.express).toBeDefined();
  });

  test('should be able to initialize an HTTP server', () => {
    app.server.listen = jest.fn();

    app.init();

    expect(app.server.listen).toHaveBeenCalledTimes(1);
  });

  test('should be able to initialize an HTTP server with process.env ports', () => {
    const listen = jest.fn();
    app.server.listen = listen;
    process.env.PORT = "5050";

    app.init();

    expect(listen.mock.calls[0][0]).toBe("5050");
  });
});
