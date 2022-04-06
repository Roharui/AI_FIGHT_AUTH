import "source-map-support/register";
import "reflect-metadata";
import App from "./App";
import * as express from "express";
import { config } from "dotenv";

config();

const port: number = Number(process.env.PORT) || 3001;
const app: express.Application = new App().app;

app
  .listen(port, () => console.log(`Express server listening at ${port}`))
  .on("error", (err) => console.error(err));
