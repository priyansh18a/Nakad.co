import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { Tier2Invoice } from "../database/entity/Tier2Invoice";

// Request has query param named tier1Id
export async function listTier2RejectedInvoice(req: Request, res: Response): Promise<Response<Tier2Invoice[]>>  {
  const tier1Id = parseInt(req.query.tier1Id[0], 10);

  const tier2Invoices = await getConnection()
    .getRepository(Tier2Invoice)
    .find({
      where: { approvalStatus: "Rejected", tier1Id },
      order: {
        dueDate: "ASC",
      },
      relations: ["tier2"],
    });

  // console.log("tier2Invoices: " + JSON.stringify(tier2Invoices));
  return res.json(tier2Invoices);
}


