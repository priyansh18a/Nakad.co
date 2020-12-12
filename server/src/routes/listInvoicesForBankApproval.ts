import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { AnchorTier2InvoiceMapping } from "../database/entity/AnchorTier2InvoiceMapping";

export async function listInvoicesForBankApproval(req: Request, res: Response) {
  const allInvoices = await getConnection()
    .getRepository(AnchorTier2InvoiceMapping)
    .find({
      where: {
        bankId: null,
        bankApprovalStatus: "Pending",
      },
    });

  return res.json(allInvoices);
}
