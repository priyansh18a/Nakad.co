import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { AnchorInvoice } from "../database/entity/AnchorInvoice";
import { AnchorTier2InvoiceMapping } from "../database/entity/AnchorTier2InvoiceMapping";
import { Tier2Invoice } from "../database/entity/Tier2Invoice";
import { Tier1PayableReceivable } from "../models/Tier1PayableReceivable";

// Request has query param named tier2Id
export async function listTier2EarlyPaymentReceived(
  req: Request,
  res: Response
): Promise<Response<Tier1PayableReceivable[]>> {
  const tier2Id = parseInt(req.query.tier2Id[0], 10);
  const approvedbybank = await getConnection()
    .getRepository(AnchorTier2InvoiceMapping)
    .find({
      where: { bankApprovalStatus: "Approved", tier2Id },
    });
  // console.log("approvedbybank: " + JSON.stringify(approvedbybank));

  const tier2Invoices: Tier2Invoice[] = [];

  for (const tier2mapping of approvedbybank) {
    const tier2Invoice = await getConnection()
      .getRepository(Tier2Invoice)
      .findOne({
        where: { invoiceId: tier2mapping.tier2InvoiceId },
      });
    tier2Invoices.push(tier2Invoice);
  }

  const anchorInvoices: AnchorInvoice[] = [];

  for (const anchormapping of approvedbybank) {
    const anchorInvoice = await getConnection()
      .getRepository(AnchorInvoice)
      .findOne({
        where: { invoiceId: anchormapping.anchorInvoiceId },
      });
    anchorInvoices.push(anchorInvoice);
  }

  const invoiceToReturn: Tier1PayableReceivable[] = [];

  let j = 0;
  for (const tier2Invoice of tier2Invoices) {
    if (j >= anchorInvoices.length) break;
    const anchorInvoice = anchorInvoices[j];
    invoiceToReturn.push({
      tier2Invoice,
      discountedAmount: tier2Invoice.invoiceAmount.multiply(0.85),
      partAnchorInvoices: { anchorInvoice, partialAmount: tier2Invoice.invoiceAmount },
    });
    j++;
  }

  return res.json(invoiceToReturn);
}
