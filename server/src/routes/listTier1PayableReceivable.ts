import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { AnchorTier2InvoiceMapping } from "../database/entity/AnchorTier2InvoiceMapping";
import { Tier1PayableReceivable } from "../models/Tier1PayableReceivable";
import * as MoneyUtil from "../util/MoneyUtil";

// Request has query param named tier2Id
export async function listTier1PayableReceivable(
  req: Request,
  res: Response
): Promise<Response<Tier1PayableReceivable[]>> {
  const tier1Id = parseInt(req.query.tier1Id[0], 10);

  const mappings = await getConnection()
    .getRepository(AnchorTier2InvoiceMapping)
    .find({ where: { tier1Id, bankApprovalStatus: "Approved" }, relations: ["anchorInvoice", "tier2Invoice"] });

  const invoiceToReturn: Tier1PayableReceivable[] = [];

  for (const mapping of mappings) {
    invoiceToReturn.push({
      tier1PayableEntry:mapping.tier1PayableEntry,
      tier1ReceivableEntry:mapping.tier1ReceivableEntry,
      tier2Invoice: mapping.tier2Invoice,
      discountedAmount: mapping.discountedAmount,
      partAnchorInvoices: { partialAmount: mapping.discountedAmount, anchorInvoice: mapping.anchorInvoice },
    });
  }

  return res.json(invoiceToReturn);
}
