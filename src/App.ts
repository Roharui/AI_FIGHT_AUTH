import express from "express";
import { auth } from "./auth/router/auth.controller";
import { connections } from "./db";
class App {
  public app: express.Application;

  public static bootstrap(): App {
    return new App();
  }

  constructor() {
    connections();

    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use("/auth", auth());
  }
}

export default App;
