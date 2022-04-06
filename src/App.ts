import express from "express";

class App {
  public app: express.Application;

  public static bootstrap(): App {
    return new App();
  }

  constructor() {
    this.app = express();
    this.app.get("/", (_: express.Request, res: express.Response) => {
      res.send("Hello World");
    });
  }
}

export default App;
