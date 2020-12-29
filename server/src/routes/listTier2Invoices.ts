import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { Tier2Invoice } from "../database/entity/Tier2Invoice";

// Request has query param named tier1Id
export async function listTier2Invoices(req: Request, res: Response) {
  const tier1Id = parseInt(req.query.tier1Id[0], 10);
  const approvalStatus = req.query.approvalStatus as string;
  // console.log(approvalStatus);
  return res.json(await listTier2InvoicesForApprovalInternal(tier1Id, approvalStatus));
}

async function listTier2InvoicesForApprovalInternal(tier1Id: number, approvalStatus: string): Promise<Tier2Invoice[]> {
  const tier2Invoices = await getConnection()
    .getRepository(Tier2Invoice)
    .find({
      where: { approvalStatus, tier1Id },
      order: {
        creationTimestamp: "DESC",
      },
      relations: ["tier2"],
    });

  return tier2Invoices;
}
