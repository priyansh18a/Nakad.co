import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { Actor } from "../database/entity/Actor";
import { ActorMappings } from "../database/entity/ActorMappings";
import { FrontendActor, toFrontendActor } from "../models/FrontendActor";

interface Tier2Customer {
  customerActor: FrontendActor;
}

export async function listTier2Customers(req: Request, res: Response): Promise<Response<Tier2Customer[]>> {
  const tier2Id = parseInt(req.query.tier2Id as string, 10);
  return res.json(
    (
      await getConnection()
        .getRepository(ActorMappings)
        .find({
          where: {
            childId: tier2Id,
          },
        })
    ).map((mapping) => {
      return {
        customerActor: toFrontendActor(mapping.parent),
      } as Tier2Customer;
    })
  );
}
