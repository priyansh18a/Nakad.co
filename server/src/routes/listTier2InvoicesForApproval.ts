import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { Tier2Invoice } from "../database/entity/Tier2Invoice";

// Request has query param named tier1Id
export async function listTier2InvoicesForApproval(req: Request, res: Response) {
  const tier1Id = parseInt(req.query.tier1Id[0], 10);
  return res.json(await listTier2InvoicesForApprovalInternal(tier1Id));
}

async function listTier2InvoicesForApprovalInternal(tier1Id: number): Promise<Tier2Invoice[]> {
  const tier2Invoices = await getConnection()
    .getRepository(Tier2Invoice)
    .find({
      where: { approvalStatus: "Pending", tier1Id },
      order: {
        creationTimestamp: "DESC",
      },
      relations: ["tier2"],
    });

  // console.log("tier2Invoices: " + JSON.stringify(tier2Invoices));
  return tier2Invoices;
}
