import express from "express";
import { AuthService } from "../service/auth.service";

function auth(): express.Router {
  const auth = express.Router();
  const service = new AuthService();

  auth.post(
    "/register",
    async (req: express.Request, res: express.Response) => {
      const data = req.body;
      res.json(service.register(data));
    }
  );

  auth.post("/login", async (req: express.Request, res: express.Response) => {
    const data = req.body;

    const token = await service.login(data);

    res.json({ token });
  });

  return auth;
}

export { auth };
