import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { Actor } from "../database/entity/Actor";
import { genPassword } from "../database/util/passwordUtils";

export interface RegisterRequest {
  email: string;
  password: string;
  data: any;
  actortype: "Tier1" | "Tier2" | "Bank" | "Admin" | "Anchor";
}

export default async function register(req: Request, res: Response) {
  const request = req.body as RegisterRequest;
  const saltHash = genPassword(request.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;
  const newUser = new Actor();

  newUser.username = request.email;
  newUser.hash = hash;
  newUser.salt = salt;
  newUser.data = request.data;
  newUser.actorType = request.actortype;
  const userexist = await getConnection()
    .getRepository(Actor)
    .findOne({
      where: {
        username: request.email,
      },
    });
  if (userexist)
    return res.json({
      message: "Email already registered. Please login to continue",
    });
  getConnection()
    .getRepository(Actor)
    .save(newUser)
    .then((u) => {
      console.log(u);
      console.log("Actor Created");
    });

  return res.json(request);

  // res.redirect("/login");
}
