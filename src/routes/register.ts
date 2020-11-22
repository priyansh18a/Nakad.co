import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { User } from "../database/entity/User";
import { genPassword } from "../database/util/passwordUtils";

export interface RegisterRequest {
  email: string;
  password: string;
  data: any;
}

export default async function register(req: Request, res: Response) {
  const request = req.body as RegisterRequest;
  const saltHash = genPassword(request.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;
  const newUser = new User();

  newUser.username = request.email;
  newUser.hash = hash;
  newUser.salt = salt;
  newUser.data = request.data;

  const userexist = await getConnection()
    .getRepository(User)
    .findOne({
      where: {
        username: request.email,
      },
    });
  if (userexist) return res.json({ message: "Email already registered. Please login to continue" });
  getConnection()
    .getRepository(User)
    .save(newUser)
    .then((u) => {
      console.log(u);
      console.log("User Created");
    });

  return res.json(request);

  // res.redirect("/login");
}
