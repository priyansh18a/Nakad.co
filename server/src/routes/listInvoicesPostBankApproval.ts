import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { AnchorTier2InvoiceMapping } from "../database/entity/AnchorTier2InvoiceMapping";

// Request query has one param - bankId;
export async function listInvoicesPostBankApproval(req: Request, res: Response) {
  const Id = parseInt(req.query.bankId[0], 10);
  const allInvoices = await getConnection()
    .getRepository(AnchorTier2InvoiceMapping)
    .find({
      where: {
        bankId: Id,
        bankApprovalStatus: "Approved",
      },
    });

  return res.json(allInvoices);
}
