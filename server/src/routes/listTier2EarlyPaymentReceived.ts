import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { AnchorInvoice } from "../database/entity/AnchorInvoice";
import { AnchorTier2InvoiceMapping } from "../database/entity/AnchorTier2InvoiceMapping";
import { Tier2Invoice } from "../database/entity/Tier2Invoice";
import { Tier1PayableReceivable } from "../models/Tier1PayableReceivable";
import * as MoneyUtil from "../util/MoneyUtil";

// Request has query param named tier2Id
export async function listTier2EarlyPaymentReceived(
  req: Request,
  res: Response
): Promise<Response<Tier1PayableReceivable[]>> {
  const tier2Id = parseInt(req.query.tier2Id[0], 10);

  const mappings = await getConnection()
    .getRepository(AnchorTier2InvoiceMapping)
    .find({ where: { tier2Id, bankApprovalStatus: "Approved" }, relations: ["anchorInvoice", "tier2Invoice"] });

  const invoiceToReturn: Tier1PayableReceivable[] = [];

  for (const mapping of mappings) {
    invoiceToReturn.push({
      tier2Invoice: mapping.tier2Invoice,
      discountedAmount: mapping.discountedAmount,
      partAnchorInvoices: { partialAmount: mapping.discountedAmount, anchorInvoice: mapping.anchorInvoice },
    });
  }

  return res.json(invoiceToReturn);
}
