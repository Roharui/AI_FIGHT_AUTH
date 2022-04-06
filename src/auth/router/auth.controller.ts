import express from "express";
import { getRepository } from "typeorm";
import { User } from "../../db/entity/user.entity";

function auth(): express.Router {
  const auth = express.Router();
  const userRepository = getRepository(User);

  auth.post(
    "/register",
    async (req: express.Request, res: express.Response) => {
      const data = req.body;

      data["isActive"] = true;

      const user = await userRepository.save(data as User);
      res.json(user);
    }
  );

  return auth;
}

export { auth };
